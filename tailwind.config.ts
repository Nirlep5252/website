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
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          dim: "var(--color-primary-dim)",
          glow: "var(--color-primary-glow)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dim: "var(--color-secondary-dim)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          dim: "var(--color-accent-dim)",
        },
        success: "var(--color-success)",
        bg: {
          DEFAULT: "var(--color-bg)",
          elevated: "var(--color-bg-elevated)",
          card: "var(--color-bg-card)",
          hover: "var(--color-bg-hover)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
        },
        border: {
          DEFAULT: "var(--color-border)",
          hover: "var(--color-border-hover)",
        },
        code: {
          keyword: "var(--code-keyword)",
          string: "var(--code-string)",
          function: "var(--code-function)",
          comment: "var(--code-comment)",
          number: "var(--code-number)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            color: "var(--color-text-secondary)",
            a: {
              color: "var(--color-primary)",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s",
              "&:hover": {
                borderColor: "var(--color-primary)",
              },
            },
            strong: {
              color: "var(--color-text)",
              fontWeight: "600",
            },
            "h1, h2, h3, h4": {
              color: "var(--color-text)",
              fontWeight: "600",
            },
            h1: {
              fontSize: "2.25rem",
              marginBottom: "1.5rem",
            },
            h2: {
              fontSize: "1.75rem",
              marginTop: "2.5rem",
              marginBottom: "1rem",
            },
            h3: {
              fontSize: "1.25rem",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            },
            code: {
              color: "var(--color-primary)",
              backgroundColor: "var(--color-bg-card)",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "0.875em",
              fontWeight: "400",
              border: "1px solid var(--color-border)",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "1.25rem",
              code: {
                backgroundColor: "transparent",
                padding: "0",
                border: "none",
                fontSize: "0.875rem",
              },
            },
            blockquote: {
              borderLeftColor: "var(--color-primary)",
              borderLeftWidth: "2px",
              fontStyle: "normal",
              color: "var(--color-text)",
              backgroundColor: "var(--color-bg-card)",
              padding: "1rem 1.5rem",
              borderRadius: "0 8px 8px 0",
            },
            hr: {
              borderColor: "var(--color-border)",
            },
            "ul > li::marker": {
              color: "var(--color-text-tertiary)",
            },
            "ol > li::marker": {
              color: "var(--color-text-tertiary)",
            },
            img: {
              borderRadius: "12px",
              border: "1px solid var(--color-border)",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
