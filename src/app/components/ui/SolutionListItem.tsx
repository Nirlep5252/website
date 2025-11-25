"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileCode, ArrowRight } from "lucide-react";

interface Solution {
  name: string;
  title: string;
  category: string;
  time: number;
}

interface SolutionListItemProps {
  solution: Solution;
  index: number;
}

export function SolutionListItem({ solution, index }: SolutionListItemProps) {
  return (
    <Link href={`/adventures/cses/${solution.category}/${solution.name}`} className="block">
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        whileHover={{ x: 4 }}
        className="group card p-4 flex items-center gap-4"
      >
        <div className="w-8 h-8 rounded-lg bg-bg-hover border border-border flex items-center justify-center shrink-0">
          <FileCode className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-text group-hover:text-primary transition-colors truncate">
            {solution.title}
          </h3>
        </div>

        <ArrowRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all shrink-0" />
      </motion.article>
    </Link>
  );
}
