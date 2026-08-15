"use client";

import { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-rust";

interface CodeBlockProps {
  children: string;
  language: string;
  /** optional filename / label shown in the header bar */
  label?: string;
}

/** Ink code block with LUT syntax colours (theme lives in globals.css `.code-block`). */
export function CodeBlock({ children, language, label }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const content = (children || "").trim();

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.className = `language-${language}`;
      Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="code-block not-prose my-7 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-paper/10">
        <span className="meta text-paper/50">{label ?? language}</span>
        <button
          type="button"
          onClick={copy}
          className="meta text-paper/60 hover:text-signal transition-colors"
          aria-label="Copy code"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="!m-0 !p-4 overflow-x-auto text-[13px] leading-[1.6]">
        <code ref={codeRef}>{content}</code>
      </pre>
    </div>
  );
}
