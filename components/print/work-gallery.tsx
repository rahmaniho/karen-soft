"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { PrintWork } from "@/lib/print/types";
import { PRINT_WORK_CATEGORIES } from "@/lib/print/data/works";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/utils";

export function WorkGallery({ works, compact = false }: { works: PrintWork[]; compact?: boolean }) {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const list = useMemo(
    () => (filter === "all" ? works : works.filter((work) => work.category === filter)),
    [works, filter],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: works.length };
    for (const work of works) map[work.category] = (map[work.category] ?? 0) + 1;
    return map;
  }, [works]);

  const step = useCallback(
    (dir: number) => {
      setLightbox((current) => {
        if (current == null) return current;
        return (current + dir + list.length) % list.length;
      });
    },
    [list.length],
  );

  useEffect(() => {
    if (lightbox == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") step(1);
      if (e.key === "ArrowRight") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [lightbox, step]);

  const active = lightbox != null ? list[lightbox] : null;

  return (
    <div>
      {!compact ? (
        <div className="scrollbar-thin -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2">
          {[{ id: "all", label: "همه" }, ...PRINT_WORK_CATEGORIES].map((cat) => {
            const count = counts[cat.id] ?? 0;
            if (!count && cat.id !== "all") return null;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-2xs font-bold transition-all duration-[200ms]",
                  filter === cat.id
                    ? "border-transparent bg-ink-950 text-white dark:bg-white dark:text-ink-950"
                    : "border-[var(--border-subtle)] bg-[var(--surface-raised)] text-muted hover:-translate-y-0.5 hover:text-[color:var(--text-primary)]",
                )}
              >
                {cat.label}
                <span className="persian-num ms-2 text-5xs opacity-60">{toPersianDigits(count)}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <motion.ul
        layout
        className={cn("grid gap-4", compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3")}
      >
        <AnimatePresence mode="popLayout">
          {list.map((work, index) => (
            <motion.li
              key={`${work.image}-${work.caption}`}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setLightbox(index)}
                className="group relative block w-full overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-start"
                aria-label={`بزرگ‌نمایی: ${work.caption}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent p-4 pt-12">
                  <span className="block text-5xs font-bold uppercase tracking-[0.2em] text-[var(--color-cmyk-y)]">
                    {work.categoryLabel}
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-snug text-white">{work.caption}</span>
                </span>
                <span className="absolute end-3 top-3 grid size-9 place-items-center rounded-full bg-white/85 text-ink-900 opacity-0 backdrop-blur transition-opacity duration-[200ms] group-hover:opacity-100">
                  <ZoomIn className="size-4" aria-hidden />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink-950/92 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <motion.figure
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--surface-raised)]"
            >
              <div className="relative aspect-[16/10] bg-ink-900">
                <Image src={active.image} alt={active.title} fill sizes="90vw" className="object-contain" />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] p-5">
                <div>
                  <p className="text-5xs font-bold uppercase tracking-[0.2em] text-muted">{active.categoryLabel}</p>
                  <h3 className="mt-1 text-base font-bold">{active.caption}</h3>
                  <p className="mt-1 text-2xs text-muted">{active.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="persian-num me-2 text-3xs text-muted">
                    {lightbox != null ? toPersianDigits(lightbox + 1) : "۰"} / {toPersianDigits(list.length)}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="قبلی"
                    className="grid size-10 place-items-center rounded-full border border-[var(--border-subtle)] hover:border-ink-900"
                  >
                    <ChevronRight className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="بعدی"
                    className="grid size-10 place-items-center rounded-full border border-[var(--border-subtle)] hover:border-ink-900"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label="بستن"
                    className="grid size-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
