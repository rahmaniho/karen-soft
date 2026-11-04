import { describe, expect, it } from "vitest";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { sitemapEntries } from "../app/sitemap";
import { GET as getLlmsTxt } from "../app/llms.txt/route";
import { BLOG_POSTS } from "../lib/blog";
import { PRODUCTS } from "../lib/products";
import {
  HESABYAR_APK_SHA256,
  HESABYAR_APK_SHA256_URL,
  HESABYAR_APK_URL,
  HESABYAR_FAQS,
  HESABYAR_IMAGE,
  HESABYAR_LOGO,
  HESABYAR_OFFERS,
  HESABYAR_PLANS,
  HESABYAR_PRODUCT,
  HESABYAR_RELEASE_CHANGES,
  HESABYAR_RELEASE_DATE,
  HESABYAR_RELEASE_URL,
  HESABYAR_SEO,
  HESABYAR_SOURCE_COMMIT,
  HESABYAR_UPGRADE_INSTRUCTIONS,
  HESABYAR_VERSION,
  HESABYAR_WEB_URL,
} from "../lib/hesabyar";
import { HesabyarProductPage } from "../components/site/hesabyar-product-page";
import { auditPageMeta, pageMeta } from "../lib/seo";
import { breadcrumbNode, faqNode, jsonLdGraph, softwareApplicationNode, validateJsonLd } from "../lib/seo-kit";
import { SITE } from "../lib/constants";

const PATH = "/products/hesabyar";

describe("Hesabyar dedicated product page", () => {
  it("registers Hesabyar with the new official cover and square mark", () => {
    const product = PRODUCTS.find((item) => item.slug === "hesabyar");
    expect(product).toBeDefined();
    expect(product).toMatchObject({ slug: "hesabyar", name: HESABYAR_PRODUCT.name, status: "active" });
    expect(product?.features.length).toBeGreaterThan(5);
    expect(product?.liveUrl).toBe(HESABYAR_WEB_URL);
    expect(product?.pricingFrom).toBe(70_000);
    expect(product?.image).toBe(HESABYAR_IMAGE);
    expect(product?.logo).toBe(HESABYAR_LOGO);
    expect(existsSync(`public${HESABYAR_IMAGE}`)).toBe(true);
    expect(existsSync(`public${HESABYAR_LOGO}`)).toBe(true);
    expect(existsSync("app/(site)/products/hesabyar/page.tsx")).toBe(true);
    expect(existsSync("components/site/hesabyar-product-page.tsx")).toBe(true);
  });

  it("publishes one sitemap entry with the actual release update date", () => {
    const entries = sitemapEntries().filter((item) => new URL(item.url).pathname === PATH);
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe(`${SITE.url}${PATH}`);
    expect(entries[0].priority).toBeGreaterThanOrEqual(0.9);
    expect(entries[0].lastModified).toEqual(new Date(HESABYAR_RELEASE_DATE));
  });

  it("uses shared, version-aware metadata without technical build labels", () => {
    const meta = pageMeta({ ...HESABYAR_SEO, images: [HESABYAR_IMAGE] });
    expect(meta.alternates?.canonical).toBe(`${SITE.url}${PATH}`);
    expect(meta.title).toEqual({ absolute: HESABYAR_SEO.title });
    expect(meta.description).toBe(HESABYAR_SEO.description);
    expect(meta.description).toContain(HESABYAR_VERSION);
    expect(meta.description).not.toContain("آزمایشی");
    expect(JSON.stringify(meta.openGraph)).toContain("hesabyar-cover.jpg");
    expect(auditPageMeta(HESABYAR_SEO)).toEqual([]);
    const route = readFileSync("app/(site)/products/hesabyar/page.tsx", "utf8");
    expect(route).toContain("...HESABYAR_SEO");
    expect(route).toContain("images: [HESABYAR_IMAGE]");
    expect(route).toContain("name: HESABYAR_SEO.title");
  });

  it("emits a valid JSON-LD graph with the short update FAQ and unchanged licence offers", () => {
    const graph = jsonLdGraph([
      softwareApplicationNode({
        id: `${SITE.url}${PATH}#software`, name: HESABYAR_PRODUCT.name,
        description: HESABYAR_PRODUCT.description, url: `${SITE.url}${PATH}`,
        baseUrl: SITE.url, operatingSystem: "Android 7+ · Web", offers: HESABYAR_OFFERS,
        organizationId: `${SITE.url}/#organization`, image: HESABYAR_IMAGE,
      }),
      breadcrumbNode([{ name: "خانه", path: "/" }, { name: "محصولات", path: "/products" }, { name: "حساب‌یار", path: PATH }], SITE.url),
      faqNode(HESABYAR_FAQS.map((item) => ({ q: item.q, a: item.a }))),
    ]);
    expect(validateJsonLd(graph["@graph"])).toEqual([]);
    const software = graph["@graph"][0] as { operatingSystem: string; image: string; offers: { price: number; priceCurrency: string }[] };
    expect(software.operatingSystem).toContain("Android");
    expect(software.operatingSystem).toContain("Web");
    expect(software.image).toContain("hesabyar-cover.jpg");
    expect(software.offers.map((offer) => [offer.price, offer.priceCurrency])).toEqual([
      [2_700_000, "IRR"], [1_300_000, "IRR"], [700_000, "IRR"],
    ]);
    const upgrade = HESABYAR_FAQS.find((item) => item.q.includes(HESABYAR_VERSION));
    expect(upgrade?.a).toBe(HESABYAR_UPGRADE_INSTRUCTIONS);
    expect(HESABYAR_FAQS.some((item) => item.q.includes("فروشگاهی"))).toBe(false);
  });

  it("renders source-backed changes and the owner-approved update note without Debug labels", () => {
    const html = renderToStaticMarkup(createElement(HesabyarProductPage));
    expect(html).toContain('id="release-notes"');
    expect(html).toContain(`تازه در نسخهٔ ${HESABYAR_VERSION}`);
    expect(html).toMatch(new RegExp(`<time datetime="${HESABYAR_RELEASE_DATE}">`, "i"));
    expect(html).toContain(HESABYAR_UPGRADE_INSTRUCTIONS);
    for (const removed of ["Android Debug", "test/debug", "Pre-release", "بیلد آزمایشی", "هشدار نصب نسخهٔ آزمایشی"]) {
      expect(html).not.toContain(removed);
    }
    expect(html.match(/data-hesabyar-apk/g)).toHaveLength(2);
    expect(html).toContain("hesabyar-1.4.2-test.apk");
    expect(html).toContain(HESABYAR_APK_SHA256);
    expect(html).toContain(`href="${HESABYAR_APK_SHA256_URL}"`);
    expect(html).toContain(`href="${HESABYAR_RELEASE_URL}"`);
    expect(html).toContain(`blob/${HESABYAR_SOURCE_COMMIT}/docs/releases/v1.4.2.md`);
    expect(html).not.toContain("hesabyar-1.3.0-test.apk");
    expect(HESABYAR_RELEASE_CHANGES).toHaveLength(6);
    for (const change of HESABYAR_RELEASE_CHANGES) {
      expect(html).toContain(change.title);
      expect(html).toContain(change.text);
    }
    expect(html).toContain(`href="${HESABYAR_WEB_URL}"`);
    expect(HESABYAR_PLANS.map((plan) => plan.price)).toEqual([270_000, 130_000, 70_000]);
    expect(PATH).toBe(`/products/${HESABYAR_PRODUCT.slug}`);
  });

  it("keeps prices, the exact APK and the short update note consistent in llms.txt and guides", async () => {
    const home = readFileSync("components/sections/hesabyar-download.tsx", "utf8");
    expect(home).toContain("HESABYAR_PRODUCT_PATH");
    expect(home).toContain("/products/hesabyar");
    const llms = await getLlmsTxt().text();
    for (const text of [`${SITE.url}${PATH}`, HESABYAR_WEB_URL, "۲۷۰٬۰۰۰ تومان", HESABYAR_APK_URL,
      HESABYAR_VERSION, HESABYAR_APK_SHA256, HESABYAR_UPGRADE_INSTRUCTIONS, HESABYAR_RELEASE_URL]) {
      expect(llms).toContain(text);
    }
    for (const removed of ["Android Debug", "Pre-release", "بیلد آزمایشی"]) expect(llms).not.toContain(removed);
    for (const change of HESABYAR_RELEASE_CHANGES) expect(llms).toContain(change.title);
    const hesabyarPosts = BLOG_POSTS.filter((post) => post.category === "حساب‌یار");
    expect(hesabyarPosts).toHaveLength(2);
    for (const post of hesabyarPosts) {
      expect(post.relatedLinks?.some((link) => link.href === PATH)).toBe(true);
      expect(post.modifiedDate).toBe(HESABYAR_RELEASE_DATE);
    }
    const storeGuide = hesabyarPosts.find((post) => post.slug === "hesabyar-store-inventory");
    expect(storeGuide?.cover).toBe(HESABYAR_IMAGE);
    expect(storeGuide?.relatedLinks?.some((link) => link.href === `${PATH}#release-notes`)).toBe(true);
    expect(storeGuide?.sections.some((section) => section.heading.includes(HESABYAR_VERSION))).toBe(true);
  });
});
