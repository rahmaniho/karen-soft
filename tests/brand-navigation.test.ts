import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { CHAP_LINKS, HOME_SEO, NAV_LINKS, SITE } from "../lib/constants";
import { PRODUCTS } from "../lib/products";
import { ProductCatalogPreview, PRODUCT_PREVIEW_SLUGS } from "../components/sections/product-catalog-preview";

describe("KarenSoft 2.0 brand and navigation", () => {
  it("uses the requested primary menu without dropping the print sub-brand", () => {
    expect(NAV_LINKS.map(item => [item.label, item.href])).toEqual([
      ["خانه", "/"],
      ["محصولات", "/products"],
      ["خدمات", "/services"],
      ["نمونه‌کارها", "/portfolio"],
      ["مرکز دانش", "/blog"],
      ["درباره ما", "/about"],
      ["تماس با ما", "/contact"],
    ]);
    expect(CHAP_LINKS.some(item => item.href === "/print")).toBe(true);
    expect(SITE.tagline).toBe("هوشمندی در خدمت کسب‌وکار");
    expect(SITE.mission).toBe("مهندسی نرم‌افزار برای حل مسائل واقعی");
  });

  it("keeps homepage metadata and schema copy aligned", () => {
    const home = readFileSync("app/(site)/page.tsx", "utf8");
    const layout = readFileSync("app/layout.tsx", "utf8");
    expect(HOME_SEO.title).toContain("مهندسی نرم‌افزار");
    expect(home).toContain("pageMeta(HOME_SEO)");
    expect(home).toContain("name: HOME_SEO.title");
    expect(layout).toContain("const homeTitle = HOME_SEO.title");
  });

  it("does not present unmonitored availability or commitment percentages as facts", () => {
    const home = readFileSync("app/(site)/page.tsx", "utf8");
    const nav = readFileSync("components/layout/experience-nav.tsx", "utf8");
    expect(home).not.toContain("سیستم‌های ما آنلاین‌اند");
    expect(home).not.toContain("متعهد به کیفیت اجرا");
    expect(nav).not.toContain("آماده برای پروژه‌های جدید");
  });

  it("renders the product preview from real catalog data and statuses", () => {
    const html = renderToStaticMarkup(createElement(ProductCatalogPreview));
    expect(PRODUCT_PREVIEW_SLUGS).toHaveLength(6);
    for (const slug of PRODUCT_PREVIEW_SLUGS) {
      const product = PRODUCTS.find(item => item.slug === slug);
      expect(product, slug).toBeTruthy();
      expect(html).toContain(`href="/products/${slug}"`);
      expect(html).toContain(product!.name);
      expect(html).toContain(`data-status="${product!.status}"`);
    }
    expect(html).not.toContain("تومان");
  });
});
