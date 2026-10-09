import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Apple, Monitor, Smartphone } from "lucide-react";
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

export const generateStaticParams = () => PRODUCTS.map((product) => ({ slug: product.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

  return pageMeta({
    title: product.slug === "law-book"
      ? "کتابچه قانون | مرجع حقوقی همراه، آنلاین و آفلاین"
      : `${product.name} | نرم‌افزار مدیریتی کسب‌وکار`,
    description: product.slug === "law-book"
      ? `${product.short} قیمت نسخۀ کامل: ${product.pricingFrom.toLocaleString("fa-IR")} تومان؛ نسخۀ زنده را پیش از ثبت درخواست خرید بررسی کنید.`
      : `${product.short} دموی زنده را پیش از تصمیم‌گیری، بدون نصب در مرورگر بررسی کنید.`,
    path: `/products/${product.slug}`,
    images: product.image ? [product.image] : undefined,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) notFound();

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

      {product.slug === "law-book" ? (
        <ContentSection title="نصب روی اندروید، iOS و ویندوز">
          <p className="mb-6 max-w-3xl text-sm leading-loose text-muted">
            کتابچهٔ قانون یک وب‌اپلیکیشن پیش‌رونده (PWA) است و نیازی به فروشگاه اپلیکیشن ندارد؛ آن را مستقیماً از
            مرورگر دستگاه‌تان نصب کنید. پس از نصب، تمام ۴۶ سند حقوقی و ۷٬۲۷۸ ماده روی دستگاه ذخیره می‌شود و
            مطالعه و جست‌وجو بدون اینترنت انجام می‌شود.
          </p>
          <ul className="mb-6 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Smartphone, label: "اندروید", note: "Chrome ← «افزودن به صفحهٔ اصلی»" },
              { icon: Apple, label: "iOS", note: "Safari ← «اشتراک‌گذاری» ← «افزودن به صفحهٔ اصلی»" },
              { icon: Monitor, label: "ویندوز", note: "Edge یا Chrome ← آیکون «نصب» در نوار نشانی" },
            ].map((platform) => (
              <li key={platform.label} className="surface-card flex items-center gap-3 p-5">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] text-white"
                  style={{ background: product.accent }}
                >
                  <platform.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-extrabold">{platform.label}</p>
                  <p className="mt-0.5 text-4xs leading-loose text-muted">{platform.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href={`/demo/${product.demoSlug}`} variant="outline">دموی زنده را امتحان کنید</ButtonLink>
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
