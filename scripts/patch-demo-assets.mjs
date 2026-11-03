#!/usr/bin/env node
/**
 * اصلاح‌های نگهدارنده روی خروجی ایستا‌ی دموها.
 * این اسکریپت idempotent است و بعد از `build:demos` اجرا می‌شود تا
 * اگر خروجی دموها دوباره ساخته شد، اصلاحهای مرحله ۰ از بین نرود.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
let changed = 0;

function patch(file, from, to) {
  if (!existsSync(file)) return;
  const source = readFileSync(file, "utf8");
  const next = source.replaceAll(from, to);
  if (next !== source) {
    writeFileSync(file, next);
    changed += 1;
    console.log(`patched ${path.relative(root, file)}`);
  }
}

// Digikaren: ثبت service worker در نمایش سایت باید بی‌صدا خنثی شود، نه Promise.reject.
const digikarenAssets = path.join(root, "public/demos/digikaren/assets");
if (existsSync(digikarenAssets)) {
  for (const name of readdirSync(digikarenAssets)) {
    if (!name.endsWith(".js")) continue;
    patch(
      path.join(digikarenAssets, name),
      'Promise.reject(new Error("offline cache disabled in showcase"))',
      "void 0",
    );
  }
}

// Leyla Abkeh: توکن طلایی تیره باید روی زمینه کرم حداقل ۴٫۵:۱ کنتراست داشته باشد.
const leylaAssets = path.join(root, "public/demos/leyla-abkeh/assets");
if (existsSync(leylaAssets)) {
  for (const name of readdirSync(leylaAssets)) {
    if (!name.endsWith(".css")) continue;
    patch(path.join(leylaAssets, name), "#86672f", "#755a28");
  }
}

// Leyla Abkeh: نام دسترس‌پذیر باید با متن دیدنی یکسان باشد (WCAG 2.5.3).
const leylaRoot = path.join(root, "public/demos/leyla-abkeh");
function patchLeylaLabels(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) { patchLeylaLabels(file); continue; }
    if (!name.endsWith(".html")) continue;
    const source = readFileSync(file, "utf8");
    const next = source
      .replace(/ aria-label="تماس با دفتر وکالت — [^"]*"/g, "")
      .replace(/ aria-label="لیلا آبکه، وکیل پایه یک دادگستری و عضو کانون وکلای دادگستری قزوین — [^"]*"/g, "")
      .replace(/ aria-label="طراحی و توسعه توسط کارن سافت، KarenSoft \(باز شدن در پنجرۀ جدید\)"/g, "");
    if (next !== source) { writeFileSync(file, next); changed += 1; console.log(`patched ${path.relative(root, file)}`); }
  }
}
patchLeylaLabels(leylaRoot);


/* ------------------------------------------------------------------ */
/* Stage 1.2 — iframe accessibility overrides for self-hosted demos.   */
/* These are idempotent: a marker attribute guards every injection and */
/* CSS/JS assets are rewritten in place. Run after every build:demos.  */
/* ------------------------------------------------------------------ */

const A11Y_MARKER = "data-karensoft-a11y";

function writeDemoAsset(slug, name, content) {
  const dir = path.join(root, "public/demos", slug, "assets");
  if (!existsSync(path.join(root, "public/demos", slug))) return false;
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name);
  const before = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (before === content) return false;
  writeFileSync(file, content);
  changed += 1;
  console.log(`patched ${path.relative(root, file)}`);
  return true;
}

function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === "assets" || name === "node_modules") continue;
    const file = path.join(dir, name);
    if (statSync(file).isDirectory()) out.push(...htmlFiles(file));
    else if (name.endsWith(".html")) out.push(file);
  }
  return out;
}

/** Inject/refresh a small a11y stylesheet and/or script in every demo HTML page. */
function injectDemoA11y(slug, css, js) {
  const demoRoot = path.join(root, "public/demos", slug);
  if (!existsSync(demoRoot)) return;
  if (css) writeDemoAsset(slug, "karensoft-a11y.css", css);
  if (js) writeDemoAsset(slug, "karensoft-a11y.js", js);
  for (const file of htmlFiles(demoRoot)) {
    let source = readFileSync(file, "utf8");
    const original = source;
    // Inject once; asset content can change without touching the HTML again.
    const hasCssLink = new RegExp(`<link ${A11Y_MARKER}="1"`).test(source);
    const hasJsScript = new RegExp(`<script ${A11Y_MARKER}="1"`).test(source);
    if (css && !hasCssLink && source.includes("</head>")) {
      source = source.replace("</head>", `  <link ${A11Y_MARKER}="1" rel="stylesheet" href="assets/karensoft-a11y.css">\n</head>`);
    }
    if (js && !hasJsScript && source.includes("</body>")) {
      source = source.replace("</body>", `  <script ${A11Y_MARKER}="1" src="assets/karensoft-a11y.js" defer></script>\n</body>`);
    }
    if (source !== original) {
      writeFileSync(file, source);
      changed += 1;
      console.log(`patched ${path.relative(root, file)}`);
    }
  }
}

/** Observe DOM mutations in React/Vite demos and apply a callback safely. */
const OBSERVE_JS = `
function karensoftA11y(fn) {
  const run = () => { try { fn(document); } catch (e) { /* demo keeps working */ } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once: true });
  else run();
  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
}
`;

/* Abolfazl Miramoo: rating role, visible phone name, 24px piano/pagination targets. */
injectDemoA11y("abolfazl-miramoo", `
.tst__stars{display:inline-flex}
.piano{overflow-x:auto}
.piano__keys{justify-content:flex-start;min-width:max-content}
.piano__key{flex:0 0 28px;min-width:28px}
.tst-pagination .swiper-pagination-bullet{width:24px;height:24px;margin:0 4px!important;border-radius:50%}
.tst-pagination .swiper-pagination-bullet-active{width:28px;border-radius:999px}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll(".tst__stars[aria-label]").forEach(function (el) { el.setAttribute("role", "img"); });
  doc.querySelectorAll('a.value[href^="tel:"][aria-label]').forEach(function (el) { el.removeAttribute("aria-label"); });
});
`);

/* Afshin: accessible names must contain the visible text. */
injectDemoA11y("afshin", null, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll("button.site-brand[aria-label], button.w-full.text-start[aria-label], a.karensoft-credit[aria-label]").forEach(function (el) {
    el.removeAttribute("aria-label");
  });
});
`);

/* Demo1: footer contrast + valid definition-list grouping. */
injectDemoA11y("demo1", `
footer p{color:#b8b0a4!important}
.text-cream-2\\/50{color:#b8b0a4!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll("dl").forEach(function (dl) {
    if (dl.dataset.karensoftDl === "1") return;
    var groups = [];
    Array.from(dl.children).forEach(function (wrapper) {
      var dt = wrapper.querySelector("dt");
      var dd = wrapper.querySelector("dd");
      if (!dt || !dd) return;
      var group = document.createElement("div");
      var icon = wrapper.querySelector("div:first-child");
      if (icon && icon !== dt.parentElement) dt.prepend(icon);
      group.appendChild(dt);
      group.appendChild(dd);
      groups.push(group);
    });
    if (groups.length) {
      dl.replaceChildren.apply(dl, groups);
      dl.dataset.karensoftDl = "1";
    }
  });
});
`);

/* Demo3: muted text contrast, decorative watermark, visible brand name. */
injectDemoA11y("demo3", `
:root:not(.dark){--faint:#595959!important;--soft:#4f4f4f!important}
.dark{--faint:#a3a3a3!important;--soft:#d4d4d4!important}
.mini{color:#595959!important}
.dark .mini{color:#a3a3a3!important}
.opacity-50{opacity:1!important;color:#595959!important}
html.dark .opacity-50,.dark .opacity-50,[style*="background-color: var(--solid)"] .opacity-50{color:var(--solid-ink)!important;opacity:1!important}
footer{color:#595959!important}
.dark footer{color:#a3a3a3!important}
footer [class*="text-[var(--faint)]"],footer .mini{color:#595959!important}
.dark footer [class*="text-[var(--faint)]"],.dark footer .mini{color:#a3a3a3!important}
[class*="opacity-[0.09]"]{opacity:1!important;color:#757575!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll('a[href="#/"][aria-label]').forEach(function (el) { el.removeAttribute("aria-label"); });
});
`);

/* Digikaren: muted contrast, 24px banner dots, keyboard-scrollable assurances. */
injectDemoA11y("digikaren", `
:root{--muted:#5f6672!important}
.hero-eyebrow{color:#1d4ed8!important}
.heading-eyebrow{color:#1d4ed8!important}
.section-link{color:#0e7490!important}
.super-badge{background:#2f7d4f!important;color:#fff!important}
.category-more{color:#5f6672!important}
.supermarket-banner>button{color:#2f7d4f!important}
.discover-card>p{color:#5f6672!important}
.hero-benefits small{color:#475569!important}
.assurances p,.assurances span{color:#5f6672!important}
footer button,footer span,footer p{color:#5f6672!important}
.hero-dots{gap:8px}
.hero-dots button{width:24px;height:24px;border-radius:50%}
.hero-dots button.active{width:28px;border-radius:999px}
/* پنل ادمین: کنتراست متن‌های کم‌رنگ، نشان‌ها و پیوندها (بدون تغییر دادهٔ نمونه). */
.admin-app,.admin-access{--a-muted:#5f6f81!important}
.admin-mode-notice p,.admin-mode-notice strong,.admin-chart-summary span,.admin-chart-labels span,.admin-chart-footnote,.admin-status-list>div>span,.admin-eyebrow,.admin-content-footer,.admin-sidebar-brand>span,.admin-sidebar-label>span,.admin-sidebar-hint small,.admin-topbar-title span,.admin-top-search,.admin-top-search kbd,.admin-search,.admin-select-wrap select,.admin-page-heading p,.admin-product-identity small,.admin-price-old,.admin-field,.admin-field small,.admin-button-light,.admin-table th,.admin-empty,.admin-settings-note,.admin-info-strip,.admin-order-warning,.admin-form-hint{color:#5f6f81!important}
.admin-segment button{color:#5f6f81!important}
.admin-segment button.is-active,.admin-inline-link,.admin-ref,.admin-row-link,.admin-row-actions button{color:#1d4ed8!important}
.admin-sidebar nav button span,.admin-sidebar nav button b{color:#5f6f81!important}
.admin-sidebar nav button b{background:#fff0e9!important;color:#9a3412!important}
.admin-sidebar a{color:#5f6f81!important}
.admin-status-new{color:#1d4ed8!important;background:#edf4ff!important}
.admin-status-reviewing{color:#92400e!important;background:#fff7e8!important}
.admin-status-reviewed{color:#166534!important;background:#eaf8f3!important}
.admin-status-archived{color:#4b5563!important;background:#f1f4f7!important}
.admin-stock{color:#166534!important}
.admin-stock-low{color:#92400e!important}
.admin-stock-out{color:#b91c1c!important}
.admin-top-search input::placeholder,.admin-search input::placeholder,.admin-field input::placeholder,.admin-field textarea::placeholder{color:#6b7280!important}
.admin-button-primary{background:#1d4ed8!important;color:#fff!important}
.admin-button-danger{background:#b91c1c!important;color:#fff!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll(".assurances").forEach(function (el) {
    if (el.scrollWidth > el.clientWidth + 1) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "region");
      el.setAttribute("aria-label", "مزایای خرید از دیجی‌کارن");
    }
  });
});
`);

/* Gym: rating role, visible names, certificate/badge contrast. */
injectDemoA11y("gym", `
.cert{opacity:1!important;color:#c7cdd6!important}
.badge--accent{color:#ffb3b8!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll(".stars[aria-label]").forEach(function (el) { el.setAttribute("role", "img"); });
  doc.querySelectorAll("a.brand[aria-label], button.split__panel[aria-label], a.coach-card__ig[aria-label], a.ks-credit[aria-label], a.scroll-cue[aria-label]").forEach(function (el) {
    el.removeAttribute("aria-label");
  });
});
`);

/* Icecream Factory: darker cocoa/saffron text, readable badges and WhatsApp CTA. */
injectDemoA11y("icecream-factory", `
.text-cocoa-500{color:#7a4e2d!important}
.text-cocoa-400{color:#7a4e2d!important}
.bg-saffron-600{background-color:#8a5a0c!important}
.bg-cocoa-500{background-color:#7a4e2d!important}
.bg-saffron-500{background-color:#9a6700!important}
.bg-saffron-400{background-color:#9a6700!important}
.product-badge{color:#fff!important}
.bg-saffron-500 .text-saffron-100{color:#fff!important}
.nav-active{color:#7c4a03!important}
[class*="bg-[#25D366]"],#whatsapp-cta{background-color:#075e54!important;color:#fff!important}
`, null);

/* KarenSoft HSE: dashboard muted text, status chips, named overflow menus. */
injectDemoA11y("karensoft-hse", `
:root{--muted:#5f6b66!important}
.kpi-title,.kpi-foot small,.kpi-foot span,.card p,.legend span,.chart-axis span,th,.id-text,.deadline{color:#5f6b66!important}
.change{color:#8a5a17!important;background:#fff3dc!important}
.change.pos{color:#166b54!important;background:#e3f3ec!important}
.deadline.urgent{color:#b23a2a!important;background:#ffe8e2!important}
.select-small{color:#40514a!important}
.dots{min-width:24px;min-height:24px}
small,kbd,.muted,.eyebrow,.summary-strip,.search,.legend,.x-labels,.y-labels,.chart-total,.action-main small,.date-cell,.table-footer,.panel-heading p,.standard-list span,.compliance-note,.footer-url,.record-search,.record-date,.workspace-foot,.priority{color:#5f6b66!important}
.status.blue{color:#2f6f8f!important}
.status.green,.project-state.good{color:#166b54!important}
.brand b span{color:#0f725d!important}
.chart-total b span{color:#5f6b66!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll("button.dots").forEach(function (el, i) {
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "گزینه‌های بیشتر " + (i + 1));
  });
  doc.querySelectorAll("button.select-small[aria-label]").forEach(function (el) { el.removeAttribute("aria-label"); });
});
`);

/* Musician: visible logo/instrument names, rating role. */
injectDemoA11y("musician", null, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll("a.logo[aria-label], article.inst-card[aria-label]").forEach(function (el) { el.removeAttribute("aria-label"); });
  doc.querySelectorAll("p.stars[aria-label]").forEach(function (el) { el.setAttribute("role", "img"); });
});
`);

/* Qazvi Tasvir: hidden drawer must not be focusable; muted/amber contrast; visible phone name. */
injectDemoA11y("qazvi-tasvir", `
:root{--text-light:#5b6b80!important;--text-muted:#475569!important}
.section-label,.ceo-info__role{color:#92400e!important}
.dish-card__price small{color:#2f6f57!important;opacity:1!important}
.top-bar__meta-item,.footer__registry-strip,.footer__bottom-bar{color:#cbd5e1!important}
.footer__registry-strip strong,.footer__bottom-bar strong{color:#e2e8f0!important}
a[href*="wa.me"]{color:#075e54!important}
[style*="--amber-accent"]{color:#92400e!important}
label[style*="--sky-blue"]{color:#0369a1!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  var drawer = doc.getElementById("mobile-drawer");
  if (drawer) {
    if (drawer.getAttribute("aria-hidden") === "true") drawer.setAttribute("inert", "");
    else drawer.removeAttribute("inert");
  }
  doc.querySelectorAll("a.top-bar__phone-link[aria-label]").forEach(function (el) { el.removeAttribute("aria-label"); });
});
`);

/* Redline: 24px color swatches and visible contact-sheet button name. */
injectDemoA11y("redline", `
button[aria-pressed][title]{min-width:24px!important;min-height:24px!important;width:24px!important;height:24px!important}
`, OBSERVE_JS + `
karensoftA11y(function (doc) {
  doc.querySelectorAll('button[aria-label="مشاهدهٔ برگهٔ کنتاکت"]').forEach(function (el) { el.removeAttribute("aria-label"); });
});
`);

console.log(changed ? `${changed} file(s) patched.` : "Demo assets already patched.");
