"use client";
import { useState } from "react";

export default function TranscriptsPage() {
  const [raw, setRaw] = useState("");
  const [out, setOut] = useState<string>("");

  async function clean() {
    setOut("Cleaning…");
    const res = await fetch("/api/transcripts/clean", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: raw })
    });
    const data = await res.json();
    setOut(data.text || "No output");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-bold">Tidy Transcript</h1>
      <p className="mt-2 text-text/70">Paste a Zoom/Meet transcript below. We’ll remove filler, normalize speakers, and summarize.</p>

      <textarea
        className="mt-6 w-full h-64 border border-border rounded-lg p-3 bg-white/80"
        placeholder="Paste transcript text or .vtt content…"
        value={raw}
        onChange={e=>setRaw(e.target.value)}
      />
      <div className="mt-3 flex gap-3">
        <button onClick={clean} className="rounded-pill px-6 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB">Clean & summarize</button>
        <button onClick={()=>{navigator.clipboard.writeText(out)}} className="rounded-pill px-6 py-2 border border-border">Copy output</button>
      </div>

      {out && <pre className="mt-6 whitespace-pre-wrap text-sm">{out}</pre>}
    </div>
  );
}
