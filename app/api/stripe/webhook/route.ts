import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = await getStripe();
  if (!stripe) {
    return new NextResponse("Stripe not configured", { status: 400 });
  }

  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !sig) {
    return new NextResponse("Missing webhook secret or signature", { status: 400 });
  }

  let event: any;
  try {
    event = (stripe as any).webhooks.constructEvent(buf, sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // TODO: persist subscription state in your DB
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // handle subscription state
      break;
    default:
      break;
  }

  return new NextResponse("ok", { status: 200 });
}

export const dynamic = "force-dynamic";
