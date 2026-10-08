import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, Box, Code2, Layers3, MoveUpLeft, Printer, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { CASE_STUDIES } from "@/lib/portfolio";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/ui/json-ld";
import { webPageSchema } from "@/lib/schema";
import { CountUp, ExperienceEffects, PortfolioGallery } from "@/components/sections/experience-interactive";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "کارن سافت | مهندسی نرم‌افزار برای فردا",
  description: "کارن سافت؛ شریک فناوری کسب‌وکارهای ایرانی از سال ۱۴۰۴. توسعه نرم‌افزار، محصولات مدیریتی، طراحی وب و خدمات کارن چاپ.",
  alternates: { canonical: "/" },
};

const featured = ["law-office", "taxi-management", "printing-management", "smart-building"].map(slug => PRODUCTS.find(p => p.slug === slug)!);
const cases = ["vokalahome", "dastmozd-payroll", "karensoft-hse"].map(slug => CASE_STUDIES.find(c => c.slug === slug)!);

function Heading({ number, label, title, sub }: { number: string; label: string; title: string; sub?: string }) {
  return <div className="ks-section-heading"><div className="ks-section-kicker"><span>{number} / {label}</span><span className="ks-kicker-rule" /></div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>;
}

export default function HomePage() {
  return <div className="ks-home">
    <ExperienceEffects />
    <div className="ks-topline"><span><i /> سیستم‌های ما آنلاین‌اند</span><span dir="ltr">QAZVIN, IRAN <b> / </b> 36°16′ N</span><span>SCROLL TO EXPLORE <ArrowDownLeft size={13} /></span></div>

    <section className="ks-hero" aria-labelledby="ks-hero-title">
      <div className="ks-hero-grid" aria-hidden="true" />
      <div className="ks-hero-copy">
        <div className="ks-eyebrow"><span className="ks-eyebrow-line" /> استودیو مهندسی دیجیتال <span className="ks-eyebrow-en">/ EST. 1404</span></div>
        <h1 id="ks-hero-title">فردا را<br /><span>امروز</span> می‌سازیم<span className="ks-period">.</span><span className="ks-hero-subtitle">شریک فناوری کسب‌وکارهای ایرانی از سال <strong>۱۴۰۴ (2024)</strong></span></h1>
        <p className="ks-hero-desc">از یک ایده جسورانه تا محصولی که هر روز کار می‌کند. ما نرم‌افزار، تجربه دیجیتال و زیرساختی می‌سازیم که کسب‌وکار شما را یک قدم جلوتر می‌برد.</p>
        <div className="ks-hero-actions"><Link href="/contact" className="ks-button ks-button-primary">شروع یک همکاری <ArrowUpLeft size={19} /></Link><Link href="#work" className="ks-button ks-button-outline">کشف کارهای ما <ArrowDownLeft size={18} /></Link></div>
        <div className="ks-hero-proof"><div className="ks-proof-icons"><span><Code2 size={15} /></span><span><Layers3 size={15} /></span><span><ShieldCheck size={15} /></span></div><span>ایده‌های پیچیده. راه‌حل‌های ساده.<br /><strong>طراحی شده برای دنیای واقعی.</strong></span></div>
      </div>
      <div className="ks-hero-art" aria-label="نمای گرافیکی از زیرساخت دیجیتال کارن سافت">
        <div className="ks-orbit ks-orbit-1" /><div className="ks-orbit ks-orbit-2" /><div className="ks-orbit ks-orbit-3" />
        <div className="ks-orbit-halo" />
        <div className="ks-core"><div className="ks-core-inner"><span className="ks-core-letter">K<span>.</span></span><span className="ks-core-caption">KAREN / CORE</span></div></div>
        <div className="ks-orbit-node node-one"><span><Code2 size={18} /></span><small>SOFTWARE</small></div>
        <div className="ks-orbit-node node-two"><span><Box size={18} /></span><small>PRODUCT</small></div>
        <div className="ks-orbit-node node-three"><span><Printer size={18} /></span><small>PRINT</small></div>
        <span className="ks-art-coordinate top">SYS.01 // ENGINEERING</span><span className="ks-art-coordinate bottom">BUILDING WHAT&apos;S NEXT_</span>
        <div className="ks-art-cross c1">+</div><div className="ks-art-cross c2">+</div>
      </div>
      <div className="ks-hero-bottom"><span>01 — 05</span><span className="ks-hero-bottom-line" /><span>مسیر ما از اینجا شروع می‌شود</span></div>
    </section>

    <section className="ks-stats" aria-label="کارن سافت در یک نگاه">
      <div><span className="ks-stat-num"><CountUp to={1404} /> <small>/ 2024</small></span><span>آغاز یک مسیر تازه</span></div>
      <div><span className="ks-stat-num"><CountUp to={4} pad /> <small>حوزه</small></span><span>تخصصی، یک نگاه یکپارچه</span></div>
      <div><span className="ks-stat-num"><CountUp to={100} />٪</span><span>متعهد به کیفیت اجرا</span></div>
      <div className="ks-stats-note"><Sparkles size={23} /><span>نه فقط کد.<br /><strong>راه‌حل‌هایی برای رشد.</strong></span></div>
    </section>

    <section className="ks-section ks-offerings" id="services"><Heading number="01" label="WHAT WE DO" title="تکنولوژی، در خدمت ایده‌های بزرگ." sub="هر چالش فرصتی برای ساختن چیزی بهتر است. ما از طراحی تا اجرا، کنار شما هستیم." />
      <div className="ks-service-grid">
        <Link href="/services" className="ks-service-card"><span className="ks-card-index">01 / DEVELOPMENT</span><div className="ks-service-icon"><Code2 size={29} strokeWidth={1.4} /></div><h3>توسعه نرم‌افزار</h3><p>معماری دقیق، کد تمیز و محصولاتی که برای رشد کسب‌وکار شما ساخته شده‌اند.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
        <Link href="/services" className="ks-service-card"><span className="ks-card-index">02 / EXPERIENCE</span><div className="ks-service-icon purple"><ScanLine size={29} strokeWidth={1.4} /></div><h3>طراحی تجربه دیجیتال</h3><p>وب‌سایت‌ها و رابط‌هایی که زیبا به نظر می‌رسند و بهتر کار می‌کنند.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
        <Link href="/services" className="ks-service-card"><span className="ks-card-index">03 / SYSTEMS</span><div className="ks-service-icon teal"><Layers3 size={29} strokeWidth={1.4} /></div><h3>سیستم‌های اختصاصی</h3><p>اتوماسیون فرایندهای پیچیده؛ ساده، قابل‌اعتماد و متناسب با دنیای واقعی شما.</p><span className="ks-card-arrow"><ArrowUpLeft size={20} /></span></Link>
      </div>
    </section>

    <section className="ks-section ks-products" id="products"><div className="ks-heading-row"><Heading number="02" label="OUR PRODUCTS" title="ابزارهایی که کار می‌کنند." sub="برای هر صنعت، پاسخی دقیق. مجموعه‌ای از محصولات کاربردی، ساخته‌شده با درک نیاز شما." /><Link href="/products" className="ks-text-link">همه محصولات <ArrowUpLeft size={17} /></Link></div>
      <div className="ks-product-grid">{featured.map((p, i) => <Link href={`/products/${p.slug}`} className={`ks-product-card ks-product-${i}`} key={p.slug}>
        <div className="ks-product-top"><span>0{i + 1} / PRODUCT</span><ArrowUpLeft size={19} /></div>
        <div className="ks-product-visual" aria-hidden="true"><span className="ks-product-visual-ring" /><span className="ks-product-symbol">{["§", "↗", "◎", "▦"][i]}</span><span className="ks-visual-grid" /></div>
        <div className="ks-product-info"><span className="ks-product-tag">{["حقوقی و وکالت", "حمل‌ونقل", "چاپ و تولید", "مدیریت ساختمان"][i]}</span><h3>{p.name}</h3><p>{p.short}</p><span className="ks-product-explore">مشاهده محصول <ArrowLeft size={16} /></span></div>
      </Link>)}</div>
    </section>

    <section className="ks-section ks-print" id="karen-chap"><div className="ks-print-inner">
      <div className="ks-print-copy"><div className="ks-section-kicker"><span>03 / KAREN PRINT</span></div><div className="ks-cmyk-dots"><i /><i /><i /><i /></div><h2>ایده‌ها وقتی<br /><em>ملموس</em> می‌شوند.</h2><h3>کارن چاپ؛ چاپ، مهر و صحافی</h3><p>از اولین طرح روی کاغذ تا آخرین جزئیات چاپ. در کارن چاپ، خلاقیت دیجیتال را به تجربه‌ای واقعی و لمس‌کردنی تبدیل می‌کنیم.</p><Link href="/print" className="ks-button ks-button-light">کشف دنیای کارن چاپ <ArrowUpLeft size={18} /></Link><span className="ks-print-label">CYAN / MAGENTA / YELLOW / KEY</span></div>
      <div className="ks-print-visual"><Image src="/images/print/cards.jpg" alt="نمونه چاپ کارت ویزیت کارن چاپ" fill sizes="(min-width: 1024px) 38vw, 100vw" className="ks-print-photo" /><div className="ks-print-image-overlay" /><div className="ks-print-sticker"><Printer size={27} /><span>PRINT<br />WITH<br />PURPOSE.</span></div><span className="ks-print-visual-caption">KAREN PRINT ® — MADE TO BE FELT</span></div>
    </div></section>

    <section className="ks-section ks-portfolio" id="work"><div className="ks-heading-row"><Heading number="04" label="SELECTED WORK" title="از ایده تا اثر." sub="چند قاب از آنچه با فکر، جزئیات و عشق به ساختن خلق کرده‌ایم. روی هر پروژه بزنید و در همین صفحه تجربه‌اش کنید." /><Link href="/portfolio" className="ks-text-link">تمام نمونه‌کارها <ArrowUpLeft size={17} /></Link></div><PortfolioGallery cases={cases} /></section>

    <section className="ks-section ks-about" id="about"><div className="ks-about-copy"><Heading number="05" label="THE STORY" title="پشت هر خط کد، یک باور است." /><p>کارن سافت در سال <strong>۱۴۰۴ (2024)</strong> با یک ایده ساده شکل گرفت: فناوری باید مسائل واقعی را حل کند، نه اینکه پیچیدگی تازه بسازد.</p><p>امروز، با هدایت <strong>حسین رحمانی — بنیان‌گذار کارن سافت</strong>، از محصول نرم‌افزاری تا تجربه وب و چاپ، هر پروژه را با همان کنجکاوی روز اول می‌سازیم.</p><Link href="/about" className="ks-text-link">بیشتر درباره ما <ArrowUpLeft size={17} /></Link></div><div className="ks-about-visual"><div className="ks-about-image"><Image src="/images/Hosein-rahmani.jpg" alt="حسین رحمانی، بنیان‌گذار کارن سافت" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" /></div><div className="ks-timeline"><span className="ks-time-dot" /><div><small>۱۴۰۴ / 2024</small><strong>شروع کارن سافت</strong><p>از یک چشم‌انداز تا نخستین محصول.</p></div><span className="ks-time-dot" /><div><small>امروز / TODAY</small><strong>همچنان در حال ساختن</strong><p>با همان اشتیاق روز اول، رو به آینده.</p></div></div></div></section>

    <section className="ks-contact" id="contact"><div className="ks-contact-intro"><span className="ks-section-kicker">LET&apos;S BUILD TOGETHER / 06</span><h2>پروژه بعدی<br />می‌تواند <em>مال شما</em> باشد.</h2><p>ایده‌ای دارید؟ درباره‌اش حرف بزنیم. از اولین گفت‌وگو تا آخرین خط کد، اینجا هستیم.</p><a href={`mailto:${SITE.email}`} dir="ltr" className="ks-contact-email">{SITE.email} <MoveUpLeft size={20} /></a><div className="ks-contact-ornament" aria-hidden>✳</div></div><div className="ks-contact-form"><span className="ks-form-eyebrow">/ START A CONVERSATION</span><h3>بگذارید از شما بشنویم.</h3><ContactForm /></div></section>
    <div className="ks-endnote"><span>کارن سافت © ۱۴۰۴ — امروز</span><span>با دقت ساخته شده، برای آینده.</span><a href="#main">بازگشت به بالا ↑</a></div>
    <JsonLd data={webPageSchema({ name: "کارن سافت | مهندسی نرم‌افزار برای فردا", description: SITE.description, path: "/", mainEntity: { "@id": `${SITE.url}/#organization` } })} />
  </div>;
}
