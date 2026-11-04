"use client";

import React, { useId, useRef, useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (index + 1) % items.length;
    if (event.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    if (next === null) return;
    event.preventDefault();
    triggerRefs.current[next]?.focus();
  }

  return (
    <div className={cn("divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]", className)}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                ref={element => { triggerRefs.current[index] = element; }}
                id={`${baseId}-trigger-${index}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                onKeyDown={event => onKeyDown(event, index)}
                className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-start text-base font-bold transition-colors hover:text-brand-600 dark:hover:text-brand-300"
              >
                <span>{item.q}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-brand-500 transition-transform duration-[250ms] motion-reduce:transition-none",
                    expanded && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${baseId}-${index}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${index}`}
              hidden={!expanded}
              className="pb-6 text-sm leading-loose text-muted"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
