import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { BLOG_POSTS } from "@/lib/blog";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "مجله کارن سافت | راهنمای فناوری و مدیریت کسب‌وکار",
  description: "راهنمای چاپ کارت ویزیت و تراکت، آموزش کلاس اول با مدرسه‌ی من و مدیریت هزینه و فروشگاه با حساب‌یار؛ مقاله‌های کاربردی مجله کارن سافت.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="JOURNAL"
        title="مجله کارن سافت؛ مقالات نرم‌افزار، اتوماسیون و چاپ"
        description="راهنماهای کاربردی چاپ، یادگیری کلاس اول و مدیریت مالی؛ در کنار مقاله‌های فناوری و رشد کسب‌وکار."
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
