import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlClass =
  "mt-2 block w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition-colors duration-[150ms] placeholder:text-[color:var(--text-secondary)] focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12 disabled:opacity-50";

export function Label({ children, className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("block text-xs font-extrabold", className)} {...props}>
      {children}
    </label>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlClass, "resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(controlClass, className)} {...props}>
      {children}
    </select>
  );
}

export function FieldError({ children, id }: { children?: ReactNode; id?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-bold text-rose-600 dark:text-rose-400">
      {children}
    </p>
  );
}
