"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { name: "~", path: "/", label: "Home" },
  { name: "posts", path: "/posts", label: "Posts" },
  { name: "projects", path: "/projects", label: "Projects" },
  { name: "adventures", path: "/adventures", label: "Adventures" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-screen-lg px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo / Name */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm"
          >
            <span className="text-primary">$</span>
            <span className="text-text-secondary group-hover:text-text transition-colors">
              nirlep
            </span>
            <span className="text-text-tertiary">.dev</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-bg-card/80 backdrop-blur-xl px-2 py-1.5">
            {navItems.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-full bg-bg-hover border border-border-hover"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-mono text-xs transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-text-secondary hover:text-text"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-tertiary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span>available</span>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
