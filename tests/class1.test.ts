import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { CLASS1_URL, Class1Community } from "../components/sections/class1-community";

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
  it("appears on the homepage and services page", () => {
    for (const path of ["app/(site)/page.tsx", "app/(site)/services/page.tsx"]) expect(readFileSync(path, "utf8")).toContain("<Class1Community />");
  });
});
