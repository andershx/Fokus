
import dynamic from "next/dynamic";

const ScrollShowcase = dynamic(() => import("@/components/ScrollShowcase"), { ssr: false });

export const metadata = {
  title: "How it works — fokus",
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">How it works</h1>
        <p className="text-text/70 mt-2">A quick scroll demo of the invisible overlay.</p>
      </div>
      <ScrollShowcase />
    </div>
  );
}
