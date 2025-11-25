"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const MotionLink = motion.create(Link);

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-6xl w-full text-center">
        {/* Main heading - MASSIVE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h1 className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.85] tracking-tighter">
            <span className="block text-zinc-100">Nirlep</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Gohil
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-8 text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto"
        >
          Software Engineer crafting elegant solutions
          <span className="hidden sm:inline"> with modern technologies</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
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
