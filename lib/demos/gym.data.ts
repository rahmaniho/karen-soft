export interface Member {
  id: string;
  name: string;
  plan: "برنزی" | "نقره‌ای" | "طلایی";
  expiresIn: number;
  coach: string;
  checkedIn: boolean;
  program?: string;
}

export const COACHES = ["آرش نوری", "سمیرا فتحی", "بهنام اکبری", "هانیه رستمی"];

export const MEMBERS: Member[] = [
  { id: "g1", name: "حمید رحیمی", plan: "نقره‌ای", expiresIn: 12, coach: "آرش نوری", checkedIn: false },
  { id: "g2", name: "مینا جعفری", plan: "طلایی", expiresIn: 3, coach: "سمیرا فتحی", checkedIn: false },
  { id: "g3", name: "سعید نجفی", plan: "برنزی", expiresIn: 26, coach: "بهنام اکبری", checkedIn: false },
  { id: "g4", name: "الهام کریمی", plan: "نقره‌ای", expiresIn: 1, coach: "سمیرا فتحی", checkedIn: false },
  { id: "g5", name: "پویا مرادی", plan: "طلایی", expiresIn: 45, coach: "آرش نوری", checkedIn: false },
  { id: "g6", name: "نگار سلیمی", plan: "برنزی", expiresIn: 8, coach: "هانیه رستمی", checkedIn: false },
  { id: "g7", name: "رضا کاویانی", plan: "نقره‌ای", expiresIn: 19, coach: "بهنام اکبری", checkedIn: false },
  { id: "g8", name: "سارا احمدی", plan: "طلایی", expiresIn: 2, coach: "سمیرا فتحی", checkedIn: false },
];

export const PLAN_PRICES = { برنزی: 1_200_000, نقره‌ای: 1_950_000, طلایی: 3_600_000 } as const;

export const WORKOUT_TEMPLATES = [
  { id: "w1", name: "چربی‌سوزی ۸ هفته", sessions: "۴ جلسه در هفته", focus: "هوازی + مقاومتی سبک" },
  { id: "w2", name: "حجم و قدرت", sessions: "۵ جلسه در هفته", focus: "وزنه سنگین، تکرار کم" },
  { id: "w3", name: "فانکشنال مبتدی", sessions: "۳ جلسه در هفته", focus: "حرکات ترکیبی با وزن بدن" },
  { id: "w4", name: "آمادگی مسابقه", sessions: "۶ جلسه در هفته", focus: "قدرت انفجاری و ریکاوری" },
];

export const ATTENDANCE_TREND = [
  { label: "شنبه", value: 92 },
  { label: "یکشنبه", value: 118 },
  { label: "دوشنبه", value: 104 },
  { label: "سه‌شنبه", value: 126 },
  { label: "چهارشنبه", value: 131 },
  { label: "پنجشنبه", value: 88 },
];
