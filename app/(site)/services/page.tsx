import { SERVICES, PROCESS_STEPS, FAQS } from "@/lib/constants";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, faqSchema, itemListSchema, siteServiceSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "خدمات طراحی سایت و توسعه نرم‌افزار | کارن سافت",
  description: "خدمات کارن سافت در قزوین: طراحی و توسعه وب‌سایت، نرم‌افزار اختصاصی، اتوماسیون کسب‌وکار، امنیت و پشتیبانی فنی.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR EXPERTISE"
        title="از ایده تا یک محصول قابل اتکا."
        description="طراحی، توسعه و پشتیبانی را یکپارچه پیش می‌بریم؛ با دامنه روشن و تحویل مرحله‌ای."
      />
      {SERVICES.map((service) => (
        <ContentSection key={service.slug} id={service.slug} title={service.title}>
          <div className="grid gap-8 md:grid-cols-2">
            <p className="lead">{service.desc}</p>
            <div className="surface-card p-8">
              <Points items={service.bullets} />
              <ButtonLink className="mt-6" href="/contact" variant="soft">گفت‌وگو درباره این خدمت</ButtonLink>
            </div>
          </div>
        </ContentSection>
      ))}
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
