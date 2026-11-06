import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import {
  HESABYAR_PRODUCT,
  HESABYAR_OFFERS,
  HESABYAR_SEO,
  HESABYAR_IMAGE,
} from "../lib/hesabyar";
import { HesabyarProductPage } from "../components/site/hesabyar-product-page";
import { GET } from "../app/llms.txt/route";
import { sitemapEntries } from "../app/sitemap";

describe("Karo product migration", () => {
  it("keeps existing URL and updates product metadata and offers", () => {
    expect(HESABYAR_PRODUCT.slug).toBe("hesabyar");
    expect(HESABYAR_PRODUCT.name).toContain("کارو");
    expect(HESABYAR_PRODUCT.liveUrl).toBe("https://karo.karen-soft.ir/");
    expect(HESABYAR_PRODUCT.pricingFrom).toBe(30000);
    expect(HESABYAR_SEO.path).toBe("/products/hesabyar");
    expect(HESABYAR_SEO.title).toContain("کارو");
    expect(HESABYAR_OFFERS.map((offer) => offer.priceRial)).toEqual([
      300000, 600000, 1200000,
    ]);
    expect(
      sitemapEntries().filter((entry) =>
        entry.url.endsWith("/products/hesabyar"),
      ),
    ).toHaveLength(1);
  });
  it("preserves uploaded logo bytes and serves optimized WebP", () => {
    expect(existsSync(`public${HESABYAR_IMAGE}`)).toBe(true);
    expect(
      readFileSync("public/images/karo/logo-original.png")
        .subarray(1, 4)
        .toString(),
    ).toBe("PNG");
    expect(
      readFileSync(`public${HESABYAR_IMAGE}`).subarray(8, 12).toString(),
    ).toBe("WEBP");
  });
  it("renders current pricing, architecture, FAQs and old anchor compatibility", () => {
    const html = renderToStaticMarkup(createElement(HesabyarProductPage));
    for (const text of [
      "کاملاً آنلاین",
      "روی سرور",
      "دستگاه‌های مختلف",
      "۳۰٬۰۰۰",
      "۶۰٬۰۰۰",
      "۱۲۰٬۰۰۰",
      'id="pricing"',
      'id="release-notes"',
      'id="versions"',
      "اطلاعات حسابداری مشتری حذف نمی‌شود",
    ])
      expect(html).toContain(text);
    for (const text of [
      ".apk",
      "hesabyar.karen-soft.ir",
      "۲۷۰٬۰۰۰",
      "۷۰٬۰۰۰",
      "۱۳۰٬۰۰۰",
      "یک کالا و ۱۰ تراکنش",
      "SHA-256",
    ])
      expect(html).not.toContain(text);
  });
  it("keeps machine-readable discovery consistent", async () => {
    const text = await GET().text();
    expect(text).toContain("https://karo.karen-soft.ir/");
    expect(text).toContain("کارو");
    expect(text).not.toContain(".apk");
    expect(text).not.toContain("hesabyar.karen-soft.ir");
    expect(text).not.toContain("لایسنس حرفه‌ای");
  });
});
