"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

const projects = [
  {
    title: "MashCode",
    description:
      "Competitive programming platform focused on LIVE 1v1 battles. Real-time code execution and ranking system.",
    tags: ["React", "Python", "FastAPI", "WebSockets", "PostgreSQL"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Brilliant++",
    description:
      "AI-powered education platform with personalized learning paths and interactive exercises.",
    tags: ["Next.js", "TypeScript", "tRPC", "Prisma", "Gemini"],
    github: "https://github.com/nirlep5252/brilliant-plus-plus",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description:
      "Command-line tool to enhance competitive programming workflow. Parse problems, submit solutions, and track standings.",
    tags: ["Python", "CLI", "Web Scraping"],
    github: "https://github.com/nirlep5252/codeforces-cli",
    featured: true,
  },
  {
    title: "EpicBot",
    description:
      "Feature-rich Discord bot with moderation, fun commands, and custom chatbot capabilities.",
    tags: ["Python", "discord.py", "MongoDB"],
    github: "https://github.com/nirlep5252/epicbot",
  },
  {
    title: "Fun",
    description:
      "An interpreted programming language heavily inspired by Lox. Built to understand language design.",
    tags: ["Java", "Interpreter", "PL"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "Doggytype",
    description:
      "Terminal-based typing test application inspired by Monkeytype. Track WPM and accuracy.",
    tags: ["Rust", "TUI", "CLI"],
    github: "https://github.com/nirlep5252/doggytype",
  },
  {
    title: "EpicShot",
    description:
      "Lightweight screenshot tool for Linux with annotation support and clipboard integration.",
    tags: ["Rust", "XCB", "X11"],
    github: "https://github.com/nirlep5252/epicshot",
  },
  {
    title: "Thoughtful Threads",
    description: "Minimalist blog platform with markdown support and clean reading experience.",
    tags: ["Next.js", "Prisma", "AuthJS"],
    github: "https://github.com/nirlep5252/thoughtful-threads",
    preview: "https://thoughtful-threads.vercel.app/",
  },
  {
    title: "Scheduling Algos",
    description:
      "Interactive visualizer for CPU scheduling algorithms like FCFS, SJF, RR, and Priority.",
    tags: ["React", "Algorithms"],
    github: "https://github.com/nirlep5252/scheduling-algos",
    preview: "https://scheduling.nirlep.dev",
  },
];

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// projects"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Things I&apos;ve Built
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl">
            A collection of projects I&apos;ve worked on. From competitive
            programming platforms to CLI tools and interpreters.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">
            Featured
          </h2>
          <div className="grid gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 bg-bg-secondary border border-border rounded-xl hover:border-border-hover transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-emerald-500 transition-colors">
                        {project.title}
                      </h3>
                      <Star className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-zinc-400 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-all"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-wider mb-6">
            Other Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + index * 0.1,
                }}
                className="group p-5 bg-bg-secondary/50 border border-border rounded-xl hover:border-border-hover hover:bg-bg-secondary transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-emerald-500 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-500 hover:text-zinc-100 transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-500 hover:text-zinc-100 transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono text-zinc-500 bg-zinc-800/50 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/nirlep5252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-zinc-300 font-medium rounded-lg hover:border-border-hover hover:text-zinc-100 transition-all"
          >
            <Github className="w-5 h-5" />
            View more on GitHub
          </a>
        </motion.div>
      </div>
    </main>
  );
}
