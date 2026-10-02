import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { CHAP } from "@/lib/print/site";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/** بنر معرفی زیرمجموعۀ «کارن چاپ» داخل سایت اصلی */
export function ChapPromoSection() {
  return (
    <section id="karen-chap" className="section-y bg-[var(--surface-raised)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="زیرمجموعۀ کارن سافت"
          eyebrowLatin="Karen Chap"
          index="۰۵"
          title="کارن چاپ؛ چاپ، مهر و صحافی"
          description="چاپخانۀ کارن چاپ هم بخشی از کارن سافت است. سفارش آنلاین با پیکربندی دقیق هر محصول، از تراکت و کارت ویزیت تا مهر لیزری، صحافی پایان‌نامه و ماگ و تیشرت."
          action={
            <ButtonLink href="/print" size="sm" variant="outline">
              ورود به کارن چاپ
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <article className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)]">
            <div className="relative aspect-[16/9] lg:h-full lg:aspect-auto">
              <Image
                src={CHAP.heroImage}
                alt="چاپخانۀ کارن چاپ در قزوین"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
              <span className="text-6xs font-bold uppercase tracking-[0.28em] text-white/60" dir="ltr">
                {CHAP.motto}
              </span>
              <h3 className="mt-2 font-titr text-2xl leading-tight">{CHAP.tagline}</h3>
              <p className="mt-2 max-w-md text-2xs leading-loose text-white/70">{CHAP.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {PRINT_SERVICES.slice(0, 5).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/print/services/${service.slug}`}
                      className="rounded-full border border-white/25 px-3 py-1.5 text-5xs font-bold text-white/85 transition-colors hover:border-white/70 hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <ul className="grid gap-3">
            {[
              { title: "پیکربند دقیق سفارش", desc: "فرم، پرسش‌های اختصاصی همان محصول را می‌پرسد؛ نه یک فرم مبهم." },
              { title: "کد پیگیری و ارسال سریع", desc: "سفارش را با یک لمس در واتساپ یا پیامک بفرستید." },
              { title: "پذیرش ۲۴/۷", desc: "ثبت سفارش در هر ساعت؛ تحویل با زمان‌بندی اعلامی چاپخانه." },
            ].map((item) => (
              <li key={item.title} className="flex h-full flex-col justify-center rounded-[var(--radius-xl)] border border-[var(--border-subtle)] p-5">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <Check className="size-4 text-brand-600 dark:text-brand-300" aria-hidden />
                  {item.title}
                </span>
                <span className="mt-1.5 text-2xs leading-loose text-muted">{item.desc}</span>
              </li>
            ))}
            <li>
              <ButtonLink href="/print/order" size="md" className="w-full">
                ثبت سفارش در کارن چاپ
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
