import { PricingTable } from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>
      <PricingTable />
      <p className="mt-6 text-sm text-text/70">
        Tip: Set STRIPE_PRICE_ID in your env. You can also post a custom priceId to /api/stripe/checkout.
      </p>
    </div>
  );
}
