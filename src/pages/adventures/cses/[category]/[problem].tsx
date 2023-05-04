"use server"
import BackBtn from "@/components/back";
import { promises as fs } from "fs";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { titleify } from "..";
import { components } from "@/pages/posts/[post]";
import SEO from "@/components/seo";

import rehypeHighlight from "rehype-highlight/lib";
import langPython from "highlight.js/lib/languages/python"
import langRust from "highlight.js/lib/languages/rust"
import langCPP from "highlight.js/lib/languages/cpp"

import 'highlight.js/styles/atom-one-dark.css'

export const langauges = {
  python: langPython,
  rust: langRust,
  cpp: langCPP,
}

export default function CSESProblem(props: {
  problem: {
    name: string;
    source: MDXRemoteSerializeResult;
  };
}) {
  return (
    <>
      <SEO title={`CSES - ${titleify(props.problem.name)}`} />
      <div className="w-screen flex justify-center">
        <div className="cses-container flex gap-4 flex-col mt-40 absolute w-11/12 sm:w-3/5 m-auto">
          <div className="cses-top">
            <div className="text-5xl font-bold flex items-center gap-4">
              <BackBtn />{" "}
              <span className="mb-2">{titleify(props.problem.name)}</span>
            </div>
          </div>

          <div className="problem-blog mt-2">
            <div className="problem-blog-content mdx-styles">
              <MDXRemote {...props.problem.source} components={components} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async ({
  params: { problem, category },
}: {
  params: {
    problem: string;
    category: string;
  };
}) => {
  const rawMDX = await fs.readFile(
    `./src/adventures/cses/${category}/${problem}.mdx`
  );
  const MDXSource = await serialize(rawMDX, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [[rehypeHighlight, {
        ignoreMissing: true,
        langauges,
        aliases: {}
      }]]
    }
  });

  return {
    props: {
      problem: {
        source: MDXSource,
        name: problem,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const dirs = await fs.readdir("./src/adventures/cses");
  let paths = [];

  for (const dir of dirs) {
    const files = await fs.readdir(`./src/adventures/cses/${dir}`);
    for (const file of files) {
      paths.push({
        params: {
          problem: file.slice(0, -4),
          category: dir,
        },
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
};
