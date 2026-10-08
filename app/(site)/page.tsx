import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ChapPromoSection } from "@/components/sections/chap-promo";
import {
  ContactSection,
  DemoSpotlight,
  FaqSection,
  IndustryShowcase,
  NewsletterSection,
  PortfolioSection,
  ProcessSection,
  ProductsSection,
  ServicesSection,
  TestimonialSection,
} from "@/components/sections/home-sections";
import { JsonLd } from "@/components/ui/json-ld";
import { faqSchema, webPageSchema } from "@/lib/schema";
import { FAQS, SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `طراحی وب‌سایت و نرم‌افزار مدیریتی در قزوین | ${SITE.name}`,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DemoSpotlight />
      <ProductsSection />
      <IndustryShowcase />
      <ChapPromoSection />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
      <JsonLd
        data={[
          faqSchema(FAQS),
          webPageSchema({
            name: `${SITE.name} | طراحی وب‌سایت و نرم‌افزار مدیریتی در قزوین`,
            description: SITE.description,
            path: "/",
            mainEntity: { "@id": `${SITE.url}/#organization` },
          }),
        ]}
      />
    </>
  );
}
