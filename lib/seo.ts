import type { Metadata } from "next";
import { SITE } from "./constants";

export interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  /** Defaults to the primary site brand. Use for distinct sub-brands such as Karen Chap. */
  brand?: string;
  /** Used when a page has no dedicated social preview image. */
  defaultImage?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

function absoluteUrl(value: string): string {
  return new URL(value, `${SITE.url}/`).toString();
}

/** Centralized, canonical metadata for all public page types. */
export function pageMeta({
  title,
  description,
  path = "/",
  images,
  brand = SITE.name,
  defaultImage = "/images/logo-karensoft.png",
  noIndex = false,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: PageMetaInput): Metadata {
  const pageTitle = title.includes(brand) ? title : `${title} | ${brand}`;
  const canonical = absoluteUrl(path);
  const socialImages = (images?.length ? images : [defaultImage]).map((image) => ({
    url: absoluteUrl(image),
    alt: pageTitle,
  }));

  const openGraph = openGraphType === "article"
    ? {
        type: "article" as const,
        locale: "fa_IR",
        siteName: brand,
        title: pageTitle,
        description,
        url: canonical,
        images: socialImages,
        ...(publishedTime ? { publishedTime } : {}),
        ...(modifiedTime ? { modifiedTime } : {}),
        ...(authors?.length ? { authors } : {}),
        ...(section ? { section } : {}),
        ...(tags?.length ? { tags } : {}),
      }
    : {
        type: "website" as const,
        locale: "fa_IR",
        siteName: brand,
        title: pageTitle,
        description,
        url: canonical,
        images: socialImages,
      };

  return {
    title: { absolute: pageTitle },
    description,
    ...(noIndex ? {} : { alternates: { canonical } }),
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: socialImages.map((image) => image.url),
    },
  };
}

/** Metadata defaults that keep Karen Chap distinct while connecting it to Karen Soft. */
export function chapPageMeta(input: Omit<PageMetaInput, "brand" | "defaultImage">): Metadata {
  return pageMeta({
    ...input,
    brand: "کارن چاپ",
    defaultImage: "/images/print/logo-chap.png",
  });
}
