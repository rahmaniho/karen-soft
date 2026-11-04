import React, { type ComponentProps, type ReactNode } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-w-0 items-center justify-center gap-2 text-center font-bold transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 active:translate-y-0 motion-reduce:transform-none [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-[0_12px_30px_rgba(36,103,244,.25)] hover:bg-brand-500 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(36,103,244,.35)]",
        dark: "bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100",
        outline:
          "border border-[var(--border-subtle)] bg-transparent text-[color:var(--text-primary)] hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-300",
        ghost: "bg-transparent text-[color:var(--text-primary)] hover:bg-[var(--surface-sunken)]",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:hover:bg-brand-900/50",
      },
      size: {
        // Minimum 44px targets; min-height lets longer Persian labels wrap at large text settings.
        sm: "min-h-11 rounded-[var(--radius-sm)] px-4 py-2 text-xs",
        md: "min-h-12 rounded-[var(--radius-md)] px-5 py-2 text-sm",
        lg: "min-h-14 rounded-[var(--radius-md)] px-7 py-3 text-base",
        icon: "size-11 rounded-[var(--radius-sm)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: ReactNode;
};

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  icon,
  children,
  ...props
}: ButtonBaseProps & ComponentProps<"button"> & { loading?: boolean; icon?: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), loading && "cursor-wait", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden /> : icon}
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonBaseProps & ComponentProps<typeof Link>) {
  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
