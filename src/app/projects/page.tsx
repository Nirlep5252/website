"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "MashCode",
    description: "Competitive programming platform, focused on LIVE 1v1s.",
    tags: ["ReactJS", "TailwindCSS", "Python", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Brilliant++",
    description: "AI powered education platform that secured 2nd place at HackNUthon 5.0.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "tRPC", "Gemini"],
    github: "https://github.com/nirlep5252/brilliant-plus-plus",
    featured: true,
  },
  {
    title: "EpicBot",
    description: "A simple, multipurpose Discord bot with 500k+ servers.",
    tags: ["Python", "discord.py", "MongoDB", "Pillow"],
    github: "https://github.com/nirlep5252/epicbot",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description: "CLI tool to enhance your competitive programming workflow.",
    tags: ["Python", "CLI", "Codeforces", "Web Scraping"],
    github: "https://github.com/nirlep5252/codeforces-cli",
  },
  {
    title: "Fun",
    description: "An interpreted programming language heavily inspired by Lox.",
    tags: ["Java", "Interpreter", "Lox"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "Doggytype",
    description: "A typing test terminal application inspired by Monkeytype.",
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
    title: "Scheduling Algos",
    description: "Web app to visualize various scheduling algorithms.",
    tags: ["ReactJS"],
    github: "https://github.com/nirlep5252/scheduling-algos",
    preview: "https://scheduling.nirlep.dev",
  },
  {
    title: "Thoughtful Threads",
    description: "A simple blog website, built with Next.js.",
    tags: ["Next.js", "Prisma", "AuthJS", "PostgreSQL"],
    github: "https://github.com/nirlep5252/thoughtful-threads",
    preview: "https://thoughtful-threads.vercel.app/",
  },
  {
    title: "URL Shortener API",
    description: "A simple URL shortener API built with FastAPI.",
    tags: ["Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/Nirlep5252/url-shortener-api",
  },
  {
    title: "EpicBot Images",
    description: "Python module for creating memes and cool image effects.",
    tags: ["Python", "Pillow", "Wand"],
    github: "https://github.com/nirlep5252/epicbot-images",
  },
  {
    title: "Portfolio",
    description: "This website, built with Next.js and TailwindCSS.",
    tags: ["Next.js", "TailwindCSS"],
    github: "https://github.com/nirlep5252/website",
    preview: "https://nirlep.dev",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              ~/projects
            </span>
          </div>
          <h1 className="text-display-md font-display font-bold text-text mb-4">
            Things I&apos;ve Built
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            A collection of projects I&apos;ve worked on, from competitive programming 
            tools to full-stack applications.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <h2 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            Featured Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group card p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-primary font-mono text-sm font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bg-hover text-text-tertiary hover:text-text transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-bg-hover text-text-tertiary hover:text-text transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-sm text-text-secondary mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-bg-hover border border-border rounded text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-mono bg-bg-hover border border-border rounded text-text-tertiary">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Other Projects */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            Other Projects
          </h2>
          <div className="grid gap-3">
            {otherProjects.map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="group card p-4 flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-medium text-text group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-text transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.preview && (
                        <a
                          href={project.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-tertiary hover:text-text transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-text-tertiary truncate">
                    {project.description}
                  </p>
                </div>

                <div className="hidden sm:flex flex-wrap gap-1.5 justify-end shrink-0">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-mono bg-bg-hover border border-border rounded text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="https://github.com/nirlep5252"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-bg-card hover:border-border-hover transition-colors"
          >
            <Github className="w-5 h-5 text-text-secondary" />
            <span className="text-sm font-mono text-text-secondary">
              View more on GitHub
            </span>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
