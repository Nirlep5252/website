import Link from "next/link";
import { Develop } from "@/components/emulsion/Develop";

/** Frame-data readout, in place of a technology tag cloud. */
const LEDGER: [string, React.ReactNode][] = [
  ["Based", "India"],
  ["Since", "2020"],
  [
    "Now",
    <>
      Bond ·{" "}
      <a href="https://bondbot.gg" target="_blank" rel="noopener noreferrer" className="link">
        bondbot.gg
      </a>
    </>,
  ],
  ["Editor", "Neovim (epicvim)"],
  ["Agents", "Claude Code · Codex"],
  ["OS", "NixOS · Windows 11"],
  ["Cat", "yes"],
];

const INDEX = [
  { n: "01", title: "Work", body: "Products, tools and open source.", href: "/projects", cta: "See projects" },
  { n: "02", title: "Writing", body: "Notes on tools, systems and the occasional hackathon.", href: "/posts", cta: "Read" },
  { n: "03", title: "Adventures", body: "Competitive programming and CSES solutions, from the early years.", href: "/adventures", cta: "Explore" },
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
                Curious by default, careful by habit.
              </h2>
            </Develop>
            <Develop delay={160}>
              <p className="lede text-ink/70 max-w-[58ch] mt-6">
                Tools I want to use, products people keep using. Lately that means an AI agent for Discord, small
                native Windows apps, a self-hosted image host, and the occasional CLI or programming language for
                the fun of it.
              </p>
              <p className="lede text-ink/70 max-w-[58ch] mt-4">
                I like a small surface area, a finished feel, and code that&apos;s still readable a year later.
                Open source when it&apos;s useful to someone else; a product when it needs to be.
              </p>
            </Develop>

            <Develop delay={240} as="dl" className="mt-10 max-w-[30rem] border-t hairline font-mono text-[12.5px]">
              {LEDGER.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-2.5 border-b hairline">
                  <dt className="meta text-ink/45">{k}</dt>
                  <dd className="text-ink/85">{v}</dd>
                </div>
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
