import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

/** Visual trail mirrors the page's existing BreadcrumbList JSON-LD; no extra schema is emitted. */
export function Breadcrumbs({ items, className }: { items: readonly BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="مسیر صفحه" className={cn("mb-10 text-xs text-muted", className)}>
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex min-w-0 items-center gap-3">
            {index > 0 ? <span aria-hidden className="shrink-0 opacity-60">/</span> : null}
            {item.path && index < items.length - 1 ? (
              <Link href={item.path} className="transition-colors hover:text-brand-600 dark:hover:text-brand-300">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="min-w-0 break-words">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
