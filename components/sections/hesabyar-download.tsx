import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, Calculator, Download, Globe, KeyRound, Package, ShieldCheck, ShoppingCart, Smartphone, Users, Wallet, WifiOff } from "lucide-react";

/** نسخهٔ آزمایشی ۱٫۳٫۰ حساب‌یار اندروید (بیلد تست) — هنگام انتشار نسخهٔ تازه این دو مقدار را هم به‌روز کنید. */
export const HESABYAR_APK_URL = "https://github.com/rahmaniho/KarenYar/releases/download/android-test-v1.3.0-40718514579-1/hesabyar-1.3.0-test.apk";
export const HESABYAR_VERSION = "۱٫۳٫۰";
/** کد بازبینی SHA-256 فایل همین نسخه؛ هنگام به‌روزرسانی فایل، این مقدار را نیز عوض کنید. */
export const HESABYAR_APK_SHA256 = "905ad9563d789ca13a34ee1caf8ca37bf95a74c2a3e4b4f5033ba899c2e6beb0";
/** نسخهٔ تحت وب همان برنامه؛ همان داده‌ها روی مرورگر دستگاه و قابل نصب به‌صورت PWA. */
export const HESABYAR_WEB_URL = "https://hesabyar.karen-soft.ir/";

/** قیمت‌های لایسنس نسخهٔ حرفه‌ای؛ مبالغ به تومان و بدون جداکننده نگه داشته می‌شوند تا محاسبه/نمایش ساده بماند. */
export const HESABYAR_PLANS = [
  { id: "lifetime", title: "مادام‌العمر", price: 270_000, period: "پرداخت یک‌باره", note: "همهٔ امکانات نامحدود، خروجی PDF و پشتیبان‌گیری، بدون تمدید سالانه." },
  { id: "yearly", title: "یک‌ساله", price: 130_000, period: "۱۲ ماه", note: "دسترسی حرفه‌ای برای یک سال؛ مناسب استفادهٔ سالانهٔ فروشگاه." },
  { id: "half-year", title: "شش‌ماهه", price: 70_000, period: "۶ ماه", note: "کوتاه‌ترین دورهٔ حرفه‌ای برای شروع و آزمودن کامل امکانات." },
] as const;

const features = [
  { icon: ShoppingCart, title: "صندوق فروش", text: "کاتالوگ و جست‌وجوی نام یا بارکد، سبد فروش، تعداد اعشاری، قلم خدمات، تخفیف و مالیات، ثبت نقدی، کارت‌خوان، انتقال و نسیه با میان‌برهای صفحه‌کلید." },
  { icon: Package, title: "فروشگاه و انبار", text: "کالا و موجودی، قیمت تمام‌شده و سود هر کالا، صدور فاکتور با کسر خودکار موجودی، ورود و گردش انبار با تاریخچه و اسکن بارکد با دوربین." },
  { icon: BookOpenCheck, title: "دفتر مالی کسب‌وکار", text: "هر فروش تأییدشده یک درآمد خودکار ثبت می‌کند؛ دفتر مستقل کسب‌وکار و دفتر سراسری، گزارش تسویه و وصول نسیه، و ابطال فاکتور با دلیل و حفظ سند." },
  { icon: Wallet, title: "امور مالی شخصی", text: "ثبت درآمد و هزینه، بودجه‌بندی ماهانه با هشدار سقف، مدیریت بدهی و اقساط، نمودارهای مالی و خروجی CSV." },
  { icon: Users, title: "حقوق و دستمزد", text: "مدیریت کارکنان، محاسبه حقوق، بیمه و مالیات با تنظیمات قابل ویرایش، عیدی، سنوات و فیش حقوقی." },
  { icon: Calculator, title: "محاسبات حرفه‌ای", text: "ماشین‌حساب علمی، محاسبه وام و اقساط، تبدیل واحد و ارز، طلا و سکه با نرخ‌های قابل ویرایش." },
];

export function HesabyarDownload() {
  return (
    <section id="hesabyar-download" className="ks-hesabyar" aria-labelledby="hesabyar-title">
      <div className="ks-hesabyar-intro">
        <span className="ks-hesabyar-eyebrow"><Smartphone size={17} aria-hidden="true" /> اپلیکیشن اندروید و وب کارن سافت</span>
        <h2 id="hesabyar-title">حساب‌یار؛<br />حساب‌وکتاب، همیشه همراه شما.</h2>
        <p>از دخل‌وخرج روزانه تا صندوق فروش و حقوق کارکنان؛ ابزارهای مالی فارسی در یک برنامهٔ راست‌چین با تاریخ شمسی و حالت روشن و تاریک.</p>
        <p className="ks-hesabyar-new"><strong>تازه در نسخهٔ ۱٫۳:</strong> صندوق فروش با کسر خودکار موجودی و ثبت خودکار درآمد در دفتر مالی کسب‌وکار؛ بدون ورود دوبارهٔ اطلاعات.</p>
        <div className="ks-hesabyar-badges">
          <span><WifiOff size={15} aria-hidden="true" /> قابل استفاده آفلاین</span>
          <span><ShieldCheck size={15} aria-hidden="true" /> ذخیرهٔ داده‌ها روی دستگاه و قفل با پین</span>
        </div>
        <div className="ks-hesabyar-actions">
          <a className="ks-hesabyar-download" href={HESABYAR_APK_URL}>
            <Download size={21} aria-hidden="true" /> دانلود مستقیم نسخهٔ اندروید
          </a>
          <a className="ks-hesabyar-web" href={HESABYAR_WEB_URL}>
            <Globe size={20} aria-hidden="true" /> ورود به نسخهٔ وب
          </a>
        </div>
        <p className="ks-hesabyar-file">نسخهٔ <bdi>{HESABYAR_VERSION}</bdi> · فایل APK · حدود ۷٫۳ مگابایت · اندروید ۷ و بالاتر</p>
        <p className="ks-hesabyar-web-note">نسخهٔ وب همان برنامه در مرورگر است: بدون نصب، قابل افزودن به صفحهٔ اصلی (PWA) و آفلاین؛ داده‌ها روی همان دستگاه می‌مانند. کلید لایسنس در بخش تنظیمات برنامه فعال می‌شود.</p>
        <Link href="/blog/hesabyar-personal-budget" className="ks-hesabyar-guide">راهنمای مدیریت درآمد و هزینه با حساب‌یار ←</Link>
        <Link href="/blog/hesabyar-store-inventory" className="ks-hesabyar-guide">راهنمای صندوق فروش، موجودی و فاکتور ←</Link>
        <p className="ks-hesabyar-license">شروع با نسخهٔ رایگان: ماشین‌حساب کامل، ۱ کالا و ۱۰ تراکنش. امکانات نامحدود، خروجی PDF و پشتیبان‌گیری به فعال‌سازی نسخهٔ حرفه‌ای نیاز دارند.</p>
      </div>
      <div className="ks-hesabyar-details">
        <Image
          src="/images/hesabyar/hesabyar-android.jpg"
          alt="تصویر معرفی حساب‌یار اندروید با لوگوی اصلی برنامه و نمای مفهومی ابزارهای مالی"
          width={1536}
          height={864}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="ks-hesabyar-image"
        />
        <div className="ks-hesabyar-features">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title}><Icon size={23} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
        <details className="ks-hesabyar-install">
          <summary>راهنمای نصب و نکات نسخهٔ اندروید</summary>
          <ol>
            <li>با دکمهٔ دانلود مستقیم، فایل APK را دریافت و باز کنید.</li>
            <li>اگر اندروید درخواست کرد، اجازهٔ «نصب برنامه‌های ناشناس» را فقط برای مرورگر یا فایل‌منیجر مورد استفاده فعال کنید؛ پس از نصب می‌توانید آن را غیرفعال کنید.</li>
            <li>نصب را تأیید کنید و حساب‌یار را از فهرست برنامه‌ها باز کنید.</li>
          </ol>
          <p>فایل ارائه‌شده بیلد آزمایشی (test/debug) است، نه نسخهٔ نهایی فروشگاهی. امضای بیلد آزمایشی با نسخهٔ قبلی یکسان نیست؛ بنابراین این فایل ممکن است روی نصب قبلی به‌صورت به‌روزرسانی نصب نشود. پیش از به‌روزرسانی یا حذف برنامه، از داخل برنامه پشتیبان JSON بگیرید تا داده‌های محلی از دست نروند. دانلود اولیه به اینترنت نیاز دارد؛ نرخ ارز در حالت آفلاین زنده نیست و می‌توانید آن را دستی ویرایش کنید.</p>
          <p>روش‌های پرداخت در صندوق (نقدی، کارت‌خوان، انتقال و نسیه) ثبت حسابداری‌اند؛ برنامه به بانک یا پایانهٔ پرداخت متصل نمی‌شود و درآمد فروش فقط از طریق فاکتور اصلاح یا ابطال می‌شود.</p>
          <p className="ks-hesabyar-sha">کد بازبینی فایل (SHA-256): <code dir="ltr">{HESABYAR_APK_SHA256}</code></p>
        </details>
      </div>
      <div className="ks-hesabyar-pricing">
        <div className="ks-hesabyar-pricing-head">
          <span><KeyRound size={17} aria-hidden="true" /> لایسنس نسخهٔ حرفه‌ای</span>
          <h3>یک‌بار بخرید، آفلاین فعال کنید.</h3>
          <p>کلید لایسنس به‌صورت آفلاین در تنظیمات برنامه وارد می‌شود و به اینترنت وابسته نیست. دوره‌ها بدون تمدید خودکارند و قیمت‌ها به تومان است.</p>
        </div>
        <ul className="ks-hesabyar-plans">
          {HESABYAR_PLANS.map((plan) => (
            <li key={plan.id} className={plan.id === "lifetime" ? "is-featured" : undefined}>
              <span className="ks-plan-title">{plan.title}{plan.id === "lifetime" ? <em>پیشنهاد ما</em> : null}</span>
              <strong className="ks-plan-price"><bdi>{plan.price.toLocaleString("fa-IR")}</bdi> <small>تومان</small></strong>
              <span className="ks-plan-period">{plan.period}</span>
              <p>{plan.note}</p>
            </li>
          ))}
        </ul>
        <p className="ks-hesabyar-pricing-foot">لایسنس برای هر دو نسخهٔ اندروید و وب همان برنامه معتبر است. برای خرید یا تمدید، از <Link href="/contact">صفحهٔ تماس</Link> سفارش خود را ثبت کنید.</p>
      </div>
    </section>
  );
}
