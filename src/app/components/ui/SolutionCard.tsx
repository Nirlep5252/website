"use client";

import React from "react";
import { motion } from "framer-motion";

interface Solution {
  name: string;
  category: string;
  code: string;
  content: React.ReactElement;
  frontmatter: {
    title: string;
    problemId: string;
    link: string;
    tags?: string[];
  };
}

export function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  return (
    <motion.div
      key={solution.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white/90 mb-1">
            {solution.frontmatter.title}
          </h3>
          {solution.frontmatter.tags && (
            <div className="flex flex-wrap gap-2">
              {solution.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-blue-400/90 bg-blue-500/10 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <a
          href={solution.frontmatter.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
      <div className="prose prose-invert max-w-none">{solution.content}</div>
    </motion.div>
  );
}
