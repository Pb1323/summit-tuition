import { NextResponse } from "next/server";
import { hashPasswordServer } from "@/lib/server/auth";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

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

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashPasswordServer(password),
      role: "student",
      approved: true,
      plan: "Diagnostic Assessment",
      paymentStatus: "pending",
    },
  });

  const [freeMocks, freeNotes] = await Promise.all([
    prisma.mockExam.findMany({ where: { isFree: true, published: true } }),
    prisma.note.findMany({ where: { isFree: true } }),
  ]);
  await Promise.all([
    ...freeMocks.map((mock) =>
      prisma.mockUnlock.upsert({ where: { userId_mockId: { userId: user.id, mockId: mock.id } }, update: {}, create: { userId: user.id, mockId: mock.id } })
    ),
    ...freeNotes.map((note) =>
      prisma.noteUnlock.upsert({ where: { userId_noteId: { userId: user.id, noteId: note.id } }, update: {}, create: { userId: user.id, noteId: note.id } })
    ),
  ]);

  return NextResponse.json({ ok: true });
}
