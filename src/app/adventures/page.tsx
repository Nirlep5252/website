import React from "react";
import { getCSESStats } from "@/lib/cses";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { AdventuresContent } from "@/components/AdventuresContent";

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
