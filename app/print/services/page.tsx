import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { productsOfService } from "@/lib/print/data/products";
import { ChapHeading } from "@/components/print/chap-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export const metadata = pageMeta({
  title: "خدمات کارن چاپ | چاپ افست و دیجیتال، مهر، صحافی و هدایای تبلیغاتی",
  description:
    "هفت خانوادۀ خدمت در کارن چاپ: چاپ تبلیغاتی و اداری، بنر و چاپ بزرگ‌فرمت، ساخت مهر، صحافی و پایان‌نامه، هدایای تبلیغاتی، چاپ کتاب و تقدیرنامه — با گزینه‌های تخصصی هر محصول.",
  path: "/print/services",
});

export default function ChapServicesPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <ChapHeading as="h1"
          latin="All services"
          fa="همه خدمات"
          title="هفت خانوادۀ خدمت، یک استاندارد کیفیت"
          description="هر خدمت صفحۀ اختصاصی خودش را دارد؛ با معرفی محصولات، گزینه‌های قابل انتخاب و زمان تحویل."
        />
      </section>

      <section className="container-page space-y-6 pb-20">
        {PRINT_SERVICES.map((service, index) => {
          const products = productsOfService(service.slug);
          return (
            <Reveal key={service.slug} delay={index * 0.04}>
              <article className="grid gap-6 rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 lg:grid-cols-[0.9fr_1.4fr] lg:p-7">
                <Link
                  href={`/print/services/${service.slug}`}
                  className="group relative block overflow-hidden rounded-[var(--radius-xl)]"
                  aria-label={service.title}
                >
                  <span className="relative block aspect-[16/10]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    <span
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent to-transparent"
                      aria-hidden
                    />
                    <span className="absolute bottom-3 start-3 end-3 flex items-end justify-between gap-3 text-white">
                      <span className="font-titr text-lg leading-tight">{service.title}</span>
                      <span className="sec-index rounded-full bg-white/85 px-2 py-0.5 text-ink-900">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </span>
                </Link>

                <div className="flex flex-col">
                  <p className="text-2xs leading-loose text-muted">{service.description}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-2xs font-bold leading-relaxed">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--color-cmyk-m)]" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/print/products/${product.slug}`}
                        className="rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-3xs font-bold text-muted transition-colors hover:border-ink-900/40 hover:text-[color:var(--text-primary)]"
                      >
                        <span aria-hidden>{product.emoji}</span> {product.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border-subtle)] pt-5">
                    <ButtonLink href={`/print/services/${service.slug}`} size="sm" variant="outline">
                      جزئیات خدمت
                      <ArrowLeft className="size-3.5" aria-hidden />
                    </ButtonLink>
                    <ButtonLink
                      href={`/print/order${products[0] ? `/${products[0].slug}` : ""}`}
                      size="sm"
                      className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
                    >
                      ثبت سفارش
                      <ArrowLeft className="size-3.5" aria-hidden />
                    </ButtonLink>
                    <span className="text-5xs text-muted">شروع از {CHAP.phone} · تحویل زمان‌بندی‌شده</span>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
