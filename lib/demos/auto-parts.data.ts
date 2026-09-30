export interface Part {
  id: string;
  name: string;
  brand: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  code: string;
  price: number;
  stock: number;
  reorder: number;
  supplier: string;
}

export const CAR_BRANDS = ["ایران‌خودرو", "سایپا", "کیا", "هیوندای"];

export const CAR_MODELS: Record<string, string[]> = {
  "ایران‌خودرو": ["پژو ۲۰۶", "پژو پارس", "سمند", "دنا"],
  "سایپا": ["پراید ۱۳۱", "تیبا", "ساینا", "شاهین"],
  "کیا": ["سراتو", "اسپورتیج"],
  "هیوندای": ["النترا", "توسان"],
};

const partNames = ["لنت ترمز جلو", "فیلتر روغن", "شمع موتور", "تسمه تایم", "دیسک ترمز", "واتر پمپ", "کمک فنر جلو", "سیبک فرمان"];
const suppliers = ["پخش مرکزی تهران", "بازرگانی کارن", "وارداتی آسیا", "تولیدی پارس‌قطعه"];

export const PARTS: Part[] = CAR_BRANDS.flatMap((brand, brandIndex) =>
  (CAR_MODELS[brand] ?? []).flatMap((model, modelIndex) =>
    partNames.slice(0, 4).map((name, partIndex) => {
      const seed = brandIndex * 17 + modelIndex * 7 + partIndex * 3;
      return {
        id: `pt-${brandIndex}${modelIndex}${partIndex}`,
        name,
        brand,
        model,
        yearFrom: 1385 + (seed % 8),
        yearTo: 1404,
        code: `KS-${1000 + seed * 13}`,
        price: 480_000 + seed * 95_000,
        stock: (seed * 7) % 60,
        reorder: 12,
        supplier: suppliers[seed % suppliers.length]!,
      };
    }),
  ),
);

export const PART_ORDERS = [
  { id: "س-۷۷۱", customer: "تعمیرگاه مرکزی", items: 12, total: 18_400_000, status: "در حال آماده‌سازی" },
  { id: "س-۷۷۲", customer: "اتو سرویس کارن", items: 4, total: 5_900_000, status: "ارسال‌شده" },
  { id: "س-۷۷۳", customer: "مشتری حضوری", items: 2, total: 1_480_000, status: "تحویل‌شده" },
];
