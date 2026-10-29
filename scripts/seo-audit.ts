/**
 * seo-kit CLI — بازرسی سئوی خروجی واقعی سایت
 *
 * استفاده:
 *   node scripts/seo-audit.ts --base http://127.0.0.1:3000
 *   node scripts/seo-audit.ts --base https://karen-soft.ir --json report.json
 *   node scripts/seo-audit.ts --base http://127.0.0.1:3000 --path /products/hesabyar
 *
 * نقشهٔ سایت خوانده می‌شود، هر آدرس دریافت و از منظر عنوان/توضیح/canonical/robots/H1/JSON-LD
 * بررسی می‌شود. خطاها با کد خروج ۱ تمام می‌شوند تا در CI جلوی انتشار نقشهٔ خراب را بگیرند.
 */
import { writeFile } from "node:fs/promises";
import { auditHtmlDocument, summarizeAudit, type PageAuditResult } from "../lib/seo-kit/audit.ts";

interface Options {
  base: string;
  paths: string[];
  json?: string;
  concurrency: number;
  limit?: number;
  verbose: boolean;
}

function parseArgs(argv: string[]): Options {
  const options: Options = { base: process.env.SEO_BASE_URL ?? "http://127.0.0.1:3000", paths: [], concurrency: 6, verbose: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const value = argv[index + 1];
    if (arg === "--base" && value) { options.base = value; index += 1; }
    else if (arg === "--path" && value) { options.paths.push(value); index += 1; }
    else if (arg === "--json" && value) { options.json = value; index += 1; }
    else if (arg === "--concurrency" && value) { options.concurrency = Math.max(1, Number(value) || 1); index += 1; }
    else if (arg === "--limit" && value) { options.limit = Math.max(1, Number(value) || 1); index += 1; }
    else if (arg === "--verbose" || arg === "-v") { options.verbose = true; }
    else if (arg === "--help" || arg === "-h") {
      console.log("استفاده: node scripts/seo-audit.ts --base <url> [--path /x] [--json file] [--concurrency 6] [--limit 20]");
      process.exit(0);
    }
  }
  options.base = options.base.replace(/\/+$/, "");
  return options;
}

async function sitemapPaths(base: string): Promise<string[]> {
  const response = await fetch(`${base}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml: ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
}

async function pool<T, R>(items: T[], size: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await worker(items[index]);
      }
    }),
  );
  return results;
}

async function auditPath(base: string, path: string): Promise<PageAuditResult> {
  try {
    const response = await fetch(`${base}${path}`, { redirect: "manual" });
    const html = response.headers.get("content-type")?.includes("text/html") ? await response.text() : "";
    return auditHtmlDocument({ html, path, baseUrl: base, status: response.status });
  } catch (error) {
    return { path, errors: [`دریافت صفحه ناموفق بود: ${(error as Error).message}`], warnings: [], info: [], stats: { title: "", description: "", canonical: "", h1: [], jsonLdBlocks: 0, noindex: false } };
  }
}

const options = parseArgs(process.argv.slice(2));
const paths = (options.paths.length ? options.paths : await sitemapPaths(options.base)).slice(0, options.limit);
const pages = await pool(paths, options.concurrency, (path) => auditPath(options.base, path));
const report = summarizeAudit(pages);

for (const page of pages) {
  const mark = page.errors.length ? "✗" : page.warnings.length ? "!" : "✓";
  console.log(`${mark} ${page.path}`);
  for (const error of page.errors) console.log(`    خطا: ${error}`);
  for (const warning of page.warnings) console.log(`    هشدار: ${warning}`);
  if (options.verbose) for (const note of page.info) console.log(`    یادداشت: ${note}`);
}

const titles = new Map<string, number>();
for (const page of pages) {
  const description = page.stats.description;
  if (description) titles.set(description, (titles.get(description) ?? 0) + 1);
}
for (const [description, count] of titles) {
  if (count > 1) console.log(`هشدار: توضیح متای تکراری در ${count} صفحه: ${description.slice(0, 80)}…`);
}

console.log(`\n${report.summary}`);
if (options.json) {
  await writeFile(options.json, JSON.stringify(report, null, 2), "utf8");
  console.log(`گزارش JSON: ${options.json}`);
}
process.exit(report.errors > 0 ? 1 : 0);
