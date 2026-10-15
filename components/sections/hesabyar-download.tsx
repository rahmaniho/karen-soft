import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calculator, Download, Package, ShieldCheck, Smartphone, Users, Wallet, WifiOff } from "lucide-react";

export const HESABYAR_APK_URL = "https://github.com/rahmaniho/KarenYar/releases/download/v1.2.5/app-debug.apk";

const features = [
  { icon: Package, title: "فروشگاه و انبار", text: "مدیریت کالا و موجودی، صدور فاکتور، اسکن بارکد با دوربین، فروش نسیه و گزارش فروش و سود." },
  { icon: Wallet, title: "امور مالی شخصی", text: "ثبت درآمد و هزینه، بودجه‌بندی ماهانه، مدیریت بدهی و اقساط، نمودارهای مالی و خروجی CSV." },
  { icon: Users, title: "حقوق و دستمزد", text: "مدیریت کارکنان، محاسبه حقوق، بیمه و مالیات با تنظیمات قابل ویرایش، عیدی، سنوات و فیش حقوقی." },
  { icon: Calculator, title: "محاسبات حرفه‌ای", text: "ماشین‌حساب علمی، محاسبه وام و اقساط، تبدیل واحد و ارز و محاسبات طلا با نرخ‌های قابل ویرایش." },
];

export function HesabyarDownload() {
  return (
    <section id="hesabyar-download" className="ks-hesabyar" aria-labelledby="hesabyar-title">
      <div className="ks-hesabyar-intro">
        <span className="ks-hesabyar-eyebrow"><Smartphone size={17} aria-hidden="true" /> اپلیکیشن اندروید کارن سافت</span>
        <h2 id="hesabyar-title">حساب‌یار؛<br />حساب‌وکتاب، همیشه همراه شما.</h2>
        <p>از دخل‌وخرج روزانه تا فروشگاه و حقوق کارکنان؛ ابزارهای مالی فارسی در یک برنامهٔ راست‌چین با تاریخ شمسی و حالت روشن و تاریک.</p>
        <div className="ks-hesabyar-badges">
          <span><WifiOff size={15} aria-hidden="true" /> قابل استفاده آفلاین</span>
          <span><ShieldCheck size={15} aria-hidden="true" /> ذخیرهٔ داده‌ها روی دستگاه و قفل با پین</span>
        </div>
        <a className="ks-hesabyar-download" href={HESABYAR_APK_URL}>
          <Download size={21} aria-hidden="true" /> دانلود مستقیم نسخهٔ اندروید
        </a>
        <p className="ks-hesabyar-file">نسخهٔ <bdi>۱٫۲٫۵</bdi> · فایل APK · حدود ۷٫۳ مگابایت · اندروید ۷ و بالاتر</p>
        <Link href="/blog/hesabyar-personal-budget" className="ks-hesabyar-guide">راهنمای مدیریت درآمد و هزینه با حساب‌یار ←</Link>
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
          <p>فایل ارائه‌شده بیلد آزمایشی (debug) است، نه نسخهٔ نهایی فروشگاهی. پیش از به‌روزرسانی یا حذف برنامه، در صورت دسترسی به قابلیت پشتیبان‌گیری از اطلاعات خود نسخهٔ پشتیبان بگیرید. دانلود اولیه به اینترنت نیاز دارد؛ نرخ ارز در حالت آفلاین زنده نیست و می‌توانید آن را دستی ویرایش کنید.</p>
        </details>
      </div>
    </section>
  );
}
