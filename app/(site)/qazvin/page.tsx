import Link from "next/link";
import { ArrowLeft, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, ContentSection, Points, ContactCTA } from "@/components/site/page-parts";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/constants";

/**
 * صفحهٔ محلی قزوین.
 * هدف: پاسخ به جست‌وجوهای «طراحی سایت در قزوین» و «نرم‌افزار اختصاصی قزوین» با
 * محتوای یکتا؛ نه تکرار صفحهٔ خدمات. هر ادعای این صفحه باید قابل اجرا و راست باشد.
 */
export const metadata = pageMeta({
  title: "طراحی سایت و نرم‌افزار در قزوین",
  description:
    "کارن سافت از قزوین برای کسب‌وکارهای استان وب‌سایت و نرم‌افزار اختصاصی می‌سازد؛ جلسهٔ حضوری در دفتر زیباشهر، آموزش تیم در محل و پشتیبانی تلفنی در ساعات کاری.",
  path: "/qazvin",
});

const OFFERS = [
  {
    title: "طراحی سایت و فروشگاه",
    desc: "سایت شرکتی، فروشگاهی و لندینگ‌پیج با سئوی فنی، مدیریت محتوای فارسی و بارگذاری سریع روی موبایل.",
    href: "/services#web",
  },
  {
    title: "نرم‌افزار اختصاصی",
    desc: "سامانه‌های مدیریت پرونده، انبار، فروش و تولید که بر اساس فرایند واقعی خودِ کسب‌وکار نوشته می‌شوند.",
    href: "/services#software",
  },
  {
    title: "اتوماسیون و یکپارچه‌سازی",
    desc: "حذف کارهای تکراری و اتصال سامانه‌های موجود؛ از فرم‌های اداری تا گزارش‌های مدیریتی.",
    href: "/services#automation",
  },
  {
    title: "نرم‌افزارهای آمادهٔ مدیریتی",
    desc: "محصولات آمادهٔ کارن سافت برای دفتر وکالت، تاکسی‌سرویس، چاپخانه، املاک، رستوران، باشگاه و فروشگاه.",
    href: "/products",
  },
];

const LOCAL_REASONS = [
  "جلسهٔ حضوری در دفتر کارن سافت در زیباشهر قزوین، در ساعات کاری و با هماهنگی قبلی.",
  "برای کسب‌وکارهای داخل شهر قزوین، جلسهٔ تحویل و آموزش تیم می‌تواند در محل شما برگزار شود.",
  "پشتیبانی تلفنی و پیگیری مستقیم با تیم اجرا؛ بدون واسطهٔ فروش یا پاسخ‌های آماده.",
  "برای کسب‌وکارهای شهرهای دیگر استان و خارج از استان، همکاری کاملاً آنلاین با جلسهٔ تصویری انجام می‌شود.",
];

const COVERED_CITIES = [
  "قزوین",
  "محمدیه",
  "الوند",
  "اقبالیه",
  "شریفیه",
  "آبیک",
  "تاکستان",
  "بوئین‌زهرا",
  "آوج",
  "معلم‌کلایه",
];

const LOCAL_CASES = [
  {
    title: "قزوین تصویر",
    desc: "وب‌سایت شرکتی دوزبانه برای یک شرکت بازرگانی و ترابری مستقر در قزوین.",
    href: "/portfolio/qazvi-tasvir",
    meta: "وب‌سایت شرکتی",
  },
  {
    title: "دفتر وکالت لیلا آبکه",
    desc: "وب‌سایت ۶۵ صفحه‌ای یک وکیل دادگستری در قزوین، با معرفی خدمات حقوقی و مقالات تخصصی.",
    href: "/portfolio/leyla-abkeh",
    meta: "وب‌سایت تخصصی",
  },
  {
    title: "کارن چاپ",
    desc: "چاپخانهٔ کارن چاپ در الوند قزوین؛ سفارش آنلاین چاپ، مهر و صحافی با پیش‌فاکتور شفاف.",
    href: "/print",
    meta: "سامانهٔ سفارش چاپ",
  },
];

const FAQS = [
  {
    q: "هزینه طراحی سایت در قزوین چقدر است؟",
    a: "هزینه به دامنهٔ پروژه بستگی دارد: تعداد صفحه‌ها، امکانات سفارشی و نیاز به اتصال به سامانه‌های دیگر. پس از جلسهٔ کشف و روشن‌شدن دامنه، پیشنهاد مکتوب با مراحل و قیمت ارائه می‌شود؛ قیمت نهایی پیش از شروع کار مشخص است و در میانهٔ پروژه تغییر نمی‌کند.",
  },
  {
    q: "آیا جلسهٔ حضوری در قزوین برگزار می‌شود؟",
    a: `بله. دفتر کارن سافت در ${SITE.address} است و جلسهٔ حضوری با هماهنگی قبلی در ساعات کاری برگزار می‌شود. اگر ترجیح می‌دهید آنلاین صحبت کنیم، جلسهٔ تصویری هم امکان‌پذیر است.`,
  },
  {
    q: "برای شهرهای دیگر استان قزوین هم پروژه می‌گیرید؟",
    a: "بله؛ محمدیه، الوند، آبیک، تاکستان، بوئین‌زهرا و دیگر شهرهای استان در محدودهٔ همکاری هستند. اجرای پروژه برای کسب‌وکارهای خارج از استان هم به‌صورت کاملاً آنلاین انجام می‌شود.",
  },
  {
    q: "پشتیبانی نرم‌افزار پس از تحویل چگونه است؟",
    a: "شرایط پشتیبانی در قرارداد نوشته می‌شود: رفع اشکال، به‌روزرسانی و پاسخ به پرسش‌های کاربران در بازهٔ زمانی مشخص. برای سامانه‌های سازمانی، آموزش کاربران و مستندات فارسی هم بخشی از تحویل است.",
  },
  {
    q: "نرم‌افزار آماده بهتر است یا نرم‌افزار اختصاصی؟",
    a: "اگر فرایند شما به یکی از محصولات آمادهٔ کارن سافت نزدیک است، نسخهٔ آماده سریع‌تر و کم‌هزینه‌تر است. اگر بخش مهمی از کار شما با فرایندهای استاندارد تفاوت دارد، نرم‌افزار اختصاصی در طول چند سال ارزان‌تر و دقیق‌تر از تغییر دادن عادت کاری تیم درمی‌آید. در جلسهٔ اول، صادقانه هر دو گزینه را بررسی می‌کنیم.",
  },
];

export default function QazvinPage() {
  return (
    <>
      <PageHero
        eyebrow="QAZVIN / LOCAL STUDIO"
        title="طراحی سایت و نرم‌افزار در قزوین"
        description="کارن سافت از قزوین برای کسب‌وکارهای استان وب‌سایت و نرم‌افزار مدیریتی می‌سازد؛ با جلسهٔ حضوری، آموزش تیم و پشتیبانی در دسترس."
      >
        <ButtonLink href="/contact">درخواست مشاوره</ButtonLink>
        <ButtonLink href={`tel:${SITE.phone}`} variant="outline">
          تماس با دفتر
        </ButtonLink>
      </PageHero>

      <ContentSection title="چه چیزی برای کسب‌وکارهای قزوین می‌سازیم؟">
        <p className="lead mb-8 max-w-3xl">
          بیشتر پروژه‌های ما یک مسئلهٔ روشن دارند: کاری که هر روز دستی و تکراری انجام می‌شود، یا فروشی که به
          دلیل نبودن یک صفحهٔ درست از دست می‌رود. همان مسئله را در قزوین هم حل می‌کنیم؛ با همان تیم و همان
          استانداردی که در نمونه‌کارها می‌بینید.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {OFFERS.map((offer) => (
            <Link key={offer.href} href={offer.href} className="surface-card group p-7 transition-transform hover:-translate-y-1">
              <h3 className="mb-3">{offer.title}</h3>
              <p className="text-muted leading-loose">{offer.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-300">
                جزئیات بیشتر
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="چرا همکاری با تیمی که در قزوین است؟">
        <div className="grid gap-8 md:grid-cols-2">
          <Points items={LOCAL_REASONS} />
          <div className="surface-card p-8">
            <h3 className="mb-4">محدودهٔ همکاری در استان قزوین</h3>
            <ul className="flex flex-wrap gap-2" aria-label="شهرهای تحت پوشش در استان قزوین">
              {COVERED_CITIES.map((city) => (
                <li key={city} className="rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs">
                  {city}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-loose text-muted">
              اجرای پروژه برای کسب‌وکارهای تهران، کرج، رشت و دیگر شهرها هم به‌صورت آنلاین انجام می‌شود؛
              نمونه‌کارهای همین سایت از همین مسیر ساخته شده‌اند.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="نمونه‌کارهایی که از قزوین شروع شدند">
        <div className="grid gap-5 md:grid-cols-3">
          {LOCAL_CASES.map((item) => (
            <Link key={item.href} href={item.href} className="surface-card group p-7">
              <p className="text-xs font-bold text-brand-600 dark:text-brand-300">{item.meta}</p>
              <h3 className="mt-3 mb-3">{item.title}</h3>
              <p className="text-sm leading-loose text-muted">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/portfolio" variant="outline">
            همهٔ نمونه‌کارها
          </ButtonLink>
        </div>
      </ContentSection>

      <ContentSection title="پرسش‌های متداول کسب‌وکارهای قزوین">
        <Accordion items={FAQS} />
      </ContentSection>

      <ContentSection title="نشانی، ساعت کاری و راه‌های تماس">
        <div className="surface-card grid gap-6 p-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <MapPin className="size-5 text-brand-500" aria-hidden /> دفتر کارن سافت
            </h3>
            <p className="text-muted leading-loose">{SITE.address}</p>
            <a
              className="mt-3 inline-block text-sm font-bold text-brand-600 dark:text-brand-300"
              href="https://www.google.com/maps/search/?api=1&query=%D9%82%D8%B2%D9%88%DB%8C%D9%86%20%D8%B2%DB%8C%D8%A8%D8%A7%D8%B4%D9%87%D8%B1"
              target="_blank"
              rel="noopener noreferrer"
            >
              مسیریابی در نقشه
            </a>
          </div>
          <div className="space-y-3">
            <h3 className="mb-3 flex items-center gap-2">
              <Clock className="size-5 text-brand-500" aria-hidden /> ساعت کاری
            </h3>
            <p className="text-muted">شنبه تا چهارشنبه: {SITE.workingHours.satWed}</p>
            <p className="text-muted">پنجشنبه: {SITE.workingHours.thu}</p>
            <p className="text-muted">جمعه: {SITE.workingHours.fri}</p>
            <p className="flex items-center gap-2 text-sm">
              <Phone className="size-4 text-brand-500" aria-hidden />
              <a href={`tel:${SITE.phone}`} dir="ltr" className="font-bold">{SITE.phoneDisplay}</a>
              <span className="text-muted" aria-hidden>·</span>
              <Mail className="size-4 text-brand-500" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="font-bold">{SITE.email}</a>
            </p>
          </div>
        </div>
      </ContentSection>

      <ContactCTA />

      <JsonLd
        data={[
          serviceSchema({
            name: "طراحی سایت و نرم‌افزار در قزوین",
            description:
              "طراحی وب‌سایت، توسعهٔ نرم‌افزار اختصاصی و اتوماسیون کسب‌وکار برای شرکت‌ها و کسب‌وکارهای قزوین و استان قزوین.",
            path: "/qazvin",
            serviceType: "طراحی وب‌سایت و نرم‌افزار",
            areaServed: ["ایران"],
            cities: COVERED_CITIES,
            id: "qazvin",
          }),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "طراحی سایت و نرم‌افزار در قزوین", path: "/qazvin" },
          ]),
        ]}
      />
    </>
  );
}
