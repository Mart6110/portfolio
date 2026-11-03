"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='tab'], [role='menuitem'], input, select, textarea, label";
const RING_SPRING = { damping: 30, mass: 0.4, stiffness: 420 };
const STATE_SPRING = { bounce: 0.1, duration: 0.25, type: "spring" as const };
const CURSOR_CLASS = "custom-cursor";

function subscribeToPointerQuery(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A brand-colored dot that tracks the mouse exactly, with a ring that trails it on a spring
 * and swells over links and buttons. Mouse only: touch, pen and reduced-motion users keep
 * the system cursor.
 */
export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useSyncExternalStore(
    subscribeToPointerQuery,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false
  );
  const enabled = hasFinePointer && !shouldReduceMotion;

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, RING_SPRING);
  const ringY = useSpring(y, RING_SPRING);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        root.classList.remove(CURSOR_CLASS);
        setVisible(false);
        return;
      }
      x.set(event.clientX);
      y.set(event.clientY);
      // The system cursor is hidden only once there is a custom one on screen to replace it.
      root.classList.add(CURSOR_CLASS);
      setVisible(true);
    };
    const handleOver = (event: PointerEvent) => {
      setHovering(event.target instanceof Element && event.target.closest(INTERACTIVE_SELECTOR) !== null);
    };
    const handleLeave = () => {
      root.classList.remove(CURSOR_CLASS);
      setVisible(false);
    };
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver);
    root.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      root.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      root.classList.remove(CURSOR_CLASS);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.85 : hovering ? 1.6 : 1 }}
          className="-translate-x-1/2 -translate-y-1/2 relative size-8 rounded-full border border-brand/70"
          initial={false}
          transition={STATE_SPRING}
        >
          <motion.span
            animate={{ opacity: hovering ? 1 : 0 }}
            className="absolute inset-0 rounded-full bg-brand/15"
            initial={false}
            transition={STATE_SPRING}
          />
        </motion.div>
      </motion.div>
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
          // The halo keeps the dot visible on orange surfaces like the candy buttons.
          className="-translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-brand shadow-[0_0_0_1.5px_var(--color-background)]"
          initial={false}
          transition={STATE_SPRING}
        />
      </motion.div>
    </div>
  );
}
