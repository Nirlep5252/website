import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * EMULSION design tokens.
 * Two surfaces (ink / paper), one colormap (indigo → violet → pink → cream), one accent (signal).
 */
const ink = "#0b0a0e";
const paper = "#f3efe4";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: ink,
          2: "#15121c",
          3: "#221d2e",
        },
        paper: {
          DEFAULT: paper,
          2: "#e9e4d6",
          3: "#d6cfbd",
        },
        signal: "#b7de5e",
        indigo: "#3a2fd6",
        violet: "#7659ee",
        pink: "#f394d6",
        cream: "#f5f0d6",
      },
      letterSpacing: {
        display: "-0.045em",
        tight2: "-0.03em",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "70ch",
            color: ink,
            fontSize: "1.0625rem",
            lineHeight: "1.65",
            "--tw-prose-body": ink,
            "--tw-prose-headings": ink,
            "--tw-prose-lead": "rgba(11,10,14,.75)",
            "--tw-prose-links": "#3a2fd6",
            "--tw-prose-bold": ink,
            "--tw-prose-counters": "rgba(11,10,14,.55)",
            "--tw-prose-bullets": "rgba(11,10,14,.35)",
            "--tw-prose-hr": "#d6cfbd",
            "--tw-prose-quotes": "rgba(11,10,14,.8)",
            "--tw-prose-quote-borders": "#3a2fd6",
            "--tw-prose-captions": "rgba(11,10,14,.55)",
            "--tw-prose-code": ink,
            "--tw-prose-pre-code": "#f5f0d6",
            "--tw-prose-pre-bg": ink,
            "--tw-prose-th-borders": "#d6cfbd",
            "--tw-prose-td-borders": "#e9e4d6",
            a: {
              textDecoration: "none",
              borderBottom: "1px solid rgba(58,47,214,.45)",
              fontWeight: "500",
              "&:hover": { borderBottomColor: "#3a2fd6" },
            },
            "h1, h2, h3, h4": {
              fontWeight: "500",
              letterSpacing: "-0.03em",
            },
            h2: { fontSize: "1.65em", marginTop: "2em", marginBottom: "0.6em" },
            h3: { fontSize: "1.25em" },
            code: {
              fontFamily: "var(--font-geist-mono)",
              fontSize: "0.86em",
              fontWeight: "400",
              background: "#e9e4d6",
              padding: "0.15em 0.4em",
              borderRadius: "2px",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            pre: {
              borderRadius: "2px",
              fontSize: "0.82em",
              lineHeight: "1.6",
              padding: "1.1rem 1.25rem",
            },
            "pre code": { background: "transparent", padding: 0 },
            blockquote: { fontStyle: "normal", fontWeight: "400" },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },
            img: { borderRadius: "2px" },
            hr: { marginTop: "2.5em", marginBottom: "2.5em" },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
