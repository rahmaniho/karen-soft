import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/industries";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { IndustrySite } from "@/components/industries/industry-site";

export function generateStaticParams(): { industry: string }[] {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return pageMeta({ title: "نمونه یافت نشد", description: "این نمونه در دسترس نیست.", noIndex: true });
  return pageMeta({
    title: `نمونه طراحی ${industry.name} | کارن سافت`,
    description: industry.description,
    path: `/demo/industries/${industry.slug}`,
  });
}

export default async function IndustryShowcasePage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return (
    <>
      <IndustrySite industry={industry} />
      <JsonLd
        data={[
          faqSchema(industry.faq),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "نمونه صنایع", path: "/demo/industries" },
            { name: industry.name, path: `/demo/industries/${industry.slug}` },
          ]),
        ]}
      />
    </>
  );
}
