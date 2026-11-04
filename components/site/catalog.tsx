"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Search } from "lucide-react";
import { PRODUCTS, PRODUCT_STATUS_LABEL } from "@/lib/products";
import { ProductCard } from "@/components/shared/product-card";
import { ResourceCard } from "@/components/shared/resource-card";
import { BLOG_POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/portfolio";
import { formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { EmptyState } from "@/components/ui/state-panel";

interface CatalogItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  logo?: string;
}

const normalize = (value: string) => value.replace(/ي/g, "ی").replace(/ك/g, "ک").toLowerCase();

export function Catalog({ kind }: { kind: "products" | "blog" | "portfolio" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("همه");
  const searchRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const resultsId = `${id}-results`;
  const countId = `${id}-count`;

  const items: CatalogItem[] =
    kind === "products"
      ? PRODUCTS.map(product => ({ slug: product.slug, title: product.name, description: product.short, category: PRODUCT_STATUS_LABEL[product.status], image: product.image }))
      : kind === "blog"
        ? BLOG_POSTS.map(post => ({ slug: post.slug, title: post.title, description: post.excerpt, category: post.category, image: post.cover }))
        : CASE_STUDIES.map(study => ({ slug: study.slug, title: study.title, description: study.summary, category: study.category, image: study.cover, logo: study.logo }));

  useEffect(() => {
    // Never erase text typed before hydration. Only an explicit URL query wins.
    const syncFromUrl = () => {
      const initial = new URLSearchParams(window.location.search).get("q");
      if (initial !== null) setQuery(initial);
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const filtered = items.filter(item =>
    (category === "همه" || category === item.category) &&
    normalize(`${item.title} ${item.description}`).includes(normalize(query.trim())),
  );

  function resetFilters() {
    setQuery("");
    setCategory("همه");
    const url = new URL(window.location.href);
    if (url.searchParams.has("q")) {
      url.searchParams.delete("q");
      window.history.replaceState(null, "", url);
    }
    searchRef.current?.focus();
  }

  return (
    <div data-catalog={kind}>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="فیلتر دسته‌بندی">
          {["همه", ...new Set(items.map(item => item.category))].map(value => (
            <Button
              key={value}
              onClick={() => setCategory(value)}
              aria-pressed={category === value}
              aria-controls={resultsId}
              variant={category === value ? "primary" : "outline"}
              size="sm"
              className="rounded-full text-2xs"
            >
              {value}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <label htmlFor={`${id}-search`} className="sr-only">جست‌وجو</label>
          <Search aria-hidden className="pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <Input
            ref={searchRef}
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="جست‌وجو…"
            autoComplete="off"
            enterKeyHint="search"
            aria-controls={resultsId}
            aria-describedby={countId}
            className="mt-0 ps-11"
          />
        </div>
      </div>
      <p id={countId} role="status" aria-live="polite" aria-atomic="true" className="mb-5 text-xs text-muted">
        {formatNumber(filtered.length)} نتیجه
      </p>
      {filtered.length ? (
        <div id={resultsId} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => kind === "products" ? (
            <ProductCard key={item.slug} product={PRODUCTS.find(product => product.slug === item.slug)!} />
          ) : (
            <ResourceCard
              key={item.slug}
              href={`/${kind}/${item.slug}`}
              title={item.title}
              category={item.category}
              description={item.description}
              image={item.image}
              logo={item.logo}
            />
          ))}
        </div>
      ) : (
        <div id={resultsId}>
          <EmptyState>
            <Button variant="soft" onClick={resetFilters}>پاک کردن فیلترها</Button>
          </EmptyState>
        </div>
      )}
    </div>
  );
}
