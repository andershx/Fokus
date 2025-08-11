"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Mode = "answer" | "snaps" | "playbook" | "ghost";

export default function OverlayClient() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("answer");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const [snaps, setSnaps] = useState<string[]>([]);
  const [ghost, setGhost] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hotkeys: toggle overlay & capture selection as a "Context Snap"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mac = navigator.platform.toUpperCase().includes("MAC");
      const toggle = mac ? e.metaKey && e.key.toLowerCase() === "k" : e.ctrlKey && e.key.toLowerCase() === "k";
      const snap = (mac ? e.metaKey : e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "c";
      if (toggle) {
        e.preventDefault();
        setOpen(v => !v);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
      if (snap) {
        e.preventDefault();
        const sel = window.getSelection()?.toString() || "";
        if (sel) setSnaps(s => [sel, ...s].slice(0, 10));
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Ghost questions update when input changes
  useEffect(() => {
    const t = setInterval(() => {
      if (!inputRef.current?.value) return;
      const seed = inputRef.current.value.trim();
      if (!seed) return;
      setGhost([
        `What would success look like for you?`,
        `Could you clarify the timeline for this?`,
        `How do we measure if this worked?`,
      ]);
    }, 2500);
    return () => clearInterval(t);
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
        body: JSON.stringify({ prompt, context: snaps.slice(0,3).join(" \n ") })
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
      <div className="absolute inset-0 bg-black/10" onClick={() => setOpen(false)} />
      <div className="relative frosted border border-white/60 w-full max-w-2xl mt-16 p-4">
        {/* Mode tabs */}
        <div className="flex gap-2 mb-3 text-sm">
          {(["answer","snaps","playbook","ghost"] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={"px-3 py-1 rounded-full border " + (mode===m ? "bg-white" : "bg-white/60")}>
              {m==="answer"?"Answer":m==="snaps"?"Snaps":m==="playbook"?"Playbook":"Ghost Qs"}
            </button>
          ))}
        </div>

        {mode==="answer" && (
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
        )}

        {mode==="snaps" && (
          <div>
            <div className="text-sm text-text/70 mb-2">Use ⌘⇧C / Ctrl+Shift+C to capture selected text on the page.</div>
            <div className="flex flex-wrap gap-2">
              {snaps.map((s, i) => (
                <span key={i} className="px-2 py-1 rounded-full bg-white/70 border border-border text-xs">{s.slice(0,80)}{s.length>80?"…":""}</span>
              ))}
              {snaps.length===0 && <div className="text-sm text-text/60">No snaps yet.</div>}
            </div>
          </div>
        )}

        {mode==="playbook" && <Playbook />}

        {mode==="ghost" && (
          <div className="text-sm">
            <div className="text-text/70 mb-2">Suggested questions</div>
            <ul className="list-disc pl-5 space-y-1">
              {ghost.map((g,i)=>(<li key={i}>{g}</li>))}
              {ghost.length===0 && <li className="text-text/60">Start typing to see suggestions…</li>}
            </ul>
          </div>
        )}

        {answer && mode==="answer" && <pre className="mt-3 text-sm whitespace-pre-wrap">{answer}</pre>}
      </div>
    </div>
  );
}

function Playbook() {
  const [active, setActive] = useState<string>("Interview");
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/playbooks").then(r=>r.json()).then(d => {
      const list = d?.presets?.[active] || [];
      setItems(list);
    }).catch(()=>{});
  }, [active]);
  return (
    <div className="text-sm">
      <div className="mb-2 flex gap-2">
        {["Interview","Sales","Support","Homework"].map(n => (
          <button key={n} onClick={()=>setActive(n)}
            className={"px-3 py-1 rounded-full border " + (active===n ? "bg-white" : "bg-white/60")}>{n}</button>
        ))}
      </div>
      <ul className="list-disc pl-5 space-y-1">
        {items.map((t,i)=>(<li key={i}>{t}</li>))}
      </ul>
    </div>
  );
}
