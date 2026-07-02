import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      error: "SCORING_ORACLE_DISABLED",
      message: "Use /api/attempts/submit. Scores and mark schemes are released only after admin review.",
    },
    { status: 404 }
  );
}
