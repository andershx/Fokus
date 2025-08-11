"use client";
import { useState } from "react";

export function PricingTable() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function checkout() {
    setLoading(true); setMsg(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setMsg(data.error || "Failed to start checkout");
    } catch (e: any) {
      setMsg(e?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white/60 p-8 shadow-soft">
      <div className="inline-flex items-center rounded-pill px-3 py-1 text-xs border border-border bg-white/80">Most popular</div>
      <h2 className="text-3xl font-semibold mt-3">Fokus Pro</h2>
      <p className="mt-2 text-text/70">Real-time suggestions, summaries, and more.</p>
      <div className="mt-6 text-4xl font-bold">$19<span className="text-xl">/mo</span></div>
      <ul className="mt-6 space-y-2 text-text/80">
        <li>• Real-time cues during calls</li>
        <li>• Summaries & note export</li>
        <li>• Priority responses</li>
        <li>• Manage via Billing Portal</li>
      </ul>
      <button
        onClick={checkout}
        disabled={loading}
        className="mt-8 inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium text-white bg-gradient-to-r from-primaryA to-primaryB shadow-pill hover:brightness-105 disabled:opacity-60"
      >
        {loading ? "Redirecting..." : "Subscribe"}
      </button>
      {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
    </div>
  );
}
