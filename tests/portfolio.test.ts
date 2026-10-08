import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { CASE_KIND_COPY, CASE_STUDIES } from "../lib/portfolio";
import { INDUSTRIES } from "../lib/industries";
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

  it("publishes no measured results or quotes for samples", () => {
    for (const study of CASE_STUDIES.filter((item) => item.kind !== "client")) {
      expect(study.results, study.slug).toBeUndefined();
      expect(study.quote, study.slug).toBeUndefined();
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
      }
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

  it("replaces the beauty-salon brand and team with fictional names", () => {
    const salon = INDUSTRIES.find((item) => item.slug === "beauty-salon");
    expect(salon).toBeTruthy();
    expect(salon!.brandName).not.toContain("سحر");
    expect(salon!.team.some((member) => member.name.includes("نجفی"))).toBe(false);
    expect(salon!.hero.badge).toContain("فرضی");
  });
});
