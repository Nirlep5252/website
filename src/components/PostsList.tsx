"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime?: number;
}

interface PostsListProps {
  posts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <div>
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/posts/${post.slug}`}
            className="group block py-6 border-b border-zinc-800 first:border-t"
          >
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-start gap-6 md:gap-12">
                <span className="text-zinc-700 font-mono text-sm pt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

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

              <div className="pt-1">
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {posts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-zinc-600 font-mono">No posts yet.</p>
        </div>
      )}
    </div>
  );
}
