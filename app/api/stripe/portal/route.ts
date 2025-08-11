import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const Stripe = (await (async (m: string) => import(m))("stripe") as any).default;
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const body = await req.json().catch(() => ({}));
  const { customerId } = body;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";

  if (!customerId) {
    return NextResponse.json({ error: "Missing customerId" }, { status: 400 });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/pricing`
  });

  return NextResponse.json({ url: portal.url });
}
