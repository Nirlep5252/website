"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language: string;
  filename?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>(escapeHtml(children.trim()));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = useCallback(async () => {
    if (typeof window === "undefined") return;
    
    try {
      const Prism = (await import("prismjs")).default;
      
      // Load languages - use require for Prism components
      const loadLanguage = async (lang: string) => {
        try {
          await import(`prismjs/components/prism-${lang}`);
        } catch {
          // Language not available, ignore
        }
      };

      await Promise.all([
        loadLanguage("python"),
        loadLanguage("cpp"),
        loadLanguage("c"),
        loadLanguage("java"),
        loadLanguage("rust"),
        loadLanguage("go"),
        loadLanguage("typescript"),
        loadLanguage("javascript"),
        loadLanguage("bash"),
        loadLanguage("sql"),
      ]);

      const grammar = Prism.languages[language];
      if (grammar) {
        const highlighted = Prism.highlight(children.trim(), grammar, language);
        setHighlightedCode(highlighted);
      }
    } catch {
      // Keep escaped HTML
    }
  }, [children, language]);

  useEffect(() => {
    highlight();
  }, [highlight]);

  const languageLabels: Record<string, string> = {
    python: "Python",
    py: "Python",
    cpp: "C++",
    "c++": "C++",
    c: "C",
    java: "Java",
    rust: "Rust",
    go: "Go",
    typescript: "TypeScript",
    ts: "TypeScript",
    javascript: "JavaScript",
    js: "JavaScript",
    bash: "Bash",
    sh: "Shell",
    sql: "SQL",
  };

  return (
    <div className="group rounded-lg border border-border bg-bg-card overflow-hidden my-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-bg-elevated border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-secondary/60" />
            <div className="w-3 h-3 rounded-full bg-success/60" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
            <Terminal className="w-3.5 h-3.5" />
            <span>{filename || languageLabels[language] || language}</span>
          </div>
        </div>

        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono text-text-tertiary hover:text-text hover:bg-bg-hover transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed !bg-transparent !border-0 !m-0">
          <code
            className={`language-${language} !bg-transparent`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  );
}
