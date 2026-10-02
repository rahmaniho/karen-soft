import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { PRINT_FAQS } from "@/lib/print/data/content";
import { PRINT_SERVICES } from "@/lib/print/data/services";
import { faqSchema } from "@/lib/schema";
import { Accordion } from "@/components/ui/accordion";
import { JsonLd } from "@/components/ui/json-ld";
import { ChapHeading } from "@/components/print/chap-heading";

export const metadata = pageMeta({
  title: `سوالات متداول ${CHAP.name} | زمان تحویل، فایل چاپی و ارسال`,
  description:
    "پاسخ پرسش‌های پرتکرار درباره زمان تحویل سفارش، فرمت فایل‌های چاپی، ارسال به شهرستان، طراحی مهر و روش‌های پرداخت در کارن چاپ.",
  path: "/print/faq",
});

export default function ChapFaqPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <ChapHeading
          latin="FAQ"
          fa="پاسخ‌های کوتاه"
          title="سؤالات پرتکرار کارن چاپ"
          description="اگر پاسخ پرسش‌تان اینجا نبود، در واتساپ بپرسید؛ معمولاً زیر یک ساعت جواب می‌گیرید."
        />
      </section>

      <section className="container-page grid gap-10 pb-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <Accordion items={PRINT_FAQS} />

          <div className="mt-10 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-6">
            <h2 className="text-sm font-bold">پرسش‌های تخصصی‌تر هر خدمت</h2>
            <p className="mt-1.5 text-2xs leading-loose text-muted">
              در صفحۀ هر خدمت، پرسش‌های مربوط به همان خدمت (كاغذ، متریال، زمان فوری) پاسخ داده شده است.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {PRINT_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/print/services/${service.slug}#faq`}
                    className="rounded-full border border-[var(--border-subtle)] px-3.5 py-2 text-3xs font-bold text-muted transition-colors hover:border-ink-900/40 hover:text-[color:var(--text-primary)]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="rounded-[var(--radius-xl)] bg-ink-950 p-6 text-white">
            <span className="eyebrow text-[var(--color-cmyk-y)]">Ask us</span>
            <h2 className="mt-3 font-titr text-lg leading-snug">سؤال‌تان پاسخ نداشت؟</h2>
            <p className="mt-2 text-2xs leading-loose text-white/70">
              فایل یا نمونه‌ای که دوست دارید را بفرستید؛ هزینه و زمان را دقیق می‌گوییم.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={`https://wa.me/${CHAP.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-white text-2xs font-bold text-ink-900 transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" aria-hidden />
                پیام در واتساپ
              </a>
              <Link
                href="/print/contact"
                className="flex h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-white/25 text-2xs font-bold transition-colors hover:border-white/60"
              >
                فرم تماس
                <ArrowLeft className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <JsonLd data={faqSchema(PRINT_FAQS)} />
    </>
  );
}
