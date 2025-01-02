import fs from "fs";
import path from "path";

export async function getCSESStats() {
  const solutionsDir = path.join(process.cwd(), "src/content/cses");

  // Create directory if it doesn't exist
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
    return {
      solved: 0,
      total: 300,
      progress: "0/300 problems solved",
    };
  }

  // Get all categories
  const categories = fs
    .readdirSync(solutionsDir)
    .filter((item) => fs.statSync(path.join(solutionsDir, item)).isDirectory());

  // Count all MDX files in all categories
  const totalSolved = categories.reduce((total, category) => {
    const categoryPath = path.join(solutionsDir, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith(".mdx"));
    return total + files.length;
  }, 0);

  const totalProblems = 300; // Total problems in CSES

  return {
    solved: totalSolved,
    total: totalProblems,
    progress: `${totalSolved}/${totalProblems} problems solved`,
  };
}
