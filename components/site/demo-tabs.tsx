"use client";

import { useState } from "react";
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
  const current = variants[active] ?? variants[0];
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
            type="button"
            role="tab"
            aria-selected={index === active}
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
      <DemoFrame
        key={current.demo.src}
        src={current.demo.src}
        scope={current.demo.scope}
        title={current.demo.title}
        fullPageHref={current.demo.fullPageHref}
      />
    </div>
  );
}
