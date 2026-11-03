# نسخه‌های نمایشی خودمیزبان (`/demos/`)

پروژه‌های نمونه‌کار، به‌صورت فایل ایستا روی **همین دامنه** میزبانی می‌شوند و از
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
| Academy_Hanis (آکادمی زیبایی هانیس) | `/demos/hanis/` | `/portfolio/hanis` | HTML/CSS/JS خالص + ویدیو و چند زیرپوشهٔ صفحه |
| Digikaren (فروشگاه + پنل ادمین) | `/demos/digikaren/` | `/portfolio/digikaren` | Vite با `--mode pages` و `--base=/demos/digikaren/`؛ service worker حذف می‌شود |
| Leyla-abkeh (دفتر وکالت لیلا آبکه) | `/demos/leyla-abkeh/` | `/portfolio/leyla-abkeh` | Vite + prerender؛ `VITE_BASE_PATH=demos/leyla-abkeh/` و `VITE_FORM_MODE=static`، سپس حذف `admin/`، `robots.txt`، `sitemap.xml` و افزودن `noindex` به همهٔ صفحات |

## بازتولید

```bash
# کلون مخزن‌ها در /tmp/repos (نام پوشه‌ها: Demo3 afshin RedLine Demo Demo1 Gym Karenwood musician Digikaren Academy_Hanis)
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

## هانیس: نمونه‌کار چندصفحه‌ای

آکادمی زیبایی هانیس یک سایت تک‌صفحه‌ای ساده نیست؛ ۲۵ فایل HTML در پوشه‌های
`courses/`، `magazine/`، `portfolio/` و `services/` دارد و همه با مسیرهای نسبی
(`courses/`, `assets/…`) به هم لینک شده‌اند. برای همین بدون build و بدون تغییر مسیرها
داخل `public/demos/hanis/` کپی می‌شود:

- نشانی‌های مطلق `https://rahmaniho.github.io/Academy_Hanis/` در همهٔ HTML/JS/CSS
  با `/demos/hanis/` جایگزین می‌شوند (canonical، OG، JSON-LD، sitemap و `data-base`).
- `robots.txt` و `sitemap.xml` خود پروژه کپی نمی‌شوند؛ هدر `X-Robots-Tag: noindex`
  سایت روی کل `/demos/` اعمال است و متای robots صفحه‌ها هم `noindex, nofollow` شد.
- پوشهٔ صفحه‌ها با بازنویسی موجود `next.config.ts` (`/demos/:path*` → `index.html`)
  کار می‌کند، بنابراین `/demos/hanis/courses/makeup/` همان صفحهٔ دوره را می‌دهد.
- سه ویدیوی پس‌زمینه (`assets/InShot_*.mp4`، حدود ۱۴ مگابایت) دست‌نخورده ماندند
  تا حس واقعی سایت حفظ شود؛ حجم کل پوشه حدود ۱۸ مگابایت است.
- تصویر شاخص `/images/portfolio/hanis.jpg` و آیکون `/images/clients/hanis/hanis-mark.png`
  از هیرو و لوگوی خود پروژه ساخته شده‌اند.


## کارن‌وود: پچ تکرارپذیر منبع و بازسازی

خروجی ایستای کارن‌وود از مخزن بالادستی `rahmaniho/Karenwood` ساخته می‌شود. برای
رفع پایدار hydration و دسترس‌پذیری، تغییرات به‌صورت پچ در
`scripts/demo-patches/karenwood-stage2.patch` نگهداری می‌شوند و هنگام build روی
سورس اعمال می‌شوند (نه روی خروجی کامپایل‌شده):

```bash
git clone https://github.com/rahmaniho/Karenwood .cache/demo-sources/Karenwood
DEMO_SRC_DIR=/home/user/karen-soft/.cache/demo-sources \
  node scripts/build-demos.mjs --only karenwood
npm run patch:demos
# سرور Next را پس از بازسازی دموها restart کنید؛ next start فهرست public/ را هنگام بالا آمدن کش می‌کند.
```

`applyDemoPatch` ابتدا معکوس‌بودن پچ را بررسی می‌کند؛ اگر قبلاً اعمال شده باشد از
آن می‌گذرد، وگرنه با `git apply --check` اعمال می‌کند و در صورت drift خطا می‌دهد.

خلاصهٔ پچ:

- `KarenSoftCredit.tsx`: انیمیشن‌ها فقط پس از mount و وقتی کاربر reduced-motion
  نخواسته فعال می‌شوند (`mounted && !reduceMotion`). پیش از آن، همان درخت SSR
  رندر می‌شود؛ بدون `suppressHydrationWarning`. این کار خطای پایدار React #418/#423
  را حذف کرد (۱۶/۱۶ بارگذاری، ۰ خطا).
- `LanguageSwitcher.tsx`: نام دسترس‌پذیر با متن دیدنی هم‌تراز شد (`sr-only` +
  `aria-hidden` روی `EN`/`فا`).
- `TestimonialsSection.tsx`: نقطه‌های اسلایدر ۲۴×۲۴ inline با `aria-pressed` و
  برچسب یکتا.
- چهار section: eyebrowهای برنزی به `text-bronze-700 dark:text-bronze` برای کنتراست.
- `globals.css`: قانون لایه‌نشستهٔ `header a, footer a` با `min-height:24px` برای
  هدف‌های لمسی.

نتیجهٔ axe داخل iframe روی `/portfolio/karenwood` در 320/1440 × روشن/تاریک:
**۰ نقض، ۰ خطای صفحه** (تست‌های `tests/e2e/hydration.spec.ts`).

## دسترس‌پذیری قاب پیش‌نمایش

- `components/site/demo-frame.tsx`: حالت تمام‌صفحه اکنون `role="dialog"` و
  `aria-modal="true"` دارد؛ فوکوس هنگام باز شدن به دکمهٔ بستن می‌رود، Tab/Shift+Tab
  بین دکمهٔ بستن، پیوند «صفحهٔ کامل» و iframe می‌چرخد، Esc می‌بندد و فوکوس را به
  دکمهٔ اولیه برمی‌گرداند. توضیح قاب با `aria-describedby` به dialog متصل است و
  iframe `referrerPolicy` دارد.
- `components/site/demo-tabs.tsx`: تب‌ها roving tabindex، جهت‌های RTL
  (ArrowRight/ArrowLeft)، Home/End و `role="tabpanel"` با `aria-labelledby` دارند.
- `scripts/a11y-routes.mjs`: گزینه‌های `--include-frames`، `--strict-runtime` و
  `--settle <ms>`؛ خطاهای سند اصلی (`errors`) از خطاهای دمو (`demoErrors`) جدا
  گزارش می‌شوند و خطاهای console مربوط به hydration React نیز ثبت می‌شوند.

## لایهٔ دسترس‌پذیری دموها (Stage 1.2)

خروجی بعضی دموها در حالت اولیه، کنتراست کافی یا نام دسترس‌پذیر مطابق WCAG 2.2 AA
نداشت. به‌جای دست‌کاری بسته‌های فشردهٔ upstream، یک لایهٔ نگهداری‌پذیر و idempotent
به `scripts/patch-demo-assets.mjs` اضافه شده است:

- برای هر دمو، در صورت نیاز، فایل‌های `assets/karensoft-a11y.css` و/یا
  `assets/karensoft-a11y.js` ساخته می‌شوند.
- به هر فایل HTML همان دمو (از جمله همهٔ صفحه‌های Gym و `redline/404.html`) یک
  `<link>` یا `<script>` با نشانگر `data-karensoft-a11y="1"` و مسیر نسبی
  `assets/karensoft-a11y.*` تزریق می‌شود. تزریق فقط یک‌بار انجام می‌شود و اجرای
  دوبارهٔ اسکریپت، فایل‌ها را بی‌دلیل تغییر نمی‌دهد.
- اصلاحات فقط دسترس‌پذیری هستند: کنتراست متن‌های کم‌رنگ در حالت روشن/تاریک،
  حذف `aria-label`هایی که با متن دیدنی برابر نیستند، نقش `img` برای ستاره‌های
  تزئینی، هدف‌های لمسی ۲۴ پیکسلی، `inert` برای کشوی موبایل بسته، و اصلاح
  ساختار `dl` در demo1. رنگ برند، قیمت‌ها و اعداد کسب‌وکاری تغییر نمی‌کنند.
- اگر دمویی صفحهٔ HTML تودرتو اضافه کند، مسیر نسبی `assets/…` باید بازبینی شود؛
  در وضعیت فعلی همهٔ صفحه‌های تزریق‌شده در ریشهٔ همان دمو هستند.

```bash
npm run build:demos     # بازساخت خروجی دموها از مخزن‌های upstream
npm run patch:demos     # اعمال وصله‌های امنیتی/دسترس‌پذیری؛ بعد از هر build:demos
npm run audit:a11y:demos -- --base http://127.0.0.1:3000
```

`audit:a11y:demos` فقط مسیرهای `/portfolio/<slug>` دارای دموی داخلی را انتخاب
می‌کند و axe را داخل iframe اجرا می‌کند (۱۶ دمو × ۲ عرض × ۲ تم = ۶۴ بررسی).
این دروازه در CI نیز اجرا می‌شود. پس از بازساخت دموها یا ساخت Next، سرور
`next start` را yeniden راه‌اندازی کنید؛ فهرست فایل‌های `public/` در حافظهٔ سرور
کش می‌شود و فایل تازه‌ساخته‌شده ممکن است 404 بدهد.
