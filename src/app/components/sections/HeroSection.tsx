"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedName from "../AnimatedName";

const MotionLink = motion(Link);

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <AnimatedName />
          <p className="text-2xl text-gray-300">
            Full-stack developer and open source enthusiast.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <motion.a
            href="mailto:hello@nirlep.dev"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200"
          >
            Get in Touch
          </motion.a>
          <MotionLink
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10"
          >
            View Projects
          </MotionLink>
        </motion.div>
      </motion.div>
    </section>
  );
};
