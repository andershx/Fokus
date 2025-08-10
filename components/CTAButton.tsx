import Link from "next/link";
import { PropsWithChildren } from "react";

export function CTAButton({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-pill px-6 py-3 font-medium text-white
                 bg-gradient-to-r from-primaryA to-primaryB shadow-pill
                 hover:brightness-105 active:brightness-95 transition"
    >
      {children}
    </Link>
  );
}
