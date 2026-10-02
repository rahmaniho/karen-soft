# نوشتار و تایپوگرافی — نسل دوم

از این نسخه، دو خانوادۀ فونت در کل سایت (سایت اصلی، دموی محصولات، دموی صنایع و
کارن چاپ) حاکم است:

| کاربرد | فونت | فایل |
| --- | --- | --- |
| متن و رابط کاربری | **IRANSans** (وزن‌های UltraLight/Light/Regular/Medium/Bold) | `public/fonts/iransans/*.woff2` |
| تیترها و اعداد نمایشی | **Titr** (ب‌تیتر) | `public/fonts/titr/Titr.woff2` |
| ریزنوشتهٔ نمایشی/لوگوتایپ | Titr TGE | `public/fonts/titr/TitrTGE.woff2` |
| پیش‌فرضِ پشتیبان | Vazirmatn (variable) | `public/fonts/vazirmatn-var.woff2` |
| دموی صنایع (هیت هر صنعت) | BNazanin، BBadr، BYekan، BKoodak | `public/fonts/legacy/*` |

## دو نکتهٔ فنی

1. **فونت تیتر حروف لاتین ندارد.** برای همین ترتیب استکها `Titr, IRANSans` است:
   حروف فارسی با تیتر نوشته می‌شوند و کلمات لاتین (A4، CMYK، SaaS) خودکار به
   ایران‌سنس می‌افتند. اگر بخواهید لاتین هم تیتر شود، یک فونت لاتینِ هم‌وزن به
   انتهای استک اضافه کنید.
2. **`letter-spacing` منفی روی فارسی ممنوع.** به‌جای آن از `word-spacing` منفی
   استفاده شده (`--reader-head` و `.display-*`) تا حروف به‌هم‌پیستۀ فارسی نشکنند.

## مقیاس اندازه

اندازه‌ها در `app/globals.css` داخل `@theme` تعریف شده‌اند و همه در
`var(--reader-scale)` ضرب می‌شوند:

```
text-6xs 8px · text-5xs 9px · text-4xs 10px · text-3xs 11px · text-2xs 12px
text-xs 13px · text-sm 14px · text-md 15px · text-base 16px
text-lg … text-4xl (نمایشی) · display-1 / display-2 / display-3
```

> نام‌ها عمداً به سبک `2xs/3xs…` انتخاب شده‌اند تا `tailwind-merge` آن‌ها را
> با کلاس‌های رنگ (`text-muted`) اشتباه نگیرد و در `cn()` حذف نشوند.

## پنل «تنظیم نوشتار»

`components/typography/reader-controls.tsx` چهار کلید را روی `<html>` می‌نشیند و
در `localStorage` (`karen-soft:reader`) ذخیره می‌کند؛ اسکریپت `lib/reader.ts`
پیش از نقاشی اول آن‌ها را برمی‌گرداند تا متن پرش نکند:

- `data-text-size` → `s | m | l | xl | xxl` (اندازۀ متن)
- `data-text-weight` → `light | normal | bold` (وزن نوشتار)
- `data-text-leading` → `tight | normal | loose` (فاصلۀ خطوط)
- `data-headings` → `titr | sans` (فونت تیترها)

هیچ کامپوننتی برای این تنظیمات نیاز به تغییر ندارد؛ فقط متغیرهای CSS عوض
می‌شوند. روی مسیرهای `/demo/*` پنل نمایش داده نمی‌شود.

## پروانۀ حق استفاده

IRANSans و Titr هر دو از محصولات `fontiran.com` (مهدی‌بایات/مسلم ابراهیمی) هستند.
فایل‌های موجود در این مخزن از بسته‌های وب موجود در پروژه برداشته شده‌اند؛ برای
انتشار روی دامنهٔ اصلی، لایسنس وب هر دو فونت را از فونتیران تهیه و `@font-face` را
با همان نسخهٔ لایسنس‌شده جایگزین کنید.
