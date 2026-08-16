import { Develop } from "@/components/emulsion/Develop";
import { ProjectCard } from "@/components/Cards";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="surface-paper min-h-screen">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-36 pb-24">
        <Develop className="eyebrow text-ink/70 mb-4" inView={false}>Work</Develop>
        <Develop delay={80} inView={false}>
          <h1 className="display text-[clamp(2.4rem,5.5vw,4.5rem)]">Things I&apos;ve shipped.</h1>
        </Develop>
        <Develop delay={160} inView={false}>
          <p className="lede text-ink/65 mt-4 max-w-[52ch]">
            Products, tools and open source — built with whatever the problem needed, and finished properly.
          </p>
        </Develop>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {projects.map((p, i) => (
            <Develop key={p.title} delay={(i % 3) * 50}>
              <ProjectCard project={p} />
            </Develop>
          ))}
        </div>

        <a
          href="https://github.com/nirlep5252"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-12"
        >
          More on GitHub ↗
        </a>
      </div>
    </main>
  );
}
