import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_PRODUCTS, getProductByDemo } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";

/* Each demo is code-split so it never affects the marketing bundle. */
const DEMOS: Record<string, React.ComponentType> = {
  "printing-management": dynamic(() => import("@/components/demo/printing/printing-demo").then((module) => module.PrintingDemo)),
  "law-office": dynamic(() => import("@/components/demo/law-office/law-office-demo").then((module) => module.LawOfficeDemo)),
  "taxi-management": dynamic(() => import("@/components/demo/taxi/taxi-demo").then((module) => module.TaxiDemo)),
  "smart-building": dynamic(() => import("@/components/demo/smart-building/smart-building-demo").then((module) => module.SmartBuildingDemo)),
  "real-estate": dynamic(() => import("@/components/demo/real-estate/real-estate-demo").then((module) => module.RealEstateDemo)),
  restaurant: dynamic(() => import("@/components/demo/restaurant/restaurant-demo").then((module) => module.RestaurantDemo)),
  "auto-parts": dynamic(() => import("@/components/demo/auto-parts/auto-parts-demo").then((module) => module.AutoPartsDemo)),
  gym: dynamic(() => import("@/components/demo/gym/gym-demo").then((module) => module.GymDemo)),
  "online-store": dynamic(() => import("@/components/demo/online-store/online-store-demo").then((module) => module.OnlineStoreDemo)),
  "karen-net": dynamic(() => import("@/components/demo/karen-net/karen-net-demo").then((module) => module.KarenNetDemo)),
};

export function generateStaticParams(): { product: string }[] {
  return DEMO_PRODUCTS.map((product) => ({ product: product.demoSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProductByDemo(slug);
  if (!product) notFound();

  return pageMeta({
    title: `دموی زنده ${product.name}`,
    description: `${product.name}: ${product.short} دموی زنده را بدون نصب و ثبت‌نام، با داده‌های نمونه در مرورگر امتحان کنید.`,
    path: `/demo/${product.demoSlug}`,
    images: product.image ? [product.image] : undefined,
  });
}

export default async function ProductDemoPage({ params }: { params: Promise<{ product: string }> }) {
  const { product: slug } = await params;
  const product = getProductByDemo(slug);
  const Demo = DEMOS[slug];
  if (!product || !Demo) notFound();

  return (
    <>
      <Demo />
      <section className="container-page py-12" aria-labelledby="demo-information-title">
        <div className="surface-card p-7 sm:p-10">
          <h2 id="demo-information-title" className="text-2xl font-bold">درباره دموی آنلاین {product.name}</h2>
          <p className="mt-4 max-w-3xl leading-loose text-muted">{product.description}</p>
          <h2 className="mt-7 text-lg font-bold">قابلیت‌های اصلی</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {product.features.map((feature) => <li key={feature} className="text-sm leading-loose">{feature}</li>)}
          </ul>
          <p className="mt-6 text-xs leading-loose text-muted">
            این محیط برای ارزیابی امکانات است و از داده‌های نمونه استفاده می‌کند؛ اطلاعات واقعی یا محرمانه وارد نکنید.
          </p>
          <Link className="mt-5 inline-flex text-sm font-bold text-brand-600 hover:underline dark:text-brand-300" href={`/products/${product.slug}`}>
            معرفی کامل {product.name} ←
          </Link>
        </div>
      </section>
      <JsonLd
        data={[
          softwareAppSchema(product),
          breadcrumbSchema([
            { name: "خانه", path: "/" },
            { name: "دموی زنده", path: "/demo" },
            { name: product.name, path: `/demo/${product.demoSlug}` },
          ]),
        ]}
      />
    </>
  );
}
