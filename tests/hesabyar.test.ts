import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { HESABYAR_APK_URL, HESABYAR_VERSION, HesabyarDownload } from "../components/sections/hesabyar-download";

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

  it("is visible on the home page and products page", () => {
    for (const path of ["app/(site)/page.tsx", "app/(site)/products/page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("<HesabyarDownload />");
    }
  });
});
