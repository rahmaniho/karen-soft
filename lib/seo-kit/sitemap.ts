import { absoluteUrl, isoDate, normalizePath } from "./text.ts";

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapRouteInput {
  path: string;
  priority?: number;
  changeFrequency?: ChangeFrequency;
  /** فقط تاریخ تحریریهٔ واقعی؛ زمان build سیگنال نادرست است. */
  lastModified?: string | Date;
}

export interface SitemapEntry {
  url: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
}

export interface DefineSitemapOptions {
  baseUrl: string;
  routes: SitemapRouteInput[];
  /** مسیرهایی که عمداً از نقشه بیرون می‌مانند؛ اگر اشتباهی وارد شوند خطا می‌دهند. */
  excluded?: string[];
}

export class SeoConfigError extends Error {
  readonly issues: string[];
  constructor(issues: string[]) {
    super(`تنظیمات سئو نامعتبر است:\n- ${issues.join("\n- ")}`);
    this.name = "SeoConfigError";
    this.issues = issues;
  }
}

/**
 * ساخت و اعتبارسنجی نقشهٔ سایت.
 * هر خطای پیکربندی (مسیر تکراری، priority خارج از بازه، noindex داخل نقشه، تاریخ نامعتبر)
 * در زمان build شکست می‌خورد تا نقشهٔ خراب منتشر نشود.
 */
export function defineSitemap({ baseUrl, routes, excluded = [] }: DefineSitemapOptions): SitemapEntry[] {
  const issues: string[] = [];
  const seen = new Map<string, string>();
  const excludedPaths = new Set(excluded.map(normalizePath));

  const entries = routes.map((route) => {
    const path = normalizePath(route.path);
    if (!route.path.startsWith("/")) issues.push(`مسیر باید با / شروع شود: ${route.path}`);
    if (excludedPaths.has(path)) issues.push(`مسیر noindex در نقشه آمده است: ${path}`);
    if (seen.has(path)) issues.push(`مسیر تکراری در نقشه: ${path} (قبلاً با ${seen.get(path)} آمده بود)`);
    seen.set(path, route.path);

    const priority = route.priority ?? 0.5;
    if (priority < 0 || priority > 1) issues.push(`priority خارج از بازهٔ ۰ تا ۱: ${path} → ${priority}`);

    let lastModified: Date | undefined;
    if (route.lastModified !== undefined) {
      try {
        lastModified = new Date(isoDate(route.lastModified));
      } catch {
        issues.push(`تاریخ lastmod نامعتبر: ${path} → ${String(route.lastModified)}`);
      }
    }

    return {
      url: absoluteUrl(path, baseUrl),
      priority,
      changeFrequency: route.changeFrequency ?? "monthly",
      ...(lastModified ? { lastModified } : {}),
    } satisfies SitemapEntry;
  });

  if (issues.length) throw new SeoConfigError(issues);
  return entries;
}

/** گزارش نرم برای نقشه: مواردی که خطا نیستند اما بهتر است بررسی شوند. */
export function inspectSitemap(entries: SitemapEntry[], options: { minEntries?: number } = {}): string[] {
  const notes: string[] = [];
  const urls = entries.map((entry) => entry.url);
  if (new Set(urls).size !== urls.length) notes.push("نشانی تکراری در نقشه وجود دارد");
  if (entries.length < (options.minEntries ?? 1)) notes.push("نقشه تعداد کمی مسیر دارد");
  const withoutLastmod = entries.filter((entry) => !entry.lastModified).length;
  if (withoutLastmod) notes.push(`${withoutLastmod} مسیر lastmod ندارد (اگر تاریخ تحریریه ندارند اشکالی نیست)`);
  const odd = entries.filter((entry) => !entry.url.startsWith("http"));
  if (odd.length) notes.push("نشانی غیرمطلق: " + odd.map((entry) => entry.url).join(", "));
  return notes;
}
