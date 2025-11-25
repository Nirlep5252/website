"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedPostProps {
  children: React.ReactNode;
}

export function AnimatedPost({ children }: AnimatedPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
