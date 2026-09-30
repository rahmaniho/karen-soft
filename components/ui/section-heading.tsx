import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  action,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "start" | "center";
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-5 lg:mb-16",
        align === "center" ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-extrabold tracking-wide text-brand-600 dark:text-brand-300">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="text-3xl leading-tight font-extrabold text-balance sm:text-4xl lg:text-[44px]">{title}</h2>
        {description ? <p className="mt-4 text-[15px] leading-loose text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
