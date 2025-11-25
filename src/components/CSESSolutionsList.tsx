"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface Solution {
  name: string;
  title: string;
  time: number;
}

interface CSESSolutionsListProps {
  category: string;
  categoryName: string;
  solutions: Solution[];
}

export function CSESSolutionsList({
  category,
  categoryName,
  solutions,
}: CSESSolutionsListProps) {
  return (
    <>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href="/adventures"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-12 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Adventures
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 tracking-tight">
          {categoryName}
        </h1>
        <p className="text-zinc-500 mt-4">
          {solutions.length} problem{solutions.length !== 1 ? "s" : ""} solved
        </p>
      </motion.div>

      {/* Solutions list */}
      <div>
        {solutions.map((solution, index) => (
          <motion.div
            key={solution.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Link
              href={`/adventures/cses/${category}/${solution.name}`}
              className="group block py-5 border-b border-zinc-800 first:border-t"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-zinc-700 font-mono text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg md:text-xl font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                    {solution.title}
                  </h2>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
