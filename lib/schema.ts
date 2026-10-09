import { SITE } from "./constants";
import type { Product } from "./products";
import type { BlogPost } from "./blog";
import { CHAP } from "./print/site";
import type { PrintProduct, PrintService, PrintWork } from "./print/types";

type Json = Record<string, unknown>;

const organizationId = `${SITE.url}/#organization`;
const businessId = `${SITE.url}/#business`;
const chapBusinessId = `${SITE.url}/#karen-chap`;
const websiteId = `${SITE.url}/#website`;

function absoluteUrl(path: string): string {
  return new URL(path, `${SITE.url}/`).toString();
}

function imageObject(path: string, caption?: string): Json {
  return {
    "@type": "ImageObject",
    contentUrl: absoluteUrl(path),
    ...(caption ? { caption } : {}),
  };
}

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    description: SITE.description,
    slogan: SITE.tagline,
    logo: imageObject("/images/logo-karensoft.png", SITE.name),
    email: SITE.email,
    telephone: SITE.phone,
    founder: { "@type": "Person", name: SITE.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: "قزوین",
      addressCountry: "IR",
      streetAddress: SITE.address,
    },
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: SITE.phone,
      email: SITE.email,
      availableLanguage: ["Persian"],
      areaServed: "IR",
    }],
    sameAs: [SITE.socials.telegram, SITE.socials.instagram],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.nameEn,
    description: SITE.description,
    inLanguage: "fa-IR",
    publisher: { "@id": organizationId },
  };
}

export function localBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": businessId,
    name: SITE.name,
    url: SITE.url,
    image: imageObject("/images/logo-karensoft.png", SITE.name),
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: "قزوین",
      addressCountry: "IR",
      streetAddress: SITE.address,
    },
    areaServed: [
      { "@type": "City", name: SITE.city },
      { "@type": "Country", name: "ایران" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Thursday"],
        opens: "09:00",
        closes: "13:00",
      },
    ],
    parentOrganization: { "@id": organizationId },
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: SITE.phone,
      email: SITE.email,
      availableLanguage: ["Persian"],
    }],
    sameAs: [SITE.socials.telegram, SITE.socials.instagram],
  };
}

/** Separate, explicitly related local entity for the Karen Chap print shop. */
export function chapBusinessSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": chapBusinessId,
    name: CHAP.name,
    alternateName: CHAP.nameEn,
    url: absoluteUrl(CHAP.path),
    description: CHAP.description,
    logo: imageObject(CHAP.logo, `${CHAP.name} logo`),
    image: imageObject(CHAP.heroImage, `${CHAP.name} printing studio`),
    telephone: CHAP.tel,
    email: CHAP.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CHAP.streetAddress,
      addressLocality: CHAP.locality,
      addressRegion: CHAP.region,
      addressCountry: "IR",
    },
    hasMap: CHAP.maps,
    areaServed: [
      { "@type": "City", name: CHAP.locality },
      { "@type": "AdministrativeArea", name: CHAP.region },
      { "@type": "Country", name: CHAP.country },
    ],
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "19:00",
    }],
    parentOrganization: { "@id": organizationId },
    contactPoint: [{
      "@type": "ContactPoint",
      contactType: "sales and customer support",
      telephone: CHAP.tel,
      email: CHAP.email,
      availableLanguage: ["Persian"],
      areaServed: CHAP.country,
    }],
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  mainEntity?: Json;
  about?: Json;
}): Json {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${url.replace(/\/$/, "")}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: "fa-IR",
    isPartOf: { "@id": websiteId },
    ...(input.mainEntity ? { mainEntity: input.mainEntity } : {}),
    ...(input.about ? { about: input.about } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    inLanguage: "fa-IR",
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  providerId?: string;
  areaServed?: string[];
  id?: string;
}): Json {
  const url = new URL(absoluteUrl(input.path));
  const canonicalPath = `${url.origin}${url.pathname}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalPath}#service-${input.id ?? "detail"}`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? input.name,
    url: url.toString(),
    provider: { "@id": input.providerId ?? organizationId },
    areaServed: (input.areaServed ?? ["ایران"]).map((area) => ({
      "@type": area === "ایران"
        ? "Country"
        : area === CHAP.locality || area === SITE.city
          ? "City"
          : "AdministrativeArea",
      name: area,
    })),
    inLanguage: "fa-IR",
  };
}

export function siteServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  id?: string;
}): Json {
  return serviceSchema({ ...input, providerId: organizationId, areaServed: ["ایران"] });
}

export function chapServiceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  id?: string;
}): Json {
  return serviceSchema({
    ...input,
    providerId: chapBusinessId,
    areaServed: [CHAP.locality, CHAP.region, CHAP.country],
  });
}

export function softwareAppSchema(product: Product): Json {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(`/products/${product.slug}`)}#software`,
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.description,
    url: absoluteUrl(`/products/${product.slug}`),
    mainEntityOfPage: absoluteUrl(product.demoSlug ? `/demo/${product.demoSlug}` : `/products/${product.slug}`),
    provider: { "@id": organizationId },
    featureList: product.features,
    inLanguage: "fa-IR",
  };
}

export function articleSchema(post: BlogPost): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.excerpt,
    image: imageObject(post.cover, post.title),
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": organizationId },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    articleSection: post.category,
    keywords: post.tags,
    inLanguage: "fa-IR",
  };
}

export function caseStudySchema(input: {
  title: string;
  summary: string;
  path: string;
  image: string;
  category: string;
  services: string[];
}): Json {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case-study`,
    name: input.title,
    abstract: input.summary,
    image: imageObject(input.image, input.title),
    genre: input.category,
    creator: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: url,
    keywords: input.services,
    inLanguage: "fa-IR",
  };
}

export function imageGallerySchema(name: string, path: string, works: PrintWork[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${absoluteUrl(path)}#gallery`,
    name,
    url: absoluteUrl(path),
    inLanguage: "fa-IR",
    image: works.map((work) => imageObject(work.image, `${work.title}. ${work.description}`)),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fa-IR",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** The print SKU pages describe a made-to-order service, not a fixed-price retail listing. */
export function printProductServiceSchema(product: PrintProduct, service?: PrintService): Json {
  return chapServiceSchema({
    name: `چاپ ${product.name}`,
    description: `${product.description} زمان تحویل معمول: ${product.turnaround}.`,
    path: `/print/products/${product.slug}`,
    serviceType: service?.title ?? `چاپ ${product.name}`,
  });
}
