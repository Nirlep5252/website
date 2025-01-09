import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ConnectSection } from "./components/sections/ConnectSection";

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 2);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroSection />
      <AboutSection recentPosts={recentPosts} />
      <ConnectSection />
    </main>
  );
}
