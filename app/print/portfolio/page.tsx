import { ArrowLeft } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_WORKS } from "@/lib/print/data/works";
import { ButtonLink } from "@/components/ui/button";
import { ChapHeading } from "@/components/print/chap-heading";
import { WorkGallery } from "@/components/print/work-gallery";

export const metadata = pageMeta({
  title: `نمونه‌کارها | ${CHAP.name}`,
  description: "گزیده‌ای از پروژه‌های چاپ، مهر، صحافی و هدایای تبلیغاتی کارن چاپ در قزوین؛ با امکان بزرگ‌نمایی هر اثر.",
  path: "/print/portfolio",
  images: [PRINT_WORKS[0]?.image ?? "/images/print/house.jpg"],
});

export default function ChapPortfolioPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <ChapHeading
          latin="Portfolio"
          fa="گالری"
          title="نمونه‌کارهای کارن چاپ"
          description="چاپ، مهر، صحافی و هدایای تبلیغاتی؛ روی هر تصویر کلیک کنید تا با کیفیت کامل و توضیح فنی ببینید."
          action={
            <ButtonLink
              href="/print/order"
              size="sm"
              className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
            >
              ثبت سفارش مشابه
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
      </section>

      <section className="container-page pb-20">
        <WorkGallery works={PRINT_WORKS} />
      </section>

      <section className="border-t border-[var(--border-subtle)] bg-[var(--surface-raised)] py-12">
        <div className="container-page flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-lg font-bold">طرحی دارید که شبیه این کارهاست؟</h2>
            <p className="mt-1.5 text-2xs text-muted">
              فایل یا حتی یک عکس موبایلی کافی است؛ بقیه را در فرم سفارش دقیق می‌کنیم.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href="/print/order"
              size="md"
              className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
            >
              شروع سفارش
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href="/print/services" size="md" variant="outline">
              فهرست خدمات
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
