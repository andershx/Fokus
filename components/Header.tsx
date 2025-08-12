"use client";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { CTAButton } from "./CTAButton";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="sr-only">fokus</span>
          <Logo wordmark className="hidden md:block w-40 h-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/pricing" className="text-sm text-text/70 hover:text-text">Pricing</Link>
          <Link href="/transcripts" className="text-sm text-text/70 hover:text-text">Transcripts</Link>
          <Link href="/demo" className="text-sm text-text/70 hover:text-text">Demo</Link>
          <Link href="/downloads" className="text-sm text-text/70 hover:text-text">Downloads</Link>
          <CTAButton href="/downloads">Get fokus</CTAButton>
        </nav>
        <button aria-label="Menu" onClick={() => setOpen(v => !v)}
          className="md:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-border bg-white/60">
          <span className="sr-only">Toggle menu</span>
          <div className="w-5 h-0.5 bg-text/80 rounded absolute top-[11px]" />
          <div className="w-5 h-0.5 bg-text/80 rounded" />
          <div className="w-5 h-0.5 bg-text/80 rounded absolute bottom-[11px]" />
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="frosted p-4">
            <div className="flex flex-col gap-2">
              <Link href="/pricing" className="px-3 py-2 rounded-lg hover:bg-white/60 text-sm">Pricing</Link>
              <Link href="/transcripts" className="px-3 py-2 rounded-lg hover:bg-white/60 text-sm">Transcripts</Link>
              <Link href="/demo" className="px-3 py-2 rounded-lg hover:bg-white/60 text-sm">Demo</Link>
              <Link href="/downloads" className="px-3 py-2 rounded-lg hover:bg-white/60 text-sm">Downloads</Link>
              <div className="pt-2">
                <CTAButton href="/downloads">Get fokus</CTAButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
