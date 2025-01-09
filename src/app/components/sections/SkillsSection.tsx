"use client";

import React from "react";
import { Database, Laptop, Rocket, Terminal } from "lucide-react";
import { SkillCard } from "../ui/SkillCard";

export const SkillsSection = () => {
  return (
    <>
      <SkillCard
        icon={Laptop}
        title="Frontend Development"
        color="text-blue-400"
        gradientColor="from-blue-400 to-blue-600"
        skills={["React", "TypeScript", "JavaScript", "Git"]}
      />
      <SkillCard
        icon={Database}
        title="Backend Development"
        color="text-purple-400"
        gradientColor="from-purple-400 to-purple-600"
        skills={["Python", "Rust", "Go", "NodeJS", "PostgreSQL", "Docker"]}
      />
      <SkillCard
        icon={Terminal}
        title="Languages"
        color="text-green-400"
        gradientColor="from-green-400 to-green-600"
        skills={["Rust", "Python", "Go", "C", "C++", "Java", "SQL"]}
      />
      <SkillCard
        icon={Rocket}
        title="Interests"
        color="text-orange-400"
        gradientColor="from-orange-400 to-orange-600"
        skills={["System Design", "Open Source", "Competitive Programming"]}
      />
    </>
  );
};
