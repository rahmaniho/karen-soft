import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { HesabyarDownload } from "../components/sections/hesabyar-download";
import {
  HESABYAR_APK_CHANNEL,
  HESABYAR_APK_SHA256,
  HESABYAR_APK_SHA256_URL,
  HESABYAR_APK_SIZE_BYTES,
  HESABYAR_APK_SIZE_MB,
  HESABYAR_APK_URL,
  HESABYAR_PLANS,
  HESABYAR_RELEASE_DATE,
  HESABYAR_RELEASE_TAG,
  HESABYAR_SOURCE_COMMIT,
  HESABYAR_UPGRADE_WARNING,
  HESABYAR_VERSION,
  HESABYAR_VERSION_LATIN,
  HESABYAR_WEB_URL,
} from "../lib/hesabyar";

describe("Hesabyar Android download", () => {
  it("pins the exact requested 1.4.2 pre-release and its published asset metadata", () => {
    expect(HESABYAR_APK_URL).toBe("https://github.com/rahmaniho/KarenYar/releases/download/android-test-v1.4.2-41813070224-1/hesabyar-1.4.2-test.apk");
    expect(HESABYAR_VERSION).toBe("۱٫۴٫۲");
    expect(HESABYAR_VERSION_LATIN).toBe("1.4.2");
    expect(HESABYAR_RELEASE_TAG).toBe("android-test-v1.4.2-41813070224-1");
    expect(HESABYAR_SOURCE_COMMIT).toBe("f724e847b7aa87f7facb8c04be5e27c7473d82a5");
    expect(HESABYAR_RELEASE_DATE).toBe("2026-11-04");
    expect(HESABYAR_APK_SHA256).toBe("0474e5015531dedf4daa1c35a11848d7db1dd43412eef5bc6a275fb011ebd3fc");
    expect(HESABYAR_APK_SHA256_URL).toBe(`${HESABYAR_APK_URL}.sha256`);
    expect(HESABYAR_APK_SIZE_BYTES).toBe(9_146_513);
    expect(HESABYAR_APK_SIZE_MB).toBe("۹٫۱");
    expect(HESABYAR_APK_CHANNEL).toContain("Android Debug");
  });

  it("renders a direct, versioned APK link and a visible backup warning before installation", () => {
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    expect(html).toContain(`href="${HESABYAR_APK_URL}"`);
    expect(html.match(/data-hesabyar-apk/g)).toHaveLength(1);
    expect(html).toContain(`دانلود مستقیم اندروید ${HESABYAR_VERSION}`);
    expect(html).toContain(HESABYAR_UPGRADE_WARNING);
    expect(html).toContain("پیش از نصب بخوانید");
    expect(html).toContain("حذف برنامه داده‌های محلی را پاک می‌کند");
    expect(html).toContain("قالب ۳ در نسخهٔ قدیمیِ دارای قالب ۲ وارد نمی‌شود");
    expect(html).toContain(`href="${HESABYAR_APK_SHA256_URL}"`);
    expect(html).toContain(HESABYAR_APK_SHA256);
    expect(html).toContain("۹٬۱۴۶٬۵۱۳");
    expect(html).not.toContain("hesabyar-1.3.0-test.apk");
    expect(html).toContain('aria-labelledby="hesabyar-title"');
    expect(html).toContain('id="hesabyar-title"');
    for (const text of [
      "صندوق فروش", "فروشگاه و انبار", "دفتر مالی کسب‌وکار", "امور مالی شخصی",
      "حقوق و دستمزد", "محاسبات حرفه‌ای", `تازه در نسخهٔ ${HESABYAR_VERSION}`,
      "دریافت جزئی و برگشت وجه", "چاپ و PDF فارسی", "اندروید ۷", "test/debug",
      "۱۰ تراکنش", "نصب برنامه‌های ناشناس", "پشتیبان JSON",
      "/products/hesabyar#release-notes",
    ]) expect(html).toContain(text);
  });

  it("offers the hosted web version next to the Android download", () => {
    expect(HESABYAR_WEB_URL).toBe("https://hesabyar.karen-soft.ir/");
    const html = renderToStaticMarkup(createElement(HesabyarDownload));
    expect(html).toContain(`href="${HESABYAR_WEB_URL}"`);
    expect(html).toContain("ورود به نسخهٔ وب");
    expect(html).toContain("PWA");
  });

  it("preserves the three lifetime/yearly/half-year licence prices", () => {
    expect(HESABYAR_PLANS.map((plan) => [plan.id, plan.price])).toEqual([
      ["lifetime", 270_000], ["yearly", 130_000], ["half-year", 70_000],
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
