"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CLASS1_SLIDES = [
  { src: "/images/class1/home.webp", width: 1055, height: 2138, title: "خانه و شروع یادگیری", caption: "صفحهٔ اصلی مدرسه‌ی من با شروع یادگیری، درس‌های امروز و مسیر ورود بزرگ‌ترها." },
  { src: "/images/class1/menu.webp", width: 1058, height: 2132, title: "منوی برنامه", caption: "دسترسی به خانه، درس‌ها، بازی‌ها، پیشرفت من، دانلود برنامه و ورود بزرگ‌ترها." },
  { src: "/images/class1/persian.webp", width: 1027, height: 2111, title: "درس‌های فارسی", caption: "نمای واقعی درس مرور حروف «آ ب پ ت» و آشنایی با خواندن و صدای حروف." },
  { src: "/images/class1/math.webp", width: 1074, height: 2111, title: "درس‌های ریاضی", caption: "درس‌های شمارش اشیا تا ۵ و آشنایی با شکل عددی و مقدار اعداد ۱ تا ۱۰." },
  { src: "/images/class1/science.webp", width: 1060, height: 2148, title: "درس‌های علوم", caption: "درس گیاهان و بخش‌هایشان و درس دانه و جوانه با تصویرهای آموزشی." },
];

export function Class1Gallery() {
  const [active, setActive] = useState(0);
  const slide = CLASS1_SLIDES[active];
  const change = (delta: number) => setActive(index => (index + delta + CLASS1_SLIDES.length) % CLASS1_SLIDES.length);

  return (
    <div className="ks-class1-gallery" role="region" aria-roledescription="نمایش اسلایدی" aria-label="تصاویر واقعی محیط مدرسه‌ی من"
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); change(1); }
        if (event.key === "ArrowRight") { event.preventDefault(); change(-1); }
      }}>
      <h3>مدرسه‌ی من از نزدیک</h3>
      <p className="ks-class1-gallery-note">اسکرین‌شات‌های واقعی نسخهٔ موبایل؛ برای دیدن بخش‌های برنامه، تصویرها را ورق بزنید.</p>
      <figure className="lb-gallery-frame">
        <Image src={slide.src} alt={`${slide.title} — اسکرین‌شات واقعی مدرسه‌ی من`} width={slide.width} height={slide.height} sizes="(max-width: 900px) 90vw, 420px" className="ks-class1-screenshot" />
        <figcaption aria-live="polite" aria-atomic="true">
          <strong>{slide.title}</strong>
          <span>{slide.caption}</span>
          <a href={slide.src} target="_blank" rel="noopener noreferrer" className="lb-gallery-full">مشاهدهٔ تصویر در اندازهٔ کامل<span className="sr-only"> (در پنجرهٔ جدید)</span></a>
          <small>اسلاید {(active + 1).toLocaleString("fa-IR")} از {CLASS1_SLIDES.length.toLocaleString("fa-IR")}</small>
        </figcaption>
      </figure>
      <div className="lb-gallery-controls">
        <button type="button" onClick={() => change(-1)} aria-label="تصویر قبلی مدرسه‌ی من"><ChevronRight size={20} aria-hidden="true" /></button>
        <div className="lb-gallery-choices" role="group" aria-label="انتخاب تصویر مدرسه‌ی من">
          {CLASS1_SLIDES.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>{item.title}</button>)}
        </div>
        <button type="button" onClick={() => change(1)} aria-label="تصویر بعدی مدرسه‌ی من"><ChevronLeft size={20} aria-hidden="true" /></button>
      </div>
    </div>
  );
}
