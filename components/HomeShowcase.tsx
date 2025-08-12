import dynamic from "next/dynamic";

// Client-only scroll animation
const ScrollShowcase = dynamic(() => import("@/components/ScrollShowcase"), { ssr: false });

export default function HomeShowcase() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <ScrollShowcase />
    </section>
  );
}
