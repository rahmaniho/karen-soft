import React, { type ReactNode } from "react";
import { SearchX } from "lucide-react";
import { SurfaceCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Route-level feedback keeps one heading, a recovery explanation and explicit actions. */
export function StatePanel({
  icon,
  eyebrow,
  title,
  description,
  children,
  role,
  headingLevel = 1,
  className,
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
  role?: "alert" | "status";
  headingLevel?: 1 | 2 | 3;
  className?: string;
}) {
  const Heading = `h${headingLevel}` as const;
  return (
    <SurfaceCard as="section" role={role} className={cn("mx-auto my-12 max-w-3xl px-6 py-12 text-center sm:px-12 sm:py-16", className)}>
      {icon ? <div aria-hidden className="mx-auto mb-6 grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-sunken)] text-brand-600 dark:text-brand-300">{icon}</div> : null}
      {eyebrow ? <p className="eyebrow justify-center">{eyebrow}</p> : null}
      <Heading className="display-3 mt-5">{title}</Heading>
      <p className="mx-auto mt-4 max-w-xl leading-loose text-muted">{description}</p>
      {children ? <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
    </SurfaceCard>
  );
}

export function EmptyState({
  title = "نتیجه‌ای پیدا نشد",
  description = "عبارت دیگری جست‌وجو کنید یا فیلترها را بردارید.",
  children,
}: {
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <StatePanel headingLevel={3} icon={<SearchX className="size-6" />} title={title} description={description} className="my-0 px-6 py-10">
      {children}
    </StatePanel>
  );
}

