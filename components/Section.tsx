import { PropsWithChildren } from "react";
export function Section({ id, title, subtitle, children }: PropsWithChildren<{ id?: string; title?: string; subtitle?: string }>) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16">
      {title && <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>}
      {subtitle && <p className="mt-3 text-base text-text/70">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
