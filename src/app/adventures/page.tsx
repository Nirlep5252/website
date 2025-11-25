import React from "react";
import { getCSESStats } from "@/lib/cses";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function Adventures() {
  const csesStats = await getCSESStats();
  const solvedPercentage = Math.round(
    (csesStats.solved / csesStats.total) * 100
  );

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight">
            Adventures
          </h1>
        </div>

        {/* CSES Section */}
        <div>
          <a
            href="https://cses.fi/user/151151/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-8 border-t border-b border-zinc-800"
          >
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-start gap-6 md:gap-12">
                {/* Number */}
                <span className="text-zinc-700 font-mono text-sm pt-2">01</span>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
                      CSES Problem Set
                    </h2>
                    <p className="text-zinc-500 mt-2 max-w-xl">
                      A collection of competitive programming problems. Solving
                      algorithmic challenges and improving problem-solving
                      skills.
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${solvedPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-zinc-600">
                      {csesStats.solved}/{csesStats.total} solved
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {["DP", "Graphs", "Trees", "Math", "Strings"].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="pt-2">
                <ArrowUpRight className="w-6 h-6 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          </a>
        </div>

        {/* Categories */}
        {csesStats.progress.length > 0 && (
          <div className="mt-16">
            <h2 className="text-zinc-500 text-sm font-mono mb-8">Categories</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {csesStats.progress.map((category) => (
                <Link
                  key={category.name}
                  href={`/adventures/cses/${category.slug}`}
                  className="group p-5 border border-zinc-800/50 rounded-lg hover:border-zinc-700 hover:bg-zinc-900/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                      {category.name}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500/70 rounded-full"
                        style={{
                          width: `${(category.solved / category.total) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-zinc-600">
                      {category.solved}/{category.total}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
