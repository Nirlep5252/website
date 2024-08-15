"use server";

import Main from "@/components/nirlep2";
import SEO from "@/components/seo";
import React from "react";

export default function Home() {
  "use client";
  const [scroll, setScroll] = React.useState<number>(0);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(
        window.document.documentElement.scrollTop /
          window.document.documentElement.scrollHeight
      );
    });
  }, []);

  ("use server");
  return (
    <>
      <SEO title="Nirlep" />
      <div className="w-screen flex flex-col">
        <Main scroll={scroll} />
      </div>
    </>
  );
}
