import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 400 }
    );
  }

  try {
    const rawBody = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Missing webhook secret" },
        { status: 400 }
      );
    }

    // Lazy-load stripe
    const mod = await import("stripe");
    const Stripe = (mod as any).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2024-06-20" });

    const sig = req.headers.get("stripe-signature");
    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig!, webhookSecret);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Handle events here
    switch (event.type) {
      case "checkout.session.completed":
        console.log("✅ Checkout completed", event.data.object);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
