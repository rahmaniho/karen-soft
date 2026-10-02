import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { CHAP } from "@/lib/print/site";
import { PRINT_SERVICES } from "@/lib/print/data/services";

export default function ChapNotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-16">
      <div className="max-w-xl text-center">
        <p className="font-titr text-6xl leading-none text-[color:var(--text-primary)]">۴۰۴</p>
        <div className="cmyk-strip mx-auto mt-5 max-w-40" aria-hidden>
          <span style={{ background: "var(--color-cmyk-c)" }} />
          <span style={{ background: "var(--color-cmyk-m)" }} />
          <span style={{ background: "var(--color-cmyk-y)" }} />
          <span style={{ background: "var(--color-cmyk-k)" }} />
        </div>
        <h1 className="display-3 mt-6">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
        <p className="lead mx-auto mt-3">
          شاید آدرس تغییر کرده باشد. از فهرست زیر بخش موردنظر را انتخاب کنید یا به صفحۀ اول {CHAP.name} برگردید.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/print"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] bg-ink-900 px-5 text-2xs font-bold text-white dark:bg-white dark:text-ink-900"
          >
            <Home className="size-4" aria-hidden />
            بازگشت به خانه
          </Link>
          <Link
            href="/print/order"
            className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-5 text-2xs font-bold transition-colors hover:border-ink-900/40"
          >
            <Search className="size-4" aria-hidden />
            ثبت سفارش
          </Link>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {PRINT_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/print/services/${service.slug}`}
                className="rounded-full border border-[var(--border-subtle)] px-3.5 py-2 text-3xs font-bold text-muted transition-colors hover:text-[color:var(--text-primary)]"
              >
                {service.title}
                <ArrowLeft className="inline size-3" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
