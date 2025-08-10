import { PropsWithChildren } from "react";
export function FeatureCard({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded-2xl border border-border bg-white/50 p-6 shadow-soft">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-text/80">{children}</p>
    </div>
  );
}
