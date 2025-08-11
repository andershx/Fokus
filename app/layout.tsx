import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/meta";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";

const OverlayClient = dynamic(() => import("@/components/OverlayClient"), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://fokus.example"),
  title: {
    default: "fokus — think in real time",
    template: "%s — fokus"
  },
  description: site.description,
  openGraph: {
    title: "fokus",
    description: site.description,
    images: [{ url: site.ogImage }]
  },
  icons: { icon: "/favicon.svg", apple: "/app-icon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <OverlayClient />
      </body>
    </html>
  );
}
