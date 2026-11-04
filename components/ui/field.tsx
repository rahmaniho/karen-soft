import React, { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldControlClass =
  "mt-2 block min-h-12 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-4 py-3 text-sm text-[color:var(--text-primary)] outline-none transition-colors duration-[150ms] placeholder:text-[color:var(--text-secondary)] focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[var(--feedback-danger-border)]";

export function Label({ children, className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("block text-xs font-extrabold", className)} {...props}>
      {children}
    </label>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldControlClass, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldControlClass, "resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select className={cn(fieldControlClass, className)} {...props}>
      {children}
    </select>
  );
}

export function FieldError({ children, id }: { children?: ReactNode; id?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-xs font-bold text-[color:var(--feedback-danger-text)]">
      {children}
    </p>
  );
}

/** Labels, hints and errors share deterministic IDs with the actual control. */
export function FormField({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  className?: string;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid": boolean;
  }) => ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": Boolean(error) })}
      {hint ? <p id={hintId} className="mt-2 text-3xs leading-relaxed text-muted">{hint}</p> : null}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}
