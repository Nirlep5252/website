"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Work", path: "/projects" },
  { name: "Writing", path: "/posts" },
  { name: "Adventures", path: "/adventures" },
] as const;

function PawMark() {
  const ginger = "oklch(0.72 0.16 58)";
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true" fill={ginger}>
      {/* toe beans */}
      <ellipse cx="9" cy="13" rx="2.2" ry="2.9" transform="rotate(-18 9 13)" />
      <ellipse cx="13.6" cy="9.8" rx="2.3" ry="3" transform="rotate(-7 13.6 9.8)" />
      <ellipse cx="18.4" cy="9.8" rx="2.3" ry="3" transform="rotate(7 18.4 9.8)" />
      <ellipse cx="23" cy="13" rx="2.2" ry="2.9" transform="rotate(18 23 13)" />
      {/* main pad */}
      <path d="M16 26.8 C11 26.8 7.6 23.4 8.5 19.9 C9 18 12 17.4 16 17.4 C20 17.4 23 18 23.5 19.9 C24.4 23.4 21 26.8 16 26.8 Z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on Escape. (Navigation closes it via each link's onClick.)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const solid = scrolled || open;

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? "border-b border-line bg-paper/85 shadow-cafe-rest backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[padding] duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold text-ink-strong transition-colors hover:text-ginger-deep"
        >
          <PawMark />
          nirlep.dev
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[0.95rem] font-semibold transition-colors duration-200 ease-out-quart ${
                  active
                    ? "bg-ginger-soft text-ginger-deep"
                    : "text-ink-muted hover:bg-ginger-soft/70 hover:text-ink-strong"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-ink-strong transition-colors hover:bg-ginger-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ginger sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 -z-10 cursor-default bg-ink-strong/10 sm:hidden"
            />
            <motion.div
              id="mobile-menu"
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-line bg-paper sm:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-3">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2 rounded-card px-3 py-3 text-base font-semibold transition-colors ${
                        active
                          ? "bg-ginger-soft text-ginger-deep"
                          : "text-ink hover:bg-surface hover:text-ink-strong"
                      }`}
                    >
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-ginger" />}
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
