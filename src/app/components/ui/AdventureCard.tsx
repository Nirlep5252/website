"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

interface Adventure {
  title: string;
  date: string;
  description: string;
  progress: string;
  solvedPercentage: number;
  tags: string[];
  link?: string;
}

export function AdventureCard({ adventure }: { adventure: Adventure }) {
  const router = useRouter();

  const handleClick = () => {
    if (adventure.title === "CSES Problem Set") {
      router.push("/adventures/cses");
    }
  };

  return (
    <motion.article
      onClick={handleClick}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01, y: -2 }}
      variants={cardVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group overflow-hidden rounded-xl backdrop-blur-xl p-[1px] cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] transition-opacity duration-700" />
      <div className="relative h-full bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-xl p-7 flex flex-col gap-4">
        <motion.div
          variants={contentVariants}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-start"
        >
          <motion.h2
            variants={contentVariants}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white/95 group-hover:text-white transition-colors duration-300"
          >
            {adventure.title}
          </motion.h2>
          <motion.span
            variants={contentVariants}
            transition={{ delay: 0.2 }}
            className="text-sm text-blue-400/90"
          >
            {adventure.date}
          </motion.span>
        </motion.div>
        <motion.p
          variants={contentVariants}
          transition={{ delay: 0.3 }}
          className="text-gray-300/70 leading-relaxed"
        >
          {adventure.description}
        </motion.p>
        <motion.div
          variants={contentVariants}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 text-sm text-blue-400/90"
        >
          <div className="w-full bg-blue-500/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-blue-500/30 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${adventure.solvedPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <span className="whitespace-nowrap">{adventure.progress}</span>
        </motion.div>
        <motion.div
          variants={contentVariants}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-1.5"
        >
          {adventure.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + tagIndex * 0.1 }}
              className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-300/90 rounded-md border border-blue-500/20 hover:bg-blue-500/15 transition-colors duration-200"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        {adventure.link && (
          <motion.a
            href={adventure.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={contentVariants}
            transition={{ delay: 0.5 }}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1 mt-2"
          >
            View Progress
            <svg
              className="w-4 h-4"
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
          </motion.a>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
        />
      </div>
    </motion.article>
  );
}
