import fs from "fs";
import path from "path";

interface CategoryProgress {
  name: string;
  slug: string;
  solved: number;
  total: number;
}

const CATEGORY_TOTALS: Record<string, { name: string; total: number }> = {
  introductory: { name: "Introductory", total: 19 },
  "sorting-and-searching": { name: "Sorting & Searching", total: 35 },
  "dynamic-programming": { name: "Dynamic Programming", total: 19 },
  "graph-algorithms": { name: "Graph Algorithms", total: 36 },
  "range-queries": { name: "Range Queries", total: 19 },
  "tree-algorithms": { name: "Tree Algorithms", total: 16 },
  mathematics: { name: "Mathematics", total: 31 },
  "string-algorithms": { name: "String Algorithms", total: 17 },
  geometry: { name: "Geometry", total: 7 },
  "advanced-techniques": { name: "Advanced Techniques", total: 24 },
  "additional-problems": { name: "Additional Problems", total: 77 },
};

export async function getCSESStats() {
  const solutionsDir = path.join(process.cwd(), "src/content/cses");

  // Create directory if it doesn't exist
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
    return {
      solved: 0,
      total: 300,
      progress: [] as CategoryProgress[],
    };
  }

  // Get all categories
  const categories = fs
    .readdirSync(solutionsDir)
    .filter((item) => fs.statSync(path.join(solutionsDir, item)).isDirectory());

  // Build progress array
  const progress: CategoryProgress[] = categories.map((category) => {
    const categoryPath = path.join(solutionsDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));

    const categoryInfo = CATEGORY_TOTALS[category] || {
      name: category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      total: 20,
    };

    return {
      name: categoryInfo.name,
      slug: category,
      solved: files.length,
      total: categoryInfo.total,
    };
  });

  // Count all MDX files in all categories
  const totalSolved = progress.reduce((total, cat) => total + cat.solved, 0);
  const totalProblems = 300; // Total problems in CSES

  return {
    solved: totalSolved,
    total: totalProblems,
    progress,
  };
}
