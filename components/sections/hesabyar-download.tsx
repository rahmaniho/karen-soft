import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, Calculator, Download, Globe, KeyRound, Package, ShieldCheck, ShoppingCart, Smartphone, Users, Wallet, WifiOff } from "lucide-react";
import {
  HESABYAR_APK_SHA256,
  HESABYAR_APK_SIZE_MB,
  HESABYAR_APK_URL,
  HESABYAR_FEATURES,
  HESABYAR_FREE_TIER,
  HESABYAR_IMAGE,
  HESABYAR_MIN_ANDROID,
  HESABYAR_PLANS,
  HESABYAR_VERSION,
  HESABYAR_WEB_URL,
} from "@/lib/hesabyar";

/* سازگاری با مصرف‌کننده‌های قبلی این بخش؛ منبع اصلی داده‌ها `lib/hesabyar` است. */
export { HESABYAR_APK_SHA256, HESABYAR_APK_URL, HESABYAR_PLANS, HESABYAR_VERSION, HESABYAR_WEB_URL };
export const HESABYAR_PRODUCT_PATH = "/products/hesabyar";

const ICONS = {
  cart: ShoppingCart,
  package: Package,
  book: BookOpenCheck,
  wallet: Wallet,
  users: Users,
  calculator: Calculator,
} as const;

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
        <p className="ks-hesabyar-file">نسخهٔ <bdi>{HESABYAR_VERSION}</bdi> · فایل APK · حدود {HESABYAR_APK_SIZE_MB} مگابایت · {HESABYAR_MIN_ANDROID}</p>
        <p className="ks-hesabyar-web-note">نسخهٔ وب همان برنامه در مرورگر است: بدون نصب، قابل افزودن به صفحهٔ اصلی (PWA) و آفلاین؛ داده‌ها روی همان دستگاه می‌مانند. کلید لایسنس در بخش تنظیمات برنامه فعال می‌شود.</p>
        <Link href={HESABYAR_PRODUCT_PATH} className="ks-hesabyar-product-link">صفحهٔ حساب‌یار: نسخه‌ها، امکانات و قیمت لایسنس ←</Link>
        <Link href="/blog/hesabyar-personal-budget" className="ks-hesabyar-guide">راهنمای مدیریت درآمد و هزینه با حساب‌یار ←</Link>
        <Link href="/blog/hesabyar-store-inventory" className="ks-hesabyar-guide">راهنمای صندوق فروش، موجودی و فاکتور ←</Link>
        <p className="ks-hesabyar-license">شروع با {HESABYAR_FREE_TIER} امکانات نامحدود، خروجی PDF و پشتیبان‌گیری به فعال‌سازی نسخهٔ حرفه‌ای نیاز دارند.</p>
      </div>
      <div className="ks-hesabyar-details">
        <Image
          src={HESABYAR_IMAGE}
          alt="تصویر معرفی حساب‌یار اندروید و وب با لوگوی اصلی برنامه و نمای مفهومی ابزارهای مالی"
          width={1536}
          height={864}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="ks-hesabyar-image"
        />
        <div className="ks-hesabyar-features">
          {HESABYAR_FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <article key={feature.title}>
                <Icon size={23} aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            );
          })}
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
          <p>کلید لایسنس به‌صورت آفلاین در تنظیمات برنامه وارد می‌شود و به اینترنت وابسته نیست. دوره‌ها بدون تمدید خودکارند و قیمت‌ها به تومان است. جزئیات کامل در <Link href={HESABYAR_PRODUCT_PATH}>صفحهٔ حساب‌یار</Link> آمده است.</p>
        </div>
        <ul className="ks-hesabyar-plans">
          {HESABYAR_PLANS.map((plan) => (
            <li key={plan.id} className={plan.featured ? "is-featured" : undefined}>
              <span className="ks-plan-title">{plan.title}{plan.featured ? <em>پیشنهاد ما</em> : null}</span>
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
