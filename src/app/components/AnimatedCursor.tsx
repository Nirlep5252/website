"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorShape, setCursorShape] = useState<'default' | 'pointer' | 'text' | 'link'>('default');
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Very responsive spring for the main cursor
  const springConfig = { damping: 50, stiffness: 2000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Detect text inputs and text areas
      if (
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.getAttribute('contenteditable') === 'true'
      ) {
        setIsHovered(true);
        setCursorShape('text');
        return;
      }

      // Detect links and buttons
      const isClickable = Boolean(
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.onclick != null ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      );
      
      if (isClickable) {
        setIsHovered(true);
        setCursorShape('pointer');
      } else {
        setIsHovered(false);
        setCursorShape('default');
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
      setCursorShape('default');
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          mixBlendMode: "difference"
        }}
        animate={{
          scale: isHovered ? 4 : 1,
          borderRadius: cursorShape === 'pointer' ? '8px' : 
                       cursorShape === 'text' ? '2px' : '4px',
          scaleX: cursorShape === 'text' ? 0.25 : 1,
          scaleY: cursorShape === 'text' ? 3 : 1,
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          ease: "easeOut"
        }}
      />
    </>
  );
} 