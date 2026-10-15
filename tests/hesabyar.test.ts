import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { HESABYAR_APK_URL, HesabyarDownload } from "../components/sections/hesabyar-download";

describe("Hesabyar Android download", () => {
  it("links directly to the requested release APK", () => {
    expect(HESABYAR_APK_URL).toBe("https://github.com/rahmaniho/KarenYar/releases/download/v1.2.5/app-debug.apk");
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    expect(html).toContain(`href="${HESABYAR_APK_URL}"`);
    expect(html).toContain('aria-labelledby="hesabyar-title"');
    expect(html).toContain('id="hesabyar-title"');
    for (const text of ["فروشگاه و انبار", "امور مالی شخصی", "حقوق و دستمزد", "محاسبات حرفه‌ای", "اندروید ۷", "debug", "۱۰ تراکنش", "نصب برنامه‌های ناشناس"]) {
      expect(html).toContain(text);
    }
  });

  it("is visible on the home page and products page", () => {
    for (const path of ["app/(site)/page.tsx", "app/(site)/products/page.tsx"]) {
      expect(readFileSync(path, "utf8")).toContain("<HesabyarDownload />");
    }
  });
});
