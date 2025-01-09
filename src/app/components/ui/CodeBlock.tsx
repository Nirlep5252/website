"use client";

import { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
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
}

export function CodeBlock({ children, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.className = `language-${language}`;
      Prism.highlightElement(codeRef.current);
    }
  }, [children, language]);

  const content = children || "";

  return (
    <div className="relative group">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          className="bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/90 px-2 py-1 rounded text-sm transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="!bg-gray-900 !p-4 rounded-xl">
        <code ref={codeRef}>{content.trim()}</code>
      </pre>
    </div>
  );
}
