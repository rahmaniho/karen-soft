import { SurfaceCard } from "@/components/ui/card";
import { ResourceCard } from "@/components/shared/resource-card";
import { SERVICES, PROCESS_STEPS, FAQS } from "@/lib/constants";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, faqSchema, itemListSchema, siteServiceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "خدمات طراحی سایت و توسعه نرم‌افزار | کارن سافت",
  description: "خدمات کارن سافت در قزوین؛ طراحی سایت، توسعه نرم‌افزار اختصاصی، اتوماسیون کسب‌وکار، امنیت و پشتیبانی فنی.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "خانه", path: "/" }, { name: "خدمات" }]}
        eyebrow="OUR EXPERTISE"
        title="از ایده تا یک محصول قابل اتکا؛ خدمات طراحی سایت و نرم‌افزار اختصاصی"
        description="طراحی، توسعه و پشتیبانی را یکپارچه پیش می‌بریم؛ با دامنه روشن و تحویل مرحله‌ای."
      >
        <ButtonLink href="/qazvin" variant="outline">
          خدمات ما برای کسب‌وکارهای قزوین
        </ButtonLink>
      </PageHero>
      {SERVICES.map((service) => (
        <ContentSection key={service.slug} id={service.slug} title={service.title}>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="lead">{service.desc}</p>
            <SurfaceCard className="p-8">
              <Points items={service.bullets} />
              <ButtonLink className="mt-6" href={`/contact?subject=${service.slug === "web" ? "website" : service.slug === "software" || service.slug === "automation" ? "custom" : "other"}`} variant="soft">درخواست مشاوره درباره این خدمت</ButtonLink>
            </SurfaceCard>
          </div>
        </ContentSection>
      ))}
      <ContentSection title="راهنماهای مرتبط">
        <div className="grid gap-5 md:grid-cols-3">
          <ResourceCard href="/blog/web-hosting-guide" category="زیرساخت وب" title="راهنمای انتخاب هاست برای سایت کسب‌وکار" action="مطالعه راهنما" />
          <ResourceCard href="/qazvin" category="محلی" title="طراحی سایت و نرم‌افزار در قزوین" action="مشاهده خدمات" />
          <ResourceCard href="/portfolio" category="نمونه‌کار" title="پروژه‌های اجراشده با همین تیم" action="مشاهده نمونه‌کارها" />
        </div>
      </ContentSection>
      <ContentSection title="مسیر همکاری"><InfoGrid items={PROCESS_STEPS} /></ContentSection>
      <ContentSection title="پرسش‌های متداول"><Accordion items={FAQS} /></ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("خدمات کارن سافت", SERVICES.map((service) => ({
            name: service.title,
            url: `/services#${service.slug}`,
          }))),
          ...SERVICES.map((service) => siteServiceSchema({
            id: service.slug,
            name: service.title,
            description: service.desc,
            serviceType: service.title,
            path: `/services#${service.slug}`,
          })),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "خدمات", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
