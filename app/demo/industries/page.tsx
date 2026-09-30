import type { Metadata } from "next";
import { Palette } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { IndustryGallery } from "@/components/industries/industry-gallery";

export const metadata: Metadata = pageMeta({
  title: "نمونه طراحی برای ۱۲ صنعت | کارن سافت",
  description:
    "گالری نمونه‌سایت‌های کارن سافت برای سالن زیبایی، رستوران، دفتر وکالت، املاک، باشگاه، کلینیک، آموزشگاه، آژانس مسافرتی، فروشگاه، ساختمانی، آژانس دیجیتال و سرویس‌های SaaS.",
  path: "/demo/industries",
});

export default function IndustriesGalleryPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="pt-24">
        <section className="relative overflow-hidden py-16 lg:py-20">
          <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
          <div className="container-page relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]/80 px-3.5 py-2 text-[11px] font-extrabold">
              <Palette className="size-3.5 text-brand-500" aria-hidden />
              گالری نمونه طراحی
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-balance sm:text-5xl">
              برای هر صنعت، یک <span className="text-brand-600 dark:text-brand-400">زبان بصری</span> متفاوت
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-loose text-muted">
              دوازده نمونه‌سایت کامل و قابل مرور. رنگ، فونت و ریتم حرکتی هرکدام متناسب با مخاطب همان صنعت طراحی شده است.
            </p>
          </div>
        </section>
        <section className="pb-24">
          <div className="container-page">
            <IndustryGallery />
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd
        data={[
          itemListSchema(
            "نمونه طراحی صنایع",
            INDUSTRIES.map((industry) => ({ name: industry.name, url: `/demo/industries/${industry.slug}` })),
          ),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "دموی زنده", path: "/demo" },
            { name: "نمونه صنایع", path: "/demo/industries" },
          ]),
        ]}
      />
    </>
  );
}
