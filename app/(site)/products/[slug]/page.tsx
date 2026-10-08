import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCT_STATUS_LABEL } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, softwareAppSchema } from "@/lib/schema";
import { PageHero, ContentSection, InfoGrid, Points, ContactCTA } from "@/components/site/page-parts";
import { ButtonLink } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { FAQS } from "@/lib/constants";
import { JsonLd } from "@/components/ui/json-ld";

export const generateStaticParams = () => PRODUCTS.map((product) => ({ slug: product.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  return pageMeta({
    title: `${product.name} | نرم‌افزار مدیریتی کسب‌وکار`,
    description: `${product.short} دموی زنده را پیش از تصمیم‌گیری، بدون نصب در مرورگر بررسی کنید.`,
    path: `/products/${product.slug}`,
    images: product.image ? [product.image] : undefined,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHero eyebrow="PRODUCT / KAREN SOFT" title={product.name} description={product.description}>
        <ButtonLink href={`/demo/${product.demoSlug}`}>تجربه دموی زنده</ButtonLink>
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
            <p className="text-muted">امکان بررسی پیش از خرید</p>
            <h3>دموی مرورگری با داده نمونه</h3>
          </div>
        </div>
      </ContentSection>

      {product.slug === "law-office" ? (
        <ContentSection title="دریافت نرم‌افزار دفتر وکالت">
          <ButtonLink href="/download-law-software" variant="outline">راهنمای دریافت و نصب</ButtonLink>
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
