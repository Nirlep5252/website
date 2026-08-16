"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CatMark } from "@/components/emulsion/CatMark";
import { SITE } from "@/lib/site";

const NAV = [
  { name: "Work", path: "/projects" },
  { name: "Writing", path: "/posts" },
  { name: "Adventures", path: "/adventures" },
  { name: "Freelance", path: "/freelance" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <header className="fixed top-3 sm:top-[18px] left-1/2 -translate-x-1/2 z-50 w-[min(1120px,calc(100%-24px))] sm:w-[min(1120px,calc(100%-32px))]">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-3 sm:gap-6 bg-paper text-ink rounded-[2px] pl-3.5 pr-3.5 sm:pl-5 py-2.5 border border-ink/10 shadow-[0_1px_0_rgba(0,0,0,.35),0_12px_40px_-20px_rgba(0,0,0,.6)]"
      >
        <Link href="/" className="group flex items-center gap-2 font-medium tracking-tight2 text-[15px]" aria-label="nirlep.dev — home">
          <span className="group-hover:hidden"><CatMark variant="solid" cell={0.9} /></span>
          <span className="hidden group-hover:inline"><CatMark variant="wink" cell={0.9} /></span>
          <span className="hidden sm:inline">{SITE.domain}</span>
        </Link>

        <ul className="flex items-center gap-3.5 sm:gap-6 font-mono text-[11.5px] sm:text-[12.5px]">
          {NAV.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`transition-opacity hover:opacity-100 ${isActive(item.path) ? "opacity-100" : "opacity-70"}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <a href={`mailto:${SITE.email}`} className="hidden sm:inline-flex btn-ink !py-2.5 !px-3">
          Get in touch →
        </a>
      </nav>
    </header>
  );
}
