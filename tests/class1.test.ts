import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { CLASS1_APK_URL, CLASS1_URL, Class1Community } from "../components/sections/class1-community";

describe("Class1 community initiative", () => {
  it("introduces the social service and links to the requested site safely", () => {
    const html = renderToStaticMarkup(createElement(Class1Community));
    expect(CLASS1_URL).toBe("http://class1.karen-soft.ir/");
    expect(html).toContain(`href="${CLASS1_URL}"`);
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('aria-labelledby="class1-title"');
    expect(html).toContain('id="class1-title"');
    for (const text of ["خدمت اجتماعی", "تقدیم به کودکان کلاس اول", "والدین", "۳۹", "بیش از ۱۰۰", "ریاضی", "فارسی", "علوم", "روی همان دستگاه"]) expect(html).toContain(text);
  });
  it("provides the direct Android v1.0.1 APK download", () => {
    expect(CLASS1_APK_URL).toBe("https://github.com/rahmaniho/Class1/releases/download/v1.0.1/madrese-man-android.apk");
    const html = renderToStaticMarkup(createElement(Class1Community));
    expect(html).toContain(`href="${CLASS1_APK_URL}"`);
    expect(html).toContain("دانلود مستقیم نسخهٔ اندروید");
    expect(html).toContain("۱٫۰٫۱");
    expect(html).toContain("فایل APK");
  });
  it("appears on the homepage and services page", () => {
    for (const path of ["app/(site)/page.tsx", "app/(site)/services/page.tsx"]) expect(readFileSync(path, "utf8")).toContain("<Class1Community />");
  });
});
