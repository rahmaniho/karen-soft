export interface Property {
  id: string;
  title: string;
  district: string;
  area: number;
  rooms: number;
  price: number;
  deal: "فروش" | "رهن و اجاره";
  status: "فعال" | "رزرو" | "فروخته‌شده";
}

export interface Buyer {
  id: string;
  name: string;
  budget: number;
  minArea: number;
  rooms: number;
  district: string;
}

export const PROPERTIES: Property[] = [
  { id: "f-۱۰۱", title: "آپارتمان نوساز زیباشهر", district: "زیباشهر", area: 120, rooms: 3, price: 6_800_000_000, deal: "فروش", status: "فعال" },
  { id: "f-۱۰۲", title: "ویلایی دوبلکس مینودر", district: "مینودر", area: 240, rooms: 4, price: 12_400_000_000, deal: "فروش", status: "فعال" },
  { id: "f-۱۰۳", title: "آپارتمان بازسازی‌شده بلوار امام", district: "بلوار امام", area: 85, rooms: 2, price: 3_900_000_000, deal: "فروش", status: "رزرو" },
  { id: "f-۱۰۴", title: "دفتر کار مرکز شهر", district: "مرکز شهر", area: 60, rooms: 2, price: 2_600_000_000, deal: "رهن و اجاره", status: "فعال" },
  { id: "f-۱۰۵", title: "آپارتمان ۱۴۰ متری زیباشهر", district: "زیباشهر", area: 140, rooms: 3, price: 8_100_000_000, deal: "فروش", status: "فعال" },
  { id: "f-۱۰۶", title: "مغازه بازار سنتی", district: "مرکز شهر", area: 35, rooms: 1, price: 8_900_000_000, deal: "فروش", status: "فروخته‌شده" },
];

export const BUYERS: Buyer[] = [
  { id: "b1", name: "خانواده محمدی", budget: 7_000_000_000, minArea: 110, rooms: 3, district: "زیباشهر" },
  { id: "b2", name: "آقای صادقی", budget: 13_000_000_000, minArea: 200, rooms: 4, district: "مینودر" },
  { id: "b3", name: "خانم رحیمی", budget: 4_000_000_000, minArea: 80, rooms: 2, district: "بلوار امام" },
  { id: "b4", name: "شرکت نوآوران", budget: 3_000_000_000, minArea: 55, rooms: 2, district: "مرکز شهر" },
];

export const VIEWINGS = [
  { id: "v1", property: "آپارتمان نوساز زیباشهر", buyer: "خانواده محمدی", date: "۱۴۰۵/۰۷/۱۴", agent: "زهرا احمدی", result: "در انتظار" },
  { id: "v2", property: "ویلایی دوبلکس مینودر", buyer: "آقای صادقی", date: "۱۴۰۵/۰۷/۱۶", agent: "رضا کریمی", result: "در انتظار" },
];

export const AGENTS = ["رضا کریمی", "زهرا احمدی", "محسن پناهی", "نرگس ملکی"];
