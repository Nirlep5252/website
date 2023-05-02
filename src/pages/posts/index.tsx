import Link from "next/link";
import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import SEO from "@/components/seo";

interface Post {
  title: string;
  time: number;
  path: string;
  source: MDXRemoteSerializeResult;
}

interface Props {
  posts: Post[];
}

export default function Posts(props: Props) {
  return (
    <div className="w-screen flex justify-center">
      <SEO title="Posts" />
      <div className="posts-container flex gap-4 flex-col mt-40 absolute w-3/5 m-auto">
        <div className="posts-top">
          <div className="text-5xl font-bold">Recent Posts</div>
          <div className="text-lg font-light">I write random stuff here</div>
        </div>

        <div className="posts flex flex-col">
          {props.posts.map((post, idx) => {
            const postDate = new Date(post.time);
            return (
              <div key={idx} className="post w-full">
                <Link href={`/posts/${post.path}`} className="w-full flex items-center gap-2 border border-transparent rounded-full hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-4 py-1 relative">
                  <div className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                  <div className="post-title text-xl flex items-center justify-center mb-0.5">{post.title}</div>
                  <div className="absolute right-4">{postDate.toDateString()}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  let posts: Post[] = [];

  const files = await fs.readdir("./src/posts");

  for (const f in files) {
    const file = files[f];
    if (file.endsWith(".mdx")) {
      const rawMdx = await fs.readFile(`./src/posts/${file}`, "utf-8");
      const mdxSource = await serialize(rawMdx, { parseFrontmatter: true });
      posts.push({
        // @ts-ignore
        title: mdxSource.frontmatter.title,
        // @ts-ignore
        time: mdxSource.frontmatter.time,
        path: file.replace(".mdx", ""),
        source: mdxSource
      });
    }
  }

  posts.sort((a, b) => {
    return b.time - a.time;
  })

  return {
    props: {
      posts,
    },
  };
}
