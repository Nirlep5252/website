import Link from "next/link";
import { Poster } from "@/components/emulsion/Poster";
import { formatDate } from "@/lib/site";
import type { Project } from "@/lib/projects";

/**
 * Superellipse ("squircle") outline as an SVG path, in px. n≈5 is close to the iOS icon curve.
 * Pure + deterministic, so it's computed once at module load.
 */
function squirclePath(size: number, n = 5, steps = 64): string {
  const r = size / 2;
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const x = r + Math.sign(c) * Math.pow(Math.abs(c), 2 / n) * r;
    const y = r + Math.sign(s) * Math.pow(Math.abs(s), 2 / n) * r;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ") + " Z";
}
const LOGO = 56;
const RING = 2;
const CLIP_LOGO = `path('${squirclePath(LOGO)}')`;
const CLIP_RING = `path('${squirclePath(LOGO + RING * 2)}')`;

/** Project mark centred on the poster: squircled logo, or an ink monogram when there is none. */
function ProjectMark({ project }: { project: Project }) {
  return (
    <span
      aria-hidden
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block bg-paper/25 transition-transform duration-300 group-hover:scale-[1.04]"
      style={{ width: LOGO + RING * 2, height: LOGO + RING * 2, clipPath: CLIP_RING, padding: RING }}
    >
      {project.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.logo}
          alt=""
          width={LOGO}
          height={LOGO}
          className="block h-full w-full object-cover"
          style={{ clipPath: CLIP_LOGO }}
        />
      ) : (
        <span
          className="grid h-full w-full place-items-center bg-ink text-paper font-medium tracking-tight2 text-[24px] leading-none"
          style={{ clipPath: CLIP_LOGO }}
        >
          {project.title.trim().charAt(0).toUpperCase()}
        </span>
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
