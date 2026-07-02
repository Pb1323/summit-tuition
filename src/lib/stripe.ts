import Stripe from "stripe";
import { SITE } from "@/data/site";

export interface CheckoutRequest {
  priceId: string;
  mode: "payment" | "subscription";
  productName: string;
  productId?: string;
  studentEmail?: string;
  studentName?: string;
}

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

export function stripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_NOT_CONFIGURED");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

/**
 * Placeholder Stripe checkout session creator. Swap in the real `stripe`
 * SDK call once STRIPE_SECRET_KEY is set:
 *
 *   import Stripe from "stripe";
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   const session = await stripe.checkout.sessions.create({
 *     mode: req.mode,
 *     line_items: [{ price: req.priceId, quantity: 1 }],
 *     success_url: `${SITE.url}/pricing?checkout=success`,
 *     cancel_url: `${SITE.url}/pricing?checkout=cancelled`,
 *   });
 *   return session.url;
 */
export async function createCheckoutSession(req: CheckoutRequest): Promise<{ url: string }> {
  if (!isStripeConfigured()) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  if (!req.priceId || !req.productName || !["payment", "subscription"].includes(req.mode)) {
    throw new Error("INVALID_CHECKOUT_REQUEST");
  }
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.create({
    mode: req.mode,
    line_items: [{ price: req.priceId, quantity: 1 }],
    success_url: `${SITE.url}/pricing?checkout=success`,
    cancel_url: `${SITE.url}/pricing?checkout=cancelled`,
    customer_email: req.studentEmail,
    metadata: {
      productId: req.productId ?? req.priceId,
      productName: req.productName,
      studentEmail: req.studentEmail ?? "",
      studentName: req.studentName ?? "",
      source: "summit-tuition",
    },
  });
  if (!session.url) throw new Error("CHECKOUT_SESSION_MISSING_URL");
  return { url: session.url };
}
