import { Develop } from "@/components/emulsion/Develop";
import { Poster } from "@/components/emulsion/Poster";

const services = [
  {
    title: "Full-Stack Web Apps",
    description:
      "Interactive applications with authentication, databases and APIs — SaaS products, dashboards, user management. From idea to production, the whole stack, so you get a complete product and not just a frontend.",
    tag: "Most requested",
    wide: true,
  },
  {
    title: "Landing Pages",
    description: "Single-page marketing sites, product launches and event pages. Fast turnaround.",
    tag: "From 1 week",
  },
  {
    title: "Static Websites",
    description: "Multi-page sites, portfolios and documentation. SEO-optimised and fast.",
    tag: "Performance",
  },
  {
    title: "Custom Tools",
    description: "Discord bots, CLI tools, automation scripts and internal tools.",
    tag: "Anything goes",
  },
  {
    title: "Consulting",
    description: "Architecture reviews, tech-stack advice and code audits. Expert eyes on your project.",
    tag: "Hourly",
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const n = String(i + 1).padStart(2, "0");
  return (
    <div className={`card h-full flex flex-col ${s.wide ? "sm:col-span-2" : ""}`}>
      <div className="relative border-b hairline">
        {s.wide ? (
          <>
            {/* wide card spans two columns from sm up; keep the banner height in step with the others */}
            <Poster seed={`service:${s.title}`} ratio={21 / 9} className="sm:hidden" />
            <Poster seed={`service:${s.title}`} ratio={42 / 9} className="hidden sm:block" />
          </>
        ) : (
          <Poster seed={`service:${s.title}`} ratio={21 / 9} />
        )}
        <span className="absolute left-2.5 bottom-2.5 meta bg-ink text-paper px-1.5 py-1 leading-none">{n}</span>
        <span className="absolute right-2.5 bottom-2.5 meta bg-ink text-paper/80 px-1.5 py-1 leading-none">{s.tag}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-[1.15rem] tracking-tight2 font-medium mb-2">{s.title}</h3>
        <p className="font-mono text-[12.5px] leading-[1.55] text-ink/70">{s.description}</p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section className="surface-paper border-t hairline" id="services">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="mb-10">
          <Develop className="eyebrow text-ink/70 mb-4">Services</Develop>
          <Develop delay={80}>
            <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[20ch]">What I do.</h2>
          </Develop>
          <Develop delay={160}>
            <p className="lede text-ink/70 max-w-[52ch] mt-4">From concept to deployment — here is where I can help.</p>
          </Develop>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Develop key={s.title} delay={i * 60} className={s.wide ? "sm:col-span-2" : ""}>
              <ServiceCard s={s} i={i} />
            </Develop>
          ))}
        </div>
      </div>
    </section>
  );
}
