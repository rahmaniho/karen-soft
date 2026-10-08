import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { BLOG_POSTS } from "@/lib/blog";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "مجله کارن سافت | راهنمای فناوری و مدیریت کسب‌وکار",
  description: "مقاله‌ها و راهنماهای کارن سافت درباره نرم‌افزارهای مدیریتی، طراحی وب، اتوماسیون و امنیت؛ با نکته‌های اجرایی برای کسب‌وکارهای ایرانی.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title="مجله کارن سافت"
        description="یادداشت‌های کاربردی درباره فناوری، مدیریت و رشد کسب‌وکار؛ از تجربه تا اجرا."
      />
      <ContentSection title="آخرین مقاله‌ها"><Catalog kind="blog" /></ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("مقاله‌های مجله کارن سافت", BLOG_POSTS.map((post) => ({
            name: post.title,
            url: `/blog/${post.slug}`,
          }))),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "مجله", path: "/blog" },
          ]),
        ]}
      />
    </>
  );
}
