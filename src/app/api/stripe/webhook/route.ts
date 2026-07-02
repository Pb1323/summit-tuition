import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/server/db";
import { stripeClient } from "@/lib/stripe";
import { sendEmail } from "@/lib/email/provider";
import { adminPaidAccessEmail, paymentReceivedEmail } from "@/lib/email/templates";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    const status = process.env.NODE_ENV === "production" ? 500 : 200;
    return NextResponse.json({ ok: false, error: "STRIPE_WEBHOOK_NOT_CONFIGURED" }, { status });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "MISSING_SIGNATURE" }, { status: 400 });

  let event;
  try {
    event = stripeClient().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const studentEmail = session.customer_details?.email ?? session.customer_email ?? session.metadata?.studentEmail ?? "";
    const productId = session.metadata?.productId ?? "unknown";
    const productName = session.metadata?.productName ?? "Summit Tuition product";
    if (isDatabaseConfigured()) {
      await prisma.paymentRequest.upsert({
        where: { stripeCheckoutSessionId: session.id },
        update: {
          status: "paid_pending_approval",
          stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
          amountTotal: session.amount_total ?? undefined,
          currency: session.currency ?? undefined,
        },
        create: {
          studentEmail,
          studentName: session.metadata?.studentName,
          productId,
          productName,
          mode: session.mode ?? "payment",
          status: "paid_pending_approval",
          stripeCheckoutSessionId: session.id,
          stripeCustomerId: typeof session.customer === "string" ? session.customer : undefined,
          stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : undefined,
          amountTotal: session.amount_total ?? undefined,
          currency: session.currency ?? undefined,
        },
      });
      if (studentEmail) await prisma.user.updateMany({ where: { email: studentEmail }, data: { paymentStatus: "paid" } });
    }
    if (studentEmail) await sendEmail(paymentReceivedEmail(studentEmail, productName));
    if (process.env.ADMIN_NOTIFICATION_EMAIL) await sendEmail(adminPaidAccessEmail(process.env.ADMIN_NOTIFICATION_EMAIL, studentEmail, productName));
  }

  return NextResponse.json({ received: true });
}
