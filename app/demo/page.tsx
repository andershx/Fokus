"use client";
import OverlayClient from "@/components/OverlayClient";

export default function Demo() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Overlay Demo</h1>
      <p className="text-text/70 mb-6">
        Press <kbd>⌘K</kbd> (Mac) or <kbd>Ctrl+K</kbd> (Windows) to toggle the overlay globally on any page. Press <kbd>Esc</kbd> to close.
      </p>
      <p className="text-text/70">This page includes the overlay as well, but the overlay is now injected globally via <code>app/layout.tsx</code>.</p>
      <OverlayClient />
    </div>
  );
}
