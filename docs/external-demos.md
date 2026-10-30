# نسخه‌های نمایشی خودمیزبان (`/demos/`)

نه پروژهٔ نمونه‌کار، به‌صورت فایل ایستا روی **همین دامنه** میزبانی می‌شوند و از
صفحهٔ «نمونه‌کارها» (`/portfolio`) داخل قاب پیش‌نمایش هم‌مبدأ اجرا می‌شوند.
بازدیدکننده هیچ‌وقت به مخزن، نسخهٔ خارجی یا دامنهٔ دیگری فرستاده نمی‌شود و در
رابط کاربری هیچ پیوند خروجی به این پروژه‌ها وجود ندارد.

## نگاشت پروژه‌ها

| پروژه | مسیر داخلی دمو | مسیر صفحهٔ نمونه‌کار | نوع ساخت |
|---|---|---|---|
| Demo3 (استودیو عکاسی پرتره) | `/demos/demo3/` | `/portfolio/demo3` | Vite (خروجی تک‌فایل، `base: "./"`) |
| afshin (گیاهپزشکی) | `/demos/afshin/` | `/portfolio/afshin` | Vite (خروجی تک‌فایل، `base: "./"`) |
| RedLine (گالری استودیو کارن) | `/demos/redline/` | `/portfolio/redline` | Vite (`base: "./"`) |
| Demo (پنجره‌های آلپاین) | `/demos/demo/` | `/portfolio/demo` | Vite (خروجی تک‌فایل، `base: "./"`) |
| Demo1 (نورپارس) | `/demos/demo1/` | `/portfolio/demo1` | Vite (خروجی تک‌فایل، `base: "./"`) |
| Gym (آیرون آرنا) | `/demos/gym/` | `/portfolio/gym` | HTML/CSS/JS خالص، بدون build |
| Karenwood (هلدینگ چوب) | `/demos/karenwood/` | `/portfolio/karenwood` | Next.js با خروجی ایستا؛ `REPO_NAME=demos/karenwood` تا `basePath` و `assetPrefix` روی `/demos/karenwood/` قرار گیرد |
| musician (استودیو آوا) | `/demos/musician/` | `/portfolio/musician` | HTML/CSS/JS خالص، بدون build |
| Digikaren (فروشگاه + پنل ادمین) | `/demos/digikaren/` | `/portfolio/digikaren` | Vite با `--mode pages` و `--base=/demos/digikaren/`؛ service worker حذف می‌شود |

## بازتولید

```bash
# کلون هر نه مخزن در /tmp/repos (نام پوشه‌ها: Demo3 afshin RedLine Demo Demo1 Gym Karenwood musician Digikaren)
DEMO_SRC_DIR=/tmp/repos npm run build:demos
```

اسکریپت `scripts/build-demos.mjs` هر پروژه را build می‌گیرد، خروجی را در
`public/demos/<slug>/` می‌گذارد و هر ارجاع `github.com`/`github.io` را از فایل‌های
متنی خروجی حذف و با مسیر داخلی همان دمو جایگزین می‌کند.

## چک‌لیست مسیر و دارایی‌ها

- [x] نقطهٔ ورود هر دمو: `public/demos/<slug>/index.html`
- [x] پروژه‌های Vite با پایهٔ نسبی `./` ساخته شده‌اند؛ CSS/JS/تصویر زیر هر زیرمسیری بارگذاری می‌شود.
- [x] کارن‌وود با `basePath`/`assetPrefix` برابر `/demos/karenwood/` خروجی ایستا داده است.
- [x] بازنویسی `/demos/:path*` در `next.config.ts` پوشه‌ها را به `index.html` همان پوشه می‌رساند و برای دموها `X-Robots-Tag: noindex` تنظیم شده است.
- [x] قاب پیش‌نمایش (`components/site/demo-frame.tsx`): iframe با `loading="lazy"` و
      `sandbox="allow-scripts allow-same-origin"`، دکمهٔ تمام‌صفحه و بستن با Esc؛
      کلیک و فرمِ بیرون از محدودهٔ `/demos/<slug>/` متوقف می‌شود.
- [x] بندانگشتی هر کارت فایل محلی در `public/images/portfolio/<slug>.jpg` است.
- [x] در خروجی هشت دمو هیچ `github.com` یا `github.io`ای نیست:
      `grep -r "github\.com\|github\.io" public/demos/<slug>` باید خالی باشد.

## محدودیت‌های شناخته‌شده و جایگزین داخلی

- هر هشت پروژه داخل iframe هم‌مبدأ اجرا می‌شوند؛ موردی که نیاز به جایگزین
  (تصویر/پیام «پیش‌نمایش تعاملی در دسترس نیست») داشته باشد وجود نداشت.
- بعضی دموها در طراحی اصلی خود از فونت وب یا تصویر بیرونی به‌صورت بهبود تدریجی
  استفاده می‌کنند؛ پوستهٔ پیش‌نمایش و فایل‌های اصلی همگی هم‌مبدأند و نبود آن‌ها
  فقط فونت/تصویر جایگزین نشان می‌دهد. پیوندهای بیرونی داخل دموها (شبکه‌های
  اجتماعی، پیام‌رسان و…) توسط قاب پیش‌نمایش غیرفعال می‌شوند.

## دیجی‌کارن: یک نمونه‌کار، دو نمای نمایشی

دیجی‌کارن فقط یک سایت فروشگاهی نیست؛ پنل مدیریت همان فروشگاه هم بخشی از نمونه‌کار است.
برای همین در `lib/portfolio.ts` فیلد `demoVariants` اضافه شد و
`components/site/demo-tabs.tsx` آن‌ها را با تب نشان می‌دهد:

| تب | نشانی داخل قاب |
|---|---|
| فروشگاه | `/demos/digikaren/index.html` |
| داشبورد ادمین | `/demos/digikaren/index.html?admin=overview` |

نکته‌های ساخت:

- پروژه با `--mode pages` ساخته می‌شود تا پنل مدیریت در حالت «sandbox» مرورگر اجرا شود؛
  در حالت پیش‌فرض (`production`) پنل منتظر سرور `/api/admin` و رمز ورود می‌ماند و در
  نمایش ایستا کار نمی‌کند.
- `sw.js` حذف و ثبت service worker در بستهٔ JS خنثی می‌شود؛ وگرنه کش آفلاین پروژه
  روی دامنهٔ کارن سافت باقی می‌ماند. پیوند `manifest` هم برداشته می‌شود.
- عبارت «گیت‌هاب پیجز» در متن‌های حالت ایستا با «نسخهٔ نمایشی» جایگزین شده است.
- تصویر شاخص (`/images/portfolio/digikaren.jpg`) و آیکون (`/images/clients/digikaren/digikaren-mark.png`)
  از فایل‌های برند خود پروژه ساخته شده‌اند.
