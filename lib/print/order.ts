import { toPersianDigits } from "@/lib/utils";
import { COATING_FIELD, CONTACT_FIELDS, DELIVERY_FIELDS, DESIGN_FIELDS, SIDE_FIELD } from "./data/fields";
import type { Field, FieldOption, FieldValue, OrderValues, PrintProduct } from "./types";

/* ════════════════════════════════════════════════
   منطقی فرم پیکربند سفارش کارن چاپ
   (هم‌رفتار با نسخۀ قبلی: پرسش‌های اختصاصی هر محصول + طرح + تحویل + تماس)
   ════════════════════════════════════════════════ */

export function optionsOf(field: Field): FieldOption[] {
  return "options" in field ? field.options : [];
}

/** فیلدهای محصول + بخش طرح (اگر لازم بود) + تحویل + تماس */
export function fieldsFor(product: PrintProduct): Field[] {
  const withCommon = [...product.fields];
  if (!product.noDesign) {
    // فیلدهای مشترکِ کاغذ/روکش در بعضی محصولات تکرار شده‌اند؛ اگر نبودند اضافه می‌شوند
    if (!withCommon.some((f) => f.key === "coating")) withCommon.push(COATING_FIELD);
    if (!withCommon.some((f) => f.key === "sides")) withCommon.push(SIDE_FIELD);
    withCommon.push(...DESIGN_FIELDS);
  }
  withCommon.push(...DELIVERY_FIELDS, ...CONTACT_FIELDS);
  return withCommon;
}

function firstDefault(field: Field): FieldValue | undefined {
  const opts = optionsOf(field);
  if (field.type === "chips" || field.type === "select") {
    const byId = field.default ? opts.find((o) => o.id === field.default) : undefined;
    return (byId ?? opts.find((o) => o.default) ?? opts[0])?.id;
  }
  if (field.type === "toggle") return false;
  if (field.type === "multi") return [];
  if (field.type === "num") return field.default ?? field.min ?? 1;
  if (field.type === "qty") return field.presets?.find((n) => n >= (field.min ?? 1)) ?? field.min ?? 100;
  if (field.type === "counts") return Object.fromEntries(opts.map((o) => [o.id, 0]));
  if (field.type === "dims") return { w: "", h: "", unit: field.unit ?? "سانتی‌متر" };
  return undefined;
}

export function defaultValues(product: PrintProduct): OrderValues {
  const values: OrderValues = {};
  for (const field of fieldsFor(product)) {
    const def = firstDefault(field);
    if (def !== undefined) values[field.key] = def;
  }
  return values;
}

/** آیا این فیلد با مقدارهای فعلی باید دیده شود؟ */
export function isVisible(field: Field, values: OrderValues): boolean {
  const cond = field.show;
  if (!cond) return true;
  const current = values[cond.field];
  if (cond.in?.length) {
    if (Array.isArray(current)) return current.some((v) => cond.in!.includes(v));
    return current != null && cond.in.includes(String(current));
  }
  if (cond.any?.length) {
    if (Array.isArray(current)) return current.some((v) => cond.any!.includes(v));
    return current != null && cond.any.includes(String(current));
  }
  return true;
}

export function isFilled(field: Field, value: FieldValue | undefined): boolean {
  if (value == null || value === "") return false;
  if (field.type === "toggle") return true;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") {
    const rec = value as Record<string, unknown>;
    if ("w" in rec) return Boolean(String(rec.w ?? "").trim() && String(rec.h ?? "").trim());
    return Object.values(rec).some((v) => Number(v) > 0);
  }
  return true;
}

function optionLabel(field: Field, id: string): string {
  return optionsOf(field).find((o) => o.id === id)?.label ?? id;
}

/** تبدیل مقدار به متن خوانا برای پیام سفارش */
export function formatValue(field: Field, value: FieldValue | undefined): string {
  if (value == null) return "—";
  switch (field.type) {
    case "chips":
    case "select":
      return optionLabel(field, String(value));
    case "multi": {
      const arr = Array.isArray(value) ? value : [];
      return arr.length ? arr.map((v) => optionLabel(field, v)).join("، ") : "—";
    }
    case "toggle":
      return value ? "بله" : "خیر";
    case "qty":
    case "num":
      return `${toPersianDigits(String(value))}${field.unit ? ` ${field.unit}` : ""}`;
    case "counts": {
      const rec = (value ?? {}) as Record<string, number>;
      const parts = optionsOf(field)
        .map((o) => ({ id: o.id, label: o.label, n: Number(rec[o.id] ?? 0) }))
        .filter((x) => x.n > 0);
      if (!parts.length) return "—";
      const total = parts.reduce((sum, x) => sum + x.n, 0);
      return `${parts.map((p) => `${p.label}: ${toPersianDigits(p.n)}`).join("، ")} — مجموع ${toPersianDigits(total)}`;
    }
    case "dims": {
      const d = (value ?? {}) as { w?: string; h?: string };
      return `${toPersianDigits(d.w ?? "?")}×${toPersianDigits(d.h ?? "?")}${field.unit ? ` ${field.unit}` : ""}`;
    }
    default:
      return String(value);
  }
}

export type OrderErrors = Record<string, string>;

const PHONE_OK = /^(?:0098|98|0)?9\d{9}$|^0\d{10}$/;

function toLatinDigits(v: string) {
  return v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function validate(product: PrintProduct, values: OrderValues): OrderErrors {
  const errors: OrderErrors = {};
  for (const field of fieldsFor(product)) {
    if (!isVisible(field, values)) continue;
    const value = values[field.key];
    if (field.required && !isFilled(field, value)) {
      errors[field.key] = "این مورد الزامی است.";
      continue;
    }
    if (field.key === "phone" && typeof value === "string" && value.trim()) {
      const digits = toLatinDigits(value).replace(/\D/g, "");
      if (!PHONE_OK.test(digits)) errors.phone = "شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹).";
    }
    if (field.key === "name" && typeof value === "string" && value.trim() && value.trim().length < 3) {
      errors.name = "نام را کامل وارد کنید.";
    }
    if (field.type === "num" && typeof value === "number" && field.min != null && value < field.min) {
      errors[field.key] = `حداقل ${toPersianDigits(field.min)}${field.unit ? ` ${field.unit}` : ""}`;
    }
  }
  return errors;
}

export function trackingCode(): string {
  return `KC-${toPersianDigits(String(Date.now()).slice(-6))}`;
}

export interface OrderGroup {
  title: string;
  fields: Field[];
}

export function orderGroups(product: PrintProduct): OrderGroup[] {
  const groups: OrderGroup[] = [{ title: `مشخصات ${product.name}`, fields: product.fields }];
  if (!product.noDesign) groups.push({ title: "طرح و فایل", fields: DESIGN_FIELDS });
  groups.push({ title: "تحویل", fields: DELIVERY_FIELDS });
  groups.push({ title: "اطلاعات تماس", fields: CONTACT_FIELDS });
  return groups;
}

/** متن نهایی سفارش؛ همان قالبی که در نسخۀ قدیمی به واتساپ/پیامک می‌رفت */
export function buildOrderText(product: PrintProduct, serviceName: string, values: OrderValues, code: string): string {
  const lines = [
    "سلام، سفارش جدید از سایت کارن چاپ",
    `کد پیگیری: ${code}`,
    `محصول: ${product.emoji} ${product.name}${serviceName ? ` (${serviceName})` : ""}`,
  ];
  for (const group of orderGroups(product)) {
    const rows = group.fields
      .filter((field) => isVisible(field, values) && isFilled(field, values[field.key]))
      .map((field) => `${field.label}: ${formatValue(field, values[field.key])}`);
    if (!rows.length) continue;
    lines.push(`— ${group.title} —`, ...rows);
  }
  const speed = values["speed"];
  const eta = speed === "rush" && product.rushTurnaround ? product.rushTurnaround : product.turnaround;
  lines.push(`زمان تحویل تخمینی: ${eta}`);
  return lines.join("\n");
}

export function whatsappHref(text: string, number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function smsHref(text: string, tel: string) {
  return `sms:${tel}?body=${encodeURIComponent(text)}`;
}

/** خلاصۀ زنده برای ستون کنار فرم */
export function summaryRows(product: PrintProduct, values: OrderValues) {
  return fieldsFor(product)
    .filter((field) => isVisible(field, values) && isFilled(field, values[field.key]) && field.type !== "text")
    .slice(0, 14)
    .map((field) => ({ label: field.label, value: formatValue(field, values[field.key]) }));
}

export function filledCount(product: PrintProduct, values: OrderValues) {
  const all = fieldsFor(product).filter((field) => isVisible(field, values));
  const required = all.filter((field) => field.required);
  const done = required.filter((field) => isFilled(field, values[field.key])).length;
  return { done, total: required.length || all.length };
}
