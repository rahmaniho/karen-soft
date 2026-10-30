import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink, Quote } from "lucide-react";
import { CASE_KIND_COPY, CASE_STUDIES } from "@/lib/portfolio";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { PageHero, ContentSection, Points, ContactCTA } from "@/components/site/page-parts";
import { DemoFrame } from "@/components/site/demo-frame";
import { DemoTabs } from "@/components/site/demo-tabs";
import { SmartFactorySection } from "@/components/site/smart-factory";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";

export const generateStaticParams = () => CASE_STUDIES.map((study) => ({ slug: study.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) notFound();

  return pageMeta({
    title: study.title,
    description: study.summary,
    path: `/portfolio/${study.slug}`,
    images: [study.cover],
    openGraphType: "article",
    section: study.category,
    tags: study.services,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((item) => item.slug === slug);
  if (!study) notFound();
  const copy = CASE_KIND_COPY[study.kind];

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={study.title} description={study.summary}>
        {study.logo ? (
          <span className="inline-flex items-center gap-3 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] py-1 pe-5 ps-1">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white">
              <Image src={study.logo} alt={`لوگوی ${study.client}`} fill sizes="44px" className="object-contain p-1" />
            </span>
            <span className="text-sm font-extrabold">{study.client}</span>
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-4 py-2 text-xs font-bold">{study.client}</span>
        )}
        <span className="inline-flex items-center rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs text-muted">{study.category}</span>
        <span className="inline-flex items-center rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs text-muted">{study.year}</span>
        {study.liveUrl ? (
          <ButtonLink
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            مشاهدهٔ سایت واقعی
            <ExternalLink className="size-3.5" aria-hidden />
          </ButtonLink>
        ) : null}
      </PageHero>

      {study.note ? (
        <div className="container-page pt-12" role="note">
          <p className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-sunken)] p-5 leading-8 text-muted">
            {study.note}
          </p>
        </div>
      ) : null}

      {study.visual === "smart-factory" ? (
        <section
          id="smart-factory"
          aria-labelledby="smart-factory-title"
          className="relative overflow-hidden border-y border-[#12212e] bg-[#060a12] py-14 text-white sm:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_-10%,rgba(34,211,238,0.12),transparent_58%)]"
          />
          <div className="container-page relative">
            <header className="max-w-3xl">
              <span className="eyebrow !text-[#22d3ee]">SMART FACTORY / DIGITAL THREAD</span>
              <h2 id="smart-factory-title" className="display-3 mt-4 text-white">
                اتوماسیون هوشمند کارخانه، در یک نگاه
              </h2>
              <p className="mt-4 text-sm leading-loose text-white/60">
                از سنسور روی یاتاقان تا تصمیمی که مدیر می‌گیرد: پنج لایهٔ داده، یک مسیر پیوسته.
                روی هر لایه بزنید تا ببینید چه داده‌ای می‌آید، با چه فناوری پردازش می‌شود و چه تصمیمی را ممکن می‌کند.
              </p>
            </header>
            <div className="mt-8">
              <SmartFactorySection />
            </div>
          </div>
        </section>
      ) : null}

      {study.demoVariants?.length ? (
        <ContentSection title={copy.demo}>
          <DemoTabs variants={study.demoVariants} />
        </ContentSection>
      ) : study.demo ? (
        <ContentSection title={copy.demo}>
          <DemoFrame
            src={study.demo.src}
            scope={study.demo.scope}
            title={study.demo.title}
            fullPageHref={study.demo.fullPageHref}
          />
        </ContentSection>
      ) : (
        <div className="container-page py-12">
          <figure className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[var(--surface-sunken)]">
            <Image
              src={study.cover}
              alt={study.title}
              fill
              sizes="(max-width: 767px) 100vw, 900px"
              className="object-contain"
              priority
            />
            <figcaption className="sr-only">مطالعه موردی: {study.title}</figcaption>
          </figure>
        </div>
      )}

      {study.specs?.length ? (
        <ContentSection title="مشخصات سایت">
          <dl className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
            {study.specs.map((spec) => (
              <div key={spec.label} className="bg-[var(--surface-raised)] p-6">
                <dt className="text-3xs font-bold text-muted">{spec.label}</dt>
                <dd className="mt-2 text-sm font-extrabold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </ContentSection>
      ) : null}

      <ContentSection title={copy.challenge}><Points items={study.challenge} /></ContentSection>
      <ContentSection title={copy.solution}><Points items={study.solution} /></ContentSection>
      {study.results ? (
        <ContentSection title="نتایج ثبت‌شده پروژه">
          <div className="grid gap-5 sm:grid-cols-3">
            {study.results.map((result) => (
              <div className="surface-card p-8" key={result.label}>
                <p className="text-4xl text-brand-600 dark:text-brand-300">{result.value}</p>
                <p className="mt-3 text-muted">{result.label}</p>
              </div>
            ))}
          </div>
        </ContentSection>
      ) : null}
      <ContentSection title="خدمات و فناوری‌ها">
        <Points items={study.services} />
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="زبان‌ها و فناوری‌های استفاده‌شده">
          {study.stack.map((item) => (
            <li key={item} className="rounded-full border px-4 py-2">{item}</li>
          ))}
        </ul>
      </ContentSection>
      {study.quote ? (
        <ContentSection title={copy.quote}>
          <figure
            className={`grid overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--hairline)] bg-[var(--surface-raised)] ${
              study.quote.avatar ? "lg:grid-cols-[0.36fr_0.64fr]" : ""
            }`}
          >
            {study.quote.avatar ? (
              <div className="relative min-h-72 lg:min-h-full">
                <Image
                  src={study.quote.avatar}
                  alt={`${study.quote.author}، ${study.quote.role ?? "مشتری"}`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 380px"
                  className="object-cover object-top"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <Quote className="size-9 text-brand-500/70" aria-hidden />
              <blockquote className="mt-5 text-base leading-loose sm:text-lg">«{study.quote.text}»</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-[var(--hairline)] pt-6">
                {study.quote.logo ? (
                  <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-[var(--hairline)] bg-white p-1.5">
                    <Image src={study.quote.logo} alt="" fill sizes="48px" className="object-contain" />
                  </span>
                ) : null}
                <span>
                  <strong className="block text-sm">{study.quote.author}</strong>
                  {study.quote.role ? <small className="mt-1 block text-3xs text-muted">{study.quote.role}</small> : null}
                </span>
              </figcaption>
            </div>
          </figure>
        </ContentSection>
      ) : null}
      <ContactCTA />
      <JsonLd
        data={[
          caseStudySchema({
            title: study.title,
            summary: study.summary,
            path: `/portfolio/${study.slug}`,
            image: study.cover,
            category: study.category,
            services: study.services,
            ...(study.kind === "client" ? { client: study.client } : {}),
            logo: study.logo,
          }),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "نمونه‌کارها", path: "/portfolio" },
            { name: study.title, path: `/portfolio/${study.slug}` },
          ]),
        ]}
      />
    </>
  );
}
