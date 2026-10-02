/* نمونه‌کارهای کارن چاپ
 * گالری تصاویر؛ هر مورد به خانوادۀ خدمت مربوطه وصل است.
 * این فایل از نسخۀ قدیمی کارن چاپ (legacy/print.html) استخراج و به TypeScript تبدیل شده است.
 */
import type { PrintWork } from "../types";

export const PRINT_WORKS: PrintWork[] = [
  {
    image: "/images/print/house.jpg",
    title: "چاپخانه حرفه‌ای کارن چاپ در قزوین",
    categoryLabel: "چاپخانه",
    caption: "چاپخانه حرفه‌ای کارن چاپ",
    description: "تجهیزات مدرن چاپ دیجیتال و افست با کیفیت بالا",
    category: "print",
  },
  {
    image: "/images/print/tshirt.jpg",
    title: "نمونه چاپ تیشرت تبلیغاتی سابلیمیشن",
    categoryLabel: "چاپ پوشاک",
    caption: "چاپ تیشرت تبلیغاتی",
    description: "سفارش ۱۰۰ عددی برای شرکت فناوری با کیفیت چاپ سابلیمیشن",
    category: "gift",
  },
  {
    image: "/images/print/mug.jpg",
    title: "نمونه چاپ ماگ سفارشی با طرح دلخواه",
    categoryLabel: "هدایای تبلیغاتی",
    caption: "چاپ ماگ سفارشی",
    description: "طراحی و چاپ اختصاصی روی ماگ سرامیکی با کیفیت بالا",
    category: "gift",
  },
  {
    image: "/images/print/cover.jpg",
    title: "نمونه چاپ کاور کتاب با کیفیت بالا",
    categoryLabel: "چاپ کتاب",
    caption: "چاپ کاور کتاب",
    description: "پروژه چاپ ۵۰۰ جلدی کتاب با جلد گلاسه و روکش مات",
    category: "print",
  },
  {
    image: "/images/print/tract.jpg",
    title: "نمونه چاپ تراکت تبلیغاتی رنگی",
    categoryLabel: "چاپ تبلیغاتی",
    caption: "چاپ تراکت تبلیغاتی",
    description: "سفارش ۵۰۰۰ نسخه‌ای تراکت رنگی A5 با کیفیت افست",
    category: "tract",
  },
  {
    image: "/images/print/fanari.jpg",
    title: "نمونه صحافی فنری جزوه دانشگاهی",
    categoryLabel: "صحافی تخصصی",
    caption: "صحافی فنری جزوه",
    description: "پروژه صحافی دانشگاهی با فنر دوگانه و جلد شفاف PVC",
    category: "binding",
  },
  {
    image: "/images/print/binding.jpg",
    title: "نمونه صحافی گالینگور کتاب نفیس",
    categoryLabel: "صحافی نفیس",
    caption: "صحافی گالینگور کتاب",
    description: "کتاب نفیس با جلد سخت گالینگور و طلاکوب",
    category: "binding",
  },
  {
    image: "/images/print/stamp.jpg",
    title: "نمونه مهر لیزری اداری با کیفیت بالا",
    categoryLabel: "مهر",
    caption: "مهر لیزری",
    description: "دقت بالا و ماندگاری طولانی",
    category: "stamp",
  },
  {
    image: "/images/print/cards.jpg",
    title: "کارت ویزیت سلفون مات دورگرد",
    categoryLabel: "کارت ویزیت",
    caption: "چاپ کارت ویزیت لمینت",
    description: "سفارش ۲۰۰۰ عددی کارت ویزیت لمینت مات با یووی موضعی",
    category: "print",
  },
  {
    image: "/images/print/booklet.jpg",
    title: "بروشور سه‌لت A4 با روکش سلفون",
    categoryLabel: "بروشور و کاتالوگ",
    caption: "چاپ بروشور تبلیغاتی",
    description: "چاپ افست چهاررنگ با کاغذ گلاسه ۱۵۰ گرم",
    category: "brochure",
  },
  {
    image: "/images/print/ink.jpg",
    title: "کنترل رنگ با نوارهای CMYK",
    categoryLabel: "چاپ افست",
    caption: "کالیبراسیون رنگ",
    description: "هم‌رنگی نسخه‌ها با کنترل دقیق تراکم رنگ",
    category: "print",
  },
];

export const PRINT_WORK_CATEGORIES: { id: string; label: string }[] = [
  { id: "print", label: "چاپ" },
  { id: "stamp", label: "مهر" },
  { id: "binding", label: "صحافی" },
  { id: "gift", label: "پوشاک و هدایا" },
  { id: "tract", label: "تراکت و اعلانات" },
  { id: "brochure", label: "بروشور" },
  { id: "certificate", label: "تقدیرنامه" },
];
