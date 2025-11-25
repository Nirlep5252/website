"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Post } from "@/lib/mdx";

interface AboutSectionProps {
  recentPosts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const technologies = [
  "Rust",
  "TypeScript",
  "Python",
  "Go",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
];

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
          className="mb-20"
        >
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// about"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100">
            What I Do
          </h2>
        </motion.div>

        {/* Main content - Two column layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - About text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-8">
              I build modern web applications with a focus on{" "}
              <span className="text-emerald-400">performance</span>,{" "}
              <span className="text-emerald-400">accessibility</span>, and{" "}
              <span className="text-emerald-400">user experience</span>.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
              With expertise spanning from low-level systems programming to modern
              frontend frameworks, I bring ideas to life through clean, maintainable code.
              I&apos;m passionate about solving complex problems and building tools that
              make a difference.
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-mono text-zinc-400 border border-zinc-800 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right column - Cards */}
          <div className="space-y-4">
            {/* Problem Solving Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <Link
                href="/adventures"
                className="group block p-6 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-900/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    Problem Solving
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Competitive programming enthusiast. Solving algorithmic challenges
                  and optimizing for performance.
                </p>
              </Link>
            </motion.div>

            {/* Recent Writing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="p-6 border border-zinc-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-100">
                  Recent Writing
                </h3>
                <Link
                  href="/posts"
                  className="text-sm text-zinc-500 hover:text-emerald-500 transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {recentPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="group block py-3 border-t border-zinc-800/50 first:border-0 first:pt-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-zinc-300 group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {post.title}
                      </h4>
                      <span className="text-zinc-600 text-xs font-mono whitespace-nowrap">
                        {formatDate(post.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Projects CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <Link
                href="/projects"
                className="group flex items-center justify-between p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
              >
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    View My Work
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    Projects I&apos;ve built and contributed to
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
