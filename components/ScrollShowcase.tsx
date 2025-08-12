
"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ScrollShowcase – a scroll-driven product animation (no external deps).
 * Pins a mock window and animates overlay elements as the user scrolls.
 */

type Step = { title: string; body: string; };

const STEPS: Step[] = [
  { title: "Invisible overlay", body: "Your private aide sits on top of any app, hidden from screen share." },
  { title: "Live suggestions", body: "Get gentle cues and answers as the conversation unfolds." },
  { title: "Capture moments", body: "Drop pins, save snippets, and build a highlight reel." },
  { title: "One‑click recap", body: "Wrap up with decisions, actions, and a shareable summary." },
];

function clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

function useScrollProgress(containerRef: React.RefObject<HTMLDivElement>) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight || document.documentElement.clientHeight;
      const start = viewH * 0.2;
      const end = viewH * 0.8;
      const total = rect.height - (start + (viewH - end));
      const y = clamp((start - rect.top) / (total || 1), 0, 1);
      setProgress(y);
      raf.current = requestAnimationFrame(scroller);
    };
    raf.current = requestAnimationFrame(scroller);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [containerRef]);

  return progress;
}

export default function ScrollShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);

  const stepsCount = STEPS.length;
  const stepIndex = Math.floor(progress * (stepsCount - 1) + 0.0001);
  const stepSize = 1 / (stepsCount - 1);
  const stepT = clamp((progress - stepIndex * stepSize) / stepSize, 0, 1);

  const kf = (from: number, to: number) => from + (to - from) * stepT;

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-4 py-24">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Pinned mock window */}
        <div className="md:sticky md:top-24 md:h-[70vh]">
          <div className="relative h-[52vh] md:h-full rounded-2xl border border-border bg-gradient-to-b from-white/90 to-white/60 shadow-soft overflow-hidden">
            {/* App chrome */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-white/70">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="ml-3 text-xs text-text/60">fokus overlay</div>
            </div>

            {/* Base content being "presented" */}
            <div className="absolute inset-0 pt-10 px-6">
              <div className="h-full rounded-xl bg-white border border-border/60" />
            </div>

            {/* Animated overlay chips / cards */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating chip */}
              <div
                className="absolute left-6 top-14 rounded-full border border-border bg-white/90 px-3 py-1 text-xs shadow-soft"
                style={{ transform: `translateY(${kf(0, -12)}px)`, opacity: kf(0.95, 0.4) }}
              >
                Key point: pricing interest ↑
              </div>

              {/* Answer card */}
              <div
                className="absolute right-6 top-24 w-[58%] md:w-[46%] rounded-xl border border-border bg-white/95 p-3 text-xs shadow-soft"
                style={{ transform: `translateY(${kf(10, -8)}px) scale(${kf(0.98, 1.02)})`, opacity: kf(0.9, 1) }}
              >
                <div className="text-[11px] uppercase tracking-wide text-text/50 mb-1">Answer</div>
                <div className="text-sm leading-snug">“Our standard plan is $19/month. Teams get volume pricing.”</div>
              </div>

              {/* Ghost question strip */}
              <div
                className="absolute left-6 bottom-10 right-6 rounded-lg border border-dashed border-border/70 bg-white/50 px-3 py-2 text-xs"
                style={{ transform: `translateY(${kf(16, -4)}px)`, opacity: kf(0.6, 1) }}
              >
                Suggestion: “Would it help if I share a 30‑sec summary of ROI?”
              </div>
            </div>
          </div>
        </div>

        {/* Right column: step copy */}
        <div className="relative">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">How fokus works</h2>
            <p className="text-text/70 mt-2">Scroll to see it in action. The overlay stays private to you.</p>
          </div>

          <ol className="space-y-10">
            {STEPS.map((s, i) => {
              const active = i === stepIndex;
              const prev = i < stepIndex;
              return (
                <li key={i} className="relative">
                  <div
                    className="transition-all duration-300"
                    style={{
                      opacity: active ? 1 : prev ? 0.5 : 0.25,
                      transform: active ? `translateY(${(1 - stepT) * -6}px)` : "none",
                    }}
                  >
                    <div className="text-sm uppercase tracking-wide text-text/60">{i + 1} / {STEPS.length}</div>
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
