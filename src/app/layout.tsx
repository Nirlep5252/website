import type { Metadata } from "next";
import { Suspense } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SITE } from "@/lib/site";
import { DevPanel } from "@/components/emulsion/DevPanel";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Nirlep Gohil | Software Engineer",
  description:
    "Full-stack developer crafting elegant solutions with modern technologies. Building open source tools and exploring the art of code.",
  authors: [{ name: SITE.name, url: "https://github.com/nirlep5252" }],
  creator: SITE.name,
  keywords: ["software engineer", "full-stack developer", "rust", "typescript", "react", "open source"],
  openGraph: {
    title: "Nirlep Gohil | Software Engineer",
    description: "Full-stack developer crafting elegant solutions with modern technologies.",
    type: "website",
    url: SITE.url,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "nirlep.dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirlep Gohil | Software Engineer",
    description: "Full-stack developer crafting elegant solutions with modern technologies.",
    creator: SITE.handle,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="65115862-88b5-4b2a-8768-11b2a06702f6"></script>
      </head>
      <body className="font-sans antialiased">
        <Suspense>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        {process.env.NODE_ENV !== "production" && <DevPanel />}
      </body>
    </html>
  );
}
