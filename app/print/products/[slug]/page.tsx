import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Lightbulb, Timer, Zap } from "lucide-react";
import { chapPageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_PRODUCT_BY_SLUG, PRINT_PRODUCTS, PRINT_TILE_ICONS, productsOfService } from "@/lib/print/data/products";
import { PRINT_SERVICE_BY_SLUG } from "@/lib/print/data/services";
import { optionsOf } from "@/lib/print/order";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/print/product-card";
import { ChapIcon } from "@/components/print/chap-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, printProductServiceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return PRINT_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRINT_PRODUCT_BY_SLUG[slug];
  if (!product) notFound();
  return chapPageMeta({
    title: `چاپ ${product.name} در قزوین | ${CHAP.name}`,
    description: `${product.description} زمان تحویل: ${product.turnaround}.`,
    path: `/print/products/${slug}`,
    images: product.image ? [product.image] : undefined,
  });
}

export default async function ChapProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRINT_PRODUCT_BY_SLUG[slug];
  if (!product) notFound();

  const service = PRINT_SERVICE_BY_SLUG[product.service];
  const related = productsOfService(product.service)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <section className="container-page pt-10 lg:pt-14">
        <nav aria-label="مسیر صفحه" className="mb-8 flex flex-wrap items-center gap-2 text-5xs text-muted">
          <Link href="/print" className="hover:text-[color:var(--text-primary)]">
            کارن چاپ
          </Link>
          <span aria-hidden>/</span>
          <Link href="/print/services" className="hover:text-[color:var(--text-primary)]">
            خدمات
          </Link>
          {service ? (
            <>
              <span aria-hidden>/</span>
              <Link href={`/print/services/${service.slug}`} className="hover:text-[color:var(--text-primary)]">
                {service.title}
              </Link>
            </>
          ) : null}
          <span aria-hidden>/</span>
          <span className="font-bold text-[color:var(--text-primary)]">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            {service ? (
              <Link
                href={`/print/services/${service.slug}`}
                className="group inline-flex items-center gap-2 text-3xs font-bold text-muted hover:text-[color:var(--text-primary)]"
              >
                <ChapIcon name={service.icon} className="size-4" />
                {service.title}
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" aria-hidden />
              </Link>
            ) : null}
            <h1 className="display-1 mt-3">
              <span aria-hidden>{product.emoji}</span> {product.name}
            </h1>
            <p className="text-md mt-4 leading-loose text-muted">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-sunken)] px-3 py-1.5 text-3xs font-bold">
                <Timer className="size-3.5" aria-hidden />
                {product.turnaround}
              </span>
              {product.rushTurnaround ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cmyk-y)]/25 px-3 py-1.5 text-3xs font-bold">
                  <Zap className="size-3.5" aria-hidden />
                  فوری: {product.rushTurnaround}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={`/print/order/${product.slug}`}
                size="lg"
                className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                پیکربند و ثبت سفارش
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/print/portfolio" size="lg" variant="outline">
                دیدن نمونه‌کارها
              </ButtonLink>
            </div>

            {product.tips.length ? (
              <aside className="mt-10 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Lightbulb className="size-4 text-[var(--color-cmyk-y)]" aria-hidden />
                  نکته‌های چاپی
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {product.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-2xs leading-loose">
                      <Check className="mt-1 size-3.5 shrink-0 text-emerald-600" aria-hidden />
                      {tip}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>

          <div className="lg:sticky lg:top-28">
            {product.image ? (
              <figure className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {PRINT_TILE_ICONS[product.slug] ? (
                  <span className="absolute bottom-3 start-3 size-16 overflow-hidden rounded-[var(--radius-lg)] border border-white/50 bg-white/90 shadow-[var(--shadow-lift)]">
                    <Image src={PRINT_TILE_ICONS[product.slug]} alt="" fill sizes="64px" className="object-contain p-1.5" />
                  </span>
                ) : null}
              </figure>
            ) : null}

            <div className="mt-5 space-y-3">
              <h2 className="text-sm font-bold">گزینه‌هایی که باید تعیین کنید</h2>
              {product.fields.map((field) => {
                const options = optionsOf(field);
                return (
                  <div
                    key={field.key}
                    className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-4"
                  >
                    <p className="flex items-center gap-2 text-2xs font-bold">
                      {field.label}
                      {field.required ? (
                        <span className="text-5xs text-brand-600 dark:text-brand-300">الزامی</span>
                      ) : null}
                    </p>
                    {options.length ? (
                      <p className="mt-1.5 text-5xs leading-relaxed text-muted">
                        {options
                          .slice(0, 8)
                          .map((o) => o.label)
                          .join(" · ")}
                        {options.length > 8 ? ` · و ${options.length - 8} گزینهٔ دیگر` : ""}
                      </p>
                    ) : field.hint ? (
                      <p className="mt-1.5 text-5xs leading-relaxed text-muted">{field.hint}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section-y">
          <div className="container-page">
            <h2 className="display-3">محصولات همین خانوادۀ خدمت</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <JsonLd
        data={[
          printProductServiceSchema(product, service),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "کارن چاپ", path: "/print" },
            { name: "خدمات", path: "/print/services" },
            ...(service ? [{ name: service.title, path: `/print/services/${service.slug}` }] : []),
            { name: product.name, path: `/print/products/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
