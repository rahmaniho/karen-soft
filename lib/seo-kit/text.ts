/** قاعده‌های طول متن که در ساخت متادیتا و گزارش سئو مشترک‌اند. */
export const SEO_LIMITS = {
  /** عنوان صفحه به کاراکتر؛ گوگل حدود ۵۸۰ پیکسل (~۶۰ کاراکتر) نشان می‌دهد. */
  titleMin: 25,
  titleMax: 65,
  /** توضیح متا؛ کمتر از ۷۰ کاراکتر جای کافی را هدر می‌دهد و بیشتر از ۱۶۰ بریده می‌شود. */
  descriptionMin: 70,
  descriptionMax: 165,
  /** بیش از یک H1 در هر صفحه مجاز نیست. */
  h1Count: 1,
} as const;

/** ارقام و نیم‌فاصله در فارسی «کاراکتر» حساب می‌شوند اما در پیکسل باریک‌اند؛ حذفشان طول واقعی را بهتر نشان می‌دهد. */
const ZERO_WIDTH = /[\u200b-\u200f\u202a-\u202e\u2060\ufeff]/g;

export function cleanText(value: string): string {
  return value.replace(ZERO_WIDTH, "").replace(/\s+/g, " ").trim();
}

/** طول نمایشی متن (بدون فاصله‌های مجازی و فاصله‌های تکراری). */
export function textLength(value: string): number {
  return [...cleanText(value)].length;
}

export function truncateText(value: string, max: number): string {
  const text = cleanText(value);
  if ([...text].length <= max) return text;
  return `${[...text].slice(0, Math.max(0, max - 1)).join("").trimEnd()}…`;
}

/** نشانی مطلق و بدون اسلش پایانی؛ ورودی `"/"` به دامنهٔ اصلی تبدیل می‌شود. */
export function absoluteUrl(path: string, base: string): string {
  return new URL(path, `${base.replace(/\/+$/, "")}/`).toString();
}

/** مسیر یکسان‌سازی‌شده برای مقایسه: بدون دامنه، بدون اسلش پایانی، شروع با `/`. */
export function normalizePath(value: string): string {
  const path = /^https?:\/\//i.test(value) ? new URL(value).pathname : value.split(/[?#]/)[0];
  const normalized = `/${path}`.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return normalized === "" ? "/" : normalized;
}

/** تاریخ ISO از رشتهٔ تاریخ کوتاه؛ ورودی نامعتبر خطا می‌دهد (به‌جای lastmod غلط). */
export function isoDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`تاریخ نامعتبر: ${String(value)}`);
  return date.toISOString();
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
