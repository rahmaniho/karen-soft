// Run against `npm start` or an existing preview: node scripts/check-routes.mjs
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const failures = [];
const linked = new Set();
const canonicalUrls = new Set();

if (!sitemapResponse.ok) failures.push(`sitemap.xml: ${sitemapResponse.status}`);
if (new Set(paths).size !== paths.length) failures.push("sitemap contains duplicate routes");

for (const path of paths) {
  const response = await fetch(base + path);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1]?.trim() ?? "";
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "";
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/i)?.[1] ?? "";
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";

  if (!response.ok) failures.push(`${path}: ${response.status}`);
  if (!title) failures.push(`${path}: missing title`);
  if (!description.trim()) failures.push(`${path}: missing meta description`);
  if (!canonical) failures.push(`${path}: missing canonical URL`);
  if (robots.toLowerCase().includes("noindex")) failures.push(`${path}: noindex route is in sitemap`);
  if (canonical) {
    try {
      const canonicalUrl = new URL(canonical);
      if (canonicalUrl.origin !== "https://karen-soft.ir" || canonicalUrl.pathname !== path) {
        failures.push(`${path}: unexpected canonical ${canonical}`);
      }
      if (canonicalUrls.has(canonical)) failures.push(`${path}: duplicate canonical ${canonical}`);
      canonicalUrls.add(canonical);
    } catch {
      failures.push(`${path}: invalid canonical URL ${canonical}`);
    }
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      failures.push(`${path}: invalid JSON-LD`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
    if (!match[1].startsWith("/_next/")) linked.add(match[1].split("#")[0].replaceAll("&amp;", "&"));
  }
}

for (const path of linked) {
  const response = await fetch(base + path);
  if (!response.ok) failures.push(`linked ${path}: ${response.status}`);
}

for (const path of [
  "/print/order",
  "/print/order/tract",
  "/about/careers",
  "/status",
  "/roadmap",
  "/changelog",
  "/demo/industries/beauty-salon",
]) {
  const html = await (await fetch(base + path)).text();
  const robots = html.match(/<meta name="robots" content="([^"]*)"/i)?.[1] ?? "";
  if (!robots.toLowerCase().includes("noindex")) failures.push(`${path}: should be noindex`);
  if (/<link rel="canonical"/i.test(html)) failures.push(`${path}: noindex page should not declare a canonical`);
}

const llms = await fetch(`${base}/llms.txt`);
if (!llms.ok || !(await llms.text()).includes("## کارن چاپ")) failures.push("/llms.txt is missing the Karen Chap profile");
const robotsTxt = await (await fetch(`${base}/robots.txt`)).text();
if (!robotsTxt.includes("sitemap.xml")) failures.push("robots.txt does not reference the sitemap");

const old = await fetch(`${base}/blog/automation.html`, { redirect: "manual" });
if (old.status !== 308 || !old.headers.get("location")?.endsWith("/blog/office-automation")) {
  failures.push("legacy redirect failed");
}
const missing = await fetch(`${base}/products/not-a-product`);
if (missing.status !== 404) failures.push("unknown product must be 404");
const invalid = await fetch(`${base}/api/contact`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{}",
});
if (invalid.status !== 422) failures.push("invalid contact payload accepted");

console.log(`Checked ${paths.length} sitemap pages, ${canonicalUrls.size} unique canonicals, and ${linked.size} linked routes/assets.`);
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log("SEO metadata, structured data, routes, and legacy checks passed.");
}
