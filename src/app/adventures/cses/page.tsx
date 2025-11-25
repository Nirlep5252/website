import React from "react";
import { getCSESStats } from "@/lib/cses";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { SolutionListItem } from "@/app/components/ui/SolutionListItem";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "CSES Solutions | Nirlep Gohil",
  description:
    "Detailed solutions and explanations for CSES (Code Submission Evaluation System) problems.",
  keywords: [
    "CSES",
    "competitive programming",
    "algorithm solutions",
    "coding problems",
  ],
  openGraph: {
    title: "CSES Solutions | Nirlep Gohil",
    description:
      "Detailed solutions and explanations for CSES competitive programming problems.",
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
    }),
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
            earliestTime: solution.time,
            solutions: [],
          };
        }
        acc[solution.category].solutions.push(solution);
        acc[solution.category].earliestTime = Math.min(
          acc[solution.category].earliestTime,
          solution.time,
        );
        return acc;
      },
      {} as Record<string, CategoryWithTime>,
    ),
  ).map(([, category]) => category);

  const sortedCategories = categoriesWithTime.sort(
    (a, b) => a.earliestTime - b.earliestTime,
  );

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Back link */}
        <Link
          href="/adventures"
          className="inline-flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-primary mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to adventures
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-primary" />
              <h1 className="text-display-sm font-display font-bold text-text">
                CSES Solutions
              </h1>
            </div>
            <p className="text-text-secondary">
              My approaches and solutions to the CSES Problem Set
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg bg-bg-card border border-border">
              <span className="text-sm font-mono text-primary">
                {stats.progress}
              </span>
            </div>
            <a
              href="https://cses.fi/user/151151/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-primary transition-colors"
            >
              CSES Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Description */}
        <div className="card p-6 mb-8">
          <p className="text-text-secondary leading-relaxed">
            The CSES Problemset is a collection of competitive programming
            problems that I&apos;m working through. This page contains my
            approaches, solutions, and explanations for the problems I&apos;ve
            solved.
          </p>
        </div>

        {/* Solutions */}
        {solutions.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-text-secondary font-mono">
              No solutions added yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((category) => (
              <section key={category.name}>
                <h2 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-4">
                  {formatCategoryName(category.name)}
                </h2>
                <div className="space-y-2">
                  {category.solutions
                    .sort((a, b) => a.time - b.time)
                    .map((solution, index) => (
                      <SolutionListItem
                        key={solution.name}
                        solution={solution}
                        index={index}
                      />
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
