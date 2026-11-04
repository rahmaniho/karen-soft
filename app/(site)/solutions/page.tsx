import { ResourceCard } from "@/components/shared/resource-card";
import { SOLUTIONS } from "@/lib/solutions";
import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "راهکارهای نرم‌افزاری تخصصی صنایع | کارن سافت",
  description: "راهکارهای نرم‌افزاری کارن سافت برای چاپخانه، دفتر وکالت، املاک، رستوران، حمل‌ونقل و دیگر کسب‌وکارها؛ بر پایه فرایند هر صنعت.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "خانه", path: "/" }, { name: "راهکارهای صنایع" }]}
        eyebrow="INDUSTRY SOLUTIONS"
        title="هر صنعت، راهکار خودش را دارد؛ راهکارهای نرم‌افزاری تخصصی صنایع"
        description="از چاپخانه تا دفتر وکالت؛ ابزارهایی که با زبان کسب‌وکار شما صحبت می‌کنند."
      />
      <ContentSection title="صنعت خود را انتخاب کنید">
        <div className="grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((solution) => (
            <ResourceCard
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              icon={solution.emoji}
              category="راهکار تخصصی"
              title={solution.name}
              description={solution.short}
              action="کشف راهکار"
              className="[&_h3]:text-2xl"
            />
          ))}
        </div>
      </ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("راهکارهای نرم‌افزاری بر اساس صنعت", SOLUTIONS.map((solution) => ({
            name: solution.name,
            url: `/solutions/${solution.slug}`,
          }))),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "راهکارهای صنایع", path: "/solutions" },
          ]),
        ]}
      />
    </>
  );
}
