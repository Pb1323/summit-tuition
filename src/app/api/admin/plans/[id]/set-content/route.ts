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
  const mockIds = Array.isArray(body?.mockIds) ? body.mockIds.map(String) : [];
  const noteIds = Array.isArray(body?.noteIds) ? body.noteIds.map(String) : [];

  await prisma.productPlan.update({ where: { id }, data: { includedMockIds: mockIds, includedNoteIds: noteIds } });
  return NextResponse.json({ ok: true });
}
