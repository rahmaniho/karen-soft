import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/portfolio";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "نمونه‌کارهای طراحی وب و نرم‌افزار | کارن سافت",
  description: "پروژه‌های واقعی و نسخه‌های نمایشی کارن سافت؛ از وب‌سایت و نرم‌افزار سازمانی تا لندینگ‌پیج و داشبورد صنعتی. هر نمونه را داخل همین سایت امتحان کنید.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title="از ایده تا نمونهٔ زنده."
        description="نمونه‌های واقعی و نمایشی کارن سافت؛ هر کدام با هدف، امکانات و نسخهٔ زندهٔ داخل سایت."
      />
      <ContentSection title="پروژه‌های منتخب"><Catalog kind="portfolio" /></ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("نمونه‌کارهای کارن سافت", CASE_STUDIES.map((study) => ({
            name: study.title,
            url: `/portfolio/${study.slug}`,
          }))),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "نمونه‌کارها", path: "/portfolio" },
          ]),
        ]}
      />
    </>
  );
}
