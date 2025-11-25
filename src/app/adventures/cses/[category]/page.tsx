import React from "react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

interface Solution {
  name: string;
  title: string;
  time: number;
}

function formatTitle(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatCategoryName(category: string): string {
  const names: Record<string, string> = {
    introductory: "Introductory",
    "sorting-and-searching": "Sorting & Searching",
    "dynamic-programming": "Dynamic Programming",
    "graph-algorithms": "Graph Algorithms",
    "range-queries": "Range Queries",
    "tree-algorithms": "Tree Algorithms",
    mathematics: "Mathematics",
    "string-algorithms": "String Algorithms",
    geometry: "Geometry",
    "advanced-techniques": "Advanced Techniques",
    "additional-problems": "Additional Problems",
  };
  return names[category] || formatTitle(category);
}

async function getCategorySolutions(category: string): Promise<Solution[]> {
  const categoryPath = path.join(
    process.cwd(),
    "src/content/cses",
    category
  );

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith(".mdx"));

  const solutions = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(categoryPath, file);
      const source = await fs.promises.readFile(filePath, "utf-8");

      const { frontmatter } = await compileMDX({
        source,
        options: { parseFrontmatter: true },
      });

      return {
        name: file.replace(/\.mdx$/, ""),
        title: formatTitle(file.replace(/\.mdx$/, "")),
        time: (frontmatter as { time: number }).time,
      };
    })
  );

  return solutions.sort((a, b) => a.time - b.time);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = formatCategoryName(category);

  return {
    title: `${categoryName} - CSES Solutions | Nirlep Gohil`,
    description: `Solutions for ${categoryName} problems from the CSES Problem Set.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const solutions = await getCategorySolutions(category);

  if (solutions.length === 0) {
    notFound();
  }

  const categoryName = formatCategoryName(category);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/adventures"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-12 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Adventures
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-100 tracking-tight">
            {categoryName}
          </h1>
          <p className="text-zinc-500 mt-4">
            {solutions.length} problem{solutions.length !== 1 ? "s" : ""} solved
          </p>
        </div>

        {/* Solutions list */}
        <div>
          {solutions.map((solution, index) => (
            <Link
              key={solution.name}
              href={`/adventures/cses/${category}/${solution.name}`}
              className="group block py-5 border-b border-zinc-800 first:border-t"
            >
              <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="text-zinc-700 font-mono text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-lg md:text-xl font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                    {solution.title}
                  </h2>
                </div>
                <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const solutionsDir = path.join(process.cwd(), "src/content/cses");

  if (!fs.existsSync(solutionsDir)) {
    return [];
  }

  const categories = fs
    .readdirSync(solutionsDir)
    .filter((item) => fs.statSync(path.join(solutionsDir, item)).isDirectory());

  return categories.map((category) => ({ category }));
}
