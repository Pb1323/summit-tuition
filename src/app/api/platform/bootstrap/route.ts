import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/server/auth";
import { getPlatformBootstrap } from "@/lib/server/platform-store";

export const runtime = "nodejs";

export async function GET() {
  const currentUser = await getCurrentUser();
  const state = await getPlatformBootstrap(currentUser);
  return NextResponse.json(state);
}
