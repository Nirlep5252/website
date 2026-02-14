"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Full-Stack Web Apps",
    description:
      "Interactive applications with authentication, databases, and APIs. From idea to production-ready — I handle the full stack so you get a complete product, not just a frontend.",
    tag: "Most requested",
    large: true,
  },
  {
    title: "Landing Pages",
    description:
      "Single-page marketing sites, product launches, and event pages. Fast turnaround.",
    tag: "From 1 week",
  },
  {
    title: "SaaS Applications",
    description:
      "Subscription products, dashboards, and user management. Built to scale.",
    tag: "End-to-end",
  },
  {
    title: "Static Websites",
    description:
      "Multi-page sites, portfolios, and documentation. SEO-optimized and blazing fast.",
    tag: "Performance",
  },
  {
    title: "Custom Tools",
    description:
      "Discord bots, CLI tools, automation scripts, and internal tools.",
    tag: "Anything goes",
  },
  {
    title: "Consulting",
    description:
      "Architecture reviews, tech stack advice, and code audits. Expert eyes on your project.",
    tag: "Hourly",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const ServicesSection = () => {
  return (
    <section className="pt-12 pb-20 sm:pt-16 sm:pb-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="text-emerald-500 font-mono text-sm mb-2 block">
          {"// services"}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          What I Do
        </h2>
        <p className="text-zinc-400 text-lg">
          From concept to deployment — here&apos;s where I can help.
        </p>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-emerald-500/40 via-zinc-700 to-transparent mt-6 origin-left max-w-sm"
        />
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-fr">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -4,
              scale: 1.015,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            className={`group relative border border-zinc-800 rounded-xl transition-[border-color,box-shadow] duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/[0.04] ${
              service.large
                ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
                : ""
            }`}
          >
            {/* Subtle gradient overlay for the large card */}
            {service.large && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-cyan-500/[0.03] pointer-events-none" />
            )}

            <div
              className={`relative ${
                service.large ? "p-8 md:p-10" : "p-6"
              }`}
            >
              {/* Tag */}
              <span className="text-emerald-500/60 font-mono text-[11px] tracking-wider uppercase block mb-4">
                {service.tag}
              </span>

              {/* Content — top-aligned */}
              <h3
                className={`font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors duration-300 mb-2 ${
                  service.large
                    ? "text-2xl md:text-3xl"
                    : "text-lg"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-zinc-500 leading-relaxed ${
                  service.large
                    ? "text-base max-w-md"
                    : "text-sm"
                }`}
              >
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
