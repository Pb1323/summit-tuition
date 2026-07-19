import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "admin") return NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 });
  if (!isDatabaseConfigured()) return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const noteId = String(body?.noteId ?? "");
  const unlocked = Boolean(body?.unlocked);
  if (!noteId) return NextResponse.json({ error: "NOTE_REQUIRED" }, { status: 400 });

  if (unlocked) {
    await prisma.noteUnlock.upsert({
      where: { userId_noteId: { userId: id, noteId } },
      update: {},
      create: { userId: id, noteId },
    });
  } else {
    await prisma.noteUnlock.deleteMany({ where: { userId: id, noteId } });
  }

  return NextResponse.json({ ok: true });
}
