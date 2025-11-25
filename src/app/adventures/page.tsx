import React from "react";
import { Metadata } from "next";
import { getCSESStats } from "@/lib/cses";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { AdventuresContent } from "@/components/AdventuresContent";

export const metadata: Metadata = {
  title: "Adventures | Nirlep Gohil",
  description:
    "My problem-solving journey through competitive programming challenges, including CSES Problem Set solutions with detailed explanations.",
  keywords: [
    "competitive programming",
    "CSES",
    "problem solving",
    "algorithms",
    "data structures",
  ],
  openGraph: {
    title: "Adventures | Nirlep Gohil",
    description:
      "My problem-solving journey through competitive programming challenges.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventures | Nirlep Gohil",
    description:
      "My problem-solving journey through competitive programming challenges.",
  },
};

export default async function Adventures() {
  const csesStats = await getCSESStats();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeader>Adventures</AnimatedHeader>
        <AdventuresContent csesStats={csesStats} />
      </div>
    </main>
  );
}
