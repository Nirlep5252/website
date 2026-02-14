"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, ChevronDown } from "lucide-react";

const MotionLink = motion.create(Link);

const projects = [
  {
    title: "bondbot.gg",
    description: "Discord AI agent for server management via natural language.",
    tags: ["Next.js", "Discord API", "AI"],
    href: "https://bondbot.gg",
  },
  {
    title: "ashishgohil.com",
    description: "Professional portfolio for a professor with 34+ years of experience.",
    tags: ["Next.js", "Tailwind CSS"],
    href: "https://ashishgohil.com",
  },
  {
    title: "formality.life",
    description: "Modern image hosting platform for uploading and sharing.",
    tags: ["Next.js", "Tailwind CSS", "React Query"],
    href: "https://formality.life",
  },
];

const desktopRotations = [-2, 1, -1.5];

const useIsLg = () => {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLg(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLg(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isLg;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export const FreelanceHero = () => {
  const isLg = useIsLg();

  return (
    <section className="lg:min-h-screen flex flex-col justify-center pt-28 pb-16 lg:pt-24 lg:pb-12 px-4 sm:px-6 relative">
      {/* Atmospheric glow — positioned behind headline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[35%] left-[25%] w-[500px] h-[250px] bg-gradient-to-r from-emerald-500/12 via-cyan-500/8 to-emerald-500/12 blur-[120px] rounded-full"
          animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full mx-auto relative z-10"
      >
        {/* Available badge */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-400 text-xs font-mono tracking-wide">
              Available for projects
            </span>
          </span>
        </motion.div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          {/* Left column — dramatic typography */}
          <div className="lg:flex-[3]">
            {/* Small intro line */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-500 text-base sm:text-lg md:text-xl font-light tracking-wide mb-2 sm:mb-3"
            >
              I design &amp; build
            </motion.p>

            {/* MASSIVE headline — scaled for mobile */}
            <motion.h1
              variants={itemVariants}
              className="text-[2.5rem] leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
            >
              <span className="text-zinc-100">websites people</span>
              <br />
              <span className="text-emerald-400">enjoy using.</span>
            </motion.h1>

            {/* Animated divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-px bg-gradient-to-r from-emerald-500/40 via-zinc-700 to-transparent mt-6 sm:mt-8 mb-4 sm:mb-6 origin-left max-w-md"
            />

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mb-8 sm:mb-10"
            >
              Full-stack developer specializing in modern web — from
              pixel-perfect landing pages to complex SaaS applications.
            </motion.p>

            {/* CTAs — stack on mobile, row on sm+ */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <MotionLink
                href="/projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-zinc-100 text-zinc-900 text-sm sm:text-base font-medium rounded-full hover:bg-white transition-colors"
              >
                View My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </MotionLink>

              <motion.a
                href="https://calendar.app.google/SUgGEw1nzd7vvA188"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-zinc-200 text-sm sm:text-base font-medium rounded-full border border-zinc-600 hover:border-zinc-400 hover:text-white transition-all"
              >
                <Calendar className="w-4 h-4" />
                Book a Call
              </motion.a>
            </motion.div>
          </div>

          {/* Right column — project cards (no rotation on mobile) */}
          <motion.div
            variants={itemVariants}
            className="lg:flex-[2] mt-12 sm:mt-16 lg:mt-0 lg:flex lg:items-center"
          >
            <div className="relative w-full lg:max-w-xs lg:ml-auto">
              <div className="space-y-3">
                {projects.map((project, index) => {
                  const rotation = isLg ? desktopRotations[index] : 0;
                  return (
                    <motion.a
                      key={project.title}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 30, rotate: rotation }}
                      animate={{ opacity: 1, x: 0, rotate: rotation }}
                      transition={{
                        duration: 0.7,
                        delay: 0.7 + index * 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={
                        isLg
                          ? {
                              rotate: 0,
                              scale: 1.03,
                              y: -3,
                              transition: { duration: 0.25 },
                            }
                          : undefined
                      }
                      className="group block px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg hover:border-emerald-500/30 transition-colors shadow-lg shadow-black/20"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-zinc-100 group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed mb-2 line-clamp-1">
                        {project.description}
                      </p>
                      <div className="flex gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-zinc-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* View all link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="mt-4 pl-1"
              >
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-1.5 text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  View all projects
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <span className="text-zinc-600 text-xs font-mono tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};
