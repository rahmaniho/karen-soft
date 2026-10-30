import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_STATUS_LABEL } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, softwareAppSchema } from "@/lib/schema";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { ProductScreenshots } from "@/components/site/product-screenshots";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { JsonLd } from "@/components/ui/json-ld";
import { LawBookProductPage, LAWBOOK_FAQS } from "@/components/site/law-book-product-page";
import { relatedPostsForProduct } from "@/lib/related";

/** محصولات با صفحهٔ اختصاصی، مسیر ایستای خودشان را دارند و این‌جا ساخته نمی‌شوند. */
const DEDICATED_PAGES = new Set(["hesabyar"]);

export const generateStaticParams = () =>
  PRODUCTS.filter((product) => !DEDICATED_PAGES.has(product.slug)).map((product) => ({ slug: product.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  return pageMeta({
    title: product.slug === "law-book"
      ? "کتابچه قانون | مرجع حقوقی همراه، آنلاین و آفلاین"
      : `نرم‌افزار ${product.name} | کارن سافت`,
    description: product.slug === "law-book"
      ? "کتابچه قانون با ۷۳ سند، ۱۱٬۱۳۲ ماده و ۱۰۰ آزمون اختبار؛ جست‌وجوی فارسی و مطالعه آفلاین، با دریافت اختیاری ۱٬۹۹۸ رأی قضایی."
      : `${product.short} امکانات، ماژول‌ها، نمونه‌های واقعی و شرایط شروع را در همین صفحه بررسی کنید.`,
    path: `/products/${product.slug}`,
    images: product.image ? [product.image] : undefined,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  const relatedPosts = relatedPostsForProduct(product.slug);

  if (product.slug === "law-book") {
    return (
      <>
        <LawBookProductPage product={product} />
        <JsonLd
          data={[
            softwareAppSchema(product),
            breadcrumbSchema([
              { name: "خانه", path: "/" },
              { name: "محصولات", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ]),
            faqSchema(LAWBOOK_FAQS),
          ]}
        />
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="PRODUCT / KAREN SOFT" title={product.name} description={product.description}>
        <ButtonLink href="/contact" variant="outline">درخواست مشاوره</ButtonLink>
      </PageHero>

      <ContentSection title="در یک نگاه">
        <div className="surface-card grid gap-8 p-8 md:grid-cols-3">
          <div>
            <p className="text-muted">وضعیت محصول</p>
            <h3>{PRODUCT_STATUS_LABEL[product.status]}</h3>
          </div>
          <div>
            <p className="text-muted">شروع قیمت پایه</p>
            <h3>{product.pricingFrom.toLocaleString("fa-IR")} تومان</h3>
            <p className="mt-2 text-xs text-muted">قیمت نهایی پس از بررسی دامنه و تأیید پیشنهاد تعیین می‌شود.</p>
          </div>
          <div>
            <p className="text-muted">پیش از خرید</p>
            <h3>مشاورهٔ فنی و پیشنهاد دامنهٔ پروژه</h3>
          </div>
        </div>
      </ContentSection>

      {product.slug === "law-office" ? (
        <ContentSection title="دریافت نرم‌افزار دفتر وکالت">
          <ButtonLink href="/download-law-software" variant="outline">راهنمای دریافت و نصب</ButtonLink>
        </ContentSection>
      ) : null}

      {product.screenshots?.length ? (
        <ContentSection title="نمای واقعی محیط نرم‌افزار">
          <p className="mb-6 text-sm leading-loose text-muted">
            آنچه پیش رو می‌بینید عکس‌هایی از خودِ نرم‌افزار است، نه طرح تبلیغاتی؛ ماژول به ماژول بررسی کنید تا
            جریان کار روزانۀ دفترتان را در آن تصور کنید.
          </p>
          <ProductScreenshots screenshots={product.screenshots} appName={product.name} />
        </ContentSection>
      ) : null}

      <ContentSection title="قابلیت‌های کلیدی"><Points items={product.features} /></ContentSection>
      <ContentSection title="همه ماژول‌ها، یک تجربه یکپارچه"><InfoGrid items={product.modules} /></ContentSection>

      {product.solution ? (
        <ContentSection title="راهکار تخصصی صنعت شما">
          <ButtonLink href={`/solutions/${product.solution}`} variant="soft">بررسی فرایندها و راهکار صنعت</ButtonLink>
        </ContentSection>
      ) : null}

      <ContentSection title="پیش از شروع بدانید"><Accordion items={FAQS} /></ContentSection>
      {relatedPosts.length ? (
        <ContentSection title="مقالات مرتبط با این محصول">
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link key={post.slug} className="surface-card p-6" href={`/blog/${post.slug}`}>
                <p className="text-xs text-brand-600 dark:text-brand-300">{post.category}</p>
                <h3 className="mt-3">{post.title}</h3>
                <p className="mt-3 text-sm leading-loose text-muted">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </ContentSection>
      ) : null}
      <ContactCTA />
      <JsonLd
        data={[
          softwareAppSchema(product),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          faqSchema(FAQS),
        ]}
      />
    </>
  );
}
