import dynamic from "next/dynamic";

const ScrollShowcasePro = dynamic(() => import("@/components/ScrollShowcasePro"), { ssr: false });

export const metadata = {
  title: "How it works — fokus",
  description: "See the Fokus overlay and meeting tools in a scroll-driven demo.",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">How it works</h1>
        <p className="text-text/70 mt-2">A fast, visual tour of the invisible overlay.</p>
      </div>
      <ScrollShowcasePro />
    </div>
  );
}
