"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PRODUCT_STATUS_LABEL, type Product, type ProductStatus } from "@/lib/products";
import { ProductCard } from "@/components/shared/product-card";
import { cn, fuzzyMatch, toPersianDigits } from "@/lib/utils";

const FILTERS: { id: ProductStatus | "all"; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "active", label: PRODUCT_STATUS_LABEL.active },
  { id: "beta", label: PRODUCT_STATUS_LABEL.beta },
  { id: "development", label: PRODUCT_STATUS_LABEL.development },
];

export function DemoHubGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<ProductStatus | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      products.filter((product) => {
        const matchesFilter = filter === "all" || product.status === filter;
        const haystack = `${product.name} ${product.short} ${product.chips.join(" ")}`;
        return matchesFilter && fuzzyMatch(haystack, query);
      }),
    [products, filter, query],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                "rounded-full border px-4 py-2 text-[12px] font-bold transition-colors duration-[150ms]",
                filter === item.id
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-[var(--border-subtle)] text-muted hover:border-brand-300 hover:text-brand-600",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="relative sm:w-72">
          <span className="sr-only">جست‌وجوی دمو</span>
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جست‌وجوی دمو…"
            className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] ps-9 pe-3 text-sm outline-none transition-colors focus:border-brand-500"
          />
        </label>
      </div>

      <p aria-live="polite" className="mb-4 text-[12px] text-muted persian-num">
        {toPersianDigits(visible.length)} دمو نمایش داده می‌شود.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="surface-card p-12 text-center text-sm text-muted">دمویی با این عبارت پیدا نشد.</p>
      ) : null}
    </div>
  );
}
