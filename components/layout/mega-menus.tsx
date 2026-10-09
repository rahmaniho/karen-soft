"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, PlayCircle, Sparkles, Star } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";
import { PRODUCTS, PRODUCT_STATUS_LABEL } from "@/lib/products";
import { INDUSTRIES } from "@/lib/industries";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const panelClass =
  "glass-panel grid gap-6 rounded-[var(--radius-2xl)] p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[1.15fr_1fr_0.85fr]";

export function SolutionsMega({ onNavigate }: { onNavigate?: () => void }) {
  const [hovered, setHovered] = useState(0);
  const active = SOLUTIONS[hovered];

  return (
    <div className={panelClass}>
      <ul className="grid gap-1 sm:grid-cols-2">
        {SOLUTIONS.map((solution, index) => (
          <li key={solution.slug}>
            <Link
              href={`/solutions/${solution.slug}`}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onClick={onNavigate}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-md)] p-3 transition-colors duration-[150ms]",
                hovered === index ? "bg-[var(--surface-sunken)]" : "hover:bg-[var(--surface-sunken)]",
              )}
            >
              <span aria-hidden className="text-lg leading-none">{solution.emoji}</span>
              <span className="min-w-0">
                <span className="block text-xs font-extrabold">{solution.name}</span>
                <span className="block truncate text-3xs text-muted">{solution.tagline}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="rounded-[var(--radius-xl)] border border-[var(--border-subtle)] p-5"
        style={{ background: active.accentSoft }}
      >
        <span aria-hidden className="text-2xl">{active.emoji}</span>
        <h3 className="mt-3 text-base font-extrabold">{active.name}</h3>
        <p className="mt-2 text-xs leading-loose text-muted">{active.short}</p>
        <ul className="mt-4 space-y-1.5">
          {active.features.slice(0, 3).map((feature) => (
            <li key={feature.title} className="flex items-center gap-2 text-3xs font-bold">
              <span className="size-1.5 rounded-full" style={{ background: active.accent }} aria-hidden />
              {feature.title}
            </li>
          ))}
        </ul>
        <Link
          href={`/demo/${active.demoSlug}`}
          onClick={onNavigate}
          className="mt-4 inline-flex items-center gap-1.5 text-3xs font-extrabold text-brand-700 hover:underline dark:text-brand-300"
        >
          <PlayCircle className="size-3.5" aria-hidden />
          مشاهده دموی زنده
        </Link>
      </div>

      <div className="flex flex-col justify-between rounded-[var(--radius-xl)] bg-ink-900 p-5 text-white">
        <div>
          <Badge tone="brand" className="bg-white/10 text-white border-white/20">
            <Sparkles className="size-3" aria-hidden />
            ۹ سال تجربه اجرایی
          </Badge>
          <p className="mt-4 text-xs leading-loose text-white/70">
            بیش از ۱۲۰ پروژه در ۸ صنعت مختلف. راهکار شما را با فرایندهای واقعی کسب‌وکارتان تطبیق می‌دهیم.
          </p>
        </div>
        <ButtonLink href="/contact" size="sm" className="mt-5 w-full" onClick={onNavigate}>
          مشاوره رایگان
          <ArrowLeft className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </div>
  );
}

export function ProductsMega({ onNavigate }: { onNavigate?: () => void }) {
  const [hovered, setHovered] = useState(0);
  const active = PRODUCTS[hovered];

  return (
    <div className={panelClass}>
      <ul className="grid gap-1 sm:grid-cols-2">
        {PRODUCTS.map((product, index) => (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              onMouseEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-between gap-2 rounded-[var(--radius-md)] p-3 transition-colors duration-[150ms]",
                hovered === index ? "bg-[var(--surface-sunken)]" : "hover:bg-[var(--surface-sunken)]",
              )}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span aria-hidden>{product.emoji}</span>
                <span className="truncate text-xs font-extrabold">{product.name}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-5xs font-extrabold",
                  product.status === "active" && "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
                  product.status === "beta" && "bg-amber-500/12 text-amber-600 dark:text-amber-300",
                  product.status === "development" && "bg-slate-500/12 text-slate-500 dark:text-slate-300",
                )}
              >
                {PRODUCT_STATUS_LABEL[product.status]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-5">
        <span aria-hidden className="text-2xl">{active.emoji}</span>
        <h3 className="mt-3 text-base font-extrabold">{active.name}</h3>
        <p className="mt-2 text-xs leading-loose text-muted">{active.short}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {active.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-4xs font-bold text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
        <ButtonLink href={`/demo/${active.demoSlug}`} size="sm" variant="soft" className="mt-4 w-full" onClick={onNavigate}>
          <PlayCircle className="size-4" aria-hidden />
          مشاهده دمو زنده
        </ButtonLink>
      </div>

      <div className="flex flex-col justify-between rounded-[var(--radius-xl)] bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white">
        <div>
          <h3 className="text-sm font-extrabold">محصول موردنظرتان نیست؟</h3>
          <p className="mt-3 text-xs leading-loose text-white/75">
            نرم‌افزار اختصاصی متناسب با فرایند دقیق کسب‌وکار شما طراحی و توسعه می‌دهیم.
          </p>
        </div>
        <ButtonLink href="/contact" size="sm" variant="dark" className="mt-5 w-full bg-white text-brand-700 hover:bg-white/90" onClick={onNavigate}>
          سفارشی سفارش دهید
        </ButtonLink>
      </div>
    </div>
  );
}

export function DemoMega({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="glass-panel grid gap-6 rounded-[var(--radius-2xl)] p-6 shadow-[var(--shadow-soft)] lg:grid-cols-3">
      <div>
        <h3 className="mb-3 text-xs font-extrabold text-muted">دموی محصولات</h3>
        <ul className="space-y-1">
          {PRODUCTS.slice(0, 6).map((product) => (
            <li key={product.slug}>
              <Link
                href={`/demo/${product.demoSlug}`}
                onClick={onNavigate}
                className="flex items-center gap-2 rounded-[var(--radius-sm)] p-2 text-2xs font-bold transition-colors hover:bg-[var(--surface-sunken)]"
              >
                <span aria-hidden>{product.emoji}</span>
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/demo" onClick={onNavigate} className="mt-2 inline-block text-3xs font-extrabold text-brand-600 hover:underline">
          مشاهده هر ۱۱ دمو →
        </Link>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold text-muted">دموی مشاغل</h3>
        <ul className="grid grid-cols-2 gap-1">
          {INDUSTRIES.slice(0, 8).map((industry) => (
            <li key={industry.slug}>
              <Link
                href={`/demo/industries/${industry.slug}`}
                onClick={onNavigate}
                className="block rounded-[var(--radius-sm)] p-2 text-2xs font-bold transition-colors hover:bg-[var(--surface-sunken)]"
              >
                {industry.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/demo/industries"
          onClick={onNavigate}
          className="mt-2 inline-block text-3xs font-extrabold text-brand-600 hover:underline"
        >
          گالری کامل ۱۲ صنعت →
        </Link>
      </div>

      <div className="flex flex-col justify-between rounded-[var(--radius-xl)] bg-ink-900 p-5 text-white">
        <div>
          <Badge tone="brand" className="border-white/20 bg-white/10 text-white">
            <Star className="size-3" aria-hidden />
            بدون نصب، بدون ثبت‌نام
          </Badge>
          <p className="mt-4 text-xs leading-loose text-white/70">
            همه دموها مستقیماً در مرورگر اجرا می‌شوند. داده‌ها نمونه هستند و هر لحظه می‌توانید بازنشانی کنید.
          </p>
        </div>
        <ButtonLink href="/contact" size="sm" className="mt-5 w-full" onClick={onNavigate}>
          درخواست دموی اختصاصی
        </ButtonLink>
      </div>
    </div>
  );
}
