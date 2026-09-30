"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, className }: { items: TabItem[]; className?: string }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // RTL: ArrowLeft moves forward
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    let next = active;
    if (event.key === "ArrowLeft") next = (active + 1) % items.length;
    if (event.key === "ArrowRight") next = (active - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="ماژول‌ها"
        onKeyDown={onKeyDown}
        className="scrollbar-thin flex gap-2 overflow-x-auto pb-2"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[13px] font-bold transition-all duration-[250ms]",
              active === index
                ? "border-brand-500 bg-brand-500 text-white"
                : "border-[var(--border-subtle)] text-muted hover:border-brand-300 hover:text-brand-600",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={active !== index}
          className="mt-6 animate-reveal"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
