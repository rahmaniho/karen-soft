import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { CLASS1_SLIDES, Class1Gallery } from "../components/site/class1-gallery";

describe("Class1 real screenshot introduction", () => {
  it("provides five distinct portrait screenshots from the supplied app images", () => {
    expect(CLASS1_SLIDES).toHaveLength(5);
    expect(new Set(CLASS1_SLIDES.map(slide => slide.src)).size).toBe(5);
    for (const slide of CLASS1_SLIDES) {
      expect(existsSync(`public${slide.src}`)).toBe(true);
      expect(slide.height).toBeGreaterThan(slide.width);
      expect(slide.caption.length).toBeGreaterThan(20);
    }
  });
  it("offers labelled navigation and full-size viewing", () => {
    const html = renderToStaticMarkup(createElement(Class1Gallery));
    for (const text of ["اسکرین‌شات‌های واقعی", "تصویر قبلی مدرسه‌ی من", "تصویر بعدی مدرسه‌ی من", "مشاهدهٔ تصویر در اندازهٔ کامل", 'aria-live="polite"', 'aria-pressed="true"', 'rel="noopener noreferrer"']) expect(html).toContain(text);
    expect(html).not.toContain("مفهومی");
    const source = readFileSync("components/sections/class1-community.tsx", "utf8");
    expect(source).toContain("<Class1Gallery />");
    expect(source).not.toContain("/images/blog/class1-learning.jpg");
  });
});
