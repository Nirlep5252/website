"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkillTagProps {
  name: string;
  color: string;
}

export const SkillTag = ({ name, color }: SkillTagProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.1,
        rotate: [-1, 1, -1, 0],
        transition: { rotate: { duration: 0.2, repeat: 0 } },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`
        relative group cursor-pointer
        px-4 py-2 rounded-xl
        bg-white/10
        backdrop-blur-sm
      `}
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className={`
          absolute inset-0 -z-10 rounded-xl blur-xl
          bg-gradient-to-r ${color}
          opacity-20 group-hover:opacity-40
          transition-opacity duration-300
        `}
      />

      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`
          relative z-10
          text-sm font-medium
          text-white/75 group-hover:text-white
          transition-colors duration-200
        `}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};
