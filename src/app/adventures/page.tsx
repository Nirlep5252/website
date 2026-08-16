import React from "react";
import { Metadata } from "next";
import { getCSESStats } from "@/lib/cses";
import { Develop } from "@/components/emulsion/Develop";
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
    <main className="surface-paper min-h-screen">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-36 pb-24">
        <Develop className="eyebrow text-ink/70 mb-4" inView={false}>
          Adventures
        </Develop>
        <Develop delay={80} inView={false}>
          <h1 className="display text-[clamp(2.4rem,5.5vw,4.5rem)]">Problems, on purpose.</h1>
        </Develop>
        <Develop delay={160} inView={false}>
          <p className="lede text-ink/65 mt-4 max-w-[52ch]">
            Competitive programming and the occasional rabbit hole, with worked solutions.{" "}
            {csesStats.solved} of {csesStats.total} CSES problems so far.
          </p>
        </Develop>

        <AdventuresContent csesStats={csesStats} />
      </div>
    </main>
  );
}
