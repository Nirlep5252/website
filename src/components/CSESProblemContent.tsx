"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CSESProblemContentProps {
  category: string;
  categoryName: string;
  problemTitle: string;
  formattedDate: string | null;
  children: React.ReactNode;
}

export function CSESProblemContent({
  category,
  categoryName,
  problemTitle,
  formattedDate,
  children,
}: CSESProblemContentProps) {
  return (
    <>
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          href={`/adventures/cses/${category}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-12 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {categoryName}
        </Link>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            {problemTitle}
          </h1>
          <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
            {formattedDate && <span>{formattedDate}</span>}
            <span className="text-zinc-700">CSES</span>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-zinc-100 prose-headings:font-semibold prose-p:text-zinc-300 prose-a:text-emerald-500 hover:prose-a:text-emerald-400 prose-strong:text-zinc-200 prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-emerald-500 prose-blockquote:text-zinc-400 prose-hr:border-border">
          {children}
        </div>
      </motion.article>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 pt-8 border-t border-zinc-800"
      >
        <Link
          href={`/adventures/cses/${category}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {categoryName}
        </Link>
      </motion.div>
    </>
  );
}
