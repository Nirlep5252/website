"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { SITE } from "@/lib/site";

const EMAIL = SITE.email;
const CALENDAR = "https://calendar.app.google/SUgGEw1nzd7vvA188";

export function CTASection() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleEmailClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="surface-paper border-t hairline" id="contact">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <Develop className="eyebrow text-ink/70 mb-4">Contact</Develop>
        <Develop delay={80}>
          <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[16ch]">Ready to get started?</h2>
        </Develop>
        <Develop delay={160}>
          <p className="lede text-ink/70 max-w-[52ch] mt-4">
            Tell me about your project — I typically respond within 24 hours.
          </p>
        </Develop>

        <Develop delay={240} className="flex flex-wrap items-center gap-4 mt-8">
          <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="btn-ink" aria-live="polite">
            {copied ? "Email copied ✓" : `${EMAIL} →`}
          </a>
          <a href={CALENDAR} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Book a call ↗
          </a>
        </Develop>

        <Develop delay={320} className="mt-8">
          <Link href="/projects" className="meta text-ink/55 hover:text-indigo transition-colors">
            Or see previous work →
          </Link>
        </Develop>
      </div>
    </section>
  );
}
