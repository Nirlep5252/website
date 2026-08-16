import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { Poster } from "@/components/emulsion/Poster";
import { SolutionListItem } from "@/app/components/ui/SolutionListItem";

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
        <Poster seed={category} ratio={21 / 6} className="rounded-[2px] mb-9" />
        <Develop className="eyebrow text-ink/70 mb-4" inView={false}>
          CSES Problem Set
        </Develop>
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
