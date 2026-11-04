import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import Image from "next/image";
import { ArrowLeft, BookOpen, ExternalLink, PlayCircle } from "lucide-react";
import { PRODUCT_STATUS_LABEL, type Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

const toneByStatus = { active: "success", beta: "warning", development: "neutral" } as const;

export function ProductCard({ product }: { product: Product }) {
  const logo = product.logo ?? product.image;

  return (
    <SurfaceCard as="article" interactive className="group relative flex h-full flex-col overflow-hidden p-6">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100"
        style={{ background: product.accent }}
      />
      <div className="flex items-start justify-between gap-3">
        {logo ? (
          <span
            aria-hidden
            className="relative block size-12 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white"
          >
            <Image src={logo} alt="" fill sizes="48px" className="object-contain p-0.5" />
          </span>
        ) : (
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-[var(--radius-md)] text-xl"
            style={{ background: `${product.accent}1f` }}
          >
            {product.emoji}
          </span>
        )}
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
      {product.slug === "law-book" ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] px-3 py-2.5">
          <span className="text-4xs font-bold text-muted">قیمت نسخۀ کامل</span>
          <strong className="whitespace-nowrap text-xs text-[color:var(--text-primary)]">{formatNumber(product.pricingFrom)} تومان</strong>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.chips.map((chip) => (
          <span key={chip} className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-4xs font-bold text-muted">
            {chip}
          </span>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-2 pt-1">
        {product.slug === "law-book" ? (
          <ButtonLink href={`/products/${product.slug}#book-topics`} size="sm" className="text-2xs">
            <BookOpen className="size-4" aria-hidden />
            فهرست موضوعات
          </ButtonLink>
        ) : product.liveUrl ? (
          <ButtonLink href={product.liveUrl} target="_blank" rel="noopener noreferrer" size="sm" className="text-2xs">
            <ExternalLink className="size-4" aria-hidden />
            نسخۀ زنده
          </ButtonLink>
        ) : null}
        <ButtonLink href={`/products/${product.slug}`} variant="outline" size="sm" className="text-2xs">
          جزئیات
          <ArrowLeft className="size-3.5" aria-hidden />
        </ButtonLink>
      </div>
    </SurfaceCard>
  );
}
