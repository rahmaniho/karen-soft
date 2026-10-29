import { Class1Community } from "@/components/sections/class1-community";
import { PageHero, ContentSection, ContactCTA } from "@/components/site/page-parts";
import { Catalog } from "@/components/site/catalog";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { PRODUCTS } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

import { HesabyarDownload } from "@/components/sections/hesabyar-download";

export const metadata = pageMeta({
  title: "نرم‌افزارهای مدیریتی کسب‌وکار | محصولات کارن سافت",
  description: "دانلود حساب‌یار اندروید و وب برای هزینه، موجودی و فاکتور؛ نرم‌افزارهای مدیریتی کارن سافت با دموی آنلاین، کتابچه قانون و مدرسه‌ی من.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="KAREN SOFT PRODUCTS"
        title="نرم‌افزارهایی برای کار واقعی."
        description="محصول متناسب با کسب‌وکارتان را پیدا کنید؛ دموهای نرم‌افزارهای مدیریتی را امتحان کنید موضوعات کتابچه قانون را مرور کنید یا با مدرسه‌ی من، آموزش کلاس اول را در کنار خانواده تجربه کنید."
      />
      <ContentSection title="حساب‌یار؛ نسخهٔ اندروید و وب"><HesabyarDownload /></ContentSection>
      <ContentSection title="مدرسه‌ی من؛ محصول آموزشی با رویکرد اجتماعی"><Class1Community /></ContentSection>
      <ContentSection title="همه محصولات"><Catalog kind="products" /></ContentSection>
      <ContactCTA />
      <JsonLd
        data={[
          itemListSchema("نرم‌افزارهای کارن سافت", [{ name: "مدرسه‌ی من | کلاس اول", url: "/products#class1-community" }, ...PRODUCTS.map((product) => ({
            name: product.name,
            url: `/products/${product.slug}`,
          }))]),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "محصولات", path: "/products" },
          ]),
        ]}
      />
    </>
  );
}
