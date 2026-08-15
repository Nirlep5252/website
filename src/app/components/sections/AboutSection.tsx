import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";

const technologies = ["Rust", "TypeScript", "Python", "Go", "React", "Next.js", "Node.js", "PostgreSQL"];

const INDEX = [
  { n: "01", title: "Problem solving", body: "Competitive programming, CSES solutions, algorithmic write-ups.", href: "/adventures", cta: "Adventures" },
  { n: "02", title: "Writing", body: "Notes on tools, systems and the occasional hackathon.", href: "/posts", cta: "Read" },
  { n: "03", title: "Work", body: "Products, CLIs and open-source things I have built.", href: "/projects", cta: "See projects" },
];

export function AboutSection() {
  return (
    <section className="surface-paper" id="about">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <Develop className="eyebrow text-ink/70 mb-6">About</Develop>
            <Develop delay={80}>
              <h2 className="display text-[clamp(1.9rem,4.2vw,3.4rem)] max-w-[18ch]">
                I build modern web applications with a focus on performance, accessibility and user experience.
              </h2>
            </Develop>
            <Develop delay={160}>
              <p className="lede text-ink/70 max-w-[58ch] mt-6">
                With expertise spanning from low-level systems programming to modern frontend frameworks, I bring
                ideas to life through clean, maintainable code. I&apos;m passionate about solving complex problems and
                building tools that make a difference.
              </p>
            </Develop>
            <Develop delay={240} className="flex flex-wrap gap-2 mt-8">
              {technologies.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </Develop>
          </div>

          <Develop delay={200} as="ul" className="border-t hairline">
            {INDEX.map((it) => (
              <li key={it.n} className="border-b hairline">
                <Link href={it.href} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5">
                  <span className="meta text-ink/45">{it.n}</span>
                  <span>
                    <span className="block text-[1.15rem] tracking-tight2 font-medium group-hover:underline underline-offset-4 decoration-1">{it.title}</span>
                    <span className="block font-mono text-[12.5px] text-ink/65 mt-1">{it.body}</span>
                  </span>
                  <span className="meta text-ink/55 group-hover:text-indigo transition-colors">{it.cta} →</span>
                </Link>
              </li>
            ))}
          </Develop>
        </div>
      </div>
    </section>
  );
}
