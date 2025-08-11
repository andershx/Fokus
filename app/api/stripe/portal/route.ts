import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get("origin") || "http://localhost:3000";
  const body = await req.json().catch(()=>({}));
  const customerId = (body && (body as any).customerId) as string | undefined;

  if (!secret || !customerId) {
    // Mock portal URL
    return NextResponse.json({ url: `${origin}/pricing?portal=demo` }, { status: 200 });
  }

  const Stripe = (await (async (m: string) => import(m))("stripe") as any).default;
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${origin}/pricing`
  });
  return NextResponse.json({ url: portal.url });
}
