import { SEO_LIMITS, cleanText, normalizePath, textLength } from "./text.ts";

export interface PageAuditInput {
  html: string;
  /** مسیر مورد انتظار همان صفحه (مثلاً `/products/hesabyar`). */
  path: string;
  /** دامنهٔ سایت برای مقایسهٔ canonical. */
  baseUrl: string;
  status?: number;
}

export interface PageAuditResult {
  path: string;
  errors: string[];
  warnings: string[];
  /** یادداشت‌های طبیعیِ محیط بازرسی (مثلاً canonical به دامنهٔ اصلی در اجرای محلی). */
  info: string[];
  stats: {
    title: string;
    description: string;
    canonical: string;
    h1: string[];
    jsonLdBlocks: number;
    noindex: boolean;
  };
}

export interface SiteAuditResult {
  pages: PageAuditResult[];
  errors: number;
  warnings: number;
  summary: string;
}

function firstMatch(html: string, pattern: RegExp): string {
  return html.match(pattern)?.[1] ?? "";
}

/** خروجی واقعی یک صفحه را از منظر سئو بازرسی می‌کند (بدون نیاز به مرورگر). */
export function auditHtmlDocument({ html, path, baseUrl, status }: PageAuditInput): PageAuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];
  const expected = normalizePath(path);

  if (status !== undefined && status !== 200) errors.push(`کد پاسخ ${status}`);

  const title = cleanText(firstMatch(html, /<title>([\s\S]*?)<\/title>/i));
  const description = cleanText(firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i));
  const canonical = firstMatch(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robots = firstMatch(html, /<meta\s+name="robots"\s+content="([^"]*)"/i).toLowerCase();
  const noindex = robots.includes("noindex");
  const ogTitle = cleanText(firstMatch(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i));
  const ogImage = firstMatch(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => cleanText(match[1].replace(/<[^>]+>/g, "")));
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];

  if (!title) errors.push("عنوان صفحه خالی است");
  else if (textLength(title) > SEO_LIMITS.titleMax) warnings.push(`عنوان ${textLength(title)} کاراکتر است (پیشنهاد: تا ${SEO_LIMITS.titleMax})`);
  else if (textLength(title) < SEO_LIMITS.titleMin) warnings.push(`عنوان کوتاه است (${textLength(title)} کاراکتر)`);

  if (!description) errors.push("توضیح متا ندارد");
  else if (textLength(description) > SEO_LIMITS.descriptionMax) warnings.push(`توضیح متا ${textLength(description)} کاراکتر است`);
  else if (textLength(description) < SEO_LIMITS.descriptionMin) warnings.push(`توضیح متا کوتاه است (${textLength(description)} کاراکتر)`);

  if (!noindex) {
    if (!canonical) errors.push("canonical ندارد");
    else {
      try {
        const url = new URL(canonical);
        const baseHost = new URL(baseUrl).hostname;
        // در بازرسی محلی (localhost/preview) طبیعی است که canonical به دامنهٔ اصلی اشاره کند.
        const localBase = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(baseHost) || baseHost.endsWith(".e2b.app");
        if (url.origin !== new URL(baseUrl).origin) {
          if (localBase) info.push(`canonical به دامنهٔ اصلی اشاره می‌کند: ${canonical}`);
          else errors.push(`canonical روی دامنهٔ دیگر است: ${canonical}`);
        }
        if (normalizePath(url.pathname) !== expected) errors.push(`canonical با مسیر صفحه یکی نیست: ${canonical}`);
      } catch {
        errors.push(`canonical نامعتبر: ${canonical}`);
      }
    }
    if (!ogTitle) warnings.push("og:title ندارد");
    if (!ogImage) warnings.push("og:image ندارد");
  } else if (canonical) {
    warnings.push("صفحهٔ noindex شده canonical دارد");
  }

  if (h1.length === 0) errors.push("H1 ندارد");
  else if (h1.length > SEO_LIMITS.h1Count) errors.push(`${h1.length} تگ H1 دارد`);

  if (jsonLdBlocks.length === 0) warnings.push("داده‌ساخت‌یافته (JSON-LD) ندارد");

  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]) as unknown;
      const nodes = Array.isArray(parsed)
        ? parsed
        : typeof parsed === "object" && parsed && "@graph" in parsed
          ? (parsed as { "@graph": unknown[] })["@graph"]
          : [parsed];
      for (const node of nodes) {
        const type = (node as Record<string, unknown> | null)?.["@type"];
        if (!type) errors.push("JSON-LD بدون @type");
      }
    } catch {
      errors.push("JSON-LD نامعتبر (JSON خراب)");
    }
  }

  return { path: expected, errors, warnings, info, stats: { title, description, canonical, h1, jsonLdBlocks: jsonLdBlocks.length, noindex } };
}

/** تجمیع نتیجهٔ چند صفحه و ساخت خلاصهٔ خوانا برای ترمینال و CI. */
export function summarizeAudit(pages: PageAuditResult[]): SiteAuditResult {
  const errors = pages.reduce((total, page) => total + page.errors.length, 0);
  const warnings = pages.reduce((total, page) => total + page.warnings.length, 0);
  const titles = new Map<string, string[]>();
  for (const page of pages) {
    if (!page.stats.title) continue;
    titles.set(page.stats.title, [...(titles.get(page.stats.title) ?? []), page.path]);
  }
  for (const [title, paths] of titles) {
    if (paths.length > 1) {
      for (const path of paths) pages.find((page) => page.path === path)?.errors.push(`عنوان تکراری با ${paths.filter((item) => item !== path).join("، ")}: ${title}`);
    }
  }
  return {
    pages,
    errors,
    warnings,
    summary: `${pages.length} صفحه بررسی شد · ${errors} خطا · ${warnings} هشدار`,
  };
}
