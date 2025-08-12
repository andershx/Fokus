import HomeShowcase from "@/components/HomeShowcase";
import Link from "next/link";

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
            <Link href="/downloads" className="inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium text-white bg-gradient-to-r from-primaryA to-primaryB shadow-pill hover:brightness-105">
              See downloads
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium border border-border hover:bg-white/60">
              See it in 10 seconds ↓
            </a>
          </div>

          <div className="mt-3 text-xs text-text/60">Press ⌘K / Ctrl+K to try the overlay anywhere.</div>
        </div>
      </div>

      {/* How it works scrollytelling section (anchored) */}
      <HomeShowcase />

      {/* You can keep any sections that used to follow here (features, CTA stripe, etc.) */}
    </>
  );
}
