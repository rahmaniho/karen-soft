/**
 * تنظیمات «نوشتار» — نسل دوم تایپوگرافی کارن سافت
 * -----------------------------------------------
 * این چهار کلید روی عنصر <html> به‌صورت data-* می‌نشینند و
 * همه‌چیز در app/globals.css با متغیرهای CSS مدیریت می‌شود؛
 * پس هیچ کلاسی در کامپوننت‌ها نیاز به تغییر ندارد.
 */

export type ReaderSize = "s" | "m" | "l" | "xl" | "xxl";
export type ReaderWeight = "light" | "normal" | "bold";
export type ReaderLeading = "tight" | "normal" | "loose";
export type ReaderHeadings = "titr" | "sans";

export interface ReaderPrefs {
  size: ReaderSize;
  weight: ReaderWeight;
  leading: ReaderLeading;
  headings: ReaderHeadings;
}

export const READER_DEFAULTS: ReaderPrefs = {
  size: "m",
  weight: "normal",
  leading: "normal",
  headings: "titr",
};

export const READER_STORAGE_KEY = "karen-soft:reader";

export const READER_OPTIONS = {
  size: {
    label: "اندازۀ متن",
    hint: "فقط نوشته بزرگ و کوچک می‌شود؛ چیدمان ثابت می‌ماند.",
    values: [
      { value: "s", label: "ریز" },
      { value: "m", label: "معمولی" },
      { value: "l", label: "بزرگ" },
      { value: "xl", label: "بسیار بزرگ" },
      { value: "xxl", label: "خیلی بزرگ" },
    ],
  },
  weight: {
    label: "وزن نوشتار",
    hint: "ضخامت ایران‌سنس در متن و تیترها.",
    values: [
      { value: "light", label: "سبک" },
      { value: "normal", label: "متوسط" },
      { value: "bold", label: "استوار" },
    ],
  },
  leading: {
    label: "فاصلۀ خطوط",
    hint: "برای متن‌های بلند، فاصله بیشتر خوانایی را بالا می‌برد.",
    values: [
      { value: "tight", label: "فشرده" },
      { value: "normal", label: "متعارف" },
      { value: "loose", label: "باز" },
    ],
  },
  headings: {
    label: "فونت تیترها",
    hint: "تیترها با «تیتر» یا با خودِ ایران‌سنس نوشته شوند.",
    values: [
      { value: "titr", label: "تیتر (Titr)" },
      { value: "sans", label: "ایران‌سنس" },
    ],
  },
} as const;

export function readStoredPrefs(): ReaderPrefs {
  if (typeof window === "undefined") return READER_DEFAULTS;
  try {
    const raw = window.localStorage.getItem(READER_STORAGE_KEY);
    if (!raw) return READER_DEFAULTS;
    return { ...READER_DEFAULTS, ...(JSON.parse(raw) as Partial<ReaderPrefs>) };
  } catch {
    return READER_DEFAULTS;
  }
}

export function applyReaderPrefs(prefs: ReaderPrefs) {
  const el = document.documentElement;
  el.dataset.textSize = prefs.size;
  el.dataset.textWeight = prefs.weight;
  el.dataset.textLeading = prefs.leading;
  el.dataset.headings = prefs.headings;
}

/** اسکریپت داخل <head> تا پیش از نقاشی اول، تنظیمات کاربر اعمال شود (بدون چشمک). */
export const READER_BOOT_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(
  READER_STORAGE_KEY,
)})||'{}');var d=document.documentElement;d.dataset.textSize=s.size||${JSON.stringify(
  READER_DEFAULTS.size,
)};d.dataset.textWeight=s.weight||${JSON.stringify(
  READER_DEFAULTS.weight,
)};d.dataset.textLeading=s.leading||${JSON.stringify(
  READER_DEFAULTS.leading,
)};d.dataset.headings=s.headings||${JSON.stringify(READER_DEFAULTS.headings)};}catch(e){}})();`;
