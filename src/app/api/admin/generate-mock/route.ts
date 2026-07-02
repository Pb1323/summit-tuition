import { NextResponse } from "next/server";
import { REFERENCES } from "@/data/platform";
import { getCurrentUser } from "@/lib/server/auth";
import { generateMockWithProvider } from "@/lib/server/ai-generation";
import type { MockDifficulty, ReferenceSource, Subject } from "@/types/platform";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_GENERATION_SECRET;
  const currentUser = await getCurrentUser();
  const hasSecret = secret && request.headers.get("x-admin-generation-secret") === secret;
  if (currentUser?.role !== "admin" && !hasSecret) {
    return NextResponse.json({ error: "ADMIN_REQUIRED" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const reference = (body?.reference as ReferenceSource | undefined) ?? REFERENCES.find((item) => item.id === body?.referenceId);
  const subject = body?.subject as Extract<Subject, "Maths" | "English">;
  const difficultyLabel = (body?.difficultyLabel ?? "Summit Stretch") as MockDifficulty;
  const questionCount = Number(body?.questionCount ?? 5);
  const durationMinutes = Number(body?.durationMinutes ?? 30);

  if (!reference || reference.style !== "GL-style" || (subject !== "Maths" && subject !== "English")) {
    return NextResponse.json({ error: "INVALID_GENERATION_INPUT" }, { status: 400 });
  }

  const generated = await generateMockWithProvider({
    reference,
    subject,
    difficultyLabel,
    questionCount,
    durationMinutes,
    title: body?.title ? String(body.title) : undefined,
  });

  return NextResponse.json(generated);
}
