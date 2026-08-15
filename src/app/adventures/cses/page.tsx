import React from "react";
import { getCSESStats } from "@/lib/cses";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";
import { Develop } from "@/components/emulsion/Develop";
import { SolutionListItem } from "@/app/components/ui/SolutionListItem";

export const metadata: Metadata = {
  title: "CSES Solutions | Nirlep Gohil",
  description:
    "Detailed solutions and explanations for CSES (Code Submission Evaluation System) problems. Learn algorithmic problem-solving techniques and competitive programming strategies.",
  keywords: [
    "CSES",
    "competitive programming",
    "algorithm solutions",
    "coding problems",
    "programming tutorials",
  ],
  openGraph: {
    title: "CSES Solutions | Nirlep Gohil",
    description:
      "Detailed solutions and explanations for CSES problems. Learn algorithmic problem-solving techniques.",
    type: "website",
  },
};

interface Solution {
  name: string;
  title: string;
  category: string;
  time: number;
}

interface CategoryWithTime {
  name: string;
  slug: string;
  earliestTime: number;
  solutions: Solution[];
}

function formatTitle(filename: string): string {
  return filename
    .replace(/\.mdx$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getCSESSolutions(): Promise<Solution[]> {
  const solutionsDir = path.join(process.cwd(), "src/content/cses");
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
    return [];
  }

  const categories = fs
    .readdirSync(solutionsDir)
    .filter((item) => fs.statSync(path.join(solutionsDir, item)).isDirectory());

  const solutions = await Promise.all(
    categories.flatMap((category) => {
      const categoryPath = path.join(solutionsDir, category);
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith(".mdx"));

      return files.map(async (file) => {
        const filePath = path.join(categoryPath, file);
        const source = await fs.promises.readFile(filePath, "utf-8");

        const { frontmatter } = await compileMDX({
          source,
          options: { parseFrontmatter: true },
        });

        return {
          name: file.replace(/\.mdx$/, ""),
          title: formatTitle(file),
          category,
          time: (frontmatter as { time: number }).time,
        };
      });
    })
  );

  return solutions.sort((a, b) => a.time - b.time);
}

export default async function CSESSolutions() {
  "use cache";
  const solutions = await getCSESSolutions();
  const stats = await getCSESStats();

  const categoriesWithTime: CategoryWithTime[] = Object.entries(
    solutions.reduce(
      (acc, solution) => {
        if (!acc[solution.category]) {
          acc[solution.category] = {
            name: solution.category,
            slug: solution.category,
            earliestTime: solution.time,
            solutions: [],
          };
        }
        acc[solution.category].solutions.push(solution);
        acc[solution.category].earliestTime = Math.min(
          acc[solution.category].earliestTime,
          solution.time
        );
        return acc;
      },
      {} as Record<string, CategoryWithTime>
    )
  ).map(([, category]) => category);

  const sortedCategories = categoriesWithTime.sort(
    (a, b) => a.earliestTime - b.earliestTime
  );

  return (
    <main className="surface-paper min-h-screen">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-32 pb-24">
        <Link href="/adventures" className="meta text-ink/55 hover:text-indigo transition-colors">
          ← Adventures
        </Link>

        <header className="mt-8">
          <Develop className="eyebrow text-ink/70 mb-4" inView={false}>
            CSES Problem Set
          </Develop>
          <Develop delay={80} inView={false}>
            <h1 className="display text-[clamp(2.4rem,5.5vw,4.5rem)]">Solutions, by category.</h1>
          </Develop>
          <Develop delay={160} inView={false}>
            <p className="lede text-ink/65 mt-4 max-w-[52ch]">
              My approaches, solutions and explanations to problems from the CSES Problem Set.{" "}
              {stats.solved} of {stats.total} solved.
            </p>
          </Develop>
        </header>

        {solutions.length === 0 ? (
          <div className="mt-16 py-20 border-t border-b hairline text-center">
            <p className="font-mono text-ink/50">No solutions yet.</p>
            <p className="meta text-ink/45 mt-3">Solutions will appear here as they are added.</p>
          </div>
        ) : (
          <div className="mt-12">
            {sortedCategories.map((category, ci) => (
              <Develop
                key={category.name}
                as="section"
                delay={ci * 60}
                className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,16rem)_1fr] border-t hairline pt-8 pb-14"
              >
                <div>
                  <h2 className="text-[1.4rem] leading-[1.1] tracking-tight2 font-medium">
                    <Link
                      href={`/adventures/cses/${category.slug}`}
                      className="hover:underline decoration-1 underline-offset-4"
                    >
                      {formatCategoryName(category.name)}
                    </Link>
                  </h2>
                  <p className="meta text-ink/55 mt-3">
                    {category.solutions.length} solved
                  </p>
                  <Link
                    href={`/adventures/cses/${category.slug}`}
                    className="meta text-ink/55 hover:text-indigo transition-colors inline-block mt-6"
                  >
                    Open category →
                  </Link>
                </div>

                <div className="border-t hairline lg:border-t-0">
                  {category.solutions
                    .sort((a, b) => a.time - b.time)
                    .map((solution, i) => (
                      <SolutionListItem
                        key={solution.name}
                        solution={solution}
                        category={category.slug}
                        index={i}
                      />
                    ))}
                </div>
              </Develop>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
