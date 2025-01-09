"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Code2, Globe, Newspaper } from "lucide-react";
import { Post } from "@/lib/mdx";
import { SkillsSection } from "./SkillsSection";

interface AboutSectionProps {
  recentPosts: Post[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const AboutSection = ({ recentPosts }: AboutSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Code2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Passionate Developer
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m a passionate developer who loves creating beautiful
                  and functional web experiences. With expertise in modern web
                  technologies, I bring ideas to life through clean code and
                  intuitive design.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Open Source Enthusiast
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through blog posts and tutorials.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Newspaper className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">
                  Recent Blog Posts
                </h3>
                <div className="flex flex-col gap-3">
                  {recentPosts.map((post) => (
                    <Link href={`/posts/${post.slug}`} key={post.slug}>
                      <motion.div
                        className="bg-white/5 p-4 rounded-xl group cursor-pointer relative overflow-hidden backdrop-blur-sm border border-transparent hover:border-white/10 transition-colors"
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        <div className="relative">
                          <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                            <time
                              dateTime={post.date}
                              className="group-hover:text-gray-300 transition-colors"
                            >
                              {formatDate(post.date)}
                            </time>
                            <span>•</span>
                            <div className="flex gap-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="bg-purple-500/10 text-purple-400/90 px-2 py-0.5 rounded-full text-xs group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <h4 className="text-white/90 font-medium mb-1 group-hover:text-white transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                            {post.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <SkillsSection />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
