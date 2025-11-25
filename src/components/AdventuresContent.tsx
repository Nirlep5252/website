"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CategoryProgress {
  name: string;
  slug: string;
  solved: number;
  total: number;
}

interface CSESStats {
  solved: number;
  total: number;
  progress: CategoryProgress[];
}

interface AdventuresContentProps {
  csesStats: CSESStats;
}

export function AdventuresContent({ csesStats }: AdventuresContentProps) {
  const solvedPercentage = Math.round(
    (csesStats.solved / csesStats.total) * 100
  );

  return (
    <>
      {/* CSES Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <a
          href="https://cses.fi/user/151151/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block py-8 border-t border-b border-zinc-800"
        >
          <div className="flex items-start justify-between gap-8">
            <div className="flex items-start gap-6 md:gap-12">
              <span className="text-zinc-700 font-mono text-sm pt-2">01</span>

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

            <div className="pt-2">
              <ArrowUpRight className="w-6 h-6 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </div>
        </a>
      </motion.div>

      {/* Categories */}
      {csesStats.progress.length > 0 && (
        <div className="mt-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 text-sm font-mono mb-8"
          >
            Categories
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {csesStats.progress.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              >
                <Link
                  href={`/adventures/cses/${category.slug}`}
                  className="group block p-5 border border-zinc-800/50 rounded-lg hover:border-zinc-700 hover:bg-zinc-900/30 transition-all"
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
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
