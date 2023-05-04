"use server"
import SEO from "@/components/seo";
import { promises as fs } from "fs";
import Link from "next/link";

export default function Adventures(props: {
  sols: string[];
}) {
  return (
    <>
      <SEO title="Adventures" />

      <div className="w-screen flex justify-center">
        <div className="adventures-container flex gap-4 flex-col mt-40 absolute w-3/5 m-auto">
          <div className="adventures-top">
            <div className="text-5xl font-bold">My Adventures</div>
            <div className="text-lg font-light">
              Random stuff related to programming, technology and life in
              general.
            </div>
          </div>

          <div className="adventures">
            <Link href="/adventures/cses">
              <div className="cses-problemset glassmorphism p-4 hover:border-gray-200 rounded-2xl">
                <div className="adventure-title text-3xl font-bold flex justify-between">
                  <span>The CSES Problemset</span>
                  <span>{props.sols.length} / 300</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let sols: string[] = [];

  const dirs = await fs.readdir("./src/adventures/cses");
  for (const dir of dirs) {
    const files = await fs.readdir(`./src/adventures/cses/${dir}`);
    sols = sols.concat(files);
  }
  return {
    props: {
      sols
    }
  }
}
