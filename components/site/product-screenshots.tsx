"use client";

import { useState } from "react";
import Image from "next/image";
import { MonitorSmartphone } from "lucide-react";
import type { ProductScreenshot } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * گالری نماهای واقعی محیط نرم‌افزار؛
 * یک پنجرۀ برنامه با نوار عنوان و ریل تصاویر بندانگشتی برای جابه‌جایی بین ماژول‌ها.
 */
export function ProductScreenshots({
  screenshots,
  appName,
}: {
  screenshots: ProductScreenshot[];
  appName: string;
}) {
  const [active, setActive] = useState(0);
  const current = screenshots[active] ?? screenshots[0];
  if (!current) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
      {/* پنجرۀ نرم‌افزار */}
      <figure className="surface-card group relative overflow-hidden shadow-[var(--shadow-soft)]">
        <figcaption className="flex items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <i className="size-2.5 rounded-full bg-rose-400" />
            <i className="size-2.5 rounded-full bg-amber-400" />
            <i className="size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-1 text-5xs text-muted">
            <MonitorSmartphone className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">
              {appName} — {current.label}
            </span>
          </span>
        </figcaption>
        <div className="relative aspect-[16/9] bg-ink-950">
          {screenshots.map((shot, index) => (
            <Image
              key={shot.src}
              src={shot.src}
              alt={`${appName} — ${shot.label}: ${shot.caption}`}
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              priority={index === 0}
              className={cn(
                "object-cover object-top transition-opacity duration-500",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <p className="px-4 py-3 text-3xs leading-relaxed text-muted">{current.caption}</p>
      </figure>

      {/* ریل بندانگشتی */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
        role="tablist"
        aria-label="نماهای محیط نرم‌افزار"
      >
        {screenshots.map((shot, index) => (
          <button
            key={shot.src}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] border p-1.5 pe-3 text-start transition-all duration-200",
              index === active
                ? "border-brand-500 bg-brand-600/10 shadow-[var(--shadow-soft)]"
                : "border-[var(--border-subtle)] hover:border-brand-400",
            )}
          >
            <span className="relative block size-11 shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--surface-sunken)]">
              <Image src={shot.src} alt="" fill sizes="44px" className="object-cover object-top" />
            </span>
            <span
              className={cn(
                "text-4xs font-bold",
                index === active ? "text-brand-600 dark:text-brand-300" : "text-muted",
              )}
            >
              {shot.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
