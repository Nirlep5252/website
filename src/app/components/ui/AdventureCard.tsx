"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Target, Trophy } from "lucide-react";

interface Adventure {
  title: string;
  date: string;
  description: string;
  progress: string;
  solvedPercentage: number;
  tags: string[];
  link: string;
}

interface AdventureCardProps {
  adventure: Adventure;
}

export function AdventureCard({ adventure }: AdventureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-6 md:p-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text mb-1">
                {adventure.title}
              </h2>
              <span className="text-sm font-mono text-text-tertiary">
                {adventure.date}
              </span>
            </div>
          </div>

          <p className="text-text-secondary mb-6 leading-relaxed">
            {adventure.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {adventure.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-mono bg-bg-hover border border-border rounded-md text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/adventures/cses">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                View Solutions
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a
              href={adventure.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2 text-sm"
            >
              CSES Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Progress section */}
        <div className="lg:w-64 shrink-0">
          <div className="card p-5 bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-secondary" />
              <span className="text-sm font-mono text-text-tertiary">
                Progress
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-text">
                  {adventure.solvedPercentage.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-bg-hover rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${adventure.solvedPercentage}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="text-sm font-mono text-text-secondary">
              {adventure.progress}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
