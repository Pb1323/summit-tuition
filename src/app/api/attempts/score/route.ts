import { NextResponse } from "next/server";
import { MOCKS } from "@/data/platform";
import { scoreAnswers, weakTopicsForAttempt } from "@/lib/assessment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.mockId || typeof body.answers !== "object") {
    return NextResponse.json({ error: "INVALID_ATTEMPT" }, { status: 400 });
  }

  const mock = MOCKS.find((item) => item.id === body.mockId);
  if (!mock) {
    return NextResponse.json({ error: "MOCK_NOT_FOUND" }, { status: 404 });
  }

  const score = scoreAnswers(mock, body.answers);
  return NextResponse.json({
    ...score,
    weakTopics: weakTopicsForAttempt(mock, body.answers),
    status: "submitted",
    message: "Attempt validated. Full report release remains an admin-controlled action.",
  });
}
