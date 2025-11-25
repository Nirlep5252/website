"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Post } from "@/lib/mdx";
import { ArrowUpRight, Code2, Sparkles, Zap, BookOpen } from "lucide-react";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const AboutSection = ({ recentPosts }: AboutSectionProps) => {
  return (
    <section className="py-24 md:py-32">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest mb-3 block">
            About Me
          </span>
          <h2 className="text-display-md font-display font-bold text-text mb-4">
            Building the future,<br />
            <span className="text-text-secondary">one commit at a time</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {/* Main intro card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 card p-8 group"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text mb-1">
                  Passionate Developer
                </h3>
                <p className="text-sm text-text-tertiary font-mono">
                  Full-stack engineer
                </p>
              </div>
            </div>
            <p className="text-text-secondary leading-relaxed">
              I&apos;m a developer who loves creating beautiful and functional digital 
              experiences. With expertise in modern web technologies, I bring ideas to 
              life through clean code and intuitive design. I believe in writing code 
              that&apos;s not just functional, but also maintainable and elegant.
            </p>
          </motion.div>

          {/* Tech stack mini card */}
          <motion.div
            variants={itemVariants}
            className="card p-6 group"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="text-sm font-mono text-text-tertiary">
                tech_stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Rust", "Python", "Go", "PostgreSQL"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono bg-bg-hover border border-border rounded-md text-text-secondary hover:border-border-hover hover:text-text transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Open source card */}
          <motion.div
            variants={itemVariants}
            className="card p-6 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-text mb-1">Open Source</h3>
                <p className="text-xs text-text-tertiary">Contributor & Creator</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary">
              I believe in giving back to the community. Building tools and libraries 
              that help fellow developers.
            </p>
          </motion.div>

          {/* Recent posts card */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-mono text-text-tertiary">
                  recent_posts
                </span>
              </div>
              <Link
                href="/posts"
                className="text-xs font-mono text-primary hover:underline flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link href={`/posts/${post.slug}`} key={post.slug}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="group/post flex items-center justify-between p-3 -mx-3 rounded-lg hover:bg-bg-hover transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-text group-hover/post:text-primary transition-colors truncate">
                        {post.title}
                      </h4>
                      <p className="text-sm text-text-tertiary truncate mt-0.5">
                        {post.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-text-tertiary ml-4 shrink-0">
                      {formatDate(post.date)}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
