"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ScrollShowcasePro — Fokus "How it works" animation
 * Similar structure to Cluely's scrollytelling, built from scratch.
 * - Left: pinned mock app window with animated UI
 * - Right: step copy
 * - No external deps, Vercel-ready
 */

type Step = { title: string; body: string; };

const STEPS: Step[] = [
  { title: "Transcribe privately", body: "Fokus listens locally and keeps the overlay invisible to screen share." },
  { title: "Spot actions & decisions", body: "Action items are auto-detected with assignees and due dates." },
  { title: "Gauge engagement", body: "A lightweight on-device tracker estimates energy and sentiment." },
  { title: "Recap in one click", body: "Get a clean summary and export to email or docs." },
];

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function useScrollProgress(containerRef: React.RefObject<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scroller = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.15;
      const end = vh * 0.85;
      const total = rect.height - (start + (vh - end));
      const y = clamp((start - rect.top) / Math.max(total, 1), 0, 1);
      setProgress(y);
      raf.current = requestAnimationFrame(scroller);
    };
    raf.current = requestAnimationFrame(scroller);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [containerRef]);
  return progress;
}

export default function ScrollShowcasePro() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const steps = STEPS.length;
  const idx = Math.floor(p * (steps - 1) + 1e-4);
  const seg = 1 / (steps - 1);
  const t = clamp((p - idx * seg) / seg, 0, 1);

  // For convenience make 4 segment progress values [0..1] each
  const t0 = clamp(p / seg, 0, 1);
  const t1 = clamp((p - seg) / seg, 0, 1);
  const t2 = clamp((p - 2*seg) / seg, 0, 1);
  const t3 = clamp((p - 3*seg) / seg, 0, 1);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-4 py-24">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Pinned mock window */}
        <div className="md:sticky md:top-20 md:h-[72vh]">
          <div className="relative h-[56vh] md:h-full rounded-2xl border border-border bg-gradient-to-b from-white/95 to-white/70 shadow-soft overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-white/80">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 text-xs text-text/60">fokus — private overlay</div>
            </div>

            {/* Canvas area */}
            <div className="absolute inset-0 pt-10 pb-6 px-6">
              <div className="h-full rounded-xl bg-white border border-border/60 overflow-hidden relative">
                {/* Step 1: Transcript lines typing */}
                <div
                  className="absolute left-6 right-6 top-6 text-[13px] leading-6"
                  style={{ opacity: t0 }}
                >
                  <div className="mb-2 text-text/60 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-primaryA animate-pulse" />
                    <span>Transcribing…</span>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-white/90 p-3 shadow-soft">
                    <div className="h-4 w-5/6 bg-[#EAF2FE]" style={{opacity: lerp(0.1, 1, t0)}} />
                    <div className="h-4 w-4/6 bg-[#F1F2F8] mt-2" style={{opacity: lerp(0.05, 1, t0)}} />
                    <div className="h-4 w-3/6 bg-[#F1F2F8] mt-2" style={{opacity: lerp(0.0, 1, t0)}} />
                  </div>
                </div>

                {/* Step 2: Action items highlights */}
                <div
                  className="absolute left-6 right-6 top-32 text-[13px] leading-6"
                  style={{ opacity: t1 }}
                >
                  <div className="text-[11px] uppercase tracking-wide text-text/50 mb-1">Detected actions</div>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-[#B4CEF8] bg-[#F3F8FF] p-2 shadow-soft"
                         style={{ transform: `translateY(${(1-t1)*6}px)`, opacity: t1 }}>
                      • Send proposal — <span className="text-text/60">You</span> — <span className="text-text/60">Fri</span>
                    </div>
                    <div className="rounded-lg border border-border bg-white/90 p-2 shadow-soft"
                         style={{ transform: `translateY(${(1-t1)*10}px)`, opacity: lerp(0, 1, t1*0.8) }}>
                      • Confirm budget — <span className="text-text/60">Alex</span> — <span className="text-text/60">Mon</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Engagement tracker */}
                <div
                  className="absolute left-6 right-6 bottom-24"
                  style={{ opacity: t2 }}
                >
                  <div className="text-[11px] uppercase tracking-wide text-text/50 mb-2">Engagement</div>
                  <div className="rounded-xl border border-border bg-white/90 p-3 shadow-soft">
                    <div className="flex items-center gap-2 text-xs text-text/70 mb-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#10b981]" />
                      Energy stable
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <div className="h-2 rounded bg-[#EAF2FE]" />
                        <div className="h-2 mt-1 rounded bg-[#B4CEF8]" style={{ width: `${lerp(30, 86, t2)}%` }} />
                        <div className="text-[11px] mt-1 text-text/60">Attention</div>
                      </div>
                      <div>
                        <div className="h-2 rounded bg-[#FFF0E6]" />
                        <div className="h-2 mt-1 rounded bg-[#FFCBA5]" style={{ width: `${lerp(20, 66, t2)}%` }} />
                        <div className="text-[11px] mt-1 text-text/60">Positivity</div>
                      </div>
                      <div>
                        <div className="h-2 rounded bg-[#EAF7EE]" />
                        <div className="h-2 mt-1 rounded bg-[#BFE8CB]" style={{ width: `${lerp(40, 92, t2)}%` }} />
                        <div className="text-[11px] mt-1 text-text/60">Clarity</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Summary card */}
                <div
                  className="absolute right-6 bottom-6 left-6"
                  style={{ opacity: t3, transform: `translateY(${(1-t3)*8}px)` }}
                >
                  <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
                    <div className="text-[11px] uppercase tracking-wide text-text/50 mb-2">Recap</div>
                    <ul className="text-[13px] leading-6 text-text/80">
                      <li>• Goal: pilot for 2 teams</li>
                      <li>• Next: proposal + budget confirm</li>
                      <li>• ETA: next Monday</li>
                    </ul>
                    <div className="mt-3 flex items-center gap-2">
                      <button className="rounded-pill px-4 py-2 text-white bg-gradient-to-r from-primaryA to-primaryB shadow-pill text-sm">Copy summary</button>
                      <button className="rounded-pill px-4 py-2 border border-border bg-white text-sm">Email recap</button>
                    </div>
                  </div>
                </div>

                {/* Subtle glow background */}
                <div
                  className="absolute -z-10 left-1/2 -translate-x-1/2 top-14 w-[80%] h-40 rounded-full blur-3xl"
                  style={{
                    background: "radial-gradient(closest-side, rgba(149,202,246,0.25), rgba(241,242,248,0))",
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: steps */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">How Fokus works</h2>
            <p className="text-text/70 mt-2">Scroll to see the private overlay and meeting tools in action.</p>
          </div>
          <ol className="space-y-10">
            {STEPS.map((s, i) => {
              const active = i === idx;
              const prev = i < idx;
              return (
                <li key={i}>
                  <div
                    className="transition-all duration-300"
                    style={{
                      opacity: active ? 1 : prev ? 0.55 : 0.25,
                      transform: active ? "translateY(-4px)" : "none",
                    }}
                  >
                    <div className="text-sm uppercase tracking-wide text-text/60">{i+1} / {STEPS.length}</div>
                    <h3 className="text-xl md:text-2xl font-semibold mt-1">{s.title}</h3>
                    <p className="text-text/70 mt-2">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
