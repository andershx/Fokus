"use client";
import { useEffect, useRef, useState } from "react";

export default function DemoPage() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("Press ⌘K (Mac) or Ctrl+K (Windows) to toggle the overlay.");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mac = navigator.platform.toUpperCase().includes("MAC");
      const combo = mac ? e.metaKey && e.key.toLowerCase() === "k" : e.ctrlKey && e.key.toLowerCase() === "k";
      if (combo) {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  async function ask(e?: React.FormEvent) {
    e?.preventDefault();
    const prompt = inputRef.current?.value?.trim();
    if (!prompt) return;
    setLoading(true);
    setAnswer("Thinking...");
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context: "Live call context (stub)" })
      });
      const data = await res.json();
      setAnswer(data.text || "No response");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Assistant Demo</h1>
      <p className="text-text/70 mb-6">This simulates the invisible overlay (web preview). Use ⌘K / Ctrl+K to toggle.</p>

      {open && (
        <div className="fixed inset-x-0 top-16 mx-auto max-w-2xl z-50 frosted p-4 border border-white/60">
          <form onSubmit={ask} className="flex items-center gap-3">
            <input
              ref={inputRef}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-white/80 outline-none"
              placeholder="Ask Fokus while you speak..."
            />
            <button
              disabled={loading}
              className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB disabled:opacity-60"
            >
              {loading ? "Asking..." : "Ask"}
            </button>
          </form>
          <pre className="mt-3 text-sm whitespace-pre-wrap">{answer}</pre>
          <div className="mt-2 text-xs text-text/60">Private overlay preview — won’t appear on screen-share.</div>
        </div>
      )}

      <div className="mt-28 text-sm text-text/70">
        Note: The actual invisible overlay for calls requires a desktop app (Electron or Tauri) to float above all windows.
      </div>
    </div>
  );
}
