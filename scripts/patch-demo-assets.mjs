#!/usr/bin/env node
/**
 * اصلاح‌های نگهدارنده روی خروجی ایستا‌ی دموها.
 * این اسکریپت idempotent است و بعد از `build:demos` اجرا می‌شود تا
 * اگر خروجی دموها دوباره ساخته شد، اصلاحهای مرحله ۰ از بین نرود.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
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

console.log(changed ? `${changed} file(s) patched.` : "Demo assets already patched.");
