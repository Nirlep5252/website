"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "Email",
    handle: "hello@nirlep.dev",
    href: "mailto:hello@nirlep.dev",
    icon: Mail,
    color: "primary",
  },
  {
    name: "GitHub",
    handle: "@nirlep5252",
    href: "https://github.com/nirlep5252",
    icon: Github,
    color: "text",
  },
  {
    name: "Twitter",
    handle: "@nirlep_5252_",
    href: "https://twitter.com/nirlep_5252_",
    icon: Twitter,
    color: "primary",
  },
  {
    name: "LinkedIn",
    handle: "nirlep5252",
    href: "https://linkedin.com/in/nirlep5252",
    icon: Linkedin,
    color: "secondary",
  },
  {
    name: "Discord",
    handle: "Join server",
    href: "https://discord.com/invite/9rYbc54KtY",
    icon: MessageCircle,
    color: "accent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const ConnectSection = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-widest mb-3 block">
              Contact
            </span>
            <h2 className="text-display-md font-display font-bold text-text mb-4">
              Let&apos;s work together
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              I&apos;m always excited to collaborate on interesting projects or just 
              have a chat about technology and innovation.
            </p>
          </motion.div>

          {/* Contact links grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group card p-5 flex items-center gap-4 hover:border-border-hover"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${link.color}/10 border border-${link.color}/20 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${link.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                      {link.name}
                    </div>
                    <div className="text-xs font-mono text-text-tertiary truncate">
                      {link.handle}
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              );
            })}

            {/* Location card */}
            <motion.div
              variants={itemVariants}
              className="card p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text">Location</div>
                <div className="text-xs font-mono text-text-tertiary">
                  India 🇮🇳
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-bg-card">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span className="text-sm font-mono text-text-secondary">
                Currently available for freelance projects
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
