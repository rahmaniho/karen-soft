import Link from "next/link";
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
            <div className="surface-card p-8">
              <Points items={service.bullets} />
              <ButtonLink className="mt-6" href="/contact" variant="soft">گفت‌وگو درباره این خدمت</ButtonLink>
            </div>
          </div>
        </ContentSection>
      ))}
      <ContentSection title="راهنماهای مرتبط">
        <div className="grid gap-5 md:grid-cols-3">
          <Link href="/blog/web-hosting-guide" className="surface-card p-6">
            <p className="text-xs text-brand-600 dark:text-brand-300">زیرساخت وب</p>
            <h3 className="mt-3">راهنمای انتخاب هاست برای سایت کسب‌وکار</h3>
          </Link>
          <Link href="/qazvin" className="surface-card p-6">
            <p className="text-xs text-brand-600 dark:text-brand-300">محلی</p>
            <h3 className="mt-3">طراحی سایت و نرم‌افزار در قزوین</h3>
          </Link>
          <Link href="/portfolio" className="surface-card p-6">
            <p className="text-xs text-brand-600 dark:text-brand-300">نمونه‌کار</p>
            <h3 className="mt-3">پروژه‌های اجراشده با همین تیم</h3>
          </Link>
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
