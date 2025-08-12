"use client";
import { useState } from "react";

export default function TranscriptsPage() {
  const [input, setInput] = useState("");
  const [cleaned, setCleaned] = useState("");

  async function clean() {
    const res = await fetch("/api/transcripts/clean", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    setCleaned(data.cleaned || "");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Tidy Transcript</h1>
      <p className="text-text/70 mb-6">Paste Zoom/Meet transcript or raw notes — get a clean, client‑ready summary.</p>
      <textarea className="w-full h-56 rounded-lg border border-border p-3 bg-white/70" value={input} onChange={e=>setInput(e.target.value)} placeholder="Paste transcript..." />
      <div className="mt-3 flex gap-2">
        <button onClick={clean} className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB">Clean & summarize</button>
      </div>
      {cleaned && <pre className="mt-4 whitespace-pre-wrap text-sm rounded-lg border border-border bg-white/60 p-3">{cleaned}</pre>}
    </div>
  );
}
