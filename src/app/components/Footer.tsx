import Link from "next/link";
import { Ornament } from "@/components/emulsion/Ornament";
import { SITE } from "@/lib/site";
import { Year } from "@/components/Year";

export default function Footer() {
  return (
    <footer className="surface-ink relative">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 pt-16 pb-10">
        <Ornament className="h-[200px] sm:h-[240px] border hairline-ink rounded-[2px] overflow-hidden" seed={0.61} rect={[0.74, 0.2, 0.96, 0.8]} />

        <div className="mt-10 grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-[2rem] sm:text-[2.6rem] max-w-[14ch]">Say hello.</p>
            <a href={`mailto:${SITE.email}`} className="btn-solid mt-6">
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="meta text-paper/50 mb-4">Elsewhere</p>
            <ul className="space-y-2 font-mono text-[12.5px]">
              {SITE.links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-paper/80 hover:text-signal transition-colors">
                    {l.name} <span className="text-paper/40">/ {l.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="meta text-paper/50 mb-4">Pages</p>
            <ul className="space-y-2 font-mono text-[12.5px]">
              {[
                ["Work", "/projects"],
                ["Writing", "/posts"],
                ["Adventures", "/adventures"],
                ["Freelance", "/freelance"],
              ].map(([n, p]) => (
                <li key={p}>
                  <Link href={p} className="text-paper/80 hover:text-signal transition-colors">
                    {n}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t hairline-ink meta text-paper/45">
          <span>© <Year /> {SITE.name} · {SITE.location}</span>
        </div>
      </div>
    </footer>
  );
}
