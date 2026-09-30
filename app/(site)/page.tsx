import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
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
import { faqSchema } from "@/lib/schema";
import { FAQS, SITE } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `${SITE.name} | طراحی و توسعه نرم‌افزار برای کسب‌وکارها`,
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
      <PortfolioSection />
      <ProcessSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
      <NewsletterSection />
      <JsonLd data={faqSchema(FAQS)} />
    </>
  );
}
