import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** سرآمدۀ بخش‌ها در کارن چاپ — برچسب لاتین، تیتر تیتری و لید */
export function ChapHeading({
  latin,
  fa,
  index,
  title,
  description,
  action,
  center,
  className,
}: {
  latin?: string;
  fa?: string;
  index?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5",
        center ? "items-center text-center" : "lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto")}>
        {latin || fa ? (
          <div className="mb-3 flex flex-wrap items-center gap-3">
            {latin ? <span className="eyebrow">{latin}</span> : null}
            {fa ? <span className="text-3xs font-bold text-muted">/ {fa}</span> : null}
            {index ? <span className="sec-index ms-auto">{index}</span> : null}
          </div>
        ) : null}
        <h2 className="display-2">{title}</h2>
        {description ? <p className="lead mt-4">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
