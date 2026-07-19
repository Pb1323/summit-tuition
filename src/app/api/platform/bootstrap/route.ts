import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { getPlatformBootstrap } from "@/lib/server/platform-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    const state = await getPlatformBootstrap(currentUser);
    return NextResponse.json(state);
  } catch (error) {
    console.error("Platform bootstrap failed:", error);
    return NextResponse.json({ ok: false, message: "Unable to load platform state." }, { status: 500 });
  }
}
