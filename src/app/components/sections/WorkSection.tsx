import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";
import { ProjectCard } from "@/components/Cards";
import { featuredProjects } from "@/lib/projects";

export function WorkSection() {
  const picks = featuredProjects.slice(0, 3);
  return (
    <section className="surface-paper border-t hairline" id="work">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <Develop className="eyebrow text-ink/70 mb-4">Selected work</Develop>
            <Develop delay={80}>
              <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)]">Things I&apos;ve shipped.</h2>
            </Develop>
          </div>
          <Link href="/projects" className="btn-outline hidden sm:inline-flex">All work →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p, i) => (
            <Develop key={p.title} delay={i * 70} className="min-w-0">
              <ProjectCard project={p} />
            </Develop>
          ))}
        </div>
        <Link href="/projects" className="btn-outline sm:hidden mt-6">All work →</Link>
      </div>
    </section>
  );
}
