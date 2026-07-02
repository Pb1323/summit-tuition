import { NextResponse } from "next/server";
import { hashPasswordServer } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");
  const plan = String(body?.plan ?? "Diagnostic Assessment");

  if (!name || !email || password.length < 8) {
    return NextResponse.json({ ok: false, message: "Name, email and an 8+ character password are required." }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, mode: "demo", message: "Demo registration remains local until DATABASE_URL is configured." });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ ok: false, message: "An account already exists for that email." }, { status: 409 });
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPasswordServer(password),
      role: "student",
      approved: false,
      plan,
      paymentStatus: "pending",
    },
  });

  return NextResponse.json({ ok: true });
}
