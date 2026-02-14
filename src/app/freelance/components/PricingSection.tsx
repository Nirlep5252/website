"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Landing Page",
    price: 200,
    description: "Perfect for product launches and marketing campaigns.",
    features: [
      "Single page design & development",
      "Mobile responsive",
      "Contact form or CTA integration",
      "Fast turnaround (~1 week)",
    ],
  },
  {
    name: "Static Website",
    price: 500,
    description: "For businesses that need a complete web presence.",
    features: [
      "Multi-page site (up to 5 pages)",
      "Mobile responsive",
      "SEO basics",
      "CMS integration optional",
      "Delivery in ~2 weeks",
    ],
  },
  {
    name: "Full-Stack App",
    price: 1500,
    description: "Custom web applications with full backend support.",
    popular: true,
    features: [
      "Custom web application",
      "Auth/database/APIs",
      "Admin dashboard",
      "Deployment & hosting setup",
      "Delivery in ~4\u20136 weeks",
    ],
  },
  {
    name: "Enterprise / Custom",
    price: 3000,
    description: "Complex projects requiring scalable solutions.",
    features: [
      "SaaS/complex apps/custom tools",
      "Scalable architecture",
      "Third-party integrations",
      "Ongoing support available",
      "Timeline scoped per project",
    ],
  },
];

const CountUpPrice = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("$0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplay(`$${Math.round(latest).toLocaleString()}`);
        },
        onComplete: () => {
          setDisplay(`$${value.toLocaleString()}`);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const PricingSection = () => {
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
          {"// pricing"}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
          Pricing
        </h2>
        <p className="text-zinc-400 text-lg max-w-xl">
          Transparent pricing with no hidden fees. Every project includes source code and deployment.
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

      {/* Pricing cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
              },
            }}
            className={`group relative flex flex-col p-6 rounded-xl transition-[border-color,box-shadow] duration-300 ${
              tier.popular
                ? "border-2 border-emerald-500/40 hover:border-emerald-500/60 bg-emerald-500/[0.03] hover:shadow-lg hover:shadow-emerald-500/[0.08]"
                : "border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900/30 hover:shadow-lg hover:shadow-black/20"
            }`}
          >
            {/* Popular badge with glow pulse */}
            {tier.popular && (
              <motion.span
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                    "0 0 10px 3px rgba(16, 185, 129, 0.25)",
                    "0 0 0 0 rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-emerald-500 text-zinc-900 text-xs font-bold rounded-full"
              >
                Most Popular
              </motion.span>
            )}

            {/* Tier name */}
            <h3 className="text-lg font-bold text-zinc-100 mb-3">
              {tier.name}
            </h3>

            {/* Price with count-up */}
            <div className="mb-3">
              <span className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono">
                <CountUpPrice value={tier.price} />
              </span>
              <span className="text-zinc-500 text-sm ml-1">starting</span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {tier.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`block text-center px-6 py-3 text-sm font-medium rounded-full transition-all ${
                tier.popular
                  ? "bg-emerald-500 text-zinc-900 hover:bg-emerald-400 hover:shadow-md hover:shadow-emerald-500/20"
                  : "text-zinc-200 border border-zinc-600 hover:border-emerald-500/40 hover:text-white"
              }`}
            >
              Get Started
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
