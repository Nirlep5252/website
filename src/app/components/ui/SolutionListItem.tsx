import Link from "next/link";

interface Solution {
  name: string;
  title: string;
  time: number;
}

function formatDate(timestamp: number): string {
  const ms = timestamp > 9999999999 ? timestamp : timestamp * 1000;
  return new Date(ms).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

/** One row in a CSES solutions list — index · title · date, hairline-separated. */
export function SolutionListItem({
  solution,
  category,
  index,
}: {
  solution: Solution;
  category: string;
  index: number;
}) {
  return (
    <Link
      href={`/adventures/cses/${category}/${solution.name}`}
      className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 py-3.5 border-b hairline"
    >
      <span className="meta text-ink/45">{String(index + 1).padStart(2, "0")}</span>
      <span className="font-medium tracking-tight2 text-[1.05rem] group-hover:underline underline-offset-4 decoration-1">
        {solution.title}
      </span>
      <span className="meta text-ink/50 flex items-baseline gap-4">
        <span className="hidden sm:inline">{formatDate(solution.time)}</span>
        <span className="text-ink/45 group-hover:text-indigo transition-colors">→</span>
      </span>
    </Link>
  );
}
