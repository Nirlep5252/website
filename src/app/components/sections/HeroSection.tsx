"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MotionLink = motion.create(Link);

// Floating particles component
const FloatingParticles = () => {
  const particles = [
    { size: 4, x: "10%", y: "20%", duration: 20, delay: 0 },
    { size: 3, x: "20%", y: "80%", duration: 25, delay: 2 },
    { size: 5, x: "80%", y: "30%", duration: 22, delay: 1 },
    { size: 3, x: "70%", y: "70%", duration: 28, delay: 3 },
    { size: 4, x: "90%", y: "50%", duration: 24, delay: 0.5 },
    { size: 2, x: "30%", y: "40%", duration: 26, delay: 1.5 },
    { size: 3, x: "50%", y: "90%", duration: 21, delay: 2.5 },
    { size: 4, x: "15%", y: "60%", duration: 23, delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-emerald-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Floating particles */}
      <FloatingParticles />

      <div className="max-w-6xl w-full text-center relative z-10">
        {/* Glow effect behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 blur-[120px] pointer-events-none" />

        {/* Main heading - MASSIVE with animated gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-[clamp(2.5rem,10vw,9rem)] font-bold leading-none tracking-tighter">
            <span className="hero-gradient-text bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
              Nirlep Gohil
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light"
        >
          Full-stack developer building products that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <MotionLink
            href="/projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 font-medium rounded-full hover:bg-white transition-colors"
          >
            View Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MotionLink>

          <motion.a
            href="mailto:hello@nirlep.dev"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-zinc-400 font-medium rounded-full border border-zinc-800 hover:border-zinc-600 hover:text-zinc-200 transition-all"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-zinc-600"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
