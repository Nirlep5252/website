"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Solution {
  name: string;
  title: string;
  category: string;
  time: number;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function SolutionListItem({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  return (
    <Link href={`/adventures/cses/${solution.category}/${solution.name}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex items-center justify-between p-4 bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-xl hover:border-blue-500/50 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white/90 truncate">
            {solution.title}
          </h3>
          <div className="text-sm text-gray-400 mt-1">
            {formatDate(solution.time)}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
