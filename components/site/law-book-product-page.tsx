import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  BookOpen,
  Check,
  FileText,
  LockKeyhole,
  Phone,
  Search,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { APP_STATS, LAW_CATEGORIES, LAWS } from "@/lib/demos/law-book.data";
import { SITE } from "@/lib/constants";
import type { Product } from "@/lib/products";

export const LAWBOOK_FAQS = [
  {
    q: "آیا کتابچه قانون بدون اینترنت هم کار می‌کند؟",
    a: "پس از نصب و دریافت داده‌های لازم، مطالعه و جست‌وجوی محتوای ذخیره‌شده به اینترنت وابسته نیست. برای دریافت به‌روزرسانی‌های جدید، اتصال به اینترنت لازم است.",
  },
  {
    q: "روی چه دستگاه‌هایی قابل استفاده است؟",
    a: "نسخهٔ وب‌اپلیکیشن روی اندروید، iOS و رایانه‌های ویندوزی از مرورگرهای سازگار نصب می‌شود و به فروشگاه اپلیکیشن نیاز ندارد.",
  },
  {
    q: "آیا کتابچه جایگزین مشاوره یا متن رسمی قانون است؟",
    a: "خیر. کتابچه ابزاری برای دسترسی و مطالعهٔ سریع است؛ برای استناد نهایی، متن و منابع رسمی را بررسی کنید و در موضوعات پرونده‌ای با متخصص حقوقی مشورت داشته باشید.",
  },
  {
    q: "چطور نسخهٔ کامل را تهیه کنم؟",
    a: "روی «ثبت درخواست خرید» بزنید تا فرم سفارش با نام محصول و قیمت ۹۵۰٬۰۰۰ تومان آماده شود. برای هماهنگی خرید و دریافت اطلاعات تکمیلی می‌توانید با کارن سافت تماس بگیرید.",
  },
];

const number = (value: number) => value.toLocaleString("fa-IR");

function LawBookSectionTitle({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) {
  return (
    <div className="lb-section-title">
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function LawBookProductPage({ product }: { product: Product }) {
  const price = number(product.pricingFrom);

  return (
    <div className="lawbook-page" dir="rtl">
      <section className="lb-hero">
        <div className="container-page lb-hero-grid">
          <div className="lb-hero-copy">
            <nav className="lb-breadcrumb" aria-label="مسیر صفحه">
              <Link href="/">خانه</Link><span aria-hidden>／</span><Link href="/products">محصولات</Link><span aria-hidden>／</span><span>کتابچه قانون</span>
            </nav>
            <div className="lb-brand-lockup">
              <Image src={product.logo ?? "/images/lawbook-logo.svg"} alt="لوگوی کتابچه قانون" width={70} height={70} priority />
              <div><span>LAWBOOK · KAREN SOFT</span><strong>کتابچه قانون</strong></div>
            </div>
            <span className="lb-hero-kicker"><span /> مرجع حقوقی همراه · نسخهٔ وب‌اپلیکیشن</span>
            <h1>قانون را<br /><em>دقیق‌تر و سریع‌تر</em> بخوانید.</h1>
            <p className="lb-hero-lead">
              دسترسی به قوانین و مقررات ایران را ساده کنید؛ جست‌وجو کنید، ماده‌ها را کنار هم بخوانید و مرجع ضروری‌تان را حتی آفلاین همراه داشته باشید.
            </p>
            <div className="lb-audience">برای وکلا، کارآموزان وکالت، دانشجویان حقوق و پژوهشگران</div>
            <div className="lb-hero-actions">
              <a className="lb-button lb-button-primary" href="#book-topics">
                فهرست موضوعات کتاب <BookOpen size={16} aria-hidden />
              </a>
              <Link className="lb-button lb-button-outline" href="/contact?product=law-book">
                ثبت درخواست خرید <ArrowLeft size={17} aria-hidden />
              </Link>
            </div>
            <div className="lb-price-line"><span>قیمت نسخهٔ کامل</span><strong>{price} <small>تومان</small></strong><span className="lb-price-note">قیمت شفاف و مشخص</span></div>
          </div>

          <div className="lb-hero-visual" aria-label="نمایی از هویت بصری کتابچه قانون">
            <div className="lb-visual-ring ring-a" /><div className="lb-visual-ring ring-b" />
            <div className="lb-book-cover">
              <div className="lb-cover-logo"><Image src={product.logo ?? "/images/lawbook-logo.svg"} alt="" width={100} height={100} /></div>
              <span className="lb-cover-kicker">مرجع حقوقی ایران</span>
              <strong>کتابچه<br />قانون</strong>
              <span className="lb-cover-divider" />
              <span className="lb-cover-caption">جست‌وجو · مطالعه · دسترسی آفلاین</span>
              <span className="lb-cover-edition">قوانین و مقررات · نسخهٔ دیجیتال</span>
            </div>
            <div className="lb-float-search">
              <span><Search size={14} aria-hidden /> جست‌وجوی فارسی</span>
              <strong>ماده ۱۰ قانون مدنی</strong>
              <small><Check size={12} aria-hidden /> نتیجهٔ مرتبط پیدا شد</small>
            </div>
            <div className="lb-float-offline"><WifiOff size={15} aria-hidden /> همیشه در دسترس</div>
          </div>
        </div>
        <a className="lb-scroll-cue" href="#overview"><span>آشنایی با کتابچه</span><ArrowDown size={15} aria-hidden /></a>
      </section>

      <section id="overview" className="lb-overview">
        <div className="container-page">
          <div className="lb-stat-grid" aria-label="آمار کتابخانه">
            <div><strong>{number(APP_STATS.documents)}</strong><span>سند حقوقی</span></div>
            <div><strong>{number(APP_STATS.articles)}</strong><span>مادهٔ قانون</span></div>
            <div><strong>{number(APP_STATS.cases)}</strong><span>رأی قضایی</span></div>
            <div><strong>{number(APP_STATS.categories)}</strong><span>دستهٔ موضوعی</span></div>
          </div>
          <div className="lb-overview-copy">
            <div><span className="lb-overview-mark"><BookOpen size={22} aria-hidden /></span><h2>کمتر بگردید.<br /><em>بیشتر بر موضوع تمرکز کنید.</em></h2></div>
            <p>کتابخانهٔ موضوعی، جست‌وجوی فارسی در قوانین و آراء، نشان‌گذاری مواد مهم و ابزارهای کاربردی؛ همه در یک محیط سبک که روی گوشی و رایانه همراه شماست.</p>
          </div>
        </div>
      </section>

      <section id="features" className="lb-features">
        <div className="container-page">
          <LawBookSectionTitle
            eyebrow="یک مرجع، چند مسیر"
            title="از سؤال تا مادۀ مرتبط؛ بی‌واسطه."
            description="ابزارهای کتابچه قانون برای اینکه متن موردنیازتان را با مسیر روشن‌تری پیدا کنید و به سراغ کار اصلی‌تان برگردید."
          />
          <div className="lb-feature-grid">
            {[
              { icon: Search, index: "۰۱", title: "جست‌وجوی فارسی", text: "در قوانین، مواد و آراء جست‌وجو کنید؛ با پشتیبانی از شکل‌های مختلف حروف و ارقام فارسی." },
              { icon: FileText, index: "۰۲", title: "مطالعۀ ماده‌به‌ماده", text: "در ساختار سند و فصل‌ها حرکت کنید، نشان بگذارید و اندازهٔ متن را متناسب با خود تنظیم کنید." },
              { icon: WifiOff, index: "۰۳", title: "دسترسی آفلاین", text: "پس از نصب و ذخیره‌شدن داده‌ها، محتوای کتابخانه را بدون اتکای دائمی به اینترنت بخوانید." },
              { icon: LockKeyhole, index: "۰۴", title: "یادداشت‌های شخصی", text: "نشان‌ها، یادداشت‌ها و تاریخچۀ جست‌وجوی شما روی همان دستگاه نگهداری می‌شوند." },
            ].map(({ icon: Icon, index, title, text }) => (
              <article className="lb-feature-card" key={index}>
                <span className="lb-feature-index">{index}</span>
                <span className="lb-feature-icon"><Icon size={21} aria-hidden /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="book-topics" className="lb-modules" aria-labelledby="book-topics-title">
        <div className="container-page">
          <LawBookSectionTitle
            id="book-topics-title"
            eyebrow="فهرست مطالب"
            title="چه موضوعاتی در کتابچه قانون هست؟"
            description={`از حقوق مدنی و خانواده تا کیفری، تجارت، مالیات و آیین دادرسی؛ ${number(APP_STATS.documents)} سند حقوقی در ${number(APP_STATS.categories)} دستهٔ موضوعی.`}
          />
          <div className="lb-topic-grid">
            {LAW_CATEGORIES.map((category, index) => {
              const documents = LAWS.filter((law) => law.category === category.id);
              return (
                <article className="lb-topic-card" key={category.id}>
                  <div className="lb-topic-card-heading">
                    <span
                      className="lb-topic-index"
                      style={{ color: category.color, background: `${category.color}14` }}
                      aria-hidden="true"
                    >
                      {number(index + 1).padStart(2, "۰")}
                    </span>
                    <div className="lb-topic-heading-copy">
                      <div className="lb-topic-title-row">
                        <h3>{category.title}</h3>
                        <span className="lb-topic-count">{number(documents.length)} سند</span>
                      </div>
                      <p>{category.description}</p>
                    </div>
                  </div>
                  <div className="lb-topic-documents">
                    <span>اسناد این بخش</span>
                    <ul aria-label={`اسناد ${category.title}`}>
                      {documents.map((law) => <li key={law.id}>{law.shortTitle}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="lb-topic-note">
            <BookOpen size={19} aria-hidden="true" />
            <p>
              علاوه بر اسناد بالا، {number(APP_STATS.cases)} رأی قضایی منتخب در موضوعات حقوقی، کیفری و اداری نیز در کتابخانه گردآوری شده است.
            </p>
          </div>
        </div>
      </section>

      <section className="lb-install">
        <div className="container-page lb-install-panel">
          <div className="lb-install-copy">
            <span className="lb-install-icon"><Smartphone size={22} aria-hidden /></span>
            <LawBookSectionTitle eyebrow="بدون فروشگاه اپلیکیشن" title="از مرورگر نصب کنید؛ مثل یک اپ بازش کنید." description="کتابچه قانون یک وب‌اپلیکیشن پیش‌رونده است. از مرورگر دستگاه‌تان آن را به صفحهٔ اصلی اضافه کنید و با آیکون خودش اجرا کنید." />
          </div>
          <div className="lb-platform-list">
            {[
              { name: "اندروید", hint: "Chrome ← افزودن به صفحهٔ اصلی" },
              { name: "آیفون و آیپد", hint: "Safari ← اشتراک‌گذاری ← افزودن به صفحهٔ اصلی" },
              { name: "ویندوز", hint: "Edge یا Chrome ← نصب از نوار نشانی" },
            ].map((item) => <div key={item.name}><Check size={16} aria-hidden /><span><strong>{item.name}</strong><small>{item.hint}</small></span></div>)}
          </div>
        </div>
      </section>

      <section className="lb-pricing">
        <div className="container-page lb-pricing-inner">
          <div className="lb-pricing-copy">
            <span className="lb-pricing-kicker">دسترسی به نسخۀ کامل</span>
            <h2>کتابخانهٔ حقوقی‌تان<br /><em>همیشه دمِ دست.</em></h2>
            <p>پیش از تهیه، فهرست موضوعات و اسناد گردآوری‌شده را در همین صفحه بررسی کنید.</p>
            <div className="lb-pricing-assurances"><span><Check size={14} aria-hidden /> {number(APP_STATS.documents)} سند حقوقی</span><span><Check size={14} aria-hidden /> نصب روی موبایل و دسکتاپ</span><span><Check size={14} aria-hidden /> جست‌وجو و مطالعهٔ آفلاین</span></div>
          </div>
          <div className="lb-price-card">
            <Image src={product.logo ?? "/images/lawbook-logo.svg"} alt="" width={52} height={52} />
            <span>کتابچه قانون · نسخۀ کامل</span>
            <strong>{price} <small>تومان</small></strong>
            <p>برای هماهنگی خرید، اطلاعات تماس‌تان را ثبت کنید.</p>
            <Link href="/contact?product=law-book" className="lb-button lb-button-gold">ثبت درخواست خرید <ArrowLeft size={16} aria-hidden /></Link>
            <a className="lb-phone-link" href={`tel:${SITE.phone}`}><Phone size={14} aria-hidden /> خرید تلفنی: <span dir="ltr">{SITE.phoneDisplay}</span></a>
          </div>
        </div>
      </section>

      <section className="lb-faq">
        <div className="container-page lb-faq-grid">
          <LawBookSectionTitle eyebrow="پاسخ‌های روشن" title="پیش از تهیه، این‌ها را بدانید." description="اگر پرسش دیگری دارید، از راه‌های ارتباطی کارن سافت بپرسید." />
          <Accordion items={LAWBOOK_FAQS} />
        </div>
      </section>

      <section className="lb-disclaimer">
        <div className="container-page"><p><strong>یادآوری حقوقی:</strong> کتابچه قانون برای دسترسی و مطالعۀ منابع گردآوری‌شده طراحی شده و جایگزین متن رسمی قانون، مشاورۀ حقوقی یا نظر وکیل نیست. برای استناد نهایی، منبع رسمی را بررسی کنید.</p></div>
      </section>
    </div>
  );
}
