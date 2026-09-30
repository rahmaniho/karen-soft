export type IndustryCategory =
  | "beauty"
  | "food"
  | "legal"
  | "realestate"
  | "fitness"
  | "medical"
  | "education"
  | "travel"
  | "retail"
  | "construction"
  | "marketing"
  | "saas";

export type BlockType =
  | "hero"
  | "stats"
  | "services"
  | "menu"
  | "gallery"
  | "team"
  | "pricing"
  | "testimonials"
  | "booking"
  | "faq"
  | "cta"
  | "logos"
  | "process"
  | "contact";

export interface Palette {
  /** page background */
  bg: string;
  /** raised surface */
  surface: string;
  /** primary text */
  text: string;
  /** secondary text */
  muted: string;
  /** brand primary */
  primary: string;
  /** brand secondary / accent */
  secondary: string;
  /** hairline */
  border: string;
  /** text on primary */
  onPrimary: string;
  /** decorative gradient */
  gradient: string;
  dark: boolean;
}

export interface IndustryItem {
  title: string;
  desc: string;
  meta?: string;
  price?: string;
}

export interface Industry {
  slug: string;
  name: string;
  category: IndustryCategory;
  categoryLabel: string;
  brandName: string;
  tagline: string;
  description: string;
  aesthetic: string;
  displayFont: "serif" | "sans" | "legacy";
  motion: "calm" | "energetic" | "elegant" | "playful" | "precise";
  palette: Palette;
  blocks: BlockType[];
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: { value: string; label: string }[];
  services: IndustryItem[];
  serviceHeading: string;
  gallery: { title: string; hue: string }[];
  galleryHeading: string;
  team: { name: string; role: string; meta: string }[];
  teamHeading: string;
  pricing: { name: string; price: string; period: string; features: string[]; featured?: boolean }[];
  pricingHeading: string;
  testimonials: { quote: string; name: string; role: string }[];
  faq: { q: string; a: string }[];
  process: { title: string; desc: string }[];
  logos: string[];
  booking: { heading: string; desc: string; fields: string[]; submit: string };
  contact: { address: string; phone: string; hours: string };
}

const rial = (n: string) => `${n} تومان`;

export const INDUSTRY_CATEGORIES: { id: IndustryCategory | "all"; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "beauty", label: "زیبایی" },
  { id: "food", label: "غذا" },
  { id: "legal", label: "حقوقی" },
  { id: "realestate", label: "املاک" },
  { id: "fitness", label: "تناسب اندام" },
  { id: "medical", label: "پزشکی" },
  { id: "education", label: "آموزش" },
  { id: "travel", label: "سفر" },
  { id: "retail", label: "فروشگاهی" },
  { id: "construction", label: "ساختمانی" },
  { id: "marketing", label: "بازاریابی" },
  { id: "saas", label: "SaaS" },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "beauty-salon",
    name: "سالن زیبایی و اسپا",
    category: "beauty",
    categoryLabel: "زیبایی",
    brandName: "سالن زیبایی سحر",
    tagline: "زیبایی، آرامش، اصالت",
    description: "طراحی لطیف با صورتی‌های پودری و طلایی، تایپوگرافی سریف و ویجت رزرو نوبت.",
    aesthetic: "صورتی پودری · طلایی · سریف ظریف",
    displayFont: "serif",
    motion: "elegant",
    palette: {
      bg: "#fdf7f4",
      surface: "#ffffff",
      text: "#3a2b2b",
      muted: "#8a7370",
      primary: "#c98b8b",
      secondary: "#c9a227",
      border: "#efe0da",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#f7e3dd,#efd6c6 55%,#e8c9b4)",
      dark: false,
    },
    blocks: ["hero", "services", "gallery", "team", "testimonials", "booking", "contact"],
    hero: {
      badge: "۱۲ سال تجربه در قزوین",
      title: "آرامش و زیبایی،",
      highlight: "در یک قرار ملاقات",
      subtitle:
        "خدمات تخصصی پوست، مو، ناخن و اسپا با متخصصان مجرب و محصولات اورجینال. نوبت خود را در کمتر از یک دقیقه رزرو کنید.",
      primaryCta: "رزرو نوبت آنلاین",
      secondaryCta: "مشاهده گالری",
    },
    stats: [
      { value: "۱۲", label: "سال تجربه" },
      { value: "۸", label: "متخصص" },
      { value: "۴٬۵۰۰+", label: "مشتری راضی" },
      { value: "۴.۹", label: "امتیاز گوگل" },
    ],
    serviceHeading: "خدمات سالن",
    services: [
      { title: "کوتاهی و فرم مو", desc: "طراحی فرم متناسب با فرم صورت", price: rial("۴۵۰٬۰۰۰") },
      { title: "رنگ و مش", desc: "رنگ‌های اورجینال با تست آلرژی", price: rial("۱٬۸۰۰٬۰۰۰") },
      { title: "کراتینه و احیا", desc: "صاف و درخشان تا ۶ ماه", price: rial("۲٬۹۰۰٬۰۰۰") },
      { title: "میکاپ عروس", desc: "پکیج کامل با تست گریم", price: rial("۹٬۵۰۰٬۰۰۰") },
      { title: "کاشت و طراحی ناخن", desc: "ژل، پودر و طراحی اختصاصی", price: rial("۱٬۲۰۰٬۰۰۰") },
      { title: "پاکسازی پوست", desc: "هیدرافیشیال و میکرودرم", price: rial("۱٬۵۰۰٬۰۰۰") },
      { title: "میکروبلیدینگ ابرو", desc: "طراحی طبیعی تار به تار", price: rial("۳٬۲۰۰٬۰۰۰") },
      { title: "ماساژ و اسپا", desc: "ریلکسیشن ۹۰ دقیقه‌ای", price: rial("۱٬۹۰۰٬۰۰۰") },
    ],
    galleryHeading: "نمونه کارها",
    gallery: [
      { title: "بالیاژ عسلی", hue: "linear-gradient(135deg,#e7c6a5,#c98b8b)" },
      { title: "میکاپ عروس", hue: "linear-gradient(135deg,#f3dcd6,#d8a7a7)" },
      { title: "کاشت ناخن", hue: "linear-gradient(135deg,#f6e2c8,#c9a227)" },
      { title: "کراتینه مو", hue: "linear-gradient(135deg,#e5d3c3,#a98070)" },
      { title: "پاکسازی پوست", hue: "linear-gradient(135deg,#f7eee8,#e0c3b3)" },
      { title: "شینیون", hue: "linear-gradient(135deg,#dfc2b6,#8a6a63)" },
    ],
    teamHeading: "متخصصان ما",
    team: [
      { name: "سحر نجفی", role: "مدیر و متخصص مو", meta: "۱۲ سال تجربه" },
      { name: "مریم کاظمی", role: "متخصص پوست", meta: "۸ سال تجربه" },
      { name: "الهام رستمی", role: "طراح ناخن", meta: "۶ سال تجربه" },
      { name: "نگین صادقی", role: "میکاپ آرتیست", meta: "۹ سال تجربه" },
    ],
    pricingHeading: "پکیج‌های ویژه",
    pricing: [
      { name: "پکیج پایه", price: "۱٬۹۰۰٬۰۰۰", period: "هر جلسه", features: ["کوتاهی مو", "پاکسازی سبک", "اصلاح ابرو"] },
      { name: "پکیج عروس", price: "۱۴٬۵۰۰٬۰۰۰", period: "کامل", features: ["گریم و شینیون", "کاشت ناخن", "پاکسازی", "تست گریم"], featured: true },
      { name: "پکیج اسپا", price: "۳٬۴۰۰٬۰۰۰", period: "۱۲۰ دقیقه", features: ["ماساژ ریلکسی", "ماسک صورت", "پدیکور"] },
    ],
    testimonials: [
      { quote: "بهترین تجربه‌ای که از یک سالن زیبایی داشتم؛ هم کیفیت کار و هم برخورد عالی بود.", name: "نسیم ط.", role: "مشتری" },
      { quote: "رزرو آنلاین واقعاً کارم را راحت کرد، دیگر پشت تلفن منتظر نمی‌مانم.", name: "پریسا ک.", role: "مشتری" },
      { quote: "کراتینه‌ای که انجام دادند بعد از پنج ماه هنوز عالیه.", name: "الهه م.", role: "مشتری" },
    ],
    faq: [
      { q: "برای رزرو نوبت باید بیعانه بدهم؟", a: "برای خدمات بالای دو میلیون تومان، ۲۰٪ بیعانه آنلاین دریافت می‌شود که از مبلغ نهایی کسر خواهد شد." },
      { q: "محصولات مصرفی اورجینال هستند؟", a: "بله، تمام محصولات دارای کد اصالت هستند و پیش از استفاده به شما نشان داده می‌شوند." },
    ],
    process: [
      { title: "مشاوره", desc: "بررسی وضعیت مو و پوست شما" },
      { title: "طراحی", desc: "انتخاب سبک متناسب با چهره" },
      { title: "اجرا", desc: "انجام خدمت توسط متخصص" },
      { title: "مراقبت", desc: "آموزش نگهداری در منزل" },
    ],
    logos: ["لورآل", "کراستاز", "اولاپلکس", "شوارتزکف", "ویشی"],
    booking: {
      heading: "رزرو نوبت",
      desc: "زمان دلخواهتان را انتخاب کنید؛ تأیید نوبت پیامک می‌شود.",
      fields: ["نام و نام خانوادگی", "شماره تماس", "خدمت موردنظر", "تاریخ و ساعت"],
      submit: "ثبت درخواست نوبت",
    },
    contact: { address: "قزوین، بلوار زیباشهر، مجتمع نگین، طبقه ۲", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا پنجشنبه ۹ تا ۲۰" },
  },
  {
    slug: "restaurant",
    name: "رستوران و کافه",
    category: "food",
    categoryLabel: "غذا",
    brandName: "رستوران فنری",
    tagline: "طعمی که به یاد می‌ماند",
    description: "فضای تیره و گرم، آمبر درخشان و منوی دسته‌بندی‌شده با ویجت رزرو میز.",
    aesthetic: "تیره و گرم · آمبر · تایپوگرافی درشت",
    displayFont: "serif",
    motion: "elegant",
    palette: {
      bg: "#100c08",
      surface: "#1a140d",
      text: "#f6efe4",
      muted: "#b3a189",
      primary: "#f59e0b",
      secondary: "#e2703a",
      border: "#2c2218",
      onPrimary: "#1a140d",
      gradient: "linear-gradient(140deg,#3a2a15,#1a140d 60%,#100c08)",
      dark: true,
    },
    blocks: ["hero", "stats", "menu", "gallery", "team", "testimonials", "booking", "contact"],
    hero: {
      badge: "رزرو میز برای امشب باز است",
      title: "آشپزی اصیل ایرانی،",
      highlight: "با روایتی امروزی",
      subtitle:
        "هر شب از ساعت ۱۸ تا ۲۴ در کنار شما هستیم؛ با منوی فصلی، گوشت تازه روزانه و نان گرم دست‌ساز.",
      primaryCta: "رزرو میز",
      secondaryCta: "مشاهده منو",
    },
    stats: [
      { value: "۱۹۸۹", label: "سال تأسیس" },
      { value: "۴۲", label: "آیتم منو" },
      { value: "۲۸", label: "میز" },
      { value: "۴.۸", label: "امتیاز مشتریان" },
    ],
    serviceHeading: "منوی امشب",
    services: [
      { title: "چلوکباب سلطانی", desc: "کباب برگ و کوبیده با برنج دم‌سیاه", meta: "غذای اصلی", price: rial("۴۸۵٬۰۰۰") },
      { title: "خورش فسنجان", desc: "گردوی تازه و انار ارگانیک", meta: "غذای اصلی", price: rial("۳۹۰٬۰۰۰") },
      { title: "باقالی‌پلو با ماهیچه", desc: "ماهیچه گوسفندی ۶ ساعت آرام‌پز", meta: "غذای اصلی", price: rial("۵۲۰٬۰۰۰") },
      { title: "میرزاقاسمی", desc: "بادمجان دودی و تخم‌مرغ محلی", meta: "پیش‌غذا", price: rial("۱۸۵٬۰۰۰") },
      { title: "کشک بادمجان", desc: "کشک سنتی و نعناع داغ", meta: "پیش‌غذا", price: rial("۱۶۵٬۰۰۰") },
      { title: "سالاد فصل شف", desc: "سبزیجات تازه با سس مخصوص", meta: "پیش‌غذا", price: rial("۱۴۵٬۰۰۰") },
      { title: "بستنی سنتی زعفرانی", desc: "با خامه و پسته کرمان", meta: "دسر", price: rial("۱۳۵٬۰۰۰") },
      { title: "شربت به‌لیمو", desc: "دم‌نوش خانگی سرد", meta: "نوشیدنی", price: rial("۹۵٬۰۰۰") },
    ],
    galleryHeading: "از آشپزخانه ما",
    gallery: [
      { title: "میز شام", hue: "linear-gradient(135deg,#4a3418,#1a140d)" },
      { title: "کباب روی آتش", hue: "linear-gradient(135deg,#a8501a,#2a1a0c)" },
      { title: "دسر خانگی", hue: "linear-gradient(135deg,#d8a548,#5a3c14)" },
      { title: "فضای رستوران", hue: "linear-gradient(135deg,#2b2218,#0f0b07)" },
      { title: "نان دست‌ساز", hue: "linear-gradient(135deg,#c08a3e,#3a2a15)" },
      { title: "سفره ایرانی", hue: "linear-gradient(135deg,#8a4a22,#1a140d)" },
    ],
    teamHeading: "تیم آشپزخانه",
    team: [
      { name: "استاد رضا فنری", role: "سرآشپز", meta: "۳۰ سال تجربه" },
      { name: "سعید آذرنیا", role: "شف کباب", meta: "۱۵ سال تجربه" },
      { name: "لیلا مرادی", role: "شیرینی‌پز", meta: "۱۰ سال تجربه" },
      { name: "کامران یوسفی", role: "مدیر سالن", meta: "۱۲ سال تجربه" },
    ],
    pricingHeading: "منوی مناسبتی",
    pricing: [
      { name: "میز دونفره", price: "۱٬۲۵۰٬۰۰۰", period: "شام کامل", features: ["دو پیش‌غذا", "دو غذای اصلی", "دسر"] },
      { name: "مهمانی خانوادگی", price: "۴٬۹۰۰٬۰۰۰", period: "۶ نفر", features: ["سفره کامل", "نوشیدنی نامحدود", "دسر ویژه", "میز رزرو شده"], featured: true },
      { name: "رزرو سالن خصوصی", price: "۱۸٬۰۰۰٬۰۰۰", period: "تا ۳۰ نفر", features: ["منوی اختصاصی", "سرویس اختصاصی", "موسیقی زنده"] },
    ],
    testimonials: [
      { quote: "فسنجانشان دقیقاً طعم خانه مادربزرگ را دارد؛ بی‌نظیر.", name: "امیر ح.", role: "مهمان" },
      { quote: "فضای گرم و سرویس سریع، برای مهمانی کاری عالی بود.", name: "شرکت پارس‌راد", role: "مشتری سازمانی" },
      { quote: "رزرو آنلاین میز و تأیید پیامکی خیلی حرفه‌ای بود.", name: "نگار س.", role: "مهمان" },
    ],
    faq: [
      { q: "امکان رزرو برای مراسم وجود دارد؟", a: "بله، سالن خصوصی تا ۳۰ نفر ظرفیت دارد و منوی اختصاصی برای مراسم تنظیم می‌شود." },
      { q: "سرویس بیرون‌بر دارید؟", a: "بله، تمام آیتم‌های منو با بسته‌بندی حرارتی برای بیرون‌بر ارائه می‌شود." },
    ],
    process: [
      { title: "رزرو", desc: "انتخاب میز و ساعت" },
      { title: "پذیرش", desc: "استقبال و راهنمایی به میز" },
      { title: "سرو", desc: "غذای تازه در کمتر از ۲۰ دقیقه" },
      { title: "بدرقه", desc: "تسویه سریع و بازخورد" },
    ],
    logos: ["دیجی‌فود", "اسنپ‌فود", "تریپ‌ادوایزر", "فودی‌ایران"],
    booking: {
      heading: "رزرو میز",
      desc: "میز خود را برای امشب یا روزهای آینده رزرو کنید.",
      fields: ["نام", "شماره تماس", "تعداد نفرات", "تاریخ و ساعت"],
      submit: "رزرو میز",
    },
    contact: { address: "قزوین، خیابان فردوسی، پلاک ۸۸", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "هر روز ۱۸ تا ۲۴" },
  },
  {
    slug: "law-firm",
    name: "دفتر وکالت",
    category: "legal",
    categoryLabel: "حقوقی",
    brandName: "مؤسسه حقوقی وکالهوم",
    tagline: "حق شما، دفاع ما",
    description: "سرمه‌ای اقتدارمند با طلایی گرم، تایپوگرافی سریف و بلوک مشاوره رایگان.",
    aesthetic: "سرمه‌ای · طلایی · سریف رسمی",
    displayFont: "serif",
    motion: "calm",
    palette: {
      bg: "#f8f7f4",
      surface: "#ffffff",
      text: "#111d33",
      muted: "#5b6880",
      primary: "#15294d",
      secondary: "#c9a96e",
      border: "#e3e1da",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#15294d,#1d3a68 60%,#0e1c34)",
      dark: false,
    },
    blocks: ["hero", "services", "stats", "team", "testimonials", "faq", "booking", "contact"],
    hero: {
      badge: "مشاوره اولیه رایگان",
      title: "دفاع تخصصی از",
      highlight: "حقوق شما",
      subtitle:
        "تیمی از وکلای پایه‌یک دادگستری با تمرکز بر دعاوی ملکی، خانواده، کیفری و تجاری. پرونده شما را از ابتدا تا اجرای حکم همراهی می‌کنیم.",
      primaryCta: "درخواست مشاوره رایگان",
      secondaryCta: "حوزه‌های تخصصی",
    },
    stats: [
      { value: "۱٬۲۰۰+", label: "پرونده موفق" },
      { value: "۶", label: "وکیل پایه‌یک" },
      { value: "۱۸", label: "سال سابقه" },
      { value: "۹۴٪", label: "نرخ موفقیت" },
    ],
    serviceHeading: "حوزه‌های تخصصی",
    services: [
      { title: "دعاوی ملکی", desc: "خلع ید، الزام به تنظیم سند، تصرف عدوانی" },
      { title: "خانواده", desc: "طلاق، مهریه، حضانت و نفقه" },
      { title: "کیفری", desc: "دفاع در جرایم مالی، سرقت و ضرب‌وجرح" },
      { title: "تجاری و شرکت‌ها", desc: "ثبت شرکت، قراردادها، ورشکستگی" },
      { title: "چک و مطالبات", desc: "وصول چک برگشتی و مطالبات معوق" },
      { title: "دیوان عدالت اداری", desc: "شکایت از تصمیمات دستگاه‌های دولتی" },
    ],
    galleryHeading: "دستاوردها",
    gallery: [
      { title: "پرونده ملکی", hue: "linear-gradient(135deg,#15294d,#24406e)" },
      { title: "دعاوی تجاری", hue: "linear-gradient(135deg,#c9a96e,#8a7040)" },
      { title: "حقوق خانواده", hue: "linear-gradient(135deg,#1d3a68,#0e1c34)" },
    ],
    teamHeading: "وکلای مؤسسه",
    team: [
      { name: "دکتر حسین رحمانی", role: "وکیل پایه‌یک دادگستری", meta: "دکترای حقوق خصوصی" },
      { name: "مریم شریفی", role: "وکیل پایه‌یک", meta: "متخصص حقوق خانواده" },
      { name: "علی موحد", role: "وکیل پایه‌یک", meta: "متخصص دعاوی کیفری" },
      { name: "سارا نیکنام", role: "کارشناس ارشد حقوق", meta: "مشاور قراردادها" },
    ],
    pricingHeading: "تعرفه مشاوره",
    pricing: [
      { name: "مشاوره تلفنی", price: "۵۰۰٬۰۰۰", period: "۳۰ دقیقه", features: ["پاسخ به پرسش حقوقی", "راهنمای اقدام بعدی"] },
      { name: "مشاوره حضوری", price: "۱٬۲۰۰٬۰۰۰", period: "۶۰ دقیقه", features: ["بررسی مدارک", "تدوین استراتژی", "برآورد هزینه دادرسی"], featured: true },
      { name: "قبول وکالت", price: "توافقی", period: "بر اساس پرونده", features: ["پیگیری کامل پرونده", "حضور در جلسات", "گزارش دوره‌ای"] },
    ],
    testimonials: [
      { quote: "پرونده ملکی ما پس از سه سال بلاتکلیفی در کمتر از هشت ماه به نتیجه رسید.", name: "خانواده ک.", role: "موکل" },
      { quote: "گزارش‌های منظم و شفاف باعث شد همیشه از وضعیت پرونده‌ام باخبر باشم.", name: "شرکت آریا صنعت", role: "موکل سازمانی" },
      { quote: "برخورد حرفه‌ای و صادقانه؛ از ابتدا انتظارات را واقع‌بینانه توضیح دادند.", name: "م. رضایی", role: "موکل" },
    ],
    faq: [
      { q: "هزینه مشاوره اولیه چقدر است؟", a: "اولین جلسه مشاوره تلفنی ۱۵ دقیقه‌ای رایگان است تا امکان‌سنجی پرونده انجام شود." },
      { q: "پرونده چقدر طول می‌کشد؟", a: "بسته به نوع دعوا و شعبه رسیدگی‌کننده، معمولاً بین ۶ تا ۱۸ ماه؛ برآورد دقیق در جلسه مشاوره ارائه می‌شود." },
      { q: "امکان پیگیری آنلاین پرونده هست؟", a: "بله، هر موکل پنل اختصاصی دارد و وضعیت پرونده و اوقات رسیدگی را مشاهده می‌کند." },
    ],
    process: [
      { title: "مشاوره", desc: "بررسی اولیه و امکان‌سنجی" },
      { title: "قرارداد", desc: "تعیین شرح خدمات و حق‌الوکاله" },
      { title: "دادرسی", desc: "تنظیم لایحه و حضور در جلسات" },
      { title: "اجرا", desc: "پیگیری اجرای حکم" },
    ],
    logos: ["کانون وکلای دادگستری", "مرکز داوری", "اتاق بازرگانی", "سامانه ثنا"],
    booking: {
      heading: "درخواست مشاوره",
      desc: "فرم زیر را تکمیل کنید؛ کارشناس ما ظرف یک روز کاری تماس می‌گیرد.",
      fields: ["نام و نام خانوادگی", "شماره تماس", "موضوع پرونده", "شرح مختصر"],
      submit: "ارسال درخواست",
    },
    contact: { address: "قزوین، خیابان خیام، ساختمان دادگستری، طبقه ۳", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا چهارشنبه ۹ تا ۱۸" },
  },
  {
    slug: "real-estate",
    name: "املاک و مستغلات",
    category: "realestate",
    categoryLabel: "املاک",
    brandName: "املاک زیباشهر",
    tagline: "خانه‌ای که دنبالش بودید",
    description: "مینیمال مدرن با سبز مریم‌گلی و کرم، جست‌وجوی پیشرفته و ماشین‌حساب وام.",
    aesthetic: "سبز مریم‌گلی · کرم · مینیمال",
    displayFont: "sans",
    motion: "calm",
    palette: {
      bg: "#f6f5f0",
      surface: "#ffffff",
      text: "#22302a",
      muted: "#65786e",
      primary: "#4f7a62",
      secondary: "#84a98c",
      border: "#e2e4dc",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#cfe0d4,#a9c4b2 60%,#84a98c)",
      dark: false,
    },
    blocks: ["hero", "services", "gallery", "stats", "team", "testimonials", "booking", "contact"],
    hero: {
      badge: "۱٬۲۰۰ فایل فعال در قزوین",
      title: "ملک مناسب شما،",
      highlight: "دقیقاً همین‌جاست",
      subtitle:
        "جست‌وجو بر اساس محله، بودجه و متراژ؛ بازدید حضوری را در همین صفحه زمان‌بندی کنید.",
      primaryCta: "جست‌وجوی ملک",
      secondaryCta: "درخواست بازدید",
    },
    stats: [
      { value: "۱٬۲۰۰", label: "فایل فعال" },
      { value: "۸", label: "مشاور" },
      { value: "۳۴۰", label: "معامله موفق" },
      { value: "۱۴", label: "محله تحت پوشش" },
    ],
    serviceHeading: "املاک منتخب",
    services: [
      { title: "آپارتمان ۱۲۰ متری زیباشهر", desc: "۳ خواب · طبقه ۴ · آسانسور · پارکینگ", meta: "فروش", price: rial("۶٬۸۰۰٬۰۰۰٬۰۰۰") },
      { title: "ویلایی ۲۴۰ متری مینودر", desc: "دوبلکس · حیاط ۸۰ متری · نوساز", meta: "فروش", price: rial("۱۲٬۴۰۰٬۰۰۰٬۰۰۰") },
      { title: "آپارتمان ۸۵ متری بلوار امام", desc: "۲ خواب · بازسازی‌شده · سند تک‌برگ", meta: "رهن و اجاره", price: "۵۰۰ م رهن + ۱۲ م اجاره" },
      { title: "دفتر کار ۶۰ متری مرکز شهر", desc: "اداری · نبش خیابان · پارکینگ", meta: "اجاره", price: "۲۰۰ م رهن + ۹ م اجاره" },
      { title: "زمین ۵۰۰ متری حومه", desc: "کاربری مسکونی · سند شش‌دانگ", meta: "فروش", price: rial("۴٬۲۰۰٬۰۰۰٬۰۰۰") },
      { title: "مغازه ۳۵ متری بازار", desc: "بر اصلی · سرقفلی کامل", meta: "فروش", price: rial("۸٬۹۰۰٬۰۰۰٬۰۰۰") },
    ],
    galleryHeading: "راهنمای محله‌ها",
    gallery: [
      { title: "زیباشهر", hue: "linear-gradient(135deg,#bcd3c2,#7fa38c)" },
      { title: "مینودر", hue: "linear-gradient(135deg,#d6ddc9,#93ad8c)" },
      { title: "بلوار امام", hue: "linear-gradient(135deg,#cfd8d2,#6f8b7c)" },
      { title: "مرکز شهر", hue: "linear-gradient(135deg,#e2ded2,#a9a58c)" },
    ],
    teamHeading: "مشاوران ما",
    team: [
      { name: "رضا کریمی", role: "مدیر دفتر", meta: "۱۵ سال تجربه" },
      { name: "زهرا احمدی", role: "مشاور فروش", meta: "تخصص آپارتمان" },
      { name: "محسن پناهی", role: "مشاور تجاری", meta: "تخصص سرقفلی" },
      { name: "نرگس ملکی", role: "کارشناس ارزیابی", meta: "کارشناس رسمی" },
    ],
    pricingHeading: "خدمات دفتر",
    pricing: [
      { name: "ثبت فایل", price: "رایگان", period: "برای مالکان", features: ["عکاسی حرفه‌ای", "انتشار در سایت", "بازاریابی هدفمند"] },
      { name: "همراهی خرید", price: "۰.۵٪", period: "کمیسیون", features: ["تطبیق فایل", "بازدید همراه", "مذاکره قیمت", "تنظیم قرارداد"], featured: true },
      { name: "ارزیابی کارشناسی", price: "۳٬۵۰۰٬۰۰۰", period: "هر ملک", features: ["گزارش رسمی", "قابل ارائه به بانک"] },
    ],
    testimonials: [
      { quote: "در دو هفته خانه‌ای دقیقاً مطابق بودجه‌مان پیدا کردند.", name: "خانواده م.", role: "خریدار" },
      { quote: "گزارش بازدیدها و پیگیری منظم واقعاً حرفه‌ای بود.", name: "آقای صادقی", role: "فروشنده" },
      { quote: "ماشین‌حساب وام سایتشان کمک کرد تصمیم دقیق‌تری بگیریم.", name: "س. رحیمی", role: "خریدار" },
    ],
    faq: [
      { q: "کمیسیون معامله چقدر است؟", a: "طبق تعرفه اتحادیه، برای خرید و فروش ۰.۵٪ از هر طرف و برای رهن و اجاره یک‌چهارم اجاره ماهانه محاسبه می‌شود." },
      { q: "امکان بازدید مجازی هست؟", a: "بله، برای فایل‌های منتخب ویدیوی بازدید ۳۶۰ درجه تهیه شده است." },
    ],
    process: [
      { title: "ثبت درخواست", desc: "بودجه و اولویت‌های شما" },
      { title: "تطبیق فایل", desc: "معرفی گزینه‌های مناسب" },
      { title: "بازدید", desc: "همراهی مشاور در بازدید" },
      { title: "قرارداد", desc: "تنظیم مبایعه‌نامه و کد رهگیری" },
    ],
    logos: ["اتحادیه مشاوران املاک", "کد رهگیری", "بانک مسکن", "دفترخانه ۲۲"],
    booking: {
      heading: "درخواست بازدید",
      desc: "زمان بازدید را انتخاب کنید؛ مشاور همراه شما خواهد بود.",
      fields: ["نام", "شماره تماس", "کد فایل", "زمان پیشنهادی"],
      submit: "ثبت درخواست بازدید",
    },
    contact: { address: "قزوین، زیباشهر، بلوار اصلی، پلاک ۱۲", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا پنجشنبه ۹ تا ۲۰" },
  },
  {
    slug: "gym",
    name: "باشگاه ورزشی",
    category: "fitness",
    categoryLabel: "تناسب اندام",
    brandName: "باشگاه آترین",
    tagline: "قوی‌تر از دیروز",
    description: "تیره و پرانرژی با لایم درخشان، تایپوگرافی درشت و جدول کلاس‌ها.",
    aesthetic: "تیره · لایم · تایپوگرافی درشت",
    displayFont: "sans",
    motion: "energetic",
    palette: {
      bg: "#0b0f0a",
      surface: "#141a12",
      text: "#f2f7ec",
      muted: "#9aa894",
      primary: "#84cc16",
      secondary: "#22d3ee",
      border: "#232c1d",
      onPrimary: "#0b0f0a",
      gradient: "linear-gradient(140deg,#1d2a12,#0b0f0a 60%,#101709)",
      dark: true,
    },
    blocks: ["hero", "stats", "services", "team", "pricing", "gallery", "testimonials", "booking", "contact"],
    hero: {
      badge: "۷ روز تمرین رایگان",
      title: "بدنی که می‌خواهی،",
      highlight: "اینجا ساخته می‌شود",
      subtitle:
        "۱٬۴۰۰ متر فضای تمرینی، دستگاه‌های روز دنیا و مربیان بین‌المللی. اولین جلسه سنجش بدنی رایگان است.",
      primaryCta: "شروع تمرین رایگان",
      secondaryCta: "برنامه کلاس‌ها",
    },
    stats: [
      { value: "۶۵۰+", label: "عضو فعال" },
      { value: "۹", label: "مربی" },
      { value: "۲۴", label: "کلاس هفتگی" },
      { value: "۱۴۰۰", label: "متر فضا" },
    ],
    serviceHeading: "کلاس‌ها",
    services: [
      { title: "بدنسازی", desc: "برنامه اختصاصی با مربی", meta: "همه سطوح" },
      { title: "کراس‌فیت", desc: "تمرین شدت بالا، ۴۵ دقیقه", meta: "پیشرفته" },
      { title: "TRX", desc: "تمرین با وزن بدن", meta: "متوسط" },
      { title: "فانکشنال", desc: "حرکات کاربردی روزمره", meta: "مبتدی" },
      { title: "بوکس", desc: "تکنیک و آمادگی هوازی", meta: "متوسط" },
      { title: "پیلاتس", desc: "اصلاح فرم بدن و انعطاف", meta: "همه سطوح" },
    ],
    galleryHeading: "تغییرات اعضا",
    gallery: [
      { title: "۱۲ هفته · ۱۴ کیلو", hue: "linear-gradient(135deg,#4a6b13,#141a12)" },
      { title: "۸ هفته · عضله‌سازی", hue: "linear-gradient(135deg,#84cc16,#2b3a14)" },
      { title: "۲۴ هفته · بازسازی", hue: "linear-gradient(135deg,#1d2a12,#0b0f0a)" },
      { title: "۶ هفته · آمادگی", hue: "linear-gradient(135deg,#22d3ee,#134e53)" },
    ],
    teamHeading: "مربیان",
    team: [
      { name: "آرش نوری", role: "مربی بدنسازی", meta: "مدرک بین‌المللی NASM" },
      { name: "سمیرا فتحی", role: "مربی پیلاتس", meta: "۱۰ سال تجربه" },
      { name: "بهنام اکبری", role: "مربی کراس‌فیت", meta: "CrossFit L2" },
      { name: "هانیه رستمی", role: "کارشناس تغذیه", meta: "کارشناس ارشد تغذیه" },
    ],
    pricingHeading: "اشتراک‌ها",
    pricing: [
      { name: "برنزی", price: "۱٬۲۰۰٬۰۰۰", period: "ماهانه", features: ["۱۲ جلسه", "دسترسی به سالن بدنسازی", "برنامه پایه"] },
      { name: "نقره‌ای", price: "۱٬۹۵۰٬۰۰۰", period: "ماهانه", features: ["جلسات نامحدود", "دو کلاس گروهی", "برنامه اختصاصی", "سنجش ترکیب بدنی"], featured: true },
      { name: "طلایی", price: "۳٬۶۰۰٬۰۰۰", period: "ماهانه", features: ["مربی خصوصی", "برنامه تغذیه", "کلاس نامحدود", "کمد اختصاصی"] },
    ],
    testimonials: [
      { quote: "در سه ماه ۱۴ کیلو کم کردم و مهم‌تر از آن، عادت ورزش را یاد گرفتم.", name: "حمید ر.", role: "عضو" },
      { quote: "ورود با QR و اپلیکیشن برنامه تمرینی واقعاً تجربه را متفاوت کرده.", name: "مینا ج.", role: "عضو" },
      { quote: "مربیان حرفه‌ای و فضای تمیز؛ دقیقاً چیزی که دنبالش بودم.", name: "سعید ن.", role: "عضو" },
    ],
    faq: [
      { q: "سانس بانوان دارید؟", a: "بله، روزهای زوج از ساعت ۸ تا ۱۴ سانس اختصاصی بانوان با مربی خانم برگزار می‌شود." },
      { q: "امکان تعلیق اشتراک هست؟", a: "هر عضو می‌تواند تا ۱۴ روز در سال اشتراک خود را تعلیق کند." },
    ],
    process: [
      { title: "سنجش", desc: "ارزیابی ترکیب بدنی" },
      { title: "برنامه", desc: "طراحی برنامه اختصاصی" },
      { title: "تمرین", desc: "اجرای زیر نظر مربی" },
      { title: "پیگیری", desc: "بازسنجی ماهانه" },
    ],
    logos: ["NASM", "CrossFit", "فدراسیون بدنسازی", "اپتیموم"],
    booking: {
      heading: "جلسه رایگان",
      desc: "اولین جلسه سنجش و تمرین کاملاً رایگان است.",
      fields: ["نام", "شماره تماس", "هدف تمرین", "زمان ترجیحی"],
      submit: "رزرو جلسه رایگان",
    },
    contact: { address: "قزوین، بلوار نوروزیان، مجموعه ورزشی آترین", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "هر روز ۶ تا ۲۳" },
  },
  {
    slug: "medical-clinic",
    name: "کلینیک پزشکی",
    category: "medical",
    categoryLabel: "پزشکی",
    brandName: "کلینیک سلامت پارس",
    tagline: "سلامتی شما، اولویت ماست",
    description: "آبی ملایم و سفید، فضای آرام و اعتمادساز با ویزارد نوبت‌دهی.",
    aesthetic: "آبی آرام · سفید · تمیز",
    displayFont: "sans",
    motion: "calm",
    palette: {
      bg: "#f4f9fd",
      surface: "#ffffff",
      text: "#0f2740",
      muted: "#5c748c",
      primary: "#1f7ac0",
      secondary: "#22c1a4",
      border: "#dbe8f2",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#d4e9f8,#b6dced 60%,#8fcfe0)",
      dark: false,
    },
    blocks: ["hero", "services", "team", "process", "logos", "testimonials", "booking", "faq", "contact"],
    hero: {
      badge: "پذیرش بیمه‌های پایه و تکمیلی",
      title: "درمان تخصصی،",
      highlight: "با آرامش خاطر",
      subtitle:
        "۱۴ تخصص پزشکی زیر یک سقف، نوبت‌دهی آنلاین و پرونده الکترونیک سلامت برای پیگیری آسان درمان.",
      primaryCta: "رزرو نوبت آنلاین",
      secondaryCta: "بخش‌های درمانی",
    },
    stats: [
      { value: "۱۴", label: "تخصص" },
      { value: "۲۶", label: "پزشک" },
      { value: "۹۵٬۰۰۰", label: "ویزیت سالانه" },
      { value: "۱۲", label: "بیمه طرف قرارداد" },
    ],
    serviceHeading: "بخش‌های درمانی",
    services: [
      { title: "داخلی", desc: "تشخیص و درمان بیماری‌های داخلی" },
      { title: "قلب و عروق", desc: "اکو، نوار قلب و تست ورزش" },
      { title: "اطفال", desc: "پایش رشد و واکسیناسیون" },
      { title: "زنان و زایمان", desc: "مراقبت بارداری و سلامت بانوان" },
      { title: "ارتوپدی", desc: "درمان آسیب‌های اسکلتی-عضلانی" },
      { title: "پوست و مو", desc: "درمان و زیبایی پوست" },
      { title: "چشم‌پزشکی", desc: "معاینه بینایی و جراحی سرپایی" },
      { title: "تصویربرداری", desc: "سونوگرافی، رادیولوژی و MRI" },
    ],
    galleryHeading: "امکانات کلینیک",
    gallery: [
      { title: "اتاق معاینه", hue: "linear-gradient(135deg,#d7ecf8,#9ac9e4)" },
      { title: "بخش تصویربرداری", hue: "linear-gradient(135deg,#c9e6f2,#6fb6d8)" },
      { title: "آزمایشگاه", hue: "linear-gradient(135deg,#dff3ee,#8fd3c4)" },
    ],
    teamHeading: "پزشکان ما",
    team: [
      { name: "دکتر نیلوفر امینی", role: "متخصص داخلی", meta: "بورد تخصصی" },
      { name: "دکتر کاوه سلیمی", role: "متخصص قلب", meta: "فلوشیپ اکوکاردیوگرافی" },
      { name: "دکتر شیرین رادمهر", role: "متخصص اطفال", meta: "۱۶ سال تجربه" },
      { name: "دکتر آرمان توکلی", role: "متخصص ارتوپدی", meta: "جراح زانو" },
    ],
    pricingHeading: "تعرفه ویزیت",
    pricing: [
      { name: "ویزیت عمومی", price: "۳۵۰٬۰۰۰", period: "هر نوبت", features: ["معاینه پزشک عمومی", "نسخه الکترونیک"] },
      { name: "ویزیت تخصصی", price: "۷۵۰٬۰۰۰", period: "هر نوبت", features: ["معاینه متخصص", "پرونده الکترونیک", "پیگیری تلفنی"], featured: true },
      { name: "چکاپ کامل", price: "۴٬۲۰۰٬۰۰۰", period: "پکیج", features: ["آزمایش کامل", "نوار قلب", "سونوگرافی", "مشاوره نتیجه"] },
    ],
    testimonials: [
      { quote: "نوبت‌دهی آنلاین و نظم پذیرش باعث شد کمتر از ۱۰ دقیقه منتظر بمانم.", name: "ف. عباسی", role: "مراجعه‌کننده" },
      { quote: "پرونده الکترونیک باعث شد پزشک سابقه کامل درمانم را ببیند.", name: "ر. کاظمی", role: "مراجعه‌کننده" },
      { quote: "برخورد کادر درمان بسیار محترمانه و آرامش‌بخش بود.", name: "م. یاوری", role: "مراجعه‌کننده" },
    ],
    faq: [
      { q: "چه بیمه‌هایی پذیرفته می‌شود؟", a: "تأمین اجتماعی، سلامت، نیروهای مسلح و اغلب بیمه‌های تکمیلی طرف قرارداد هستند." },
      { q: "جواب آزمایش چگونه دریافت می‌شود؟", a: "نتایج در پنل بیمار قابل مشاهده است و لینک آن پیامک می‌شود." },
    ],
    process: [
      { title: "انتخاب تخصص", desc: "بخش موردنظر را انتخاب کنید" },
      { title: "انتخاب پزشک", desc: "بر اساس زمان و تخصص" },
      { title: "رزرو نوبت", desc: "تأیید پیامکی فوری" },
      { title: "ویزیت", desc: "پذیرش سریع با کد نوبت" },
    ],
    logos: ["تأمین اجتماعی", "بیمه سلامت", "بیمه دانا", "بیمه آسیا", "بیمه معلم"],
    booking: {
      heading: "رزرو نوبت آنلاین",
      desc: "در سه گام ساده نوبت خود را ثبت کنید.",
      fields: ["نام و نام خانوادگی", "کد ملی", "تخصص", "تاریخ مراجعه"],
      submit: "دریافت نوبت",
    },
    contact: { address: "قزوین، بلوار شهید بهشتی، کلینیک سلامت پارس", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا پنجشنبه ۸ تا ۲۱" },
  },
  {
    slug: "education",
    name: "آموزشگاه",
    category: "education",
    categoryLabel: "آموزش",
    brandName: "آموزشگاه کارن",
    tagline: "یادگیری، ساده و لذت‌بخش",
    description: "ایندیگو و زرد شاد، فضای دوستانه با کاتالوگ دوره و فرم ثبت‌نام.",
    aesthetic: "ایندیگو · زرد · دوستانه",
    displayFont: "sans",
    motion: "playful",
    palette: {
      bg: "#f7f7fd",
      surface: "#ffffff",
      text: "#1b1a3a",
      muted: "#5f5e88",
      primary: "#4f46e5",
      secondary: "#facc15",
      border: "#e4e3f5",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#dedcfb,#c4c0f7 55%,#a5a0f2)",
      dark: false,
    },
    blocks: ["hero", "services", "stats", "team", "testimonials", "pricing", "booking", "faq", "contact"],
    hero: {
      badge: "ثبت‌نام ترم پاییز آغاز شد",
      title: "مهارتی یاد بگیر که",
      highlight: "کارت را عوض کند",
      subtitle:
        "دوره‌های حضوری و آنلاین برنامه‌نویسی، زبان و مهارت‌های کسب‌وکار با مدرک معتبر و پشتیبانی تا استخدام.",
      primaryCta: "مشاهده دوره‌ها",
      secondaryCta: "مشاوره رایگان",
    },
    stats: [
      { value: "۳٬۲۰۰", label: "دانش‌پذیر" },
      { value: "۳۸", label: "دوره فعال" },
      { value: "۲۴", label: "مدرس" },
      { value: "۸۱٪", label: "نرخ استخدام" },
    ],
    serviceHeading: "کاتالوگ دوره‌ها",
    services: [
      { title: "برنامه‌نویسی وب", desc: "HTML تا React در ۶ ماه", meta: "مقدماتی تا پیشرفته", price: rial("۱۸٬۰۰۰٬۰۰۰") },
      { title: "پایتون و داده", desc: "تحلیل داده و یادگیری ماشین", meta: "متوسط", price: rial("۲۲٬۰۰۰٬۰۰۰") },
      { title: "زبان انگلیسی", desc: "مکالمه و آمادگی آیلتس", meta: "همه سطوح", price: rial("۹٬۵۰۰٬۰۰۰") },
      { title: "طراحی گرافیک", desc: "فتوشاپ، ایلاستریتور و فیگما", meta: "مقدماتی", price: rial("۱۴٬۰۰۰٬۰۰۰") },
      { title: "دیجیتال مارکتینگ", desc: "سئو، تبلیغات و شبکه‌های اجتماعی", meta: "متوسط", price: rial("۱۲٬۰۰۰٬۰۰۰") },
      { title: "حسابداری کاربردی", desc: "از دفترنویسی تا نرم‌افزار", meta: "مقدماتی", price: rial("۱۰٬۵۰۰٬۰۰۰") },
    ],
    galleryHeading: "فضای آموزشی",
    gallery: [
      { title: "کارگاه عملی", hue: "linear-gradient(135deg,#c9c5f8,#7a72e8)" },
      { title: "کلاس آنلاین", hue: "linear-gradient(135deg,#fde68a,#f59e0b)" },
      { title: "سایت کامپیوتر", hue: "linear-gradient(135deg,#d6d3fb,#4f46e5)" },
      { title: "رویداد فارغ‌التحصیلی", hue: "linear-gradient(135deg,#fef3c7,#c7c2f7)" },
    ],
    teamHeading: "مدرسان",
    team: [
      { name: "حسین رحمانی", role: "مدرس توسعه وب", meta: "۹ سال تجربه صنعتی" },
      { name: "الهام قاسمی", role: "مدرس زبان", meta: "IELTS 8.5" },
      { name: "پویا مهرابی", role: "مدرس داده", meta: "کارشناس ارشد هوش مصنوعی" },
      { name: "ندا شاکری", role: "مدرس گرافیک", meta: "۱۱ سال تجربه" },
    ],
    pricingHeading: "طرح‌های ثبت‌نام",
    pricing: [
      { name: "تک‌درس", price: "۹٬۵۰۰٬۰۰۰", period: "هر دوره", features: ["دسترسی کلاس", "جزوه دیجیتال", "گواهی پایان دوره"] },
      { name: "مسیر شغلی", price: "۳۲٬۰۰۰٬۰۰۰", period: "۹ ماه", features: ["سه دوره پیوسته", "منتور اختصاصی", "پروژه واقعی", "معرفی به شرکت‌ها"], featured: true },
      { name: "سازمانی", price: "توافقی", period: "تیمی", features: ["آموزش درون‌سازمانی", "سرفصل اختصاصی", "گزارش پیشرفت تیم"] },
    ],
    testimonials: [
      { quote: "سه ماه بعد از پایان دوره توسعه وب، در یک شرکت نرم‌افزاری استخدام شدم.", name: "مهدی ا.", role: "دانش‌آموخته" },
      { quote: "کلاس‌ها کاملاً پروژه‌محور بود و از جلسه دوم کد می‌زدیم.", name: "سارا ب.", role: "دانش‌پذیر" },
      { quote: "پشتیبانی بعد از کلاس و گروه پرسش‌وپاسخ خیلی کمک کرد.", name: "علی ن.", role: "دانش‌آموخته" },
    ],
    faq: [
      { q: "کلاس‌ها حضوری است یا آنلاین؟", a: "اکثر دوره‌ها به‌صورت ترکیبی برگزار می‌شوند و ویدیوی جلسات تا یک سال در دسترس است." },
      { q: "گواهی پایان دوره معتبر است؟", a: "بله، گواهی دوطرفه فارسی و انگلیسی با قابلیت استعلام آنلاین صادر می‌شود." },
    ],
    process: [
      { title: "مشاوره", desc: "تعیین مسیر یادگیری" },
      { title: "ثبت‌نام", desc: "انتخاب دوره و پرداخت" },
      { title: "یادگیری", desc: "کلاس، تمرین و پروژه" },
      { title: "اشتغال", desc: "معرفی به بازار کار" },
    ],
    logos: ["سازمان فنی و حرفه‌ای", "ایرانتلنت", "جاب‌ویژن", "کوئرا"],
    booking: {
      heading: "فرم ثبت‌نام",
      desc: "اطلاعات خود را ثبت کنید تا مشاور آموزشی تماس بگیرد.",
      fields: ["نام و نام خانوادگی", "شماره تماس", "دوره موردنظر", "سطح فعلی"],
      submit: "ثبت‌نام و دریافت مشاوره",
    },
    contact: { address: "قزوین، خیابان طالقانی، آموزشگاه کارن", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا پنجشنبه ۹ تا ۲۱" },
  },
  {
    slug: "travel",
    name: "آژانس مسافرتی",
    category: "travel",
    categoryLabel: "سفر",
    brandName: "سفرهای کارن",
    tagline: "دنیا منتظر توست",
    description: "فیروزه‌ای و مرجانی پرانرژی، تصاویر غنی و فرم رزرو تور.",
    aesthetic: "فیروزه‌ای · مرجانی · تصویرمحور",
    displayFont: "sans",
    motion: "energetic",
    palette: {
      bg: "#f2fbfb",
      surface: "#ffffff",
      text: "#08313a",
      muted: "#4f7d86",
      primary: "#0e9aa7",
      secondary: "#ff6f5e",
      border: "#d5eef0",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#bdeef1,#7fd8de 55%,#0e9aa7)",
      dark: false,
    },
    blocks: ["hero", "services", "gallery", "stats", "testimonials", "booking", "faq", "contact"],
    hero: {
      badge: "تورهای پاییز با ۲۰٪ تخفیف",
      title: "سفری که",
      highlight: "فراموش نمی‌کنی",
      subtitle:
        "تورهای داخلی و خارجی با پرواز مستقیم، هتل‌های منتخب و راهنمای فارسی‌زبان. خدمات ویزا و بیمه مسافرتی نیز ارائه می‌شود.",
      primaryCta: "رزرو تور",
      secondaryCta: "مشاهده مقاصد",
    },
    stats: [
      { value: "۶۸", label: "مقصد" },
      { value: "۱۴٬۰۰۰", label: "مسافر" },
      { value: "۱۱", label: "سال تجربه" },
      { value: "۴.۹", label: "رضایت مسافران" },
    ],
    serviceHeading: "تورهای محبوب",
    services: [
      { title: "استانبول", desc: "۴ شب · هتل ۴ ستاره · پرواز مستقیم", meta: "ترکیه", price: rial("۳۸٬۰۰۰٬۰۰۰") },
      { title: "دبی", desc: "۳ شب · هتل ۵ ستاره · ترانسفر", meta: "امارات", price: rial("۵۲٬۰۰۰٬۰۰۰") },
      { title: "کیش", desc: "۳ شب · پرواز + هتل + گشت", meta: "داخلی", price: rial("۱۴٬۵۰۰٬۰۰۰") },
      { title: "آنتالیا", desc: "۶ شب · همه‌چیز شامل", meta: "ترکیه", price: rial("۶۵٬۰۰۰٬۰۰۰") },
      { title: "مشهد", desc: "۳ شب · هتل نزدیک حرم", meta: "زیارتی", price: rial("۹٬۸۰۰٬۰۰۰") },
      { title: "تفلیس", desc: "۴ شب · هتل ۴ ستاره", meta: "گرجستان", price: rial("۳۲٬۵۰۰٬۰۰۰") },
    ],
    galleryHeading: "مقصدهای منتخب",
    gallery: [
      { title: "سواحل جنوب", hue: "linear-gradient(135deg,#8fe3e8,#0e9aa7)" },
      { title: "کویر مرکزی", hue: "linear-gradient(135deg,#ffc9a8,#ff6f5e)" },
      { title: "جنگل‌های شمال", hue: "linear-gradient(135deg,#a8e6b8,#2f8f6a)" },
      { title: "شهرهای تاریخی", hue: "linear-gradient(135deg,#ffe0a3,#d99b3c)" },
      { title: "کوهستان", hue: "linear-gradient(135deg,#cfe4f7,#5b8fc7)" },
      { title: "سفر خارجی", hue: "linear-gradient(135deg,#bdeef1,#0b6d78)" },
    ],
    teamHeading: "کارشناسان سفر",
    team: [
      { name: "نیما شریفی", role: "کارشناس تور خارجی", meta: "۱۰ سال تجربه" },
      { name: "آیدا کرمی", role: "کارشناس ویزا", meta: "شنگن و آمریکا" },
      { name: "بابک زند", role: "راهنمای تور", meta: "مسلط به سه زبان" },
      { name: "مونا رحیمی", role: "پشتیبانی سفر", meta: "۲۴ ساعته" },
    ],
    pricingHeading: "خدمات جانبی",
    pricing: [
      { name: "بیمه مسافرتی", price: "۱٬۲۰۰٬۰۰۰", period: "هر سفر", features: ["پوشش درمانی", "تأخیر پرواز", "گم شدن بار"] },
      { name: "پکیج ویزا", price: "۶٬۵۰۰٬۰۰۰", period: "هر نفر", features: ["تکمیل فرم", "وقت سفارت", "ترجمه مدارک", "مشاوره مصاحبه"], featured: true },
      { name: "تور اختصاصی", price: "توافقی", period: "گروهی", features: ["برنامه سفارشی", "راهنمای اختصاصی", "ترانسفر VIP"] },
    ],
    testimonials: [
      { quote: "همه‌چیز دقیقاً طبق برنامه پیش رفت؛ حتی ترانسفر فرودگاه.", name: "خانواده ر.", role: "مسافر استانبول" },
      { quote: "پشتیبانی ۲۴ ساعته در سفر واقعاً خیال ما را راحت کرد.", name: "پ. موسوی", role: "مسافر دبی" },
      { quote: "قیمت‌ها شفاف بود و هزینه پنهانی نداشت.", name: "س. اکبری", role: "مسافر آنتالیا" },
    ],
    faq: [
      { q: "شرایط کنسلی چگونه است؟", a: "تا ۷۲ ساعت پیش از پرواز، کنسلی با کسر ۳۰٪ امکان‌پذیر است؛ جزئیات در قرارداد تور درج می‌شود." },
      { q: "امکان پرداخت اقساطی هست؟", a: "بله، برای تورهای بالای ۳۰ میلیون تومان پرداخت در سه قسط ممکن است." },
    ],
    process: [
      { title: "انتخاب تور", desc: "مقصد و تاریخ دلخواه" },
      { title: "رزرو", desc: "پرداخت بیعانه" },
      { title: "مدارک", desc: "ویزا و بیمه" },
      { title: "سفر", desc: "پشتیبانی در طول سفر" },
    ],
    logos: ["ایران‌ایر", "ماهان", "قشم‌ایر", "ترکیش", "اتحادیه آژانس‌ها"],
    booking: {
      heading: "رزرو تور",
      desc: "مقصد و تاریخ سفر را انتخاب کنید تا بهترین پیشنهاد را ارسال کنیم.",
      fields: ["نام", "شماره تماس", "مقصد", "تاریخ سفر"],
      submit: "دریافت پیشنهاد سفر",
    },
    contact: { address: "قزوین، خیابان بوعلی، آژانس سفرهای کارن", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا پنجشنبه ۹ تا ۱۹" },
  },
  {
    slug: "ecommerce",
    name: "فروشگاه آنلاین",
    category: "retail",
    categoryLabel: "فروشگاهی",
    brandName: "بوتیک نُوا",
    tagline: "استایل بی‌زمان",
    description: "مینیمال ادیتوریال سیاه و سفید با یک رنگ تأکیدی، شبکه محصولات و سبد خرید تعاملی.",
    aesthetic: "سیاه و سفید · ادیتوریال · مینیمال",
    displayFont: "sans",
    motion: "precise",
    palette: {
      bg: "#ffffff",
      surface: "#fafafa",
      text: "#0b0b0b",
      muted: "#6b6b6b",
      primary: "#0b0b0b",
      secondary: "#d94f2b",
      border: "#e6e6e6",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#efefef,#d9d9d9 60%,#bdbdbd)",
      dark: false,
    },
    blocks: ["hero", "services", "gallery", "stats", "testimonials", "cta", "faq", "contact"],
    hero: {
      badge: "کالکشن پاییز ۱۴۰۵",
      title: "پوشاکی که",
      highlight: "با تو می‌ماند",
      subtitle: "پارچه‌های طبیعی، دوخت ایرانی و طراحی مینیمال. ارسال رایگان برای خریدهای بالای ۳ میلیون تومان.",
      primaryCta: "خرید کالکشن",
      secondaryCta: "مشاهده لوک‌بوک",
    },
    stats: [
      { value: "۲۴۰۰", label: "کد کالا" },
      { value: "۴۸ ساعت", label: "زمان ارسال" },
      { value: "۷ روز", label: "مهلت مرجوعی" },
      { value: "۹۲٪", label: "خرید مجدد" },
    ],
    serviceHeading: "محصولات منتخب",
    services: [
      { title: "پالتو پشمی اورسایز", desc: "۸۰٪ پشم · سه رنگ", meta: "پالتو", price: rial("۴٬۸۰۰٬۰۰۰") },
      { title: "پیراهن کتان", desc: "کتان ۱۰۰٪ · برش راحت", meta: "پیراهن", price: rial("۱٬۹۵۰٬۰۰۰") },
      { title: "شلوار پارچه‌ای", desc: "فرم استاندارد · چهار رنگ", meta: "شلوار", price: rial("۲٬۲۰۰٬۰۰۰") },
      { title: "بافت یقه‌اسکی", desc: "مرینوس نرم · ضدحساسیت", meta: "بافت", price: rial("۲٬۹۵۰٬۰۰۰") },
      { title: "کیف چرم دست‌دوز", desc: "چرم گاوی طبیعی", meta: "اکسسوری", price: rial("۵٬۴۰۰٬۰۰۰") },
      { title: "شال ابریشمی", desc: "چاپ اختصاصی", meta: "اکسسوری", price: rial("۱٬۳۵۰٬۰۰۰") },
    ],
    galleryHeading: "لوک‌بوک",
    gallery: [
      { title: "لوک ۰۱ — شهری", hue: "linear-gradient(135deg,#dcdcdc,#8d8d8d)" },
      { title: "لوک ۰۲ — مینیمال", hue: "linear-gradient(135deg,#f0f0f0,#c2c2c2)" },
      { title: "لوک ۰۳ — تیره", hue: "linear-gradient(135deg,#4a4a4a,#111111)" },
      { title: "لوک ۰۴ — مرجانی", hue: "linear-gradient(135deg,#f3c7bb,#d94f2b)" },
    ],
    teamHeading: "پشت صحنه",
    team: [
      { name: "نوا شریفی", role: "طراح ارشد", meta: "فارغ‌التحصیل طراحی مد" },
      { name: "کیان مرادی", role: "مدیر تولید", meta: "۱۴ سال تجربه دوخت" },
      { name: "هلیا فرد", role: "استایلیست", meta: "همکاری با برندهای داخلی" },
    ],
    pricingHeading: "باشگاه مشتریان",
    pricing: [
      { name: "عضو", price: "رایگان", period: "همیشه", features: ["اطلاع از کالکشن جدید", "۵٪ تخفیف تولد"] },
      { name: "نقره‌ای", price: "۱۰ م", period: "خرید سالانه", features: ["۱۰٪ تخفیف دائمی", "ارسال رایگان", "اولویت پیش‌فروش"], featured: true },
      { name: "طلایی", price: "۳۰ م", period: "خرید سالانه", features: ["۱۵٪ تخفیف دائمی", "استایلیست شخصی", "هدیه فصلی"] },
    ],
    testimonials: [
      { quote: "کیفیت پارچه واقعاً بالاتر از انتظارم بود.", name: "ن. رستمی", role: "مشتری" },
      { quote: "سایزبندی دقیق و راهنمای سایز کاربردی داشت.", name: "آ. حیدری", role: "مشتری" },
      { quote: "مرجوعی بدون دردسر انجام شد؛ خیلی حرفه‌ای." , name: "م. سلطانی", role: "مشتری" },
    ],
    faq: [
      { q: "چطور سایز مناسب را انتخاب کنم؟", a: "در هر صفحه محصول جدول سایز و اندازه‌های واقعی لباس درج شده است؛ در صورت تردید با پشتیبانی تماس بگیرید." },
      { q: "شرایط مرجوعی چیست؟", a: "تا ۷ روز پس از دریافت، در صورت استفاده‌نشدن و داشتن برچسب، مرجوعی رایگان است." },
    ],
    process: [
      { title: "انتخاب", desc: "مرور کالکشن" },
      { title: "سبد خرید", desc: "بررسی سایز و رنگ" },
      { title: "پرداخت", desc: "درگاه امن بانکی" },
      { title: "دریافت", desc: "ارسال ۴۸ ساعته" },
    ],
    logos: ["زرین‌پال", "پست پیشتاز", "تیپاکس", "اینماد"],
    booking: {
      heading: "عضویت در خبرنامه",
      desc: "از کالکشن‌های جدید و فروش‌های ویژه زودتر باخبر شوید.",
      fields: ["نام", "ایمیل"],
      submit: "عضویت",
    },
    contact: { address: "قزوین، خیابان سعدی، بوتیک نوا", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "هر روز ۱۰ تا ۲۲" },
  },
  {
    slug: "construction",
    name: "شرکت ساختمانی",
    category: "construction",
    categoryLabel: "ساختمانی",
    brandName: "ساختمانی آرمان‌سازه",
    tagline: "ساخت با استانداردِ ماندگاری",
    description: "خاکستری فولادی و نارنجی ایمنی، ساختار منظم و نمونه‌کارهای فیلترشونده.",
    aesthetic: "فولادی · نارنجی ایمنی · صنعتی",
    displayFont: "sans",
    motion: "precise",
    palette: {
      bg: "#f4f5f7",
      surface: "#ffffff",
      text: "#1b1f24",
      muted: "#5f6773",
      primary: "#f97316",
      secondary: "#334155",
      border: "#dfe3e8",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#4b5563,#334155 60%,#1f2937)",
      dark: false,
    },
    blocks: ["hero", "services", "gallery", "stats", "process", "logos", "testimonials", "booking", "contact"],
    hero: {
      badge: "رتبه ۳ ابنیه · پروانه اشتغال",
      title: "از نقشه تا تحویل کلید،",
      highlight: "بدون تأخیر",
      subtitle:
        "طراحی، اجرا و بازسازی پروژه‌های مسکونی، تجاری و صنعتی با قرارداد شفاف و گزارش پیشرفت هفتگی.",
      primaryCta: "درخواست برآورد پروژه",
      secondaryCta: "نمونه پروژه‌ها",
    },
    stats: [
      { value: "۹۶", label: "پروژه اجراشده" },
      { value: "۱۸۰٬۰۰۰", label: "متر مربع ساخت" },
      { value: "۲۲", label: "سال سابقه" },
      { value: "۰", label: "حادثه منجر به فوت" },
    ],
    serviceHeading: "خدمات ما",
    services: [
      { title: "طراحی و نقشه‌کشی", desc: "معماری، سازه و تأسیسات" },
      { title: "اجرای اسکلت", desc: "بتنی و فلزی با نظارت مهندس" },
      { title: "بازسازی", desc: "نوسازی کامل واحدهای مسکونی و اداری" },
      { title: "محوطه‌سازی", desc: "حیاط، پارکینگ و فضای سبز" },
      { title: "مدیریت پیمان", desc: "کنترل هزینه و زمان‌بندی پروژه" },
      { title: "تأسیسات", desc: "برق، مکانیک و سیستم‌های هوشمند" },
    ],
    galleryHeading: "نمونه پروژه‌ها",
    gallery: [
      { title: "برج مسکونی نگین", hue: "linear-gradient(135deg,#94a3b8,#334155)" },
      { title: "مجتمع تجاری کارن", hue: "linear-gradient(135deg,#fdba74,#c2410c)" },
      { title: "سوله صنعتی", hue: "linear-gradient(135deg,#cbd5e1,#475569)" },
      { title: "بازسازی اداری", hue: "linear-gradient(135deg,#e2e8f0,#64748b)" },
      { title: "ویلا دوبلکس", hue: "linear-gradient(135deg,#fed7aa,#9a3412)" },
      { title: "محوطه‌سازی", hue: "linear-gradient(135deg,#d1d5db,#1f2937)" },
    ],
    teamHeading: "تیم فنی",
    team: [
      { name: "مهندس آرمان کیانی", role: "مدیرعامل", meta: "کارشناس ارشد سازه" },
      { name: "مهندس لاله فتحی", role: "مدیر طراحی", meta: "معماری داخلی" },
      { name: "مهندس سعید بهروز", role: "سرپرست کارگاه", meta: "۱۹ سال تجربه" },
      { name: "مهندس یاسر عرفانی", role: "مسئول HSE", meta: "ممیز ایمنی" },
    ],
    pricingHeading: "مدل‌های همکاری",
    pricing: [
      { name: "دستمزدی", price: "متری ۴.۵ م", period: "اجرا", features: ["اجرای ساختمان", "نظارت کارگاهی", "گزارش هفتگی"] },
      { name: "مدیریت پیمان", price: "۱۲٪", period: "از هزینه پروژه", features: ["تأمین مصالح", "کنترل هزینه", "زمان‌بندی", "تضمین کیفیت"], featured: true },
      { name: "کلید تحویل", price: "توافقی", period: "پروژه کامل", features: ["طراحی تا تحویل", "قیمت ثابت", "جریمه تأخیر"] },
    ],
    testimonials: [
      { quote: "پروژه دقیقاً در زمان مقرر تحویل شد و گزارش‌های هفتگی بسیار شفاف بود.", name: "شرکت نگین‌سازه", role: "کارفرما" },
      { quote: "بازسازی واحد اداری ما در ۴۵ روز و بدون تعطیلی کار انجام شد.", name: "دفتر حقوقی آریا", role: "کارفرما" },
      { quote: "رعایت نکات ایمنی در کارگاه واقعاً مثال‌زدنی بود.", name: "ناظر شهرداری", role: "ناظر پروژه" },
    ],
    faq: [
      { q: "برآورد اولیه چقدر طول می‌کشد؟", a: "پس از بازدید از محل، برآورد اولیه ظرف ۵ روز کاری به‌صورت مکتوب ارائه می‌شود." },
      { q: "ضمانت اجرا دارید؟", a: "بله، تمام پروژه‌ها دارای ۲۴ ماه ضمانت اجرا و ۱۰ سال بیمه کیفیت ساخت هستند." },
    ],
    process: [
      { title: "بازدید", desc: "برداشت وضع موجود" },
      { title: "طراحی", desc: "نقشه و برآورد هزینه" },
      { title: "اجرا", desc: "ساخت با گزارش هفتگی" },
      { title: "تحویل", desc: "تست، آموزش و ضمانت" },
    ],
    logos: ["نظام مهندسی", "سازمان برنامه و بودجه", "بیمه کیفیت ساخت", "ISO 45001"],
    booking: {
      heading: "درخواست برآورد",
      desc: "مشخصات پروژه خود را ثبت کنید تا کارشناس بازدید هماهنگ شود.",
      fields: ["نام", "شماره تماس", "نوع پروژه", "متراژ تقریبی"],
      submit: "ثبت درخواست برآورد",
    },
    contact: { address: "قزوین، شهرک صنعتی، خیابان دوم، پلاک ۴۰", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا چهارشنبه ۸ تا ۱۷" },
  },
  {
    slug: "digital-agency",
    name: "آژانس دیجیتال مارکتینگ",
    category: "marketing",
    categoryLabel: "بازاریابی",
    brandName: "آژانس نبض",
    tagline: "رشد، قابل اندازه‌گیری است",
    description: "گرادیان‌های جسور و تایپوگرافی درشت با کیس‌استادی‌های عددمحور.",
    aesthetic: "گرادیان جسور · تایپوگرافی درشت",
    displayFont: "sans",
    motion: "playful",
    palette: {
      bg: "#0d0a1a",
      surface: "#181231",
      text: "#f5f2ff",
      muted: "#a79fd0",
      primary: "#8b5cf6",
      secondary: "#f472b6",
      border: "#2a2148",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#8b5cf6,#f472b6 55%,#22d3ee)",
      dark: true,
    },
    blocks: ["hero", "services", "stats", "gallery", "process", "team", "logos", "testimonials", "cta", "contact"],
    hero: {
      badge: "پذیرش ۳ برند جدید در فصل جاری",
      title: "برندت را",
      highlight: "دیده‌شدنی می‌کنیم",
      subtitle:
        "استراتژی، تبلیغات، محتوا و سئو — همه با هدف یک عدد: رشد فروش. هر ماه گزارش شفاف از بازگشت سرمایه دریافت می‌کنی.",
      primaryCta: "بریم حرف بزنیم",
      secondaryCta: "نمونه نتایج",
    },
    stats: [
      { value: "۳.۸×", label: "میانگین ROAS" },
      { value: "۵۲", label: "برند همکار" },
      { value: "۱۹۰ م", label: "بازدید تولیدشده" },
      { value: "۷ سال", label: "تجربه تیم" },
    ],
    serviceHeading: "خدمات",
    services: [
      { title: "استراتژی برند", desc: "پوزیشنینگ، پیام و هویت بصری" },
      { title: "تبلیغات پولی", desc: "گوگل ادز، تبلیغات کلیکی و ریتارگتینگ" },
      { title: "سئو", desc: "فنی، محتوایی و لینک‌سازی" },
      { title: "تولید محتوا", desc: "ویدیو، عکس و کپی‌رایتینگ" },
      { title: "شبکه‌های اجتماعی", desc: "مدیریت، کمپین و اینفلوئنسر" },
      { title: "تحلیل داده", desc: "داشبورد عملکرد و تست A/B" },
    ],
    galleryHeading: "کیس‌استادی‌ها",
    gallery: [
      { title: "فروشگاه مد: ۳۱۰٪ رشد فروش", hue: "linear-gradient(135deg,#8b5cf6,#f472b6)" },
      { title: "کلینیک: ۴.۲× نوبت آنلاین", hue: "linear-gradient(135deg,#22d3ee,#6366f1)" },
      { title: "SaaS: کاهش ۴۰٪ هزینه جذب", hue: "linear-gradient(135deg,#f472b6,#fb923c)" },
      { title: "رستوران: ۲۸۰٪ رشد سفارش", hue: "linear-gradient(135deg,#a855f7,#22d3ee)" },
    ],
    teamHeading: "تیم ما",
    team: [
      { name: "رها تابان", role: "مدیر استراتژی", meta: "سابقه در دو یونیکورن" },
      { name: "کیان فروزان", role: "مدیر پرفورمنس", meta: "متخصص گوگل ادز" },
      { name: "نیکا سپهر", role: "مدیر خلاقیت", meta: "برنده جایزه طراحی" },
      { name: "آرمین دهقان", role: "تحلیلگر داده", meta: "متخصص GA4" },
    ],
    pricingHeading: "پکیج‌ها",
    pricing: [
      { name: "استارتر", price: "۳۵٬۰۰۰٬۰۰۰", period: "ماهانه", features: ["مدیریت دو کانال", "۸ محتوا در ماه", "گزارش ماهانه"] },
      { name: "رشد", price: "۸۵٬۰۰۰٬۰۰۰", period: "ماهانه", features: ["مدیریت چهار کانال", "کمپین تبلیغاتی", "۲۰ محتوا", "داشبورد زنده"], featured: true },
      { name: "سازمانی", price: "توافقی", period: "قرارداد سالانه", features: ["تیم اختصاصی", "استراتژی سالانه", "تولید ویدیو", "پشتیبانی روزانه"] },
    ],
    testimonials: [
      { quote: "در شش ماه هزینه جذب مشتری‌مان ۴۰٪ کم شد و فروش دو برابر.", name: "مدیر فروش دیجی‌مد", role: "مشتری" },
      { quote: "گزارش‌های شفاف ماهانه باعث شد بودجه بازاریابی را با اطمینان افزایش دهیم.", name: "بنیان‌گذار اپ آوا", role: "مشتری" },
      { quote: "تیم خلاق و سریع؛ در دو هفته کمپین کامل اجرا شد.", name: "مدیر برند رستا", role: "مشتری" },
    ],
    faq: [
      { q: "حداقل مدت قرارداد چقدر است؟", a: "سه ماه؛ چون نتایج پایدار سئو و پرفورمنس معمولاً از ماه دوم قابل اندازه‌گیری می‌شود." },
      { q: "بودجه تبلیغات جداست؟", a: "بله، هزینه رسانه جدا از حق‌الزحمه آژانس محاسبه و به‌صورت شفاف گزارش می‌شود." },
    ],
    process: [
      { title: "کشف", desc: "تحلیل بازار و رقبا" },
      { title: "استراتژی", desc: "تعریف پیام و کانال‌ها" },
      { title: "اجرا", desc: "تولید و انتشار کمپین" },
      { title: "بهینه‌سازی", desc: "تست، تحلیل و رشد" },
    ],
    logos: ["دیجی‌مد", "اپ آوا", "رستا", "نگین‌سازه", "کلینیک پارس"],
    booking: {
      heading: "بیایید صحبت کنیم",
      desc: "یک جلسه ۳۰ دقیقه‌ای رایگان برای بررسی وضعیت برند شما.",
      fields: ["نام", "نام برند", "شماره تماس", "بودجه ماهانه"],
      submit: "رزرو جلسه رایگان",
    },
    contact: { address: "قزوین، بلوار دانشگاه، مرکز نوآوری، واحد ۹", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "شنبه تا چهارشنبه ۱۰ تا ۱۹" },
  },
  {
    slug: "saas",
    name: "استارتاپ SaaS",
    category: "saas",
    categoryLabel: "SaaS",
    brandName: "پلتفرم اوج",
    tagline: "نرم‌افزاری که تیم را جلو می‌برد",
    description: "دارک مود مدرن با گرادیان‌های ظریف، الهام‌گرفته از Linear و Vercel.",
    aesthetic: "دارک مود · گرادیان ظریف · مدرن",
    displayFont: "sans",
    motion: "precise",
    palette: {
      bg: "#06080f",
      surface: "#0d111c",
      text: "#eef2f8",
      muted: "#94a3b8",
      primary: "#3b6df6",
      secondary: "#22d3ee",
      border: "#1a2233",
      onPrimary: "#ffffff",
      gradient: "linear-gradient(140deg,#13203c,#0d111c 60%,#06080f)",
      dark: true,
    },
    blocks: ["hero", "logos", "services", "stats", "pricing", "testimonials", "faq", "cta", "contact"],
    hero: {
      badge: "نسخه ۲.۰ منتشر شد",
      title: "همه کارهای تیم،",
      highlight: "در یک فضای کاری",
      subtitle:
        "مدیریت پروژه، مستندات و گزارش‌ها با سرعتی که انتظارش را دارید. رایگان شروع کنید، بدون نیاز به کارت بانکی.",
      primaryCta: "شروع رایگان",
      secondaryCta: "تماشای دمو",
    },
    stats: [
      { value: "۱۲٬۰۰۰", label: "تیم فعال" },
      { value: "۹۹.۹۸٪", label: "آپ‌تایم" },
      { value: "۴۰ ms", label: "میانگین پاسخ" },
      { value: "۳۲", label: "یکپارچه‌سازی" },
    ],
    serviceHeading: "قابلیت‌ها",
    services: [
      { title: "تسک‌ها و جریان کار", desc: "کانبان، اسپرینت و خودکارسازی" },
      { title: "مستندات زنده", desc: "ویرایش هم‌زمان با تاریخچه نسخه" },
      { title: "گزارش و داشبورد", desc: "شاخص‌های تیمی در لحظه" },
      { title: "یکپارچه‌سازی", desc: "گیت‌هاب، اسلک، فیگما و ۲۹ سرویس دیگر" },
      { title: "دسترسی نقش‌محور", desc: "کنترل دقیق سطوح دسترسی" },
      { title: "API عمومی", desc: "ساخت افزونه اختصاصی تیم شما" },
    ],
    galleryHeading: "تور محصول",
    gallery: [
      { title: "نمای برد", hue: "linear-gradient(135deg,#1e3a8a,#0d111c)" },
      { title: "مستندات", hue: "linear-gradient(135deg,#0e7490,#0d111c)" },
      { title: "گزارش‌ها", hue: "linear-gradient(135deg,#3b6df6,#111a2e)" },
      { title: "تنظیمات تیم", hue: "linear-gradient(135deg,#334155,#06080f)" },
    ],
    teamHeading: "تیم سازنده",
    team: [
      { name: "حسین رحمانی", role: "بنیان‌گذار", meta: "معماری محصول" },
      { name: "سارا مهدوی", role: "مدیر محصول", meta: "۸ سال تجربه SaaS" },
      { name: "امیر کیوان", role: "مهندس ارشد", meta: "زیرساخت و عملکرد" },
    ],
    pricingHeading: "قیمت‌گذاری",
    pricing: [
      { name: "رایگان", price: "۰", period: "ماهانه", features: ["تا ۵ کاربر", "۳ پروژه", "پشتیبانی انجمنی"] },
      { name: "حرفه‌ای", price: "۲٬۹۰۰٬۰۰۰", period: "ماهانه", features: ["کاربر نامحدود", "پروژه نامحدود", "گزارش پیشرفته", "پشتیبانی اولویت‌دار"], featured: true },
      { name: "سازمانی", price: "توافقی", period: "سالانه", features: ["استقرار اختصاصی", "SSO و SAML", "SLA ۹۹.۹۹٪", "مدیر موفقیت مشتری"] },
    ],
    testimonials: [
      { quote: "بعد از مهاجرت به اوج، زمان برنامه‌ریزی اسپرینت‌مان نصف شد.", name: "مدیر فنی نکسو", role: "مشتری" },
      { quote: "سرعت رابط کاربری واقعاً تفاوت ایجاد می‌کند؛ هیچ تأخیری حس نمی‌شود.", name: "بنیان‌گذار رایکا", role: "مشتری" },
      { quote: "یکپارچگی با گیت‌هاب دقیقاً همان چیزی بود که نیاز داشتیم.", name: "سرپرست تیم آوید", role: "مشتری" },
    ],
    faq: [
      { q: "آیا نسخه رایگان محدودیت زمانی دارد؟", a: "خیر، پلن رایگان همیشه رایگان است و تا ۵ کاربر بدون محدودیت زمانی قابل استفاده است." },
      { q: "داده‌ها کجا ذخیره می‌شوند؟", a: "روی زیرساخت ابری داخل کشور با پشتیبان‌گیری روزانه و رمزنگاری در حالت سکون." },
      { q: "امکان مهاجرت از ابزار فعلی هست؟", a: "بله، ابزار مهاجرت از جیرا، ترلو و آسانا به‌صورت رایگان در دسترس است." },
    ],
    process: [
      { title: "ثبت‌نام", desc: "بدون کارت بانکی" },
      { title: "ایمپورت", desc: "انتقال داده از ابزار قبلی" },
      { title: "پیکربندی", desc: "جریان کاری تیم شما" },
      { title: "رشد", desc: "گزارش و بهینه‌سازی" },
    ],
    logos: ["نکسو", "رایکا", "آوید", "دیجی‌مد", "پارس‌راد"],
    booking: {
      heading: "شروع کنید",
      desc: "حساب رایگان بسازید یا جلسه دمو با تیم فروش رزرو کنید.",
      fields: ["نام تیم", "ایمیل کاری", "تعداد اعضا"],
      submit: "ساخت حساب رایگان",
    },
    contact: { address: "قزوین، مرکز رشد فناوری، واحد ۲۱", phone: "۰۹۱۵۲۵۲۱۱۶۶", hours: "پشتیبانی ۲۴/۷ آنلاین" },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
