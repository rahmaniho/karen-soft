"use client";

import { useEffect, useRef } from "react";
import { toPersianDigits } from "@/lib/utils";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/**
 * شمارنده‌های بالا‌رونده.
 * مقدار نهایی در HTML (SSR) نوشته می‌شود تا کرالر و کاربرِ بدون جاوااسکریپت «۰» نبینند؛
 * انیمیشن بعداً و دست‌کاریِ مستقیم روی متن انجام می‌شود تا با hydration درگیری نداشته باشد.
 * prefers-reduced-motion که فعال باشد، اصلاً انیمیشنی اجرا نمی‌شود.
 */
export function ChapStats({ items }: { items: readonly Stat[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const paint = (fraction: number) => {
      items.forEach((stat, index) => {
        const el = valueRefs.current[index];
        if (el) el.textContent = toPersianDigits(Math.round(stat.value * fraction));
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          paint(1 - Math.pow(1 - t, 3));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        paint(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] bg-[var(--hairline)] sm:grid-cols-4"
    >
      {items.map((stat, index) => (
        <div key={stat.label} className="bg-[var(--surface-raised)] px-5 py-6 text-center">
          <div className="font-titr text-2xl leading-none text-[color:var(--text-primary)]">
            <span className="persian-num" ref={(el) => void (valueRefs.current[index] = el)}>
              {toPersianDigits(stat.value)}
            </span>
            <span className="text-lg">{stat.suffix}</span>
          </div>
          <p className="mt-2 text-3xs font-bold text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
