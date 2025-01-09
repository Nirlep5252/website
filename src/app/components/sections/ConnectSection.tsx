"use client";

import React from "react";
import { motion } from "framer-motion";

export const ConnectSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-white">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl font-bold mb-8">Let&apos;s Connect</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          I&apos;m always excited to collaborate on interesting projects or just
          have a chat about technology and innovation.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="grid gap-6">
            <a href="mailto:hello@nirlep.dev">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="group relative bg-white/10 p-6 rounded-xl backdrop-blur-sm cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    Email
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                    hello@nirlep.dev
                  </p>
                </div>
              </motion.div>
            </a>
            <a
              href="https://discord.com/invite/9rYbc54KtY"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="group relative bg-white/10 p-6 rounded-xl backdrop-blur-sm cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    Discord
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                    Join the server
                  </p>
                </div>
              </motion.div>
            </a>
          </div>
          <div className="grid gap-6">
            <a
              href="https://github.com/nirlep5252"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="group relative bg-white/10 p-6 rounded-xl backdrop-blur-sm cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-500/20 via-gray-600/20 to-gray-700/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    GitHub
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                    @nirlep5252
                  </p>
                </div>
              </motion.div>
            </a>
            <a
              href="https://twitter.com/nirlep_5252_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="group relative bg-white/10 p-6 rounded-xl backdrop-blur-sm cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 via-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    Twitter
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                    @nirlep_5252_
                  </p>
                </div>
              </motion.div>
            </a>
          </div>
          <div className="grid gap-6">
            <a
              href="https://linkedin.com/in/nirlep5252"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="group relative bg-white/10 p-6 rounded-xl backdrop-blur-sm cursor-pointer border border-white/5 hover:border-white/10 transition-colors duration-300"
              >
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 via-blue-600/20 to-blue-700/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                  initial={false}
                />
                <div className="relative">
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.div>
                  <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                    LinkedIn
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                    Connect with me
                  </p>
                </div>
              </motion.div>
            </a>
            <div className="group relative bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/5">
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                initial={false}
              />
              <div className="relative">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <svg
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.div>
                <h3 className="font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                  Location
                </h3>
                <p className="text-gray-300 transition-colors duration-300 group-hover:text-white/90">
                  India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
