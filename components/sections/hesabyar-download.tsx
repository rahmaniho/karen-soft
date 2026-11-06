import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HESABYAR_IMAGE,
  HESABYAR_IMAGE_ALT,
  HESABYAR_PRODUCT_PATH,
  HESABYAR_WEB_URL,
} from "@/lib/hesabyar";
import { KARO_PLANS } from "@/lib/karo";
import { formatToman } from "@/lib/utils";

/** Anchor and component name retained for old inbound links. */
export function HesabyarDownload() {
  return (
    <section
      id="hesabyar-download"
      className="ks-hesabyar"
      aria-labelledby="hesabyar-title"
    >
      <div className="ks-hesabyar-intro">
        <span className="ks-hesabyar-eyebrow">
          نرم‌افزار حسابداری آنلاین کارن سافت
        </span>
        <h2 id="hesabyar-title">کارو؛ مدیریت هوشمند امور مالی کسب‌وکار شما</h2>
        <p>
          کارو نام جدید حساب‌یار است؛ برنامه‌ای کاملاً آنلاین با ذخیره اطلاعات
          روی سرور. از دستگاه‌های مختلف اطلاعات خود را ثبت و مشاهده کنید.
        </p>
        <div className="ks-hesabyar-badges">
          <span>کاملاً آنلاین</span>
          <span>ذخیره روی سرور</span>
          <span>تعداد کاربران قابل انتخاب</span>
        </div>
        <div className="ks-hesabyar-actions">
          <a className="ks-hesabyar-web" href={HESABYAR_WEB_URL}>
            ورود به کارو
          </a>
        </div>
        <Link href={HESABYAR_PRODUCT_PATH} className="ks-hesabyar-product-link">
          معرفی کارو، تعرفه‌ها و محاسبه هزینه اشتراک ←
        </Link>
      </div>
      <div className="ks-hesabyar-details">
        <Image
          src={HESABYAR_IMAGE}
          alt={HESABYAR_IMAGE_ALT}
          data-hesabyar-image
          width={1024}
          height={1024}
          sizes="(max-width: 900px) 100vw, 50vw"
          className="h-auto w-full rounded-2xl"
        />
      </div>
      <div className="ks-hesabyar-pricing">
        <div className="ks-hesabyar-pricing-head">
          <h3>تعرفه اشتراک کارو</h3>
          <p>
            هر پلن شامل یک کاربر است؛ تعداد کاربران و مدت اشتراک قابل انتخاب
            است. همه قیمت‌ها به تومان است.
          </p>
        </div>
        <ul className="ks-hesabyar-plans">
          {KARO_PLANS.map((plan) => (
            <li key={plan.id}>
              <span className="ks-plan-title">{plan.title}</span>
              <strong className="ks-plan-price">
                <bdi>{formatToman(plan.price)}</bdi>
              </strong>
              <span className="ks-plan-period">ماهانه، یک کاربر</span>
              <p>سالانه: {formatToman(plan.yearly)}</p>
              <p>{plan.note}</p>
            </li>
          ))}
        </ul>
        <p className="ks-hesabyar-pricing-foot">
          اشتراک پس از پرداخت موفق خودکار فعال می‌شود. با پایان اشتراک، اطلاعات
          حسابداری حذف نمی‌شود.{" "}
          <Link href={`${HESABYAR_PRODUCT_PATH}#pricing`}>
            محاسبه هزینه و قوانین اشتراک
          </Link>
        </p>
      </div>
    </section>
  );
}
