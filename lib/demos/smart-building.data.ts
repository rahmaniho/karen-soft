export interface Unit {
  id: string;
  floor: number;
  number: string;
  owner: string;
  residents: number;
  area: number;
  charge: number;
  paid: boolean;
}

export interface RepairTicket {
  id: string;
  title: string;
  unit: string;
  status: "ثبت‌شده" | "در حال انجام" | "بسته‌شده";
  assignee?: string;
  createdAt: string;
}

const owners = ["کاظمی", "رحمانی", "احمدی", "موسوی", "شریفی", "نجفی", "کریمی", "سلطانی"];

export const UNITS: Unit[] = Array.from({ length: 24 }, (_, index) => {
  const floor = Math.floor(index / 4) + 1;
  const number = `${floor}${(index % 4) + 1}`;
  const area = [78, 92, 105, 120][index % 4]!;
  return {
    id: `u-${number}`,
    floor,
    number,
    owner: `خانواده ${owners[index % owners.length]}`,
    residents: (index % 4) + 1,
    area,
    charge: area * 14_000 + ((index % 4) + 1) * 120_000,
    paid: index % 3 !== 0,
  };
});

export const TICKETS: RepairTicket[] = [
  { id: "t-۳۰۱", title: "خرابی آسانسور بلوک A", unit: "مشاعات", status: "در حال انجام", assignee: "شرکت آسانسور پارس", createdAt: "۱۴۰۵/۰۷/۰۲" },
  { id: "t-۳۰۲", title: "نشتی لوله واحد ۳۲", unit: "۳۲", status: "ثبت‌شده", createdAt: "۱۴۰۵/۰۷/۰۵" },
  { id: "t-۳۰۳", title: "چراغ پارکینگ سوخته", unit: "مشاعات", status: "بسته‌شده", assignee: "سرایدار", createdAt: "۱۴۰۵/۰۶/۲۸" },
];

export const CONTRACTORS = ["سرایدار", "شرکت آسانسور پارس", "تأسیسات کارن", "نظافت مهر"];

export const VISITORS = [
  { id: "vi1", name: "پیک تیپاکس", unit: "۲۱", time: "۰۹:۱۴", type: "مرسوله" },
  { id: "vi2", name: "مهمان خانوادگی", unit: "۴۳", time: "۱۸:۳۰", type: "مهمان" },
  { id: "vi3", name: "تعمیرکار کولر", unit: "۱۲", time: "۱۱:۰۵", type: "خدمات" },
];
