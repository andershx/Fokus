import { CTAButton } from "@/components/CTAButton";
import { DarkButton } from "@/components/DarkButton";
import { Section } from "@/components/Section";
import { FeatureCard } from "@/components/FeatureCard";

export default function Page() {
  return (
    <>
      <div className="border-b border-border relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 relative">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">It&apos;s time to focus</h1>
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
            <CTAButton href="/downloads"> Get for Mac</CTAButton>
            <DarkButton href="/downloads">⊞ Get for Windows</DarkButton>
          </div>
          <div className="mt-3 text-xs text-text/60">Undetectable overlay. Private to you. Press ⌘K / Ctrl+K to try.</div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-2xl p-4 border border-border frosted flex items-center justify-between gap-3">
          <div className="text-sm">Try the overlay now — press <b>⌘K / Ctrl+K</b>. Clean transcripts at <a className="underline" href="/transcripts">/transcripts</a>.</div>
          <a href="/pricing" className="inline-flex items-center justify-center rounded-pill px-4 py-2 font-medium border border-border hover:bg-white/60">See pricing</a>
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
