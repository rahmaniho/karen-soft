import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "success" | "warning" | "neutral" | "danger" | "violet";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:border-brand-800",
  success: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/25 dark:text-emerald-300 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/25 dark:text-amber-300 dark:border-amber-800",
  danger: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-900/25 dark:text-rose-300 dark:border-rose-800",
  violet: "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-900/25 dark:text-violet-300 dark:border-violet-800",
  neutral: "bg-[var(--surface-sunken)] text-[color:var(--text-secondary)] border-[var(--border-subtle)]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
