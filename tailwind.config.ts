import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hanken Grotesk", "system-ui", "-apple-system", "sans-serif"],
        display: ["Kreon", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        // Legacy dark theme (still used by the not-yet-redesigned sections)
        bg: {
          DEFAULT: "#0a0a0a",
          secondary: "#111111",
          tertiary: "#1a1a1a",
        },
        accent: {
          DEFAULT: "#10b981",
          dim: "rgba(16, 185, 129, 0.1)",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        border: {
          DEFAULT: "#27272a",
          hover: "#3f3f46",
        },

        // Cozy Cat Café palette (DESIGN.md) — OKLCH, alpha-aware
        paper: "oklch(1 0 0 / <alpha-value>)",
        surface: {
          DEFAULT: "oklch(0.975 0.012 70 / <alpha-value>)",
          warm: "oklch(0.955 0.022 68 / <alpha-value>)",
        },
        ink: {
          DEFAULT: "oklch(0.26 0.03 55 / <alpha-value>)",
          strong: "oklch(0.20 0.03 50 / <alpha-value>)",
          muted: "oklch(0.50 0.025 55 / <alpha-value>)",
          faint: "oklch(0.64 0.02 58 / <alpha-value>)",
        },
        ginger: {
          DEFAULT: "oklch(0.70 0.16 58 / <alpha-value>)",
          deep: "oklch(0.56 0.16 50 / <alpha-value>)",
          soft: "oklch(0.95 0.035 65 / <alpha-value>)",
        },
        herb: {
          DEFAULT: "oklch(0.55 0.13 140 / <alpha-value>)",
          deep: "oklch(0.46 0.12 142 / <alpha-value>)",
          soft: "oklch(0.95 0.03 140 / <alpha-value>)",
        },
        line: {
          DEFAULT: "oklch(0.91 0.012 65 / <alpha-value>)",
          strong: "oklch(0.84 0.02 62 / <alpha-value>)",
        },
        nose: "oklch(0.78 0.08 25 / <alpha-value>)",
      },
      boxShadow: {
        "cafe-rest": "0 1px 2px oklch(0.40 0.03 55 / 0.05)",
        "cafe-lift": "0 10px 28px oklch(0.40 0.03 55 / 0.10)",
        "cafe-float": "0 18px 44px oklch(0.35 0.04 50 / 0.14)",
      },
      borderRadius: {
        card: "14px",
        "card-lg": "18px",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease forwards",
        "fade-up": "fadeUp 0.6s ease forwards",
        blink: "blink 1s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "#fafafa",
            a: {
              color: "#10b981",
              textDecoration: "none",
              "&:hover": {
                color: "#34d399",
              },
            },
            strong: {
              color: "#fafafa",
            },
            "ol > li::marker": {
              color: "#a1a1aa",
            },
            "ul > li::marker": {
              color: "#a1a1aa",
            },
            hr: {
              borderColor: "#27272a",
            },
            blockquote: {
              color: "#a1a1aa",
              borderLeftColor: "#10b981",
            },
            h1: {
              color: "#fafafa",
            },
            h2: {
              color: "#fafafa",
            },
            h3: {
              color: "#fafafa",
            },
            h4: {
              color: "#fafafa",
            },
            code: {
              color: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: "0.25rem",
              padding: "0.2rem 0.4rem",
              fontFamily: "'JetBrains Mono', monospace",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#111111",
              border: "1px solid #27272a",
              code: {
                backgroundColor: "transparent",
                padding: "0",
                color: "#fafafa",
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
