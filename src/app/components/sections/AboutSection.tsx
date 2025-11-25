"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Terminal,
  Code2,
  Cpu,
  Database,
  Zap,
  ArrowUpRight,
  Trophy,
} from "lucide-react";
import { Post } from "@/lib/mdx";

interface AboutSectionProps {
  recentPosts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const skills = {
  languages: ["Rust", "TypeScript", "Python", "Go", "C++", "Java"],
  frontend: ["React", "Next.js", "TailwindCSS", "Framer Motion"],
  backend: ["FastAPI", "Node.js", "PostgreSQL", "Redis", "Docker"],
  interests: ["System Design", "Performance", "Algorithms"],
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const AboutSection = ({ recentPosts }: AboutSectionProps) => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// about"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            What I Do
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Main card - Who I am */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-2 p-6 bg-bg-secondary border border-border rounded-xl group hover:border-border-hover transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Terminal className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-zinc-100 mb-2">
                  Full-Stack Developer
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  I craft modern web applications with a focus on performance,
                  accessibility, and user experience. With expertise spanning
                  from low-level systems programming to modern frontend
                  frameworks, I bring ideas to life through clean, maintainable
                  code.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Web Apps", "APIs", "CLI Tools", "System Design"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-zinc-800/50 text-zinc-400 rounded-md border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Problem Solving card */}
          <motion.div
            variants={staggerItem}
            className="p-6 bg-bg-secondary border border-border rounded-xl group hover:border-border-hover transition-colors"
          >
            <div className="p-2 bg-amber-500/10 rounded-lg w-fit mb-4">
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
              Problem Solving
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Competitive programming enthusiast. Solving algorithmic challenges
              and optimizing for performance.
            </p>
            <Link
              href="/adventures"
              className="inline-flex items-center gap-1 text-emerald-500 text-sm mt-4 hover:text-emerald-400 transition-colors"
            >
              View Solutions
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>

          {/* Languages */}
          <motion.div
            variants={staggerItem}
            className="p-6 bg-bg-secondary border border-border rounded-xl"
          >
            <div className="p-2 bg-violet-500/10 rounded-lg w-fit mb-4">
              <Code2 className="w-5 h-5 text-violet-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2 py-1 text-xs font-mono bg-violet-500/10 text-violet-400 rounded border border-violet-500/20"
                >
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            variants={staggerItem}
            className="p-6 bg-bg-secondary border border-border rounded-xl"
          >
            <div className="p-2 bg-blue-500/10 rounded-lg w-fit mb-4">
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-blue-500/10 text-blue-400 rounded border border-blue-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            variants={staggerItem}
            className="p-6 bg-bg-secondary border border-border rounded-xl"
          >
            <div className="p-2 bg-orange-500/10 rounded-lg w-fit mb-4">
              <Database className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-orange-500/10 text-orange-400 rounded border border-orange-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Recent Posts - spans 2 columns */}
          <motion.div
            variants={staggerItem}
            className="lg:col-span-2 p-6 bg-bg-secondary border border-border rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-100">
                Recent Writing
              </h3>
              <Link
                href="/posts"
                className="text-sm text-zinc-400 hover:text-emerald-500 transition-colors"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group block p-4 bg-bg-tertiary rounded-lg border border-transparent hover:border-border transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-zinc-200 font-medium truncate group-hover:text-emerald-500 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-zinc-500 text-sm mt-1 truncate">
                        {post.description}
                      </p>
                    </div>
                    <span className="text-zinc-600 text-xs font-mono whitespace-nowrap">
                      {formatDate(post.date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            variants={staggerItem}
            className="p-6 bg-bg-secondary border border-border rounded-xl"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg w-fit mb-4">
              <Cpu className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
