import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import UwULink from "@/components/link";
import SEO from "@/components/seo";
import BackBtn from "@/components/back";

interface Meta {
  title: string;
  time: number;
}

interface Props {
  post: {
    meta: Meta;
    path: string;
    mdxSource: MDXRemoteSerializeResult;
  };
  notFound: boolean;
}

export default function Post(props: Props) {

  const components = {
    a: (props: any) => <UwULink {...props} text={props.children} external={true} />
  }

  return (
    <div className="mdx-container flex justify-center">
      <SEO title={props.post.meta.title} />
      <div className="mdx-styles w-3/5 m-auto absolute mt-32">
        <div className="title-section flex items-center gap-4 relative mb-12">
          <BackBtn />
          <div className="text-5xl mb-2 font-bold flex items-center justify-center">
            {props.post.meta.title}
          </div>
          <div className="time-posted absolute right-2 text-gray-200">
            {new Date(props.post.meta.time).toDateString()}
          </div>
        </div>
        <MDXRemote {...props.post.mdxSource} components={components} />
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const files = await fs.readdir("./src/posts");
  const paths = files.map((filename) => ({
    params: {
      post: filename.replace(".mdx", ""),
    },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { post },
}: {
  params: {
    post: string;
  };
}) => {
  const rawMdx = await fs.readFile(`./src/posts/${post}.mdx`);
  const mdxSource = await serialize(rawMdx, { parseFrontmatter: true });

  return {
    props: {
      post: {
        meta: mdxSource.frontmatter,
        mdxSource,
        path: post,
      },
    },
  };
};
