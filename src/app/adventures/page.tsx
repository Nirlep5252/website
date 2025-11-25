import React from "react";
import { getCSESStats } from "@/lib/cses";
import { AdventureCard } from "@/app/components/ui/AdventureCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adventures | Nirlep Gohil",
  description: "My ongoing learning journeys and challenges in competitive programming.",
};

export default async function Adventures() {
  const csesStats = await getCSESStats();
  const solvedPercentage = (csesStats.solved / csesStats.total) * 100;

  const adventures = [
    {
      title: "CSES Problem Set",
      date: "2023 - Present",
      description:
        "My journey through the CSES Problem Set - a collection of competitive programming problems. This is a long-term adventure where I solve algorithmic problems, learn new concepts, and improve my problem-solving skills.",
      progress: csesStats.progress,
      solvedPercentage,
      tags: [
        "Dynamic Programming",
        "Graph Algorithms",
        "Tree Algorithms",
        "Mathematics",
        "String Algorithms",
      ],
      link: "https://cses.fi/user/151151/",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              ~/adventures
            </span>
          </div>
          <h1 className="text-display-md font-display font-bold text-text mb-4">
            Adventures
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Ongoing learning journeys and challenges. Tracking my progress through 
            various competitive programming problem sets.
          </p>
        </div>

        {/* Adventures list */}
        <div className="space-y-4">
          {adventures.map((adventure, index) => (
            <AdventureCard key={index} adventure={adventure} />
          ))}
        </div>
      </div>
    </main>
  );
}
