import React, { type ReactNode } from "react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CodeTabs } from "@/app/components/ui/CodeTabs";
import { notFound } from "next/navigation";
import MDXComponents from "@/app/components/MDXComponents";
import { Metadata } from "next";
import { CSESProblemContent } from "@/components/CSESProblemContent";

interface Props {
  params: Promise<{
    category: string;
    problem: string;
  }>;
}

interface PreProps {
  children: {
    props?: {
      children?: string;
      className?: string;
    };
  } & ReactNode;
}

function formatTitle(filename: string): string {
  return filename
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

function formatDate(timestamp: number): string {
  const timestampInMs = timestamp > 9999999999 ? timestamp : timestamp * 1000;
  return new Date(timestampInMs).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, problem } = await params;
  const title = formatTitle(problem);
  const categoryName = formatCategoryName(category);

  return {
    title: `${title} - CSES | Nirlep Gohil`,
    description: `Solution for the ${title} problem from ${categoryName} in CSES.`,
    keywords: ["CSES", title, categoryName, "competitive programming"],
  };
}

export default async function ProblemPage({ params }: Props) {
  "use cache";
  const { category, problem } = await params;
  const filePath = path.join(
    process.cwd(),
    `src/content/cses/${category}/${problem}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = await fs.promises.readFile(filePath, "utf-8");
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/);
  const frontmatterRaw = frontmatterMatch ? frontmatterMatch[1] : "";
  const time = frontmatterRaw.match(/time:\s*(\d+)/)?.[1];

  const cleanedSource = source
    .replace(/^---\n[\s\S]*?\n---/, "")
    .replace(/^\s*[-_*]{3,}\s*$/gm, "");

  const { content } = await compileMDX({
    source: cleanedSource,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        format: "mdx",
      },
    },
    components: {
      ...MDXComponents,
      CodeTabs,
      hr: () => null,
      pre: ({ children }: PreProps) => {
        const className = children?.props?.className ?? "";
        if (className.startsWith("language-")) {
          return children;
        }
        return <pre>{children}</pre>;
      },
    },
  });

  const categoryName = formatCategoryName(category);

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <CSESProblemContent
          category={category}
          categoryName={categoryName}
          problemTitle={formatTitle(problem)}
          formattedDate={time ? formatDate(Number(time)) : null}
        >
          {content}
        </CSESProblemContent>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const solutionsDir = path.join(process.cwd(), "src/content/cses");
  const categories = fs
    .readdirSync(solutionsDir)
    .filter((item) => fs.statSync(path.join(solutionsDir, item)).isDirectory());

  const paths = categories.flatMap((category) => {
    const categoryPath = path.join(solutionsDir, category);
    const problems = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));

    return problems.map((problem) => ({
      category,
      problem,
    }));
  });

  return paths;
}
