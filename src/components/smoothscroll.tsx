"use client"

import React from "react"
import { useScroll, useTransform, useSpring, motion } from "framer-motion"

export default function SmoothScroll({ children }: {
  children: React.ReactNode
}) {
  const scrollRef = React.useRef(null);
  const [pageHeight, setPageHeight] = React.useState<number>(0);

  const resizePageHeight = React.useCallback((entries: any) => {
    for (let entry of entries) {
      setPageHeight(entry.contentRect.height);
    }
  }, [])

  React.useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries: any) => resizePageHeight(entries))
    scrollRef && resizeObserver.observe(scrollRef.current!)
    return () => resizeObserver.disconnect()
  }, [scrollRef, resizePageHeight])

  const { scrollY } = useScroll();
  const transform = useTransform(scrollY, [0, pageHeight], [0, -pageHeight])
  const physics = {
    damping: 15,
    mass: 0.27,
    stiffness: 55
  }
  const spring = useSpring(transform, physics)

  return (
    <>
      <motion.div
        className="scroll-container"
        style={{ y: spring }}
        ref={scrollRef}
      >
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} />
    </>
  )
}
