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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
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

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-primary mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to posts
          </Link>

          <AnimatedPost>
            <article>
              {/* Header */}
              <header className="mb-10">
                <div className="flex items-center gap-4 mb-4 text-sm font-mono text-text-tertiary">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                  <span className="text-border">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime}</span>
                  </div>
                </div>

                <h1 className="text-display-md font-display font-bold text-text mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <MDXRemote source={post.content} components={MDXComponents} />
              </div>
            </article>
          </AnimatedPost>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <Link
                href="/posts"
                className="text-sm font-mono text-text-tertiary hover:text-primary transition-colors"
              >
                ← All posts
              </Link>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nirlep.dev/posts/${slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-text-tertiary hover:text-primary transition-colors"
              >
                Share on Twitter →
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
