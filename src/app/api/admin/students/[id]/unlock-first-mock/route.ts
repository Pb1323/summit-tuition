import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const currentUser = await getCurrentUser();
  if (currentUser?.role !== "admin") return NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 });
  if (!isDatabaseConfigured()) return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });

  const { id } = await params;
  const firstMock = await prisma.mockExam.findFirst({
    where: { published: true, subject: { in: ["Maths", "English"] } },
    orderBy: { releaseDate: "asc" },
  });

  await prisma.user.update({ where: { id }, data: { approved: true } });
  if (firstMock) {
    await prisma.mockUnlock.upsert({
      where: { userId_mockId: { userId: id, mockId: firstMock.id } },
      update: {},
      create: { userId: id, mockId: firstMock.id },
    });
  }

  return NextResponse.json({ ok: true, unlockedMockId: firstMock?.id ?? null });
}
