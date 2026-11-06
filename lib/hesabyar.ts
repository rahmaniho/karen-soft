import type { Product } from "./products";
import { formatToman } from "./utils";
import {
  KARO_WEB_URL,
  KARO_IMAGE,
  KARO_IMAGE_ALT,
  KARO_UPDATED,
  KARO_PLANS,
  KARO_FAQS,
} from "./karo";
/** Legacy identifiers/URL retained to preserve existing links. Current public identity: کارو. */
export const HESABYAR_WEB_URL = KARO_WEB_URL;
export const HESABYAR_PRODUCT_PATH = "/products/hesabyar";
export const HESABYAR_RELEASE_DATE = KARO_UPDATED;
export const HESABYAR_RUNTIME = "Web";
export const HESABYAR_IMAGE = KARO_IMAGE;
export const HESABYAR_LOGO = KARO_IMAGE;
export const HESABYAR_IMAGE_ALT = KARO_IMAGE_ALT;
export const HESABYAR_PLANS = KARO_PLANS;
export const HESABYAR_FEATURES = [
  {
    icon: "book",
    title: "حسابداری آنلاین",
    text: "کارو نرم‌افزار حسابداری کاملاً آنلاین کارن سافت است؛ برای استفاده به اینترنت نیاز دارید.",
  },
  {
    icon: "wallet",
    title: "ذخیره اطلاعات روی سرور",
    text: "اطلاعات حسابداری به یک دستگاه محدود نیست و روی سرور نگهداری می‌شود.",
  },
  {
    icon: "users",
    title: "دسترسی از دستگاه‌های مختلف",
    text: "کاربر می‌تواند از دستگاه‌های مختلف اطلاعات خود را ثبت و مشاهده کند.",
  },
  {
    icon: "calculator",
    title: "اشتراک متناسب با نیاز",
    text: "پلن، تعداد کاربران و تعداد ماه‌ها را انتخاب کنید؛ مبلغ نهایی بر همین اساس محاسبه می‌شود.",
  },
] as const;
export const HESABYAR_MODULES = HESABYAR_FEATURES.map(
  (feature) => feature.title,
);
export const HESABYAR_FAQS = KARO_FAQS;
export const HESABYAR_PRODUCT: Product = {
  slug: "hesabyar",
  name: "نرم‌افزار حسابداری کارو",
  short:
    "حسابداری کاملاً آنلاین با ذخیره اطلاعات روی سرور و دسترسی از دستگاه‌های مختلف.",
  description:
    "کارو، نام جدید حساب‌یار کارن سافت، نرم‌افزار حسابداری کاملاً آنلاین است. اطلاعات روی سرور ذخیره می‌شود و کاربر از دستگاه‌های مختلف آن را ثبت و مشاهده می‌کند. سه پلن پایه، حرفه‌ای و حرفه‌ای پلاس با تعداد کاربران و مدت اشتراک قابل انتخاب ارائه می‌شود.",
  emoji: "🧮",
  icon: "Calculator",
  status: "active",
  featured: true,
  accent: "#1f7a5c",
  accentVar: "--color-hesabyar-green",
  chips: ["کاملاً آنلاین", "ذخیره روی سرور", "اشتراک چندکاربره"],
  features: [...HESABYAR_MODULES],
  modules: HESABYAR_FEATURES.map((feature) => ({
    title: feature.title,
    desc: feature.text,
  })),
  pricingFrom: 30_000,
  image: KARO_IMAGE,
  logo: KARO_IMAGE,
  liveUrl: KARO_WEB_URL,
};
export const HESABYAR_OFFERS = KARO_PLANS.map((plan) => ({
  name: `اشتراک ماهانه ${plan.title}؛ یک کاربر`,
  priceRial: plan.price * 10,
  description: plan.note,
  url: KARO_WEB_URL,
}));
export const HESABYAR_SEO = {
  title: "نرم‌افزار حسابداری کارو | حسابداری آنلاین و تعرفه اشتراک",
  description:
    "کارو، حسابداری کاملاً آنلاین کارن سافت با ذخیره اطلاعات روی سرور و دسترسی از دستگاه‌های مختلف؛ تعرفه پلن‌های پایه، حرفه‌ای و حرفه‌ای پلاس از ماهانه ۳۰٬۰۰۰ تومان.",
  path: HESABYAR_PRODUCT_PATH,
} as const;
export { formatToman };
