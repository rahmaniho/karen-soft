import { describe, expect, it } from "vitest";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { BLOG_POSTS } from "../lib/blog";
import { HESABYAR_ARTICLE_POST, HESABYAR_ARTICLE_PATH, HESABYAR_ARTICLE_IMAGES, HESABYAR_ARTICLE_FEATURES, HESABYAR_ARTICLE_FAQS, HESABYAR_ARTICLE_COMPARISON, HESABYAR_ARTICLE_STEPS, HESABYAR_ARTICLE_CTA } from "../lib/hesabyar-article";
import { HESABYAR_PLANS, HESABYAR_FREE_TIER, HESABYAR_PRODUCT_PATH, HESABYAR_WEB_URL, formatToman } from "../lib/hesabyar";
import { HesabyarAccountingArticle } from "../components/site/hesabyar-accounting-article";
import { articleSchema, breadcrumbSchema } from "../lib/schema";
import { auditPageMeta, pageMeta } from "../lib/seo";
import { sitemapEntries } from "../app/sitemap";
import { GET as getRss } from "../app/rss.xml/route";
import { SITE } from "../lib/constants";

describe("Hesabyar reference article", () => {
  it("registers one canonical article in the existing journal, sitemap and RSS", async () => {
    const posts = BLOG_POSTS.filter((post) => post.slug === HESABYAR_ARTICLE_POST.slug);
    expect(posts).toHaveLength(1);
    expect(posts[0]).toEqual(HESABYAR_ARTICLE_POST);
    expect(HESABYAR_ARTICLE_PATH).toBe("/blog/hesabyar-accounting-software");
    expect(BLOG_POSTS[0].slug).toBe(HESABYAR_ARTICLE_POST.slug);
    const entries = sitemapEntries().filter((entry) => new URL(entry.url).pathname === HESABYAR_ARTICLE_PATH);
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe(`${SITE.url}${HESABYAR_ARTICLE_PATH}`);
    expect(await getRss().text()).toContain(`${SITE.url}${HESABYAR_ARTICLE_PATH}`);
  });

  it("keeps the employer-supplied originals and optimized WebP covers", () => {
    const expected = {
      "hero.png": "50838ed088afa90cd4a0c487b46b27cd03f55bf6768c4830cf6c4e4f08d3e9c1",
      "features.png": "7e98c1835bac8a2eb699da7aa1174d203f421de06240732040c2803181818ae7",
    };
    for (const [name, hash] of Object.entries(expected)) {
      const file = `public/images/blog/hesabyar-accounting/${name}`;
      expect(existsSync(file)).toBe(true);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(hash);
    }
    for (const name of ["hero", "features"]) {
      const original = `public/images/blog/hesabyar-accounting/${name}.png`;
      const webp = `public/images/blog/hesabyar-accounting/${name}.webp`;
      expect(existsSync(webp)).toBe(true);
      expect(statSync(webp).size).toBeLessThan(statSync(original).size);
    }
    expect(HESABYAR_ARTICLE_POST.cover).toBe(HESABYAR_ARTICLE_IMAGES.cover);
    expect(HESABYAR_ARTICLE_POST.coverAlt).toContain("لوگوی رسمی");
  });

  it("covers the requested structure, seven feature groups and at least twelve FAQs", () => {
    expect(HESABYAR_ARTICLE_POST.sections).toHaveLength(12);
    expect(new Set(HESABYAR_ARTICLE_POST.sections.map((section) => section.id)).size).toBe(12);
    expect(HESABYAR_ARTICLE_FEATURES).toHaveLength(7);
    expect(HESABYAR_ARTICLE_FAQS.length).toBeGreaterThanOrEqual(12);
    expect(HESABYAR_ARTICLE_COMPARISON).toHaveLength(9);
    expect(HESABYAR_ARTICLE_STEPS).toHaveLength(7);
    for (const question of ["حساب‌یار چیست؟", "آیا حساب‌یار رایگان است؟", "آیا اطلاعات بین گوشی و کامپیوتر همگام می‌شوند؟", "چگونه لایسنس حرفه‌ای را فعال کنم؟"]) {
      expect(HESABYAR_ARTICLE_FAQS.some((item) => item.q === question)).toBe(true);
    }
  });

  it("renders shared pricing, exact CTAs, responsive comparison and descriptive image alt text", () => {
    const html = renderToStaticMarkup(createElement(HesabyarAccountingArticle, { post: HESABYAR_ARTICLE_POST }));
    expect(html).toContain(HESABYAR_FREE_TIER);
    for (const plan of HESABYAR_PLANS) expect(html).toContain(formatToman(plan.price));
    expect(html).toContain(`href="${HESABYAR_WEB_URL}"`);
    expect(html).toContain(`href="${HESABYAR_PRODUCT_PATH}"`);
    expect(html).toContain(HESABYAR_ARTICLE_CTA.primary.label);
    expect(html).toContain(HESABYAR_ARTICLE_CTA.secondary.label);
    expect(html).toContain(HESABYAR_ARTICLE_IMAGES.coverAlt);
    expect(html).toContain(HESABYAR_ARTICLE_IMAGES.featuresAlt);
    expect(html).toContain("ks-ha-table-wrap");
    expect(html).toContain('tabindex="0"');
    expect(html).toContain("نباید آن را معادل رمزگذاری کامل همه داده‌ها یا امنیت صددرصدی دانست");
    expect(html).not.toContain("Android Debug");
    for (const feature of HESABYAR_ARTICLE_FEATURES) expect(html).toContain(feature.title);
  });

  it("publishes article metadata, canonical, social cards and Article/Breadcrumb schema", () => {
    const meta = pageMeta({
      title: HESABYAR_ARTICLE_POST.metaTitle ?? HESABYAR_ARTICLE_POST.title,
      description: HESABYAR_ARTICLE_POST.excerpt,
      path: HESABYAR_ARTICLE_PATH,
      images: [HESABYAR_ARTICLE_POST.cover],
      openGraphType: "article",
      publishedTime: HESABYAR_ARTICLE_POST.date,
      authors: [HESABYAR_ARTICLE_POST.author],
      section: HESABYAR_ARTICLE_POST.category,
      tags: HESABYAR_ARTICLE_POST.tags,
    }, { maxTitle: 60 });
    expect(meta.title).toEqual({ absolute: "حساب‌یار کارن سافت | نرم‌افزار حسابداری آنلاین و آفلاین" });
    expect(meta.description).toBe(HESABYAR_ARTICLE_POST.excerpt);
    expect(meta.alternates?.canonical).toBe(`${SITE.url}${HESABYAR_ARTICLE_PATH}`);
    expect(JSON.stringify(meta.twitter)).toContain("summary_large_image");
    expect(auditPageMeta({ title: HESABYAR_ARTICLE_POST.metaTitle!, description: HESABYAR_ARTICLE_POST.excerpt, path: HESABYAR_ARTICLE_PATH, images: [HESABYAR_ARTICLE_POST.cover] })).toEqual([]);
    const article = articleSchema(HESABYAR_ARTICLE_POST);
    expect(article["@type"]).toBe("BlogPosting");
    expect(article.headline).toBe(HESABYAR_ARTICLE_POST.title);
    expect(JSON.stringify(article.image)).toContain(HESABYAR_ARTICLE_IMAGES.cover);
    const breadcrumb = breadcrumbSchema([{ name: "خانه", path: "/" }, { name: "مجله", path: "/blog" }, { name: HESABYAR_ARTICLE_POST.title, path: HESABYAR_ARTICLE_PATH }]);
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
  });

  it("uses only resolvable internal related links and the official product/app destinations", () => {
    for (const link of HESABYAR_ARTICLE_POST.relatedLinks ?? []) {
      if (link.href.startsWith("/blog/")) expect(BLOG_POSTS.some((post) => `/blog/${post.slug}` === link.href)).toBe(true);
      else expect(["/products", HESABYAR_PRODUCT_PATH]).toContain(link.href);
    }
    expect(HESABYAR_ARTICLE_CTA.primary.href).toBe("https://hesabyar.karen-soft.ir/");
    expect(HESABYAR_ARTICLE_CTA.secondary.href).toBe("/products/hesabyar");
  });
});
