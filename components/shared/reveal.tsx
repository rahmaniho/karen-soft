"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // Only animate opacity: transform animations are disabled by MotionConfig
  // reducedMotion="user" on the client but not during SSR, which would mismatch
  // the hydrated style attribute. Opacity is identical on server and client;
  // reduced-motion users get duration 0 so content is never left translucent.
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={reduced ? { opacity: 1 } : undefined}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
