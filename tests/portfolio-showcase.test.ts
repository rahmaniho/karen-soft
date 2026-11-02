import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { CASE_STUDIES } from "../lib/portfolio";
import { PortfolioMarquee } from "../components/sections/portfolio-marquee";

describe("home portfolio showcase", () => {
  const home = readFileSync("app/(site)/page.tsx", "utf8");
  const cases = CASE_STUDIES.slice(0, 8);
  const html = renderToStaticMarkup(createElement(PortfolioMarquee, { cases }));

  it("replaces the static product grid, without removing product downloads or spotlights", () => {
    expect(home).not.toContain("ابزارهایی که کار می‌کنند.");
    expect(home).not.toContain("ks-product-grid");
    expect(home).toContain("<PortfolioMarquee cases={showcase} />");
    expect(home).toContain("<HesabyarDownload />");
    expect(home).toContain("<LawBookSpotlight />");
    expect(home).toContain('href="/products"');
    expect(home).toContain('href="/portfolio"');
  });

  it("renders real project links and images without JavaScript", () => {
    for (const item of cases) {
      expect(html).toContain(`href="/portfolio/${item.slug}"`);
      expect(html).toContain(item.title);
      expect(html).toContain(encodeURIComponent(item.cover));
    }
    expect(html).toContain("پروژهٔ مشتری");
    expect(html).toContain("نمونهٔ نمایشی");
    expect(html).toContain('tabindex="0"');
  });

  it("keeps looping copies out of the accessibility tree and keyboard order", () => {
    expect(html.match(/aria-hidden="true"><li/g)).toHaveLength(2);
    expect(html.match(/tabindex="-1"/g)).toHaveLength(cases.length * 2);
    expect(html).toContain("توقف حرکت خودکار نمونه‌کارها");
    expect(html).toContain("نمونه‌کار قبلی");
    expect(html).toContain("نمونه‌کار بعدی");
  });

  it("renders nothing for an empty selection", () => {
    expect(renderToStaticMarkup(createElement(PortfolioMarquee, { cases: [] }))).toBe("");
  });
});
