/**
 * دادهٔ نمایشی «اتوماسیون هوشمند کارخانه».
 *
 * همهٔ اعداد این فایل، شبیه‌سازی‌اند و به کارخانهٔ واقعی اشاره ندارند؛
 * برای همین در رابط کاربری هم صریحاً با برچسب «شبیه‌سازی» نمایش داده می‌شوند.
 */

/** کلید عناصر صحنه که هر لایه آن‌ها را روشن می‌کند. */
export type FactorySceneKey = "field" | "control" | "edge" | "erp" | "brain";

export interface FactoryLayer {
  id: string;
  level: string;
  title: string;
  latin: string;
  summary: string;
  /** داده‌هایی که در این لایه تولید یا مصرف می‌شوند. */
  data: string[];
  /** فناوری‌های شاخص لایه. */
  tech: string[];
  /** تصمیمی که این لایه ممکن می‌کند. */
  outcome: string;
  scene: FactorySceneKey[];
}

export const FACTORY_LAYERS: FactoryLayer[] = [
  {
    id: "field",
    level: "سطح ۰",
    title: "لایهٔ میدانی",
    latin: "FIELD · SENSOR & ACTUATOR",
    summary:
      "سنسورها و عملگرها روی خودِ ماشین؛ دما، فشار، ارتعاش، جریان و شمارش قطعه در هر چرخه خوانده می‌شود.",
    data: ["دمای سیلندر و فشار خط", "ارتعاش یاتاقان و موتور", "شمارش قطعه و ضایعات", "مصرف برق هر ماشین"],
    tech: ["4–20 mA", "IO-Link", "Modbus RTU"],
    outcome: "انحراف، همان‌جا و پیش از تبدیل‌شدن به ضایعات دیده می‌شود.",
    scene: ["field"],
  },
  {
    id: "control",
    level: "سطح ۱–۲",
    title: "کنترل و پایش",
    latin: "PLC · SCADA",
    summary:
      "چرخهٔ کنترل بلادرنگ؛ اینترلاک‌ها و قفل‌های ایمنی در همین لایه اجرا می‌شوند، نه در دستورالعمل کاغذی.",
    data: ["وضعیت ماشین و چرخهٔ تولید", "توقف‌ها با علت و مدت", "هشدار ایمنی و اینترلاک", "فرمان روشن/خاموش عملگر"],
    tech: ["PLC", "SCADA", "HMI", "Modbus TCP"],
    outcome: "هر توقف با علت و مدت ثبت می‌شود؛ نه اینکه شفاهی بماند.",
    scene: ["control"],
  },
  {
    id: "edge",
    level: "سطح ۳",
    title: "اجرای تولید",
    latin: "EDGE · MES",
    summary:
      "دروازهٔ لبه، داده را نرمال و بافر می‌کند و MES از آن سفارش، OEE و بهای واقعی هر قطعه را می‌سازد.",
    data: ["سفارش و برنامهٔ تولید", "OEE و بهره‌وری هر خط", "بهای واقعی هر قطعه", "کیفیت و نتیجهٔ بازرسی"],
    tech: ["OPC UA", "MQTT", "Time-series DB"],
    outcome: "شاخص‌ها لحظه‌ای‌اند و به گزارش پایان ماه وابسته نیستند.",
    scene: ["edge"],
  },
  {
    id: "erp",
    level: "سطح ۴",
    title: "مدیریت کسب‌وکار",
    latin: "ERP · WMS",
    summary:
      "مرز کارخانه و کسب‌وکار: سفارش مشتری، موجودی انبار، خرید و بهای تمام‌شده در یک زنجیرهٔ واحد.",
    data: ["سفارش مشتری و تعهد تحویل", "موجودی مواد و محصول", "خرید و تأمین", "بهای تمام‌شدهٔ سفارش"],
    tech: ["REST API", "Webhook", "انبار هوشمند"],
    outcome: "تولید بر پایهٔ تقاضای واقعی برنامه‌ریزی می‌شود، نه حدس.",
    scene: ["erp"],
  },
  {
    id: "intelligence",
    level: "لایهٔ افزوده",
    title: "هوش و تصمیم",
    latin: "ANALYTICS · DIGITAL TWIN",
    summary:
      "مدل‌های پیش‌بینانه روی دادهٔ تاریخی و داشبورد مدیر: هشدار زودهنگام خرابی، پیشنهاد تنظیم خط و گزارش خودکار.",
    data: ["روند OEE و توقفات", "پیش‌بینی خرابی و عمر قطعه", "مصرف انرژی و هزینه", "سناریوی ظرفیت و سفارش"],
    tech: ["تحلیل سری زمانی", "مدل پیش‌بینانه", "داشبورد بلادرنگ"],
    outcome: "مدیر پیش از وقوع توقف تصمیم می‌گیرد، نه بعد از آن.",
    scene: ["brain"],
  },
];

export type FactoryStationStatus = "running" | "idle" | "maint";

export interface FactoryStation {
  id: string;
  name: string;
  latin: string;
  status: FactoryStationStatus;
  metric: { label: string; value: string };
  note: string;
}

export const FACTORY_STATIONS: FactoryStation[] = [
  {
    id: "injection",
    name: "ماشین تزریق ۱",
    latin: "INJECTION",
    status: "running",
    metric: { label: "زمان چرخه", value: "۲۸ ثانیه" },
    note: "دمای نازل ۲۴۱°C · ارتعاش یاتاقان ۲٫۴ mm/s",
  },
  {
    id: "assembly",
    name: "خط مونتاژ",
    latin: "ASSEMBLY",
    status: "running",
    metric: { label: "ایستگاه فعال", value: "۴ از ۴" },
    note: "تاکت ۴۵ ثانیه · بافر ورودی ۱۲ قطعه",
  },
  {
    id: "packaging",
    name: "بسته‌بندی و پالت",
    latin: "PACKAGING",
    status: "maint",
    metric: { label: "پایان سرویس", value: "۲۵ دقیقه" },
    note: "توقف برنامه‌ریزی‌شده برای تعویض تیغهٔ سیل",
  },
  {
    id: "warehouse",
    name: "انبار هوشمند",
    latin: "WAREHOUSE",
    status: "running",
    metric: { label: "اشغال قفسه", value: "۸۲٪" },
    note: "۱۴ پالت آمادهٔ حمل · ۳ قفسهٔ پرتحرک",
  },
];

export const STATION_STATUS_COPY: Record<FactoryStationStatus, { label: string; tone: "ok" | "warn" | "idle" }> = {
  running: { label: "در حال کار", tone: "ok" },
  idle: { label: "بی‌کار", tone: "idle" },
  maint: { label: "سرویس", tone: "warn" },
};

export interface FactoryKpi {
  id: string;
  label: string;
  unit: string;
  base: number;
  jitter: number;
  decimals: number;
  /** جهت بهترشدن شاخص؛ برای رنگ‌آمیزی روند. */
  good: "up" | "down";
  target: string;
}

export const FACTORY_KPIS: FactoryKpi[] = [
  { id: "oee", label: "OEE خط", unit: "٪", base: 78.4, jitter: 1.4, decimals: 1, good: "up", target: "هدف ۸۵٪" },
  { id: "output", label: "تولید امروز", unit: "قطعه", base: 12480, jitter: 26, decimals: 0, good: "up", target: "هدف ۱۴٬۵۰۰" },
  { id: "stops", label: "توقف فعال", unit: "مورد", base: 1, jitter: 0, decimals: 0, good: "down", target: "حداکثر ۲" },
  { id: "energy", label: "انرژی هر قطعه", unit: "kWh", base: 0.42, jitter: 0.02, decimals: 2, good: "down", target: "هدف ۰٫۳۸" },
  { id: "scrap", label: "نرخ ضایعات", unit: "٪", base: 0.8, jitter: 0.08, decimals: 1, good: "down", target: "هدف ۰٫۵٪" },
];

export type FactoryPipelineIcon = "radio" | "cpu" | "server" | "workflow" | "boxes" | "brain";

export interface FactoryPipelineStep {
  id: string;
  title: string;
  subtitle: string;
  icon: FactoryPipelineIcon;
  /** اندیس لایه در FACTORY_LAYERS */
  layer: number;
}

export const FACTORY_PIPELINE: FactoryPipelineStep[] = [
  { id: "sensor", title: "سنسور و عملگر", subtitle: "خواندن هر چرخه", icon: "radio", layer: 0 },
  { id: "plc", title: "PLC / SCADA", subtitle: "کنترل بلادرنگ", icon: "cpu", layer: 1 },
  { id: "edge", title: "دروازهٔ لبه", subtitle: "نرمال‌سازی و بافر", icon: "server", layer: 2 },
  { id: "mes", title: "MES", subtitle: "سفارش، OEE، کیفیت", icon: "workflow", layer: 2 },
  { id: "erp", title: "ERP و انبار", subtitle: "موجودی و بهای تمام‌شده", icon: "boxes", layer: 3 },
  { id: "brain", title: "هوش و داشبورد", subtitle: "پیش‌بینی و تصمیم", icon: "brain", layer: 4 },
];

export type FactoryAlarmSeverity = "critical" | "warning" | "info";

export interface FactoryAlarm {
  id: string;
  severity: FactoryAlarmSeverity;
  text: string;
  time: string;
}

export const FACTORY_ALARMS: FactoryAlarm[] = [
  {
    id: "a1",
    severity: "critical",
    text: "ارتعاش یاتاقان ماشین تزریق ۱ از آستانه گذشت؛ دستور بازرسی صادر شد.",
    time: "۲ دقیقه پیش",
  },
  {
    id: "a2",
    severity: "warning",
    text: "دمای سیلندر خط مونتاژ ۶٪ بالاتر از میانگین شیفت است.",
    time: "۹ دقیقه پیش",
  },
  {
    id: "a3",
    severity: "info",
    text: "توقف برنامه‌ریزی‌شدهٔ بسته‌بندی برای تعویض تیغهٔ سیل آغاز شد.",
    time: "۲۵ دقیقه پیش",
  },
  {
    id: "a4",
    severity: "info",
    text: "همگام‌سازی موجودی انبار با ERP با موفقیت انجام شد.",
    time: "۴۰ دقیقه پیش",
  },
];

export const ALARM_SEVERITY_COPY: Record<FactoryAlarmSeverity, string> = {
  critical: "بحرانی",
  warning: "هشدار",
  info: "اطلاع",
};

/** توضیح شفافیت که زیر تصویر نمایش داده می‌شود. */
export const FACTORY_DISCLAIMER =
  "این تصویر یک شبیه‌سازی از معماری پیشنهادی است؛ اعداد و هشدارها نمایشی‌اند و به کارخانهٔ واقعی اشاره ندارند.";
