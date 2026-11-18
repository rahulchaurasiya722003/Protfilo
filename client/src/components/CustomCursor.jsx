"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs without state re-render lags
  const springX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.2 });
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.1 });

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (shouldReduceMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cyan-400/50 mix-blend-screen hidden md:block will-change-transform"
        style={{
          x: springX,
          y: springY,
          width: 32,
          height: 32,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-80 blur-[1px] hidden md:block will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
