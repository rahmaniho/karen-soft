import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/portfolio";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "نمونه‌کارهای طراحی وب و نرم‌افزار | کارن سافت",
  description: "مطالعه موردی پروژه‌های کارن سافت؛ از طراحی وب‌سایت و رزرو آنلاین تا توسعه نرم‌افزارهای تخصصی و مدیریت تولید.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title="از مسئله تا نتیجه."
        description="نگاهی نزدیک به پروژه‌ها، چالش‌ها و راه‌حل‌های کارن سافت."
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
