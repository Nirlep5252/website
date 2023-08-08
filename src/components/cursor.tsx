"use client"

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Cursor() {
  const [mousePos, setMousePos] = React.useState<number[]>([0, 0]);
  const [mouseVariant, setMouseVariant] = React.useState<string>("default");
  const [size, setSize] = React.useState<number>(6);

  const pathname = usePathname();

  React.useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePos([e.clientX, e.clientY]);
    }

    window.addEventListener("mousemove", mouseMove)
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  React.useEffect(() => {
    const mouseDown = () => setSize(12);
    const mouseUp = () => setSize(6);

    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)
    return () => {
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
    }
  }, [])

  React.useEffect(() => {
    const setHover = () => setMouseVariant("hover");
    const setDefault = () => setMouseVariant("default");

    setDefault();

    let anchors = window.document.querySelectorAll('a');
    let buttons = window.document.querySelectorAll('button');
    let hoverables = window.document.querySelectorAll('.hoverable');

    anchors?.forEach(element => {
      element.addEventListener("mouseenter", setHover);
      element.addEventListener("mouseleave", setDefault);
    });
    buttons?.forEach(element => {
      element.addEventListener("mouseenter", setHover);
      element.addEventListener("mouseleave", setDefault);
    });
    hoverables?.forEach(element => {
      element.addEventListener("mouseenter", setHover);
      element.addEventListener("mouseleave", setDefault);
    });

    return () => {
      anchors?.forEach(element => {
        element.removeEventListener("mouseenter", setHover);
        element.removeEventListener("mouseleave", setDefault);
      });
      buttons?.forEach(element => {
        element.removeEventListener("mouseenter", setHover);
        element.removeEventListener("mouseleave", setDefault);
      });
      hoverables?.forEach(element => {
        element.removeEventListener("mouseenter", setHover);
        element.removeEventListener("mouseleave", setDefault);
      });
    }
  }, [pathname])

  const cursorVariants = {
    default: {
      x: mousePos[0] - size * 2,
      y: mousePos[1] - size * 2,
      height: size * 4,
      width: size * 4,
    },
    hover: {
      x: mousePos[0] - size * 8,
      y: mousePos[1] - size * 8,
      height: size * 16,
      width: size * 16,
      backgroundColor: "white",
    }
  }
  return (
    <motion.div
      className={`cursor bg-transparent border-2 border-white
                  rounded-full fixed top-0 left-0 select-none
                  z-50 touch-none pointer-events-none
                  ${mouseVariant == 'hover' ? "mix-blend-difference" : ""}`}
      variants={cursorVariants}
      animate={mouseVariant}
    />
  )
}
