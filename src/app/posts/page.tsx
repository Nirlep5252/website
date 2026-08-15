import { getAllPosts } from "@/lib/mdx";
import { Metadata } from "next";
import { Develop } from "@/components/emulsion/Develop";
import { PostCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "Writing | Nirlep Gohil",
  description: "Thoughts on software development, programming, and technology.",
  keywords: ["blog", "programming", "software development", "tech articles"],
  openGraph: {
    title: "Writing | Nirlep Gohil",
    description: "Thoughts on software development, programming, and technology.",
    type: "website",
  },
};

export default async function Posts() {
  "use cache";
  const posts = await getAllPosts();

  return (
    <main className="surface-paper min-h-screen">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-36 pb-24">
        <Develop className="eyebrow text-ink/70 mb-4" inView={false}>Writing</Develop>
        <Develop delay={80} inView={false}>
          <h1 className="display text-[clamp(2.4rem,5.5vw,4.5rem)]">Notes from the desk.</h1>
        </Develop>
        <Develop delay={160} inView={false}>
          <p className="lede text-ink/65 mt-4 max-w-[52ch]">
            Thoughts on software, tools and the occasional hackathon. {posts.length} posts.
          </p>
        </Develop>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {posts.map((p, i) => (
            <Develop key={p.slug} delay={i * 50}>
              <PostCard post={p} index={i} />
            </Develop>
          ))}
        </div>

        {posts.length === 0 && <p className="font-mono text-ink/50 py-20 text-center">No posts yet.</p>}
      </div>
    </main>
  );
}
