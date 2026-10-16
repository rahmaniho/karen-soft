import { describe, expect, it } from "vitest";
import { APP_STATS, LAWS, LAW_HIERARCHY } from "../lib/demos/law-book.data";
import { getPost } from "../lib/blog";
import { getProduct } from "../lib/products";
import { articleSchema } from "../lib/schema";
import sitemap from "../app/sitemap";

describe("updated Lawbook catalogue and editorial information", () => {
  it("matches the upstream version manifest and includes new document families", () => {
    expect(APP_STATS).toMatchObject({ documents: 73, articles: 11132, exams: 100, examCategories: 9 });
    expect(LAWS).toHaveLength(APP_STATS.documents);
    expect(new Set(LAWS.map(law => law.id)).size).toBe(73);
    expect(LAWS.reduce((sum, law) => sum + law.articleCount, 0)).toBe(APP_STATS.articles);
    expect(LAWS.filter(law => law.hierarchy === "precedent").reduce((sum, law) => sum + law.articleCount, 0)).toBe(1921);
    expect(LAWS.find(law => law.id === "advisory-opinions")?.articleCount).toBe(305);
    for (const id of ["official-experts-tariff", "development-plan-7-law", "clean-air-law"]) expect(LAWS.some(law => law.id === id)).toBe(true);
    expect(LAW_HIERARCHY.some(level => level.id === "advisory")).toBe(true);
  });
  it("updates product and blog without treating optional court cases as automatically downloaded", () => {
    const product = getProduct("law-book")!;
    const post = getPost("law-book-launch")!;
    for (const content of [JSON.stringify(product), JSON.stringify(post)]) {
      expect(content).toContain("۷۳ سند");
      expect(content).toContain("۱۱٬۱۳۲");
      expect(content).toContain("۱۰۰ آزمون");
      expect(content).toContain("اختیاری");
      expect(content).not.toContain("۴۶ سند");
      expect(content).not.toContain("۷٬۲۷۸");
    }
    expect(JSON.stringify(post)).toContain("qavanin.ir");
    expect(post.modifiedDate).toBe("2026-10-16");
    expect(articleSchema(post)).toMatchObject({ datePublished: "2026-10-08", dateModified: "2026-10-16" });
    expect(sitemap().find(entry => entry.url.endsWith("/blog/law-book-launch"))?.lastModified).toEqual(new Date("2026-10-16T00:00:00.000Z"));
  });
});
