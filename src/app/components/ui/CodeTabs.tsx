"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "./CodeBlock";

interface CodeTabsProps {
  langs: string[];
  children: React.ReactNode;
}

type CodeElement = {
  type: string;
  props: {
    children: string;
  };
};

export function CodeTabs({ langs, children }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [tabBounds, setTabBounds] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton = tabsRef.current[activeTab];
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setTabBounds({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  const childArray = React.Children.toArray(children);
  const codes = childArray
    .filter(
      (child) =>
        typeof child === "object" &&
        child !== null &&
        "type" in child &&
        (child as { type: string }).type === "code"
    )
    .map((child) => (child as CodeElement).props.children);

  if (codes.length === 0) {
    return null;
  }

  const getLanguageIdentifier = (lang: string) => {
    const langMap: Record<string, string> = {
      "C++": "cpp",
      Python: "python",
      Rust: "rust",
      TypeScript: "typescript",
      JavaScript: "javascript",
      Go: "go",
      Java: "java",
    };
    return langMap[lang] || lang.toLowerCase();
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-bg-card my-6">
      {/* Tabs header */}
      <div className="flex bg-bg-elevated border-b border-border relative">
        {langs.map((lang, index) => (
          <button
            key={lang}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2.5 text-xs font-mono transition-colors relative ${
              activeTab === index
                ? "text-primary"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {lang}
          </button>
        ))}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            left: tabBounds.left,
            width: tabBounds.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="[&_.group]:rounded-none [&_.group]:border-0 [&_.group]:my-0">
            <CodeBlock language={getLanguageIdentifier(langs[activeTab])}>
              {codes[activeTab]}
            </CodeBlock>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
