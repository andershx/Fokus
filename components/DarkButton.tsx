import Link from "next/link";

export function DarkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium text-white
                 bg-gradient-to-b from-darkA to-darkB shadow-soft
                 hover:brightness-110 active:brightness-95 transition border border-white/5"
    >
      {children}
    </Link>
  );
}
