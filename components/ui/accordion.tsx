"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]", className)}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={`${baseId}-trigger-${index}`}
                type="button"
                aria-expanded={expanded}
                aria-controls={`${baseId}-${index}`}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-start text-base font-bold transition-colors hover:text-brand-600"
              >
                <span>{item.q}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "size-5 shrink-0 text-brand-500 transition-transform duration-[250ms]",
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
