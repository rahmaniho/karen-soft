import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { HESABYAR_APK_URL, HESABYAR_PLANS, HESABYAR_VERSION, HESABYAR_WEB_URL, HesabyarDownload } from "../components/sections/hesabyar-download";

describe("Hesabyar Android download", () => {
  it("links directly to the requested release APK", () => {
    expect(HESABYAR_APK_URL).toBe("https://github.com/rahmaniho/KarenYar/releases/download/android-test-v1.3.0-40718514579-1/hesabyar-1.3.0-test.apk");
    expect(HESABYAR_VERSION).toBe("۱٫۳٫۰");
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    expect(html).toContain(`href="${HESABYAR_APK_URL}"`);
    expect(html).toContain('aria-labelledby="hesabyar-title"');
    expect(html).toContain('id="hesabyar-title"');
    expect(html).toContain("۱٫۳٫۰");
    for (const text of [
      "صندوق فروش",
      "فروشگاه و انبار",
      "دفتر مالی کسب‌وکار",
      "امور مالی شخصی",
      "حقوق و دستمزد",
      "محاسبات حرفه‌ای",
      "تازه در نسخهٔ ۱٫۳",
      "ثبت خودکار درآمد",
      "اندروید ۷",
      "test/debug",
      "۱۰ تراکنش",
      "نصب برنامه‌های ناشناس",
      "پشتیبان JSON",
    ]) {
      expect(html).toContain(text);
    }
  });

  it("offers the hosted web version next to the Android download", () => {
    expect(HESABYAR_WEB_URL).toBe("https://hesabyar.karen-soft.ir/");
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    expect(html).toContain(`href="${HESABYAR_WEB_URL}"`);
    expect(html).toContain("ورود به نسخهٔ وب");
    expect(html).toContain("PWA");
  });

  it("lists the three lifetime/yearly/half-year licence prices", () => {
    expect(HESABYAR_PLANS.map((plan) => [plan.id, plan.price])).toEqual([
      ["lifetime", 270_000],
      ["yearly", 130_000],
      ["half-year", 70_000],
    ]);
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    for (const text of ["مادام‌العمر", "یک‌ساله", "شش‌ماهه", "۲۷۰٬۰۰۰", "۱۳۰٬۰۰۰", "۷۰٬۰۰۰", "تومان", "پیشنهاد ما"]) {
      expect(html).toContain(text);
    }
  });

  it("is visible on the home page and products page", () => {
    for (const path of ["app/(site)/page.tsx", "app/(site)/products/page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("<HesabyarDownload />");
    }
  });
});
