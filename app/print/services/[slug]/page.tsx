import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { chapPageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_SERVICES, PRINT_SERVICE_BY_SLUG } from "@/lib/print/data/services";
import { productsOfService } from "@/lib/print/data/products";
import { PRINT_WORKS } from "@/lib/print/data/works";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { ChapIcon } from "@/components/print/chap-icon";
import { ProductCard } from "@/components/print/product-card";
import { WorkGallery } from "@/components/print/work-gallery";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, chapServiceSchema, faqSchema, itemListSchema } from "@/lib/schema";

export function generateStaticParams() {
  return PRINT_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = PRINT_SERVICE_BY_SLUG[slug];
  if (!service) notFound();
  return chapPageMeta({
    title: `${service.title} | ${CHAP.name}`,
    description: `${service.title} در کارن چاپِ الوند، قزوین؛ ${service.short}. امکان ارسال سفارش به سراسر ایران.`,
    path: `/print/services/${slug}`,
    images: [service.image],
  });
}

export default async function ChapServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = PRINT_SERVICE_BY_SLUG[slug];
  if (!service) notFound();

  const products = productsOfService(service.slug);
  const works = PRINT_WORKS.filter((work) => service.workCats.includes(work.category)).slice(0, 3);
  const galleryWorks = works.length ? works : PRINT_WORKS.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="container-page relative grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap items-center gap-2 text-5xs text-muted">
              <Link href="/print" className="hover:text-[color:var(--text-primary)]">
                کارن چاپ
              </Link>
              <span aria-hidden>/</span>
              <Link href="/print/services" className="hover:text-[color:var(--text-primary)]">
                خدمات
              </Link>
              <span aria-hidden>/</span>
              <span className="font-bold text-[color:var(--text-primary)]">{service.title}</span>
            </nav>

            <span className="flex items-center gap-2 text-brand-600 dark:text-brand-300">
              <ChapIcon name={service.icon} className="size-5" />
              <span className="eyebrow">Service</span>
            </span>
            <h1 className="display-1 mt-4">{service.title}</h1>
            <p className="lead mt-5">{service.description}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-2xs font-bold leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={`/print/order${products[0] ? `/${products[0].slug}` : ""}`}
                size="lg"
                className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                ثبت سفارش این خدمت
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
              <a
                href={`tel:${CHAP.tel}`}
                className="inline-flex h-14 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-5 text-2xs font-bold transition-colors hover:border-ink-900/40"
              >
                <Phone className="size-4" aria-hidden />
                <span dir="ltr" className="persian-num">
                  {CHAP.phone}
                </span>
              </a>
            </div>
          </div>

          <figure className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="cmyk-strip rounded-none" aria-hidden>
              <span style={{ background: "var(--color-cmyk-c)" }} />
              <span style={{ background: "var(--color-cmyk-m)" }} />
              <span style={{ background: "var(--color-cmyk-y)" }} />
              <span style={{ background: "var(--color-cmyk-k)" }} />
            </figcaption>
          </figure>
        </div>
      </section>

      {products.length ? (
        <section className="section-y">
          <div className="container-page">
            <h2 className="display-3">محصولات این خدمت</h2>
            <p className="lead mt-3">
              روی هر محصول بزنید تا گزینه‌های دقیق همان محصول را ببینید؛ {products.length} محصول قابل سفارش.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-raised)] py-14 lg:py-20">
        <div className="container-page">
          <h2 className="display-3">نمونه‌کارهای مرتبط</h2>
          <div className="mt-8">
            <WorkGallery works={galleryWorks} compact />
          </div>
        </div>
      </section>

      {service.faqs.length ? (
        <section className="section-y" id="faq">
          <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 className="display-3 mt-3">پرسش‌های همین خدمت</h2>
              <Link
                href="/print/faq"
                className="mt-4 inline-flex items-center gap-1.5 text-2xs font-bold text-brand-600 hover:underline dark:text-brand-300"
              >
                همه سؤالات
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
            <Accordion items={service.faqs} />
          </div>
        </section>
      ) : null}

      <JsonLd
        data={[
          chapServiceSchema({
            name: service.title,
            description: service.description,
            path: `/print/services/${service.slug}`,
            serviceType: service.short,
          }),
          itemListSchema(`${service.title} — محصولات قابل سفارش`, products.map((product) => ({
            name: product.name,
            url: `/print/products/${product.slug}`,
          }))),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "کارن چاپ", path: "/print" },
            { name: "خدمات", path: "/print/services" },
            { name: service.title, path: `/print/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
