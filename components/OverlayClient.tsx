"use client";
import { useEffect, useRef, useState } from "react";

export default function OverlayClient() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mac = navigator.platform.toUpperCase().includes("MAC");
      const isToggle = mac ? e.metaKey && e.key.toLowerCase() === "k" : e.ctrlKey && e.key.toLowerCase() === "k";
      if (isToggle) {
        e.preventDefault();
        setOpen(v => !v);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      if (e.key === "Escape") setOpen(false);
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
        body: JSON.stringify({ prompt, context: "Live call context (web preview)" })
      });
      const data = await res.json();
      setAnswer(data.text || "No response");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4">
      {/* click outside to close */}
      <div className="absolute inset-0 bg-black/10" onClick={() => setOpen(false)} />
      <div className="relative frosted border border-white/60 w-full max-w-2xl mt-16 p-4">
        <form onSubmit={ask} className="flex items-center gap-3">
          <input
            ref={inputRef}
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-white/80 outline-none"
            placeholder="Ask Fokus (⌘K / Ctrl+K to toggle, Esc to close)"
          />
          <button
            disabled={loading}
            className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB disabled:opacity-60"
          >
            {loading ? "Asking..." : "Ask"}
          </button>
        </form>
        {answer && <pre className="mt-3 text-sm whitespace-pre-wrap">{answer}</pre>}
        <div className="mt-2 text-xs text-text/60">Overlay preview — in a real desktop app, this window stays invisible to screen-share.</div>
      </div>
    </div>
  );
}
