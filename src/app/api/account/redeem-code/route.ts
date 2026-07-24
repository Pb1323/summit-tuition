import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import { PROMO_CODES } from "@/data/promo-codes";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ ok: false, message: "You need to be signed in." }, { status: 401 });
  if (!isDatabaseConfigured()) return NextResponse.json({ ok: true, mode: "demo" });

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (!code) return NextResponse.json({ ok: false, message: "Enter a code." }, { status: 400 });

  const promo = PROMO_CODES.find((entry) => entry.active && entry.code === code);
  if (!promo) return NextResponse.json({ ok: false, message: "That code is not valid." }, { status: 404 });

  const mocks = await prisma.mockExam.findMany({ where: { id: { in: promo.mockIds }, published: true } });
  if (mocks.length === 0) return NextResponse.json({ ok: false, message: "That code is not valid right now." }, { status: 404 });

  await prisma.$transaction(
    mocks.map((mock) =>
      prisma.mockUnlock.upsert({
        where: { userId_mockId: { userId: currentUser.id, mockId: mock.id } },
        update: {},
        create: { userId: currentUser.id, mockId: mock.id },
      })
    )
  );

  return NextResponse.json({ ok: true, label: promo.label, mockTitles: mocks.map((mock) => mock.title) });
}
