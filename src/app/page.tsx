import { getAllPosts } from "@/lib/mdx";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { WorkSection } from "./components/sections/WorkSection";
import { WritingSection } from "./components/sections/WritingSection";

export default async function Home() {
  "use cache";
  const allPosts = await getAllPosts();
  const recent = allPosts.slice(0, 3).map(({ slug, title, description, date, readingTime, tags }) => ({
    slug,
    title,
    description,
    date,
    readingTime,
    tags,
  }));

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <WritingSection posts={recent} />
    </main>
  );
}
