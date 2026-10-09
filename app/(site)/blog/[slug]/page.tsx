import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/json-ld";
import { ArticleBlocks } from "@/components/site/article-blocks";
import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { BLOG_POSTS } from "@/lib/blog";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const generateStaticParams = () => BLOG_POSTS.map((post) => ({ slug: post.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();

  return pageMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    images: [post.cover],
    openGraphType: "article",
    publishedTime: post.date,
    authors: [post.author],
    section: post.category,
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();

  const publishedDate = new Date(`${post.date}T12:00:00Z`).toLocaleDateString("fa-IR", {
    dateStyle: "long",
    timeZone: "UTC",
  });

  return (
    <>
      <PageHero eyebrow="KAREN JOURNAL" title={post.title} description={post.excerpt}>
        <p className="text-xs text-muted">
          <span>{post.author}</span>
          <span aria-hidden> · </span>
          <time dateTime={post.date}>{publishedDate}</time>
          <span aria-hidden> · </span>
          <span>{post.readingMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
        </p>
      </PageHero>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[240px_1fr]">
        <aside>
          <nav aria-label="فهرست مقاله" className="surface-card p-6 lg:sticky lg:top-28">
            <h2 className="mb-5 text-lg">در این مقاله</h2>
            {post.sections.map((section, index) => (
              <a
                key={section.heading}
                className="block border-b py-3 text-sm text-muted hover:text-brand-600"
                href={`#section-${index}`}
              >
                {section.heading}
              </a>
            ))}
            <Link className="mt-6 inline-block text-brand-600 dark:text-brand-300" href="/blog">
              همه مقاله‌ها ←
            </Link>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          {post.sections.some((section) => section.blocks) ? (
            <aside className="surface-card mb-8 p-5 text-xs text-muted">
              این مقاله از آرشیو محتوایی کارن سافت بازبینی و منتشر شده است. اشاره به قیمت یا قابلیت‌ها ممکن است مربوط به زمان نگارش باشد؛
              برای اطلاعات و قیمت فعلی، صفحۀ محصول را بررسی کنید.
            </aside>
          ) : null}

          <figure className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 767px) 100vw, 900px"
              className="object-cover"
              priority
            />
            <figcaption className="sr-only">تصویر مقاله: {post.title}</figcaption>
          </figure>

          {post.sections.map((section, index) => (
            <section key={section.heading} id={`section-${index}`} className="mb-12 scroll-mt-28">
              <h2 className="mb-5 text-2xl">{section.heading}</h2>
              {section.blocks ? <ArticleBlocks blocks={section.blocks} /> : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mb-4 text-base leading-loose text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-3 ps-6 leading-loose text-muted">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}

          <ul aria-label="موضوع‌های مقاله" className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border px-4 py-2 text-xs">{tag}</li>
            ))}
          </ul>
        </article>
      </div>

      <ContentSection title="برای مطالعه بیشتر">
        <div className="grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.filter((item) => item.slug !== slug).slice(0, 3).map((item) => (
            <Link className="surface-card p-6" key={item.slug} href={`/blog/${item.slug}`}>
              <p className="text-xs text-brand-600 dark:text-brand-300">{item.category}</p>
              <h3 className="mt-3">{item.title}</h3>
            </Link>
          ))}
        </div>
      </ContentSection>

      <ContactCTA />
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "مجله", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
