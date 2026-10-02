import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Mail, MapPin, Phone, PlayCircle, Quote } from "lucide-react";
import { FAQS, PROCESS_STEPS, SERVICES, SITE, STATS, TESTIMONIALS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";
import { INDUSTRIES } from "@/lib/industries";
import { CASE_STUDIES } from "@/lib/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/shared/reveal";
import { StatsBar } from "@/components/shared/stats-bar";
import { NumberedCard } from "@/components/shared/numbered-card";
import { ProductCard } from "@/components/shared/product-card";
import { IndustryCard } from "@/components/shared/industry-card";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { ContactForm } from "@/components/sections/contact-form";

export function ServicesSection() {
  return (
    <section id="services" className="section-y bg-[var(--surface-raised)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="خدمات"
          eyebrowLatin="Services"
          index="۰۱"
          title="آنچه برای شما می‌سازیم"
          description="چهار خدمت، یک تیم فنی. از رابط کاربری تا زیرساخت؛ هرچه می‌سازیم با معیار قابل اندازه‌گیری تحویل داده می‌شود."
          action={
            <ButtonLink href="/services" variant="outline" size="sm">
              همه خدمات
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06}>
              <article className="surface-card h-full p-7 transition-all duration-[250ms] hover:-translate-y-1 hover:border-brand-300 hover:shadow-[var(--shadow-lift)]">
                <span className="grid size-12 place-items-center rounded-[var(--radius-md)] bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                  <Icon name={service.icon} className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{service.title}</h3>
                <p className="mt-2 text-xs leading-loose text-muted">{service.desc}</p>
                <ul className="mt-5 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-2xs font-bold text-muted">
                      <Check className="size-3.5 text-brand-500" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoSpotlight() {
  const featured = PRODUCTS.filter((p) => p.status === "active").slice(0, 4);
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="دموی زنده"
          eyebrowLatin="Live demo"
          index="۰۲"
          title="قبل از خرید، امتحان کنید"
          description="همه ۱۰ محصول ما دموی زنده دارند — بدون نصب، بدون ثبت‌نام."
          action={
            <ButtonLink href="/demo" size="sm">
              مشاهده همه دموها
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
        <div className="scrollbar-thin -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/demo/${product.demoSlug}`}
              className="group surface-card w-[280px] shrink-0 snap-start overflow-hidden transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] lg:w-auto"
            >
              <div className="relative h-36 overflow-hidden" style={{ background: `linear-gradient(140deg, ${product.accent}33, ${product.accent}0d)` }}>
                <div className="absolute inset-x-5 top-5 rounded-t-[var(--radius-md)] bg-[var(--surface-raised)] p-3 shadow-[0_14px_34px_rgba(0,0,0,.12)] transition-transform duration-[450ms] group-hover:-translate-y-2">
                  <div className="flex gap-1" aria-hidden>
                    <span className="size-1.5 rounded-full bg-rose-300" />
                    <span className="size-1.5 rounded-full bg-amber-300" />
                    <span className="size-1.5 rounded-full bg-emerald-300" />
                  </div>
                  <div className="mt-3 h-2 w-2/3 rounded-full" style={{ background: product.accent }} aria-hidden />
                  <div className="mt-2 grid grid-cols-3 gap-1" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-6 rounded bg-[var(--surface-sunken)]" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="flex items-center gap-2 text-md font-extrabold">
                  <span aria-hidden>{product.emoji}</span>
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-2xs leading-loose text-muted">{product.short}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-2xs font-extrabold text-brand-600 dark:text-brand-300">
                  <PlayCircle className="size-4" aria-hidden />
                  اجرای دمو
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="section-y bg-[var(--surface-raised)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="محصولات"
          eyebrowLatin="Products"
          index="۰۳"
          title="۱۰ محصول آماده برای صنایع مختلف"
          description="هر محصول از دل ده‌ها پروژه بیرون آمده؛ برای فرایندهای خاص کسب‌وکار شما سفارشی می‌شود."
          action={
            <ButtonLink href="/products" variant="outline" size="sm">
              همه محصولات
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 3) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustryShowcase() {
  const picks = ["restaurant", "beauty-salon", "law-firm", "ecommerce", "medical-clinic", "saas"];
  const items = picks
    .map((slug) => INDUSTRIES.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="طراحی برای صنایع"
          eyebrowLatin="Industries"
          index="۰۴"
          title="هر کسب‌وکار، زبان بصری خودش را دارد"
          description="نمونه طراحی‌های کارن سافت برای صنایع مختلف؛ هر کدام با پالت، تایپوگرافی و ریتم چیدمان مخصوص خود."
          action={
            <ButtonLink href="/demo/industries" variant="outline" size="sm">
              گالری کامل
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((industry, index) => (
            <Reveal key={industry.slug} delay={(index % 3) * 0.05}>
              <IndustryCard industry={industry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  const cases = CASE_STUDIES.slice(0, 2);
  return (
    <section className="section-y bg-[var(--surface-raised)]">
      <div className="container-page">
        <SectionHeading
          eyebrow="نمونه‌کارها"
          eyebrowLatin="Case studies"
          index="۰۶"
          title="نتیجه‌هایی که قابل اندازه‌گیری‌اند"
          action={
            <ButtonLink href="/portfolio" variant="outline" size="sm">
              همه پروژه‌ها
              <ArrowLeft className="size-4" aria-hidden />
            </ButtonLink>
          }
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group surface-card overflow-hidden transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative h-72 overflow-hidden" style={{ background: `${item.accent}22` }}>
                <Image
                  src={item.cover}
                  alt={`نمای پروژه ${item.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-8 transition-transform duration-[600ms] group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-6 p-6">
                <div>
                  <span className="text-4xs font-extrabold text-brand-600">{item.category}</span>
                  <h3 className="mt-1 text-xl font-extrabold">{item.title}</h3>
                  <p className="mt-2 max-w-md text-xs leading-loose text-muted">{item.summary}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[var(--border-subtle)] transition-all group-hover:rotate-45 group-hover:border-brand-500 group-hover:text-brand-600">
                  <ArrowLeft className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <StatsBar stats={STATS} className="mt-10" />
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="فرایند همکاری"
            eyebrowLatin="Process"
            index="۰۷"
            title="چهار گام تا محصول نهایی"
            description="فرایند شفاف: همیشه می‌دانید در کدام مرحله‌اید و گام بعدی دقیقاً چیست."
            className="mb-0"
          />
          <ButtonLink href="/contact" className="mt-8">
            شروع پروژه
            <ArrowLeft className="size-4" aria-hidden />
          </ButtonLink>
        </div>
        <ol className="list-none">
          {PROCESS_STEPS.map((step) => (
            <NumberedCard key={step.n} index={step.n} title={step.title} desc={step.desc} />
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TestimonialSection() {
  const [primary] = TESTIMONIALS;
  return (
    <section className="section-y bg-[var(--surface-raised)]">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-[var(--radius-2xl)] bg-ink-900 text-white lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative min-h-72">
            <Image
              src="/images/Hosein-rahmani.jpg"
              alt="حسین رحمانی، بنیان‌گذار کارن سافت"
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-cover"
            />
            <span className="absolute bottom-5 end-5 rounded-full border border-white/30 px-3 py-1 text-4xs">
              {SITE.founder} · بنیان‌گذار
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-16">
            <Quote className="size-10 text-brand-400" aria-hidden />
            <blockquote className="mt-5 text-xl leading-loose lg:display-3">{primary.quote}</blockquote>
            <div className="mt-8">
              <strong className="text-sm">{primary.name}</strong>
              <small className="block text-3xs text-white/55">{primary.role}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeading eyebrow="سؤالات پرتکرار"
          eyebrowLatin="FAQ" title="پاسخ شفاف، بدون ابهام" className="mb-0" />
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-ink-900 py-20 text-white lg:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <span className="text-xs font-extrabold text-brand-300">تماس با ما</span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[44px]">
            پروژه‌تان را <em className="not-italic text-brand-400">شروع کنیم؟</em>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-loose text-white/60">
            فرم را پر کنید یا مستقیم تماس بگیرید. معمولاً کمتر از یک روز کاری پاسخ می‌دهیم.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              { icon: Phone, label: "تلفن", value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
              { icon: Mail, label: "ایمیل", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: MapPin, label: "نشانی", value: SITE.address },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3 border-t border-white/10 pt-4">
                <item.icon className="size-4 text-brand-300" aria-hidden />
                <span className="flex flex-col">
                  <small className="text-4xs text-white/45">{item.label}</small>
                  {item.href ? (
                    <a href={item.href} className="text-xs font-bold hover:text-brand-300">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-xs font-bold">{item.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="section-y">
      <div className="container-page">
        <div className="surface-card flex flex-col items-center gap-6 p-10 text-center lg:flex-row lg:justify-between lg:text-start">
          <div>
            <h2 className="text-2xl font-extrabold">ماهی یک ایمیل، پر از نکته کاربردی</h2>
            <p className="mt-2 text-sm text-muted">تجربه‌های واقعی پروژه‌ها، بدون تبلیغات و بدون اسپم.</p>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
