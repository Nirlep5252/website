"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { SkillTag } from "./SkillTag";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  skills: string[];
  color: string;
  gradientColor: string;
}

export const SkillCard = ({
  icon: Icon,
  title,
  skills,
  color,
  gradientColor,
}: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className="font-semibold text-white/90">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <SkillTag key={skill} name={skill} color={gradientColor} />
        ))}
      </div>
    </motion.div>
  );
};
