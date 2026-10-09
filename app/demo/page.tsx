import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { DEMO_PRODUCTS } from "@/lib/products";
import { INDUSTRIES } from "@/lib/industries";
import { pageMeta } from "@/lib/seo";
import { itemListSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ButtonLink } from "@/components/ui/button";
import { DemoHubGrid } from "@/components/demo/shared/demo-hub-grid";
import { IndustryCard } from "@/components/shared/industry-card";

export const metadata: Metadata = pageMeta({
  title: "دموی زنده محصولات | کارن سافت",
  description: "دموی زنده ۱۰ نرم‌افزار مدیریتی کارن سافت را رایگان و بدون ثبت‌نام در مرورگر بررسی کنید؛ اطلاعات دمو نمونه است و هر زمان قابل بازنشانی است.",
  path: "/demo",
});

export default function DemoHubPage() {
  const spotlight = INDUSTRIES.slice(0, 3);
  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-24">
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
          <div className="container-page relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]/80 px-3.5 py-2 text-3xs font-extrabold">
              <Sparkles className="size-3.5 text-brand-500" aria-hidden />
              هاب دموهای کارن سافت
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-balance sm:text-5xl lg:text-6xl">
              دموی زنده محصولات <span className="text-brand-600 dark:text-brand-400">کارن سافت</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-md leading-loose text-muted">
              بدون نصب، بدون ثبت‌نام — همه چیز را در مرورگر امتحان کنید. داده‌ها نمونه‌اند و هر لحظه قابل بازنشانی.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-page">
            <DemoHubGrid products={DEMO_PRODUCTS} />
          </div>
        </section>

        <section className="section-y bg-[var(--surface-raised)]">
          <div className="container-page">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-xs font-extrabold text-brand-600">دموی مشاغل</span>
                <h2 className="mt-2 text-3xl font-extrabold">طراحی‌های نمونه برای ۱۲ صنعت</h2>
                <p className="mt-3 max-w-xl text-sm leading-loose text-muted">
                  هر صنعت زبان بصری خودش را دارد. این نمونه‌ها را در حالت دسکتاپ، تبلت و موبایل ببینید.
                </p>
              </div>
              <ButtonLink href="/demo/industries" variant="outline" size="sm">
                گالری کامل
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {spotlight.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-y">
          <div className="container-page">
            <div className="surface-card flex flex-col items-center gap-5 p-10 text-center">
              <h2 className="text-2xl font-extrabold">محصول موردنظرتان نبود؟ سفارشی سفارش دهید</h2>
              <p className="max-w-xl text-sm leading-loose text-muted">
                نرم‌افزار اختصاصی متناسب با فرایند دقیق کسب‌وکار شما طراحی می‌کنیم؛ از تحلیل تا استقرار و پشتیبانی.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/contact" size="lg">
                  درخواست دموی اختصاصی
                  <ArrowLeft className="size-4" aria-hidden />
                </ButtonLink>
                <Link
                  href="/products"
                  className="inline-flex h-14 items-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-7 text-base font-bold transition-colors hover:border-brand-400 hover:text-brand-600"
                >
                  مشاهده همه محصولات
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          itemListSchema(
            "دموهای زنده کارن سافت",
            DEMO_PRODUCTS.map((product) => ({ name: product.name, url: `/demo/${product.demoSlug}` })),
          ),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "دموی زنده", path: "/demo" },
          ]),
        ]}
      />
    </>
  );
}
