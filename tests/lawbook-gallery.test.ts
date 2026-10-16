import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { LAWBOOK_SLIDES, LawbookGallery } from "../components/site/lawbook-gallery";

describe("Lawbook real screenshot gallery", () => {
  it("provides six distinct local images with captions", () => {
    expect(LAWBOOK_SLIDES).toHaveLength(6);
    expect(new Set(LAWBOOK_SLIDES.map(slide => slide.src)).size).toBe(6);
    for (const slide of LAWBOOK_SLIDES) {
      expect(existsSync(`public${slide.src}`)).toBe(true);
      expect(slide.height).toBeGreaterThan(slide.width);
      expect(slide.caption.length).toBeGreaterThan(20);
    }
  });
  it("labels actual app screenshots and offers manual navigation", () => {
    const html = renderToStaticMarkup(createElement(LawbookGallery));
    for (const text of ["اسکرین‌شات‌های واقعی", "مشاهدهٔ تصویر در اندازهٔ کامل", "اسلاید قبلی", "اسلاید بعدی", 'aria-live="polite"', 'aria-pressed="true"']) expect(html).toContain(text);
    expect(html).not.toContain("هوش مصنوعی");
    expect(html).not.toContain("مفهومی");
    expect(readFileSync("components/site/law-book-product-page.tsx", "utf8")).toContain("<LawbookGallery />");
  });
});
