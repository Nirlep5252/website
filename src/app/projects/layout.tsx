import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Nirlep Gohil",
  description:
    "Products, tools and open source by Nirlep Gohil — Discord AI agent, image hosting, a Windows tiling window manager, CLIs and more.",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "open source",
    "react",
    "rust",
    "python",
  ],
  openGraph: {
    title: "Projects | Nirlep Gohil",
    description:
      "Products, tools and open source by Nirlep Gohil.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Nirlep Gohil",
    description:
      "Products, tools and open source by Nirlep Gohil.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
