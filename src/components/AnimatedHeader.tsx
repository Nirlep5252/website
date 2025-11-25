"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedHeaderProps {
  children: React.ReactNode;
}

export function AnimatedHeader({ children }: AnimatedHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight">
        {children}
      </h1>
    </motion.div>
  );
}
