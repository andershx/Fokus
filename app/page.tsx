import { CTAButton } from "@/components/CTAButton";
import { DarkButton } from "@/components/DarkButton";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";
import dynamic from "next/dynamic";

const HomeShowcase = dynamic(() => import("@/components/HomeShowcase"), { ssr: false });

export default function Page() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 relative">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">It&apos;s time to focus</h1>

          {/* Ghost stack */}
          <div aria-hidden className="hero-ghost leading-none">
            <div>Interviews.</div>
            <div>Sales calls.</div>
            <div className="text-text">Homework.</div>
            <div>Meetings.</div>
            <div>Everything.</div>
          </div>

          <p className="mt-6 text-text/70 max-w-xl">
            fokus gives you live notes, answers, and gentle prompts — right when you need them — without anyone else seeing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <CTAButton href="/downloads">&nbsp; Get for Mac</CTAButton>
            <DarkButton href="/downloads">⊞&nbsp; Get for Windows</DarkButton>
          </div>

          <div className="mt-3 text-xs text-text/60">Undetectable overlay. Private to you. Press ⌘K / Ctrl+K to try.</div>

          {/* Jump link to the scroll animation */}
          <div className="mt-6">
            <a href="#how-it-works" className="inline-flex items-center gap-2 text-sm text-primaryA hover:underline">
              See it in 10 seconds <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <Section title="Why fokus?" subtitle="Designed for interviews, sales calls, support, and study sessions.">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard title="Live notetaking">Capture key points automatically and export later.</FeatureCard>
          <FeatureCard title="Instant answers">Look up definitions, facts, and context mid-conversation.</FeatureCard>
          <FeatureCard title="Invisible overlay">A translucent window that never shows on screen share.</FeatureCard>
        </div>
      </Section>

      {/* Scroll showcase wired into homepage */}
      <HomeShowcase />

      {/* CTA stripe */}
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl p-8 border border-border frosted">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">Try the overlay now</h3>
              <p className="text-text/70">Press ⌘K (Mac) or Ctrl+K (Windows). Esc to close.</p>
            </div>
            <div className="flex gap-3">
              <CTAButton href="/pricing">See pricing</CTAButton>
              <a href="/demo" className="inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium border border-border hover:bg-white/60">
                View demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
