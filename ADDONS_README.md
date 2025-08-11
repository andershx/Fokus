# Fokus Add-ons (Full Replacement)

**What this is**: A complete replacement of the add-on files (Subscriptions + Assistant Demo) that are safe to deploy on Vercel without the `stripe` package installed. The `lib/stripe.ts` file lazy-loads Stripe at runtime.

## Files included (overwrite the files in your repo with these)
- lib/stripe.ts
- app/api/stripe/checkout/route.ts
- app/api/stripe/portal/route.ts
- app/api/stripe/webhook/route.ts
- app/api/assistant/route.ts
- app/demo/page.tsx
- app/pricing/page.tsx
- components/PricingTable.tsx

## After copying these files
1) Commit & push — Vercel should build successfully even without `stripe` installed.
2) When you're ready for live subscriptions:
   - `npm i stripe`
   - Add env vars in Vercel:
     - NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
     - STRIPE_SECRET_KEY=sk_test_or_live_...
     - STRIPE_PRICE_ID=price_XXXX
     - STRIPE_WEBHOOK_SECRET=whsec_XXXX
   - Redeploy.

## Note on the assistant
- `/api/assistant` uses OpenAI if `OPENAI_API_KEY` is set; otherwise returns mock text.
- `/demo` is a browser simulation of the overlay; real “invisible overlay” needs a desktop app.
