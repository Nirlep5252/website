import React from "react";
import { getCSESStats } from "@/lib/cses";
import Link from "next/link";
import { ExternalLink, Trophy, Target, ArrowRight } from "lucide-react";

export default async function Adventures() {
  const csesStats = await getCSESStats();
  const solvedPercentage = Math.round((csesStats.solved / csesStats.total) * 100);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// adventures"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Coding Adventures
          </h1>
          <p className="text-zinc-400 text-lg">
            Long-term challenges and journeys in competitive programming and
            algorithm design.
          </p>
        </div>

        {/* CSES Card */}
        <div className="p-6 bg-bg-secondary border border-border rounded-xl">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Trophy className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  CSES Problem Set
                </h2>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                My journey through the CSES Problem Set - a collection of
                competitive programming problems. Solving algorithmic
                challenges, learning new concepts, and improving problem-solving
                skills.
              </p>
            </div>
            <a
              href="https://cses.fi/user/151151/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all"
              aria-label="View CSES profile"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400 font-mono">Progress</span>
              <span className="text-sm text-emerald-500 font-mono">
                {csesStats.solved} / {csesStats.total} solved
              </span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
                style={{ width: `${solvedPercentage}%` }}
              />
            </div>
            <p className="text-xs text-zinc-600 mt-2 font-mono">
              {solvedPercentage}% complete
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {csesStats.progress.map((category) => (
              <Link
                key={category.name}
                href={`/adventures/cses/${category.slug}`}
                className="group p-4 bg-bg-tertiary rounded-lg border border-transparent hover:border-border transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-zinc-300 text-sm font-medium group-hover:text-emerald-500 transition-colors">
                    {category.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500/70 rounded-full"
                      style={{
                        width: `${(category.solved / category.total) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">
                    {category.solved}/{category.total}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "Dynamic Programming",
              "Graph Algorithms",
              "Tree Algorithms",
              "Mathematics",
              "Strings",
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono bg-zinc-800/50 text-zinc-500 rounded border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-8 p-6 bg-bg-secondary/50 border border-border border-dashed rounded-xl text-center">
          <Target className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-zinc-400 font-medium mb-1">More Adventures</h3>
          <p className="text-zinc-600 text-sm">
            More coding challenges and projects coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
