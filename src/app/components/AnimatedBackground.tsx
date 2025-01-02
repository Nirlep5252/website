"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-blue-950/10 via-purple-950/10 to-pink-950/10 blur-2xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [45, 0, 45],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-indigo-950/10 via-purple-950/10 to-pink-950/10 blur-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/30 to-pink-950/30" />
    </div>
  );
} 