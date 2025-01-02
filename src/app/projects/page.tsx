"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [activePopover, setActivePopover] = useState<number | null>(null);
  const MAX_VISIBLE_TAGS = 5;

  const projects = [
    {
      title: "MashCode",
      description: "Competitive programming platform, focused on LIVE 1v1s.",
      tags: [
        "ReactJS",
        "TailwindCSS",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Websockets",
        "Docker",
      ],
      github: "https://github.com/nirlep5252/mashcode",
    },
    {
      title: "Brilliant++",
      description: "AI powered education platform.",
      tags: [
        "NextJS",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "tRPC",
        "TailwindCSS",
        "Gemini",
        "Cloudinary",
        "Docker",
      ],
      github: "https://github.com/nirlep5252/brilliant-plus-plus",
    },
    {
      title: "EpicBot",
      description: "A simple, multipurpose Discord bot.",
      tags: ["Python", "discord.py", "MongoDB", "Chatbot", "Pillow"],
      github: "https://github.com/nirlep5252/epicbot",
    },
    {
      title: "Codeforces CLI",
      description:
        "A simple CLI tool to enhance your competitive programming workflow.",
      tags: ["Python", "CLI", "Codeforces", "Web Scraping"],
      github: "https://github.com/nirlep5252/codeforces-cli",
    },
    {
      title: "Fun",
      description:
        "A funny little interpreted programming language heavily inspired by Lox.",
      tags: ["Java", "Interpreter", "Lox"],
      github: "https://github.com/nirlep5252/fun",
    },
    {
      title: "Portfolio",
      description: "My personal website, built with NextJS and TailwindCSS.",
      tags: ["NextJS", "TailwindCSS"],
      github: "https://github.com/nirlep5252/website",
      preview: "https://nirlep.dev",
    },
    {
      title: "Thoughtful Threads",
      description: "A simple blog website, built with NextJS and TailwindCSS.",
      tags: ["NextJS", "Prisma", "AuthJS", "PostgreSQL", "TailwindCSS"],
      github: "https://github.com/nirlep5252/thoughtful-threads",
      preview: "https://thoughtful-threads.vercel.app/",
    },
    {
      title: "URL Shortener API",
      description: "A Simple basic URL shortener API.",
      tags: ["Python", "FastAPI", "PostgreSQL"],
      github: "https://github.com/Nirlep5252/url-shortener-api",
    },
    {
      title: "Doggytype",
      description:
        "A typing test terminal application inspired from Monkeytype.",
      tags: ["Rust", "CLI"],
      github: "https://github.com/nirlep5252/doggytype",
    },
    {
      title: "EpicShot",
      description: "A screenshot tool for Linux, built with Rust.",
      tags: ["Rust", "XCB", "X11", "Linux"],
      github: "https://github.com/nirlep5252/epicshot",
    },
    {
      title: "EpicBot Images",
      description:
        "A Python module that creates memes and several cool effects from images.",
      tags: ["Python", "Pillow", "Wand"],
      github: "https://github.com/nirlep5252/epicbot-images",
    },
    {
      title: "Scheduling Algos",
      description:
        "A simple web app to visualize various scheduling algorithms.",
      tags: ["ReactJS"],
      github: "https://github.com/nirlep5252/scheduling-algos",
      preview: "https://scheduling.nirlep.dev",
    },
  ];

  const renderTags = (tags: string[], projectIndex: number) => {
    if (tags.length <= MAX_VISIBLE_TAGS) {
      return tags.map((tag, tagIndex) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + tagIndex * 0.1 }}
          className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-300/90 rounded-md border border-blue-500/20 hover:bg-blue-500/15 transition-colors duration-200"
        >
          {tag}
        </motion.span>
      ));
    }

    return (
      <>
        {tags.slice(0, MAX_VISIBLE_TAGS).map((tag, tagIndex) => (
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
        <div className="relative">
          <button
            className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-300/90 rounded-md border border-blue-500/20 hover:bg-blue-500/15 transition-colors duration-200"
            onMouseEnter={() => setActivePopover(projectIndex)}
            onMouseLeave={() => setActivePopover(null)}
          >
            +{tags.length - MAX_VISIBLE_TAGS}
          </button>
          <AnimatePresence>
            {activePopover === projectIndex && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-30 bottom-full mb-2 bg-gray-900 border border-white/5 rounded-xl p-2 shadow-xl min-w-max backdrop-blur-xl origin-bottom"
              >
                <div className="flex flex-wrap gap-2">
                  {tags.slice(MAX_VISIBLE_TAGS).map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + tagIndex * 0.05 }}
                      className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-300/90 rounded-md border border-blue-500/20"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-white/5"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  };

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.01, y: -2 }}
              variants={cardVariants}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative group overflow-hidden rounded-xl backdrop-blur-xl p-[1px] cursor-pointer ${activePopover === index ? "z-20" : "z-10"}`}
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
                    {project.title}
                  </motion.h2>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all hover:scale-110 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all hover:scale-110 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()}
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
                    )}
                  </div>
                </motion.div>
                <motion.p
                  variants={contentVariants}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300/70 leading-relaxed"
                >
                  {project.description}
                </motion.p>
                <motion.div
                  variants={contentVariants}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-1.5"
                >
                  {renderTags(project.tags, index)}
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
