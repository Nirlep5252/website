import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/app/components/MDXComponents";
import Link from "next/link";
import { Metadata } from "next";
import { Poster } from "@/components/emulsion/Poster";
import { Develop } from "@/components/emulsion/Develop";
import { formatDate } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  "use cache";
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found", description: "The requested blog post could not be found." };
  return {
    title: `${post.title} | Nirlep Gohil`,
    description: post.description || `Read about ${post.title}.`,
    keywords: [...(post.tags || []), "blog", "programming", "tech"],
    authors: [{ name: "Nirlep Gohil" }],
    openGraph: {
      title: post.title,
      description: post.description || `Read about ${post.title}.`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description || `Read about ${post.title}.` },
  };
}

export default async function BlogPost({ params }: PageProps) {
  "use cache";
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="surface-paper min-h-screen">
      <article className="mx-auto max-w-[760px] px-5 sm:px-6 pt-32 pb-24">
        <Link href="/posts" className="meta text-ink/55 hover:text-indigo transition-colors">← All writing</Link>

        <header className="mt-8 mb-12">
          <Poster seed={post.slug} ratio={21 / 6} className="rounded-[2px] mb-9" />
          <Develop inView={false}>
            <h1 className="display text-[clamp(2.1rem,5vw,3.9rem)]">{post.title}</h1>
          </Develop>
          {post.description && <p className="lede text-ink/70 mt-5 max-w-[60ch]">{post.description}</p>}
          <div className="meta text-ink/55 flex flex-wrap gap-x-5 gap-y-2 mt-6">
            <span>{formatDate(post.date, "long")}</span>
            {post.readingTime ? <span>{post.readingTime} min read</span> : null}
            {post.tags?.length ? <span>{post.tags.join(" · ")}</span> : null}
          </div>
        </header>

        <div className="prose">
          <MDXRemote source={post.content} components={MDXComponents} options={{ blockJS: false }} />
        </div>

        <footer className="mt-16 pt-6 border-t hairline flex items-center justify-between">
          <Link href="/posts" className="btn-outline">← All writing</Link>
          <span className="meta text-ink/45">{formatDate(post.date, "long")}</span>
        </footer>
      </article>
    </main>
  );
}
