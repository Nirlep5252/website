import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnimatedPost } from "@/components/AnimatedPost";
import MDXComponents from "@/app/components/MDXComponents";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Nirlep's Blog`,
    description:
      post.description ||
      `Read about ${post.title} and explore insights on software development, programming, and technology.`,
    keywords: [...(post.tags || []), "blog", "programming", "tech", "tutorial"],
    authors: [{ name: "Nirlep" }],
    openGraph: {
      title: post.title,
      description:
        post.description ||
        `Read about ${post.title} and explore insights on software development.`,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.description ||
        `Read about ${post.title} and explore insights on software development.`,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/posts"
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
          Back to Posts
        </Link>
        <AnimatedPost>
          <article className="prose prose-invert prose-lg prose-headings:font-semibold prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-pre:bg-transparent prose-pre:p-0">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 mb-8 not-prose">
              <time className="text-gray-400">{post.date}</time>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="prose prose-invert prose-lg">
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>
          </article>
        </AnimatedPost>
      </div>
    </main>
  );
}
