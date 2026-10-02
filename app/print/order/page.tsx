import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { ChapHeading } from "@/components/print/chap-heading";
import { ChapIcon } from "@/components/print/chap-icon";
import { ProductCard } from "@/components/print/product-card";

export const metadata = pageMeta({
  title: `ثبت سفارش آنلاین | ${CHAP.name}`,
  description:
    "محصول موردنظر را انتخاب کنید و با پیکربند دقیق (کاغذ، سایز، تیراژ، روکش، تحویل) سفارش را ثبت کنید؛ کد پیگیری می‌گیرید و با واتساپ یا پیامک می‌فرستید.",
  path: "/print/order",
});

export default function ChapOrderHubPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <ChapHeading
          latin="Order builder"
          fa="پیکربند سفارش"
          title="اول محصول، بعد مشخصات"
          description="هر محصول پرسش‌های خودش را دارد. یکی را انتخاب کنید تا فرم همان محصول برایتان باز شود — بدون ثبت‌نام، پیش‌فاکتور بعد از بررسی اعلام می‌شود."
        />
      </section>

      <section className="container-page pb-20">
        <div className="space-y-12">
          {PRINT_SERVICES.map((service) => {
            const products = PRINT_PRODUCTS.filter((product) => product.service === service.slug);
            if (!products.length) return null;
            return (
              <div key={service.slug}>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-raised)] text-brand-600 ring-1 ring-[var(--border-subtle)] dark:text-brand-300">
                    <ChapIcon name={service.icon} className="size-4" />
                  </span>
                  <h2 className="text-base font-bold">
                    <Link href={`/print/services/${service.slug}`} className="hover:underline">
                      {service.title}
                    </Link>
                  </h2>
                  <span className="rule-hair me-auto hidden flex-1 sm:block" aria-hidden />
                  <Link
                    href="/print/services"
                    className="hidden items-center gap-1 text-3xs font-bold text-muted hover:text-[color:var(--text-primary)] sm:inline-flex"
                  >
                    همه خدمات
                    <ArrowLeft className="size-3.5" aria-hidden />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product.slug} product={product} href={`/print/order/${product.slug}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-2xl)] bg-ink-950 px-8 py-8 text-white">
          <div>
            <h2 className="font-titr text-lg">سفارش‌تان در لیست نیست؟</h2>
            <p className="mt-2 max-w-xl text-2xs leading-loose text-white/70">
              هر چیز دیگری که روی کاغذ، پارچه یا سطحی چاپ می‌شود را برای ما بنویسید؛ کارشناس ما راهنمایی و پیش‌فاکتور
              ارسال می‌کند.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/print/order/other"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] bg-white px-5 text-2xs font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
            >
              ثبت سفارش دلخواه
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
            <a
              href={`tel:${CHAP.tel}`}
              dir="ltr"
              className="persian-num inline-flex h-12 items-center gap-2 rounded-[var(--radius-md)] border border-white/25 px-5 text-2xs font-bold transition-colors hover:border-white/60"
            >
              {CHAP.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
