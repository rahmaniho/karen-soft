"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Type } from "lucide-react";
import {
  READER_DEFAULTS,
  READER_OPTIONS,
  READER_STORAGE_KEY,
  applyReaderPrefs,
  readStoredPrefs,
  type ReaderPrefs,
} from "@/lib/reader";
import { cn } from "@/lib/utils";

type Group = keyof ReaderPrefs;
const GROUPS = ["size", "weight", "leading", "headings"] as const satisfies readonly Group[];

/**
 * پنل «تنظیم نوشتار» — کنترل اندازه، وزن، فاصلۀ خطوط و فونت تیتر.
 * انتخاب‌ها در localStorage می‌مانند و برای کل سایت (و کارن چاپ) اعمال می‌شوند.
 */
export function ReaderControls({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<ReaderPrefs>(READER_DEFAULTS);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readStoredPrefs();
    setPrefs(stored);
    applyReaderPrefs(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const update = (group: Group, value: string) => {
    const next = { ...prefs, [group]: value } as ReaderPrefs;
    setPrefs(next);
    applyReaderPrefs(next);
    try {
      window.localStorage.setItem(READER_STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* حالت خصوصی مرورگر — بدون ذخیره هم کار می‌کند */
    }
  };

  const isDirty = GROUPS.some((g) => prefs[g] !== READER_DEFAULTS[g]);

  // روی صفحۀ دموها نمایش داده نمی‌شود؛ آنجا رابط کاربریِ محصول شبیه‌سازی شده است
  if (pathname.startsWith("/demo")) return null;

  return (
    <div ref={rootRef} className={cn("fixed bottom-5 start-5 z-[60] flex flex-col items-start gap-3", className)}>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel max-h-[calc(100dvh-7rem)] overflow-y-auto w-[min(22rem,calc(100vw-2.5rem))] rounded-[var(--radius-xl)] p-5 shadow-[var(--shadow-lift)]"
            id="reader-panel"
            role="dialog"
            aria-label="تنظیم نوشتار"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-titr text-base leading-none">تنظیم نوشتار</h2>
              <span className="text-5xs text-muted">مخصوص چشم شما</span>
            </div>
            <div className="cmyk-strip mt-3" aria-hidden>
              <span style={{ background: "var(--color-cmyk-c)" }} />
              <span style={{ background: "var(--color-cmyk-m)" }} />
              <span style={{ background: "var(--color-cmyk-y)" }} />
              <span style={{ background: "var(--color-cmyk-k)" }} />
            </div>

            <div className="mt-4 space-y-4">
              {GROUPS.map((group) => {
                const conf = READER_OPTIONS[group];
                return (
                  <fieldset key={group} className="border-0 p-0">
                    <legend className="mb-1.5 text-2xs font-bold">{conf.label}</legend>
                    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={conf.label}>
                      {conf.values.map((opt) => {
                        const active = prefs[group] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => update(group, opt.value)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-2xs font-bold transition-colors duration-[150ms]",
                              active
                                ? "border-transparent bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                                : "border-[var(--border-subtle)] bg-[var(--surface-raised)]/70 text-muted hover:border-brand-400 hover:text-brand-600",
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-1.5 text-5xs leading-relaxed text-muted">{conf.hint}</p>
                  </fieldset>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setPrefs(READER_DEFAULTS);
                applyReaderPrefs(READER_DEFAULTS);
                try {
                  window.localStorage.removeItem(READER_STORAGE_KEY);
                } catch {
                  /* noop */
                }
              }}
              disabled={!isDirty}
              className="mt-4 inline-flex items-center gap-1.5 text-2xs font-bold text-muted transition-colors hover:text-brand-600 disabled:opacity-40"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              بازنشانی نوشتار
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-controls="reader-panel"
        aria-expanded={open}
        aria-label="تنظیم اندازه و وزن نوشتار"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3 text-2xs font-bold shadow-[var(--shadow-soft)] transition-all duration-[200ms] hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600",
          open && "border-brand-500 text-brand-600",
        )}
      >
        <Type className="size-4" aria-hidden />
        نوشتار
        {mounted && isDirty ? (
          <span className="grid size-4 place-items-center rounded-full bg-brand-600 text-5xs font-black text-white">
            A
          </span>
        ) : null}
      </button>
    </div>
  );
}
