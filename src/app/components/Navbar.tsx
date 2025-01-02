"use client";

import { usePathname } from "next/navigation";
import { Container } from "./ui/Container";
import { NavLink } from "./ui/NavLink";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "Projects", path: "/projects" },
  { name: "Adventures", path: "/adventures" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <Container>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          href={item.path}
          isActive={
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path)
          }
        >
          {item.name}
        </NavLink>
      ))}
    </Container>
  );
}
