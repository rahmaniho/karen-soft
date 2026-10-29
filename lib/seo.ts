import type { Metadata } from "next";
import { SITE } from "./constants";
import { buildMetadata, inspectMetadata, type SeoMetaInput } from "./seo-kit/index.ts";

export type PageMetaInput = SeoMetaInput;

/**
 * متادیتای استاندارد همهٔ صفحه‌های عمومی.
 * منطق ساخت در `lib/seo-kit` است تا نقشهٔ سایت، داده‌ساخت‌یافته و گزارش سئو نیز از همان قاعده پیروی کنند.
 */
export interface PageMetaOptions {
  /** سقف طول عنوان مرورگر؛ برای تیترهای بلند مجله استفاده می‌شود. */
  maxTitle?: number;
}

export function pageMeta(
  { brand = SITE.name, defaultImage = "/images/logo-karensoft.png", ...input }: PageMetaInput,
  options: PageMetaOptions = {},
): Metadata {
  return buildMetadata(
    { ...input, brand },
    { baseUrl: SITE.url, brand, defaultImage, maxTitle: options.maxTitle },
  ) as Metadata;
}

/** متادیتای کارن چاپ؛ برند مستقل با تصویر پیش‌فرض خودش. */
export function chapPageMeta(input: Omit<PageMetaInput, "brand" | "defaultImage">): Metadata {
  return buildMetadata(
    { ...input, brand: "کارن چاپ" },
    { baseUrl: SITE.url, brand: "کارن چاپ", defaultImage: "/images/print/logo-chap.png" },
  ) as Metadata;
}

/** بازرسی متادیتای یک صفحه برای استفاده در تست‌ها و گزارش سئو. */
export function auditPageMeta(input: PageMetaInput): string[] {
  const brand = input.brand ?? SITE.name;
  const meta = buildMetadata(
    { ...input, brand },
    { baseUrl: SITE.url, brand, defaultImage: "/images/logo-karensoft.png" },
  );
  return inspectMetadata(meta);
}
