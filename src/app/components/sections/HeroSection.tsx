import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CatMascot from "../CatMascot";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-paper text-ink">
      {/* Warm ambient light from the top-right corner */}
      <div className="cafe-sun-glow pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full opacity-70" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-28">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="order-2 min-w-0 max-w-xl lg:order-1">
          <span
            className="hero-reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink-muted"
          >
            <span className="h-2 w-2 rounded-full bg-herb" />
            open for new projects
          </span>

          <p
            className="hero-reveal mt-7 text-lg font-medium text-ink-muted"
            style={{ ["--reveal-delay" as string]: "0.06s" }}
          >
            Hey, I&apos;m
          </p>
          <h1
            className="hero-reveal mt-1 text-balance font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-ink-strong"
            style={{ ["--reveal-delay" as string]: "0.12s" }}
          >
            Nirlep Gohil
          </h1>
          <p
            className="hero-reveal mt-3 text-balance font-display text-[clamp(1.35rem,3vw,2rem)] font-medium leading-snug text-ink"
            style={{ ["--reveal-delay" as string]: "0.2s" }}
          >
            Code, coffee, and one{" "}
            <span className="text-ginger-deep">very orange cat</span>.
          </p>

          <p
            className="hero-reveal mt-5 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-muted"
            style={{ ["--reveal-delay" as string]: "0.28s" }}
          >
            Full-stack developer and competitive programmer. I ship open source,
            write about what I learn, and keep this corner of the internet warm.
          </p>

          <div
            className="hero-reveal mt-9 flex flex-wrap items-center gap-3"
            style={{ ["--reveal-delay" as string]: "0.36s" }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ginger-deep px-7 py-3.5 font-semibold text-paper shadow-cafe-rest transition-[background-color,transform,box-shadow] duration-200 ease-out-quart hover:bg-ink-strong hover:shadow-cafe-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2 focus-visible:ring-offset-paper motion-safe:hover:-translate-y-0.5"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/posts"
              className="inline-flex items-center rounded-full border border-line bg-paper px-7 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-line-strong hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Read the writing
            </Link>
          </div>
        </div>

        {/* Mascot */}
        <div className="relative order-1 flex justify-center lg:order-2">
          <div className="cafe-sun-glow pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div
            id="hero-cat-anchor"
            className="hero-pop relative z-[1] w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]"
          >
            {/* Static placeholder for no-JS / reduced-motion; the interactive,
                scroll-morphing cat is rendered by <HomeScrollCat /> and sits
                exactly here at the top of the page. */}
            <CatMascot className="w-full" interactive={false} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
