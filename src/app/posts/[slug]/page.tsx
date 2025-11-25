import { getPostBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AnimatedPost } from "@/components/AnimatedPost";
import MDXComponents from "@/app/components/MDXComponents";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

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
    title: `${post.title} | Nirlep Gohil`,
    description:
      post.description ||
      `Read about ${post.title} and explore insights on software development, programming, and technology.`,
    keywords: [...(post.tags || []), "blog", "programming", "tech", "tutorial"],
    authors: [{ name: "Nirlep Gohil" }],
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to posts
        </Link>

        <AnimatedPost>
          <article>
            {/* Header */}
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                {post.title}
              </h1>

              {post.description && (
                <p className="text-xl text-zinc-400 mb-6">{post.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                {post.readingTime && (
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="w-4 h-4" />
                    {post.readingTime} min read
                  </span>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-zinc-100 prose-headings:font-semibold prose-p:text-zinc-300 prose-a:text-emerald-500 hover:prose-a:text-emerald-400 prose-strong:text-zinc-200 prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-emerald-500 prose-blockquote:text-zinc-400 prose-hr:border-border">
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>
          </article>
        </AnimatedPost>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>
        </div>
      </div>
    </main>
  );
}
