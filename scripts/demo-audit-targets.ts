import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { CASE_STUDIES } from "../lib/portfolio.ts";

export interface DemoAuditTarget {
  path: string;
  slug: string;
  label: string;
  src: string;
  scope: string;
}

/**
 * همهٔ نسخه‌های نمایشیِ قابل‌ ممیزی را از منبع واحد نمونه‌کارها می‌سازد.
 * اگر پروژه چند تب داشته باشد (مثل فروشگاه/ادمین دیجی‌کارن)، هر تب جداگانه
 * ممیزی می‌شود؛ در غیر این صورت همان دموی پیش‌فرض هدف است.
 */
export function demoAuditTargets(paths: string[], root = process.cwd()): DemoAuditTarget[] {
  const allowed = new Set(paths);
  const targets: DemoAuditTarget[] = [];
  const seen = new Set<string>();

  for (const study of CASE_STUDIES) {
    const path = `/portfolio/${study.slug}`;
    if (!allowed.has(path)) continue;
    const variants = study.demoVariants?.length
      ? study.demoVariants
      : study.demo
        ? [{ label: "پیش‌نمایش", demo: study.demo }]
        : [];

    for (const variant of variants) {
      const file = variant.demo.src.split("?")[0];
      const local = file.endsWith("/") ? join(file, "index.html") : file;
      if (!existsSync(resolve(root, "public", local.slice(1)))) continue;
      const key = `${path}::${variant.demo.src}`;
      if (seen.has(key)) continue;
      seen.add(key);
      targets.push({ path, slug: study.slug, label: variant.label, src: variant.demo.src, scope: variant.demo.scope });
    }
  }

  return targets;
}
