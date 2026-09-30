export type ProjectStage = "brief" | "design" | "build" | "review" | "done";

export interface ServiceProject {
  id: string;
  client: string;
  service: string;
  stage: ProjectStage;
  progress: number;
  due: string;
}

export interface Ticket {
  id: string;
  subject: string;
  client: string;
  priority: "کم" | "متوسط" | "زیاد";
  status: "باز" | "در حال بررسی" | "بسته";
}

export const PROJECT_STAGES: { id: ProjectStage; title: string }[] = [
  { id: "brief", title: "بریف" },
  { id: "design", title: "طراحی" },
  { id: "build", title: "توسعه" },
  { id: "review", title: "بازبینی" },
  { id: "done", title: "تحویل" },
];

export const SERVICES_CATALOG = [
  { id: "sv1", name: "طراحی وب‌سایت شرکتی", price: 85_000_000, duration: "۴ هفته" },
  { id: "sv2", name: "فروشگاه اینترنتی", price: 160_000_000, duration: "۷ هفته" },
  { id: "sv3", name: "سئو و بهینه‌سازی", price: 38_000_000, duration: "ماهانه" },
  { id: "sv4", name: "طراحی هویت بصری", price: 45_000_000, duration: "۳ هفته" },
  { id: "sv5", name: "اپلیکیشن موبایل", price: 280_000_000, duration: "۱۲ هفته" },
];

export const PROJECTS: ServiceProject[] = [
  { id: "pr-۹۰۱", client: "کلینیک سلامت پارس", service: "طراحی وب‌سایت شرکتی", stage: "build", progress: 62, due: "۱۴۰۵/۰۸/۱۰" },
  { id: "pr-۹۰۲", client: "بوتیک نوا", service: "فروشگاه اینترنتی", stage: "design", progress: 34, due: "۱۴۰۵/۰۹/۰۲" },
  { id: "pr-۹۰۳", client: "آموزشگاه کارن", service: "سئو و بهینه‌سازی", stage: "review", progress: 88, due: "۱۴۰۵/۰۷/۲۰" },
  { id: "pr-۹۰۴", client: "ساختمانی آرمان‌سازه", service: "طراحی هویت بصری", stage: "brief", progress: 12, due: "۱۴۰۵/۰۸/۲۵" },
];

export const TICKETS_SEED: Ticket[] = [
  { id: "ت-۴۴۱", subject: "عدم نمایش تصاویر در صفحه محصولات", client: "بوتیک نوا", priority: "زیاد", status: "باز" },
  { id: "ت-۴۴۲", subject: "درخواست افزودن درگاه پرداخت دوم", client: "کلینیک سلامت پارس", priority: "متوسط", status: "در حال بررسی" },
  { id: "ت-۴۴۳", subject: "به‌روزرسانی محتوای صفحه تماس", client: "آموزشگاه کارن", priority: "کم", status: "بسته" },
];

export const MILESTONES = [
  { title: "تحویل بریف و تأیید دامنه", done: true },
  { title: "طراحی صفحات کلیدی", done: true },
  { title: "توسعه فرانت‌اند", done: false },
  { title: "اتصال پنل مدیریت", done: false },
  { title: "تست و تحویل نهایی", done: false },
];
