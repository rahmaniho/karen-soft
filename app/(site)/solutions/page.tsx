import Link from "next/link";
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
        eyebrow="INDUSTRY SOLUTIONS"
        title="هر صنعت، راهکار خودش را دارد."
        description="از چاپخانه تا دفتر وکالت؛ ابزارهایی که با زبان کسب‌وکار شما صحبت می‌کنند."
      />
      <ContentSection title="صنعت خود را انتخاب کنید">
        <div className="grid gap-6 md:grid-cols-2">
          {SOLUTIONS.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="surface-card p-8 transition-transform hover:-translate-y-1"
            >
              <span className="text-3xl" aria-hidden>{solution.emoji}</span>
              <h2 className="my-4 text-2xl">{solution.name}</h2>
              <p className="text-muted">{solution.short}</p>
              <span className="mt-6 inline-block text-brand-600 dark:text-brand-300">کشف راهکار ←</span>
            </Link>
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
