import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import { PostsList } from "@/components/PostsList";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export const metadata: Metadata = {
  title: "Writing | Nirlep Gohil",
  description:
    "Thoughts on software development, programming, and technology.",
  keywords: ["blog", "programming", "software development", "tech articles"],
  openGraph: {
    title: "Writing | Nirlep Gohil",
    description:
      "Thoughts on software development, programming, and technology.",
    type: "website",
  },
};

export default async function Posts() {
  "use cache";
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeader>Writing</AnimatedHeader>
        <PostsList posts={posts} />
      </div>
    </main>
  );
}
