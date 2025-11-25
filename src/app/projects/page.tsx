"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "MashCode",
    description:
      "Competitive programming platform focused on LIVE 1v1 battles. Real-time code execution and ranking system.",
    tags: ["React", "Python", "FastAPI", "WebSockets"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Brilliant++",
    description:
      "AI-powered education platform with personalized learning paths and interactive exercises.",
    tags: ["Next.js", "TypeScript", "tRPC", "Gemini"],
    github: "https://github.com/nirlep5252/brilliant-plus-plus",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description:
      "Command-line tool to enhance competitive programming workflow. Parse problems, submit solutions, track standings.",
    tags: ["Python", "CLI"],
    github: "https://github.com/nirlep5252/codeforces-cli",
    featured: true,
  },
  {
    title: "EpicBot",
    description: "Feature-rich Discord bot with moderation and chatbot capabilities.",
    tags: ["Python", "discord.py"],
    github: "https://github.com/nirlep5252/epicbot",
  },
  {
    title: "Fun",
    description: "An interpreted programming language inspired by Lox.",
    tags: ["Java", "Interpreter"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "Doggytype",
    description: "Terminal-based typing test inspired by Monkeytype.",
    tags: ["Rust", "TUI"],
    github: "https://github.com/nirlep5252/doggytype",
  },
  {
    title: "EpicShot",
    description: "Lightweight screenshot tool for Linux.",
    tags: ["Rust", "X11"],
    github: "https://github.com/nirlep5252/epicshot",
  },
  {
    title: "Scheduling Algos",
    description: "Interactive CPU scheduling algorithm visualizer.",
    tags: ["React"],
    github: "https://github.com/nirlep5252/scheduling-algos",
    preview: "https://scheduling.nirlep.dev",
  },
];

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight">
            Work
          </h1>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-24">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block py-8 border-b border-zinc-800 first:border-t"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex items-start gap-6 md:gap-12">
                  {/* Number */}
                  <span className="text-zinc-700 font-mono text-sm pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-4xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-zinc-500 max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
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
            </motion.a>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-zinc-500 text-sm font-mono mb-8"
          >
            Other experiments
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50">
            {otherProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                className="group bg-bg p-6 hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-zinc-600 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-zinc-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 pt-8 border-t border-zinc-800"
        >
          <a
            href="https://github.com/nirlep5252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
