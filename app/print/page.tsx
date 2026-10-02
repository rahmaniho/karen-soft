import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Phone, Sparkles } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP, CHAP_SOFTWARE_HOOK, CHAP_STATS, CHAP_WHY } from "@/lib/print/site";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { PRINT_PRODUCTS } from "@/lib/print/data/products";
import { PRINT_WORKS } from "@/lib/print/data/works";
import { PRINT_FAQS, PRINT_QUOTES, PRINT_STEPS } from "@/lib/print/data/content";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { ChapHeading } from "@/components/print/chap-heading";
import { ChapIcon } from "@/components/print/chap-icon";
import { ChapMarquee } from "@/components/print/chap-marquee";
import { ChapStats } from "@/components/print/chap-stats";
import { ServiceCard } from "@/components/print/service-card";
import { ProductCard } from "@/components/print/product-card";
import { WorkGallery } from "@/components/print/work-gallery";
import { Reveal } from "@/components/shared/reveal";

export const metadata = pageMeta({
  title: `${CHAP.name} | ${CHAP.tagline} در قزوین`,
  description: CHAP.description,
  path: "/print",
  images: ["/images/print/house.jpg"],
});

const HERO_POINTS = [
  "پیکربند دقیق هر محصول، نه یک فرم مبهم",
  "پیش‌فاکتور شفاف و تحویل زمان‌بندی‌شده",
  "طراحی گرافیک اختصاصی در صورت نیاز",
];

export default function ChapHome() {
  return (
    <>
      {/* ── قهرمان ── */}
      <section className="relative overflow-hidden">
        <div className="container-page relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">Karen Chap · Print Studio</span>
              <span className="rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)]/70 px-3 py-1 text-5xs font-bold text-muted">
                زیرمجموعۀ کارن سافت
              </span>
            </div>

            <h1 className="display-1 mt-5">
              چاپ، مهر و صحافی
              <br />
              <em className="text-brand-600 not-italic dark:text-brand-300">با استاندارد استودیویی.</em>
            </h1>

            <p className="lead mt-6">
              از کارت ویزیت و تراکت تا مهر لیزری، ماگ و تیشرت، پایان‌نامه و کتاب. سفارش را آنلاین پیکربندی می‌کنید،
              پیش‌فاکتور شفاف می‌گیرید و تحویل به‌موقع تحویل می‌شود.
            </p>

            <ul className="mt-6 space-y-2">
              {HERO_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-2xs font-bold text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href="/print/order"
                size="lg"
                className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                ثبت سفارش آنلاین
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/print/portfolio" size="lg" variant="outline">
                نمونه‌کارها
              </ButtonLink>
              <a
                href={`tel:${CHAP.tel}`}
                className="inline-flex h-12 items-center gap-2 px-1 text-2xs font-bold text-muted transition-colors hover:text-[color:var(--text-primary)]"
              >
                <Phone className="size-4" aria-hidden />
                <span dir="ltr" className="persian-num text-sm font-titr">
                  {CHAP.phone}
                </span>
              </a>
            </div>
          </div>

          <div className="relative">
            <figure className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-ink-950 shadow-[var(--shadow-lift)]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={CHAP.heroImage}
                  alt="نمای داخلی چاپخانۀ کارن چاپ در قزوین"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-ink-950 px-5 py-4 text-white">
                <span className="text-5xs font-bold uppercase tracking-[0.22em] text-white/60">
                  Qazvin · Alborz I.P.
                </span>
                <span className="flex items-center gap-1.5 text-3xs font-bold">
                  <Sparkles className="size-3.5 text-[var(--color-cmyk-y)]" aria-hidden />
                  افست و دیجیتال، زیر یک سقف
                </span>
              </figcaption>
            </figure>

            <ul className="absolute -bottom-6 -start-4 hidden gap-px overflow-hidden rounded-[var(--radius-lg)] bg-[var(--hairline)] shadow-[var(--shadow-soft)] sm:grid sm:grid-cols-3">
              {[
                { k: "CMYK", v: "کنترل رنگ" },
                { k: "۳۰۰", v: "DPI حداقل" },
                { k: "۲۴/۷", v: "پذیرش سفارش" },
              ].map((cell) => (
                <li key={cell.k} className="min-w-24 bg-[var(--surface-raised)] px-4 py-3 text-center">
                  <span className="block text-sm font-bold leading-none">{cell.k}</span>
                  <span className="mt-1 block text-5xs text-muted">{cell.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ChapMarquee />
      </section>

      {/* ── آمار ── */}
      <section className="container-page pt-16 lg:pt-20">
        <ChapStats items={CHAP_STATS} />
      </section>

      {/* ── خدمات ── */}
      <section className="section-y" id="services">
        <div className="container-page">
          <ChapHeading
            latin="Services"
            fa="خدمات"
            index="۰۱"
            title="هر چیزی که یک برند برای چاپ نیاز دارد"
            description="هفت خانوادۀ خدمت، ده‌ها محصول؛ هر کدام با گزینه‌های تخصصی خودش قابل سفارش است."
            action={
              <ButtonLink href="/print/services" variant="outline" size="sm">
                همه خدمات
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRINT_SERVICES.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── چرا کارن چاپ ── */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-raised)] py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span className="eyebrow">Why Karen Chap</span>
            <h2 className="display-2 mt-3">ما فقط چاپ نمی‌کنیم</h2>
            <p className="lead mt-4">
              تجربه‌ای دقیق، سریع و قابل اتکا؛ از مشاورۀ انتخاب کاغذ تا طراحی، تولید، بسته‌بندی و ارسال.
            </p>
            <Link
              href="/print/about"
              className="mt-6 inline-flex items-center gap-1.5 text-2xs font-bold text-brand-600 hover:underline dark:text-brand-300"
            >
              داستان کارن چاپ
              <ArrowLeft className="size-3.5" aria-hidden />
            </Link>
          </div>
          <ol className="space-y-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--hairline)]">
            {CHAP_WHY.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4 bg-[var(--surface-raised)] p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-sunken)] text-brand-600 dark:text-brand-300">
                  <ChapIcon name={item.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold">{item.title}</span>
                  <span className="mt-1 block text-2xs leading-loose text-muted">{item.desc}</span>
                </span>
                <span className="sec-index ms-auto hidden sm:block">{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── محصولات پرتکرار ── */}
      <section className="section-y">
        <div className="container-page">
          <ChapHeading
            latin="Most Ordered"
            fa="پرسفارش‌ترین‌ها"
            index="۰۲"
            title="محصولی را انتخاب کنید، بقیه را ما می‌پرسیم"
            description="برای هر محصول، فرم سفارش دقیقاً همان گزینه‌هایی را می‌پرسد که در چاپخانه لازم داریم."
            action={
              <ButtonLink
                href="/print/order"
                size="sm"
                className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                شروع سفارش
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINT_PRODUCTS.filter((p) => p.slug !== "other")
              .slice(0, 8)
              .map((product, index) => (
                <Reveal key={product.slug} delay={index * 0.04}>
                  <ProductCard product={product} href={`/print/order/${product.slug}`} />
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── فرایند ── */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-raised)] py-16 lg:py-24">
        <div className="container-page">
          <ChapHeading
            latin="How it works"
            fa="فرایند سفارش"
            index="۰۳"
            title="از انتخاب محصول تا تحویل، در ۴ قدم"
            center
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINT_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-[var(--radius-xl)] border border-[var(--border-subtle)] p-6"
              >
                <span className="sec-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-4 grid size-11 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-sunken)] text-brand-600 dark:text-brand-300">
                  <ChapIcon name={step.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold">{step.title}</h3>
                <p className="mt-1.5 text-2xs leading-loose text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── نمونه‌کارها ── */}
      <section className="section-y" id="works">
        <div className="container-page">
          <ChapHeading
            latin="Selected work"
            fa="نمونه‌کارها"
            index="۰۴"
            title="گزیده‌ای از کارهای اجراشده"
            description="روی هر تصویر کلیک کنید تا با کیفیت کامل ببینید."
            action={
              <ButtonLink href="/print/portfolio" variant="outline" size="sm">
                همه نمونه‌کارها
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
            }
          />
          <WorkGallery works={PRINT_WORKS.slice(0, 6)} compact />
        </div>
      </section>

      {/* ── نظرها ── */}
      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-raised)] py-16 lg:py-24">
        <div className="container-page">
          <ChapHeading latin="Client words" fa="نظر مشتریان" index="۰۵" title="چرا به ما اعتماد می‌کنند" />
          <div className="grid gap-5 lg:grid-cols-3">
            {PRINT_QUOTES.map((quote) => (
              <figure key={quote.name} className="surface-card flex h-full flex-col p-6">
                <span className="cmyk-strip w-16" aria-hidden>
                  <span style={{ background: "var(--color-cmyk-c)" }} />
                  <span style={{ background: "var(--color-cmyk-m)" }} />
                  <span style={{ background: "var(--color-cmyk-y)" }} />
                </span>
                <blockquote className="mt-4 flex-1 text-sm leading-loose">
                  <q>{quote.quote}</q>
                </blockquote>
                <figcaption className="mt-5 border-t border-[var(--border-subtle)] pt-4">
                  <span className="block text-2xs font-bold">{quote.name}</span>
                  <span className="block text-5xs text-muted">{quote.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── قلاب نرم‌افزاری ── */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid items-center gap-8 rounded-[var(--radius-2xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
            <div>
              <span className="eyebrow">{CHAP.nameEn} × Karen Soft</span>
              <h2 className="display-2 mt-3">{CHAP_SOFTWARE_HOOK.title}</h2>
              <p className="lead mt-4">{CHAP_SOFTWARE_HOOK.desc}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={CHAP_SOFTWARE_HOOK.cta.href} size="md">
                  {CHAP_SOFTWARE_HOOK.cta.label}
                  <ArrowLeft className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/contact" size="md" variant="outline">
                  گفت‌وگو با تیم فنی
                </ButtonLink>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "ثبت سفارش، برنامه‌ریزی ماشین و گزارش ضایعات در یک سامانه",
                "اتصال خودکار سفارش‌های وب‌سایت به میز تولید",
                "تاریخچه کامل هر مشتری، طرح و تیراژ",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs font-bold leading-relaxed"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-600 dark:text-brand-300" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── سؤالات پرتکرار ── */}
      <section className="pb-16 lg:pb-24" id="faq">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 className="display-2 mt-3">پاسخ پرتکرارها</h2>
            <p className="lead mt-4">
              اگر پاسخ پرسش شما اینجا نبود، یک تماس کافی است؛ کارشناس ما زمان و هزینه را دقیق اعلام می‌کند.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${CHAP.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-4 text-2xs font-bold transition-colors hover:border-emerald-500 hover:text-emerald-600"
              >
                <MessageCircle className="size-4" aria-hidden />
                پرسش در واتساپ
              </a>
              <Link
                href="/print/faq"
                className="inline-flex h-11 items-center gap-1.5 px-2 text-2xs font-bold text-brand-600 hover:underline dark:text-brand-300"
              >
                همه سؤالات
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
          <Accordion items={PRINT_FAQS.slice(0, 5)} />
        </div>
      </section>

      {/* ── دعوت به اقدام ── */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-ink-950 px-8 py-14 text-white lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -end-20 -top-24 size-72 rounded-full opacity-40 blur-[2px]"
            style={{ background: "radial-gradient(circle, rgba(255,210,0,.35), transparent 70%)" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="eyebrow text-[var(--color-cmyk-y)]">Start an order</span>
              <h2 className="display-2 mt-3 text-white">آماده شروع هستید؟</h2>
              <p className="mt-4 max-w-xl text-sm leading-loose text-white/70">
                محصول را انتخاب کنید، گزینه‌ها را دقیق مشخص کنید و سفارش را با یک کلیک بفرستید؛ پیش‌فاکتور در کوتاه‌ترین
                زمان آماده می‌شود.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/print/order" size="lg" className="bg-white text-ink-900 hover:bg-white/90">
                ثبت سفارش آنلاین
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink
                href="/print/contact"
                size="lg"
                variant="ghost"
                className="border border-white/25 text-white hover:bg-white/10"
              >
                <Phone className="size-4" aria-hidden />
                تماس فوری
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={faqSchema(PRINT_FAQS)} />
    </>
  );
}
