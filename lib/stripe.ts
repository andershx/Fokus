// Lazy Stripe loader to avoid build-time dependency errors on Vercel.
// Works even if 'stripe' isn't installed yet; endpoints return a clear error.
export async function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    const mod = await import("stripe");
    const Stripe = (mod as any).default;
    return new Stripe(key, { apiVersion: "2024-06-20" });
  } catch {
    throw new Error("Stripe SDK not installed. Run `npm i stripe`.");
  }
}
