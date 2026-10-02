"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, MessageCircle, Phone, RefreshCw, Send, TriangleAlert } from "lucide-react";
import { CHAP } from "@/lib/print/site";
import {
  buildOrderText,
  defaultValues,
  filledCount,
  isVisible,
  orderGroups,
  smsHref,
  trackingCode,
  validate,
  whatsappHref,
  type OrderErrors,
} from "@/lib/print/order";
import type { OrderValues, PrintProduct } from "@/lib/print/types";
import { OrderField } from "@/components/print/order-field";
import { toPersianDigits } from "@/lib/utils";

interface Draft {
  values: OrderValues;
  savedAt?: number;
}

const draftKey = (slug: string) => `karen-chap:order:${slug}`;

export function OrderBuilder({ product, serviceName }: { product: PrintProduct; serviceName: string }) {
  const [values, setValues] = useState<OrderValues>(() => defaultValues(product));
  const [errors, setErrors] = useState<OrderErrors>({});
  const [done, setDone] = useState<{ code: string; text: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [restored, setRestored] = useState(false);
  const rootRef = useRef<HTMLFormElement>(null);

  /* بازیابی پیش‌نویس پیشین */
  useEffect(() => {
    setValues(defaultValues(product));
    setErrors({});
    setDone(null);
    setRestored(false);
    try {
      const raw = localStorage.getItem(draftKey(product.slug));
      if (raw) {
        const draft = JSON.parse(raw) as Draft;
        if (draft?.values) {
          setValues({ ...defaultValues(product), ...draft.values });
          setRestored(true);
        }
      }
    } catch {
      /* localStorage در دسترس نیست */
    }
  }, [product]);

  /* ذخیرۀ خودکار پیش‌نویس */
  useEffect(() => {
    if (done) return;
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(draftKey(product.slug), JSON.stringify({ values, savedAt: Date.now() }));
      } catch {
        /* noop */
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [values, product.slug, done]);

  const groups = useMemo(() => orderGroups(product), [product]);
  const progress = useMemo(() => filledCount(product, values), [product, values]);
  const preview = useMemo(() => buildOrderText(product, serviceName, values, "—"), [product, serviceName, values]);

  const setValue = useCallback((key: string, value: OrderValues[string]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate(product, values);
    setErrors(found);
    const keys = Object.keys(found);
    if (keys.length) {
      const node = rootRef.current?.querySelector<HTMLElement>(`[data-field="${keys[0]}"]`);
      node?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const code = trackingCode();
    setDone({ code, text: buildOrderText(product, serviceName, values, code) });
  };

  const reset = () => {
    try {
      localStorage.removeItem(draftKey(product.slug));
    } catch {
      /* noop */
    }
    setValues(defaultValues(product));
    setErrors({});
    setDone(null);
    setRestored(false);
  };

  const copy = async () => {
    if (!done) return;
    try {
      await navigator.clipboard.writeText(done.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 100;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      <form ref={rootRef} onSubmit={submit} noValidate className="space-y-5">
        {restored ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-2.5 text-3xs font-bold text-muted"
          >
            <RefreshCw className="size-3.5" aria-hidden />
            پیش‌نویس قبلی این محصول بازیابی شد.
          </motion.p>
        ) : null}

        {groups.map((group, groupIndex) => {
          const fields = group.fields.filter((field) => isVisible(field, values));
          if (!fields.length) return null;
          return (
            <section
              key={group.title}
              className="surface-card scroll-mt-28 p-5 sm:p-7"
              aria-labelledby={`order-group-${groupIndex}`}
            >
              <header className="mb-5 flex items-center gap-3">
                <span className="sec-index">{toPersianDigits(String(groupIndex + 1).padStart(2, "0"))}</span>
                <h2 id={`order-group-${groupIndex}`} className="text-base font-bold">
                  {group.title}
                </h2>
                <span className="rule-hair me-auto flex-1" aria-hidden />
              </header>
              <div className="space-y-6">
                {fields.map((field) => (
                  <div key={field.key} data-field={field.key}>
                    <OrderField
                      field={field}
                      value={values[field.key]}
                      error={errors[field.key]}
                      onChange={(value) => setValue(field.key, value)}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-ink-900 px-6 text-sm font-bold text-white transition-all duration-[200ms] hover:-translate-y-0.5 hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100"
          >
            <Send className="size-4" aria-hidden />
            ثبت سفارش و دریافت کد پیگیری
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-4 text-2xs font-bold text-muted transition-colors hover:text-[color:var(--text-primary)]"
          >
            <RefreshCw className="size-3.5" aria-hidden />
            پاک کردن فرم
          </button>
          <a
            href={`tel:${CHAP.tel}`}
            className="inline-flex h-12 items-center gap-2 px-2 text-2xs font-bold text-muted hover:text-[color:var(--text-primary)]"
          >
            <Phone className="size-3.5" aria-hidden />
            <span dir="ltr" className="persian-num">
              {CHAP.phone}
            </span>
          </a>
        </div>
      </form>

      {/* خلاصۀ زنده */}
      <aside className="lg:sticky lg:top-28">
        <div className="surface-card overflow-hidden">
          <div className="cmyk-strip rounded-none" aria-hidden>
            <span style={{ background: "var(--color-cmyk-c)" }} />
            <span style={{ background: "var(--color-cmyk-m)" }} />
            <span style={{ background: "var(--color-cmyk-y)" }} />
            <span style={{ background: "var(--color-cmyk-k)" }} />
          </div>
          <div className="p-6">
            <p className="text-5xs font-bold uppercase tracking-[0.24em] text-muted">خلاصۀ سفارش</p>
            <h2 className="mt-2 font-titr text-lg leading-snug">
              {product.emoji} {product.name}
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface-sunken)]">
                <motion.div
                  className="h-full rounded-full bg-ink-900 dark:bg-white"
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className="persian-num text-5xs font-bold text-muted">
                {toPersianDigits(progress.done)}/{toPersianDigits(progress.total)}
              </span>
            </div>

            <dl className="mt-5 divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {previewRows(preview).map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-3 py-2.5">
                  <dt className="shrink-0 text-5xs text-muted">{row.label}</dt>
                  <dd className="text-3xs font-bold text-end">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 flex items-start gap-2 text-5xs leading-relaxed text-muted">
              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden />
              پیش‌فاکتور پس از بررسی اعلام می‌شود؛ پرداخت و ارسال فایل بعد از تأیید انجام می‌گیرد.
            </p>
            <p className="mt-2 flex items-start gap-2 text-5xs leading-relaxed text-muted">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber-500" aria-hidden />
              فایل چاپی را بعد از ثبت، از طریق واتساپ یا ایمیل بفرستید.
            </p>
          </div>
        </div>

        <p className="mt-4 text-5xs leading-relaxed text-muted">
          تردید دارید؟ ابتدا{" "}
          <Link href="/print/portfolio" className="font-bold text-brand-600 underline-offset-4 hover:underline">
            نمونه‌کارها
          </Link>{" "}
          را ببینید یا با{" "}
          <Link href="/print/services" className="font-bold text-brand-600 underline-offset-4 hover:underline">
            فهرست خدمات
          </Link>{" "}
          گزینه‌ها را مقایسه کنید.
        </p>
      </aside>

      {/* مودال ثبت */}
      <AnimatePresence>
        {done ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] grid place-items-center overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="سفارش آماده ارسال است"
          >
            <motion.div
              initial={{ scale: 0.96, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg overflow-hidden rounded-[var(--radius-2xl)] bg-[var(--surface-raised)] shadow-[var(--shadow-lift)]"
            >
              <div className="border-b border-[var(--border-subtle)] p-6">
                <p className="text-5xs font-bold uppercase tracking-[0.24em] text-emerald-600">آماده ارسال</p>
                <h2 className="mt-2 font-titr text-xl leading-snug">سفارش {product.name} آماده است</h2>
                <p className="mt-2 text-3xs leading-loose text-muted">
                  برای نهایی شدن، پیام زیر را با یکی از روش‌های زیر برای کارن چاپ بفرستید.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--surface-sunken)] px-3 py-1.5 text-2xs font-bold">
                  کد پیگیری
                  <span className="persian-num font-titr text-sm">{done.code}</span>
                </p>
              </div>

              <div className="max-h-64 overflow-y-auto bg-[var(--surface-sunken)] p-5">
                <pre dir="rtl" className="whitespace-pre-wrap break-words text-3xs leading-loose">
                  {done.text}
                </pre>
              </div>

              <div className="grid gap-2 p-6 sm:grid-cols-2">
                <a
                  href={whatsappHref(done.text, CHAP.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-emerald-500 text-white transition-transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  ارسال در واتساپ
                </a>
                <a
                  href={smsHref(done.text, CHAP.tel)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-ink-900 text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-ink-900"
                >
                  <Send className="size-4" aria-hidden />
                  ارسال با پیامک
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-2xs font-bold transition-colors hover:border-ink-900"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-500" aria-hidden />
                  ) : (
                    <Copy className="size-4" aria-hidden />
                  )}
                  {copied ? "کپی شد" : "کپی متن سفارش"}
                </button>
                <a
                  href={`tel:${CHAP.tel}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] text-2xs font-bold transition-colors hover:border-ink-900"
                >
                  <Phone className="size-4" aria-hidden />
                  تماس مستقیم
                </a>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-6 py-4">
                <button
                  type="button"
                  onClick={reset}
                  className="text-2xs font-bold text-muted transition-colors hover:text-[color:var(--text-primary)]"
                >
                  ثبت سفارش جدید
                </button>
                <button
                  type="button"
                  onClick={() => setDone(null)}
                  className="text-2xs font-bold text-brand-600 hover:underline"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** خلاصۀ قابل‌مطالعه از متن سفارش، برای ستون کناری */
function previewRows(text: string) {
  const rows: { label: string; value: string }[] = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("—") || !line.trim()) continue;
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const label = line.slice(0, idx).replace("کد پیگیری", "کد").trim();
    const value = line.slice(idx + 1).trim();
    if (!value || value === "—") continue;
    rows.push({ label, value });
  }
  return rows.slice(0, 10);
}
