import type { ReactNode } from "react";
import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";

interface CSESProblemContentProps {
  category: string;
  categoryName: string;
  problemTitle: string;
  formattedDate: string | null;
  children: ReactNode;
}

export function CSESProblemContent({
  category,
  categoryName,
  problemTitle,
  formattedDate,
  children,
}: CSESProblemContentProps) {
  const backHref = `/adventures/cses/${category}`;

  return (
    <>
      <Link href={backHref} className="meta text-ink/55 hover:text-indigo transition-colors">
        ← {categoryName}
      </Link>

      <header className="mt-8 mb-12">
        <Develop className="eyebrow text-ink/70 mb-4" inView={false}>
          CSES · {categoryName}
        </Develop>
        <Develop delay={80} inView={false}>
          <h1 className="display text-[clamp(2.1rem,5vw,3.9rem)]">{problemTitle}</h1>
        </Develop>
        <div className="meta text-ink/55 flex flex-wrap gap-x-5 gap-y-2 mt-6">
          {formattedDate && <span>Solved {formattedDate}</span>}
          <a
            href="https://cses.fi/problemset/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo transition-colors"
          >
            cses.fi ↗
          </a>
        </div>
      </header>

      <div className="prose">{children}</div>

      <footer className="mt-16 pt-6 border-t hairline flex items-center justify-between gap-4">
        <Link href={backHref} className="btn-outline">
          ← All {categoryName}
        </Link>
        {formattedDate && <span className="meta text-ink/45">{formattedDate}</span>}
      </footer>
    </>
  );
}
