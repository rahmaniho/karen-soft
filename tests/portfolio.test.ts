import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { CASE_KIND_COPY, CASE_STUDIES } from "../lib/portfolio";
import {
  FACTORY_DISCLAIMER,
  FACTORY_LAYERS,
  FACTORY_PIPELINE,
  FACTORY_STATIONS,
  STATION_STATUS_COPY,
} from "../lib/smart-factory";
import { legacyRedirects } from "../lib/legacy-redirects";
import nextConfig from "../next.config";

const root = process.cwd();

/** Recursively collects text files under the given folders (relative to the repo root). */
function textFiles(folders: string[]): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(ts|tsx|js|mjs|json|html|xml|txt|md)$/.test(name)) out.push(full);
    }
  };
  folders.forEach((folder) => walk(resolve(root, folder)));
  return out;
}

describe("portfolio samples", () => {
  it("shows the real project first and the hypothetical salon second on the home page", () => {
    expect(CASE_STUDIES[0].slug).toBe("karen-chap");
    expect(CASE_STUDIES[0].kind).toBe("client");
    expect(CASE_STUDIES[1].kind).toBe("hypothetical");
  });

  it("labels every hypothetical case as fictional and explains it", () => {
    const hypothetical = CASE_STUDIES.filter((study) => study.kind === "hypothetical");
    expect(hypothetical.length).toBeGreaterThan(0);
    for (const study of hypothetical) {
      expect(study.title, study.slug).toContain("فرضی");
      expect(study.note, study.slug).toBeTruthy();
    }
  });

  it("publishes no measured results for samples and never invents quotes", () => {
    for (const study of CASE_STUDIES.filter((item) => item.kind !== "client")) {
      expect(study.results, study.slug).toBeUndefined();
      if (study.kind === "hypothetical") expect(study.quote, study.slug).toBeUndefined();
      if (study.quote) {
        expect(study.quote.author, study.slug).toBeTruthy();
        expect(study.quote.role, study.slug).toBeTruthy();
      }
    }
  });

  it("serves every demo from this site only", () => {
    for (const study of CASE_STUDIES) {
      if (!study.demo) continue;
      expect(study.demo.src.startsWith("/"), study.slug).toBe(true);
      expect(study.demo.scope.startsWith("/"), study.slug).toBe(true);
      expect(study.demo.src.startsWith(study.demo.scope), study.slug).toBe(true);
      expect(study.demo.src, study.slug).not.toMatch(/https?:|github\.io|vercel\.app/);
      if (study.demo.fullPageHref) expect(study.demo.fullPageHref.startsWith("/"), study.slug).toBe(true);
      if (study.demo.src.endsWith(".html")) {
        expect(existsSync(join(root, "public", study.demo.src)), study.slug).toBe(true);
      } else if (study.demo.src.endsWith("/")) {
        // نسخه‌های چندصفحه‌ای با مسیر پوشه سرو می‌شوند؛ صفحهٔ ورود باید موجود باشد.
        expect(existsSync(join(root, "public", study.demo.src, "index.html")), study.slug).toBe(true);
      }
    }
  });

  it("serves every demo variant of a case from this site too", () => {
    let variants = 0;
    for (const study of CASE_STUDIES) {
      for (const variant of study.demoVariants ?? []) {
        variants += 1;
        expect(variant.label.trim().length, study.slug).toBeGreaterThan(0);
        expect(variant.demo.src.startsWith("/"), study.slug).toBe(true);
        expect(variant.demo.src.startsWith(variant.demo.scope), study.slug).toBe(true);
        expect(variant.demo.src, study.slug).not.toMatch(/https?:|github\.io|vercel\.app/);
        const file = variant.demo.src.split("?")[0];
        expect(existsSync(join(root, "public", file)), study.slug).toBe(true);
      }
    }
    expect(variants).toBeGreaterThan(0);
  });

  it("opens the Digikaren storefront and its admin dashboard from one case page", () => {
    const study = CASE_STUDIES.find((item) => item.slug === "digikaren");
    expect(study?.kind).toBe("sample");
    expect(study?.title).toContain("دیجی‌کارن");
    expect(study?.title).toContain("پنل مدیریت");
    expect(study?.cover).toBe("/images/portfolio/digikaren.jpg");
    expect(study?.logo).toBe("/images/clients/digikaren/digikaren-mark.png");
    expect(study?.note).toContain("ساختگی");
    expect(study?.results).toBeUndefined();
    expect(study?.quote).toBeUndefined();

    const labels = (study?.demoVariants ?? []).map((variant) => variant.label);
    expect(labels).toEqual(["فروشگاه", "داشبورد ادمین"]);
    expect(study?.demoVariants?.[0]?.demo.src).toBe("/demos/digikaren/index.html");
    expect(study?.demoVariants?.[1]?.demo.src).toBe("/demos/digikaren/index.html?admin=overview");
    for (const variant of study?.demoVariants ?? []) {
      expect(variant.demo.scope).toBe("/demos/digikaren/");
      expect(existsSync(join(root, "public/demos/digikaren/index.html"))).toBe(true);
      expect(existsSync(join(root, "public/demos/digikaren/assets"))).toBe(true);
    }
  });

  it("previews the Hanis beauty academy site with its own pages inside the showcase", () => {
    const study = CASE_STUDIES.find((item) => item.slug === "hanis");
    expect(study?.kind).toBe("sample");
    expect(study?.title).toContain("هانیس");
    expect(study?.cover).toBe("/images/portfolio/hanis.jpg");
    expect(study?.logo).toBe("/images/clients/hanis/hanis-mark.png");
    expect(study?.results).toBeUndefined();
    expect(study?.quote).toBeUndefined();
    expect(study?.demo?.src).toBe("/demos/hanis/index.html");
    expect(study?.demo?.scope).toBe("/demos/hanis/");

    // چندصفحه‌ای بودن نمونه‌کار: صفحه‌های دوره، گالری، مجله و خدمات باید موجود باشند.
    for (const page of [
      "index.html",
      "courses/index.html",
      "courses/makeup/index.html",
      "portfolio/index.html",
      "magazine/index.html",
      "services/index.html",
    ]) {
      expect(existsSync(join(root, "public/demos/hanis", page)), page).toBe(true);
    }
  });

  it("serves every client logo and testimonial photo from this site", () => {
    for (const study of CASE_STUDIES) {
      if (study.logo) expect(existsSync(join(root, "public", study.logo.slice(1))), study.slug).toBe(true);
      if (study.quote?.avatar) expect(existsSync(join(root, "public", study.quote.avatar.slice(1))), study.slug).toBe(true);
      if (study.quote?.logo) expect(existsSync(join(root, "public", study.quote.logo.slice(1))), study.slug).toBe(true);
      if (study.liveUrl) expect(study.liveUrl, study.slug).toMatch(/^https:\/\//);
    }
  });

  it("presents Qazvin Tasvir as a real client case with its own brand and CEO testimonial", () => {
    const study = CASE_STUDIES.find((item) => item.slug === "qazvi-tasvir");
    expect(study?.kind).toBe("client");
    expect(study?.logo).toBe("/images/clients/qazvin-tasvir/qazvin-tasvir-mark.png");
    expect(study?.liveUrl).toBe("https://qazvintasvir.ir/");
    expect(study?.specs?.length).toBeGreaterThan(0);
    expect(study?.stack).toEqual(expect.arrayContaining(["Astro", "TypeScript", "JavaScript", "HTML", "CSS"]));
    expect(study?.quote?.author).toBe("سعید امین‌زاده");
    expect(study?.quote?.role).toContain("مدیرعامل");
    expect(study?.quote?.avatar).toBe("/images/clients/qazvin-tasvir/saeed-aminzadeh.webp");
    expect(study?.quote?.text).toContain("اخلاق");
    expect(study?.quote?.text).toContain("کوتاه‌ترین زمان");
  });

  it("keeps hosting and static-site wording out of the Qazvin Tasvir case", () => {
    const study = CASE_STUDIES.find((item) => item.slug === "qazvi-tasvir")!;
    const text = [study.summary, study.note ?? "", ...study.services, ...study.challenge, ...study.solution]
      .concat(study.stack)
      .concat((study.specs ?? []).flatMap((spec) => [spec.label, spec.value]))
      .join(" ");
    expect(text).not.toMatch(/GitHub|github|Actions|Pages/i);
    expect(text).not.toMatch(/ایستا|استاتیک|static/i);
    expect(study.stack).not.toContain("GitHub Actions");
  });

  it("draws the smart factory automation on the industrial case", () => {
    const study = CASE_STUDIES.find((item) => item.slug === "industrial-automation");
    expect(study?.kind).toBe("sample");
    expect(study?.visual).toBe("smart-factory");
    expect(study?.title).toContain("اتوماسیون هوشمند");
    expect(study?.summary).toContain("اتوماسیون هوشمند");
    expect(study?.specs?.length).toBeGreaterThan(2);
    expect(study?.stack).toEqual(expect.arrayContaining(["HTML", "CSS", "JavaScript", "SVG"]));
    expect(study?.quote).toBeUndefined();
    expect(study?.results).toBeUndefined();
  });

  it("describes the five automation layers from field to decision", () => {
    expect(FACTORY_LAYERS).toHaveLength(5);
    expect(FACTORY_LAYERS.map((layer) => layer.id)).toEqual([
      "field",
      "control",
      "edge",
      "erp",
      "intelligence",
    ]);
    for (const layer of FACTORY_LAYERS) {
      expect(layer.data.length, layer.id).toBeGreaterThan(2);
      expect(layer.tech.length, layer.id).toBeGreaterThan(0);
      expect(layer.outcome, layer.id).toBeTruthy();
      expect(layer.scene.length, layer.id).toBeGreaterThan(0);
    }
    expect(FACTORY_DISCLAIMER).toContain("شبیه‌سازی");
    expect(FACTORY_PIPELINE.map((step) => step.layer)).toEqual([0, 1, 2, 2, 3, 4]);
    for (const step of FACTORY_PIPELINE) {
      expect(FACTORY_LAYERS[step.layer], step.id).toBeTruthy();
    }
    for (const step of FACTORY_STATIONS) {
      expect(STATION_STATUS_COPY[step.status], step.id).toBeTruthy();
    }
  });

  it("has explanatory copy for every case kind", () => {
    for (const copy of Object.values(CASE_KIND_COPY)) {
      expect(copy.challenge).toBeTruthy();
      expect(copy.solution).toBeTruthy();
    }
  });

  it("ships static demo folders without CMS admin, service workers or other leftovers", () => {
    const demosDir = join(root, "public/demos");
    for (const dir of readdirSync(demosDir)) {
      const base = join(demosDir, dir);
      expect(existsSync(join(base, "admin")), dir).toBe(false);
      expect(existsSync(join(base, "sw.js")), dir).toBe(false);
      expect(existsSync(join(base, "sw-custom.js")), dir).toBe(false);
    }
  });

  it("marks demo folders as non-indexable through the response headers", async () => {
    const headers = (await nextConfig.headers?.()) ?? [];
    const demoRule = headers.find((rule) => rule.source === "/demos/:path*");
    expect(demoRule?.headers).toContainEqual({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  });

  it("rewrites folder URLs of demos to their index pages without touching site URLs", async () => {
    const rewrites = await nextConfig.rewrites?.();
    const afterFiles = (rewrites as { afterFiles?: { source: string }[] } | undefined)?.afterFiles ?? [];
    expect(afterFiles.map((rule) => rule.source)).toEqual(["/demos/:path*/", "/demos/:path*"]);
    const redirects = (await nextConfig.redirects?.()) ?? [];
    expect(redirects[0]?.source).toBe("/:path((?!demos/).+)/");
  });
});

describe("removed client content", () => {
  it("does not mention the removed salon owner or her brand anywhere in the source", () => {
    const pattern = /سحر نجفی|Sahar Najafi|سالن زیبایی سحر|hero-sahar|saharnajafi\.png/i;
    const self = resolve(root, "tests/portfolio.test.ts");
    const offenders = textFiles(["app", "components", "lib", "legacy", "scripts", "tests"])
      .filter((file) => file !== self)
      .filter((file) => pattern.test(readFileSync(file, "utf8")))
      .map((file) => relative(root, file));
    expect(offenders).toEqual([]);
  });

  it("redirects the old Sahar URLs to the portfolio list", () => {
    for (const path of ["/najafisahar", "/saharnajafi", "/najafisahar.html", "/saharnajafi.html", "/portfolio/najafisahar", "/portfolio/sahar-najafi-nails"]) {
      expect(legacyRedirects.some(([from, to]) => from === path && to === "/portfolio"), path).toBe(true);
    }
  });

  it("keeps the hypothetical salon free of borrowed brands and live demos", () => {
    const salon = CASE_STUDIES.find((item) => item.slug === "beauty-salon-hypothetical");
    expect(salon?.kind).toBe("hypothetical");
    expect(salon?.demo).toBeUndefined();
    expect(salon?.client).toContain("فرضی");
    expect(salon?.note).toContain("فرضی");
  });
});
