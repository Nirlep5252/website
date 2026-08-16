export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  preview?: string;
  featured?: boolean;
  /** /public path(s) to square (256px) logos; several = shown side by side joined with "+"; none = monogram */
  logo?: string | string[];
};

export const projects: Project[] = [
  {
    title: "Bond",
    description:
      "AI agent for Discord. Mention @Bond and describe what you want — 166 tools across channels, roles, moderation and automation do the rest.",
    tags: ["TypeScript", "AI agents", "Discord"],
    preview: "https://bondbot.gg",
    logo: "/logos/bond.png",
    featured: true,
  },
  {
    title: "Formality",
    description:
      "Self-hosted image hosting built for ShareX. Fast uploads, private token links, custom domains — Hono on Cloudflare Workers with R2 and Neon.",
    tags: ["Cloudflare Workers", "Hono", "R2"],
    preview: "https://formality.life",
    github: "https://github.com/nirlep5252/host",
    logo: "/logos/formality.svg",
    featured: true,
  },
  {
    title: "CodexBar for Windows",
    description:
      "Tray app that shows usage limits for Codex, Claude Code, Grok, Cursor and OpenCode at a glance — with reset timers and local history charts.",
    tags: ["C#", ".NET", "Windows"],
    github: "https://github.com/nirlep5252/CodexBarWindows",
    logo: "/logos/codexbar.png",
    featured: true,
  },
  {
    title: "SunRen Automotive",
    description:
      "Marketing site for an IATF-certified brake components manufacturer — interactive 3D product inspection, smooth scroll, built to convert quotes.",
    tags: ["Next.js", "React Three Fiber", "GSAP"],
    preview: "https://sunren.vercel.app",
    logo: "/logos/sunren.png",
    featured: true,
  },
  {
    title: "MashCode + MashJudge",
    description:
      "Live, rating-based 1v1 competitive programming in 30 languages, on top of MashJudge — a Docker-sandboxed code execution engine built as a Judge0 alternative.",
    tags: ["TypeScript", "Go", "Docker"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description:
      "Move your competitive programming workflow to the terminal — parse problems, test, submit and watch standings. On PyPI as `codeforces`.",
    tags: ["Python", "CLI", "PyPI"],
    github: "https://github.com/nirlep5252/codeforces-cli",
    logo: ["/logos/codeforces.svg", "/logos/terminal.svg"],
    featured: true,
  },
  {
    title: "Walk",
    description: "Keyboard-first quick launcher for Windows: apps, files, calculations, currency, system commands.",
    tags: ["C#", "WPF"],
    github: "https://github.com/nirlep5252/walk",
    logo: "/logos/walk.png",
  },
  {
    title: "EpicBot",
    description: "Multipurpose Discord bot — moderation, utilities, chat. My most-starred repo.",
    tags: ["Python", "discord.py"],
    github: "https://github.com/nirlep5252/epicbot",
    logo: "/logos/epicbot.png",
  },
  {
    title: "EpicVim",
    description: "Neovim distribution as a Nix flake — `nix run github:nirlep5252/epicvim` and you're in.",
    tags: ["Nix", "Neovim"],
    github: "https://github.com/nirlep5252/epicvim",
    logo: "/logos/epicvim.png",
  },
  {
    title: "Fun",
    description: "A small interpreted programming language, heavily inspired by Lox.",
    tags: ["Java", "Interpreter"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "EpicShot",
    description: "Lightweight screenshot tool for Linux, on crates.io.",
    tags: ["Rust", "X11"],
    github: "https://github.com/nirlep5252/epicshot",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
