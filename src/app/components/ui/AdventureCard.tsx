import Link from "next/link";
import { Poster } from "@/components/emulsion/Poster";

export interface Adventure {
  title: string;
  description: string;
  /** internal route the card leads to */
  href: string;
  /** stable seed for the poster (defaults to href) */
  seed?: string;
  solved: number;
  total: number;
  tags: string[];
  cta?: string;
  /** optional outbound profile / source link */
  external?: { label: string; href: string };
}

/** Featured "adventure" — a wide paper card with a seeded poster, progress meter and CTA. */
export function AdventureCard({ adventure }: { adventure: Adventure }) {
  const { title, description, href, seed, solved, total, tags, cta, external } = adventure;
  const pct = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;

  return (
    <article className="card grid sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Link href={href} aria-label={title} className="block border-b sm:border-b-0 sm:border-r hairline">
        <Poster seed={seed ?? href} ratio={4 / 3} className="h-full" />
      </Link>

      <div className="p-5 sm:p-7 flex flex-col">
        <div className="meta text-ink/55 flex justify-between gap-4">
          <span className="truncate">{tags.join(" · ")}</span>
          <span className="shrink-0">
            {solved} / {total} solved
          </span>
        </div>

        <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.05] tracking-tight2 font-medium">
          <Link href={href} className="hover:underline decoration-1 underline-offset-4">
            {title}
          </Link>
        </h2>
        <p className="lede text-ink/70 mt-3 max-w-[52ch]">{description}</p>

        <div className="mt-6 flex items-center gap-4" aria-label={`${pct}% complete`}>
          <div className="h-[3px] flex-1 bg-paper-3">
            <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
          </div>
          <span className="meta text-ink/55 shrink-0">{pct}%</span>
        </div>

        <div className="mt-auto pt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={href} className="btn-ink">
            {cta ?? "Browse solutions"} →
          </Link>
          {external ? (
            <a
              href={external.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-mono text-[12.5px]"
            >
              {external.label} ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
