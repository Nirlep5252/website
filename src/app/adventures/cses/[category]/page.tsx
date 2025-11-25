import React from "react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CSESSolutionsList } from "@/components/CSESSolutionsList";

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
        <CSESSolutionsList
          category={category}
          categoryName={categoryName}
          solutions={solutions}
        />
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
