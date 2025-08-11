"use client";
import { useState } from "react";

export function PortalButton() {
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true); setErr(null);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId })
      });
      const data = await res.json();
      if (data.url) {
        setUrl(data.url);
        window.location.href = data.url;
      } else {
        setErr(data.error || "Failed to open portal");
      }
    } catch (e: any) {
      setErr(e?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white/60 p-6">
      <div className="font-semibold">Manage billing</div>
      <p className="text-sm text-text/70">Enter your Stripe customer ID to open the billing portal.</p>
      <div className="mt-3 flex gap-2">
        <input
          value={customerId}
          onChange={(e)=>setCustomerId(e.target.value)}
          placeholder="cus_123..."
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-white/80 outline-none"
        />
        <button onClick={openPortal} disabled={loading} className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB disabled:opacity-60">
          {loading ? "Opening..." : "Open portal"}
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      {url && <p className="mt-2 text-xs text-text/60 break-all">{url}</p>}
    </div>
  );
}
