"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Tell me about your project — what you need, your timeline, and your budget. We'll hop on a quick call or chat over email.",
  },
  {
    number: "02",
    title: "Proposal",
    description:
      "I'll put together a clear scope, timeline, and quote. No surprises — you'll know exactly what you're getting.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I get to work. You'll get regular updates and can give feedback along the way.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Final product, deployed and handed off. I'll make sure everything runs smoothly.",
  },
];

const stepVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const numberVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const titleVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12 + 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const descVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.12 + 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const ProcessSection = () => {
  return (
    <section className="py-20 sm:py-32">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="text-emerald-500 font-mono text-sm mb-2 block">
          {"// process"}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          How It Works
        </h2>
        <p className="text-zinc-400 text-lg">
          Simple, transparent, and collaborative.
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

      {/* Steps */}
      <div className="relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            custom={index}
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              backgroundColor: "rgba(24, 24, 27, 0.3)",
              transition: { duration: 0.3 },
            }}
            className="flex items-start gap-4 sm:gap-6 md:gap-10 py-5 sm:py-6 border-b border-zinc-800 first:border-t px-3 -mx-3 sm:px-4 sm:-mx-4 rounded-lg transition-colors"
          >
            {/* Number — slides in from left */}
            <motion.span
              custom={index}
              variants={numberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500/35 font-mono shrink-0 relative z-10"
            >
              {step.number}
            </motion.span>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              {/* Title — slides in from left with delay */}
              <motion.h3
                custom={index}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xl font-semibold text-zinc-100 mb-1.5"
              >
                {step.title}
              </motion.h3>
              {/* Description — fades up after title */}
              <motion.p
                custom={index}
                variants={descVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-zinc-400 leading-relaxed max-w-xl"
              >
                {step.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
