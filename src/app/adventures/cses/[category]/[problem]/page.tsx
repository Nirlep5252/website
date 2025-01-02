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

function formatDate(timestamp: number): string {
  // Convert milliseconds to seconds if needed
  const timestampInMs = timestamp > 9999999999 ? timestamp : timestamp * 1000;
  return new Date(timestampInMs).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, problem } = await params;
  const title = formatTitle(problem);
  const categoryName = formatTitle(category);

  return {
    title: `${title} - CSES Solution | Nirlep's Coding Adventures`,
    description: `Detailed solution and explanation for the ${title} problem from ${categoryName} category in CSES (Code Submission Evaluation System). Learn the approach, implementation, and optimization techniques.`,
    keywords: [
      "CSES",
      title,
      categoryName,
      "competitive programming",
      "algorithm",
      "solution",
      "tutorial",
    ],
    openGraph: {
      title: `${title} - CSES Solution`,
      description: `Learn how to solve the ${title} problem from CSES ${categoryName} section. Complete explanation with implementation details.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - CSES Solution`,
      description: `Learn how to solve the ${title} problem from CSES ${categoryName} section.`,
    },
  };
}

export default async function ProblemPage({ params }: Props) {
  const { category, problem } = await params;
  const filePath = path.join(
    process.cwd(),
    `src/content/cses/${category}/${problem}.mdx`,
  );

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = await fs.promises.readFile(filePath, "utf-8");
  // Extract frontmatter separately to preserve the original format
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

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/adventures/cses"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 group"
        >
          <svg
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Solutions
        </Link>
        <AnimatedPost>
          <article className="prose prose-invert prose-lg prose-headings:font-semibold prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-transparent prose-pre:p-0">
            <h1 className="text-4xl font-bold mb-4">{formatTitle(problem)}</h1>
            <div className="flex items-center gap-4 mb-8 not-prose">
              <time className="text-gray-400">{formatDate(Number(time))}</time>
            </div>
            <div className="prose prose-invert prose-lg">{content}</div>
          </article>
        </AnimatedPost>
      </div>
    </main>
  );
}

// Generate static paths for all solutions
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
