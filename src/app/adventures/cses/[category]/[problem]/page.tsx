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
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";

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
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(timestamp: number): string {
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
    title: `${title} - CSES Solution | Nirlep Gohil`,
    description: `Detailed solution and explanation for the ${title} problem from ${categoryName} category in CSES.`,
    keywords: [
      "CSES",
      title,
      categoryName,
      "competitive programming",
      "algorithm",
      "solution",
    ],
    openGraph: {
      title: `${title} - CSES Solution`,
      description: `Learn how to solve the ${title} problem from CSES ${categoryName} section.`,
      type: "article",
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
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/adventures/cses"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-primary mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to solutions
          </Link>

          <AnimatedPost>
            <article>
              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-2.5 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md">
                    {formatCategoryName(category)}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-mono text-text-tertiary">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(Number(time))}</time>
                  </div>
                </div>

                <h1 className="text-display-md font-display font-bold text-text mb-4">
                  {formatTitle(problem)}
                </h1>

                <a
                  href={`https://cses.fi/problemset/task/${problem.replace(/-/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-primary transition-colors"
                >
                  View on CSES
                  <ExternalLink className="w-4 h-4" />
                </a>
              </header>

              {/* Content */}
              <div className="prose prose-lg max-w-none">{content}</div>
            </article>
          </AnimatedPost>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/adventures/cses"
              className="text-sm font-mono text-text-tertiary hover:text-primary transition-colors"
            >
              ← All CSES solutions
            </Link>
          </footer>
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
