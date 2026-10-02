import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * سرآمدۀ بخش‌ها — نسل دوم: برچسب لاتین (eyebrow)، تیتر با فونت «تیتر»،
 * و لید کوتاه. اگر `index` بدهید، شمارۀ ترتیبی بخش هم نمایش داده می‌شود.
 */
export function SectionHeading({
  eyebrow,
  eyebrowLatin,
  index,
  title,
  description,
  align = "start",
  action,
  className,
}: {
  eyebrow?: string;
  /** معادل لاتینِ برچسب؛ با فاصلهٔ حرفی زیاد نوشته می‌شود */
  eyebrowLatin?: string;
  /** شمارۀ بخش، مثل «۰۱» */
  index?: string;
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
        {eyebrow || eyebrowLatin ? (
          <div className="mb-3 flex items-center gap-3">
            <span className="eyebrow">{eyebrowLatin ?? eyebrow}</span>
            {eyebrow && eyebrowLatin ? (
              <span className="text-3xs font-bold text-muted">/ {eyebrow}</span>
            ) : null}
            {index ? <span className="sec-index ms-auto">{index}</span> : null}
          </div>
        ) : null}
        <h2 className="display-2 text-[color:var(--text-primary)]">{title}</h2>
        {description ? <p className="lead mt-4">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
