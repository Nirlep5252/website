import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass, FolderGit2 } from "lucide-react";
import { Reveal } from "../Reveal";
import type { Post } from "@/lib/mdx";

interface ExploreSectionProps {
  recentPosts: Post[];
  projectCount: number;
  csesSolved: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export const ExploreSection = ({
  recentPosts,
  projectCount,
  csesSolved,
}: ExploreSectionProps) => {
  return (
    <section id="explore" className="relative bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="text-balance font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink-strong">
            Have a look around
          </h2>
          <p className="mt-3 max-w-[52ch] text-lg text-ink-muted">
            Make yourself at home. There&apos;s reading, there&apos;s code, and
            there are puzzles.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Latest writing */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink-strong">
                Latest from the blog
              </h3>
              <Link
                href="/posts"
                className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ginger-deep transition-colors hover:text-ink-strong"
              >
                All posts
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="mt-3">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group -mx-4 flex flex-col gap-1.5 rounded-card border-t border-line px-4 py-5 transition-colors duration-200 first:border-t-0 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-[1.05rem] font-semibold text-ink-strong transition-colors duration-200 group-hover:text-ginger-deep">
                        {post.title}
                      </h4>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ginger-deep" />
                    </div>
                    <p className="line-clamp-2 text-[0.95rem] leading-relaxed text-ink-muted">
                      {post.description}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-ink-muted">
                      {formatDate(post.date)}
                      {post.readingTime ? ` · ${post.readingTime} min read` : ""}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Two doors */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <Reveal className="h-full" delay={0.1}>
              <Link
                href="/projects"
                className="group flex h-full flex-col justify-between gap-6 rounded-card-lg bg-surface-warm p-7 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-cafe-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ginger-soft text-ginger-deep">
                  <FolderGit2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-strong">
                    Projects
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                    BondBot, MashCode, and a stack of CLIs and side quests.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ginger-deep">
                    {projectCount} and counting
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal className="h-full" delay={0.15}>
              <Link
                href="/adventures"
                className="group flex h-full flex-col justify-between gap-6 rounded-card-lg bg-surface-warm p-7 transition-[transform,box-shadow] duration-300 ease-out-quart hover:-translate-y-1 hover:shadow-cafe-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-herb focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-herb-soft text-herb-deep">
                  <Compass className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink-strong">
                    Adventures
                  </h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">
                    {csesSolved} CSES problems, solved and explained step by
                    step.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-herb-deep">
                    Browse solutions
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
