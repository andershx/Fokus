import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    // In mock mode we accept silently
    return NextResponse.json({ ok: true, mock: true });
  }

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  const Stripe = (await (async (m: string) => import(m))("stripe") as any).default;
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // TODO: handle events
  return NextResponse.json({ ok: true });
}
