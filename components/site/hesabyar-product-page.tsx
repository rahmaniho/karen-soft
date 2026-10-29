import Link from "next/link";
import {
  BookOpenCheck,
  Calculator,
  Calculator as CalcIcon,
  Check,
  Download,
  Globe,
  KeyRound,
  Package,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wallet,
  WifiOff,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { ContactCTA } from "@/components/site/page-parts";
import {
  HESABYAR_APK_SHA256,
  HESABYAR_APK_SIZE_MB,
  HESABYAR_APK_URL,
  HESABYAR_FAQS,
  HESABYAR_FEATURES,
  HESABYAR_FREE_TIER,
  HESABYAR_MIN_ANDROID,
  HESABYAR_MODULES,
  HESABYAR_PLANS,
  HESABYAR_VERSION,
  HESABYAR_WEB_URL,
  formatToman,
} from "@/lib/hesabyar";

const ICONS = {
  cart: ShoppingCart,
  package: Package,
  book: BookOpenCheck,
  wallet: Wallet,
  users: Users,
  calculator: Calculator,
} as const;

const HIGHLIGHTS = [
  { title: "صندوق فروش", desc: "سبد فروش، تخفیف و مالیات، نقدی/کارت‌خوان/انتقال/نسیه و میان‌برهای صفحه‌کلید." },
  { title: "کسر خودکار موجودی", desc: "با تأیید فاکتور، سند فروش، گردش انبار و درآمد کسب‌وکار هم‌زمان ثبت می‌شوند." },
  { title: "ابطال با حفظ سند", desc: "ابطال فاکتور با دلیل، موجودی را برمی‌گرداند و درآمد را اصلاح می‌کند؛ دریافت‌های قبلی مشتری حذف نمی‌شود." },
];

export function HesabyarProductPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-[var(--surface-sunken)] py-16 sm:py-20">
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
        <div className="container-page relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <nav aria-label="مسیر صفحه" className="mb-8 flex flex-wrap gap-3 text-xs text-muted">
              <Link href="/" className="hover:text-brand-600">کارن سافت</Link>
              <span aria-hidden>/</span>
              <Link href="/products" className="hover:text-brand-600">محصولات</Link>
              <span aria-hidden>/</span>
              <span aria-current="page">حساب‌یار</span>
            </nav>
            <span className="eyebrow">PRODUCT / HESABYAR · حساب‌یار</span>
            <h1 className="display-1 mt-5 max-w-3xl">حساب‌یار؛ صندوق فروش و حساب‌وکتاب، روی اندروید و مرورگر</h1>
            <p className="lead mt-6 max-w-2xl">
              نرم‌افزار مالی فارسی کارن سافت برای فروشگاه‌های کوچک و حساب شخصی: صندوق فروش، انبار و فاکتور، دفتر مالی کسب‌وکار، بودجهٔ شخصی، حقوق و دستمزد و ماشین‌حساب حرفه‌ای؛ آفلاین، راست‌چین با تاریخ شمسی و داده‌های محلی روی دستگاه خودتان.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={HESABYAR_APK_URL} size="lg">
                <Download className="size-5" aria-hidden /> دانلود نسخهٔ اندروید
              </ButtonLink>
              <ButtonLink href={HESABYAR_WEB_URL} size="lg" variant="outline">
                <Globe className="size-5" aria-hidden /> ورود به نسخهٔ وب
              </ButtonLink>
              <Link href="#pricing" className="text-xs font-bold text-brand-600 underline">
                دیدن قیمت لایسنس ←
              </Link>
            </div>
            <p className="mt-4 text-2xs text-muted">
              نسخهٔ اندروید {HESABYAR_VERSION} (بیلد آزمایشی) · {HESABYAR_MIN_ANDROID} · نسخهٔ وب بدون نصب و قابل افزودن به صفحهٔ اصلی
            </p>
          </div>
          <ul className="grid gap-3">
            <li className="surface-card flex items-center gap-4 p-5">
              <WifiOff className="size-6 shrink-0 text-brand-500" aria-hidden />
              <span className="text-xs leading-loose">بدون اینترنت کار می‌کند؛ نرخ ارز و طلا در حالت آفلاین فقط دستی قابل ویرایش است.</span>
            </li>
            <li className="surface-card flex items-center gap-4 p-5">
              <ShieldCheck className="size-6 shrink-0 text-brand-500" aria-hidden />
              <span className="text-xs leading-loose">داده‌ها روی همان دستگاه ذخیره می‌شوند و با پین قفل می‌شوند؛ پشتیبان JSON در اختیار شماست.</span>
            </li>
            <li className="surface-card flex items-center gap-4 p-5">
              <KeyRound className="size-6 shrink-0 text-brand-500" aria-hidden />
              <span className="text-xs leading-loose">لایسنس حرفه‌ای آفلاین فعال می‌شود و برای نسخهٔ اندروید و وب همان برنامه معتبر است.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" id="versions" aria-labelledby="versions-title">
        <h2 id="versions-title" className="display-3 mb-3">دو نسخه، یک حساب</h2>
        <p className="mb-8 max-w-3xl text-sm leading-loose text-muted">
          همان برنامه، دو راه ورود: فایل نصب اندروید برای گوشی، یا نسخهٔ وب که در مرورگر اجرا می‌شود و آن را مثل یک اپلیکیشن نصب می‌کنید. هیچ‌کدام داده‌ای را به سرور نمی‌فرستند و بین دستگاه‌ها همگام‌سازی خودکار ندارند؛ برای انتقال، از پشتیبان JSON استفاده کنید.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="surface-card flex h-full flex-col p-7">
            <span className="flex items-center gap-2 text-2xs font-extrabold text-brand-600"><Smartphone className="size-4" aria-hidden /> نسخهٔ اندروید</span>
            <h3 className="mt-3">فایل APK نسخهٔ {HESABYAR_VERSION}</h3>
            <p className="mt-3 text-xs leading-loose text-muted">
              بیلد آزمایشی (test) برای نصب و آزمون روی گوشی؛ {HESABYAR_MIN_ANDROID} · حدود {HESABYAR_APK_SIZE_MB} مگابایت. این فایل نسخهٔ فروشگاهی نیست و امضای آن ممکن است با نصب قبلی یکی نباشد؛ پیش از به‌روزرسانی، پشتیبان JSON بگیرید.
            </p>
            <ButtonLink href={HESABYAR_APK_URL} className="mt-6 w-fit">
              <Download className="size-5" aria-hidden /> دریافت فایل APK
            </ButtonLink>
            <p className="mt-4 break-all text-4xs text-muted" dir="ltr">
              SHA-256: {HESABYAR_APK_SHA256}
            </p>
          </article>
          <article className="surface-card flex h-full flex-col p-7">
            <span className="flex items-center gap-2 text-2xs font-extrabold text-brand-600"><Globe className="size-4" aria-hidden /> نسخهٔ وب</span>
            <h3 className="mt-3">hesabyar.karen-soft.ir</h3>
            <p className="mt-3 text-xs leading-loose text-muted">
              بدون نصب و ثبت‌نام باز می‌شود، روی اندروید، iOS و دسکتاپ به صفحهٔ اصلی اضافه می‌شود و پس از اولین بازدید آفلاین کار می‌کند. فعال‌سازی لایسنس در بخش تنظیمات همان نسخه انجام می‌شود.
            </p>
            <ButtonLink href={HESABYAR_WEB_URL} variant="outline" className="mt-6 w-fit">
              <Globe className="size-5" aria-hidden /> باز کردن نسخهٔ وب
            </ButtonLink>
            <p className="mt-4 text-4xs text-muted" dir="ltr">{HESABYAR_WEB_URL}</p>
          </article>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="whats-new-title">
        <h2 id="whats-new-title" className="display-3 mb-3">تازه در نسخهٔ ۱٫۳</h2>
        <p className="mb-8 max-w-3xl text-sm leading-loose text-muted">
          نسخهٔ ۱٫۳ حساب‌یار مسیر فروش را کوتاه می‌کند: یک فروش تأییدشده هم‌زمان موجودی را کم می‌کند و درآمد را در دفتر کسب‌وکار ثبت می‌کند، بدون ورود دوبارهٔ اطلاعات.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((item, index) => (
            <article key={item.title} className="surface-card p-6">
              <span className="sec-index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 mb-2">{item.title}</h3>
              <p className="text-xs leading-loose text-muted">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="features-title">
        <h2 id="features-title" className="display-3 mb-8">امکانات حساب‌یار</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HESABYAR_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon] ?? CalcIcon;
            return (
              <article key={feature.title} className="surface-card p-7">
                <Icon className="size-6 text-brand-500" aria-hidden />
                <h3 className="mt-4 mb-2">{feature.title}</h3>
                <p className="text-xs leading-loose text-muted">{feature.text}</p>
              </article>
            );
          })}
        </div>
        <div className="surface-card mt-6 grid gap-4 p-7 sm:grid-cols-2">
          {HESABYAR_MODULES.map((module) => (
            <p key={module} className="flex gap-3 text-xs leading-loose">
              <Check className="mt-1 size-4 shrink-0 text-brand-500" aria-hidden />
              <span>{module}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" id="pricing" aria-labelledby="pricing-title">
        <h2 id="pricing-title" className="display-3 mb-3">قیمت لایسنس حساب‌یار</h2>
        <p className="mb-8 max-w-3xl text-sm leading-loose text-muted">
          {HESABYAR_FREE_TIER} امکانات نامحدود، خروجی PDF و پشتیبان‌گیری با لایسنس نسخهٔ حرفه‌ای فعال می‌شود؛ فعال‌سازی آفلاین است و دوره‌ها تمدید خودکار ندارند.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {HESABYAR_PLANS.map((plan) => (
            <article key={plan.id} className={`surface-card flex h-full flex-col p-7 ${plan.featured ? "ring-2 ring-brand-500" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="m-0">{plan.title}</h3>
                {plan.featured ? <span className="rounded-full bg-brand-500 px-2.5 py-1 text-4xs font-extrabold text-white">پیشنهاد ما</span> : null}
              </div>
              <p className="mt-5 text-2xl font-extrabold text-[color:var(--text-primary)]">
                <bdi>{formatToman(plan.price)}</bdi>
              </p>
              <span className="mt-1 text-2xs font-bold text-brand-600">{plan.period}</span>
              <p className="mt-4 text-xs leading-loose text-muted">{plan.note}</p>
              <ButtonLink
                href={`/contact?product=hesabyar&plan=${plan.id}`}
                variant={plan.featured ? "primary" : "outline"}
                className="mt-6 w-fit"
              >
                ثبت درخواست
              </ButtonLink>
            </article>
          ))}
        </div>
        <p className="mt-6 text-2xs leading-loose text-muted">
          برای خرید یا تمدید، از صفحهٔ تماس سفارش خود را ثبت کنید. لایسنس برای نسخهٔ اندروید و نسخهٔ وب همان برنامه معتبر است و کلید آن در بخش تنظیمات برنامه وارد می‌شود.
        </p>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="install-title">
        <h2 id="install-title" className="display-3 mb-8">نصب، به‌روزرسانی و نکات مهم</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="surface-card p-7">
            <h3>نصب نسخهٔ اندروید</h3>
            <ol className="mt-4 list-decimal space-y-3 ps-5 text-xs leading-loose text-muted">
              <li>فایل APK را از همین صفحه دریافت و باز کنید.</li>
              <li>اگر اندروید پرسید، اجازهٔ «نصب برنامه‌های ناشناس» را فقط برای مرورگر یا فایل‌منیجر فعال کنید و بعد از نصب غیرفعالش کنید.</li>
              <li>نصب را تأیید و برنامه را از فهرست برنامه‌ها باز کنید.</li>
            </ol>
          </div>
          <div className="surface-card p-7">
            <h3>پیش از به‌روزرسانی یا حذف</h3>
            <ul className="mt-4 space-y-3 text-xs leading-loose text-muted">
              <li>از داخل برنامه پشتیبان JSON بگیرید؛ حذف برنامه داده‌های محلی را پاک می‌کند.</li>
              <li>داده‌ها بین گوشی و نسخهٔ وب خودکار همگام نمی‌شوند؛ پشتیبان، تنها راه انتقال است.</li>
              <li>روش‌های پرداخت صندوق ثبت حسابداری‌اند و به بانک یا پایانهٔ پرداخت متصل نیستند.</li>
              <li>درآمد فروش فقط از طریق اصلاح یا ابطال همان فاکتور تغییر می‌کند؛ برای سند قبلی تاریخچه نگه داشته می‌شود.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="faq-title">
        <h2 id="faq-title" className="display-3 mb-8">سؤالات متداول حساب‌یار</h2>
        <Accordion items={HESABYAR_FAQS.map((item) => ({ q: item.q, a: item.a }))} />
      </section>

      <section className="container-page py-12 sm:py-16" aria-labelledby="guides-title">
        <h2 id="guides-title" className="display-3 mb-8">راهنمای استفاده</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/blog/hesabyar-store-inventory" className="surface-card p-7 transition hover:-translate-y-1">
            <span className="text-2xs font-bold text-brand-600">راهنمای فروشگاه</span>
            <h3 className="mt-3">صندوق فروش و انبار با حساب‌یار؛ راهنمای فروشگاه کوچک</h3>
            <p className="mt-3 text-xs leading-loose text-muted">از ثبت کالا و فاکتور تا خواندن گزارش سود و کنترل نسیه.</p>
          </Link>
          <Link href="/blog/hesabyar-personal-budget" className="surface-card p-7 transition hover:-translate-y-1">
            <span className="text-2xs font-bold text-brand-600">راهنمای مالی شخصی</span>
            <h3 className="mt-3">مدیریت درآمد و هزینه و بودجه‌بندی شخصی</h3>
            <p className="mt-3 text-xs leading-loose text-muted">دسته‌بندی هزینه‌ها، سقف بودجه و تفاوت دفتر شخصی با دفتر کسب‌وکار.</p>
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
