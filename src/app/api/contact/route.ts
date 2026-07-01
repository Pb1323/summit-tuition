import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/types/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as EnquiryPayload;

  if (!payload.parentName || !payload.email || !payload.consent) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", message: "Name, email and consent are required." },
      { status: 400 }
    );
  }

  // Development logging placeholder — wire this up to email/CRM (e.g. Resend,
  // HubSpot, Airtable) once credentials are available.
  console.log("[enquiry] new submission:", payload);

  return NextResponse.json({ ok: true });
}
