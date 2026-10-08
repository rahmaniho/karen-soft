import Image from "next/image";
import { SITE, PROCESS_STEPS } from "@/lib/constants";
import { PageHero, ContentSection, InfoGrid, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "درباره کارن سافت | تیم توسعه نرم‌افزار در قزوین",
  description: "با کارن سافت آشنا شوید؛ تیم مستقر در قزوین برای طراحی وب‌سایت، توسعه نرم‌افزار مدیریتی و اتوماسیون فرایندهای کسب‌وکار.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT KAREN SOFT"
        title="فناوری پیچیده، رشد ساده."
        description="ما نرم‌افزار را برای حل مسائل واقعی کسب‌وکار می‌سازیم؛ ابزاری که کار روزمره را ساده‌تر و تصمیم‌گیری را روشن‌تر کند."
      />
      <ContentSection title="از شناخت مسئله شروع می‌کنیم">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="lead">
            کارن سافت در سال ۱۴۰۴ (2024) در {SITE.city} بنیان‌گذاری شد. {SITE.founder} — بنیان‌گذار کارن سافت —
            فعالیت مجموعه را با تمرکز بر طراحی وب‌سایت، نرم‌افزارهای مدیریتی و اتوماسیون آغاز کرد. مجموعه محصولات و دموهای سایت، تصویری از حوزه‌های کاری و رویکرد اجرایی ماست.
          </p>
          <div className="surface-card p-8">
            <h3>پیش از تصمیم، تجربه کنید</h3>
            <p className="my-4 text-muted">
              دموهای مرورگری کمک می‌کنند پیش از شروع همکاری، جریان کار و امکانات موردنیازتان را بررسی کنید. اطلاعات دموها نمونه هستند.
            </p>
            <ButtonLink href="/demo" variant="soft">ورود به دموها</ButtonLink>
          </div>
        </div>
      </ContentSection>
      <ContentSection title="چهره‌های کارن سافت">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <figure className="surface-card group overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
              <Image
                src="/images/Hosein-rahmani.jpg"
                alt="حسین رحمانی، بنیان‌گذار کارن سافت"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <span className="block text-sm font-extrabold">حسین رحمانی</span>
              <span className="mt-1 block text-3xs text-muted">بنیان‌گذار و مدیر فنی کارن سافت</span>
            </figcaption>
          </figure>
          <figure className="surface-card group overflow-hidden">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
              <Image
                src="/images/chapkhaneh.png"
                alt="نمای داخلی چاپخانه کارن چاپ"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <span className="block text-sm font-extrabold">چاپخانه کارن چاپ</span>
              <span className="mt-1 block text-3xs text-muted">الوند، شهرصنعتی البرز؛ چاپ دیجیتال و افست</span>
            </figcaption>
          </figure>
          <figure className="surface-card group overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-sunken)]">
              <Image
                src="/images/Cover.jpg"
                alt="تابوی نورانی لوگوی کارن چاپ"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <figcaption className="p-4">
              <span className="block text-sm font-extrabold">نشانی برند ما</span>
              <span className="mt-1 block text-3xs text-muted">کارن چاپ؛ زیرمجموعۀ چاپ و تولید کارن سافت</span>
            </figcaption>
          </figure>
        </div>
      </ContentSection>
      <ContentSection title="روش کار ما"><InfoGrid items={PROCESS_STEPS} /></ContentSection>
      <ContentSection title="یک مجموعه، دو حوزه مکمل">
        <p className="lead mb-6">در کنار خدمات نرم‌افزاری، کارن چاپ خدمات چاپ، مهر و صحافی را در یک بخش مستقل ارائه می‌کند.</p>
        <ButtonLink href="/print" variant="outline">آشنایی با کارن چاپ</ButtonLink>
      </ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          webPageSchema({
            type: "AboutPage",
            name: "درباره کارن سافت",
            description: "معرفی کارن سافت، خدمات نرم‌افزاری و رویکرد همکاری با کسب‌وکارها.",
            path: "/about",
            mainEntity: { "@id": `${SITE.url}/#organization` },
          }),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "درباره کارن سافت", path: "/about" },
          ]),
        ]}
      />
    </>
  );
}
