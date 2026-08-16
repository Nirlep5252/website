import type { ReactElement } from "react";

interface Solution {
  name: string;
  category: string;
  code: string;
  content: ReactElement;
  frontmatter: {
    title: string;
    problemId: string;
    link: string;
    tags?: string[];
  };
}

/** Paper card rendering a full solution inline (title, tags, source link, prose). */
export function SolutionCard({ solution }: { solution: Solution; index?: number }) {
  const { frontmatter, content } = solution;
  return (
    <article className="card p-5 sm:p-6">
      <header className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-[1.2rem] leading-[1.15] tracking-tight2 font-medium">{frontmatter.title}</h3>
          {frontmatter.tags?.length ? (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <a
          href={frontmatter.link}
          target="_blank"
          rel="noopener noreferrer"
          className="meta text-ink/55 hover:text-indigo transition-colors shrink-0"
        >
          cses ↗
        </a>
      </header>
      <div className="prose">{content}</div>
    </article>
  );
}
