"use client";
import { CTAButton } from "@/components/CTAButton";
import { DarkButton } from "@/components/DarkButton";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import { useEffect, useState } from "react";

export default function Page() {
  const [showGhost, setShowGhost] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowGhost(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">It&apos;s time to focus</h1>

          <div aria-hidden className={`hero-ghost ${showGhost ? "show" : ""}`}>
            <div>Interviews.</div>
            <div>Sales calls.</div>
            <div className="text-text">Homework.</div>
            <div>Meetings.</div>
            <div>Everything.</div>
          </div>

          <div className="mt-8 flex flex-col gap-4 max-w-sm">
            <CTAButton href="/downloads"> Get for Mac</CTAButton>
            <DarkButton href="/downloads">⊞ Get for Windows</DarkButton>
          </div>
        </div>
      </div>

      <Section title="Why fokus?" subtitle="Designed for interviews, sales calls, support, and study sessions.">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Live notetaking">Capture key points automatically and export later.</FeatureCard>
          <FeatureCard title="Instant answers">Look up definitions, facts, and context mid-conversation.</FeatureCard>
          <FeatureCard title="Invisible overlay">A translucent window that never shows on screen share.</FeatureCard>
        </div>
      </Section>
    </>
  );
}
