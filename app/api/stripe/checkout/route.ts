import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secret || !priceId) {
    // Mock mode: simulate success so the UI flow works in demos
    return NextResponse.json({ url: `${origin}/pricing?success=1&demo=1` }, { status: 200 });
  }

  const Stripe = (await (async (m: string) => import(m))("stripe") as any).default;
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/pricing?success=1`,
    cancel_url: `${origin}/pricing?canceled=1`,
    allow_promotion_codes: true
  });

  return NextResponse.json({ url: session.url }, { status: 200 });
}
