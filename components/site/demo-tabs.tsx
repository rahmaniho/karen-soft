"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { useTabList } from "@/components/ui/use-tab-list";
import { cn } from "@/lib/utils";
import { DemoFrame } from "@/components/site/demo-frame";

export interface DemoVariant {
  label: string;
  demo: { src: string; scope: string; title: string; fullPageHref?: string };
}

/** Only the selected demo is mounted; switching recreates the frame and its safety patches. */
export function DemoTabs({ variants }: { variants: DemoVariant[] }) {
  const { active, tabProps, panelProps } = useTabList({ count: variants.length, singlePanel: true, panelTabIndex: -1 });
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
            {...tabProps(index)}
            className={cn(buttonVariants({ variant: index === active ? "primary" : "ghost", size: "sm" }), "rounded-full")}
          >
            {variant.label}
          </button>
        ))}
      </div>
      <div {...panelProps()}>
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
