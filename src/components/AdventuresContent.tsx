import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { Poster } from "@/components/emulsion/Poster";
import { AdventureCard } from "@/app/components/ui/AdventureCard";

interface CategoryProgress {
  name: string;
  slug: string;
  solved: number;
  total: number;
}

interface CSESStats {
  solved: number;
  total: number;
  progress: CategoryProgress[];
}

interface AdventuresContentProps {
  csesStats: CSESStats;
}

function CategoryCard({ category }: { category: CategoryProgress }) {
  const pct = category.total > 0 ? Math.min(100, Math.round((category.solved / category.total) * 100)) : 0;
  return (
    <Link href={`/adventures/cses/${category.slug}`} className="card group">
      <Poster seed={category.slug} className="border-b hairline" />
      <div className="p-4 pb-5">
        <div className="meta text-ink/55 flex justify-between mb-2.5">
          <span>
            {category.solved} / {category.total}
          </span>
          <span>{pct}%</span>
        </div>
        <h3 className="text-[1.2rem] leading-[1.15] tracking-tight2 font-medium mb-3 group-hover:underline decoration-1 underline-offset-4">
          {category.name}
        </h3>
        <div className="h-[3px] bg-paper-3">
          <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

export function AdventuresContent({ csesStats }: AdventuresContentProps) {
  return (
    <>
      <Develop delay={240} inView={false} className="mt-12">
        <AdventureCard
          adventure={{
            title: "CSES Problem Set",
            description:
              "A collection of competitive programming problems. Solving algorithmic challenges and improving problem-solving skills — with worked explanations for each one.",
            href: "/adventures/cses",
            seed: "cses",
            solved: csesStats.solved,
            total: csesStats.total,
            tags: ["DP", "Graphs", "Trees", "Math", "Strings"],
            cta: "Browse solutions",
            external: { label: "Profile on cses.fi", href: "https://cses.fi/user/151151/" },
          }}
        />
      </Develop>

      {csesStats.progress.length > 0 && (
        <section className="mt-24">
          <Develop className="eyebrow text-ink/70 mb-6">Categories</Develop>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {csesStats.progress.map((category, i) => (
              <Develop key={category.slug} delay={i * 50}>
                <CategoryCard category={category} />
              </Develop>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
