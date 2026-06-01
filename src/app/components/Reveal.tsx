"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-triggered reveal that is *armed only on the client*, by mutating the
 * element's `data-reveal` attribute directly (no React state, so no cascading
 * renders).
 *
 * SSR, no-JS, and reduced-motion all render the content fully visible: the
 * attribute is never set, so the base styles win. Because home sections sit
 * below a full-height hero, the element arms to `out` while it is still
 * off-screen, so there is no visible flash before it scrolls into view and
 * transitions to `in`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.reveal = "out";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={
        delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined
      }
      className={className}
    >
      {children}
    </div>
  );
}
