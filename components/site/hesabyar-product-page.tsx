import React from "react";
import Image from "next/image";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { KaroPricing } from "@/components/site/karo-pricing";
import {
  HESABYAR_FAQS,
  HESABYAR_FEATURES,
  HESABYAR_IMAGE,
  HESABYAR_IMAGE_ALT,
  HESABYAR_WEB_URL,
} from "@/lib/hesabyar";

export function HesabyarProductPage() {
  return (
    <>
      <section className="border-b border-[var(--hairline)] bg-[var(--surface-sunken)] py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <Breadcrumbs
              items={[
                { name: "خانه", path: "/" },
                { name: "محصولات", path: "/products" },
                { name: "نرم‌افزار حسابداری کارو" },
              ]}
            />
            <span className="eyebrow mt-6 block">KARO / کارن سافت</span>
            <h1 className="display-1 mt-5">
              نرم‌افزار حسابداری کارو؛ مدیریت هوشمند امور مالی کسب‌وکار شما
            </h1>
            <p className="lead mt-6">
              کارو نام جدید حساب‌یار است؛ نرم‌افزار حسابداری کاملاً آنلاین با
              ذخیره اطلاعات روی سرور. از دستگاه‌های مختلف اطلاعات خود را ثبت و
              مشاهده کنید.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={HESABYAR_WEB_URL} size="lg">
                ورود به کارو
              </ButtonLink>
              <ButtonLink href="#pricing" variant="outline">
                تعرفه اشتراک و محاسبه هزینه
              </ButtonLink>
            </div>
          </div>
          <Image
            src={HESABYAR_IMAGE}
            alt={HESABYAR_IMAGE_ALT}
            width={1024}
            height={1024}
            sizes="(max-width: 1023px) 100vw, 50vw"
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      </section>
      <section className="container-page py-12" id="versions">
        <h2 className="display-3 mb-5">یک حساب، دسترسی از دستگاه‌های مختلف</h2>
        <p className="max-w-3xl text-sm leading-loose">
          نسخه فعلی کارو کاملاً آنلاین است و برای ثبت و مشاهده اطلاعات به
          اینترنت نیاز دارد. اطلاعات روی سرور ذخیره می‌شود، نه صرفاً روی دستگاه
          کاربر. برای استفاده به نشانی karo.karen-soft.ir مراجعه کنید.
        </p>
      </section>
      <section className="container-page py-12" id="release-notes">
        <h2 className="display-3 mb-5">از حساب‌یار به کارو</h2>
        <p className="max-w-3xl text-sm leading-loose">
          نام، لوگو، معماری و تعرفه نرم‌افزار تغییر کرده است. معرفی APK و لایسنس
          آفلاین نسخه قبلی، مشخصات کارو نیست. انتقال خودکار داده‌های قبلی تأیید
          نشده؛ پیش از حذف نسخه قدیمی، اطلاعات آن را حفظ کنید و درباره انتقال با
          پشتیبانی هماهنگ شوید.
        </p>
      </section>
      <section className="container-page py-12">
        <h2 className="display-3 mb-8">کارو در یک نگاه</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {HESABYAR_FEATURES.map((feature) => (
            <article key={feature.title} className="surface-card p-6">
              <h3>{feature.title}</h3>
              <p className="mt-3 text-sm leading-loose">{feature.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-loose">
          جزئیات امکانات و محدودیت‌های هر پلن را در برنامه یا از پشتیبانی بررسی
          کنید؛ امکانات و محدودیت‌های نسخه قدیمی الزاماً برای نسخه فعلی معتبر
          نیست.
        </p>
      </section>
      <section className="container-page py-12" id="pricing">
        <h2 className="display-3 mb-8">
          تعرفه رسمی اشتراک نرم‌افزار حسابداری کارو
        </h2>
        <KaroPricing />
      </section>
      <section className="container-page py-12">
        <h2 className="display-3 mb-8">پرسش‌های متداول کارو</h2>
        <Accordion items={HESABYAR_FAQS.map((item) => ({ ...item }))} />
      </section>
    </>
  );
}
