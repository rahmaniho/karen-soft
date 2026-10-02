/* گروه‌های فیلد مشترک
 * طرح، تحویل و اطلاعات تماس در همه محصولات یکسان‌اند.
 * این فایل از نسخۀ قدیمی کارن چاپ (legacy/print.html) استخراج و به TypeScript تبدیل شده است.
 */
import type { Field } from "../types";

export const SIDE_FIELD: Field = {
  type: "chips",
  key: "sides",
  label: "چاپ یک‌رو یا دورو؟",
  required: true,
  options: [
    { id: "one", label: "یک‌رو" },
    { id: "two", label: "دورو", hint: "پشت و رو" },
  ],
};

export const COATING_FIELD: Field = {
  type: "chips",
  key: "coating",
  label: "روکش",
  options: [
    { id: "none", label: "بدون روکش" },
    { id: "matte", label: "سلفون مات", hint: "ظاهر لوکس و ضدانعکاس" },
    { id: "glossy", label: "سلفون براق", hint: "رنگ‌های زنده‌تر" },
    { id: "uv", label: "یووی (UV)", hint: "براق و مقاوم" },
  ],
};

export const DESIGN_FIELDS: Field[] = [
  {
    type: "chips",
    key: "designSource",
    label: "طرح شما چگونه آماده می‌شود؟",
    required: true,
    options: [
      { id: "team", label: "طراحی توسط تیم کارن چاپ", hint: "طراح ما بر اساس توضیح شما طرح می‌زند" },
      { id: "file", label: "فایل آماده دارم", hint: "PDF, AI, PSD, CDR, TIFF — حداقل ۳۰۰ DPI" },
      { id: "edit", label: "طرح دارم، نیاز به ویرایش دارد", hint: "اصلاح متن، رنگ یا سایز" },
    ],
  },
  {
    type: "textarea",
    key: "brief",
    label: "توضیح طرح",
    required: true,
    placeholder: "متن‌ها، رنگ سازمانی، سبک دلخواه، نمونه‌های مورد علاقه...",
    show: { field: "designSource", in: ["team", "edit"] },
  },
  {
    type: "text",
    key: "brandColors",
    label: "رنگ‌های سازمانی (اختیاری)",
    placeholder: "مثال: آبی #1a73e8 و طوسی",
    show: { field: "designSource", in: ["team"] },
  },
  {
    type: "text",
    key: "fileName",
    label: "نام یا فرمت فایل (اختیاری)",
    placeholder: "مثال: tract-final.pdf",
    hint: "فایل را پس از ثبت، از طریق واتساپ یا ایمیل بفرستید",
    show: { field: "designSource", in: ["file", "edit"] },
  },
];

export const DELIVERY_FIELDS: Field[] = [
  {
    type: "chips",
    key: "speed",
    label: "زمان تحویل",
    required: true,
    default: "normal",
    options: [
      { id: "normal", label: "عادی" },
      { id: "rush", label: "فوری", hint: "با هزینه فوریت" },
    ],
  },
  {
    type: "chips",
    key: "deliveryMethod",
    label: "روش تحویل",
    required: true,
    options: [
      { id: "pickup", label: "تحویل حضوری", hint: "الوند، میدان لاله" },
      { id: "courier", label: "پیک درون‌شهری", hint: "قزوین و حومه" },
      { id: "post", label: "پست / تیپاکس", hint: "سراسر کشور" },
    ],
  },
];

export const CONTACT_FIELDS: Field[] = [
  {
    type: "text",
    key: "name",
    label: "نام و نام خانوادگی",
    required: true,
    placeholder: "مثال: علی رضایی",
    autofill: "name",
  },
  {
    type: "tel",
    key: "phone",
    label: "شماره تماس",
    required: true,
    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
    autofill: "tel",
  },
  {
    type: "text",
    key: "city",
    label: "شهر و آدرس پستی",
    required: true,
    placeholder: "شهر، خیابان، پلاک، کد پستی",
    show: { field: "deliveryMethod", in: ["post"] },
  },
  {
    type: "textarea",
    key: "notes",
    label: "توضیحات تکمیلی (اختیاری)",
    placeholder: "هر نکته‌ای که باید بدانیم...",
  },
];
