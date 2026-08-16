"use client";

import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-python";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";

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

// Map display names to Prism.js language identifiers
const LANG_MAP: Record<string, string> = {
  "C++": "cpp",
  Python: "python",
  Rust: "rust",
};

function getLanguageIdentifier(lang: string) {
  return LANG_MAP[lang] || lang.toLowerCase();
}

/**
 * Tabbed ink code block (one tab per language). Same chrome as CodeBlock:
 * ink surface, cream text, mono meta header with a copy action.
 */
export function CodeTabs({ langs, children }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const codes = React.Children.toArray(children)
    .filter(
      (child) =>
        typeof child === "object" &&
        child !== null &&
        "type" in child &&
        (child as { type: string }).type === "code"
    )
    .map((child) => ((child as CodeElement).props.children || "").trim());

  const language = getLanguageIdentifier(langs[activeTab] ?? "");
  const content = codes[activeTab] ?? "";

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.className = `language-${language}`;
      Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  if (codes.length === 0) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="code-block not-prose my-7 overflow-hidden">
      <div className="flex items-stretch justify-between border-b border-paper/10">
        <div role="tablist" aria-label="Language" className="flex">
          {langs.map((lang, index) => {
            const active = activeTab === index;
            return (
              <button
                key={lang}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(index)}
                className={`meta relative px-4 py-2.5 transition-colors ${
                  active
                    ? "text-paper after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-signal"
                    : "text-paper/50 hover:text-paper/80"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={copy}
          className="meta text-paper/60 hover:text-signal transition-colors px-4 py-2.5"
          aria-label="Copy code"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="!m-0 !p-4 overflow-x-auto text-[13px] leading-[1.6]">
        {/* keyed so a tab switch remounts the node Prism mutated */}
        <code key={activeTab} ref={codeRef}>
          {content}
        </code>
      </pre>
    </div>
  );
}
