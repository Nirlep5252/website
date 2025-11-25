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
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
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
