import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { PostCard, type PostLite } from "@/components/Cards";

export function WritingSection({ posts }: { posts: PostLite[] }) {
  return (
    <section className="surface-paper border-t hairline" id="writing">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <Develop className="eyebrow text-ink/70 mb-4">Recent writing</Develop>
            <Develop delay={80}>
              <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)]">Notes from the desk.</h2>
            </Develop>
          </div>
          <Link href="/posts" className="btn-outline hidden sm:inline-flex">All writing →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Develop key={p.slug} delay={i * 70} className="min-w-0">
              <PostCard post={p} />
            </Develop>
          ))}
        </div>
        <Link href="/posts" className="btn-outline sm:hidden mt-6">All writing →</Link>
      </div>
    </section>
  );
}
