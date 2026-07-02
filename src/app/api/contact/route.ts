import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/types/contact";
import { sendEmail } from "@/lib/email/provider";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = (await request.json()) as EnquiryPayload;

  if (!payload.parentName || !payload.email || !payload.consent) {
    return NextResponse.json(
      { error: "INVALID_PAYLOAD", message: "Name, email and consent are required." },
      { status: 400 }
    );
  }

  // Development placeholder: wire this to email/CRM once credentials are available.
  // Keep logs minimal so local/dev output does not expose full child enquiry details.
  console.log("[enquiry] new submission:", {
    email: payload.email,
    interestedProduct: payload.interestedProduct,
    hasMessage: Boolean(payload.message),
  });

  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `New Summit Tuition enquiry: ${payload.interestedProduct}`,
      text: `${payload.parentName} (${payload.email}) asked about ${payload.interestedProduct}.`,
      html: `<p><strong>${payload.parentName}</strong> (${payload.email}) asked about <strong>${payload.interestedProduct}</strong>.</p><p>${payload.message || "No message provided."}</p>`,
    });
  }

  return NextResponse.json({ ok: true });
}
