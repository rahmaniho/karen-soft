export interface MenuItem {
  id: string;
  name: string;
  category: "پیش‌غذا" | "غذای اصلی" | "دسر" | "نوشیدنی";
  price: number;
  prepMinutes: number;
  available: boolean;
}

export interface RestaurantTable {
  id: string;
  name: string;
  seats: number;
  status: "آزاد" | "مشغول" | "رزرو";
}

export interface KitchenTicket {
  id: string;
  table: string;
  items: { name: string; qty: number }[];
  createdAt: number;
  status: "در صف" | "در حال آماده‌سازی" | "آماده";
}

export const MENU: MenuItem[] = [
  { id: "m1", name: "چلوکباب سلطانی", category: "غذای اصلی", price: 485_000, prepMinutes: 18, available: true },
  { id: "m2", name: "خورش فسنجان", category: "غذای اصلی", price: 390_000, prepMinutes: 12, available: true },
  { id: "m3", name: "باقالی‌پلو با ماهیچه", category: "غذای اصلی", price: 520_000, prepMinutes: 15, available: true },
  { id: "m4", name: "جوجه‌کباب زعفرانی", category: "غذای اصلی", price: 360_000, prepMinutes: 14, available: true },
  { id: "m5", name: "میرزاقاسمی", category: "پیش‌غذا", price: 185_000, prepMinutes: 8, available: true },
  { id: "m6", name: "کشک بادمجان", category: "پیش‌غذا", price: 165_000, prepMinutes: 7, available: true },
  { id: "m7", name: "سالاد فصل شف", category: "پیش‌غذا", price: 145_000, prepMinutes: 5, available: false },
  { id: "m8", name: "بستنی سنتی زعفرانی", category: "دسر", price: 135_000, prepMinutes: 4, available: true },
  { id: "m9", name: "شله‌زرد خانگی", category: "دسر", price: 110_000, prepMinutes: 3, available: true },
  { id: "m10", name: "شربت به‌لیمو", category: "نوشیدنی", price: 95_000, prepMinutes: 2, available: true },
  { id: "m11", name: "دوغ محلی", category: "نوشیدنی", price: 65_000, prepMinutes: 1, available: true },
  { id: "m12", name: "چای زعفرانی", category: "نوشیدنی", price: 55_000, prepMinutes: 3, available: true },
];

export const TABLES: RestaurantTable[] = Array.from({ length: 12 }, (_, index) => ({
  id: `t${index + 1}`,
  name: `میز ${index + 1}`,
  seats: [2, 4, 4, 6, 2, 4, 8, 4, 2, 6, 4, 4][index]!,
  status: index % 5 === 0 ? "مشغول" : index % 7 === 3 ? "رزرو" : "آزاد",
}));

export const STOCK = [
  { id: "s1", name: "برنج ایرانی", stock: 180, unit: "کیلوگرم", reorder: 80 },
  { id: "s2", name: "گوشت گوسفندی", stock: 42, unit: "کیلوگرم", reorder: 50 },
  { id: "s3", name: "مرغ تازه", stock: 96, unit: "کیلوگرم", reorder: 60 },
  { id: "s4", name: "زعفران", stock: 0.4, unit: "کیلوگرم", reorder: 0.3 },
  { id: "s5", name: "گردو", stock: 24, unit: "کیلوگرم", reorder: 20 },
  { id: "s6", name: "بادمجان", stock: 38, unit: "کیلوگرم", reorder: 25 },
];

export const SALES_TREND = [
  { label: "۱۲", value: 4_800_000 },
  { label: "۱۴", value: 9_200_000 },
  { label: "۱۶", value: 6_400_000 },
  { label: "۱۸", value: 14_500_000 },
  { label: "۲۰", value: 22_800_000 },
  { label: "۲۲", value: 17_300_000 },
];
