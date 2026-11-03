import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { formatNumber, formatToman, toPersianDigits } from "../lib/utils";
import { formatToman as hesabyarFormatToman } from "../lib/hesabyar";
import { CountUp } from "../components/sections/experience-interactive";

describe("deterministic Persian numbers", () => {
  it("formats integers without relying on browser/Node ICU locale data", () => {
    expect(formatNumber(0)).toBe("۰");
    expect(formatNumber(4)).toBe("۴");
    expect(formatNumber(1404)).toBe("۱٬۴۰۴");
    expect(formatNumber(65000000)).toBe("۶۵٬۰۰۰٬۰۰۰");
    expect(formatNumber(950000)).toBe("۹۵۰٬۰۰۰");
    expect(formatNumber(-1234.5)).toBe("−۱٬۲۳۴٫۵");
  });

  it("supports the counter and carousel options used during hydration", () => {
    expect(formatNumber(4, { useGrouping: false, minimumIntegerDigits: 2 })).toBe("۰۴");
    expect(formatNumber(1404, { useGrouping: false })).toBe("۱۴۰۴");
    expect(formatNumber(12, { minimumIntegerDigits: 2, useGrouping: false })).toBe("۱۲");
  });

  it("keeps the shared Toman formatter identical across product data sources", () => {
    expect(formatToman(70000)).toBe("۷۰٬۰۰۰ تومان");
    expect(hesabyarFormatToman(270000)).toBe(formatToman(270000));
    expect(toPersianDigits("2026")).toBe("۲۰۲۶");
  });

  it("server-renders the animated counter with its final value", () => {
    const html = renderToStaticMarkup(createElement(CountUp, { to: 1404 }));
    expect(html).toContain("۱۴۰۴");
    const padded = renderToStaticMarkup(createElement(CountUp, { to: 4, pad: true }));
    expect(padded).toContain("۰۴");
  });
});
