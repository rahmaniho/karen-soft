import type { Metadata } from "next";
import { SITE } from "./constants";

interface PageMetaInput {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
}

export function pageMeta({ title, description, path = "/", images, noIndex }: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const image = images?.[0] ?? "/images/logo-karensoft.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: SITE.name,
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
