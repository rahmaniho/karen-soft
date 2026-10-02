"use client";

import { useEffect, useRef, useState } from "react";
import { toPersianDigits } from "@/lib/utils";

/** شمارنده‌های بالا‌رونده — با احترام به prefers-reduced-motion */
export function ChapStats({ items }: { items: readonly { value: number; suffix: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] bg-[var(--hairline)] sm:grid-cols-4"
    >
      {items.map((stat) => (
        <div key={stat.label} className="bg-[var(--surface-raised)] px-5 py-6 text-center">
          <div className="font-titr text-2xl leading-none text-[color:var(--text-primary)]">
            <span className="persian-num">{toPersianDigits(Math.round(stat.value * progress))}</span>
            <span className="text-lg">{stat.suffix}</span>
          </div>
          <p className="mt-2 text-3xs font-bold text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
