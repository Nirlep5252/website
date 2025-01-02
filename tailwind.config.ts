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
          hover: "var(--color-primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        background: {
          DEFAULT: "var(--color-background)",
          lighter: "var(--color-background-lighter)",
        },
        text: {
          DEFAULT: "var(--color-text)",
          dimmed: "var(--color-text-dimmed)",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "white",
            a: {
              color: "#3182ce",
              "&:hover": {
                color: "#2c5282",
              },
            },
            strong: {
              color: "white",
            },
            "ol > li::marker": {
              color: "white",
            },
            "ul > li::marker": {
              color: "white",
            },
            hr: {
              borderColor: "white",
            },
            blockquote: {
              color: "white",
              borderLeftColor: "#3182ce",
            },
            h1: {
              color: "white",
            },
            h2: {
              color: "white",
            },
            h3: {
              color: "white",
            },
            h4: {
              color: "white",
            },
            code: {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "0.25rem",
              padding: "0.2rem 0.4rem",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              code: {
                backgroundColor: "transparent",
                padding: "0",
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
