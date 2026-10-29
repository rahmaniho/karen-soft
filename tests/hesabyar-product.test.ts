import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { sitemapEntries } from "../app/sitemap";
import { GET as getLlmsTxt } from "../app/llms.txt/route";
import { BLOG_POSTS } from "../lib/blog";
import { PRODUCTS } from "../lib/products";
import {
  HESABYAR_APK_URL,
  HESABYAR_FAQS,
  HESABYAR_OFFERS,
  HESABYAR_PLANS,
  HESABYAR_PRODUCT,
  HESABYAR_WEB_URL,
} from "../lib/hesabyar";
import { auditPageMeta } from "../lib/seo";
import { pageMeta } from "../lib/seo";
import { breadcrumbNode, faqNode, jsonLdGraph, softwareApplicationNode, validateJsonLd } from "../lib/seo-kit";
import { SITE } from "../lib/constants";

const PATH = "/products/hesabyar";

describe("Hesabyar dedicated product page", () => {
  it("registers Hesabyar as a catalogue product with its own page", () => {
    const product = PRODUCTS.find((item) => item.slug === "hesabyar");
    expect(product).toBeDefined();
    expect(product).toMatchObject({ slug: "hesabyar", name: HESABYAR_PRODUCT.name, status: "active" });
    expect(product?.features.length).toBeGreaterThan(5);
    expect(product?.liveUrl).toBe(HESABYAR_WEB_URL);
    expect(product?.pricingFrom).toBe(70_000);
    expect(existsSync("app/(site)/products/hesabyar/page.tsx")).toBe(true);
    expect(existsSync("components/site/hesabyar-product-page.tsx")).toBe(true);
  });

  it("publishes the page in the sitemap with its own canonical and a recent lastmod", () => {
    const entry = sitemapEntries().find((item) => new URL(item.url).pathname === PATH);
    expect(entry).toBeDefined();
    expect(entry?.url).toBe(`${SITE.url}${PATH}`);
    expect(entry?.priority).toBeGreaterThanOrEqual(0.9);
    expect(entry?.lastModified).toBeInstanceOf(Date);
    expect(sitemapEntries().filter((item) => new URL(item.url).pathname === PATH)).toHaveLength(1);
  });

  it("keeps unique, in-range metadata without audit findings", () => {
    const meta = pageMeta({
      title: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت",
      description:
        "حساب‌یار کارن سافت: صندوق فروش، انبار، دفتر مالی کسب‌وکار، بودجه و حقوق، آفلاین روی اندروید و مرورگر. لایسنس از ۷۰٬۰۰۰ تومان؛ مادام‌العمر ۲۷۰٬۰۰۰ تومان.",
      path: PATH,
    });
    expect(meta.alternates?.canonical).toBe(`${SITE.url}${PATH}`);
    expect(meta.title).toEqual({ absolute: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت" });
    expect(auditPageMeta({
      title: "حساب‌یار؛ صندوق فروش و حسابداری اندروید و وب کارن سافت",
      description:
        "حساب‌یار کارن سافت: صندوق فروش، انبار، دفتر مالی کسب‌وکار، بودجه و حقوق، آفلاین روی اندروید و مرورگر. لایسنس از ۷۰٬۰۰۰ تومان؛ مادام‌العمر ۲۷۰٬۰۰۰ تومان.",
      path: PATH,
    })).toEqual([]);
  });

  it("emits a valid JSON-LD graph with both versions and all three licence offers", () => {
    const graph = jsonLdGraph([
      softwareApplicationNode({
        id: `${SITE.url}${PATH}#software`,
        name: HESABYAR_PRODUCT.name,
        description: HESABYAR_PRODUCT.description,
        url: `${SITE.url}${PATH}`,
        baseUrl: SITE.url,
        operatingSystem: "Android 7+ · Web",
        offers: HESABYAR_OFFERS,
        organizationId: `${SITE.url}/#organization`,
      }),
      breadcrumbNode([{ name: "خانه", path: "/" }, { name: "محصولات", path: "/products" }, { name: "حساب‌یار", path: PATH }], SITE.url),
      faqNode(HESABYAR_FAQS.map((item) => ({ q: item.q, a: item.a }))),
    ]);

    expect(validateJsonLd(graph["@graph"])).toEqual([]);
    const software = graph["@graph"][0] as { operatingSystem: string; offers: { price: number; priceCurrency: string }[] };
    expect(software.operatingSystem).toContain("Android");
    expect(software.operatingSystem).toContain("Web");
    expect(software.offers.map((offer) => [offer.price, offer.priceCurrency])).toEqual([
      [2_700_000, "IRR"],
      [1_300_000, "IRR"],
      [700_000, "IRR"],
    ]);
  });

  it("exposes the same prices, versions and links in the page source", () => {
    const source = readFileSync("components/site/hesabyar-product-page.tsx", "utf8");
    for (const text of [
      "HESABYAR_APK_URL",
      "HESABYAR_WEB_URL",
      "HESABYAR_APK_SHA256",
      "HESABYAR_PLANS",
      "HESABYAR_FAQS",
      "تازه در نسخهٔ ۱٫۳",
    ]) {
      expect(source).toContain(text);
    }
    const route = readFileSync("app/(site)/products/hesabyar/page.tsx", "utf8");
    expect(route).toContain("pageMeta");
    expect(route).toContain("jsonLdGraph");
    expect(route).toContain("softwareApplicationNode");
    expect(PATH).toBe(`/products/${HESABYAR_PRODUCT.slug}`);
    expect(HESABYAR_PLANS.map((plan) => plan.price)).toEqual([270_000, 130_000, 70_000]);
    expect(HESABYAR_APK_URL).toContain("hesabyar-1.3.0-test.apk");
  });

  it("is reachable from internal links, llms.txt and the blog guides", async () => {
    const home = readFileSync("components/sections/hesabyar-download.tsx", "utf8");
    expect(home).toContain("HESABYAR_PRODUCT_PATH");
    expect(home).toContain("/products/hesabyar");

    const llms = await getLlmsTxt().text();
    expect(llms).toContain(`${SITE.url}${PATH}`);
    expect(llms).toContain(HESABYAR_WEB_URL);
    expect(llms).toContain("۲۷۰٬۰۰۰ تومان");

    const hesabyarPosts = BLOG_POSTS.filter((post) => post.category === "حساب‌یار");
    expect(hesabyarPosts).toHaveLength(2);
    for (const post of hesabyarPosts) {
      expect(post.relatedLinks?.some((link) => link.href === PATH)).toBe(true);
    }
  });
});
