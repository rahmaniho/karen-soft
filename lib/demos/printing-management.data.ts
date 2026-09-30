export type PrintStage = "design" | "cylinder" | "printing" | "cutting" | "delivered";

export interface PrintOrder {
  id: string;
  customer: string;
  product: string;
  meters: number;
  colors: number;
  dueDate: string;
  stage: PrintStage;
  machine: string;
  priority: "عادی" | "فوری";
}

export const PRINT_STAGES: { id: PrintStage; title: string }[] = [
  { id: "design", title: "طراحی" },
  { id: "cylinder", title: "سیلندر و کلیشه" },
  { id: "printing", title: "چاپ" },
  { id: "cutting", title: "برش و بسته‌بندی" },
  { id: "delivered", title: "تحویل شده" },
];

export const PRINT_MACHINES = [
  { id: "m1", name: "روتوگراور ۸ رنگ — RG800", capacityPerHour: 4200 },
  { id: "m2", name: "روتوگراور ۶ رنگ — RG600", capacityPerHour: 3600 },
  { id: "m3", name: "لمینیت خشک — LM200", capacityPerHour: 5000 },
  { id: "m4", name: "برش و ریواندینگ — SL120", capacityPerHour: 6000 },
];

const customers = [
  "صنایع غذایی پارس", "لبنیات دامداران", "بسته‌بندی آرمان", "چیپس و اسنک مزرعه",
  "قهوه کارن", "پخش نوین", "شکلات آوا", "آرد ستاره", "ادویه سحر", "روغن گلبهار",
];

const products = [
  "فیلم BOPP ۲۰ میکرون", "پاکت ایستاده", "رول لمینیت سه‌لایه", "برچسب شیرینگ",
  "فیلم PET چاپی", "پاکت فلوپک", "رول CPP", "لفاف شکلات",
];

function makeOrders(): PrintOrder[] {
  const stages: PrintStage[] = ["design", "cylinder", "printing", "printing", "cutting", "delivered"];
  return Array.from({ length: 20 }, (_, index) => ({
    id: `ORD-${1400 + index}`,
    customer: customers[index % customers.length]!,
    product: products[index % products.length]!,
    meters: 3_000 + ((index * 1_730) % 22_000),
    colors: 3 + (index % 6),
    dueDate: `۱۴۰۵/۰۷/${String(5 + (index % 20)).padStart(2, "0")}`,
    stage: stages[index % stages.length]!,
    machine: PRINT_MACHINES[index % PRINT_MACHINES.length]!.name,
    priority: index % 5 === 0 ? "فوری" : "عادی",
  }));
}

export const PRINT_ORDERS: PrintOrder[] = makeOrders();

export const PRINT_INKS = [
  { id: "ink-1", name: "مشکی روتوگراور", stock: 420, unit: "کیلوگرم", reorder: 150 },
  { id: "ink-2", name: "سایان", stock: 180, unit: "کیلوگرم", reorder: 120 },
  { id: "ink-3", name: "مجنتا", stock: 95, unit: "کیلوگرم", reorder: 120 },
  { id: "ink-4", name: "زرد", stock: 240, unit: "کیلوگرم", reorder: 120 },
  { id: "ink-5", name: "سفید پوششی", stock: 610, unit: "کیلوگرم", reorder: 250 },
  { id: "ink-6", name: "طلایی متالیک", stock: 48, unit: "کیلوگرم", reorder: 60 },
  { id: "ink-7", name: "نقره‌ای متالیک", stock: 72, unit: "کیلوگرم", reorder: 60 },
  { id: "ink-8", name: "لاک براق", stock: 330, unit: "کیلوگرم", reorder: 150 },
  { id: "ink-9", name: "لاک مات", stock: 140, unit: "کیلوگرم", reorder: 100 },
  { id: "ink-10", name: "آبی رفلکس", stock: 88, unit: "کیلوگرم", reorder: 80 },
  { id: "ink-11", name: "قرمز آتشین", stock: 110, unit: "کیلوگرم", reorder: 80 },
  { id: "ink-12", name: "سبز چمنی", stock: 65, unit: "کیلوگرم", reorder: 70 },
  { id: "ink-13", name: "نارنجی", stock: 95, unit: "کیلوگرم", reorder: 70 },
  { id: "ink-14", name: "بنفش", stock: 40, unit: "کیلوگرم", reorder: 50 },
  { id: "ink-15", name: "حلال اتیل استات", stock: 1_250, unit: "لیتر", reorder: 500 },
];

export const PRINT_ROLLS = [
  { id: "roll-1", name: "BOPP 20µ — عرض ۱۰۵۰", stock: 8_400, unit: "کیلوگرم", reorder: 3_000 },
  { id: "roll-2", name: "BOPP 25µ — عرض ۹۰۰", stock: 5_100, unit: "کیلوگرم", reorder: 2_500 },
  { id: "roll-3", name: "PET 12µ — عرض ۱۲۰۰", stock: 2_300, unit: "کیلوگرم", reorder: 2_500 },
  { id: "roll-4", name: "CPP 30µ — عرض ۱۰۵۰", stock: 6_700, unit: "کیلوگرم", reorder: 2_000 },
  { id: "roll-5", name: "PE 50µ — عرض ۸۰۰", stock: 1_800, unit: "کیلوگرم", reorder: 2_000 },
  { id: "roll-6", name: "آلومینیوم 7µ", stock: 950, unit: "کیلوگرم", reorder: 800 },
  { id: "roll-7", name: "کاغذ گلاسه ۸۰ گرم", stock: 3_200, unit: "کیلوگرم", reorder: 1_500 },
  { id: "roll-8", name: "متالایز 18µ", stock: 2_650, unit: "کیلوگرم", reorder: 1_200 },
];

export const QC_CHECKLIST = [
  { id: "qc-1", label: "تطابق رنگ با نمونه تأییدشده", hint: "اختلاف ΔE کمتر از ۲" },
  { id: "qc-2", label: "رجیستر چاپ", hint: "انحراف کمتر از ۰.۱ میلی‌متر" },
  { id: "qc-3", label: "چسبندگی مرکب", hint: "تست نوار چسب" },
  { id: "qc-4", label: "کیفیت لمینیت", hint: "بدون حباب و دلامینه" },
  { id: "qc-5", label: "دقت برش و عرض رول", hint: "تلورانس ±۱ میلی‌متر" },
  { id: "qc-6", label: "سلامت هسته و بسته‌بندی", hint: "بدون لهیدگی" },
];

export const WASTE_REASONS = ["ست‌آپ اولیه", "اختلاف رنگ", "پارگی فیلم", "خطای رجیستر", "توقف ماشین"];

export const PRODUCTION_TREND = [
  { label: "شنبه", value: 42_000 },
  { label: "یکشنبه", value: 51_000 },
  { label: "دوشنبه", value: 47_500 },
  { label: "سه‌شنبه", value: 58_000 },
  { label: "چهارشنبه", value: 61_200 },
  { label: "پنجشنبه", value: 38_400 },
];

export const WASTE_TREND = [
  { label: "هفته ۱", value: 6.4 },
  { label: "هفته ۲", value: 5.8 },
  { label: "هفته ۳", value: 5.1 },
  { label: "هفته ۴", value: 4.3 },
];

export const COST_DEFAULTS = {
  meters: 12_000,
  colors: 6,
  filmPricePerKg: 185_000,
  gramsPerMeter: 22,
  inkPricePerKg: 620_000,
  cylinderCost: 38_000_000,
  machineHourCost: 4_200_000,
  speedPerHour: 4_200,
  wastePercent: 6,
  overheadPercent: 12,
};
