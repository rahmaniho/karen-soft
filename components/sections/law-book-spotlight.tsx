import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpLeft, BookOpen, Check, WifiOff } from "lucide-react";
import { APP_STATS } from "@/lib/demos/law-book.data";
import { SITE } from "@/lib/constants";
import { getProduct } from "@/lib/products";

const product = getProduct("law-book")!;
const number = (value: number) => value.toLocaleString("fa-IR");

export function LawBookSpotlight() {
  return (
    <section className="ks-lawbook-spotlight" aria-labelledby="ks-lawbook-title">
      <div className="ks-lawbook-copy">
        <div className="ks-lawbook-eyebrow"><span aria-hidden /> محصول ویژه · مرجع حقوقی همراه</div>
        <div className="ks-lawbook-brand">
          <Image src="/images/lawbook-logo.svg" alt="" width={64} height={64} />
          <div>
            <span>LAWBOOK / KAREN SOFT</span>
            <strong>کتابچه قانون</strong>
          </div>
        </div>
        <h3 id="ks-lawbook-title">قانون را پیدا کنید؛<br /><em>نه میان تب‌های بی‌شمار.</em></h3>
        <p className="ks-lawbook-description">
          یک کتابخانهٔ حقوقی خوش‌ساخت برای وکلا، کارآموزان و دانشجویان؛ با جست‌وجوی فارسی، مطالعهٔ آفلاین و ابزارهایی که هر روز به کار می‌آیند.
        </p>

        <div className="ks-lawbook-stats" aria-label="محتوای کتابچه قانون">
          <div><strong>{number(APP_STATS.documents)}</strong><span>سند حقوقی</span></div>
          <div><strong>{number(APP_STATS.articles)}</strong><span>مادهٔ قانون</span></div>
          <div><strong>{number(APP_STATS.cases)}</strong><span>رأی قضایی</span></div>
          <div><strong>{number(APP_STATS.categories)}</strong><span>دستهٔ موضوعی</span></div>
        </div>

        <div className="ks-lawbook-price">
          <div>
            <span>قیمت نسخهٔ کامل</span>
            <strong>{number(product.pricingFrom)} <small>تومان</small></strong>
          </div>
          <span className="ks-lawbook-offline"><WifiOff size={15} aria-hidden /> قابل استفاده آفلاین</span>
        </div>

        <div className="ks-lawbook-actions">
          <Link href="/products/law-book#book-topics" className="ks-lawbook-button ks-lawbook-button-light">
            فهرست موضوعات کتاب <BookOpen size={16} aria-hidden />
          </Link>
          <Link href="/contact?product=law-book" className="ks-lawbook-button ks-lawbook-button-dark">
            ثبت درخواست خرید <ArrowLeft size={17} aria-hidden />
          </Link>
        </div>
        <p className="ks-lawbook-order-note">سفارش تلفنی: <a href={`tel:${SITE.phone}`} dir="ltr">{SITE.phoneDisplay}</a></p>
        <Link href="/products/law-book" className="ks-lawbook-details">
          آشنایی با امکانات و روش نصب <ArrowUpLeft size={15} aria-hidden />
        </Link>
      </div>

      <div className="ks-lawbook-art" aria-hidden="true">
        <div className="ks-lawbook-art-orbit orbit-one" />
        <div className="ks-lawbook-art-orbit orbit-two" />
        <div className="ks-lawbook-cover">
          <div className="ks-lawbook-cover-mark"><Image src="/images/lawbook-logo.svg" alt="" width={96} height={96} /></div>
          <span className="ks-lawbook-cover-overline">مرجع حقوقی ایران</span>
          <strong>کتابچه<br />قانون</strong>
          <span className="ks-lawbook-cover-rule" />
          <small>دقیق بخوانید. آگاه تصمیم بگیرید.</small>
          <span className="ks-lawbook-cover-edition">نسخهٔ دیجیتال · ۱۴۰۵</span>
        </div>
        <div className="ks-lawbook-search-card">
          <span className="ks-lawbook-search-label"><span /> جست‌وجو در قوانین و مواد</span>
          <strong>مادهٔ ۱۰ قانون مدنی</strong>
          <span className="ks-lawbook-search-result"><Check size={13} aria-hidden /> نتیجه در یک جست‌وجو</span>
        </div>
        <div className="ks-lawbook-art-caption"><span>همراه شما</span><strong>حتی بدون اینترنت</strong></div>
      </div>
    </section>
  );
}
