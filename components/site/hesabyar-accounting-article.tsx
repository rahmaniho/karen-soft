import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  BookOpenCheck,
  Calculator,
  Check,
  Globe,
  Info,
  Package,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog";
import {
  HESABYAR_ARTICLE_BENEFITS,
  HESABYAR_ARTICLE_COMPARISON,
  HESABYAR_ARTICLE_CTA,
  HESABYAR_ARTICLE_FAQS,
  HESABYAR_ARTICLE_FEATURES,
  HESABYAR_ARTICLE_IMAGES,
  HESABYAR_ARTICLE_STEPS,
  HESABYAR_ARTICLE_AUDIENCES,
} from "@/lib/hesabyar-article";
import {
  HESABYAR_FREE_TIER,
  HESABYAR_PLANS,
  HESABYAR_PRODUCT_PATH,
  HESABYAR_UPGRADE_INSTRUCTIONS,
  HESABYAR_WEB_URL,
  formatToman,
} from "@/lib/hesabyar";

const FEATURE_ICONS = {
  cart: ShoppingCart,
  package: Package,
  receipt: ReceiptText,
  book: BookOpenCheck,
  wallet: Wallet,
  users: Users,
  calculator: Calculator,
} as const;

function CtaButtons({ subtle = false }: { subtle?: boolean }) {
  return (
    <div className="ks-ha-cta-actions">
      <ButtonLink href={HESABYAR_ARTICLE_CTA.primary.href} size={subtle ? "md" : "lg"} className="ks-ha-button-primary">
        {HESABYAR_ARTICLE_CTA.primary.label} <ArrowLeft className="size-4" aria-hidden />
      </ButtonLink>
      <ButtonLink href={HESABYAR_ARTICLE_CTA.secondary.href} size={subtle ? "md" : "lg"} variant="outline" className="ks-ha-button-secondary">
        {HESABYAR_ARTICLE_CTA.secondary.label}
      </ButtonLink>
    </div>
  );
}

function SectionExtra({ id }: { id?: string }) {
  switch (id) {
    case "what-is":
      return (
        <ul className="ks-ha-audiences">
          {HESABYAR_ARTICLE_AUDIENCES.map((item) => (
            <li key={item.title} className="ks-ha-card">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      );
    case "features":
      return (
        <>
          <div className="ks-ha-modules">
            {HESABYAR_ARTICLE_FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <SurfaceCard as="article" key={feature.id} id={feature.id} className="ks-ha-module">
                  <span className="ks-ha-icon" aria-hidden><Icon className="size-5" /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.summary}</p>
                  <ul>
                    {feature.bullets.map((bullet) => (
                      <li key={bullet}><Check className="size-4" aria-hidden />{bullet}</li>
                    ))}
                  </ul>
                  <p className="ks-ha-example"><strong>مثال کاربردی:</strong> {feature.example.replace(/^مثال کاربردی:\s*/, "")}</p>
                  {feature.note ? <p className="ks-ha-note"><Info className="size-4" aria-hidden />{feature.note}</p> : null}
                </SurfaceCard>
              );
            })}
          </div>
          <figure className="ks-ha-figure">
            <Image
              src={HESABYAR_ARTICLE_IMAGES.features}
              alt={HESABYAR_ARTICLE_IMAGES.featuresAlt}
              width={HESABYAR_ARTICLE_IMAGES.width}
              height={HESABYAR_ARTICLE_IMAGES.height}
              sizes="(max-width: 1023px) 100vw, 900px"
              className="ks-ha-image"
            />
            <figcaption>نمای تبلیغاتی امکانات حساب‌یار در وب و موبایل؛ اعداد و داده‌های داخل تصویر نمونه هستند.</figcaption>
          </figure>
        </>
      );
    case "versions":
      return (
        <>
          <div className="ks-ha-version-grid">
            <SurfaceCard className="ks-ha-card">
              <Globe className="size-6" aria-hidden />
              <h3>نسخه وب / PWA</h3>
              <p>در مرورگر باز می‌شود، بدون نصب سنتی، و قابل افزودن به صفحه اصلی گوشی یا دسکتاپ است.</p>
              <ButtonLink href={HESABYAR_WEB_URL} variant="soft" size="sm">ورود به نسخه وب</ButtonLink>
            </SurfaceCard>
            <SurfaceCard className="ks-ha-card">
              <Smartphone className="size-6" aria-hidden />
              <h3>نسخه اندروید</h3>
              <p>همان برنامه به‌صورت فایل APK؛ مناسب استفاده روی گوشی اندروید با داده محلی.</p>
              <ButtonLink href={`${HESABYAR_PRODUCT_PATH}#versions`} variant="soft" size="sm">مشاهده نسخه اندروید</ButtonLink>
            </SurfaceCard>
          </div>
          <p className="ks-ha-note"><ShieldCheck className="size-4" aria-hidden />اطلاعات هر نسخه روی همان دستگاه ذخیره می‌شود و همگام‌سازی خودکار بین دستگاه‌ها وجود ندارد. انتقال داده‌ها با پشتیبان JSON انجام می‌شود.</p>
          <p className="ks-ha-note"><Info className="size-4" aria-hidden />{HESABYAR_UPGRADE_INSTRUCTIONS}</p>
        </>
      );
    case "integration":
      return (
        <>
          <ol className="ks-ha-flow">
            <li><strong>۱. ثبت سند فروش</strong><span>فاکتور با اقلام، تخفیف و مالیات ثبت می‌شود.</span></li>
            <li><strong>۲. کاهش موجودی</strong><span>موجودی کالاها کم و گردش انبار ثبت می‌شود.</span></li>
            <li><strong>۳. ثبت درآمد</strong><span>درآمد فروش در دفتر مالی کسب‌وکار ثبت می‌شود.</span></li>
          </ol>
          <SurfaceCard className="ks-ha-example-card">
            <h3>مثال عددی از یک فروش</h3>
            <p>دو کالا با قیمت واحد ۱۰۰٬۰۰۰ تومان، تخفیف ۱۰٪ و مالیات ۱۰٪: جمع اقلام ۲۰۰٬۰۰۰ تومان، تخفیف ۲۰٬۰۰۰ تومان و مالیات ۱۸٬۰۰۰ تومان است؛ مبلغ نهایی فاکتور ۱۹۸٬۰۰۰ تومان می‌شود. اگر بهای تمام‌شده هر کالا ۶۰٬۰۰۰ تومان باشد، سود ناخالص این فروش ۶۰٬۰۰۰ تومان است.</p>
          </SurfaceCard>
          <div className="ks-ha-mid-cta">
            <p>می‌خواهید این جریان را در محیط برنامه ببینید؟</p>
            <CtaButtons subtle />
          </div>
        </>
      );
    case "benefits":
      return (
        <div className="ks-ha-benefits">
          {HESABYAR_ARTICLE_BENEFITS.map((benefit) => (
            <SurfaceCard key={benefit.title} className="ks-ha-card">
              <Check className="size-5" aria-hidden />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </SurfaceCard>
          ))}
        </div>
      );
    case "pricing":
      return (
        <>
          <div className="ks-ha-pricing">
            <SurfaceCard className="ks-ha-price-card">
              <h3>نسخه رایگان</h3>
              <p className="ks-ha-price">رایگان</p>
              <p>{HESABYAR_FREE_TIER}</p>
              <ul>
                <li>ماشین‌حساب کامل</li>
                <li>۱ کالا</li>
                <li>۱۰ تراکنش</li>
              </ul>
            </SurfaceCard>
            {HESABYAR_PLANS.map((plan) => (
              <SurfaceCard key={plan.id} className={`ks-ha-price-card${plan.featured ? " ks-ha-price-featured" : ""}`}>
                {plan.featured ? <span className="ks-ha-badge">پیشنهاد ما</span> : null}
                <h3>{plan.title}</h3>
                <p className="ks-ha-price"><bdi>{formatToman(plan.price)}</bdi></p>
                <p>{plan.period}</p>
                <p>{plan.note}</p>
                <ButtonLink href={`${HESABYAR_PRODUCT_PATH}#pricing`} variant={plan.featured ? "primary" : "outline"} size="sm">مشاهده و ثبت درخواست</ButtonLink>
              </SurfaceCard>
            ))}
          </div>
          <p className="ks-ha-note"><Info className="size-4" aria-hidden />نسخه حرفه‌ای محدودیت تعداد کالا و تراکنش شخصی را برمی‌دارد و خروجی PDF و پشتیبان‌گیری را فعال می‌کند. فعال‌سازی لایسنس آفلاین است و تمدید خودکار وجود ندارد.</p>
        </>
      );
    case "comparison":
      return (
        <div className="ks-ha-table-wrap" role="region" aria-label="جدول مقایسه مدیریت سنتی با حساب‌یار" tabIndex={0}>
          <table className="ks-ha-table">
            <caption className="sr-only">مقایسه روش سنتی و حساب‌یار بر اساس قابلیت‌های واقعی</caption>
            <thead>
              <tr><th scope="col">نیاز</th><th scope="col">روش سنتی</th><th scope="col">با حساب‌یار</th><th scope="col">نکته مهم</th></tr>
            </thead>
            <tbody>
              {HESABYAR_ARTICLE_COMPARISON.map((row) => (
                <tr key={row.need}>
                  <th scope="row">{row.need}</th>
                  <td>{row.traditional}</td>
                  <td>{row.hesabyar}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "getting-started":
      return (
        <ol className="ks-ha-steps">
          {HESABYAR_ARTICLE_STEPS.map((step, index) => (
            <li key={step.title} className="ks-ha-card">
              <span className="ks-ha-step-index" aria-hidden>{index + 1}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p></div>
            </li>
          ))}
        </ol>
      );
    case "faq":
      return <Accordion items={HESABYAR_ARTICLE_FAQS.map((item) => ({ q: item.q, a: item.a }))} className="ks-ha-faq" />;
    case "start":
      return (
        <div className="ks-ha-cta">
          <CtaButtons />
        </div>
      );
    default:
      return null;
  }
}

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
        <figcaption>تصویر معرفی ارسالی کارن سافت برای حساب‌یار؛ نمای تبلیغاتی وب و موبایل. اعداد داخل تصویر نمونه هستند.</figcaption>
      </figure>

      {post.sections.map((section) => (
        <section key={section.heading} id={section.id} className="ks-ha-section">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets ? (
            <ul className="ks-ha-bullets">
              {section.bullets.map((bullet) => <li key={bullet}><Check className="size-4" aria-hidden />{bullet}</li>)}
            </ul>
          ) : null}
          <SectionExtra id={section.id} />
        </section>
      ))}
    </>
  );
}
