import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { PRODUCTS } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "نرم‌افزارهای مدیریتی کسب‌وکار | محصولات کارن سافت",
  description: "محصولات کارن سافت را بررسی کنید؛ دموهای نرم‌افزارهای مدیریتی را امتحان کنید و فهرست موضوعات کتابچه قانون را ببینید.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="KAREN SOFT PRODUCTS"
        title="نرم‌افزارهایی برای کار واقعی."
        description="محصول متناسب با کسب‌وکارتان را پیدا کنید؛ دموهای نرم‌افزارهای مدیریتی را امتحان کنید یا موضوعات کتابچه قانون را مرور کنید."
      />
      <ContentSection title="همه محصولات"><Catalog kind="products" /></ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("نرم‌افزارهای کارن سافت", PRODUCTS.map((product) => ({
            name: product.name,
            url: `/products/${product.slug}`,
          }))),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
          ]),
        ]}
      />
    </>
  );
}
