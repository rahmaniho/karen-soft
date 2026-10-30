#!/usr/bin/env node
/**
 * ساخت نسخه‌های نمایشی خودمیزبان در public/demos/<slug>/
 *
 * ورودی: کلون محلی هر مخزن در DEMO_SRC_DIR (پیش‌فرض ‎/tmp/repos‎):
 *   Demo3  afshin  RedLine  Demo  Demo1  Gym  Karenwood  musician  Digikaren
 *
 * خروجی هر پروژه فقط فایل ایستا است و با مسیر نسبی یا پایهٔ ‎/demos/<slug>/‎
 * ساخته می‌شود تا روی همان دامنهٔ karen-soft.ir و داخل iframe هم‌مبدأ اجرا شود.
 * هیچ نشانی github.com یا github.io در خروجی باقی نمی‌ماند.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const srcRoot = process.env.DEMO_SRC_DIR || "/tmp/repos";
const outRoot = path.join(root, "public", "demos");

/** @type {Array<{repo:string, slug:string, kind:"vite"|"next"|"static"|"vite-static"}>} */
const PROJECTS = [
  { repo: "Demo3", slug: "demo3", kind: "vite" },
  { repo: "afshin", slug: "afshin", kind: "vite" },
  { repo: "RedLine", slug: "redline", kind: "vite" },
  { repo: "Demo", slug: "demo", kind: "vite" },
  { repo: "Demo1", slug: "demo1", kind: "vite" },
  { repo: "Gym", slug: "gym", kind: "static" },
  { repo: "Karenwood", slug: "karenwood", kind: "next" },
  { repo: "musician", slug: "musician", kind: "static" },
  { repo: "Digikaren", slug: "digikaren", kind: "vite-static" },
];

const SKIP = new Set([".git", ".github", "node_modules", "tools", "README.md", "LICENSE", "sitemap.xml", "robots.txt"]);
const TEXT_EXT = new Set([".html", ".htm", ".js", ".css", ".json", ".xml", ".txt", ".webmanifest", ".svg"]);

function run(cmd, args, cwd, env = {}) {
  console.log(`$ ${cmd} ${args.join(" ")}  (در ${path.basename(cwd)})`);
  execFileSync(cmd, args, { cwd, stdio: "inherit", env: { ...process.env, ...env } });
}

function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    if (SKIP.has(name) || name.endsWith(".zip")) continue;
    const s = path.join(from, name);
    const d = path.join(to, name);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else cpSync(s, d);
  }
}

/** حذف هر ارجاع خروجی به مخزن یا نسخهٔ خارجی و جایگزینی با مسیر داخلی همان دمو. */
function sanitize(dir, repo, slug) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) { sanitize(p, repo, slug); continue; }
    if (!TEXT_EXT.has(path.extname(name).toLowerCase())) continue;
    const before = readFileSync(p, "utf8");
    const after = before
      .replaceAll(`https://rahmaniho.github.io/${repo}/`, `/demos/${slug}/`)
      .replaceAll(`https://rahmaniho.github.io/${repo}`, `/demos/${slug}/`)
      .replaceAll(`https://github.com/rahmaniho/${repo}`, `/demos/${slug}/`)
      .replaceAll("https://github.com/rahmaniho", `/demos/${slug}/`)
      .replaceAll("github.io", "karen-soft.ir")
      .replaceAll("github.com", "karen-soft.ir");
    if (after !== before) writeFileSync(p, after);
  }
}

/**
 * service worker پروژه در محدودهٔ ‎/demos/digikaren/‎ کش می‌سازد و با هر تغییر سایت
 * نسخهٔ قدیمی را نگه می‌دارد؛ در این نمایش، نسخهٔ آفلاین حذف و ثبت آن خنثی می‌شود.
 * پیوند manifest هم برداشته می‌شود تا بازدیدکننده دمو را روی دامنهٔ کارن سافت نصب نکند.
 */
function disableOfflineShell(dir) {
  rmSync(path.join(dir, "sw.js"), { force: true });
  const html = path.join(dir, "index.html");
  if (existsSync(html)) {
    writeFileSync(html, readFileSync(html, "utf8").replace(/\s*<link rel="manifest"[^>]*>/, ""));
  }
  for (const name of readdirSync(path.join(dir, "assets"))) {
    if (!name.endsWith(".js")) continue;
    const file = path.join(dir, "assets", name);
    const source = readFileSync(file, "utf8");
    const patched = source.replace(
      /navigator\.serviceWorker\.register\("[^"]*sw\.js",\{scope:"[^"]*"\}\)\.catch\([^)]*\)/,
      'Promise.reject(new Error("offline cache disabled in showcase"))',
    );
    if (patched !== source) writeFileSync(file, patched);
  }
}

for (const { repo, slug, kind } of PROJECTS) {
  const src = path.join(srcRoot, repo);
  if (!existsSync(src)) { console.error(`یافت نشد: ${src} — ابتدا مخزن ${repo} را کلون کنید.`); process.exitCode = 1; continue; }
  const dest = path.join(outRoot, slug);
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });

  if (kind === "vite") {
    run("npm", ["ci", "--no-audit", "--no-fund"], src);
    run("npm", ["run", "build"], src); // base:"./" در کانفیگ خود پروژه‌ها؛ زیر هر زیرمسیری کار می‌کند.
    copyDir(path.join(src, "dist"), dest);
  } else if (kind === "vite-static") {
    // دیجی‌کارن با --mode pages ساخته می‌شود: پنل مدیریت آن با سرور کار می‌کند،
    // ولی در این حالت تمام پنل (و کالا/سفارش تمرینی) سمت مرورگر و بدون سرور اجرا می‌شود.
    run("npm", ["ci", "--no-audit", "--no-fund"], src);
    run("npx", ["vite", "build", "--mode", "pages", `--base=/demos/${slug}/`, "--outDir", "dist"], src);
    copyDir(path.join(src, "dist"), dest);
  } else if (kind === "next") {
    run("npm", ["ci", "--no-audit", "--no-fund"], src);
    // next.config.js پایه را از REPO_NAME می‌سازد؛ مقدار زیر basePath و assetPrefix را
    // دقیقاً روی /demos/karenwood/ می‌گذارد و خروجی export ایستا می‌دهد.
    run("npm", ["run", "build"], src, { REPO_NAME: "demos/karenwood" });
    copyDir(path.join(src, "out"), dest);
  } else {
    copyDir(src, dest); // HTML/CSS/JS خالص؛ بدون build
  }
  sanitize(dest, repo, slug);
  if (slug === "digikaren") disableOfflineShell(dest);
  console.log(`✓ /demos/${slug}/ آماده شد.`);
}
console.log("همهٔ نسخه‌های نمایشی در public/demos ساخته شدند.");
