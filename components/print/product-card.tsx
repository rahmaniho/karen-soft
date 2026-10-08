import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Timer } from "lucide-react";
import type { PrintProduct } from "@/lib/print/types";
import { PRINT_TILE_ICONS } from "@/lib/print/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product, href }: { product: PrintProduct; href?: string }) {
  const target = href ?? `/print/products/${product.slug}`;
  const tileIcon = PRINT_TILE_ICONS[product.slug];
  return (
    <Link
      href={target}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] transition-all duration-[220ms] hover:-translate-y-1 hover:border-ink-900/30 hover:shadow-[var(--shadow-soft)]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-[var(--surface-sunken)]">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <span className="grid h-full place-items-center text-3xl">{product.emoji}</span>
        )}
        {tileIcon ? (
          <span className="absolute bottom-2 start-2 size-12 overflow-hidden rounded-[var(--radius-md)] border border-white/40 bg-white/90 shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-110">
            <Image src={tileIcon} alt="" fill sizes="48px" className="object-contain p-1" />
          </span>
        ) : null}
      </span>
      <span className="flex flex-1 flex-col p-4">
        <span className="flex items-center gap-2">
          <span aria-hidden className="text-base leading-none">
            {product.emoji}
          </span>
          <span className="text-sm font-bold">{product.name}</span>
        </span>
        <span className="mt-1.5 block text-3xs leading-relaxed text-muted">{product.tag}</span>
        <span className={cn("mt-3 flex items-center gap-1.5 text-5xs text-muted")}>
          <Timer className="size-3.5" aria-hidden />
          {product.turnaround}
        </span>
        <span className="mt-3 flex items-center gap-1.5 border-t border-[var(--border-subtle)] pt-3 text-3xs font-bold text-brand-600 transition-transform duration-[200ms] group-hover:-translate-x-1 dark:text-brand-300">
          پیکربند و سفارش
          <ArrowLeft className="size-3.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
