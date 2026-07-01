import { NextResponse } from "next/server";
import { createCheckoutSession, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "STRIPE_NOT_CONFIGURED", message: "Checkout coming soon." },
      { status: 501 }
    );
  }

  const body = await request.json();

  try {
    const session = await createCheckoutSession(body);
    return NextResponse.json(session);
  } catch {
    return NextResponse.json(
      { error: "CHECKOUT_FAILED", message: "Unable to start checkout right now." },
      { status: 500 }
    );
  }
}
