"use client";

import React from "react";
import { motion } from "framer-motion";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="fixed w-full top-0 z-40 p-6">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-fit mx-auto rounded-full border border-white/5 bg-background/80 backdrop-blur-xl shadow-lg"
      >
        <div className="flex items-center h-10 px-1.5">
          {children}
        </div>
      </motion.nav>
    </div>
  );
} 