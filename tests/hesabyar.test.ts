import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HesabyarDownload } from "../components/sections/hesabyar-download";
import { KARO_PLANS, calculateKaroSubscription } from "../lib/karo";

describe("Karo tariffs", () => {
  it.each([
    ["basic", 1, 12, 360000],
    ["basic", 5, 12, 1080000],
    ["pro", 1, 12, 720000],
    ["pro", 5, 12, 1440000],
    ["pro-plus", 1, 12, 1440000],
    ["pro-plus", 5, 12, 2400000],
  ] as const)(
    "calculates official %s / %s users / %s months",
    (id, users, months, total) => {
      expect(calculateKaroSubscription(id, users, months)).toBe(total);
    },
  );
  it("does not discount annual pricing and supports custom periods", () => {
    for (const plan of KARO_PLANS) {
      expect(plan.yearly).toBe(plan.price * 12);
      expect(calculateKaroSubscription(plan.id, 3, 4)).toBe(
        (plan.price + 2 * plan.extraUserMonthly) * 4,
      );
    }
  });
  it.each([
    [0, 1],
    [1, 0],
    [-1, 12],
    [1.5, 12],
    [1, NaN],
    [Infinity, 12],
    [Number.MAX_SAFE_INTEGER, 12],
  ])("rejects invalid users/months %s %s", (users, months) => {
    expect(() => calculateKaroSubscription("basic", users, months)).toThrow(
      RangeError,
    );
  });
  it("rebrands both shared entry sections without obsolete downloads", () => {
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    for (const text of [
      "کارو",
      "روی سرور",
      "دستگاه‌های مختلف",
      'id="hesabyar-download"',
      "https://karo.karen-soft.ir/",
      "logo.webp",
    ])
      expect(html).toContain(text);
    for (const text of [
      ".apk",
      "۲۷۰٬۰۰۰",
      "۷۰٬۰۰۰",
      "۱۳۰٬۰۰۰",
      "لایسنس",
      "داده‌های محلی",
    ])
      expect(html).not.toContain(text);
  });
});
