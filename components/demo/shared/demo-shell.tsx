"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Info,
  LayoutGrid,
  RotateCcw,
  X,
} from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { contrastText } from "@/lib/colors";
import { cn } from "@/lib/utils";

export interface DemoModule {
  id: string;
  label: string;
  hint: string;
  content: ReactNode;
}

export interface DemoShellProps {
  productSlug: string;
  productName: string;
  emoji: string;
  accent: string;
  modules: DemoModule[];
  logoSrc?: string;
  orderHref?: string;
  orderLabel?: string;
  onReset?: () => void;
}

export function DemoShell({ productSlug, productName, emoji, accent, modules, logoSrc, orderHref, orderLabel, onReset }: DemoShellProps) {
  const storageKey = `karen-demo:${productSlug}:module`;
  const [active, setActive] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  useFocusTrap(infoRef, drawerOpen);
  useEffect(() => {
    if (loadedKey === storageKey) return;
    try {
      const stored = sessionStorage.getItem(storageKey);
      const index = modules.findIndex(m => m.id === stored);
      if (index >= 0) setActive(index);
    } catch { /* Storage is optional in private browsing. */ }
    setLoadedKey(storageKey);
  }, [storageKey, loadedKey, modules]);
  useEffect(() => {
    if (loadedKey !== storageKey) return;
    try { if (modules[active]) sessionStorage.setItem(storageKey, modules[active].id); } catch {}
  }, [active, modules, storageKey, loadedKey]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") {setDrawerOpen(false);setNavOpen(false);} };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const current = modules[active]!;

  return (
    <div className="min-h-dvh bg-[var(--surface)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--surface-raised)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            className="grid size-9 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] lg:hidden"
            aria-label="ماژول‌ها"
            aria-expanded={navOpen}
          >
            <LayoutGrid className="size-4" aria-hidden />
          </button>

          <span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-3xs font-extrabold text-white"
            style={{ background: accent, color: contrastText(accent) }}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-white" aria-hidden />
            دموی زنده
          </span>

          <h1 className="flex min-w-0 items-center gap-2 truncate text-xs font-extrabold">
            {logoSrc ? (
              <Image src={logoSrc} alt="" width={30} height={30} className="size-7 shrink-0 rounded-md object-contain" />
            ) : (
              <span aria-hidden>{emoji}</span>
            )}
            <span className="truncate">{productName}</span>
          </h1>

          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onReset?.();
                try { sessionStorage.removeItem(storageKey); } catch {}
                setActive(0);
              }}
              className="hidden h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold text-muted transition-colors hover:border-brand-400 hover:text-brand-600 sm:inline-flex"
            >
              <RotateCcw className="size-3.5" aria-hidden />
              بازنشانی دمو
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="راهنمای دمو"
              className="grid size-9 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-muted transition-colors hover:border-brand-400 hover:text-brand-600"
            >
              <Info className="size-4" aria-hidden />
            </button>
            <Link
              href={`/products/${productSlug}`}
              className="hidden h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold transition-colors hover:border-brand-400 hover:text-brand-600 md:inline-flex"
            >
              <ArrowRight className="size-3.5" aria-hidden />
              صفحه محصول
            </Link>
            <Link
              href={orderHref ?? "/contact"}
              className="inline-flex h-9 items-center rounded-[var(--radius-sm)] bg-brand-600 px-3 text-3xs font-extrabold text-white transition-colors hover:bg-brand-500"
            >
              {orderLabel ?? "درخواست نسخه کامل"}
            </Link>
          </div>
        </div>

        <nav aria-label="مسیر" className="flex items-center gap-1.5 border-t border-[var(--border-subtle)] px-4 py-2 text-4xs text-muted">
          <Link href="/demo" className="hover:text-brand-600">هاب دموها</Link>
          <span aria-hidden>/</span>
          <Link href={`/products/${productSlug}`} className="hover:text-brand-600">{productName}</Link>
          <span aria-hidden>/</span>
          <span className="font-bold text-[color:var(--text-primary)]">{current.label}</span>
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar — visually at the start (right in RTL) */}
        <aside
          className={cn(
            "z-20 w-64 shrink-0 border-e border-[var(--border-subtle)] bg-[var(--surface-raised)] p-3",
            "max-lg:fixed max-lg:inset-y-0 max-lg:start-0 max-lg:top-[97px] max-lg:transition-transform",
            navOpen ? "max-lg:translate-x-0" : "max-lg:translate-x-full max-lg:pointer-events-none lg:pointer-events-auto",
            "lg:sticky lg:top-[97px] lg:h-[calc(100dvh-97px)] lg:translate-x-0 lg:overflow-y-auto",
          )}
        >
          <p className="px-3 pb-2 pt-1 text-4xs font-extrabold text-muted">ماژول‌ها</p>
          <ul className="space-y-1">
            {modules.map((module, index) => (
              <li key={module.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(index);
                    setNavOpen(false);
                  }}
                  aria-current={active === index ? "page" : undefined}
                  className={cn(
                    "w-full rounded-[var(--radius-sm)] px-3 py-2.5 text-start text-2xs font-bold transition-colors",
                    active === index ? "text-white" : "text-muted hover:bg-[var(--surface-sunken)]",
                  )}
                  style={active === index ? { background: accent, color: contrastText(accent) } : undefined}
                >
                  <span className="me-2 persian-num opacity-90">{index + 1}</span>
                  {module.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="p-4 pb-28 lg:p-6 lg:pb-28">
            <div key={current.id} className="animate-reveal">
              <div className="mb-5">
                <h2 className="text-lg font-extrabold">{current.label}</h2>
                <p className="mt-1 text-2xs text-muted">{current.hint}</p>
              </div>
              {current.content}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tour controls */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border-subtle)] bg-[var(--surface-raised)]/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-3xs text-muted persian-num">
            گام {active + 1} از {modules.length}
          </span>
          <div className="mx-2 hidden h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)] sm:block">
            <span
              className="block h-full rounded-full transition-all duration-[450ms]"
              style={{ width: `${((active + 1) / modules.length) * 100}%`, background: accent }}
            />
          </div>
          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive(0)}
              className="h-9 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold text-muted hover:text-brand-600"
            >
              شروع دوباره
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
              className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold disabled:opacity-40"
            >
              <ChevronRight className="size-3.5" aria-hidden />
              قبلی
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => Math.min(modules.length - 1, i + 1))}
              disabled={active === modules.length - 1}
              className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] px-4 text-3xs font-extrabold text-white disabled:opacity-40"
              style={{ background: accent, color: contrastText(accent) }}
            >
              بعدی
              <ChevronLeft className="size-3.5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Info drawer */}
      {drawerOpen ? (
        <div ref={infoRef} className="fixed inset-0 z-40 flex" role="dialog" aria-modal="true" aria-label="راهنمای دمو">
          <button type="button" aria-label="بستن راهنما" className="flex-1 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="w-full max-w-sm overflow-y-auto border-s border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold">چیزی که می‌بینید یک دمو است</h2>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="بستن"
                className="grid size-8 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)]"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="mt-5 space-y-4 text-2xs leading-loose text-muted">
              <p>
                تمام داده‌های این صفحه نمونه و ساختگی هستند و هیچ اتصالی به سرور واقعی ندارند. تغییرات شما فقط در
                همین مرورگر ذخیره می‌شود و با دکمه «بازنشانی دمو» پاک می‌گردد.
              </p>
              <p>
                در نسخه واقعی، همین ماژول‌ها به پایگاه داده اختصاصی شما، درگاه پرداخت، سامانه پیامک و گزارش‌های
                مدیریتی متصل می‌شوند.
              </p>
              <ul className="space-y-2">
                {modules.map((module) => (
                  <li key={module.id} className="rounded-[var(--radius-sm)] bg-[var(--surface-sunken)] p-3">
                    <strong className="block text-3xs text-[color:var(--text-primary)]">{module.label}</strong>
                    {module.hint}
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] text-2xs font-extrabold text-white"
              style={{ background: accent, color: contrastText(accent) }}
            >
              درخواست نسخه کامل
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
