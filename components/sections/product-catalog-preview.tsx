import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { PRODUCTS, PRODUCT_STATUS_LABEL } from "@/lib/products";

/** گزیده‌ای از کاتالوگ واقعی؛ داده‌ها از lib/products.ts می‌آیند و آمار تجاری نیستند. */
export const PRODUCT_PREVIEW_SLUGS = [
  "law-office",
  "online-store",
  "restaurant",
  "printing-management",
  "real-estate",
  "karen-net",
] as const;

export function ProductCatalogPreview() {
  const products = PRODUCT_PREVIEW_SLUGS
    .map(slug => PRODUCTS.find(product => product.slug === slug))
    .filter(product => product !== undefined);

  return (
    <ul className="ks-product-preview" data-product-preview aria-label="گزیدهٔ کاتالوگ محصولات">
      {products.map(product => (
        <li key={product.slug}>
          <Link href={`/products/${product.slug}`} className="ks-product-preview-card">
            <span className="ks-product-preview-top">
              <span className="ks-product-preview-mark" aria-hidden="true">
                {product.logo ? (
                  <Image src={product.logo} alt="" width={48} height={48} className="ks-product-preview-logo" />
                ) : (
                  <Icon name={product.icon} className="size-6" />
                )}
              </span>
              <span className="ks-product-preview-status" data-status={product.status}>
                {PRODUCT_STATUS_LABEL[product.status]}
              </span>
            </span>
            <h3>{product.name}</h3>
            <p>{product.short}</p>
            <span className="ks-product-preview-cta">مشاهده محصول <ArrowLeft size={16} aria-hidden="true" /></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
