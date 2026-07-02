import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { prisma, isDatabaseConfigured } from "@/lib/server/db";
import { MASTER_ADMIN_EMAIL, SEEDED_USERS } from "@/data/platform";
import type { Role, StudentAccount } from "@/types/platform";

export const SESSION_COOKIE = "__Host-summit_session";
const SESSION_DAYS = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function hashPasswordServer(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  if (!stored.startsWith("scrypt:")) return false;
  const [, salt, hash] = stored.split(":");
  const actual = Buffer.from(scryptSync(password, salt, 64).toString("hex"), "hex");
  const expected = Buffer.from(hash, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function publicUser(user: { id: string; name: string; email: string; role: string; approved: boolean; plan: string; paymentStatus: string; createdAt: Date | string; unlocks?: { mockId: string }[] }): StudentAccount {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    approved: user.approved,
    plan: user.plan,
    paymentStatus: user.paymentStatus as StudentAccount["paymentStatus"],
    unlockedMockIds: user.unlocks?.map((unlock) => unlock.mockId) ?? [],
    createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt.toISOString(),
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  if (!isDatabaseConfigured()) {
    const seeded = SEEDED_USERS.find((user) => user.id === token);
    return seeded ?? null;
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { include: { unlocks: true } } },
  });

  if (!session || session.expiresAt < new Date()) return null;
  return publicUser(session.user);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  if (isDatabaseConfigured()) {
    await prisma.session.create({
      data: { userId, tokenHash: hashToken(token), expiresAt },
    });
  }

  cookieStore.set(SESSION_COOKIE, isDatabaseConfigured() ? token : userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token && isDatabaseConfigured()) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

export function isSeedAdmin(email: string) {
  return email.trim().toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();
}
