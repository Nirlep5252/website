"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";

const MotionLink = motion.create(Link);

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.03, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="max-w-3xl w-full">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border border-border rounded-t-lg">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-zinc-500 text-sm font-mono ml-2">
              ~/nirlep
            </span>
          </div>

          {/* Terminal content */}
          <div className="bg-bg-secondary/50 border border-t-0 border-border rounded-b-lg p-6 font-mono">
            {/* Command line */}
            <div className="flex items-start gap-2 text-zinc-400 text-sm mb-6">
              <span className="text-emerald-500">$</span>
              <span>cat about.txt</span>
            </div>

            {/* Main content */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 leading-tight"
              >
                <TypingText text="Nirlep Gohil" delay={0.4} />
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-emerald-500 text-lg">{">"}</span>
                <p className="text-xl md:text-2xl text-zinc-400">
                  <TypingText text="Software Engineer" delay={0.9} />
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-zinc-500 text-lg leading-relaxed max-w-2xl"
              >
                Building elegant solutions with modern technologies.
                <br />
                Passionate about open source, competitive programming, and the
                art of clean code.
              </motion.p>

              {/* Tech stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {["Rust", "TypeScript", "Python", "Go", "React"].map(
                  (tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.9 + index * 0.1 }}
                      className="px-3 py-1 text-sm font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md"
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <MotionLink
            href="/projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 text-bg font-medium rounded-lg hover:bg-emerald-400 transition-colors"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MotionLink>

          <motion.a
            href="mailto:hello@nirlep.dev"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-zinc-300 font-medium rounded-lg hover:border-border-hover hover:text-zinc-100 transition-all"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </motion.a>

          <motion.a
            href="https://github.com/nirlep5252"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-bg-secondary border border-border text-zinc-300 font-medium rounded-lg hover:border-border-hover hover:text-zinc-100 transition-all"
          >
            <Github className="w-4 h-4" />
            GitHub
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="flex justify-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <span className="text-xs font-mono">scroll</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
