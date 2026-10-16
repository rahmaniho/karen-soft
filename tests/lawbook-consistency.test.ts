import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { LAWBOOK_INFO } from "../lib/lawbook-info";
import { getProduct } from "../lib/products";
import { getPost } from "../lib/blog";
import { LEGAL_CREDIT } from "../lib/demos/law-book.data";
import { GET } from "../app/llms.txt/route";

describe("Lawbook current README consistency across the site", () => {
  it("uses current developer credit without retaining removed editorial attribution", () => {
    expect(LEGAL_CREDIT).toBe("توسعه نرم‌افزار: کارن سافت");
    for (const text of [JSON.stringify(getProduct("law-book")), JSON.stringify(getPost("law-book-launch")), readFileSync("components/site/law-book-product-page.tsx", "utf8")]) {
      expect(text).not.toContain("آبکه");
      expect(text).not.toContain("۴۶ سند");
      expect(text).not.toContain("۷٬۲۷۸");
    }
  });
  it("describes exams conservatively and retains optional-download and legal-source guidance", async () => {
    expect(LAWBOOK_INFO.examSubjects).toHaveLength(9);
    expect(LAWBOOK_INFO.exams).toContain("بیش از ۲۰۰۰");
    expect(LAWBOOK_INFO.exams).toContain("۳۰ دقیقه");
    expect(LAWBOOK_INFO.optionalCases).toContain("در همگام‌سازی عادی دانلود نمی‌شود");
    const text = await GET().text();
    for (const fact of [LAWBOOK_INFO.summary, LAWBOOK_INFO.credit, LAWBOOK_INFO.optionalCases, LAWBOOK_INFO.sources]) expect(text).toContain(fact);
  });
  it("keeps the overview and changelog current and preserves the real screenshot gallery", () => {
    const source = readFileSync("components/site/law-book-product-page.tsx", "utf8");
    expect(source).toContain('id="lawbook-exams"');
    expect(source).toContain("LAWBOOK_INFO.examSubjects.map");
    expect(source).toContain("<LawbookGallery />");
    const changes = readFileSync("app/(site)/changelog/page.tsx", "utf8");
    expect(changes).toContain("۷۳ سند و ۱۱٬۱۳۲ ماده");
    expect(changes).toContain("۱۰۰ آزمون اختبار");
    expect(changes).not.toContain("۴۶ سند");
  });
});
