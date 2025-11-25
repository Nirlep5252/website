import React, { type ReactNode } from "react";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { CodeTabs } from "@/app/components/ui/CodeTabs";
import { notFound } from "next/navigation";
import { AnimatedPost } from "@/components/AnimatedPost";
import MDXComponents from "@/app/components/MDXComponents";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

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
        {/* Back link */}
        <Link
          href={`/adventures/cses/${category}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-12 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {categoryName}
        </Link>

        <AnimatedPost>
          <article>
            {/* Header */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                {formatTitle(problem)}
              </h1>
              <div className="flex items-center gap-4 text-sm text-zinc-500 font-mono">
                {time && <span>{formatDate(Number(time))}</span>}
                <span className="text-zinc-700">CSES</span>
              </div>
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-zinc-100 prose-headings:font-semibold prose-p:text-zinc-300 prose-a:text-emerald-500 hover:prose-a:text-emerald-400 prose-strong:text-zinc-200 prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-emerald-500 prose-blockquote:text-zinc-400 prose-hr:border-border">
              {content}
            </div>
          </article>
        </AnimatedPost>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link
            href={`/adventures/cses/${category}`}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {categoryName}
          </Link>
        </div>
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
