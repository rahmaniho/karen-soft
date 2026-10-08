import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "@/lib/portfolio";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { PageHero, ContentSection, Points, ContactCTA } from "@/components/site/page-parts";
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

  return (
    <>
      <PageHero eyebrow="CASE STUDY" title={study.title} description={study.summary}>
        <p>{study.client} · {study.category} · {study.year}</p>
      </PageHero>

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

      <ContentSection title="چالش پروژه"><Points items={study.challenge} /></ContentSection>
      <ContentSection title="راه‌حل و اجرا"><Points items={study.solution} /></ContentSection>
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
      <ContentSection title="خدمات و فناوری‌ها">
        <Points items={study.services} />
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="فناوری‌های استفاده‌شده">
          {study.stack.map((item) => (
            <li key={item} className="rounded-full border px-4 py-2">{item}</li>
          ))}
        </ul>
      </ContentSection>
      {study.quote ? (
        <ContentSection title="از زبان مشتری">
          <blockquote className="surface-card p-8 text-xl">
            «{study.quote.text}»
            <footer className="mt-5 text-sm text-muted">{study.quote.author}</footer>
          </blockquote>
        </ContentSection>
      ) : null}
      {study.industryDemo ? (
        <ContentSection title="یک تجربه مشابه را امتحان کنید">
          <ButtonLink href={`/demo/industries/${study.industryDemo}`}>مشاهده دموی صنعت</ButtonLink>
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
