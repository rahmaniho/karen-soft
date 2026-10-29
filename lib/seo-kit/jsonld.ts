import { absoluteUrl, isValidHttpUrl } from "./text.ts";

export type JsonLdNode = Record<string, unknown>;

export interface GraphOptions {
  baseUrl: string;
  /** شناسهٔ سازمان که ناشر/ارائه‌دهندهٔ همهٔ موجودیت‌هاست. */
  organizationId?: string;
}

/** گرهٔ JSON-LD با `@context` تکی؛ برای صفحه‌هایی که فقط یک موجودیت دارند. */
export function withContext<T extends JsonLdNode>(node: T): T & { "@context": "https://schema.org" } {
  return { "@context": "https://schema.org", ...node };
}

/** چند موجودیت در یک گراف؛ برای صفحه‌های محصول/مقاله که SoftwareApplication و FAQ و Breadcrumb دارند. */
export function jsonLdGraph(nodes: JsonLdNode[]): { "@context": "https://schema.org"; "@graph": JsonLdNode[] } {
  return { "@context": "https://schema.org", "@graph": nodes.map(({ ["@context"]: _ignored, ...node }) => node) };
}

export function breadcrumbNode(items: { name: string; path: string }[], baseUrl: string): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path, baseUrl),
    })),
  };
}

export function faqNode(items: { q: string; a: string }[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export interface OfferInput {
  name: string;
  /** مبلغ به ریال (واحد ISO) — تومان فقط در متن نمایش داده می‌شود. */
  priceRial: number;
  description?: string;
  availability?: string;
  url?: string;
}

export function softwareApplicationNode(input: {
  id: string;
  name: string;
  description: string;
  url: string;
  baseUrl: string;
  operatingSystem: string;
  applicationCategory?: string;
  featureList?: readonly string[];
  offers?: OfferInput[];
  organizationId?: string;
  image?: string;
}): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": `${input.url}#software`,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: input.applicationCategory ?? "BusinessApplication",
    operatingSystem: input.operatingSystem,
    inLanguage: "fa-IR",
    ...(input.featureList?.length ? { featureList: [...input.featureList] } : {}),
    ...(input.image ? { image: absoluteUrl(input.image, input.baseUrl) } : {}),
    ...(input.offers?.length
      ? {
          offers: input.offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.priceRial,
            priceCurrency: "IRR",
            ...(offer.description ? { description: offer.description } : {}),
            availability: offer.availability ?? "https://schema.org/InStock",
            ...(offer.url ? { url: offer.url } : {}),
          })),
        }
      : {}),
    ...(input.organizationId ? { provider: { "@id": input.organizationId } } : {}),
  };
}

const REQUIRED_TYPES = new Set<string>();

/** بررسی ساختاری گراف: نوع موجودیت، نشانی مطلق و نبود مقدار خالی. */
export function validateJsonLd(nodes: JsonLdNode[]): string[] {
  const issues: string[] = [];
  if (!nodes.length) return ["گراف JSON-LD خالی است"];

  const walk = (value: unknown, trail: string): void => {
    if (value === undefined || value === null) {
      issues.push(`${trail}: مقدار خالی`);
      return;
    }
    if (Array.isArray(value)) {
      if (!value.length) issues.push(`${trail}: آرایهٔ خالی`);
      value.forEach((item, index) => walk(item, `${trail}[${index}]`));
      return;
    }
    if (typeof value === "object") {
      const node = value as JsonLdNode;
      // ارجاع خالص ({"@id": ...}) بخش معتبری از JSON-LD است و @type نمی‌خواهد.
      const keys = Object.keys(node).filter((key) => key !== "@context");
      const isReference = keys.length === 1 && keys[0] === "@id";
      if (!node["@type"] && !isReference) issues.push(`${trail}: بدون @type`);
      else if (REQUIRED_TYPES.has(String(node["@type"]))) issues.push(`${trail}: نوع نامعتبر`);
      for (const [key, child] of Object.entries(node)) walk(child, `${trail}.${key}`);
      return;
    }
    if (typeof value === "string" && /(^|\/)(undefined|null)$/.test(value)) issues.push(`${trail}: متن نامعتبر`);
  };

  nodes.forEach((node, index) => {
    if (!node["@type"]) issues.push(`گرهٔ ${index}: بدون @type`);
    for (const [key, value] of Object.entries(node)) {
      if (key === "@context") continue;
      walk(value, `گرهٔ ${index}.${key}`);
    }
  });

  for (const node of nodes) {
    const url = node.url;
    if (typeof url === "string" && !isValidHttpUrl(url)) issues.push(`نشانی نامعتبر در ${String(node["@type"])}: ${url}`);
  }
  return issues;
}
