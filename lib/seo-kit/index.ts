/**
 * seo-kit — لایهٔ سئوی مشترک کارن سافت
 *
 * این ماژول‌ها یک چارچوب کوچک و بدون وابستگی هستند که همهٔ صفحه‌های سایت، نقشهٔ سایت و
 * گزارش JSON-LD را از یک منبع واحد می‌سازند و در پایان با `npm run seo:audit` خروجی
 * واقعی سایت را بازرسی می‌کنند.
 */

export * from "./text.ts";
export * from "./metadata.ts";
export * from "./jsonld.ts";
export * from "./sitemap.ts";
export * from "./audit.ts";
