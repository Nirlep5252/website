import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { BlogPostCard } from "@/app/components/ui/BlogPostCard";

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="gap-4 flex flex-col">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
          {posts.length === 0 && (
            <p className="text-gray-400 text-center py-8">
              No blog posts found. Create your first post in src/content/posts!
            </p>
          )}
        </div>
      </div>
    </main>
  );
} 