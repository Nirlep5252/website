import type { SVGProps } from "react";

/**
 * The signature paw mark — same geometry as the favicon and navbar logo.
 * Fill is driven by the parent's `fill-*` class (defaults to currentColor-free
 * black if unset), so callers pass e.g. `className="fill-ginger"`.
 */
export function PawMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <ellipse cx="9" cy="13" rx="2.2" ry="2.9" transform="rotate(-18 9 13)" />
      <ellipse cx="13.6" cy="9.8" rx="2.3" ry="3" transform="rotate(-7 13.6 9.8)" />
      <ellipse cx="18.4" cy="9.8" rx="2.3" ry="3" transform="rotate(7 18.4 9.8)" />
      <ellipse cx="23" cy="13" rx="2.2" ry="2.9" transform="rotate(18 23 13)" />
      <path d="M16 26.8 C11 26.8 7.6 23.4 8.5 19.9 C9 18 12 17.4 16 17.4 C20 17.4 23 18 23.5 19.9 C24.4 23.4 21 26.8 16 26.8 Z" />
    </svg>
  );
}

/** A soft hairline-with-a-paw divider that carries the mascot motif between sections. */
export function PawDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-line-strong sm:w-20" />
      <PawMark className="h-5 w-5 shrink-0 -rotate-12 fill-ginger/70" />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-line-strong sm:w-20" />
    </div>
  );
}
