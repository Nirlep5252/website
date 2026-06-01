import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { getCSESStats } from "@/lib/cses";
import { projects } from "@/lib/projects";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ExploreSection } from "./components/sections/ExploreSection";
import { ConnectSection } from "./components/sections/ConnectSection";

export default async function Home() {
  const [allPosts, cses] = await Promise.all([getAllPosts(), getCSESStats()]);
  const recentPosts = allPosts.slice(0, 3);

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper text-ink">
      <HeroSection />
      <AboutSection />
      <ExploreSection
        recentPosts={recentPosts}
        projectCount={projects.length}
        csesSolved={cses.solved}
      />
      <ConnectSection />
    </main>
  );
}
