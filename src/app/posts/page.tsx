import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight">
            Writing
          </h1>
        </div>

        {/* Posts list */}
        <div>
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block py-6 border-b border-zinc-800 first:border-t"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex items-start gap-6 md:gap-12">
                  {/* Number */}
                  <span className="text-zinc-700 font-mono text-sm pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 max-w-xl line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-xs font-mono text-zinc-600">
                        {formatDate(post.date)}
                      </span>
                      {post.readingTime && (
                        <span className="text-xs font-mono text-zinc-700">
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="pt-1">
                  <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-zinc-600 font-mono">No posts yet.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
