import React from "react";
import { getCSESStats } from "@/lib/cses";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Code } from "lucide-react";

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
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/adventures"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Adventures
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-emerald-500 font-mono text-sm mb-2 block">
            {"// cses"}
          </span>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-zinc-100">CSES Solutions</h1>
            <span className="text-sm font-mono text-emerald-500">
              {stats.solved}/{stats.total}
            </span>
          </div>
          <p className="text-zinc-400 mt-4">
            My approaches, solutions, and explanations to problems from the CSES
            Problem Set.
          </p>
        </div>

        {solutions.length === 0 ? (
          <div className="text-center py-16">
            <Code className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 font-mono">No solutions yet.</p>
            <p className="text-zinc-600 text-sm mt-2">
              Solutions will appear here as they are added.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-xl font-semibold text-zinc-200 mb-4 flex items-center gap-3">
                  <span className="text-emerald-500 font-mono text-sm">
                    {category.solutions.length}
                  </span>
                  {formatCategoryName(category.name)}
                </h2>
                <div className="grid gap-2">
                  {category.solutions
                    .sort((a, b) => a.time - b.time)
                    .map((solution) => (
                      <Link
                        key={solution.name}
                        href={`/adventures/cses/${category.slug}/${solution.name}`}
                        className="group flex items-center justify-between p-4 bg-bg-secondary/50 border border-border rounded-lg hover:border-border-hover hover:bg-bg-secondary transition-all"
                      >
                        <span className="text-zinc-300 group-hover:text-emerald-500 transition-colors">
                          {solution.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
