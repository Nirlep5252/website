import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import fs from "fs";
import path from "path";

const BASE_URL = "https://nirlep.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/adventures`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/adventures/cses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Blog posts
  const posts = await getAllPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // CSES categories and problems
  const csesPages: MetadataRoute.Sitemap = [];
  const solutionsDir = path.join(process.cwd(), "src/content/cses");

  if (fs.existsSync(solutionsDir)) {
    const categories = fs
      .readdirSync(solutionsDir)
      .filter((item) =>
        fs.statSync(path.join(solutionsDir, item)).isDirectory()
      );

    for (const category of categories) {
      // Add category page
      csesPages.push({
        url: `${BASE_URL}/adventures/cses/${category}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });

      // Add problem pages
      const categoryPath = path.join(solutionsDir, category);
      const problems = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));

      for (const problem of problems) {
        csesPages.push({
          url: `${BASE_URL}/adventures/cses/${category}/${problem}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return [...staticPages, ...postPages, ...csesPages];
}
