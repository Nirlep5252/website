"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Post } from "@/lib/mdx";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

interface BlogPostCardProps {
  post: Post;
  index: number;
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link href={`/posts/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ x: 4 }}
        className="group card p-6 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        {/* Date badge */}
        <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-bg-hover border border-border shrink-0">
          <span className="text-lg font-bold text-text">
            {new Date(post.date).getDate()}
          </span>
          <span className="text-xs font-mono text-text-tertiary uppercase">
            {new Date(post.date).toLocaleDateString("en-US", { month: "short" })}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 text-xs font-mono text-text-tertiary">
            <div className="flex items-center gap-1.5 sm:hidden">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{readingTime}</span>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-text group-hover:text-primary transition-colors mb-2">
            {post.title}
          </h2>

          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-mono bg-bg-hover border border-border rounded text-text-tertiary"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs font-mono bg-bg-hover border border-border rounded text-text-tertiary">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
      </motion.article>
    </Link>
  );
}
