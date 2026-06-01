export type Project = {
  title: string;
  description: string;
  tags: string[];
  preview?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "BondBot",
    description:
      "Discord AI agent for server management via natural language commands.",
    tags: ["Next.js", "Discord API", "AI"],
    preview: "https://bondbot.gg",
    featured: true,
  },
  {
    title: "Formality",
    description: "Modern image hosting platform for uploading and sharing.",
    tags: ["Next.js", "Tailwind CSS", "React Query"],
    preview: "https://formality.life",
    featured: true,
  },
  {
    title: "MashCode",
    description:
      "Competitive programming platform focused on LIVE 1v1 battles. Real-time code execution and ranking system.",
    tags: ["React", "Python", "FastAPI", "WebSockets"],
    github: "https://github.com/nirlep5252/mashcode",
    featured: true,
  },
  {
    title: "Brilliant++",
    description:
      "AI-powered education platform with personalized learning paths and interactive exercises.",
    tags: ["Next.js", "TypeScript", "tRPC", "Gemini"],
    github: "https://github.com/nirlep5252/brilliant-plus-plus",
    featured: true,
  },
  {
    title: "Codeforces CLI",
    description:
      "Command-line tool to enhance competitive programming workflow. Parse problems, submit solutions, track standings.",
    tags: ["Python", "CLI"],
    github: "https://github.com/nirlep5252/codeforces-cli",
    featured: true,
  },
  {
    title: "EpicBot",
    description:
      "Feature-rich Discord bot with moderation and chatbot capabilities.",
    tags: ["Python", "discord.py"],
    github: "https://github.com/nirlep5252/epicbot",
  },
  {
    title: "Fun",
    description: "An interpreted programming language inspired by Lox.",
    tags: ["Java", "Interpreter"],
    github: "https://github.com/nirlep5252/fun",
  },
  {
    title: "Doggytype",
    description: "Terminal-based typing test inspired by Monkeytype.",
    tags: ["Rust", "TUI"],
    github: "https://github.com/nirlep5252/doggytype",
  },
  {
    title: "EpicShot",
    description: "Lightweight screenshot tool for Linux.",
    tags: ["Rust", "X11"],
    github: "https://github.com/nirlep5252/epicshot",
  },
  {
    title: "Scheduling Algos",
    description: "Interactive CPU scheduling algorithm visualizer.",
    tags: ["React"],
    github: "https://github.com/nirlep5252/scheduling-algos",
    preview: "https://scheduling.nirlep.dev",
  },
];
