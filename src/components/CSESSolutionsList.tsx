import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { Poster } from "@/components/emulsion/Poster";
import { SolutionListItem } from "@/app/components/ui/SolutionListItem";
import { squircleClip } from "@/lib/squircle";

// Wide superellipse tile for the CSES wordmark (official logo is 400×144).
const TILE_W = 150;
const TILE_H = 60;
const RING = 2;
const CLIP_TILE = squircleClip(TILE_W, TILE_H, 18);
const CLIP_RING = squircleClip(TILE_W + RING * 2, TILE_H + RING * 2, 18 + RING);

interface Solution {
  name: string;
  title: string;
  time: number;
}

interface CSESSolutionsListProps {
  category: string;
  categoryName: string;
  solutions: Solution[];
}

export function CSESSolutionsList({ category, categoryName, solutions }: CSESSolutionsListProps) {
  return (
    <>
      <Link href="/adventures/cses" className="meta text-ink/55 hover:text-indigo transition-colors">
        ← CSES solutions
      </Link>

      <header className="mt-8">
        {/* same seed as the category card on /adventures, so the poster carries over */}
        <div className="relative rounded-[2px] overflow-hidden mb-9">
          {/* taller frame on phones so the tile and edge labels have room; Poster skips hidden ones */}
          <Poster seed={category} ratio={21 / 10} className="sm:hidden" />
          <Poster seed={category} ratio={21 / 6} className="hidden sm:block" />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block bg-paper/25 scale-[0.85] sm:scale-100"
            style={{ width: TILE_W + RING * 2, height: TILE_H + RING * 2, clipPath: CLIP_RING, padding: RING }}
          >
            <span className="grid h-full w-full place-items-center bg-white" style={{ clipPath: CLIP_TILE }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/cses.png" alt="" width={110} height={40} className="block h-auto w-[110px]" />
            </span>
          </span>
          {/* frame-edge data */}
          <div
            className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-4 pb-3 meta text-paper/85"
            style={{ textShadow: "0 0 6px rgba(11,10,14,0.8)" }}
          >
            <span className="hidden sm:inline">CSES problem set</span>
            <span className="text-right ml-auto whitespace-nowrap">
              {categoryName} · {solutions.length} solved
            </span>
          </div>
        </div>
        <Develop delay={80} inView={false}>
          <h1 className="display text-[clamp(2.4rem,5.5vw,4.5rem)]">{categoryName}</h1>
        </Develop>
        <Develop delay={160} inView={false}>
          <p className="lede text-ink/65 mt-4 max-w-[52ch]">
            {solutions.length} problem{solutions.length !== 1 ? "s" : ""} solved, in the order I got to them.
          </p>
        </Develop>
      </header>

      <Develop as="div" delay={240} inView={false} className="mt-12 border-t hairline">
        {solutions.map((solution, index) => (
          <SolutionListItem key={solution.name} solution={solution} category={category} index={index} />
        ))}
      </Develop>
    </>
  );
}
