export interface TaxiDriver {
  id: string;
  name: string;
  car: string;
  plate: string;
  status: "آزاد" | "در سفر" | "آفلاین";
  rating: number;
  x: number;
  y: number;
}

export interface TaxiRide {
  id: string;
  passenger: string;
  from: string;
  to: string;
  distanceKm: number;
  requestedAt: string;
  driverId?: string;
  status: "در صف" | "تخصیص‌یافته" | "در حال انجام" | "پایان‌یافته";
}

export const DRIVERS: TaxiDriver[] = [
  { id: "d1", name: "مرتضی صفری", car: "پژو ۲۰۶", plate: "۷۹ ع ۴۵۱ — ۲۲", status: "آزاد", rating: 4.9, x: 22, y: 30 },
  { id: "d2", name: "کاظم نوری", car: "تیبا", plate: "۱۲ ب ۳۳۸ — ۲۲", status: "در سفر", rating: 4.7, x: 58, y: 24 },
  { id: "d3", name: "حمید رستمی", car: "ساینا", plate: "۴۴ ص ۲۱۰ — ۲۲", status: "آزاد", rating: 4.8, x: 70, y: 62 },
  { id: "d4", name: "یوسف کریمی", car: "پراید ۱۳۱", plate: "۶۵ د ۹۹۱ — ۲۲", status: "آزاد", rating: 4.5, x: 38, y: 74 },
  { id: "d5", name: "سعید احمدی", car: "شاهین", plate: "۲۸ ط ۵۵۰ — ۲۲", status: "در سفر", rating: 5.0, x: 82, y: 40 },
  { id: "d6", name: "بهروز مرادی", car: "کوییک", plate: "۳۳ ل ۷۷۲ — ۲۲", status: "آفلاین", rating: 4.6, x: 14, y: 58 },
];

export const RIDES: TaxiRide[] = [
  { id: "س-۹۰۱", passenger: "فاطمه احمدی", from: "زیباشهر، بلوار اصلی", to: "میدان مینودر", distanceKm: 6.4, requestedAt: "۰۹:۱۲", status: "در صف" },
  { id: "س-۹۰۲", passenger: "محمد رضایی", from: "خیابان فردوسی", to: "ترمینال قزوین", distanceKm: 9.1, requestedAt: "۰۹:۱۵", status: "در صف" },
  { id: "س-۹۰۳", passenger: "شرکت پارس‌راد", from: "شهرک صنعتی", to: "فرودگاه", distanceKm: 24.5, requestedAt: "۰۹:۲۰", status: "در صف" },
  { id: "س-۹۰۴", passenger: "زهرا ملکی", from: "بیمارستان بوعلی", to: "خیابان خیام", distanceKm: 3.2, requestedAt: "۰۹:۲۴", status: "در صف" },
  { id: "س-۸۹۸", passenger: "علی کاظمی", from: "دانشگاه بین‌المللی", to: "مرکز شهر", distanceKm: 11.8, requestedAt: "۰۸:۵۰", driverId: "d2", status: "در حال انجام" },
  { id: "س-۸۹۹", passenger: "نگار سلطانی", from: "بازار سنتی", to: "زیباشهر", distanceKm: 7.3, requestedAt: "۰۸:۵۸", driverId: "d5", status: "در حال انجام" },
];

export const TAXI_CUSTOMERS = [
  { id: "c1", name: "فاطمه احمدی", phone: "۰۹۱۲۱۱۱۲۲۳۳", trips: 48, favorite: "زیباشهر → مرکز شهر" },
  { id: "c2", name: "شرکت پارس‌راد", phone: "۰۲۸۳۳۴۴۵۵۶۶", trips: 312, favorite: "سرویس سازمانی" },
  { id: "c3", name: "محمد رضایی", phone: "۰۹۱۹۸۸۷۷۶۶۵", trips: 21, favorite: "فردوسی → ترمینال" },
  { id: "c4", name: "زهرا ملکی", phone: "۰۹۳۵۴۴۵۵۶۶۷", trips: 96, favorite: "بیمارستان → خیام" },
];

export const TARIFF = { base: 25_000, perKm: 12_000, nightSurcharge: 20, waitPerMinute: 3_000 };

export const TRIP_TREND = [
  { label: "۶", value: 24 },
  { label: "۹", value: 86 },
  { label: "۱۲", value: 64 },
  { label: "۱۵", value: 72 },
  { label: "۱۸", value: 118 },
  { label: "۲۱", value: 74 },
];
