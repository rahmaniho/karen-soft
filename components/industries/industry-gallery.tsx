"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import { INDUSTRIES, INDUSTRY_CATEGORIES, type Industry, type IndustryCategory } from "@/lib/industries";
import { cn, toPersianDigits } from "@/lib/utils";

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: { id: Device; label: string; icon: typeof Monitor; width: string }[] = [
  { id: "desktop", label: "دسکتاپ", icon: Monitor, width: "100%" },
  { id: "tablet", label: "تبلت", icon: Tablet, width: "62%" },
  { id: "mobile", label: "موبایل", icon: Smartphone, width: "34%" },
];

function Preview({ industry, device }: { industry: Industry; device: Device }) {
  const p = industry.palette;
  const width = DEVICES.find((d) => d.id === device)!.width;
  return (
    <div className="grid place-items-center overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-sunken)] p-3">
      <div
        className="w-full origin-top overflow-hidden rounded-[var(--radius-md)] border transition-[width] duration-[420ms] ease-out"
        style={{ width, background: p.bg, borderColor: p.border }}
      >
        <div className="flex h-7 items-center gap-1.5 border-b px-2.5" style={{ borderColor: p.border, background: p.surface }}>
          <span className="size-1.5 rounded-full bg-rose-400" aria-hidden />
          <span className="size-1.5 rounded-full bg-amber-400" aria-hidden />
          <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
        </div>
        <div className="p-3" style={{ background: p.gradient }}>
          <span className="block text-5xs font-extrabold" style={{ color: p.primary }}>
            {industry.hero.badge}
          </span>
          <strong className="mt-1.5 block text-2xs leading-snug" style={{ color: p.text }}>
            {industry.hero.title} {industry.hero.highlight}
          </strong>
          <span className="mt-2 inline-block rounded-md px-2.5 py-1 text-6xs font-bold" style={{ background: p.primary, color: p.onPrimary }}>
            {industry.hero.primaryCta}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {industry.gallery.slice(0, 3).map((item) => (
            <span key={item.title} className="block aspect-square rounded-md" style={{ background: item.hue }} aria-hidden />
          ))}
        </div>
      </div>
    </div>
  );
}

export function IndustryGallery() {
  const [category, setCategory] = useState<IndustryCategory | "all">("all");
  const [device, setDevice] = useState<Device>("desktop");

  const visible = useMemo(
    () => (category === "all" ? INDUSTRIES : INDUSTRIES.filter((industry) => industry.category === category)),
    [category],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {INDUSTRY_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              aria-pressed={category === item.id}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-2xs font-bold transition-colors duration-[150ms]",
                category === item.id
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-[var(--border-subtle)] text-muted hover:border-brand-300 hover:text-brand-600",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-full border border-[var(--border-subtle)] p-1" role="group" aria-label="پیش‌نمایش دستگاه">
          {DEVICES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDevice(item.id)}
              aria-pressed={device === item.id}
              title={item.label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-3xs font-bold transition-colors",
                device === item.id ? "bg-brand-500 text-white" : "text-muted hover:text-brand-600",
              )}
            >
              <item.icon className="size-3.5" aria-hidden />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mb-5 text-2xs text-muted persian-num">
        {toPersianDigits(visible.length)} نمونه طراحی نمایش داده می‌شود.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((industry) => (
          <article key={industry.slug} className="surface-card overflow-hidden p-4">
            <Preview industry={industry} device={device} />
            <div className="mt-4">
              <span className="text-4xs font-extrabold text-brand-600">{industry.categoryLabel}</span>
              <h3 className="mt-1 text-sm font-extrabold">{industry.name}</h3>
              <p className="mt-1.5 text-3xs leading-loose text-muted">{industry.aesthetic}</p>
              <Link
                href={`/demo/industries/${industry.slug}`}
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-[var(--radius-sm)] bg-brand-500 text-2xs font-extrabold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                مشاهده نمونه کامل
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-2xs text-muted">
        <Laptop className="size-4" aria-hidden />
        هر نمونه یک صفحه کامل و مستقل است؛ رنگ، تایپوگرافی و حس حرکتی آن مخصوص همان صنعت طراحی شده.
      </p>
    </div>
  );
}
