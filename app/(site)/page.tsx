import { Class1Community } from "@/components/sections/class1-community";
import Image from "next/image";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { ArrowDownLeft, ArrowUpLeft, Box, Code2, Layers3, MoveUpLeft, Printer, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { PortfolioMarquee } from "@/components/sections/portfolio-marquee";
import { CASE_STUDIES } from "@/lib/portfolio";
import { HOME_SEO, SITE } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { BLOG_POSTS } from "@/lib/blog";
import { ProductCatalogPreview } from "@/components/sections/product-catalog-preview";
import { JsonLd } from "@/components/ui/json-ld";
import { webPageSchema } from "@/lib/schema";
import { CountUp, ExperienceEffects, PortfolioGallery } from "@/components/sections/experience-interactive";
import { ContactForm } from "@/components/sections/contact-form";
import { LawBookSpotlight } from "@/components/sections/law-book-spotlight";
import { HostingBanner } from "@/components/sections/hosting-banner";

import { HesabyarDownload } from "@/components/sections/hesabyar-download";

export const metadata = pageMeta(HOME_SEO);

const showcase = ["qazvi-tasvir", "hanis", "karensoft-hse", "digikaren", "leyla-abkeh", "icecream-factory", "karenwood", "vokalahome"].map(slug => CASE_STUDIES.find(c => c.slug === slug)!);
const cases = ["vokalahome", "qazvi-tasvir", "karensoft-hse"].map(slug => CASE_STUDIES.find(c => c.slug === slug)!);

function Heading({ number, label, title, sub }: { number: string; label: string; title: string; sub?: string }) {
  return <div className="ks-section-heading"><div className="ks-section-kicker"><span>{number} / {label}</span><span className="ks-kicker-rule" /></div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

export default function HomePage() {
  return <div className="ks-home">
    <ExperienceEffects />
    <div className="ks-topline"><span>مهندسی نرم‌افزار و محصولات دیجیتال</span><Link href="/qazvin" dir="ltr" className="ks-topline-link">QAZVIN, IRAN <b> / </b> 36°16′ N</Link><span>SCROLL TO EXPLORE <ArrowDownLeft size={13} /></span></div>

    <section className="ks-hero" aria-labelledby="ks-hero-title">
      <div className="ks-hero-grid" aria-hidden="true" />
      <div className="ks-hero-copy">
        <div className="ks-eyebrow"><span className="ks-eyebrow-line" /> کارن سافت / مهندسی نرم‌افزار <span className="ks-eyebrow-en">/ SOFTWARE & PRODUCTS</span></div>
        <h1 id="ks-hero-title">هوشمندی در خدمت <span>کسب‌وکار</span><span className="ks-period">.</span></h1>
        <p className="ks-hero-subtitle">مهندسی نرم‌افزار برای حل مسائل واقعی</p>
        <p className="ks-hero-desc">از محصولات آماده تا نرم‌افزار اختصاصی و وب‌سایت؛ مسئله را دقیق می‌بینیم، راه‌حل را مهندسی می‌کنیم و محصولی می‌سازیم که قابل استفاده، آزمون و نگهداری باشد.</p>
        <div className="ks-hero-actions"><Link href="/contact" className="ks-button ks-button-primary">درخواست مشاوره <ArrowUpLeft size={19} /></Link><Link href="/products" className="ks-button ks-button-outline">مشاهده محصولات <ArrowDownLeft size={18} /></Link></div>
        <div className="ks-hero-proof"><div className="ks-proof-icons"><span><Code2 size={15} /></span><span><Layers3 size={15} /></span><span><ShieldCheck size={15} /></span></div><span>تحلیل و طراحی، توسعه و تست، استقرار و پشتیبانی<br /><strong>یک مسیر مهندسی، از مسئله تا محصول.</strong></span></div>
      </div>
      <div className="ks-hero-art" aria-hidden="true">
        <div className="ks-orbit ks-orbit-1" /><div className="ks-orbit ks-orbit-2" /><div className="ks-orbit ks-orbit-3" />
        <div className="ks-orbit-halo" />
        <div className="ks-core"><div className="ks-core-inner"><Image src="/images/logo.png" alt="" width={501} height={501} className="ks-core-logo" priority /><span className="ks-core-caption">KAREN SOFT / CORE</span></div></div>
        <div className="ks-orbit-node node-one"><span><Code2 size={18} /></span><small>SOFTWARE</small></div>
        <div className="ks-orbit-node node-two"><span><Box size={18} /></span><small>PRODUCT</small></div>
        <div className="ks-orbit-node node-three"><span><Printer size={18} /></span><small>PRINT</small></div>
        <span className="ks-art-coordinate top">SYS.01 // ENGINEERING</span><span className="ks-art-coordinate bottom">BUILDING WHAT&apos;S NEXT_</span>
        <div className="ks-art-cross c1">+</div><div className="ks-art-cross c2">+</div>
      </div>
      <div className="ks-hero-bottom"><span>PRODUCTS / SERVICES / WORK</span><span className="ks-hero-bottom-line" /><span>مسیر ما از اینجا شروع می‌شود</span></div>
    </section>

    <section className="ks-stats" aria-label="کاتالوگ کارن سافت در یک نگاه">
      <div><span className="ks-stat-num"><CountUp to={PRODUCTS.length} /> <small>محصول</small></span><span>در کاتالوگ نرم‌افزاری</span></div>
      <div><span className="ks-stat-num"><CountUp to={CASE_STUDIES.length} /> <small>مورد</small></span><span>پروژه و نمونه در نمونه‌کارها</span></div>
      <div><span className="ks-stat-num"><CountUp to={BLOG_POSTS.length} /> <small>نوشته</small></span><span>در مرکز دانش</span></div>
      <div className="ks-stats-note"><Sparkles size={23} /><span>شمارش محتوای منتشرشده در همین سایت؛<br /><strong>نه آمار مشتریان یا نتایج تجاری.</strong></span></div>
    </section>

    <section className="ks-section ks-offerings" id="services"><Heading number="01" label="WHAT WE DO" title="تکنولوژی، در خدمت ایده‌های بزرگ." sub="از تحلیل مسئله تا طراحی، توسعه و پشتیبانی؛ خدمات را بر اساس نیاز واقعی کسب‌وکار انتخاب کنید." />
      <div className="ks-service-grid">
        <Link href="/services#software" className="ks-service-card"><span className="ks-card-index">01 / DEVELOPMENT</span><div className="ks-service-icon"><Code2 size={29} strokeWidth={1.4} /></div><h3>توسعه نرم‌افزار</h3><p>معماری دقیق، کد تمیز و محصولاتی که برای رشد کسب‌وکار شما ساخته شده‌اند.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
        <Link href="/services#web" className="ks-service-card"><span className="ks-card-index">02 / EXPERIENCE</span><div className="ks-service-icon purple"><ScanLine size={29} strokeWidth={1.4} /></div><h3>طراحی تجربه دیجیتال</h3><p>وب‌سایت‌ها و رابط‌هایی که زیبا به نظر می‌رسند و بهتر کار می‌کنند.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
        <Link href="/services#automation" className="ks-service-card"><span className="ks-card-index">03 / SYSTEMS</span><div className="ks-service-icon teal"><Layers3 size={29} strokeWidth={1.4} /></div><h3>سیستم‌های اختصاصی</h3><p>اتوماسیون فرایندهای پیچیده؛ ساده، قابل‌اعتماد و متناسب با دنیای واقعی شما.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
      </div>
    </section>

    <section className="ks-section ks-work-showcase" id="selected-work" aria-labelledby="ks-work-showcase-title">
      <div className="ks-heading-row">
        <div className="ks-section-heading">
          <div className="ks-section-kicker"><span>02 / WORK IN MOTION</span><span className="ks-kicker-rule" /></div>
          <h2 id="ks-work-showcase-title">ایده‌هایی که <em>جان گرفته‌اند.</em></h2>
          <p>از وب‌سایت‌های برند تا سامانه‌های اختصاصی؛ گزیده‌ای از پروژه‌ها و نمونه‌های نمایشی ما را در حرکت ببینید.</p>
        </div>
        <Link href="/portfolio" className="ks-text-link">تمام نمونه‌کارها <ArrowUpLeft size={17} /></Link>
      </div>
      <PortfolioMarquee cases={showcase} />
      <div className="ks-work-showcase-foot"><span><i aria-hidden="true" /> طراحی، توسعه و توجه به آخرین جزئیات.</span><Link href="/products">دنبال محصولات آماده هستید؟ <span>مشاهدهٔ محصولات</span><ArrowUpLeft size={15} aria-hidden="true" /></Link></div>
    </section>
    <section className="ks-section ks-product-spotlights" id="products" aria-labelledby="ks-products-title">
      <div className="ks-heading-row">
        <div className="ks-section-heading">
          <div className="ks-section-kicker"><span>03 / OUR PRODUCTS</span><span className="ks-kicker-rule" /></div>
          <h2 id="ks-products-title">محصولات خودمان؛ از نیاز تا ابزار.</h2>
          <p>کارو، کتابچه قانون و مدرسه‌ی من را ببینید؛ یا از کاتالوگ نرم‌افزاری، محصول متناسب با فرایند کسب‌وکارتان را انتخاب کنید.</p>
        </div>
        <Link href="/products" className="ks-text-link">فهرست کامل محصولات <ArrowUpLeft size={17} /></Link>
      </div>
      <ProductCatalogPreview />
      <HesabyarDownload />
      <LawBookSpotlight />
    </section>

    <div className="ks-section"><Class1Community /></div>

    <section className="ks-section ks-print" id="karen-chap"><div className="ks-print-inner">
      <div className="ks-print-copy"><div className="ks-section-kicker"><span>03 / KAREN PRINT</span></div><div className="ks-cmyk-dots"><i /><i /><i /><i /></div><h2>ایده‌ها وقتی<br /><em>ملموس</em> می‌شوند.</h2><h3>کارن چاپ؛ چاپ، مهر و صحافی</h3><p>از اولین طرح روی کاغذ تا آخرین جزئیات چاپ. در کارن چاپ، خلاقیت دیجیتال را به تجربه‌ای واقعی و لمس‌کردنی تبدیل می‌کنیم.</p><Link href="/print" className="ks-button ks-button-light">کشف دنیای کارن چاپ <ArrowUpLeft size={18} /></Link><span className="ks-print-label">CYAN / MAGENTA / YELLOW / KEY</span></div>
      <div className="ks-print-visual"><Image src="/images/print/cards.jpg" alt="نمونه چاپ کارت ویزیت کارن چاپ" fill sizes="(min-width: 1024px) 38vw, 100vw" className="ks-print-photo" /><div className="ks-print-image-overlay" /><div className="ks-print-polaroid"><span className="ks-print-polaroid-frame"><Image src="/images/Tracket.jpg" alt="تابوی نورانی لوگوی کارن چاپ در چاپخانه" fill sizes="150px" className="object-cover" /></span><small>KAREN CHAP ®</small></div><div className="ks-print-sticker"><Printer size={27} /><span>PRINT<br />WITH<br />PURPOSE.</span></div><span className="ks-print-visual-caption">KAREN PRINT ® — MADE TO BE FELT</span></div>
    </div></section>

    <section className="ks-section ks-portfolio" id="work"><div className="ks-heading-row"><Heading number="04" label="SELECTED WORK" title="از ایده تا اثر." sub="چند قاب از آنچه با فکر، جزئیات و عشق به ساختن خلق کرده‌ایم. روی هر پروژه بزنید و در همین صفحه تجربه‌اش کنید." /><Link href="/portfolio" className="ks-text-link">تمام نمونه‌کارها <ArrowUpLeft size={17} /></Link></div><PortfolioGallery cases={cases} /></section>

    <section className="ks-section ks-about" id="about"><div className="ks-about-copy"><Heading number="05" label="THE STORY" title="پشت هر خط کد، یک باور است." /><p>کارن سافت در سال <strong>۱۴۰۴ (2024)</strong> با یک ایده ساده شکل گرفت: فناوری باید مسائل واقعی را حل کند، نه اینکه پیچیدگی تازه بسازد.</p><p>امروز، با هدایت <strong>حسین رحمانی — بنیان‌گذار کارن سافت</strong>، از محصول نرم‌افزاری تا تجربه وب و چاپ، هر پروژه را با همان کنجکاوی روز اول می‌سازیم.</p><Link href="/about" className="ks-text-link">بیشتر درباره ما <ArrowUpLeft size={17} /></Link><Link href="/blog" className="ks-text-link">مرکز دانش کارن سافت <ArrowUpLeft size={17} /></Link></div><div className="ks-about-visual"><div className="ks-about-image"><Image src="/images/Hosein-rahmani.jpg" alt="حسین رحمانی، بنیان‌گذار کارن سافت" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div><div className="ks-timeline"><span className="ks-time-dot" /><div><small>۱۴۰۴ / 2024</small><strong>شروع کارن سافت</strong><p>از یک چشم‌انداز تا نخستین محصول.</p></div><span className="ks-time-dot" /><div><small>امروز / TODAY</small><strong>همچنان در حال ساختن</strong><p>با همان اشتیاق روز اول، رو به آینده.</p></div></div></div></section>

    {/* پیشنهاد همکاری در فروش؛ برچسب AD دارد و از محتوای تحریریه جدا است. */}
    <HostingBanner variant="compact" />

    <section className="ks-contact" id="contact"><div className="ks-contact-intro"><span className="ks-section-kicker">LET&apos;S BUILD TOGETHER / 06</span><h2>پروژه بعدی<br />می‌تواند <em>مال شما</em> باشد.</h2><p>ایده‌ای دارید؟ درباره‌اش حرف بزنیم. از اولین گفت‌وگو تا آخرین خط کد، اینجا هستیم.</p><a href={`mailto:${SITE.email}`} dir="ltr" className="ks-contact-email">{SITE.email} <MoveUpLeft size={20} /></a><div className="ks-contact-ornament" aria-hidden>✳</div></div><div className="ks-contact-form"><span className="ks-form-eyebrow">/ START A CONVERSATION</span><h3>بگذارید از شما بشنویم.</h3><ContactForm /></div></section>
    <div className="ks-endnote"><span>کارن سافت © ۱۴۰۴ — امروز</span><span>با دقت ساخته شده، برای آینده.</span><a href="#main">بازگشت به بالا ↑</a></div>
    <JsonLd data={webPageSchema({ name: HOME_SEO.title, description: HOME_SEO.description, path: HOME_SEO.path, mainEntity: { "@id": `${SITE.url}/#organization` } })} />
  </div>;
}
