import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP } from "@/lib/print/site";
import { ChapHeading } from "@/components/print/chap-heading";
import { ChapContactForm } from "@/components/print/chap-contact-form";

export const metadata = pageMeta({
  title: `تماس با ${CHAP.name} | مشاوره، استعلام قیمت و پیگیری سفارش`,
  description: `${CHAP.name} در قزوین، شهرصنعتی البرز (الوند). تماس ${CHAP.phone} — ${CHAP.hours}`,
  path: "/print/contact",
});

const CHANNELS = [
  {
    icon: Phone,
    label: "تماس مستقیم",
    value: CHAP.phone,
    href: `tel:${CHAP.tel}`,
    hint: "پاسخ‌گویی در ساعت کاری",
    ltr: true,
  },
  {
    icon: MessageCircle,
    label: "واتساپ",
    value: "ارسال فایل و استعلام سریع",
    href: `https://wa.me/${CHAP.whatsapp}`,
    hint: "بهترین راه فرستادن فایل",
  },
  {
    icon: Mail,
    label: "ایمیل",
    value: CHAP.email,
    href: `mailto:${CHAP.email}`,
    hint: "برای فایل‌های سنگین و پیش‌فاکتور",
    ltr: true,
  },
  {
    icon: MapPin,
    label: "آدرس چاپخانه",
    value: "نمایش روی نقشه",
    href: CHAP.maps,
    hint: CHAP.address,
  },
] as const;

export default function ChapContactPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <ChapHeading as="h1"
          latin="Contact"
          fa="در تماس باشیم"
          title="برای مشاوره، قیمت یا پیگیری سفارش"
          description="هر روز هفته در دسترس هستیم؛ اگر عجله دارید، واتساپ سریع‌ترین راه است چون می‌توانید فایل را همان‌جا بفرستید."
          action={
            <Link
              href="/print/order"
              className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] px-4 text-2xs font-bold transition-colors hover:border-ink-900/40"
            >
              ثبت سفارش آنلاین
              <ArrowLeft className="size-3.5" aria-hidden />
            </Link>
          }
        />
      </section>

      <section className="container-page grid gap-6 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-4">
          {CHANNELS.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-4 rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5 transition-all duration-[220ms] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-sunken)] text-brand-600 dark:text-brand-300">
                <channel.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-5xs font-bold uppercase tracking-[0.2em] text-muted">{channel.label}</span>
                <span
                  className={"mt-1 block text-sm font-bold " + ("ltr" in channel && channel.ltr ? "persian-num" : "")}
                  dir={"ltr" in channel && channel.ltr ? "ltr" : "rtl"}
                >
                  {channel.value}
                </span>
                <span className="mt-1 block text-2xs leading-relaxed text-muted">{channel.hint}</span>
              </span>
              <ArrowLeft
                className="ms-auto size-4 shrink-0 text-muted transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
            </a>
          ))}

          <div className="rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <Clock className="size-4 text-[var(--color-cmyk-c)]" aria-hidden />
              ساعات کاری
            </h2>
            <dl className="mt-3 space-y-2 text-2xs">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-2">
                <dt className="text-muted">شنبه تا پنجشنبه</dt>
                <dd className="persian-num font-bold">۹:۰۰ — ۱۹:۰۰</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">جمعه و تعطیلات</dt>
                <dd className="font-bold">فقط پذیرش آنلاین</dd>
              </div>
            </dl>
            <p className="mt-4 text-5xs leading-relaxed text-muted">
              مدیریت مجموعه: {CHAP.manager} · پذیرش سفارش در واتساپ و سایت، شبانه‌روزی انجام می‌شود.
            </p>
          </div>
        </div>

        <div>
          <ChapContactForm />
          <p className="mt-4 text-5xs leading-relaxed text-muted">
            فرم بالا برای ارتباط با تیم کارن چاپ است. اگر سفارش چاپ دارید،{" "}
            <Link href="/print/order" className="font-bold text-brand-600 hover:underline dark:text-brand-300">
              فرم پیکربند سفارش
            </Link>{" "}
            سریع‌تر به نتیجه می‌رسد؛ چون همهٔ جزئیات فنی را یک‌جا می‌گیرد.
          </p>
        </div>
      </section>
    </>
  );
}
