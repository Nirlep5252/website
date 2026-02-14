import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Nirlep Gohil | Software Engineer",
  description:
    "Full-stack developer crafting elegant solutions with modern technologies. Building open source tools and exploring the art of code.",
  authors: [{ name: "Nirlep Gohil", url: "https://github.com/nirlep5252" }],
  creator: "Nirlep Gohil",
  keywords: [
    "software engineer",
    "full-stack developer",
    "rust",
    "typescript",
    "react",
    "open source",
  ],
  openGraph: {
    title: "Nirlep Gohil | Software Engineer",
    description:
      "Full-stack developer crafting elegant solutions with modern technologies.",
    type: "website",
    url: "https://nirlep.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirlep Gohil | Software Engineer",
    description:
      "Full-stack developer crafting elegant solutions with modern technologies.",
    creator: "@nirlep_5252_",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Load fonts from Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="65115862-88b5-4b2a-8768-11b2a06702f6"
        ></script>
      </head>
      <body className="font-sans antialiased">
        {/* Subtle grain texture */}
        <div className="grain" />

        {/* Dot grid background */}
        <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <Suspense>
          <Navbar />
          <div className="relative z-10">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
