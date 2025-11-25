import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { BlogPostCard } from "@/app/components/ui/BlogPostCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Nirlep Gohil",
  description:
    "Read my latest thoughts, tutorials, and experiences on software development, programming, and technology.",
  keywords: [
    "blog",
    "programming",
    "software development",
    "tech articles",
    "coding tutorials",
  ],
  openGraph: {
    title: "Blog | Nirlep Gohil",
    description:
      "Read my latest thoughts, tutorials, and experiences on software development and technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Nirlep Gohil",
    description:
      "Read my latest thoughts, tutorials, and experiences on software development and technology.",
  },
};

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">
              ~/posts
            </span>
          </div>
          <h1 className="text-display-md font-display font-bold text-text mb-4">
            Blog
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Thoughts on software development, programming, and technology. 
            Writing about what I learn and build.
          </p>
        </div>

        {/* Posts list */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <BlogPostCard key={post.slug} post={post} index={index} />
          ))}
          {posts.length === 0 && (
            <div className="card p-12 text-center">
              <p className="text-text-secondary font-mono">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
