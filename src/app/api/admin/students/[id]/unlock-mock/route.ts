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
  const mockId = String(body?.mockId ?? "");
  const unlocked = Boolean(body?.unlocked);
  if (!mockId) return NextResponse.json({ error: "MOCK_REQUIRED" }, { status: 400 });

  if (unlocked) {
    await prisma.mockUnlock.upsert({
      where: { userId_mockId: { userId: id, mockId } },
      update: {},
      create: { userId: id, mockId },
    });
  } else {
    await prisma.mockUnlock.deleteMany({ where: { userId: id, mockId } });
  }

  return NextResponse.json({ ok: true });
}
