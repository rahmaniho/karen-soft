import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-bold transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 active:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-[0_12px_30px_rgba(36,103,244,.25)] hover:bg-brand-500 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(36,103,244,.35)]",
        dark: "bg-ink-900 text-white hover:bg-ink-800 hover:-translate-y-0.5 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100",
        outline:
          "border border-[var(--border-subtle)] bg-transparent text-[color:var(--text-primary)] hover:border-brand-500 hover:text-brand-600",
        ghost: "bg-transparent text-[color:var(--text-primary)] hover:bg-[var(--surface-sunken)]",
        soft: "bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-900/30 dark:text-brand-200 dark:hover:bg-brand-900/50",
      },
      size: {
        sm: "h-10 rounded-[var(--radius-sm)] px-4 text-[13px]",
        md: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-14 rounded-[var(--radius-md)] px-7 text-base",
        icon: "h-10 w-10 rounded-[var(--radius-sm)]",
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
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
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
