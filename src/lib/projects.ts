export type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  preview?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Bond",
    description:
      "AI agent for Discord. Mention @Bond and describe what you want — 166 tools across channels, roles, moderation and automation do the rest.",
    tags: ["TypeScript", "AI agents", "Discord"],
    preview: "https://bondbot.gg",
    featured: true,
  },
  {
    title: "Formality",
    description:
      "Self-hosted image hosting built for ShareX. Fast uploads, private token links, custom domains — Hono on Cloudflare Workers with R2 and Neon.",
    tags: ["Cloudflare Workers", "Hono", "R2"],
    preview: "https://formality.life",
    github: "https://github.com/nirlep5252/host",
    featured: true,
  },
  {
    title: "Winri",
    description:
      "A Niri-inspired scrollable tiling window manager for Windows 11. Columns, workspaces, animations and hotkeys on top of DWM via Win32.",
    tags: ["Rust", "Win32", "Window manager"],
    github: "https://github.com/nirlep5252/winri",
    featured: true,
  },
  {
    title: "CodexBar for Windows",
    description:
      "Tray app that shows usage limits for Codex, Claude Code, Grok, Cursor and OpenCode at a glance — with reset timers and local history charts.",
    tags: ["C#", ".NET", "Windows"],
    github: "https://github.com/nirlep5252/CodexBarWindows",
    featured: true,
  },
  {
    title: "MashCode",
    description:
      "Competitive programming platform built around live, rating-based 1v1 matches. 30 languages, backed by MashJudge for sandboxed execution.",
    tags: ["TypeScript", "Go", "WebSockets"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description:
      "Move your competitive programming workflow to the terminal — parse problems, test, submit and watch standings. On PyPI as `codeforces`.",
    tags: ["Python", "CLI", "PyPI"],
    github: "https://github.com/nirlep5252/codeforces-cli",
    featured: true,
  },
  {
    title: "Walk",
    description: "Keyboard-first quick launcher for Windows: apps, files, calculations, currency, system commands.",
    tags: ["C#", "WPF"],
    github: "https://github.com/nirlep5252/walk",
  },
  {
    title: "Agent Drop",
    description: "Private, phone-friendly file drops for AI agents — Cloudflare Access, R2 and D1 with a strict sandboxed preview model.",
    tags: ["Cloudflare", "Preact"],
    github: "https://github.com/nirlep5252/agent-drop",
  },
  {
    title: "MashJudge",
    description: "Secure code execution engine, a Judge0 alternative. Docker isolation, resource limits, batch and webhook modes.",
    tags: ["Go", "Docker"],
    github: "https://github.com/nirlep5252/mashjudge",
  },
  {
    title: "EpicBot",
    description: "Multipurpose Discord bot — moderation, utilities, chat. My most-starred repo.",
    tags: ["Python", "discord.py"],
    github: "https://github.com/nirlep5252/epicbot",
  },
  {
    title: "Fun",
    description: "A small interpreted programming language, heavily inspired by Lox.",
    tags: ["Java", "Interpreter"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "Doggytype",
    description: "Monkeytype, but in your terminal.",
    tags: ["Rust", "TUI"],
    github: "https://github.com/nirlep5252/doggytype",
  },
  {
    title: "EpicShot",
    description: "Lightweight screenshot tool for Linux, on crates.io.",
    tags: ["Rust", "X11"],
    github: "https://github.com/nirlep5252/epicshot",
  },
  {
    title: "Scheduling Algorithms",
    description: "Interactive simulation of OS CPU scheduling algorithms.",
    tags: ["React"],
    github: "https://github.com/nirlep5252/scheduling-algorithms",
    preview: "https://scheduling.nirlep.dev",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
