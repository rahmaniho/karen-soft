export type OrderStage = "new" | "packing" | "shipping" | "delivered";

export interface StoreOrder {
  id: string;
  customer: string;
  total: number;
  items: number;
  city: string;
  stage: OrderStage;
}

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  published: boolean;
}

export const ORDER_STAGES: { id: OrderStage; title: string }[] = [
  { id: "new", title: "سفارش جدید" },
  { id: "packing", title: "آماده‌سازی" },
  { id: "shipping", title: "ارسال" },
  { id: "delivered", title: "تحویل‌شده" },
];

export const STORE_ORDERS: StoreOrder[] = [
  { id: "س-۵۵۰۱", customer: "نیلوفر رستمی", total: 4_850_000, items: 2, city: "قزوین", stage: "new" },
  { id: "س-۵۵۰۲", customer: "امیر حیدری", total: 1_950_000, items: 1, city: "تهران", stage: "new" },
  { id: "س-۵۵۰۳", customer: "مریم سلطانی", total: 7_600_000, items: 4, city: "کرج", stage: "packing" },
  { id: "س-۵۵۰۴", customer: "سعید فرهادی", total: 2_200_000, items: 1, city: "اصفهان", stage: "packing" },
  { id: "س-۵۵۰۵", customer: "هلیا کاظمی", total: 5_400_000, items: 3, city: "شیراز", stage: "shipping" },
  { id: "س-۵۵۰۶", customer: "بهار نیکو", total: 1_350_000, items: 1, city: "قزوین", stage: "delivered" },
];

export const STORE_PRODUCTS: StoreProduct[] = [
  { id: "p1", name: "پالتو پشمی اورسایز", price: 4_800_000, stock: 12, category: "پالتو", published: true },
  { id: "p2", name: "پیراهن کتان", price: 1_950_000, stock: 48, category: "پیراهن", published: true },
  { id: "p3", name: "شلوار پارچه‌ای", price: 2_200_000, stock: 31, category: "شلوار", published: true },
  { id: "p4", name: "بافت یقه‌اسکی", price: 2_950_000, stock: 4, category: "بافت", published: true },
  { id: "p5", name: "کیف چرم دست‌دوز", price: 5_400_000, stock: 7, category: "اکسسوری", published: false },
  { id: "p6", name: "شال ابریشمی", price: 1_350_000, stock: 62, category: "اکسسوری", published: true },
];

export const STORE_CUSTOMERS = [
  { id: "sc1", name: "نیلوفر رستمی", orders: 14, ltv: 42_800_000, tier: "طلایی" },
  { id: "sc2", name: "امیر حیدری", orders: 3, ltv: 6_200_000, tier: "عضو" },
  { id: "sc3", name: "مریم سلطانی", orders: 9, ltv: 28_400_000, tier: "نقره‌ای" },
  { id: "sc4", name: "هلیا کاظمی", orders: 21, ltv: 66_900_000, tier: "طلایی" },
];

export const SALES_SERIES = [
  { label: "هفته ۱", value: 148 },
  { label: "هفته ۲", value: 176 },
  { label: "هفته ۳", value: 132 },
  { label: "هفته ۴", value: 214 },
];
