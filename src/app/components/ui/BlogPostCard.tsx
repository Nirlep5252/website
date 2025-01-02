"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type Post } from "@/lib/mdx";
import { CalendarDays, Clock } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function BlogPostCard({ post }: { post: Post }) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link href={`/posts/${post.slug}`}>
      <motion.article
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01, y: -2 }}
        variants={cardVariants}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative group overflow-hidden rounded-xl backdrop-blur-xl p-[1px] cursor-pointer"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)] transition-opacity duration-700" />
        <div className="relative h-full bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-xl p-7 flex flex-col gap-4">
          <motion.div
            variants={contentVariants}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 text-sm text-gray-400/80"
          >
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              <time dateTime={post.date} className="font-medium">
                {formatDate(post.date)}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
          </motion.div>
          <motion.h2
            variants={contentVariants}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white/95 group-hover:text-white transition-colors duration-300"
          >
            {post.title}
          </motion.h2>
          <motion.p
            variants={contentVariants}
            transition={{ delay: 0.3 }}
            className="text-gray-300/70 leading-relaxed"
          >
            {post.description}
          </motion.p>
          <motion.div
            variants={contentVariants}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-1.5"
          >
            {post.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-300/90 rounded-md border border-blue-500/20 hover:bg-blue-500/15 transition-colors duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"
          />
        </div>
      </motion.article>
    </Link>
  );
}
