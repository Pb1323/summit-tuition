import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { getPlatformBootstrap } from "@/lib/server/platform-store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const includeQuestions = new URL(request.url).searchParams.get("full") === "1";
    const state = await getPlatformBootstrap(currentUser, includeQuestions);
    return NextResponse.json(state);
  } catch (error) {
    console.error("Platform bootstrap failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to load platform state." }, { status: 500 });
  }
}
