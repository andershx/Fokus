// Lazy Stripe loader to avoid build-time 'stripe' dependency errors on Vercel.
// Deploys cleanly even if you haven't installed the 'stripe' package yet.
export async function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    const mod = await import("stripe");
    const Stripe = (mod as any).default;
    return new Stripe(key, { apiVersion: "2024-06-20" });
  } catch (e) {
    throw new Error("Stripe SDK not installed. Add `stripe` to dependencies: npm i stripe");
  }
}
