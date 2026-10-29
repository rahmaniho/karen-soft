import type { Metadata } from "next";
import { JsonLd } from "@/components/ui/json-ld";
import { HesabyarProductPage } from "@/components/site/hesabyar-product-page";
import { SITE } from "@/lib/constants";
import {
  HESABYAR_FAQS,
  HESABYAR_FEATURES,
  HESABYAR_IMAGE,
  HESABYAR_MODULES,
  HESABYAR_OFFERS,
  HESABYAR_PRODUCT,
  HESABYAR_RUNTIME,
  HESABYAR_WEB_URL,
} from "@/lib/hesabyar";
import { breadcrumbNode, faqNode, jsonLdGraph, softwareApplicationNode } from "@/lib/seo-kit";
import { pageMeta } from "@/lib/seo";

const PATH = "/products/hesabyar";
const PAGE_URL = `${SITE.url}${PATH}`;

export const metadata: Metadata = pageMeta({
  title: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت",
  description:
    "حساب‌یار کارن سافت: صندوق فروش، انبار، دفتر مالی کسب‌وکار، بودجه و حقوق، آفلاین روی اندروید و مرورگر. لایسنس از ۷۰٬۰۰۰ تومان؛ مادام‌العمر ۲۷۰٬۰۰۰ تومان.",
  path: PATH,
  images: [HESABYAR_IMAGE],
});

export default function HesabyarPage() {
  return (
    <>
      <HesabyarProductPage />
      <JsonLd
        data={jsonLdGraph([
          softwareApplicationNode({
            id: `${PAGE_URL}#software`,
            name: HESABYAR_PRODUCT.name,
            description: HESABYAR_PRODUCT.description,
            url: PAGE_URL,
            baseUrl: SITE.url,
            operatingSystem: HESABYAR_RUNTIME,
            image: HESABYAR_IMAGE,
            featureList: [...HESABYAR_MODULES, ...HESABYAR_FEATURES.map((feature) => feature.title)],
            offers: HESABYAR_OFFERS,
            organizationId: `${SITE.url}/#organization`,
          }),
          {
            "@type": "WebPage",
            "@id": `${PAGE_URL}#webpage`,
            url: PAGE_URL,
            name: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت",
            inLanguage: "fa-IR",
            isPartOf: { "@id": `${SITE.url}/#website` },
            about: { "@id": `${PAGE_URL}#software` },
            primaryImageOfPage: HESABYAR_IMAGE,
            sameAs: [HESABYAR_WEB_URL],
          },
          breadcrumbNode(
            [
              { name: "خانه", path: "/" },
              { name: "محصولات", path: "/products" },
              { name: "حساب‌یار", path: PATH },
            ],
            SITE.url,
          ),
          faqNode(HESABYAR_FAQS.map((item) => ({ q: item.q, a: item.a }))),
        ])}
      />
    </>
  );
}
