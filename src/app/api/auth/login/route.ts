import { NextResponse } from "next/server";
import { createSession, hashPasswordServer, isSeedAdmin, verifyPassword } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import { SEEDED_USERS } from "@/data/platform";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  if (!email || password.length < 8) {
    return NextResponse.json({ ok: false, message: "Email and an 8+ character password are required." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    const seeded = SEEDED_USERS.find((user) => user.email.toLowerCase() === email);
    if (!seeded) return NextResponse.json({ ok: false, mode: "demo" }, { status: 200 });
    await createSession(seeded.id);
    return NextResponse.json({ ok: true, mode: "demo", user: seeded });
  }

  const user = await prisma.user.findUnique({ where: { email }, include: { unlocks: true } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, message: "Email or password is incorrect." }, { status: 401 });
  }

  await createSession(user.id);
  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      approved: user.approved,
      plan: user.plan,
      paymentStatus: user.paymentStatus,
      unlockedMockIds: user.unlocks.map((unlock) => unlock.mockId),
      createdAt: user.createdAt.toISOString(),
    },
  });
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const databaseConfigured = isDatabaseConfigured();
  const adminEmailConfigured = Boolean(process.env.ADMIN_EMAIL);

  if (!databaseConfigured) {
    console.error("Master admin bootstrap blocked: DATABASE_URL is missing.", { databaseConfigured, adminEmailConfigured });
    return NextResponse.json({ ok: false, message: "Database is not configured for admin bootstrap." }, { status: 500 });
  }

  if (!isSeedAdmin(email) || password.length < 8) {
    console.error("Master admin bootstrap rejected invalid credentials.", {
      databaseConfigured,
      adminEmailConfigured,
      emailMatchesAdmin: isSeedAdmin(email),
      passwordLengthValid: password.length >= 8,
    });
    return NextResponse.json({ ok: false, message: "Master admin seed requires valid admin email and an 8+ character password." }, { status: 400 });
  }

  try {
    const passwordHash = hashPasswordServer(password);
    const user = await prisma.user.upsert({
      where: { email },
      update: { passwordHash, role: "admin", approved: true, paymentStatus: "paid" },
      create: { name: "Master Admin", email, passwordHash, role: "admin", approved: true, plan: "Complete 11+ Programme", paymentStatus: "paid" },
    });
    return NextResponse.json({ ok: true, userId: user.id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown bootstrap error";
    console.error("Master admin bootstrap database upsert failed.", {
      databaseConfigured,
      adminEmailConfigured,
      errorName: error instanceof Error ? error.name : "UnknownError",
      message,
    });
    return NextResponse.json({ ok: false, message: "Admin bootstrap failed while writing to the database." }, { status: 500 });
  }
}
