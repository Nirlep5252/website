import Link from "next/link";
import { Poster } from "@/components/emulsion/Poster";
import { formatDate } from "@/lib/site";
import type { Project } from "@/lib/projects";
import { squircleClip } from "@/lib/squircle";

const LOGO = 72;
const RING = 2;
const CLIP_LOGO = squircleClip(LOGO, LOGO);
const CLIP_RING = squircleClip(LOGO + RING * 2, LOGO + RING * 2);

/** One squircle tile: a logo image, or an ink monogram. */
function Tile({ src, letter }: { src?: string; letter?: string }) {
  return (
    <span
      className="block bg-paper/25"
      style={{ width: LOGO + RING * 2, height: LOGO + RING * 2, clipPath: CLIP_RING, padding: RING }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" width={LOGO} height={LOGO} className="block h-full w-full object-cover" style={{ clipPath: CLIP_LOGO }} />
      ) : (
        <span
          className="grid h-full w-full place-items-center bg-ink text-paper font-medium tracking-tight2 text-[30px] leading-none"
          style={{ clipPath: CLIP_LOGO }}
        >
          {letter}
        </span>
      )}
    </span>
  );
}

/** Project mark centred on the poster: one or more squircled logos (joined with "+"), or a monogram. */
function ProjectMark({ project }: { project: Project }) {
  const logos = project.logo ? (Array.isArray(project.logo) ? project.logo : [project.logo]) : [];
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 transition-transform duration-300 group-hover:scale-[1.04]"
    >
      {logos.length === 0 ? (
        <Tile letter={project.title.trim().charAt(0).toUpperCase()} />
      ) : (
        logos.map((src, i) => (
          <span key={src} className="flex items-center gap-3">
            {i > 0 && (
              <span
                className="text-paper font-medium text-[28px] leading-none"
                style={{ filter: "drop-shadow(0 0 3px rgba(11,10,14,0.7))" }}
              >
                +
              </span>
            )}
            <Tile src={src} />
          </span>
        ))
      )}
    </span>
  );
}

export type PostLite = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime?: number;
  tags?: string[];
};

export function PostCard({ post, index = 0 }: { post: PostLite; index?: number }) {
  return (
    <Link href={`/posts/${post.slug}`} className="card group" style={{ animationDelay: `${index * 60}ms` }}>
      <Poster seed={post.slug} className="border-b hairline" />
      <div className="p-4 pb-5">
        <div className="meta text-ink/55 flex justify-between mb-2.5">
          <span>{formatDate(post.date)}</span>
          {post.readingTime ? <span>{post.readingTime} min</span> : null}
        </div>
        <h3 className="text-[1.2rem] leading-[1.15] tracking-tight2 font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">
          {post.title}
        </h3>
        <p className="font-mono text-[12.5px] leading-[1.55] text-ink/70 line-clamp-3">{post.description}</p>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const href = project.preview || project.github || "#";
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="card group"
    >
      <div className="relative border-b hairline">
        <Poster seed={project.title} />
        <ProjectMark project={project} />
      </div>
      <div className="p-4 pb-5">
        <div className="meta text-ink/55 flex justify-between gap-3 mb-2.5">
          <span className="truncate">{project.tags.slice(0, 3).join(" · ")}</span>
          <span className="shrink-0">{project.preview ? "live ↗" : "github ↗"}</span>
        </div>
        <h3 className="text-[1.2rem] leading-[1.15] tracking-tight2 font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">
          {project.title}
        </h3>
        <p className="font-mono text-[12.5px] leading-[1.55] text-ink/70 line-clamp-3">{project.description}</p>
      </div>
    </a>
  );
}

/** Compact row for secondary lists (other projects, etc.) */
export function ProjectRow({ project }: { project: Project }) {
  const href = project.preview || project.github || "#";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[minmax(0,14rem)_1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 border-b hairline"
    >
      <span className="font-medium tracking-tight2 text-[1.05rem] group-hover:underline underline-offset-4 decoration-1">{project.title}</span>
      <span className="col-span-2 sm:col-span-1 font-mono text-[12.5px] text-ink/70">{project.description}</span>
      <span className="meta text-ink/50 justify-self-end">{project.tags.join(" · ")}</span>
    </a>
  );
}
