// lib/stripe.ts
// No top-level 'import "stripe"' — this avoids Vercel build errors if Stripe isn't installed.

export async function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  try {
    // Dynamic import so it's only loaded at runtime
    const mod = await import("stripe");
    const Stripe = (mod as any).default;
    return new Stripe(key, { apiVersion: "2024-06-20" });
  } catch (err) {
    console.error("Stripe SDK not installed:", err);
    return null;
  }
}
