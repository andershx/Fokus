# Fokus Addons (Subscriptions + Assistant Demo)

Drop these files into your existing repo, preserving the same paths.
Then set environment variables on Vercel (or `.env.local`) and install deps.

## New routes & pages
- `app/pricing/page.tsx` — pricing page
- `components/PricingTable.tsx` — UI component with Checkout button
- `lib/stripe.ts` — Stripe SDK client
- `app/api/stripe/checkout/route.ts` — creates a Checkout Session
- `app/api/stripe/portal/route.ts` — creates a Billing Portal session
- `app/api/stripe/webhook/route.ts` — receives Stripe webhook events
- `app/api/assistant/route.ts` — simple AI assistant endpoint (OpenAI if key is set, else mock)
- `app/demo/page.tsx` — overlay demo (⌘K / Ctrl+K to toggle)

## Install packages
```
npm i stripe openai
```

## Required environment variables
Set these in Vercel Project → Settings → Environment Variables (and locally in `.env.local` if you test):
```
NEXT_PUBLIC_SITE_URL=https://your-deployed-url
STRIPE_SECRET_KEY=sk_live_or_test_...
STRIPE_PRICE_ID=price_12345
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-... (optional)
```

## Stripe webhook (dev)
Install Stripe CLI and run:
```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Then start your dev server:
```
npm run dev
```

## Notes
- The web demo simulates an overlay; the truly invisible overlay requires a desktop app (Electron or Tauri).
- The pricing table uses your `STRIPE_PRICE_ID` by default, but you can pass a `priceId` in the POST body to `/api/stripe/checkout`.
