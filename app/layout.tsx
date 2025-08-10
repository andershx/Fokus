import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/meta";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
      </body>
    </html>
  );
}
