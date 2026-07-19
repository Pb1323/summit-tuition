import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { prisma, isDatabaseConfigured } from "@/lib/server/db";
import { MASTER_ADMIN_EMAIL, SEEDED_USERS } from "@/data/platform";
import type { Role, StudentAccount } from "@/types/platform";

export const SESSION_COOKIE = process.env.NODE_ENV === "production" ? "__Host-summit_session" : "summit_session";
const SESSION_DAYS = 30;

// Demo mode (no DATABASE_URL) has no database to persist sessions in, so we keep an
// in-memory map of random token -> seeded userId for this server process. This means a
// session cookie can never be forged just by knowing/guessing a seeded user id (e.g.
// "admin-1") the way a raw-userId cookie could be.
const demoSessions = new Map<string, string>();

// If DATABASE_URL is ever missing in a real production deployment (misconfigured env
// var), refuse to fall back into demo mode for auth — that fallback exists purely for
// local/demo convenience and would otherwise let anyone authenticate as any seeded
// account (including the seed admin) with no real credentials.
export function isProductionWithoutDatabase() {
  return process.env.NODE_ENV === "production" && !isDatabaseConfigured();
}

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

export function publicUser(user: { id: string; name: string; email: string; role: string; approved: boolean; plan: string; paymentStatus: string; createdAt: Date | string; unlocks?: { mockId: string }[]; noteUnlocks?: { noteId: string }[]; lessonsRemaining?: number | null; upcomingLessons?: unknown }): StudentAccount {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    approved: user.approved,
    plan: user.plan,
    paymentStatus: user.paymentStatus as StudentAccount["paymentStatus"],
    unlockedMockIds: user.unlocks?.map((unlock) => unlock.mockId) ?? [],
    unlockedNoteIds: user.noteUnlocks?.map((unlock) => unlock.noteId) ?? [],
    createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt.toISOString(),
    lessonsRemaining: user.lessonsRemaining ?? undefined,
    upcomingLessons: (user.upcomingLessons as StudentAccount["upcomingLessons"]) ?? undefined,
  };
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  if (isProductionWithoutDatabase()) return null;

  if (!isDatabaseConfigured()) {
    const userId = demoSessions.get(hashToken(token));
    if (!userId) return null;
    const seeded = SEEDED_USERS.find((user) => user.id === userId);
    return seeded ?? null;
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: { include: { unlocks: true, noteUnlocks: true } } },
  });

  if (!session || session.expiresAt < new Date()) return null;
  return publicUser(session.user);
}

export async function createSession(userId: string) {
  if (isProductionWithoutDatabase()) {
    throw new Error("Refusing to create a session: DATABASE_URL is required in production.");
  }

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  if (isDatabaseConfigured()) {
    await prisma.session.create({
      data: { userId, tokenHash: hashToken(token), expiresAt },
    });
  } else {
    demoSessions.set(hashToken(token), userId);
  }

  cookieStore.set(SESSION_COOKIE, token, {
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
  if (token) {
    if (isDatabaseConfigured()) {
      await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
    } else {
      demoSessions.delete(hashToken(token));
    }
  }
  cookieStore.delete(SESSION_COOKIE);
}

export function isSeedAdmin(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL || MASTER_ADMIN_EMAIL;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
