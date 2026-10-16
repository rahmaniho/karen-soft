"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const LAWBOOK_SLIDES = [
  { src: "/images/lawbook/home.webp", width: 1050, height: 2272, title: "خانه و شروع سریع", caption: "صفحهٔ اصلی برنامه با آمار کتابخانه و میان‌برهای قوانین، جست‌وجو، آرای قضایی و آزمون اختبار." },
  { src: "/images/lawbook/categories.webp", width: 1030, height: 2304, title: "دسته‌های حقوقی", caption: "دسترسی به ۱۰ دستهٔ موضوعی از حقوق مدنی و کیفری تا تجارت، خانواده و آیین دادرسی." },
  { src: "/images/lawbook/library.webp", width: 1052, height: 2296, title: "فهرست قوانین", caption: "فهرست ۷۳ سند حقوقی با جست‌وجوی نام قانون، فیلتر موضوعی و نمایش وضعیت پوشش مواد." },
  { src: "/images/lawbook/exams.webp", width: 1032, height: 2298, title: "آزمون اختبار", caption: "فهرست ۱۰۰ آزمون، دسته‌بندی حوزه‌های حقوقی و نمایش سابقهٔ تلاش‌ها و بهترین نمره." },
  { src: "/images/lawbook/preferences.webp", width: 1056, height: 2297, title: "تنظیمات مطالعه و داده‌ها", caption: "انتخاب پوسته، اندازهٔ متن، فاصلهٔ خطوط و مشاهدهٔ وضعیت داده‌های آفلاین و همگام‌سازی." },
  { src: "/images/lawbook/settings.webp", width: 1046, height: 2307, title: "آرای قضایی و منابع", caption: "مدیریت مجموعهٔ اختیاری آرای قضایی، وضعیت نصب برنامه و دسترسی به اطلاعات منابع و پوشش قوانین." },
];

export function LawbookGallery() {
  const [active, setActive] = useState(0);
  const slide = LAWBOOK_SLIDES[active];
  const change = (delta: number) => setActive(index => (index + delta + LAWBOOK_SLIDES.length) % LAWBOOK_SLIDES.length);

  return (
    <section className="lb-gallery container-page" aria-labelledby="lawbook-gallery-title">
      <h2 id="lawbook-gallery-title">کتابچه قانون از نزدیک</h2>
      <p className="lb-gallery-note">اسکرین‌شات‌های واقعی نسخهٔ موبایل کتابچه قانون؛ برای دیدن بخش‌های مختلف از دکمه‌های زیر استفاده کنید.</p>
      <div role="region" aria-roledescription="نمایش اسلایدی" aria-label="تصاویر واقعی محیط کتابچه قانون"
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); change(1); }
          if (event.key === "ArrowRight") { event.preventDefault(); change(-1); }
        }}>
        <figure className="lb-gallery-frame">
          <Image src={slide.src} alt={`${slide.title} — اسکرین‌شات واقعی کتابچه قانون`} width={slide.width} height={slide.height} sizes="(max-width: 767px) 90vw, 420px" className="lb-gallery-image" />
          <figcaption aria-live="polite" aria-atomic="true"><strong>{slide.title}</strong><span>{slide.caption}</span><a href={slide.src} target="_blank" rel="noopener noreferrer" className="lb-gallery-full">مشاهدهٔ تصویر در اندازهٔ کامل<span className="sr-only"> (در پنجرهٔ جدید)</span></a><small>اسلاید {(active + 1).toLocaleString("fa-IR")} از {LAWBOOK_SLIDES.length.toLocaleString("fa-IR")}</small></figcaption>
        </figure>
        <div className="lb-gallery-controls">
          <button type="button" onClick={() => change(-1)} aria-label="اسلاید قبلی"><ChevronRight size={20} aria-hidden="true" /></button>
          <div className="lb-gallery-choices" role="group" aria-label="انتخاب نمای برنامه">
            {LAWBOOK_SLIDES.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.title}</button>)}
          </div>
          <button type="button" onClick={() => change(1)} aria-label="اسلاید بعدی"><ChevronLeft size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
