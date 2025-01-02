"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export function NavLink({ href, isActive, children }: NavLinkProps) {
  return (
    <Link 
      href={href}
      className="relative flex items-center justify-center h-8 px-4"
    >
      {isActive && (
        <motion.div
          layoutId="highlight"
          className="absolute inset-0 bg-white/[0.08] rounded-full"
          transition={{
            type: "spring",
            bounce: 0.15,
            duration: 0.5
          }}
        />
      )}
      <motion.div
        className="relative z-10"
        whileHover={{ y: -1 }}
        whileTap={{ y: 1 }}
        transition={{ duration: 0.1 }}
      >
        <span
          className={`text-[13px] font-medium transition-colors duration-200 ${
            isActive 
              ? "text-text" 
              : "text-text-dimmed hover:text-text"
          }`}
        >
          {children}
        </span>
        {isActive && (
          <motion.div
            layoutId="underline"
            className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          />
        )}
      </motion.div>
    </Link>
  );
} 