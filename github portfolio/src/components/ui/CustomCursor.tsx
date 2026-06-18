"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
      
      // Update global CSS variables for custom cursor glow in body
      document.body.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
      
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const addHoverEvents = () => {
      const clickables = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .hover-target, iframe'
      );
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    addHoverEvents();

    // Re-bind hover events on DOM mutations (useful for dynamic content/modals)
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isHidden]);

  if (isHidden) return null;

  return (
    <>
      {/* Dynamic Cursor Glow (follows mouse directly) */}
      <div className="fixed inset-0 cursor-glow z-30 pointer-events-none" />

      {/* Outer Spring Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 2.2 : 1,
          borderColor: isHovered ? "#bd00ff" : "#00f0ff",
          backgroundColor: isHovered ? "rgba(189, 0, 255, 0.12)" : "rgba(0, 240, 255, 0.04)",
          boxShadow: isHovered 
            ? "0 0 15px rgba(189, 0, 255, 0.6)" 
            : "0 0 8px rgba(0, 240, 255, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 7.5,
          translateY: 7.5,
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
