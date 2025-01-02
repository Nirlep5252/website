import React from "react";
import { getCSESStats } from "@/lib/cses";
import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { SolutionListItem } from "@/app/components/ui/SolutionListItem";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSES Solutions | Nirlep's Coding Adventures",
  description: "Explore detailed solutions and explanations for CSES (Code Submission Evaluation System) problems. Learn algorithmic problem-solving techniques and competitive programming strategies.",
  keywords: ["CSES", "competitive programming", "algorithm solutions", "coding problems", "programming tutorials"],
  openGraph: {
    title: "CSES Solutions | Nirlep's Coding Adventures",
    description: "Detailed solutions and explanations for CSES (Code Submission Evaluation System) problems. Learn algorithmic problem-solving techniques.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSES Solutions | Nirlep's Coding Adventures",
    description: "Detailed solutions and explanations for CSES (Code Submission Evaluation System) problems.",
  }
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
    .replace(/\.mdx$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

async function getCSESSolutions(): Promise<Solution[]> {
  const solutionsDir = path.join(process.cwd(), 'src/content/cses');
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
    return [];
  }

  const categories = fs.readdirSync(solutionsDir).filter(item => 
    fs.statSync(path.join(solutionsDir, item)).isDirectory()
  );

  const solutions = await Promise.all(
    categories.flatMap(category => {
      const categoryPath = path.join(solutionsDir, category);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.mdx'));

      return files.map(async file => {
        const filePath = path.join(categoryPath, file);
        const source = await fs.promises.readFile(filePath, 'utf-8');
        
        const { frontmatter } = await compileMDX({
          source,
          options: { parseFrontmatter: true }
        });

        return {
          name: file.replace(/\.mdx$/, ''),
          title: formatTitle(file),
          category,
          time: (frontmatter as { time: number }).time
        };
      });
    })
  );

  return solutions.sort((a, b) => a.time - b.time); // Sort by earliest first
}

export default async function CSESSolutions() {
  const solutions = await getCSESSolutions();
  const stats = await getCSESStats();

  // Group solutions by category and find earliest time for each category
  const categoriesWithTime: CategoryWithTime[] = Object.entries(
    solutions.reduce((acc, solution) => {
      if (!acc[solution.category]) {
        acc[solution.category] = {
          name: solution.category,
          earliestTime: solution.time,
          solutions: []
        };
      }
      acc[solution.category].solutions.push(solution);
      acc[solution.category].earliestTime = Math.min(acc[solution.category].earliestTime, solution.time);
      return acc;
    }, {} as Record<string, CategoryWithTime>)
  ).map(([, category]) => category);

  // Sort categories by earliest problem time
  const sortedCategories = categoriesWithTime.sort((a, b) => a.earliestTime - b.earliestTime);

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">CSES Solutions</h1>
          <div className="text-blue-400/90 text-sm">
            {stats.progress}
          </div>
        </div>

        <div className="bg-gray-900/30 backdrop-blur-xl border border-white/5 rounded-xl p-6 mb-8">
          <p className="text-gray-300/70 leading-relaxed">
The CSES Problemset is a collection of competitive programming problems that I&apos;m trying to solve.
This page contains my approaches, solutions and explanations to the problems I&apos;ve solved.
          </p>
        </div>

        {solutions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No solutions added yet. Solutions will appear here as they are added to the src/content/cses directory.
          </div>
        ) : (
          <div className="space-y-8">
            {sortedCategories.map((category) => (
              <div key={category.name}>
                <h2 className="text-2xl font-bold mb-4">{formatCategoryName(category.name)}</h2>
                <div className="grid gap-2">
                  {category.solutions
                    .sort((a, b) => a.time - b.time)
                    .map((solution, index) => (
                      <SolutionListItem key={solution.name} solution={solution} index={index} />
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