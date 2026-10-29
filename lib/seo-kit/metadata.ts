import { absoluteUrl, textLength, truncateText } from "./text.ts";

export interface SeoImage {
  url: string;
  alt?: string;
}

export interface SeoMetaInput {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  /** برند تیتر؛ برای زیربرندها مثل کارن چاپ تغییر می‌کند. */
  brand?: string;
  defaultImage?: string;
  /** اگر عنوان از قبل نام برند را دارد، دوباره تکرار نمی‌شود. */
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

/** شکل متادیتای تولیدی؛ با `Metadata` نکست سازگار و از آن مستقل است. */
export interface SeoMetadata {
  title: { absolute: string };
  description: string;
  alternates?: { canonical: string };
  robots: { index: boolean; follow: boolean };
  openGraph: Record<string, unknown>;
  twitter: { card: string; title: string; description: string; images: string[] };
}

export interface BuildMetadataOptions {
  /** دامنهٔ سایت (بدون اسلش پایانی). */
  baseUrl: string;
  brand: string;
  defaultImage: string;
  /** توضیح‌های بلندتر از حد مجاز به‌جای بریده‌شدن در موتور جست‌وجو، در ساخت متادیتا کوتاه می‌شوند. */
  maxDescription?: number;
  /** سقف طول عنوان مرورگر؛ ابتدا برند حذف و در صورت نیاز عنوان کوتاه می‌شود. */
  maxTitle?: number;
}

/**
 * ساخت متادیتای یک صفحه از یک ورودی ساده.
 * خروجی همیشه canonical مطلق، robots صریح و تصویر اجتماعی دارد تا هیچ صفحه‌ای بدون
 * این سه مورد به موتور جست‌وجو نرسد.
 */
export function buildMetadata(input: SeoMetaInput, options: BuildMetadataOptions): SeoMetadata {
  const brand = input.brand ?? options.brand;
  const path = input.path ?? "/";
  const title = composeTitle(input.title, brand, options.maxTitle);
  const description = options.maxDescription ? truncateText(input.description, options.maxDescription) : input.description;
  const canonical = absoluteUrl(path, options.baseUrl);
  const socialImages: SeoImage[] = (input.images?.length ? input.images : [input.defaultImage ?? options.defaultImage]).map(
    (image) => ({ url: absoluteUrl(image, options.baseUrl), alt: title }),
  );

  const shared = {
    locale: "fa_IR",
    siteName: brand,
    title,
    description,
    url: canonical,
    images: socialImages,
  };

  const openGraph =
    input.openGraphType === "article"
      ? {
          type: "article" as const,
          ...shared,
          ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
          ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
          ...(input.authors?.length ? { authors: input.authors } : {}),
          ...(input.section ? { section: input.section } : {}),
          ...(input.tags?.length ? { tags: input.tags } : {}),
        }
      : { type: "website" as const, ...shared };

  return {
    title: { absolute: title },
    description,
    ...(input.noIndex ? {} : { alternates: { canonical } }),
    robots: input.noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages.flatMap((image) => (image.url ? [image.url] : [])),
    },
  };
}

/**
 * ساخت عنوان نهایی: برند فقط وقتی اضافه می‌شود که از سقف طول عبور نکنیم؛
 * عناوین بلند (مثل تیترهای قدیمی مجله) بدون برند یا با کوتاه‌سازی منتشر می‌شوند.
 */
function composeTitle(base: string, brand: string, maxTitle?: number): string {
  const withBrand = base.includes(brand) ? base : `${base} | ${brand}`;
  if (!maxTitle || textLength(withBrand) <= maxTitle) return withBrand;
  if (textLength(base) <= maxTitle) return base;
  return truncateText(base, maxTitle);
}

/** بازبینی سبک متادیتا پیش از انتشار؛ در گزارش سئو هم استفاده می‌شود. */
export function inspectMetadata(meta: SeoMetadata): string[] {
  const issues: string[] = [];
  const title = meta.title.absolute;
  if (textLength(title) > 70) issues.push(`عنوان بلند است (${textLength(title)} کاراکتر): ${title}`);
  if (!meta.description.trim()) issues.push("توضیح متا خالی است");
  if (meta.robots.index && !meta.alternates?.canonical) issues.push("صفحهٔ indexable بدون canonical است");
  if (meta.robots.index && meta.alternates?.canonical && !meta.alternates.canonical.startsWith("http")) {
    issues.push(`canonical مطلق نیست: ${meta.alternates.canonical}`);
  }
  if (!meta.twitter.images.length) issues.push("تصویر اجتماعی وجود ندارد");
  return issues;
}
