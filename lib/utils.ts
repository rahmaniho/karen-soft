import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits inside any string/number to Persian digits. */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/** Format a number with thousands separators then localize digits. */
export function formatNumber(value: number): string {
  return toPersianDigits(new Intl.NumberFormat("en-US").format(value));
}

/** Format an amount in Toman. */
export function formatToman(value: number): string {
  return `${formatNumber(value)} تومان`;
}

export function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Tiny fuzzy match used by demo/industry search fields. */
export function fuzzyMatch(haystack: string, needle: string): boolean {
  const h = haystack.toLowerCase().replace(/\u200c/g, "");
  const n = needle.trim().toLowerCase().replace(/\u200c/g, "");
  if (!n) return true;
  let i = 0;
  for (const char of h) {
    if (char === n[i]) i += 1;
    if (i === n.length) return true;
  }
  return h.includes(n);
}

const JALALI_MONTHS = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];

/** Minimal Gregorian → Jalali conversion (no runtime dependency). */
export function toJalali(date: Date): { year: number; month: number; day: number } {
  const gy = date.getFullYear();
  const gm = date.getMonth() + 1;
  const gd = date.getDate();
  const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let jy = gy <= 1600 ? 0 : 979;
  const gy2 = gy <= 1600 ? gy - 621 : gy - 1600;
  const gm2 = gm > 2 ? gy2 + 1 : gy2;
  let days =
    365 * gy2 +
    Math.floor((gm2 + 3) / 4) -
    Math.floor((gm2 + 99) / 100) +
    Math.floor((gm2 + 399) / 400) -
    80 +
    gd;
  for (let i = 0; i < gm - 1; i += 1) days += gDaysInMonth[i];
  jy += 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { year: jy, month: jm, day: jd };
}

export function formatJalali(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const { year, month, day } = toJalali(d);
  return `${toPersianDigits(day)} ${JALALI_MONTHS[month - 1]} ${toPersianDigits(year)}`;
}

export { JALALI_MONTHS };
