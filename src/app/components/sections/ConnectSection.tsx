"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, ArrowUpRight, MessageCircle } from "lucide-react";

const links = [
  {
    name: "Email",
    value: "hello@nirlep.dev",
    href: "mailto:hello@nirlep.dev",
    icon: Mail,
  },
  {
    name: "GitHub",
    value: "@nirlep5252",
    href: "https://github.com/nirlep5252",
    icon: Github,
  },
  {
    name: "Twitter",
    value: "@nirlep_5252_",
    href: "https://twitter.com/nirlep_5252_",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    value: "nirlep5252",
    href: "https://linkedin.com/in/nirlep5252",
    icon: Linkedin,
  },
  {
    name: "Discord",
    value: "Join Server",
    href: "https://discord.com/invite/9rYbc54KtY",
    icon: MessageCircle,
  },
];

export const ConnectSection = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// connect"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Have a project in mind? I&apos;m always open to discussing new
            opportunities and interesting ideas.
          </p>
        </motion.div>

        {/* Links - Clean horizontal list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="border-t border-zinc-800"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-5 border-b border-zinc-800 hover:bg-zinc-900/30 -mx-4 px-4 transition-colors"
            >
              <div className="flex items-center gap-4">
                <link.icon className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {link.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-zinc-200 font-medium">{link.value}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </a>
          ))}
        </motion.div>

        {/* Location & Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-16 pt-8 border-t border-zinc-800/50"
        >
          <p className="text-zinc-600 text-sm">
            Based in <span className="text-zinc-400">India</span>{" "}
            <span className="font-mono">(UTC +5:30)</span>
          </p>
          <p className="text-zinc-700 text-sm font-mono">
            Built with Next.js & Tailwind
          </p>
        </motion.div>
      </div>
    </section>
  );
};
