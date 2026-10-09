export const SITE = {
  name: "کارن سافت",
  nameEn: "Karen Soft",
  tagline: "فناوری پیچیده، رشد ساده.",
  description:
    "کارن سافت در قزوین وب‌سایت و نرم‌افزار مدیریتی اختصاصی برای کسب‌وکارها طراحی می‌کند؛ خدمات توسعه، اتوماسیون و دموهای زنده پیش از همکاری.",
  url: "https://karen-soft.ir",
  phone: "+989152521166",
  phoneDisplay: "۰۹۱۵۲۵۲۱۱۶۶",
  email: "info@karen-soft.ir",
  address: "قزوین، زیباشهر، کارن سافت",
  city: "قزوین",
  founder: "حسین رحمانی",
  socials: {
    telegram: "https://t.me/KarenSoftOfficial",
    instagram: "https://instagram.com/karen_soft.ir",
  },
  workingHours: {
    satWed: "۹:۰۰ - ۱۸:۰۰",
    thu: "۹:۰۰ - ۱۳:۰۰",
    fri: "تعطیل",
  },
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** مگامنوی زیرمenu باز می‌شود */
  mega?: "solutions" | "products" | "demo";
  /** نقطۀ سبز «فعال بودن» */
  highlight?: boolean;
  /** برچسب کوچک کنار آیتم منو */
  badge?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "خدمات", href: "/services" },
  { label: "راهکارها", href: "/solutions", mega: "solutions" as const },
  { label: "محصولات", href: "/products", mega: "products" as const },
  { label: "دموی زنده", href: "/demo", mega: "demo" as const, highlight: true },
  { label: "کارن چاپ", href: "/print", badge: "چاپخانه" as const },
  { label: "نمونه‌کارها", href: "/portfolio" },
  { label: "مجله", href: "/blog" },
  { label: "درباره ما", href: "/about" },
];

/** پیوندهای بخش کارن چاپ (زیرمجموعۀ چاپ کارن سافت) */
export const CHAP_LINKS = [
  { label: "خانۀ کارن چاپ", href: "/print" },
  { label: "خدمات چاپ و مهر", href: "/print/services" },
  { label: "ثبت سفارش آنلاین", href: "/print/order" },
  { label: "نمونه‌کارها", href: "/print/portfolio" },
  { label: "سوالات متداول", href: "/print/faq" },
  { label: "تماس با کارن چاپ", href: "/print/contact" },
] as const;

export const FOOTER_RESOURCES = [
  { label: "مستندات", href: "/docs" },
  { label: "تغییرات محصول", href: "/changelog" },
  { label: "نقشه راه", href: "/roadmap" },
  { label: "وضعیت سرویس‌ها", href: "/status" },
  { label: "فرصت‌های شغلی", href: "/about/careers" },
  { label: "تماس با ما", href: "/contact" },
];

export const FOOTER_LEGAL = [
  { label: "حریم خصوصی", href: "/privacy" },
  { label: "شرایط استفاده", href: "/terms" },
];

export const SERVICES = [
  {
    slug: "web",
    title: "طراحی و توسعه وب",
    icon: "Globe",
    desc: "وب‌سایت‌های سریع، سئوپسند و واکنش‌گرا با معماری مدرن و امتیاز کامل لایت‌هاوس.",
    bullets: ["طراحی رابط کاربری اختصاصی", "فروشگاه اینترنتی", "سئوی فنی", "سرعت و Core Web Vitals"],
  },
  {
    slug: "software",
    title: "نرم‌افزار اختصاصی",
    icon: "Boxes",
    desc: "نرم‌افزارهای مدیریتی دقیقاً متناسب با فرایندهای کسب‌وکار شما؛ از تحلیل تا پشتیبانی.",
    bullets: ["تحلیل فرایند", "طراحی پایگاه داده", "توسعه تحت وب و ویندوز", "آموزش و استقرار"],
  },
  {
    slug: "automation",
    title: "اتوماسیون هوشمند",
    icon: "Workflow",
    desc: "حذف کارهای تکراری با اتوماسیون اداری، پیامک، گزارش‌سازی خودکار و دستیارهای هوش مصنوعی.",
    bullets: ["اتوماسیون اداری", "یکپارچه‌سازی سرویس‌ها", "گزارش‌های خودکار", "دستیار هوش مصنوعی"],
  },
  {
    slug: "security",
    title: "امنیت سایبری",
    icon: "ShieldCheck",
    desc: "ارزیابی امنیتی، سخت‌سازی سرور، پشتیبان‌گیری و پایش مداوم زیرساخت.",
    bullets: ["تست نفوذ", "سخت‌سازی سرور", "پشتیبان‌گیری خودکار", "پایش ۲۴/۷"],
  },
] as const;

export const PROCESS_STEPS = [
  { n: "۰۱", title: "کشف و تحلیل", desc: "جلسه کشف، درک فرایندها و تعریف دقیق دامنه پروژه." },
  { n: "۰۲", title: "طراحی تجربه", desc: "وایرفریم، پروتوتایپ تعاملی و تأیید طراحی پیش از کدنویسی." },
  { n: "۰۳", title: "توسعه و تست", desc: "توسعه چابک با تحویل دو‌هفته‌ای، تست خودکار و بازبینی کد." },
  { n: "۰۴", title: "استقرار و رشد", desc: "استقرار، آموزش تیم، پایش عملکرد و بهبود مستمر." },
];

export const FAQS = [
  {
    q: "یک پروژه معمولاً چقدر طول می‌کشد؟",
    a: "وب‌سایت شرکتی بین ۳ تا ۵ هفته و نرم‌افزار مدیریتی اختصاصی بین ۸ تا ۱۶ هفته زمان می‌برد. پس از جلسه کشف، زمان‌بندی دقیق و مرحله‌بندی‌شده ارائه می‌شود.",
  },
  {
    q: "آیا می‌توانم قبل از خرید محصول را امتحان کنم؟",
    a: "بله. هر یازده محصول کارن سافت دموی زنده دارند؛ بدون نصب و بدون ثبت‌نام می‌توانید در همین مرورگر همه ماژول‌ها را تست کنید.",
  },
  {
    q: "پشتیبانی بعد از تحویل چگونه است؟",
    a: "سه ماه پشتیبانی رایگان شامل رفع اشکال و آموزش، و پس از آن قراردادهای پشتیبانی ماهانه با زمان پاسخ تضمین‌شده ارائه می‌شود.",
  },
  {
    q: "مالکیت کد و داده‌ها با کیست؟",
    a: "تمام کد منبع، دارایی‌های طراحی و داده‌ها متعلق به شماست و در پایان پروژه به‌صورت کامل تحویل داده می‌شود.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "کارن سافت فقط یک نرم‌افزار تحویل نداد؛ کل فرایند دفتر ما را بازطراحی کرد. الان زمان تنظیم پرونده‌ها یک‌سوم قبل است.",
    name: "دفتر وکالت وکالهوم",
    role: "مدیر دفتر",
  },
  {
    quote: "سامانه مدیریت چاپ روتوگراور ضایعات ما را ۱۸٪ کاهش داد و گزارش بهای تمام‌شده لحظه‌ای شد.",
    name: "چاپخانه کارن‌چاپ",
    role: "مدیر تولید",
  },
];

export const STATS = [
  { value: "۱۲۰+", label: "پروژه تحویل‌شده" },
  { value: "۱۱", label: "محصول نرم‌افزاری" },
  { value: "۹۸٪", label: "رضایت مشتریان" },
  { value: "۹ سال", label: "تجربه اجرایی" },
];

/**
 * شناسهٔ وب‌سایت Crisp برای گفت‌وگوی آنلاین (عمومی و غیرمحرمانه).
 * با NEXT_PUBLIC_CRISP_WEBSITE_ID می‌توان آن را تغییر داد؛ مقدار خالی، چت را غیرفعال می‌کند.
 */
export const CRISP_WEBSITE_ID: string = (
  process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ?? "ffafdfcf-e510-45d0-a026-4e964ad420ee"
).trim();
