import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !sig) {
    return new NextResponse("Missing webhook secret or signature", { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      break;
    default:
      break;
  }

  return new NextResponse("ok", { status: 200 });
}

export const dynamic = "force-dynamic";