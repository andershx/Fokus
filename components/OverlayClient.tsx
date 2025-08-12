"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Task = { id: string; text: string; assignee?: string; done?: boolean; due?: string };

export default function OverlayClient() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"whisper"|"tasks"|"recap"|"memory"|"emotion">("whisper");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [micAllowed, setMicAllowed] = useState<boolean>(false);
  const [energy, setEnergy] = useState<number>(0);
  const [voicePitch, setVoicePitch] = useState<number>(0);
  const [engagement, setEngagement] = useState<string>("—");

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

  async function askWhisper(e?: React.FormEvent) {
    e?.preventDefault();
    const prompt = inputRef.current?.value?.trim();
    if (!prompt) return;
    setLoading(true); setAnswer("Thinking...");
    try {
      const res = await fetch("/api/whisper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setAnswer(data.text || "No response");
    } finally {
      setLoading(false);
    }
  }

  const taskInputRef = useRef<HTMLTextAreaElement>(null);
  async function extractTasks() {
    const text = taskInputRef.current?.value || "";
    if (!text.trim()) return;
    const res = await fetch("/api/tasks/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setTasks(prev => [...prev, ...data.tasks]);
    taskInputRef.current!.value = "";
  }
  function toggleTask(id: string) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const recapRef = useRef<HTMLTextAreaElement>(null);
  const [recapText, setRecapText] = useState<string>("");
  async function makeRecap() {
    const notes = recapRef.current?.value || "";
    const res = await fetch("/api/recap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes })
    });
    const data = await res.json();
    setRecapText(data.email || "No recap generated");
  }

  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Array<{snippet:string; when:string}>>([]);
  async function searchMemory(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    const res = await fetch("/api/memory/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: query })
    });
    const data = await res.json();
    setHits(data.results || []);
  }

  useEffect(() => {
    if (!open || tab !== "emotion") return;
    let ctx: AudioContext | null = null;
    let rafId = 0;
    let analyser: AnalyserNode, source: MediaStreamAudioSourceNode;
    let data: Float32Array;

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        setMicAllowed(true);
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        data = new Float32Array(analyser.fftSize);
        source = ctx.createMediaStreamSource(stream);
        source.connect(analyser);

        const loop = () => {
          analyser.getFloatTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
          const rms = Math.sqrt(sum / data.length);
          setEnergy(Math.min(1, rms * 20));
          let crossings = 0;
          for (let i = 1; i < data.length; i++) {
            if ((data[i-1] < 0 && data[i] >= 0) || (data[i-1] > 0 && data[i] <= 0)) crossings++;
          }
          const seconds = data.length / (ctx!.sampleRate || 44100);
          const zcr = crossings / seconds / 2;
          setVoicePitch(Math.round(zcr));
          rafId = requestAnimationFrame(loop);
        };
        loop();
      } catch (e) {
        setMicAllowed(false);
      }
    }
    start();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try { ctx?.close(); } catch {}
    };
  }, [open, tab]);

  useEffect(() => {
    const lvl = energy;
    const label = lvl > 0.35 ? "High" : lvl > 0.15 ? "Medium" : "Low";
    setEngagement(label);
  }, [energy]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4">
      <div className="absolute inset-0 bg-black/10" onClick={() => setOpen(false)} />
      <div className="relative frosted border border-white/60 w-full max-w-3xl mt-12 p-0 overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 px-4 pt-3">
          {["whisper","tasks","recap","memory","emotion"].map((t) => (
            <button key={t} onClick={() => setTab(t as any)}
              className={"px-3 py-2 rounded-lg text-sm " + (tab === t ? "bg-white/70" : "hover:bg-white/40")}>
              {t[0].toUpperCase()+t.slice(1)}
            </button>
          ))}
          <div className="ml-auto text-xs text-text/60 px-2 py-1">⌘K / Ctrl+K • Esc</div>
        </div>
        <div className="px-4 pb-4 pt-2">
          {tab === "whisper" && (
            <div>
              <form onSubmit={askWhisper} className="flex items-center gap-3">
                <input ref={inputRef} className="flex-1 px-3 py-2 rounded-lg border border-border bg-white/80 outline-none"
                       placeholder="Ask for a cue, fact, or rewrite..." />
                <button disabled={loading} className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB disabled:opacity-60">
                  {loading ? "Asking..." : "Ask"}
                </button>
              </form>
              {answer && <pre className="mt-3 text-sm whitespace-pre-wrap">{answer}</pre>}
            </div>
          )}

          {tab === "tasks" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Extract tasks from notes</h3>
                <textarea ref={taskInputRef} className="w-full h-32 rounded-lg border border-border bg-white/80 p-2 text-sm" placeholder="Paste meeting notes or bullets..." />
                <div className="mt-2 flex gap-2">
                  <button onClick={extractTasks} className="rounded-pill px-4 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB">Extract</button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Smart Tasks</h3>
                <div className="space-y-2 max-h-48 overflow-auto pr-1">
                  {tasks.map(t => (
                    <label key={t.id} className="flex items-start gap-2 text-sm">
                      <input type="checkbox" checked={!!t.done} onChange={() => toggleTask(t.id)} />
                      <span className={t.done ? "line-through text-text/50" : ""}>
                        {t.text} {t.assignee ? <em className="text-text/60">— {t.assignee}</em> : null} {t.due ? <span className="text-text/60"> (due {t.due})</span> : null}
                      </span>
                    </label>
                  ))}
                  {tasks.length === 0 && <div className="text-text/60">No tasks yet.</div>}
                </div>
              </div>
            </div>
          )}

          {tab === "recap" && (
            <div>
              <h3 className="font-semibold mb-2">One‑click recap email</h3>
              <textarea ref={recapRef} className="w-full h-36 rounded-lg border border-border bg-white/80 p-2 text-sm" placeholder="Paste key notes or let it infer from tasks..." />
              <div className="mt-2 flex gap-2">
                <button onClick={makeRecap} className="rounded-pill px-4 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB">Generate email</button>
              </div>
              {recapText && <pre className="mt-3 text-sm whitespace-pre-wrap">{recapText}</pre>}
            </div>
          )}

          {tab === "memory" && (
            <div>
              <form onSubmit={searchMemory} className="flex items-center gap-3">
                <input value={query} onChange={e=>setQuery(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-border bg-white/80 outline-none"
                       placeholder="Search past decisions, quotes, or topics..." />
                <button className="rounded-pill px-5 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB">Search</button>
              </form>
              <div className="mt-3 space-y-2">
                {hits.map((h, i) => (
                  <div key={i} className="rounded-lg border border-border bg-white/60 p-2 text-sm">
                    <div className="text-text/80">{h.snippet}</div>
                    <div className="text-xs text-text/60 mt-1">{h.when}</div>
                  </div>
                ))}
                {hits.length === 0 && <div className="text-text/60">No results yet.</div>}
              </div>
            </div>
          )}

          {tab === "emotion" && (
            <div>
              <h3 className="font-semibold mb-2">Emotion & Engagement</h3>
              {!micAllowed && <div className="text-sm text-text/70 mb-2">Click "Allow" on the mic prompt to see live gauges.</div>}
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-white/70 p-4 text-center">
                  <div className="text-xs text-text/60">Energy</div>
                  <div className="text-3xl font-bold">{Math.round(energy*100)}%</div>
                  <div className="h-2 bg-white/70 rounded mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primaryA to-primaryB" style={{width: Math.round(energy*100) + "%"}} />
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-white/70 p-4 text-center">
                  <div className="text-xs text-text/60">Pitch (approx)</div>
                  <div className="text-3xl font-bold">{voicePitch} Hz</div>
                </div>
                <div className="rounded-xl border border-border bg-white/70 p-4 text-center">
                  <div className="text-xs text-text/60">Engagement</div>
                  <div className="text-3xl font-bold">{engagement}</div>
                </div>
              </div>
              <div className="text-xs text-text/60 mt-2">On-device analysis only. No audio leaves your browser.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
