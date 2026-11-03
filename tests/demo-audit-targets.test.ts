import { describe, expect, it } from "vitest";
import { demoAuditTargets } from "../scripts/demo-audit-targets";

describe("demo accessibility audit targets", () => {
  it("expands every hosted demo and the Digikaren admin variant from the shared case data", () => {
    const targets = demoAuditTargets(["/portfolio/digikaren", "/portfolio/gym", "/products"]);
    expect(targets).toHaveLength(3);
    expect(targets.filter(target => target.slug === "digikaren").map(target => [target.label, target.src])).toEqual([
      ["فروشگاه", "/demos/digikaren/index.html"],
      ["داشبورد ادمین", "/demos/digikaren/index.html?admin=overview"],
    ]);
    expect(targets.some(target => target.slug === "gym" && target.src === "/demos/gym/index.html")).toBe(true);
  });

  it("does not invent targets for routes without a local demo", () => {
    expect(demoAuditTargets(["/products", "/blog", "/portfolio/does-not-exist"])).toEqual([]);
  });
});
