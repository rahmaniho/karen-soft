"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DemoFrame } from "@/components/site/demo-frame";

export interface DemoVariant {
  label: string;
  demo: { src: string; scope: string; title: string; fullPageHref?: string };
}

/**
 * چند نسخهٔ نمایشی از یک پروژه (مثلاً فروشگاه و پنل مدیریت) را در یک قاب نشان می‌دهد.
 * فقط نسخهٔ انتخاب‌شده بارگذاری می‌شود تا صفحه سنگین نشود؛ هر بار تعویض، قاب از نو ساخته می‌شود
 * تا محدودیت‌های پیوند و فرم روی سند تازه هم اعمال شوند.
 */
export function DemoTabs({ variants }: { variants: DemoVariant[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = variants[active] ?? variants[0];
  const onTabKeyDown = (event: KeyboardEvent, index: number) => {
    const lastIndex = variants.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === 0 ? lastIndex : index - 1; // RTL
    if (event.key === "ArrowLeft") next = index === lastIndex ? 0 : index + 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = lastIndex;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };
  if (!current) return null;

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="نسخه‌های نمایشی این نمونه‌کار"
        className="flex flex-wrap gap-2 rounded-2xl border border-[var(--hairline)] bg-[var(--surface-sunken)] p-2"
      >
        {variants.map((variant, index) => (
          <button
            key={variant.label}
            ref={element => { tabRefs.current[index] = element; }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={index === active ? 0 : -1}
            onKeyDown={event => onTabKeyDown(event, index)}
            onClick={() => setActive(index)}
            className={cn(
              buttonVariants({ variant: index === active ? "primary" : "ghost", size: "sm" }),
              "rounded-full",
            )}
          >
            {variant.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
      >
      <DemoFrame
        key={current.demo.src}
        src={current.demo.src}
        scope={current.demo.scope}
        title={current.demo.title}
        fullPageHref={current.demo.fullPageHref}
      />
      </div>
    </div>
  );
}
