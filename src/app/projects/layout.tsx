import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Nirlep Gohil",
  description:
    "Explore my portfolio of projects including web applications, CLI tools, and open source contributions built with React, Rust, Python, and more.",
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
      "Explore my portfolio of projects including web applications, CLI tools, and open source contributions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Nirlep Gohil",
    description:
      "Explore my portfolio of projects including web applications, CLI tools, and open source contributions.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
