import { EmulsionField } from "@/components/emulsion/EmulsionField";
import { Develop } from "@/components/emulsion/Develop";
import { HERO_PARAMS } from "@/lib/emulsion/renderer";
import { SITE } from "@/lib/site";

const recentWork = [
  { title: "new.sunren.in", note: "Manufacturer site", href: "https://new.sunren.in", img: "/work/sunren.jpg" },
  { title: "bondbot.gg", note: "Discord AI agent", href: "https://bondbot.gg", img: "/work/bondbot.jpg" },
  { title: "ashishgohil.com", note: "Academic portfolio", href: "https://ashishgohil.com", img: "/work/ashishgohil.jpg" },
];

// Fanned "prints" on desktop: each one is rotated a touch and overlaps the previous; hover straightens + lifts.
const FAN = ["rotate-[-4deg] translate-y-[8px]", "rotate-[1deg]", "rotate-[4.5deg] translate-y-[10px]"];

function Print({ w, className, style }: { w: (typeof recentWork)[number]; className?: string; style?: React.CSSProperties }) {
  return (
    <a
      href={w.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${w.title} — ${w.note}`}
      className={`block bg-paper p-1.5 pb-2 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-[transform,filter] duration-300 ease-out ${className ?? ""}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={w.img} alt={`${w.title} — ${w.note}`} width={800} height={500} className="block w-full aspect-[8/5] object-cover" />
      <span className="mt-1.5 flex items-baseline justify-between gap-2 font-mono text-[10px] leading-none text-ink">
        <span>{w.title}</span>
        <span className="text-ink/55 truncate">{w.note}</span>
      </span>
    </a>
  );
}

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

        {/* Recent work — prints from the darkroom. Fanned stack on desktop, scroll row below lg. */}
        <Develop delay={1700} duration={700} inView={false} className="lg:hidden mt-6 min-w-0">
          <div className="meta text-paper/60 mb-3">Recent work</div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 sm:-mx-8 sm:px-8 [scrollbar-width:none]">
            {recentWork.map((w) => (
              <Print key={w.title} w={w} className="w-[168px] shrink-0" />
            ))}
          </div>
        </Develop>

        <Develop delay={1700} duration={700} inView={false} className="hidden lg:block absolute right-8 bottom-16 w-[24rem]">
          <div className="meta text-paper/60 mb-4 text-right">Recent work</div>
          <div className="relative h-[168px]">
            {/* first item is the most prominent: rightmost and on top of the stack */}
            {[...recentWork].reverse().map((w, i) => (
              <Print
                key={w.title}
                w={w}
                className={`absolute bottom-0 w-[196px] origin-bottom hover:z-10 hover:!rotate-0 hover:!-translate-y-3 hover:scale-[1.04] ${FAN[i]}`}
                style={{ left: `${i * 86}px`, zIndex: i }}
              />
            ))}
          </div>
        </Develop>
      </div>
    </section>
  );
}
