import { Poster } from "@/components/emulsion/Poster";
import { ProjectMark } from "@/components/Cards";
import { projects } from "@/lib/projects";

/**
 * An inline mention of a project inside prose: logo mark + name, coloured like a link. Hovering
 * reveals a compact project card (pure CSS, so it works inside server components).
 * Note: the card contains block elements, so the surrounding prose container must be a <div>.
 */
export function ProjectMention({ name, children }: { name: string; children?: React.ReactNode }) {
  const project = projects.find((p) => p.title === name);
  if (!project) return <>{children ?? name}</>;
  const href = project.preview || project.github || "/projects";
  const external = href.startsWith("http");
  const logo = Array.isArray(project.logo) ? project.logo[0] : project.logo;
  return (
    <span className="group/mention relative inline-block align-baseline">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group/link whitespace-nowrap text-indigo"
      >
        {/* plain inline content (no inline-flex): the text keeps the prose baseline and the
            icon hangs from it; the underline is on the text only */}
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" width={14} height={14} className="inline-block h-[14px] w-[14px] rounded-[3px] object-cover align-[-2px] mr-[5px]" />
        ) : (
          <span className="inline-grid h-[14px] w-[14px] place-items-center rounded-[3px] bg-ink text-paper text-[9px] leading-none align-[-2px] mr-[5px]">
            {project.title.charAt(0)}
          </span>
        )}
        <span className="underline underline-offset-[3px] decoration-1 decoration-indigo/45 group-hover/link:decoration-indigo transition-[text-decoration-color]">
          {children ?? project.title}
        </span>
      </a>
      {/* hidden (not just transparent) on phones: an invisible 272px card still widens the page
          and makes mobile browsers zoom out, and there is no hover on touch anyway */}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-[272px] opacity-0 translate-y-1 transition-[opacity,transform] duration-200 md:block group-hover/mention:opacity-100 group-hover/mention:translate-y-0 group-hover/mention:pointer-events-auto"
      >
        <span className="card group block overflow-hidden shadow-[0_24px_50px_-24px_rgba(11,10,14,0.5)]">
          <span className="relative block border-b hairline">
            <Poster seed={project.title} ratio={16 / 9} />
            <ProjectMark project={project} />
          </span>
          <span className="block p-3.5">
            <span className="block text-[15px] font-medium tracking-tight2 mb-1.5">{project.title}</span>
            <span className="block font-mono text-[11.5px] leading-[1.5] text-ink/70">{project.description}</span>
            <span className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </span>
          </span>
        </span>
      </span>
    </span>
  );
}

export default ProjectMention;
