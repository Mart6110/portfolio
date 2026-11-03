"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const HIDDEN = { opacity: 0, y: 16 };
const SHOWN = { opacity: 1, y: 0 };

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** When given, the reveal waits for this instead of for the element to scroll into view. */
  ready?: boolean;
}

/** Fades content up the first time it scrolls into view (or once `ready`). */
export default function Reveal({ children, className, delay = 0, ready }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const waitsForReady = ready !== undefined;

  return (
    <motion.div
      animate={waitsForReady ? (ready || shouldReduceMotion ? SHOWN : HIDDEN) : undefined}
      className={className}
      initial={shouldReduceMotion ? false : HIDDEN}
      transition={shouldReduceMotion ? { duration: 0 } : { delay, duration: 0.5, ease: EASE_OUT }}
      viewport={{ margin: "0px 0px -10% 0px", once: true }}
      whileInView={waitsForReady ? undefined : SHOWN}
    >
      {children}
    </motion.div>
  );
}
