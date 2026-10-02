/**
 * مدل داده‌های کارن چاپ (زیرمجموعۀ چاپ کارن سافت)
 * ------------------------------------------------
 * ساختار فیلدها طوری طراحی شده که «پیکربند سفارش» بتواند بدون کد سفارشی،
 * برای هر محصول فرم مخصوص همان محصول را بسازد.
 */

export interface FieldOption {
  id: string;
  label: string;
  /** توضیح کوتاه زیر برچسب گزینه */
  hint?: string;
  /** گزینهٔ پیش‌فرض */
  default?: boolean;
}

/** شرط نمایش فیلد: وقتی مقدار فیلد دیگر داخل این فهرست باشد. */
export interface FieldShow {
  field: string;
  in?: string[];
  any?: string[];
}

interface FieldBase {
  key: string;
  label: string;
  required?: boolean;
  hint?: string;
  show?: FieldShow;
}

export type Field =
  | (FieldBase & { type: "chips"; options: FieldOption[]; default?: string })
  | (FieldBase & { type: "select"; options: FieldOption[]; default?: string })
  | (FieldBase & { type: "multi"; options: FieldOption[] })
  | (FieldBase & { type: "qty"; unit?: string; presets?: number[]; min?: number; default?: number })
  | (FieldBase & { type: "num"; unit?: string; min?: number; step?: number; default?: number })
  | (FieldBase & { type: "toggle" })
  | (FieldBase & { type: "dims"; unit?: string })
  | (FieldBase & { type: "counts"; unit?: string; options: FieldOption[] })
  | (FieldBase & {
      type: "text" | "tel" | "textarea";
      placeholder?: string;
      autofill?: "name" | "tel";
    });

export interface PrintService {
  slug: string;
  title: string;
  short: string;
  icon: string;
  image: string;
  description: string;
  bullets: string[];
  productSlugs: string[];
  /** برچسب دسته‌بندی نمونه‌کارهای مرتبط در گالری */
  workCats: string[];
  faqs: { q: string; a: string }[];
}

export interface PrintProduct {
  slug: string;
  service: string;
  name: string;
  emoji: string;
  tag: string;
  description: string;
  image?: string;
  turnaround: string;
  rushTurnaround?: string | null;
  keywords?: string;
  tips: string[];
  /** محصولات بدون نیاز به طرح گرافیکی (مثل مهر) بخش «طرح و فایل» را نمی‌گیرند */
  noDesign?: boolean;
  fields: Field[];
}

export interface PrintWork {
  image: string;
  title: string;
  categoryLabel: string;
  caption: string;
  description: string;
  category: string;
}

/** مقدارهای ممکن فیلدها در فرم سفارش */
export type FieldValue =
  string | number | boolean | string[] | { w?: string; h?: string; unit?: string } | Record<string, number>;

export type OrderValues = Record<string, FieldValue | undefined>;
