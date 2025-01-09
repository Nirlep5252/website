"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 1.5l3.09 6.3 6.91 1-5 4.87 1.18 6.88-6.18-3.25-6.18 3.25 1.18-6.88-5-4.87 6.91-1z" />
  </svg>
);

const generateSparkles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 12 + 8, // Reduced size range (8-20px)
    x: Math.random() * 110 - 5, // Slightly smaller spread (-5% to 105%)
    y: Math.random() * 110 - 5, // Slightly smaller spread (-5% to 105%)
    rotation: Math.random() * 360,
    duration: Math.random() * 1.5 + 1, // Slightly slower animation (1-2.5s)
    delay: Math.random() * 1.2, // Increased delays
  }));
};

interface Sparkle {
  id: number;
  size: number;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
}

export const Sparkles: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSparkles(generateSparkles(16));
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="relative inline-block">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none text-white/80"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            rotate: `${sparkle.rotation}deg`,
          }}
          animate={{
            scale: [0, 1.1, 0],
            opacity: [0, 1, 0],
            rotate: [`${sparkle.rotation}deg`, `${sparkle.rotation + 360}deg`],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <StarIcon />
        </motion.div>
      ))}
      {children}
    </div>
  );
};
