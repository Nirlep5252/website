import UwULink from "@/components/link";
import Link from "next/link";
import { promises as fs } from "fs";
import SEO from "@/components/seo";
import { serialize } from "next-mdx-remote/serialize";

interface Problem {
  name: string;
  content: string;
  metadata: {
    time: number;
  };
}

export default function CSES(props: {
  problems: {
    [key: string]: Problem[];
  };
}) {
  const titleify = (str: string) => {
    let final = "";
    for (const s of str.split("-")) {
      final += s[0].toUpperCase() + s.slice(1) + " ";
    }

    return final;
  };

  return (
    <>
      <div className="w-screen flex justify-center">
        <SEO title="CSES" />
        <div className="cses-container flex gap-4 flex-col mt-40 absolute w-8/12 m-auto">
          <div className="cses-top">
            <div className="text-5xl font-bold">CSES</div>
            <div className="text-lg font-light mt-2">
              The{" "}
              <UwULink
                text={"CSES Problemset"}
                href={"https://cses.fi/problemset/list"}
                external={true}
              />{" "}
              is a collection of competitive programming problems that I'm
              trying to solve. <br />
              This page contains my approaches, solutions and explanations to
              the problems I've solved.
            </div>
          </div>

          <div className="cses">
            {Object.keys(props.problems).map((category) => (
              <div className="cses-category" key={category}>
                <div className="cses-category-title text-3xl font-bold">
                  {titleify(category)}
                </div>
                <div className="cses-category-problems my-4">
                  {props.problems[category].map((problem, idx) => (
                    <div key={idx} className="post w-full">
                      <Link
                        href={`/adventures/cses/${problem.name}`}
                        className="w-full flex items-center gap-2 border border-transparent rounded-full hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-4 py-1 relative"
                      >
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
                        <div className="post-title text-xl flex items-center justify-center mb-0.5">
                          {titleify(problem.name)}
                        </div>
                        <div className="absolute right-4">
                          {new Date(problem.metadata.time).toDateString()}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let problems: {
    [key: string]: Problem[];
  } = {};

  for (const category of await fs.readdir("./src/adventures/cses")) {
    let files = await fs.readdir(`./src/adventures/cses/${category}`);
    problems[category] = [];

    for (const file of files) {
      const rawMDX = await fs.readFile(
        `./src/adventures/cses/${category}/${file}`,
        "utf-8"
      );
      const MDXSource = await serialize(rawMDX, {
        parseFrontmatter: true,
      });
      problems[category].push({
        name: file.slice(0, -4),
        content: rawMDX,
        metadata: {
          // @ts-ignore
          time: MDXSource.frontmatter.time,
        },
      });
    }

    problems[category].sort((a, b) => a.metadata.time - b.metadata.time);
  }

  console.log(problems);
  return {
    props: {
      problems,
    },
  };
};
