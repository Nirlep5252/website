import React from "react";
import { Reveal } from "../Reveal";
import { PawMark } from "../ui/Paw";

const facts = [
  { label: "Languages", value: "Rust · TypeScript · Python · Go" },
  { label: "Building with", value: "React · Next.js · Node · Postgres" },
  { label: "Based in", value: "India (UTC +5:30)" },
  { label: "Writing about", value: "whatever I just learned" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative bg-surface-warm">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* The story */}
          <Reveal>
            <h2 className="text-balance font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink-strong">
              Behind the counter
            </h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-pretty text-lg leading-relaxed text-ink">
              <p>
                I&apos;m a full-stack developer and competitive programmer from
                India. I build things for the web end to end: the database
                underneath, the API in the middle, and the interface people
                actually touch.
              </p>
              <p>
                Most days that&apos;s TypeScript and Next.js, with Rust or Go
                when something needs to be fast or stubborn. The rest of the
                time I&apos;m solving algorithm problems for the sport of it,
                writing up what I learn, and contributing to open source, all of
                it run under the close supervision of one very orange cat.
              </p>
            </div>
          </Reveal>

          {/* The details */}
          <Reveal delay={0.1}>
            <div className="rounded-card-lg bg-paper p-7 shadow-cafe-lift sm:p-8">
              <div className="flex items-center gap-2.5">
                <PawMark className="h-5 w-5 fill-ginger" />
                <span className="font-display text-base font-semibold text-ink-strong">
                  the details
                </span>
              </div>
              <dl className="mt-5 divide-y divide-line">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-baseline justify-between gap-5 py-3.5"
                  >
                    <dt className="shrink-0 text-sm font-semibold text-ink-muted">
                      {f.label}
                    </dt>
                    <dd className="text-right font-medium text-ink-strong">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
