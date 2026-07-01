export interface CheckoutRequest {
  priceId: string;
  mode: "payment" | "subscription";
  productName: string;
}

export const isStripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

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
  void req;
  if (!isStripeConfigured()) {
    throw new Error("STRIPE_NOT_CONFIGURED");
  }
  // Real Stripe integration goes here once keys are added.
  throw new Error("STRIPE_NOT_CONFIGURED");
}
