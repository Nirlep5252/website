import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AnimatedBackground from "./components/AnimatedBackground";
// import AnimatedCursor from "./components/AnimatedCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nirlep Gohil - Developer Portfolio",
  description:
    "Full-stack developer and open source enthusiast. Building modern web applications and sharing knowledge through code.",
  authors: [{ name: "Nirlep Gohil", url: "https://github.com/nirlep5252" }],
  creator: "Nirlep Gohil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <AnimatedBackground />
        {/* <AnimatedCursor /> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
