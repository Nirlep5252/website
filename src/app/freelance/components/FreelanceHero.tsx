import { EmulsionField } from "@/components/emulsion/EmulsionField";
import { Develop } from "@/components/emulsion/Develop";
import { HERO_PARAMS } from "@/lib/emulsion/renderer";
import { SITE } from "@/lib/site";

const recentWork = [
  { title: "bondbot.gg", note: "Discord AI agent", href: "https://bondbot.gg" },
  { title: "ashishgohil.com", note: "Academic portfolio", href: "https://ashishgohil.com" },
  { title: "formality.life", note: "Image hosting", href: "https://formality.life" },
];

export function FreelanceHero() {
  return (
    <section className="relative min-h-[100svh] surface-ink overflow-hidden" aria-label="Freelance intro">
      <EmulsionField
        params={{ ...HERO_PARAMS, seed: 0.37 }}
        developOnMount={1400}
        style={{ position: "absolute", inset: 0 }}
      />

      <div className="relative z-10 mx-auto max-w-[1120px] min-h-[100svh] px-5 sm:px-8 pt-32 pb-12 sm:pb-20 grid content-end gap-5">
        <Develop delay={700} duration={700} inView={false} className="eyebrow text-paper">
          Freelance · Available for projects
        </Develop>

        <Develop delay={900} duration={1100} inView={false}>
          <h1 className="display text-paper text-[clamp(2.75rem,8.4vw,8rem)] max-w-[11ch]">
            I design and build websites people enjoy using.
          </h1>
        </Develop>

        <Develop delay={1300} duration={800} inView={false}>
          <p className="lede text-paper/85 max-w-[min(52ch,100%)] mt-1">
            Full-stack developer for the modern web — from pixel-perfect landing pages to complex SaaS
            applications. Clear scope, honest quotes, shipped on time.
          </p>
        </Develop>

        <Develop delay={1500} duration={600} inView={false} className="flex flex-wrap items-center gap-4 mt-2">
          <a href={`mailto:${SITE.email}`} className="btn-solid">
            Start a project →
          </a>
          <a
            href="https://calendar.app.google/SUgGEw1nzd7vvA188"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Book a call ↗
          </a>
        </Develop>

        <Develop
          delay={1700}
          duration={700}
          inView={false}
          className="hidden lg:block absolute right-8 bottom-20 w-[17rem]"
        >
          <div className="meta text-paper/60 mb-3">Recent client work</div>
          <ul className="border-t hairline-ink">
            {recentWork.map((w) => (
              <li key={w.title} className="border-b hairline-ink">
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-2.5 font-mono text-[12.5px]"
                >
                  <span className="text-paper group-hover:text-signal transition-colors">{w.title}</span>
                  <span className="text-paper/60 shrink-0">{w.note} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Develop>
      </div>
    </section>
  );
}
