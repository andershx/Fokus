import dynamic from "next/dynamic";
const ScrollShowcasePro = dynamic(() => import("@/components/ScrollShowcasePro"), { ssr: false });

export default function HomeShowcase() {
  return (
    <section id="how-it-works" className="border-t border-border mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">See it in 10 seconds</h2>
          <a href="/how-it-works" className="text-sm text-text/70 hover:text-text underline">Open full demo →</a>
        </div>
        <ScrollShowcasePro />
      </div>
    </section>
  );
}
