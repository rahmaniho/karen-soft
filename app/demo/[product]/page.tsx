import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { PRODUCTS, getProductByDemo } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, softwareAppSchema } from "@/lib/schema";

/* Each demo is code-split so it never affects the marketing bundle. */
const DEMOS: Record<string, React.ComponentType> = {
  "printing-management": dynamic(() => import("@/components/demo/printing/printing-demo").then((m) => m.PrintingDemo)),
  "law-office": dynamic(() => import("@/components/demo/law-office/law-office-demo").then((m) => m.LawOfficeDemo)),
  "taxi-management": dynamic(() => import("@/components/demo/taxi/taxi-demo").then((m) => m.TaxiDemo)),
  "smart-building": dynamic(() => import("@/components/demo/smart-building/smart-building-demo").then((m) => m.SmartBuildingDemo)),
  "real-estate": dynamic(() => import("@/components/demo/real-estate/real-estate-demo").then((m) => m.RealEstateDemo)),
  restaurant: dynamic(() => import("@/components/demo/restaurant/restaurant-demo").then((m) => m.RestaurantDemo)),
  "auto-parts": dynamic(() => import("@/components/demo/auto-parts/auto-parts-demo").then((m) => m.AutoPartsDemo)),
  gym: dynamic(() => import("@/components/demo/gym/gym-demo").then((m) => m.GymDemo)),
  "online-store": dynamic(() => import("@/components/demo/online-store/online-store-demo").then((m) => m.OnlineStoreDemo)),
  "karen-net": dynamic(() => import("@/components/demo/karen-net/karen-net-demo").then((m) => m.KarenNetDemo)),
};

export function generateStaticParams(): { product: string }[] {
  return PRODUCTS.map((product) => ({ product: product.demoSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
  const { product: slug } = await params;
  const product = getProductByDemo(slug);
  if (!product) return pageMeta({ title: "دمو یافت نشد", description: "این دمو در دسترس نیست.", noIndex: true });
  return pageMeta({
    title: `دموی زنده ${product.name}`,
    description: `${product.short} همه ماژول‌ها را بدون نصب و ثبت‌نام در مرورگر امتحان کنید.`,
    path: `/demo/${product.demoSlug}`,
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
