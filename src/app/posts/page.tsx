import React from "react";
import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Nirlep Gohil",
  description:
    "Thoughts on software development, programming, and technology. Articles about coding, tech, and personal projects.",
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
      "Thoughts on software development, programming, and technology.",
    type: "website",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function Posts() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// blog"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
            Writing
          </h1>
          <p className="text-zinc-400 text-lg">
            Thoughts on software, technology, and the occasional adventure in
            code.
          </p>
        </div>

        {/* Posts list */}
        <div className="space-y-2">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <article className="p-5 bg-bg-secondary/50 border border-border rounded-xl hover:border-border-hover hover:bg-bg-secondary transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-500 transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      {post.readingTime && (
                        <span className="flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min read
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-zinc-800/50 text-zinc-500 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zinc-500 font-mono">No posts yet.</p>
              <p className="text-zinc-600 text-sm mt-2">
                Check back soon for new content.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
