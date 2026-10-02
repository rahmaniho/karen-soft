import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { PRODUCT_STATUS_LABEL, type Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

const toneByStatus = { active: "success", beta: "warning", development: "neutral" } as const;

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden p-6 transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] focus-within:-translate-y-1">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100"
        style={{ background: product.accent }}
      />
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="grid size-12 place-items-center rounded-[var(--radius-md)] text-xl"
          style={{ background: `${product.accent}1f` }}
        >
          {product.emoji}
        </span>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {product.featured ? <Badge tone="violet">ویژه</Badge> : null}
          {product.popular ? <Badge tone="brand">محبوب</Badge> : null}
          <Badge tone={toneByStatus[product.status]}>{PRODUCT_STATUS_LABEL[product.status]}</Badge>
        </div>
      </div>

      <h3 className="mt-5 text-lg font-extrabold">
        <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {product.name}
        </Link>
      </h3>
      <p className="mt-2 text-xs leading-loose text-muted">{product.short}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.chips.map((chip) => (
          <span key={chip} className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-4xs font-bold text-muted">
            {chip}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-1">
        <Link
          href={`/demo/${product.demoSlug}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] bg-brand-600 px-4 text-2xs font-extrabold text-white transition-colors hover:bg-brand-500"
        >
          <PlayCircle className="size-4" aria-hidden />
          مشاهده دمو
        </Link>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-4 text-2xs font-extrabold transition-colors hover:border-brand-400 hover:text-brand-600"
        >
          جزئیات
          <ArrowLeft className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
