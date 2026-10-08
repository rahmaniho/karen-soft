import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/lib/solutions";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";

export const generateStaticParams = () => SOLUTIONS.map((solution) => ({ slug: solution.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS.find((item) => item.slug === slug);
  if (!solution) notFound();

  return pageMeta({
    title: `${solution.name} | نرم‌افزار تخصصی صنعت`,
    description: solution.hero,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = SOLUTIONS.find((item) => item.slug === slug);
  if (!solution) notFound();

  return (
    <>
      <PageHero eyebrow="BUILT FOR YOUR INDUSTRY" title={solution.tagline} description={solution.hero}>
        <ButtonLink href={`/demo/${solution.demoSlug}`}>مشاهده دمو</ButtonLink>
        <ButtonLink variant="outline" href={`/products/${solution.productSlug}`}>معرفی محصول</ButtonLink>
      </PageHero>

      <ContentSection title="چالش‌هایی که می‌شناسیم"><InfoGrid items={solution.pains} /></ContentSection>
      <ContentSection title="پاسخ ما به نیازهای شما"><InfoGrid items={solution.features} /></ContentSection>
      <ContentSection title="ماژول‌های راهکار">
        <div className="grid gap-6 md:grid-cols-2">
          {solution.modules.map((module) => (
            <article key={module.title} className="surface-card p-8">
              <h3>{module.title}</h3>
              <p className="my-4 text-muted">{module.desc}</p>
              <Points items={module.points} />
            </article>
          ))}
        </div>
      </ContentSection>
      <ContentSection title="گردش کار، از ابتدا تا انتها">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solution.workflow.map((step, index) => (
            <li key={step} className="surface-card p-6">
              <span className="eyebrow">STEP {index + 1}</span>
              <p className="mt-4">{step}</p>
            </li>
          ))}
        </ol>
      </ContentSection>
      <ContentSection title="جزئیاتی که تفاوت می‌سازند"><Points items={solution.specialization} /></ContentSection>
      <ContentSection title="یکپارچه‌سازی‌ها"><Points items={solution.integrations} /></ContentSection>
      <ContentSection title={solution.caseStudy.title}>
        <p className="lead">{solution.caseStudy.desc}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {solution.caseStudy.stats.map((stat) => (
            <div key={stat.label} className="surface-card p-8">
              <p className="text-3xl font-bold text-brand-600 dark:text-brand-300">{stat.value}</p>
              <p className="mt-3 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          serviceSchema({
            name: solution.name,
            description: solution.hero,
            path: `/solutions/${solution.slug}`,
            serviceType: `نرم‌افزار ${solution.name}`,
          }),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "راهکارهای صنایع", path: "/solutions" },
            { name: solution.name, path: `/solutions/${solution.slug}` },
          ]),
        ]}
      />
    </>
  );
}
