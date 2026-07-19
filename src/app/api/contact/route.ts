import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/types/contact";
import { sendEmail } from "@/lib/email/provider";
import { clientIp, isRateLimited } from "@/lib/server/rate-limit";
import { SITE } from "@/data/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(`contact:ip:${clientIp(request)}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "RATE_LIMITED", message: "Too many enquiries submitted. Try again later." }, { status: 429 });
  }

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
  const notified = adminEmail
    ? await sendEmail({
        to: adminEmail,
        subject: `New ${SITE.name} enquiry: ${payload.interestedProduct}`,
        text: `${payload.parentName} (${payload.email}) asked about ${payload.interestedProduct}.`,
        html: `<p><strong>${payload.parentName}</strong> (${payload.email}) asked about <strong>${payload.interestedProduct}</strong>.</p><p>${payload.message || "No message provided."}</p>`,
      })
    : { ok: false as const, error: "EMAIL_NOT_CONFIGURED" };

  await sendEmail({
    to: payload.email,
    subject: `We've received your enquiry — ${SITE.name}`,
    text: `Hi ${payload.parentName}, thanks for getting in touch about ${payload.interestedProduct}. We'll reply within one working day.`,
    html: `<p>Hi ${payload.parentName},</p><p>Thanks for getting in touch about <strong>${payload.interestedProduct}</strong>. We'll reply within one working day.</p><p>${SITE.name}</p>`,
  });

  if (!notified.ok) {
    console.error("[enquiry] admin notification not sent:", notified.error);
  }

  return NextResponse.json({ ok: true });
}
