/** هویت و اطلاعات کارن چاپ — زیرمجموعۀ چاپ کارن سافت */

export const CHAP = {
  name: "کارن چاپ",
  nameEn: "KAREN CHAP",
  motto: "PRINT • STAMP • BINDING",
  tagline: "چاپ، مهر و صحافی با استاندارد استودیویی",
  description:
    "کارن چاپ در الوندِ قزوین، خدمات چاپ افست و دیجیتال، کارت ویزیت و تراکت، بنر، ساخت مهر، صحافی پایان‌نامه و کتاب و هدایای تبلیغاتی را با ثبت سفارش آنلاین ارائه می‌دهد.",
  url: "https://karen-soft.ir/print",
  path: "/print",
  phone: "۰۹۱۹۲۸۶۵۰۰۳",
  tel: "+989192865003",
  whatsapp: "989192865003",
  email: "info@karen-soft.ir",
  manager: "داود زلفعلیان",
  locality: "الوند",
  region: "استان قزوین",
  country: "ایران",
  streetAddress: "شهرصنعتی البرز، میدان لاله به چهارراه بسیج، روبه‌روی خیابان آزادی",
  address: "قزوین، شهرصنعتی البرز، الوند، میدان لاله به چهارراه بسیج، روبه‌روی خیابان آزادی",
  hours: "پذیرش آنلاین ۲۴/۷ · حضوری شنبه تا پنجشنبه ۹ الی ۱۹",
  maps:
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("قزوین، شهرصنعتی البرز، الوند، میدان لاله"),
  logo: "/images/print/logo-chap.png",
  heroImage: "/images/chapkhaneh.png",
} as const;

export const CHAP_STATS = [
  { value: 5200, suffix: "+", label: "سفارش موفق" },
  { value: 12, suffix: " سال", label: "تجربۀ چاپخانه‌ای" },
  { value: 98, suffix: "٪", label: "رضایت مشتری" },
  { value: 7, suffix: "", label: "خانوادۀ خدمت" },
] as const;

/** چرا کارن چاپ — سه ستون تمایز */
export const CHAP_WHY = [
  {
    title: "پیکربند دقیق، نه یک فرم مبهم",
    desc: "فرم سفارش همان پرسش‌هایی را می‌پرسد که برای چاپِ آن محصول لازم است؛ از گراماژ کاغذ تا نوع روکش.",
    icon: "sliders",
  },
  {
    title: "بهترین مواد و تجهیزات",
    desc: "کاغذ اصل، مرکب باکیفیت و دستگاه‌های به‌روز افست و دیجیتال؛ نتیجه در نسخه اول تأیید می‌شود.",
    icon: "shield",
  },
  {
    title: "تحویل سرِ وقت",
    desc: "زمان تحویل برای هر محصول شفاف اعلام می‌شود و سفارش‌های فوری در همان روز انجام می‌شوند.",
    icon: "clock",
  },
] as const;

export const CHAP_TICKER = [
  "چاپ افست",
  "چاپ دیجیتال",
  "مهر لیزری",
  "صحافی گالینگور",
  "ماگ سابلیمیشن",
  "تیشرت چاپی",
  "بنر و فلکس",
  "کارت ویزیت",
  "تراکت و بروشور",
  "ست اداری",
  "تقدیرنامه طلاکوب",
  "لیبل و استیکر",
] as const;

export const CHAP_NAV = [
  { label: "خانه", href: "/print" },
  { label: "خدمات", href: "/print/services" },
  { label: "نمونه‌کارها", href: "/print/portfolio" },
  { label: "درباره ما", href: "/print/about" },
  { label: "سوالات متداول", href: "/print/faq" },
  { label: "تماس", href: "/print/contact" },
] as const;

/** خدمات نرم‌افزاری که کنار چاپ به کارن چاپ اضافه می‌شوند */
export const CHAP_SOFTWARE_HOOK = {
  title: "چاپخانه‌ی دیجیتال، با نرم‌افزار کارن سافت",
  desc: "کارن چاپ زیرمجموعۀ کارن سافت است؛ به همین دلیل سفارش‌ها فقط در فرم ثبت نمی‌شوند، بلکه در سامانۀ مدیریت چاپ روتوگراور برنامه‌ریزی، تولید و گزارش می‌شوند.",
  cta: { label: "دموی سامانۀ مدیریت چاپ", href: "/demo/printing-management" },
} as const;
