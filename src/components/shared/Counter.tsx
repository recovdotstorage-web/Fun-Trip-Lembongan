"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  duration?: number;
  className?: string;
  showComma?: boolean;
}

export default function Counter({
  value,
  direction = "up",
  duration = 2,
  className = "",
  showComma = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 60,
    restDelta: 0.001
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        const val = Math.floor(latest);
        ref.current.textContent = showComma 
          ? Intl.NumberFormat("en-US").format(val)
          : val.toString();
      }
    });
  }, [springValue, showComma]);

  return <span ref={ref} className={className} />;
}
