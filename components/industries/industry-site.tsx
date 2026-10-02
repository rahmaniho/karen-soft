import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Phone, Quote, Star } from "lucide-react";
import type { BlockType, Industry } from "@/lib/industries";
import { BookingForm } from "@/components/industries/booking-form";
import { toPersianDigits } from "@/lib/utils";

const FONT_CLASS: Record<Industry["displayFont"], string> = {
  serif: "font-display-serif",
  sans: "font-display-sans",
  legacy: "font-display-legacy",
};

const MOTION_CLASS: Record<Industry["motion"], string> = {
  calm: "motion-calm",
  energetic: "motion-energetic",
  elegant: "motion-elegant",
  playful: "motion-playful",
  precise: "motion-precise",
};

function Section({
  children,
  industry,
  tone = "bg",
  id,
}: {
  children: React.ReactNode;
  industry: Industry;
  tone?: "bg" | "surface";
  id?: string;
}) {
  return (
    <section
      id={id}
      className="px-5 py-14 sm:px-8 lg:py-20"
      style={{ background: tone === "bg" ? industry.palette.bg : industry.palette.surface }}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Heading({ industry, title, sub }: { industry: Industry; title: string; sub?: string }) {
  return (
    <header className="mb-10 text-center">
      <h2 className={`text-2xl font-extrabold sm:text-3xl ${FONT_CLASS[industry.displayFont]}`} style={{ color: industry.palette.text }}>
        {title}
      </h2>
      {sub ? (
        <p className="mx-auto mt-3 max-w-xl text-xs leading-loose" style={{ color: industry.palette.muted }}>
          {sub}
        </p>
      ) : null}
      <span className="mx-auto mt-5 block h-1 w-14 rounded-full" style={{ background: industry.palette.primary }} aria-hidden />
    </header>
  );
}

export function IndustrySite({ industry }: { industry: Industry }) {
  const p = industry.palette;
  const shellStyle = {
    background: p.bg,
    color: p.text,
    "--ind-primary": p.primary,
    "--ind-secondary": p.secondary,
  } as CSSProperties;

  const blocks: Record<BlockType, React.ReactNode> = {
    hero: (
      <section key="hero" className="relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 lg:pb-24 lg:pt-20" style={{ background: p.gradient }}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-3xs font-extrabold"
              style={{ background: p.surface, color: p.primary }}
            >
              <Star className="size-3.5" aria-hidden />
              {industry.hero.badge}
            </span>
            <h1 className={`mt-6 text-3xl font-extrabold leading-tight sm:text-5xl ${FONT_CLASS[industry.displayFont]}`} style={{ color: p.text }}>
              {industry.hero.title}{" "}
              <span style={{ color: p.primary }}>{industry.hero.highlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-loose" style={{ color: p.muted }}>
              {industry.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-6 text-xs font-extrabold transition-opacity hover:opacity-90"
                style={{ background: p.primary, color: p.onPrimary }}
              >
                {industry.hero.primaryCta}
                <ArrowLeft className="size-4" aria-hidden />
              </a>
              <a
                href="#gallery"
                className="inline-flex h-12 items-center rounded-xl border px-6 text-xs font-extrabold transition-colors"
                style={{ borderColor: p.border, color: p.text, background: p.surface }}
              >
                {industry.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {industry.gallery.slice(0, 4).map((item) => (
              <div key={item.title} className="aspect-square rounded-2xl" style={{ background: item.hue }} aria-hidden />
            ))}
          </div>
        </div>
      </section>
    ),
    stats: (
      <Section key="stats" industry={industry} tone="surface">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {industry.stats.map((stat) => (
            <li key={stat.label} className="text-center">
              <strong className="block text-3xl font-extrabold persian-num" style={{ color: p.primary }}>
                {stat.value}
              </strong>
              <span className="mt-1 block text-2xs" style={{ color: p.muted }}>
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    ),
    services: (
      <Section key="services" industry={industry}>
        <Heading industry={industry} title={industry.serviceHeading} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industry.services.map((service) => (
            <article key={service.title} className="rounded-2xl border p-5" style={{ background: p.surface, borderColor: p.border }}>
              <h3 className="text-sm font-extrabold" style={{ color: p.text }}>
                {service.title}
              </h3>
              <p className="mt-2 text-2xs leading-loose" style={{ color: p.muted }}>
                {service.desc}
              </p>
              {service.price ? (
                <p className="mt-3 text-xs font-extrabold persian-num" style={{ color: p.primary }}>
                  {service.price}
                </p>
              ) : null}
              {service.meta ? (
                <p className="mt-2 text-3xs" style={{ color: p.muted }}>
                  {service.meta}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>
    ),
    menu: (
      <Section key="menu" industry={industry} tone="surface">
        <Heading industry={industry} title={industry.serviceHeading} />
        <ul className="mx-auto max-w-3xl space-y-4">
          {industry.services.map((item) => (
            <li key={item.title} className="flex items-end gap-3">
              <span className="text-sm font-extrabold" style={{ color: p.text }}>
                {item.title}
              </span>
              <span className="mb-1.5 flex-1 border-b border-dashed" style={{ borderColor: p.border }} aria-hidden />
              <span className="text-xs font-extrabold persian-num" style={{ color: p.primary }}>
                {item.price}
              </span>
            </li>
          ))}
        </ul>
      </Section>
    ),
    gallery: (
      <Section key="gallery" industry={industry} id="gallery">
        <Heading industry={industry} title={industry.galleryHeading} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.gallery.map((item) => (
            <figure key={item.title} className="overflow-hidden rounded-2xl">
              <div className="aspect-4/3" style={{ background: item.hue }} aria-hidden />
              <figcaption className="px-1 py-3 text-2xs font-bold" style={{ color: p.text }}>
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    ),
    team: (
      <Section key="team" industry={industry} tone="surface">
        <Heading industry={industry} title={industry.teamHeading} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industry.team.map((member) => (
            <article key={member.name} className="rounded-2xl border p-6 text-center" style={{ borderColor: p.border, background: p.bg }}>
              <span className="mx-auto block size-16 rounded-full" style={{ background: p.gradient }} aria-hidden />
              <h3 className="mt-4 text-sm font-extrabold" style={{ color: p.text }}>
                {member.name}
              </h3>
              <p className="mt-1 text-2xs" style={{ color: p.primary }}>
                {member.role}
              </p>
              <p className="mt-1 text-3xs" style={{ color: p.muted }}>
                {member.meta}
              </p>
            </article>
          ))}
        </div>
      </Section>
    ),
    pricing: (
      <Section key="pricing" industry={industry}>
        <Heading industry={industry} title={industry.pricingHeading} />
        <div className="grid gap-5 lg:grid-cols-3">
          {industry.pricing.map((plan) => (
            <article
              key={plan.name}
              className="rounded-2xl border p-6"
              style={{
                background: plan.featured ? p.primary : p.surface,
                borderColor: plan.featured ? p.primary : p.border,
                color: plan.featured ? p.onPrimary : p.text,
              }}
            >
              <h3 className="text-sm font-extrabold">{plan.name}</h3>
              <p className="mt-3 text-2xl font-extrabold persian-num">{plan.price}</p>
              <p className="text-3xs opacity-75">{plan.period}</p>
              <ul className="mt-4 space-y-2 text-2xs">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full" style={{ background: plan.featured ? p.onPrimary : p.primary }} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className="mt-6 flex h-11 items-center justify-center rounded-xl text-2xs font-extrabold transition-opacity hover:opacity-90"
                style={{
                  background: plan.featured ? p.onPrimary : p.primary,
                  color: plan.featured ? p.primary : p.onPrimary,
                }}
              >
                انتخاب این پکیج
              </a>
            </article>
          ))}
        </div>
      </Section>
    ),
    testimonials: (
      <Section key="testimonials" industry={industry} tone="surface">
        <Heading industry={industry} title="نظر مشتریان" />
        <div className="grid gap-5 lg:grid-cols-3">
          {industry.testimonials.map((item) => (
            <blockquote key={item.name} className="rounded-2xl border p-6" style={{ borderColor: p.border, background: p.bg }}>
              <Quote className="size-5" style={{ color: p.primary }} aria-hidden />
              <p className="mt-3 text-xs leading-loose" style={{ color: p.text }}>
                {item.quote}
              </p>
              <footer className="mt-4 text-3xs" style={{ color: p.muted }}>
                <strong style={{ color: p.text }}>{item.name}</strong> — {item.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>
    ),
    process: (
      <Section key="process" industry={industry}>
        <Heading industry={industry} title="مسیر همکاری" />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industry.process.map((step, index) => (
            <li key={step.title} className="rounded-2xl border p-5" style={{ borderColor: p.border, background: p.surface }}>
              <span className="grid size-9 place-items-center rounded-full text-2xs font-extrabold persian-num" style={{ background: p.primary, color: p.onPrimary }}>
                {toPersianDigits(index + 1)}
              </span>
              <h3 className="mt-3 text-xs font-extrabold" style={{ color: p.text }}>
                {step.title}
              </h3>
              <p className="mt-2 text-2xs leading-loose" style={{ color: p.muted }}>
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    ),
    logos: (
      <Section key="logos" industry={industry} tone="surface">
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {industry.logos.map((logo) => (
            <li key={logo} className="rounded-xl border px-5 py-3 text-2xs font-extrabold" style={{ borderColor: p.border, color: p.muted }}>
              {logo}
            </li>
          ))}
        </ul>
      </Section>
    ),
    faq: (
      <Section key="faq" industry={industry}>
        <Heading industry={industry} title="پرسش‌های پرتکرار" />
        <div className="mx-auto max-w-3xl space-y-3">
          {industry.faq.map((item) => (
            <details key={item.q} className="rounded-2xl border p-5" style={{ borderColor: p.border, background: p.surface }}>
              <summary className="cursor-pointer text-xs font-extrabold" style={{ color: p.text }}>
                {item.q}
              </summary>
              <p className="mt-3 text-2xs leading-loose" style={{ color: p.muted }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>
    ),
    booking: (
      <Section key="booking" industry={industry} id="booking" tone="surface">
        <Heading industry={industry} title={industry.booking.heading} sub={industry.booking.desc} />
        <div className="mx-auto max-w-2xl">
          <BookingForm industry={industry} />
        </div>
      </Section>
    ),
    cta: (
      <Section key="cta" industry={industry}>
        <div className="rounded-3xl p-10 text-center" style={{ background: p.gradient }}>
          <h2 className={`text-2xl font-extrabold sm:text-3xl ${FONT_CLASS[industry.displayFont]}`} style={{ color: p.text }}>
            {industry.tagline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-loose" style={{ color: p.muted }}>
            {industry.description}
          </p>
          <a
            href="#booking"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl px-7 text-xs font-extrabold transition-opacity hover:opacity-90"
            style={{ background: p.primary, color: p.onPrimary }}
          >
            {industry.hero.primaryCta}
            <ArrowLeft className="size-4" aria-hidden />
          </a>
        </div>
      </Section>
    ),
    contact: (
      <Section key="contact" industry={industry} tone="surface">
        <Heading industry={industry} title="راه‌های ارتباطی" />
        <ul className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, label: "نشانی", value: industry.contact.address },
            { icon: Phone, label: "تلفن", value: industry.contact.phone },
            { icon: Clock, label: "ساعات کاری", value: industry.contact.hours },
          ].map((item) => (
            <li key={item.label} className="rounded-2xl border p-5 text-center" style={{ borderColor: p.border, background: p.bg }}>
              <item.icon className="mx-auto size-5" style={{ color: p.primary }} aria-hidden />
              <p className="mt-2 text-3xs" style={{ color: p.muted }}>
                {item.label}
              </p>
              <p className="mt-1 text-xs font-extrabold persian-num" style={{ color: p.text }}>
                {item.value}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    ),
  };

  return (
    <div className={`min-h-dvh ${MOTION_CLASS[industry.motion]}`} style={shellStyle}>
      {/* Mini-site header */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{ background: `${p.surface}e6`, borderColor: p.border }}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <span className={`text-md font-extrabold ${FONT_CLASS[industry.displayFont]}`} style={{ color: p.text }}>
            {industry.brandName}
          </span>
          <nav className="hidden items-center gap-5 text-2xs font-bold lg:flex" aria-label="ناوبری نمونه">
            {["خدمات", "نمونه کار", "تیم", "تماس"].map((item, index) => (
              <a key={item} href={["#services", "#gallery", "#team", "#booking"][index]} style={{ color: p.muted }} className="transition-colors hover:opacity-70">
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#booking"
            className="inline-flex h-10 items-center rounded-xl px-4 text-2xs font-extrabold transition-opacity hover:opacity-90"
            style={{ background: p.primary, color: p.onPrimary }}
          >
            {industry.hero.primaryCta}
          </a>
        </div>
      </header>

      {industry.blocks.map((block) => blocks[block])}

      <footer className="border-t px-5 py-8 text-center sm:px-8" style={{ borderColor: p.border, background: p.surface }}>
        <p className="text-2xs" style={{ color: p.muted }}>
          این یک نمونه طراحی از <strong style={{ color: p.text }}>کارن سافت</strong> برای صنعت {industry.name} است.
        </p>
        <Link
          href="/demo/industries"
          className="mt-3 inline-flex items-center gap-1.5 text-2xs font-extrabold transition-opacity hover:opacity-80"
          style={{ color: p.primary }}
        >
          بازگشت به گالری نمونه‌ها
          <ArrowLeft className="size-3.5" aria-hidden />
        </Link>
      </footer>
    </div>
  );
}
