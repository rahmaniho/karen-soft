import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const demosRoot = join(process.cwd(), "public/demos");

function htmlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "assets" || name === "node_modules") continue;
    const file = join(dir, name);
    if (statSync(file).isDirectory()) out.push(...htmlFiles(file));
    else if (name.endsWith(".html")) out.push(file);
  }
  return out;
}

describe("demo accessibility overlay", () => {
  const slugs = readdirSync(demosRoot).filter(slug =>
    existsSync(join(demosRoot, slug, "assets/karensoft-a11y.css")) ||
    existsSync(join(demosRoot, slug, "assets/karensoft-a11y.js")),
  );

  it("has at least one patched demo and only flat HTML entry points", () => {
    expect(slugs.length).toBeGreaterThanOrEqual(11);
    for (const slug of slugs) {
      for (const file of htmlFiles(join(demosRoot, slug))) {
        expect(file.endsWith(`${slug}/index.html`) || file.includes(`${slug}/`)).toBe(true);
        expect(file.split("/").slice(-2, -1)[0]).toBe(slug);
      }
    }
  });

  it("injects each marker exactly once and references an existing asset", () => {
    for (const slug of slugs) {
      const hasCss = existsSync(join(demosRoot, slug, "assets/karensoft-a11y.css"));
      const hasJs = existsSync(join(demosRoot, slug, "assets/karensoft-a11y.js"));
      for (const file of htmlFiles(join(demosRoot, slug))) {
        const html = readFileSync(file, "utf8");
        const cssTags = html.match(/<link[^>]+data-karensoft-a11y="1"[^>]+href="assets\/karensoft-a11y\.css"/g) ?? [];
        const jsTags = html.match(/<script[^>]+data-karensoft-a11y="1"[^>]+src="assets\/karensoft-a11y\.js"/g) ?? [];
        expect(cssTags.length).toBe(hasCss ? 1 : 0);
        expect(jsTags.length).toBe(hasJs ? 1 : 0);
        expect(html).not.toMatch(/data-karensoft-a11y="1"[^>]+(?:href|src)="\/demos\//);
      }
    }
  });
});
