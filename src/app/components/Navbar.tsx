"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Posts", path: "/posts" },
  { name: "Adventures", path: "/adventures" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-4 py-2.5 bg-bg-secondary/80 backdrop-blur-xl border border-border rounded-xl"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-100 font-mono font-medium"
          >
            <span className="text-emerald-500">~</span>
            <span>nirlep</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="relative px-3 py-1.5"
              >
                {isActive(item.path) && (
                  <motion.span
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-zinc-800 rounded-md"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span
                  className={`relative text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-zinc-100"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono">available</span>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
