"use server"
import SEO from "@/components/seo";

interface ProjectProps {
  title: string;
  description: string;
  github?: string;
  website?: string;
  tags: string[];
}

function Project(props: ProjectProps) {
  return (
    <div className="project relative bg-white bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 hover:border-gray-200 transition-all duration-200 border border-transparent rounded-2xl p-4 h-44">
      <div className="project-title text-3xl font-bold">{props.title}</div>
      <div className={`project-description font-thin mt-1 ${props.github || props.website ? "w-9/12" : ""} leading-none`}>
        {props.description}
      </div>
      <div className="absolute bottom-4 left-4 project-tags flex flex-wrap">
        {props.tags.map((tag, idx) => (
          <div
            key={idx}
            className="project-tag rounded-full px-3 py-1 text-sm mr-2 border border-transparent flex items-center justify-center bg-gray-400 hover:bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="project-links absolute flex gap-2 right-4 top-4">
        {props.github ? (
          <a
            className="border border-transparent rounded-full flex items-center justify-center hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-2 py-2 back-btn"
            href={props.github}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0,0,255.98959,255.98959"
              style={{ fill: "#000000" }}
            >
              <g
                fill="#ffffff"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <g transform="scale(8.53333,8.53333)">
                  <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,5.623 3.872,10.328 9.092,11.63c-0.056,-0.162 -0.092,-0.35 -0.092,-0.583v-2.051c-0.487,0 -1.303,0 -1.508,0c-0.821,0 -1.551,-0.353 -1.905,-1.009c-0.393,-0.729 -0.461,-1.844 -1.435,-2.526c-0.289,-0.227 -0.069,-0.486 0.264,-0.451c0.615,0.174 1.125,0.596 1.605,1.222c0.478,0.627 0.703,0.769 1.596,0.769c0.433,0 1.081,-0.025 1.691,-0.121c0.328,-0.833 0.895,-1.6 1.588,-1.962c-3.996,-0.411 -5.903,-2.399 -5.903,-5.098c0,-1.162 0.495,-2.286 1.336,-3.233c-0.276,-0.94 -0.623,-2.857 0.106,-3.587c1.798,0 2.885,1.166 3.146,1.481c0.896,-0.307 1.88,-0.481 2.914,-0.481c1.036,0 2.024,0.174 2.922,0.483c0.258,-0.313 1.346,-1.483 3.148,-1.483c0.732,0.731 0.381,2.656 0.102,3.594c0.836,0.945 1.328,2.066 1.328,3.226c0,2.697 -1.904,4.684 -5.894,5.097c1.098,0.573 1.899,2.183 1.899,3.396v2.734c0,0.104 -0.023,0.179 -0.035,0.268c4.676,-1.639 8.035,-6.079 8.035,-11.315c0,-6.627 -5.373,-12 -12,-12z"></path>
                </g>
              </g>
            </svg>
          </a>
        ) : (
          <></>
        )}
        {props.website ? (
          <a
            className="border border-transparent rounded-full flex items-center justify-center hover:bg-gray-400 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-10 hover:border-gray-100 transition-all duration-200 ease-linear px-2.5 py-2 post-back-btn"
            href={props.website}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              width={25}
              height={25}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="w-screen flex justify-center">
      <SEO title="Projects" />
      <div className="projects-container flex gap-4 flex-col mt-40 absolute w-2/3 m-auto">
        <div className="projects-top">
          <div className="text-5xl font-bold">My Projects</div>
          <div className="text-lg font-light">
            Inhumane creations that unfortunately exist.
          </div>
        </div>

        <div className="projects flex flex-wrap gap-2">
          <Project
            title="EpicBot"
            description="A simple, multipurpose Discord bot."
            tags={["Python", "discord.py", "MongoDB"]}
            github="https://github.com/nirlep5252/epicbot"
          />
          <Project
            title="Codeforces CLI"
            description="A simple CLI tool to enhance your competitive programming workflow."
            tags={["Python", "CLI", "Codeforces", "Web Scraping"]}
            github="https://github.com/nirlep5252/codeforces-cli"
            website="https://pypi.org/project/codeforces/"
          />
          <Project
            title="EpicBot Images"
            description="A Python module that creates memes and several cool effects from images."
            tags={["Python", "Image Manipulation", "Pillow", "Wand"]}
            website="https://pypi.org/project/epicbot-images/"
            github="https://github.com/Nirlep5252/epicbot-images"
          />
          <Project
            title="This website"
            description="My personal website, built with NextJS and TailwindCSS."
            tags={["NextJS", "TailwindCSS"]}
            website="/"
            github="https://github.com/nirlep5252/website"
          />
          <Project
            title="Universal Chat"
            description="A hackathon project that allows you to chat accross platforms using a middleware API converter."
            tags={["ExpressJS", "GraphQL", "SOAP", "REST", "MongoDB"]}
            website="https://devfolio.co/projects/universalchat-a51c"
          />
        </div>
      </div>
    </div>
  );
}
