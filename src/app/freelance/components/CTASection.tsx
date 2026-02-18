"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Mail, ArrowRight, Check } from "lucide-react";

const EMAIL = "hello@nirlep.dev";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const CTASection = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      {/* Pulsing glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] bg-gradient-to-r from-emerald-500/15 via-cyan-500/15 to-emerald-500/15 blur-[100px] pointer-events-none"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="mb-12">
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// contact"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-zinc-400 text-lg">
            Tell me about your project — I typically respond within 24 hours.
          </p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent mt-6 origin-center max-w-xs mx-auto"
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-center gap-3 sm:gap-4 mb-8"
        >
          <motion.a
            href="https://calendar.app.google/SUgGEw1nzd7vvA188"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 20px 4px rgba(16, 185, 129, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-emerald-500 text-zinc-900 text-sm sm:text-base font-medium rounded-full hover:bg-emerald-400 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book a Call
          </motion.a>

          <motion.button
            onClick={handleEmailClick}
            whileHover={{
              scale: 1.03,
              borderColor: "rgba(161, 161, 170, 0.6)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 text-zinc-200 text-sm sm:text-base font-medium rounded-full border border-zinc-600 hover:text-white transition-all cursor-pointer"
          >
            {emailCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Send an Email
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Secondary link */}
        <motion.div variants={itemVariants}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Or check out my previous work
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
