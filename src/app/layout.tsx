import type { Metadata } from "next";
import { JetBrains_Mono, DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nirlep Gohil — Developer",
  description:
    "Full-stack developer crafting elegant solutions. Passionate about open source, competitive programming, and building beautiful web experiences.",
  authors: [{ name: "Nirlep Gohil", url: "https://github.com/nirlep5252" }],
  creator: "Nirlep Gohil",
  keywords: [
    "developer",
    "software engineer",
    "full-stack",
    "react",
    "typescript",
    "rust",
    "python",
    "open source",
  ],
  openGraph: {
    title: "Nirlep Gohil — Developer",
    description:
      "Full-stack developer crafting elegant solutions. Passionate about open source and building beautiful web experiences.",
    type: "website",
    url: "https://nirlep.dev",
    siteName: "nirlep.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirlep Gohil — Developer",
    description:
      "Full-stack developer crafting elegant solutions. Passionate about open source and building beautiful web experiences.",
    creator: "@nirlep_5252_",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${dmSerif.variable}`}
    >
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="65115862-88b5-4b2a-8768-11b2a06702f6"
        ></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        {/* Subtle grid pattern background */}
        <div className="fixed inset-0 grid-pattern pointer-events-none" />
        
        {/* Gradient orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-primary/[0.03] blur-[120px]" />
          <div className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-secondary/[0.02] blur-[120px]" />
        </div>
        
        {/* Noise texture overlay */}
        <div className="noise" />
        
        <Navbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
