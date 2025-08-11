import { PricingTable } from "@/components/PricingTable";

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">Pricing</h1>
        <p className="mt-3 text-text/70">Simple plan that grows with you. Cancel anytime.</p>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border p-8 bg-white/60">
          <h3 className="text-xl font-semibold">Free</h3>
          <div className="mt-4 text-4xl font-bold">$0</div>
          <ul className="mt-6 space-y-2 text-text/80">
            <li>• Overlay demo (⌘K/Ctrl+K)</li>
            <li>• Mock assistant replies</li>
            <li>• Download links</li>
          </ul>
        </div>

        <PricingTable />
      </div>

      <p className="mt-8 text-xs text-text/60 text-center">
        Tip: Set STRIPE_PRICE_ID in your env. You can also POST a custom priceId to /api/stripe/checkout.
      </p>
    </div>
  );
}
