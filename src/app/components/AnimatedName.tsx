"use client";

import React, { Suspense } from "react";

const AnimatedName = () => {
  const Sparkles = React.lazy(() =>
    import("./ui/Sparkles").then((mod) => ({ default: mod.Sparkles }))
  );

  return (
    <h1 className="text-7xl font-bold mb-6">
      <span className="text-white">Hi, I&apos;m </span>
      <Suspense
        fallback={
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#93C5FD] to-[#C4B5FD]">
            Nirlep Gohil
          </span>
        }
      >
        <Sparkles>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#93C5FD] to-[#C4B5FD]">
            Nirlep Gohil
          </span>
        </Sparkles>
      </Suspense>
    </h1>
  );
};

export default AnimatedName;
