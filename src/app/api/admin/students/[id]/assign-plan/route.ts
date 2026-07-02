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
  const plan = String(body?.plan ?? "").trim();
  if (!plan) return NextResponse.json({ error: "PLAN_REQUIRED" }, { status: 400 });

  await prisma.user.update({ where: { id }, data: { plan, paymentStatus: "paid" } });
  return NextResponse.json({ ok: true });
}
