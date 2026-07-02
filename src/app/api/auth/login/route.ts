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
    if (!seeded) return NextResponse.json({ ok: false, message: "No account found." }, { status: 401 });
    await createSession(seeded.id);
    return NextResponse.json({ ok: true, user: seeded });
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
  if (!isDatabaseConfigured() || !isSeedAdmin(email) || password.length < 8) {
    return NextResponse.json({ ok: false, message: "Master admin seed requires database and valid credentials." }, { status: 400 });
  }
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hashPasswordServer(password), role: "admin", approved: true, paymentStatus: "paid" },
    create: { name: "Master Admin", email, passwordHash: hashPasswordServer(password), role: "admin", approved: true, plan: "Complete 11+ Programme", paymentStatus: "paid" },
  });
  return NextResponse.json({ ok: true, userId: user.id });
}
