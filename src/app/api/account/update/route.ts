import { NextResponse } from "next/server";
import { getCurrentUser, hashPasswordServer, publicUser, verifyPassword } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ ok: false, message: "You need to be signed in." }, { status: 401 });
  if (!isDatabaseConfigured()) return NextResponse.json({ ok: true, mode: "demo" });

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : undefined;
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : undefined;
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";

  const user = await prisma.user.findUnique({ where: { id: currentUser.id } });
  if (!user) return NextResponse.json({ ok: false, message: "Account not found." }, { status: 404 });

  const data: { name?: string; passwordHash?: string } = {};
  if (name) data.name = name;
  if (newPassword) {
    if (newPassword.length < 8) return NextResponse.json({ ok: false, message: "Use at least 8 characters." }, { status: 400 });
    if (!verifyPassword(currentPassword, user.passwordHash)) return NextResponse.json({ ok: false, message: "Current password did not match." }, { status: 400 });
    data.passwordHash = hashPasswordServer(newPassword);
  }

  const updated = await prisma.user.update({ where: { id: user.id }, data, include: { unlocks: true, noteUnlocks: true } });
  return NextResponse.json({ ok: true, user: publicUser(updated) });
}
