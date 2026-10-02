import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_PRODUCTS, PRINT_PRODUCT_BY_SLUG } from "@/lib/print/data/products";
import { PRINT_SERVICE_BY_SLUG } from "@/lib/print/data/services";
import { OrderBuilder } from "@/components/print/order-builder";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return PRINT_PRODUCTS.map((product) => ({ product: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product: slug } = await params;
  const product = PRINT_PRODUCT_BY_SLUG[slug];
  if (!product) return {};
  return pageMeta({
    title: `سفارش ${product.name} | ${CHAP.name}`,
    description: `پیکربند و ثبت آنلاین سفارش ${product.name}: ${product.description}`,
    path: `/print/order/${slug}`,
    noIndex: false,
  });
}

export default async function ChapOrderPage({ params }: { params: Promise<{ product: string }> }) {
  const { product: slug } = await params;
  const product = PRINT_PRODUCT_BY_SLUG[slug];
  if (!product) notFound();

  const service = PRINT_SERVICE_BY_SLUG[product.service];

  return (
    <>
      <section className="container-page pt-10 lg:pt-14">
        <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap items-center gap-2 text-5xs text-muted">
          <Link href="/print" className="hover:text-[color:var(--text-primary)]">
            کارن چاپ
          </Link>
          <span aria-hidden>/</span>
          <Link href="/print/order" className="hover:text-[color:var(--text-primary)]">
            ثبت سفارش
          </Link>
          <span aria-hidden>/</span>
          <span className="font-bold text-[color:var(--text-primary)]">{product.name}</span>
        </nav>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">Order · {CHAP.nameEn}</span>
            <h1 className="display-2 mt-3">
              <span aria-hidden>{product.emoji}</span> سفارش {product.name}
            </h1>
            <p className="lead mt-4">{product.description}</p>
            {service ? (
              <Link
                href={`/print/services/${service.slug}`}
                className="mt-3 inline-flex items-center gap-1.5 text-3xs font-bold text-brand-600 hover:underline dark:text-brand-300"
              >
                خانوادۀ خدمت: {service.title}
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            ) : null}
          </div>
          <p className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-3 text-3xs leading-relaxed text-muted lg:max-w-72">
            فرم را پر کنید؛ در پایان یک کد پیگیری می‌گیرید و همین متن را با یک لمس در واتساپ یا پیامک برای ما بفرستید.
          </p>
        </div>

        {/* جابه‌جایی سریع میان محصولات */}
        <div className="scrollbar-thin -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2">
          {PRINT_PRODUCTS.map((item) => (
            <Link
              key={item.slug}
              href={`/print/order/${item.slug}`}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 text-3xs font-bold transition-colors",
                item.slug === product.slug
                  ? "border-transparent bg-ink-950 text-white dark:bg-white dark:text-ink-950"
                  : "border-[var(--border-subtle)] bg-[var(--surface-raised)] text-muted hover:text-[color:var(--text-primary)]",
              )}
            >
              <span aria-hidden>{item.emoji}</span> {item.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <OrderBuilder product={product} serviceName={service?.title ?? ""} />
        </div>
      </section>
    </>
  );
}
