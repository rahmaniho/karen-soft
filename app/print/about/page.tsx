import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, MapPin, Users } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { CHAP, CHAP_STATS, CHAP_WHY } from "@/lib/print/site";
import { ChapHeading } from "@/components/print/chap-heading";
import { ChapIcon } from "@/components/print/chap-icon";
import { ChapStats } from "@/components/print/chap-stats";
import { ButtonLink } from "@/components/ui/button";
import { PRINT_STEPS } from "@/lib/print/data/content";

export const metadata = pageMeta({
  title: `درباره ${CHAP.name} | زیرمجموعۀ چاپ کارن سافت`,
  description:
    "کارن چاپ با بیش از ۱۲ سال تجربه، چاپ دیجیتال و افست، ساخت مهر و صحافی حرفه‌ای را در قزوین ارائه می‌دهد؛ زیرمجموعۀ کارن سافت که نرم‌افزار و گرافیک را کنار چاپ آورده است.",
  path: "/print/about",
  images: ["/images/print/house.jpg"],
});

const TIMELINE = [
  { year: "۱۳۹۲", title: "شروع با یک دستگاه دیجیتال", desc: "آغاز کار با چاپ کم‌تیراژ و صحافی در قزوین." },
  { year: "۱۳۹۶", title: "راه‌اندازی بخش مهر و صحافی", desc: "اضافه شدن ساخت مهر لیزری و جلد سخت به خدمات." },
  { year: "۱۴۰۰", title: "افست و تیراژ بالا", desc: "تجهیز چاپخانه برای تراکت، بروشور و کتاب با CMYK استاندارد." },
  { year: "۱۴۰۳", title: "سفارش‌گذاری آنلاین", desc: "پیکربند دقیق هر محصول روی وب‌سایت، کنار سامانۀ مدیریت چاپ." },
  {
    year: "۱۴۰۵",
    title: "زیرمجموعۀ رسمی کارن سافت",
    desc: "چاپ، گرافیک و نرم‌افزار زیر یک سقف برای کسب‌وکارهای منطقه.",
  },
];

export default function ChapAboutPage() {
  return (
    <>
      <section className="container-page pt-12 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow">About · {CHAP.nameEn}</span>
            <h1 className="display-1 mt-4">
              کارن چاپ؛
              <br />
              <em className="text-brand-600 not-italic dark:text-brand-300">چاپخانه‌ای که مهندسی هم می‌فهمد.</em>
            </h1>
            <p className="lead mt-6">
              بیش از ۱۲ سال است در قزوین (شهرصنعتی البرز، الوند) چاپ دیجیتال و افست، ساخت مهر و صحافی حرفه‌ای انجام
              می‌دهیم. ما فقط چاپ نمی‌کنیم؛ از مشاورۀ انتخاب متریال تا طراحی، تولید و بسته‌بندی همراه شما هستیم.
            </p>
            <p className="mt-4 text-2xs leading-loose text-muted">
              این مجموعه زیرمجموعۀ{" "}
              <Link href="/" className="font-bold text-brand-600 hover:underline dark:text-brand-300">
                کارن سافت
              </Link>{" "}
              است؛ تیمی که راهکارهای نرم‌افزاری و گرافیکی را کنار خدمات چاپ، زیر یک سقف جمع کرده است. مدیر مجموعه:{" "}
              {CHAP.manager}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/print/order"
                size="lg"
                className="bg-ink-900 hover:bg-ink-800 dark:bg-white dark:text-ink-900"
              >
                ثبت سفارش
                <ArrowLeft className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/print/contact" size="lg" variant="outline">
                تماس و آدرس
              </ButtonLink>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--border-subtle)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={CHAP.heroImage}
                alt="چاپخانۀ کارن چاپ"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <ChapStats items={CHAP_STATS} />
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-raised)] py-16 lg:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Timeline</span>
            <h2 className="display-2 mt-3">مسیری که آمده‌ایم</h2>
            <p className="lead mt-4">
              از یک میز دیجیتال کوچک تا چاپخانه‌ای که سفارش‌هایش در سامانه مدیریت تولید می‌شوند.
            </p>
          </div>
          <ol className="relative space-y-6 border-s border-[var(--hairline)] ps-6">
            {TIMELINE.map((item) => (
              <li key={item.year} className="relative">
                <span
                  className="absolute -start-[1.85rem] top-1.5 size-3 rounded-full border-2 border-[var(--surface-raised)] bg-[var(--color-cmyk-m)]"
                  aria-hidden
                />
                <p className="text-5xs font-bold uppercase tracking-[0.2em] text-muted">{item.year}</p>
                <h3 className="mt-1 text-sm font-bold">{item.title}</h3>
                <p className="mt-1 text-2xs leading-loose text-muted">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <ChapHeading latin="Principles" fa="اصول کاری" title="سه چیزی که درباره ما باید بدانید" center />
          <div className="grid gap-5 lg:grid-cols-3">
            {CHAP_WHY.map((item, index) => (
              <article key={item.title} className="surface-card relative h-full p-7">
                <span className="sec-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-4 grid size-12 place-items-center rounded-[var(--radius-md)] bg-[var(--surface-sunken)] text-brand-600 dark:text-brand-300">
                  <ChapIcon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-2xs leading-loose text-muted">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "award",
              title: "تضمین کیفیت",
              desc: "در صورت مغایرت چاپ با تأییدیه، همان نسخه بازتولید می‌شود.",
              lucide: Award,
            },
            {
              icon: "verified",
              title: "متریال شفاف",
              desc: "گراماژ و نوع کاغذ در پیش‌فاکتور ذکر می‌شود؛ بدون ابهام.",
              lucide: Users,
            },
            {
              icon: "truck",
              title: "ارسال سراسری",
              desc: "بسته‌بندی امن و ارسال با پیک، تیپاکس یا پست ملی.",
              lucide: MapPin,
            },
          ].map((item) => (
            <div key={item.title} className="surface-card p-6">
              <item.lucide className="size-5 text-brand-600 dark:text-brand-300" aria-hidden />
              <h3 className="mt-3 text-sm font-bold">{item.title}</h3>
              <p className="mt-1.5 text-2xs leading-loose text-muted">{item.desc}</p>
            </div>
          ))}
          <div className="surface-card flex flex-col justify-between p-6">
            <h3 className="text-sm font-bold">مراحل سفارش</h3>
            <ul className="mt-3 space-y-1.5">
              {PRINT_STEPS.map((step, index) => (
                <li key={step.title} className="flex items-center gap-2 text-2xs text-muted">
                  <span className="sec-index">{String(index + 1).padStart(2, "0")}</span>
                  {step.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
