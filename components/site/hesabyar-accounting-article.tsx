import React from "react";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { KaroPricing } from "@/components/site/karo-pricing";
import { KARO_FAQS } from "@/lib/karo";
import {
  HESABYAR_ARTICLE_CTA,
  HESABYAR_ARTICLE_IMAGES,
} from "@/lib/hesabyar-article";

export function HesabyarAccountingArticle({ post }: { post: BlogPost }) {
  return (
    <>
      <figure className="ks-ha-figure ks-ha-hero-figure">
        <Image
          src={post.cover}
          alt={post.coverAlt ?? post.title}
          width={HESABYAR_ARTICLE_IMAGES.width}
          height={HESABYAR_ARTICLE_IMAGES.height}
          sizes="(max-width: 1023px) 100vw, 900px"
          className="ks-ha-image"
          priority
        />
        <figcaption>
          لوگوی رسمی نرم‌افزار حسابداری کارو، ارسالی کارن سافت.
        </figcaption>
      </figure>
      {post.sections.map((section) => (
        <section key={section.id} id={section.id} className="ks-ha-section">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.id === "pricing" ? <KaroPricing /> : null}
          {section.id === "faq" ? (
            <Accordion
              items={KARO_FAQS.map((item) => ({ ...item }))}
              className="ks-ha-faq"
            />
          ) : null}
          {section.id === "start" ? (
            <div className="ks-ha-cta-actions">
              <ButtonLink
                href={HESABYAR_ARTICLE_CTA.primary.href}
                size="lg"
                className="ks-ha-button-primary"
              >
                {HESABYAR_ARTICLE_CTA.primary.label}
              </ButtonLink>
              <ButtonLink
                href={HESABYAR_ARTICLE_CTA.secondary.href}
                variant="outline"
                size="lg"
                className="ks-ha-button-secondary"
              >
                {HESABYAR_ARTICLE_CTA.secondary.label}
              </ButtonLink>
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}
