# Hotfix: Make Stripe addons deploy on Vercel without installing `stripe` yet

These files replace the previous Stripe imports with a **lazy loader** so your build won't fail.
- You can deploy immediately.
- Endpoints that call Stripe will return a friendly error until you add env vars and `npm i stripe`.

**Replace the following files in your repo:**
- `lib/stripe.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/portal/route.ts`
- `app/api/stripe/webhook/route.ts`

After deployment, to enable real subscriptions:
1. `npm i stripe` (locally and/or let Vercel install on next build)
2. Set env vars in Vercel:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
