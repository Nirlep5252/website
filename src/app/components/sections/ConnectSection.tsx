"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";

const links = [
  {
    name: "Email",
    value: "hello@nirlep.dev",
    href: "mailto:hello@nirlep.dev",
    icon: Mail,
    color: "emerald",
  },
  {
    name: "GitHub",
    value: "@nirlep5252",
    href: "https://github.com/nirlep5252",
    icon: Github,
    color: "zinc",
  },
  {
    name: "Twitter",
    value: "@nirlep_5252_",
    href: "https://twitter.com/nirlep_5252_",
    icon: Twitter,
    color: "emerald",
  },
  {
    name: "LinkedIn",
    value: "nirlep5252",
    href: "https://linkedin.com/in/nirlep5252",
    icon: Linkedin,
    color: "emerald",
  },
  {
    name: "Discord",
    value: "Join Server",
    href: "https://discord.com/invite/9rYbc54KtY",
    icon: MessageCircle,
    color: "emerald",
  },
];

export const ConnectSection = () => {
  return (
    <section className="py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
              className="group flex items-center justify-between p-5 bg-bg-secondary border border-border rounded-xl hover:border-border-hover transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-lg ${
                  link.color === "emerald" ? "bg-emerald-500/10" :
                  link.color === "blue" ? "bg-blue-500/10" :
                  link.color === "sky" ? "bg-sky-500/10" :
                  "bg-zinc-800"
                }`}>
                  <link.icon className={`w-5 h-5 ${
                    link.color === "emerald" ? "text-emerald-500" :
                    link.color === "blue" ? "text-blue-500" :
                    link.color === "sky" ? "text-sky-500" :
                    "text-zinc-400"
                  }`} />
                </div>
                <div>
                  <p className="text-zinc-500 text-sm">{link.name}</p>
                  <p className="text-zinc-200 font-medium">{link.value}</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 p-5 bg-bg-secondary/50 border border-border rounded-xl"
        >
          <div className="p-2.5 bg-emerald-500/10 rounded-lg">
            <MapPin className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-zinc-500 text-sm">Location</p>
            <p className="text-zinc-200">
              India{" "}
              <span className="text-zinc-500 font-mono text-sm">
                (UTC +5:30)
              </span>
            </p>
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-zinc-600 text-sm mt-16 font-mono"
        >
          Built with Next.js, TypeScript & Tailwind CSS
        </motion.p>
      </div>
    </section>
  );
};
