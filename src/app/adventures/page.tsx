import React from "react";
import { getCSESStats } from "@/lib/cses";
import { AdventureCard } from "@/app/components/ui/AdventureCard";

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
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Adventures</h1>
        <div className="flex flex-col gap-4">
          {adventures.map((adventure, index) => (
            <AdventureCard key={index} adventure={adventure} />
          ))}
        </div>
      </div>
    </main>
  );
}
