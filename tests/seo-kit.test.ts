import { describe, expect, it } from "vitest";
import {
  SeoConfigError,
  auditHtmlDocument,
  buildMetadata,
  defineSitemap,
  inspectMetadata,
  inspectSitemap,
  jsonLdGraph,
  normalizePath,
  softwareApplicationNode,
  summarizeAudit,
  textLength,
  truncateText,
  validateJsonLd,
} from "../lib/seo-kit";
import { sitemapEntries } from "../app/sitemap";
import { pageMeta } from "../lib/seo";
import { BLOG_POSTS } from "../lib/blog";
import { CASE_STUDIES } from "../lib/portfolio";
import { PRODUCTS } from "../lib/products";
import { SOLUTIONS } from "../lib/solutions";
import { SITE } from "../lib/constants";

const options = { baseUrl: "https://example.test", brand: "برند", defaultImage: "/logo.png" };

describe("seo-kit metadata builder", () => {
  it("builds an absolute canonical, robots and social images", () => {
    const meta = buildMetadata({ title: "صفحهٔ آزمایشی محصول", description: "توضیح کوتاه و روشن برای صفحهٔ آزمایشی محصول.", path: "/p/1" }, options);
    expect(meta.title.absolute).toBe("صفحهٔ آزمایشی محصول | برند");
    expect(meta.alternates?.canonical).toBe("https://example.test/p/1");
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.openGraph).toMatchObject({ type: "website", locale: "fa_IR", siteName: "برند" });
    expect(meta.twitter.images).toEqual(["https://example.test/logo.png"]);
    expect(inspectMetadata(meta)).toEqual([]);
  });

  it("does not duplicate the brand and omits canonical for noindex pages", () => {
    const meta = buildMetadata({ title: "برند — تماس", description: "راه‌های تماس با تیم برای شروع همکاری.", path: "/contact", noIndex: true }, options);
    expect(meta.title.absolute).toBe("برند — تماس");
    expect(meta.alternates).toBeUndefined();
    expect(meta.robots).toEqual({ index: false, follow: true });
  });

  it("supports article metadata and truncates long descriptions", () => {
    const meta = buildMetadata(
      { title: "مقاله", description: "ا".repeat(400), path: "/blog/x", openGraphType: "article", publishedTime: "2026-01-01", authors: ["نویسنده"] },
      { ...options, maxDescription: 120 },
    );
    expect(textLength(meta.description)).toBeLessThanOrEqual(120);
    expect(meta.description.endsWith("…")).toBe(true);
    expect(meta.openGraph).toMatchObject({ type: "article", publishedTime: "2026-01-01", authors: ["نویسنده"] });
  });

  it("keeps every blog title inside the browser-title budget", () => {
    for (const post of BLOG_POSTS) {
      const meta = pageMeta(
        { title: post.metaTitle ?? post.title, description: post.excerpt, path: `/blog/${post.slug}` },
        { maxTitle: 65 },
      );
      const title = (meta.title as { absolute: string }).absolute;
      expect(textLength(title), `${post.slug} → ${title}`).toBeLessThanOrEqual(65);
    }
  });

  it("drops the brand suffix before truncating a long title", () => {
    const long = buildMetadata({ title: "ع".repeat(60), description: "توضیح", path: "/x" }, { ...options, maxTitle: 65 });
    expect(JSON.stringify(long.title)).not.toContain("برند");
    const veryLong = buildMetadata({ title: "ع".repeat(90), description: "توضیح", path: "/x" }, { ...options, maxTitle: 65 });
    expect(textLength(veryLong.title.absolute)).toBeLessThanOrEqual(65);
  });

  it("normalises paths and text helpers consistently", () => {
    expect(normalizePath("https://karen-soft.ir/blog/")).toBe("/blog");
    expect(normalizePath("/")).toBe("/");
    expect(normalizePath("//print/products/tract?x=1")).toBe("/print/products/tract");
    // نیم‌فاصله حذف نمی‌شود؛ فقط نویسه‌های کنترلیِ نامرئی پاک می‌شوند.
    expect(textLength("سلام\u200cدنیا")).toBe(9);
    expect(truncateText("می\u200cسازیم", 20)).toBe("می\u200cسازیم");
    expect(truncateText("کوتاه", 20)).toBe("کوتاه");
  });
});

describe("seo-kit sitemap builder", () => {
  it("rejects duplicates, noindex paths, bad priorities and invalid dates", () => {
    expect(() =>
      defineSitemap({
        baseUrl: "https://example.test",
        routes: [
          { path: "/a", priority: 0.5 },
          { path: "/a/" },
          { path: "/private" },
          { path: "/b", priority: 3 },
          { path: "/c", lastModified: "not-a-date" },
        ],
        excluded: ["/private"],
      }),
    ).toThrow(SeoConfigError);

    try {
      defineSitemap({ baseUrl: "https://example.test", routes: [{ path: "/a" }, { path: "/a" }] });
    } catch (error) {
      expect((error as SeoConfigError).issues.join(" ")).toContain("تکراری");
    }
  });

  it("keeps the live sitemap free of structural problems", () => {
    const entries = sitemapEntries();
    const paths = entries.map((entry) => new URL(entry.url).pathname);
    expect(new Set(paths).size).toBe(paths.length);
    expect(entries.every((entry) => entry.url.startsWith("https://karen-soft.ir/"))).toBe(true);
    expect(entries.every((entry) => entry.priority >= 0 && entry.priority <= 1)).toBe(true);
    expect(inspectSitemap(entries, { minEntries: 50 }).filter((note) => !note.includes("lastmod"))).toEqual([]);
  });

  it("covers every public route family in the sitemap", () => {
    const paths = new Set(sitemapEntries().map((entry) => new URL(entry.url).pathname));
    for (const product of PRODUCTS) expect(paths.has(`/products/${product.slug}`)).toBe(true);
    for (const solution of SOLUTIONS) expect(paths.has(`/solutions/${solution.slug}`)).toBe(true);
    for (const study of CASE_STUDIES) expect(paths.has(`/portfolio/${study.slug}`)).toBe(true);
    for (const post of BLOG_POSTS) expect(paths.has(`/blog/${post.slug}`)).toBe(true);
    for (const excluded of ["/status", "/changelog", "/roadmap", "/print/order"]) expect(paths.has(excluded)).toBe(false);
  });
});

describe("seo-kit JSON-LD validator", () => {
  it("accepts a valid software node and rejects broken graphs", () => {
    const node = softwareApplicationNode({
      id: "https://example.test/app#software",
      name: "اپ",
      description: "توضیح",
      url: "https://example.test/app",
      baseUrl: "https://example.test",
      operatingSystem: "Android",
      offers: [{ name: "یک‌ساله", priceRial: 1_300_000 }],
    });
    expect(validateJsonLd([node])).toEqual([]);
    expect(validateJsonLd([{ name: "بدون نوع" }]).join(" ")).toContain("@type");
    expect(validateJsonLd([{ "@type": "Thing", url: "not-a-url" }]).join(" ")).toContain("نشانی نامعتبر");
    const graph = jsonLdGraph([node, node]);
    expect(graph["@graph"]).toHaveLength(2);
    expect(graph["@context"]).toBe("https://schema.org");
    for (const item of graph["@graph"]) expect(item).not.toHaveProperty("@context");
  });
});

describe("seo-kit HTML audit", () => {
  const good = `<!doctype html><html lang="fa" dir="rtl"><head>
    <title>صفحهٔ نمونه با عنوان مناسب برای بازرسی سئو</title>
    <meta name="description" content="این توضیح متای نمونه به اندازهٔ کافی بلند است تا هشدار طول نگیرد و برای بازرسی مناسب باشد." />
    <link rel="canonical" href="https://example.test/p" />
    <meta name="robots" content="index,follow" />
    <meta property="og:title" content="صفحهٔ نمونه" />
    <meta property="og:image" content="https://example.test/og.png" />
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","url":"https://example.test/p"}</script>
  </head><body><h1>صفحهٔ نمونه</h1></body></html>`;

  it("passes a healthy page", () => {
    const result = auditHtmlDocument({ html: good, path: "/p", baseUrl: "https://example.test", status: 200 });
    expect(result.errors).toEqual([]);
    expect(summarizeAudit([result]).errors).toBe(0);
  });

  it("reports missing canonical, wrong path, multiple H1 and broken JSON-LD", () => {
    const broken = good
      .replace(/<link rel="canonical"[^>]*>/, "")
      .replace("<h1>صفحهٔ نمونه</h1>", "<h1>یک</h1><h1>دو</h1>")
      .replace('"@type":"WebPage"', '"@type":');
    const result = auditHtmlDocument({ html: broken, path: "/other", baseUrl: "https://example.test" });
    expect(result.errors.join(" ")).toContain("canonical");
    expect(result.errors.join(" ")).toContain("H1");
    expect(result.errors.join(" ")).toContain("JSON-LD");
  });

  it("flags duplicate titles across pages", () => {
    const page = (path: string) => auditHtmlDocument({ html: good, path, baseUrl: "https://example.test" });
    const report = summarizeAudit([page("/a"), page("/b")]);
    expect(report.errors).toBeGreaterThan(0);
    expect(report.pages[0].errors.join(" ")).toContain("تکراری");
  });

  it("never carries a canonical on a noindex page without noticing", () => {
    const noindex = good.replace('content="index,follow"', 'content="noindex,follow"');
    const result = auditHtmlDocument({ html: noindex, path: "/p", baseUrl: "https://example.test" });
    expect(result.stats.noindex).toBe(true);
    expect(result.warnings.join(" ")).toContain("noindex");
  });
});
