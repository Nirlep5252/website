"use client";

import React, { useCallback, useState } from "react";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  Check,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { PawDivider } from "../ui/Paw";

const EMAIL = "hello@nirlep.dev";

const links = [
  {
    name: "GitHub",
    value: "@nirlep5252",
    href: "https://github.com/nirlep5252",
    icon: Github,
  },
  {
    name: "Twitter",
    value: "@nirlep_5252_",
    href: "https://twitter.com/nirlep_5252_",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    value: "nirlep5252",
    href: "https://linkedin.com/in/nirlep5252",
    icon: Linkedin,
  },
  {
    name: "Discord",
    value: "Join Server",
    href: "https://discord.com/invite/9rYbc54KtY",
    icon: MessageCircle,
  },
];

export const ConnectSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <section id="connect" className="relative overflow-hidden bg-surface-warm">
      {/* a warm pool of light to close the page on */}
      <div className="cafe-sun-glow pointer-events-none absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/3 opacity-70" />

      <div className="relative mx-auto max-w-3xl px-6 py-24 sm:py-32">
        <Reveal className="text-center">
          <h2 className="text-balance font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink-strong">
            Pull up a chair
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-muted">
            Got a project in mind, a question, or just want to say hi? The
            door&apos;s open and the coffee&apos;s on.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.08}>
          <div className="overflow-hidden rounded-card-lg bg-paper shadow-cafe-lift">
            {/* Email — click to copy */}
            <button
              type="button"
              onClick={handleCopy}
              className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ginger sm:px-6"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ginger-soft text-ginger-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="font-medium text-ink-strong">Email</span>
              </span>
              <span className="flex items-center gap-2.5 text-sm">
                {copied ? (
                  <>
                    <span className="font-semibold text-herb-deep">Copied!</span>
                    <Check className="h-4 w-4 text-herb-deep" />
                  </>
                ) : (
                  <>
                    <span className="hidden font-medium text-ink-muted sm:inline">
                      {EMAIL}
                    </span>
                    <Copy className="h-4 w-4 text-ink-faint transition-colors duration-200 group-hover:text-ginger-deep" />
                  </>
                )}
              </span>
            </button>

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-line px-5 py-5 transition-colors duration-200 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ginger sm:px-6"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink-muted transition-colors duration-200 group-hover:bg-ginger-soft group-hover:text-ginger-deep">
                    <link.icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-ink-strong">
                    {link.name}
                  </span>
                </span>
                <span className="flex items-center gap-2.5 text-sm">
                  <span className="font-medium text-ink-muted">
                    {link.value}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ginger-deep" />
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal className="mt-14" delay={0.12}>
          <PawDivider />
          <div className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-ink-muted sm:flex-row sm:justify-between sm:text-left">
            <p>
              Based in <span className="font-medium text-ink-strong">India</span>{" "}
              <span className="font-mono text-ink-muted">(UTC +5:30)</span>
            </p>
            <p>Built with Next.js &amp; Tailwind, supervised by one orange cat.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
