"use client";

import Link from "next/link";
import { EmulsionField } from "@/components/emulsion/EmulsionField";
import { Develop } from "@/components/emulsion/Develop";
import { HERO_PARAMS } from "@/lib/emulsion/renderer";
import { SITE } from "@/lib/site";
import { Year } from "@/components/Year";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] surface-ink overflow-hidden" aria-label="Intro">
      <EmulsionField params={HERO_PARAMS} developOnMount={1400} style={{ position: "absolute", inset: 0 }} />

      <div className="relative z-10 mx-auto max-w-[1120px] min-h-[100svh] px-5 sm:px-8 pt-32 pb-12 sm:pb-20 grid content-end gap-5">
        <Develop delay={700} duration={700} inView={false} className="eyebrow text-paper">
          Software engineer
        </Develop>

        <Develop delay={900} duration={1100} inView={false}>
          <h1 className="display text-paper text-[clamp(2.75rem,8.4vw,8rem)] max-w-[13ch]">
            Nirlep Gohil builds real software in&nbsp;the era of slop.
          </h1>
        </Develop>

        <Develop delay={1300} duration={800} inView={false}>
          <p className="lede text-paper/85 max-w-[min(56ch,100%)] mt-1">
            Shipping got cheap, and most of what ships is slop. I make the other kind — considered,
            well-built products and tools you can tell apart. Systems to interfaces, Rust to React.
          </p>
        </Develop>

        <Develop delay={1500} duration={600} inView={false} className="flex items-center gap-4 mt-2">
          <Link href="/projects" className="btn-solid">View work →</Link>
          <Link href="/posts" className="btn-ghost">Read the writing</Link>
        </Develop>

        <div className="hidden md:block absolute right-8 bottom-20 meta text-paper/60 text-right leading-[1.8]">
          <div><Year /> · {SITE.location}</div>
          <div>{SITE.handle}</div>
        </div>
      </div>
    </section>
  );
}
