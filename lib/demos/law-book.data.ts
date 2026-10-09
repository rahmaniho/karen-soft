/**
 * داده‌های دموی «کتابچه قانون» — برگرفته از مخزن
 * https://github.com/rahmaniho/Lawbook (data/curated + public/data)
 * متن مواد و آراء، عيناً از فايل‌های دادهٔ واقعی پروژه کپی شده‌اند.
 */

export interface LawCategory {
  id: string;
  title: string;
  color: string;
  description: string;
}

export type LawHierarchy =
  | "fiqh"
  | "constitution"
  | "statute"
  | "regulation"
  | "council"
  | "precedent"
  | "advisory"
  | "treaty";

export interface LawDocument {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  hierarchy: LawHierarchy;
  documentType: string;
  approvalDate: string;
  articleCount: number;
}

export interface LawArticle {
  id: string;
  lawId: string;
  lawTitle: string;
  number: string;
  chapter: string;
  text: string;
  status: string;
}

export interface CourtCase {
  id: string;
  title: string;
  number: string;
  date: string;
  type: "حقوقی" | "کیفری" | "اداری";
  text: string;
}

export interface DiyyehPreset {
  id: string;
  label: string;
  num: number;
  den: number;
  basis: string;
}

export const APP_STATS = {
  documents: 46,
  articles: 7278,
  cases: 1998,
  categories: 10,
} as const;

/** ۱۰ دستهٔ موضوعی — برگرفته از data/curated/catalog.json */
export const LAW_CATEGORIES: LawCategory[] = [
  { id: "asasi", title: "حقوق عمومی و اساسی", color: "#0f766e", description: "قانون اساسی، انتخابات، احزاب، مطبوعات، شوراها و سازمان‌های نظارتی" },
  { id: "madani", title: "حقوق مدنی", color: "#0369a1", description: "قانون مدنی، اموال و مالکیت، قراردادها، موجر و مستأجر، ثبت اسناد و املاک" },
  { id: "keyfari", title: "حقوق کیفری", color: "#b91c1c", description: "قانون مجازات اسلامی، جرائم رایانه‌ای، مواد مخدر، پول‌شویی، ارتشاء و اختلاس" },
  { id: "khanevade", title: "حقوق خانواده", color: "#be185d", description: "حمایت خانواده، نکاح و طلاق، نفقه، حضانت و حمایت از کودکان" },
  { id: "tejarat", title: "حقوق تجارت", color: "#7c3aed", description: "قانون تجارت، لایحه اصلاحی، شرکت‌ها، تجارت الکترونیکی، چک و بیمه" },
  { id: "kar", title: "حقوق کار و تأمین اجتماعی", color: "#c2410c", description: "قانون کار، قرارداد کار، مزد و ساعات کار، سازمان تأمین اجتماعی" },
  { id: "edari", title: "حقوق اداری و دیوان عدالت اداری", color: "#1d4ed8", description: "دیوان عدالت اداری، استخدام کشوری، تخلفات اداری و نظارت بر رفتار قضات" },
  { id: "aein", title: "آیین دادرسی", color: "#0e7490", description: "آیین دادرسی مدنی و کیفری، اجرای احکام، شوراهای حل اختلاف و محکومیت‌های مالی" },
  { id: "mali", title: "حقوق مالی و مالیاتی", color: "#a16207", description: "مالیات‌های مستقیم، ارزش افزوده، درآمدهای دولت و مقررات مالی" },
  { id: "sayer", title: "سایر موضوعات", color: "#475569", description: "شهرداری و عوارض، محیط زیست، مالکیت فکری، معادن، اوقاف و بیمه اجباری" },
];

export const LAW_HIERARCHY: { id: LawHierarchy; title: string; description: string }[] = [
  { id: "fiqh", title: "موازین شرع (فقه شیعه)", description: "قواعد و موازین فقهی بنیادین" },
  { id: "constitution", title: "قانون اساسی جمهوری اسلامی ایران", description: "بنیادی‌ترین سند حقوقی کشور با ۱۷۷ اصل" },
  { id: "statute", title: "قوانین عادی", description: "مصوبات مجلس شورای اسلامی" },
  { id: "regulation", title: "مقررات دولتی", description: "آیین‌نامه‌ها و مصوبات هیئت وزیران" },
  { id: "council", title: "مصوبات شوراها", description: "مصوبات شوراهای اسلامی محلی" },
  { id: "precedent", title: "آرای وحدت رویه", description: "تصمیمات دیوان عالی کشور" },
  { id: "treaty", title: "معاهدات و کنوانسیون‌های بین‌المللی", description: "اسناد بین‌المللی" },
];

/** ۴۶ سند حقوقی — فرادادهٔ واقعیکاتالوگ (۴۶ سند، در مجموع ۷۲۷۸ ماده) */
export const LAWS: LawDocument[] = [
  { id: "fiqh-rules", title: "موازین شرع (قواعد فقهی بنیادین)", shortTitle: "موازین شرع", category: "asasi", hierarchy: "fiqh", documentType: "قاعده فقهی", approvalDate: "—", articleCount: 16 },
  { id: "constitution", title: "قانون اساسی جمهوری اسلامی ایران", shortTitle: "قانون اساسی", category: "asasi", hierarchy: "constitution", documentType: "قانون اساسی", approvalDate: "۱۳۵۸/۰۹/۱۲", articleCount: 177 },
  { id: "civil-code", title: "قانون مدنی", shortTitle: "قانون مدنی", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۰۷/۰۲/۱۸", articleCount: 1335 },
  { id: "civil-procedure-code", title: "قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی", shortTitle: "آیین دادرسی مدنی", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۹/۰۱/۲۱", articleCount: 529 },
  { id: "civil-judgment-enforcement-law", title: "قانون اجرای احکام مدنی", shortTitle: "اجرای احکام مدنی", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۵۶/۰۸/۰۱", articleCount: 180 },
  { id: "financial-judgment-enforcement-law", title: "قانون نحوه اجرای محکومیت‌های مالی", shortTitle: "محکومیت‌های مالی", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۴/۰۳/۲۳", articleCount: 29 },
  { id: "criminal-procedure-code", title: "قانون آیین دادرسی کیفری", shortTitle: "آیین دادرسی کیفری", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۲/۱۲/۰۴", articleCount: 699 },
  { id: "islamic-penal-code", title: "قانون مجازات اسلامی", shortTitle: "مجازات اسلامی", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۲/۰۲/۰۱", articleCount: 784 },
  { id: "electronic-commerce-law", title: "قانون تجارت الکترونیکی", shortTitle: "تجارت الکترونیکی", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۲/۱۰/۱۷", articleCount: 81 },
  { id: "commercial-code", title: "قانون تجارت", shortTitle: "قانون تجارت", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۱۱/۰۲/۱۳", articleCount: 527 },
  { id: "commercial-amendment-1347", title: "لایحه اصلاحی قانون تجارت (شرکت‌های تجارتی)", shortTitle: "لایحه اصلاحی تجارت", category: "tejarat", hierarchy: "statute", documentType: "لایحه قانونی", approvalDate: "۱۳۴۷/۰۳/۲۲", articleCount: 300 },
  { id: "check-issuance-law", title: "قانون صدور چک", shortTitle: "صدور چک", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۵۵/۰۴/۱۶", articleCount: 25 },
  { id: "insurance-law", title: "قانون بیمه", shortTitle: "قانون بیمه", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۱۶/۰۲/۰۷", articleCount: 36 },
  { id: "third-party-insurance-law", title: "قانون بیمه اجباری خسارات واردشده به شخص ثالث در اثر حوادث ناشی از وسایل نقلیه", shortTitle: "بیمه اجباری شخص ثالث", category: "sayer", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۵/۰۲/۲۰", articleCount: 66 },
  { id: "computer-crimes-law", title: "قانون جرایم رایانه‌ای", shortTitle: "جرائم رایانه‌ای", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۸/۰۳/۰۵", articleCount: 56 },
  { id: "anti-narcotics-law", title: "قانون اصلاح قانون مبارزه با مواد مخدر و الحاق موادی به آن", shortTitle: "مواد مخدر", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۶/۰۸/۱۷", articleCount: 46 },
  { id: "anti-money-laundering-law", title: "قانون مبارزه با پول‌شویی", shortTitle: "پول‌شویی", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۶/۱۱/۰۲", articleCount: 15 },
  { id: "traffic-violations-law", title: "قانون رسیدگی به تخلفات رانندگی", shortTitle: "تخلفات رانندگی", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۹/۱۲/۰۸", articleCount: 35 },
  { id: "judges-conduct-law", title: "قانون نظارت بر رفتار قضات", shortTitle: "نظارت بر رفتار قضات", category: "edari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۰/۰۷/۱۷", articleCount: 56 },
  { id: "bar-association-law", title: "لایحه قانونی استقلال کانون وکلای دادگستری", shortTitle: "استقلال کانون وکلا", category: "edari", hierarchy: "statute", documentType: "لایحه قانونی", approvalDate: "۱۳۳۳/۱۲/۰۵", articleCount: 26 },
  { id: "family-protection-law", title: "قانون حمایت خانواده", shortTitle: "حمایت خانواده", category: "khanevade", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۱/۱۲/۰۱", articleCount: 58 },
  { id: "family-youth-population-law", title: "قانون حمایت از خانواده و جوانی جمعیت", shortTitle: "جوانی جمعیت", category: "khanevade", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۴۰۰/۰۷/۲۴", articleCount: 74 },
  { id: "labor-code", title: "قانون کار جمهوری اسلامی ایران", shortTitle: "قانون کار", category: "kar", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۶۹/۰۸/۲۹", articleCount: 203 },
  { id: "social-security-law", title: "قانون تأمین اجتماعی", shortTitle: "تأمین اجتماعی", category: "kar", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۵۴/۰۴/۰۳", articleCount: 118 },
  { id: "trade-unions-law", title: "قانون نظام صنفی کشور", shortTitle: "نظام صنفی", category: "kar", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۲/۱۲/۲۴", articleCount: 100 },
  { id: "consumer-rights-law", title: "قانون حمایت از حقوق مصرف‌کنندگان", shortTitle: "حقوق مصرف‌کننده", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۸۸/۰۷/۱۵", articleCount: 22 },
  { id: "vat-law", title: "قانون مالیات بر ارزش افزوده", shortTitle: "ارزش افزوده", category: "mali", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۴۰۰/۰۳/۰۲", articleCount: 51 },
  { id: "direct-taxes-law", title: "قانون مالیات‌های مستقیم", shortTitle: "مالیات‌های مستقیم", category: "mali", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۶۶/۱۲/۰۳", articleCount: 282 },
  { id: "government-revenue-law", title: "قانون وصول برخی از درآمدهای دولت و مصرف آن در موارد معین", shortTitle: "درآمدهای دولت", category: "mali", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۳/۱۲/۲۸", articleCount: 91 },
  { id: "administrative-justice-court-law", title: "قانون تشکیلات و آیین دادرسی دیوان عدالت اداری", shortTitle: "دیوان عدالت اداری", category: "edari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۲/۰۳/۲۵", articleCount: 124 },
  { id: "administrative-violations-law", title: "قانون رسیدگی به تخلفات اداری", shortTitle: "تخلفات اداری", category: "edari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۲/۰۹/۰۷", articleCount: 27 },
  { id: "general-courts-law", title: "قانون تشکیل دادگاه‌های عمومی و انقلاب", shortTitle: "دادگاه‌های عمومی و انقلاب", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۳/۰۴/۱۵", articleCount: 39 },
  { id: "dispute-resolution-councils-law", title: "قانون شوراهای حل اختلاف", shortTitle: "شوراهای حل اختلاف", category: "aein", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۴۰۲/۰۶/۲۲", articleCount: 41 },
  { id: "registration-law", title: "قانون ثبت اسناد و املاک", shortTitle: "ثبت اسناد و املاک", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۱۰/۱۲/۲۶", articleCount: 157 },
  { id: "landlord-tenant-law", title: "قانون روابط موجر و مستأجر", shortTitle: "موجر و مستأجر", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۶/۰۵/۲۶", articleCount: 13 },
  { id: "apartment-ownership-law", title: "قانون تملک آپارتمان‌ها", shortTitle: "تملک آپارتمان‌ها", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۴۳/۱۲/۱۶", articleCount: 16 },
  { id: "civil-liability-law", title: "قانون مسئولیت مدنی", shortTitle: "مسئولیت مدنی", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۳۹/۰۲/۰۷", articleCount: 16 },
  { id: "municipality-law", title: "قانون شهرداری", shortTitle: "شهرداری", category: "sayer", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۳۴/۰۴/۱۱", articleCount: 119 },
  { id: "authors-rights-law", title: "قانون حمایت از حقوق مؤلفان، مصنفان و هنرمندان", shortTitle: "حقوق مؤلفان", category: "sayer", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۴۸/۱۰/۱۱", articleCount: 32 },
  { id: "software-rights-law", title: "قانون حمایت از حقوق پدیدآورندگان نرم‌افزارهای رایانه‌ای", shortTitle: "حقوق نرم‌افزار", category: "sayer", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۷۹/۱۰/۰۴", articleCount: 17 },
  { id: "customs-affairs-law", title: "قانون امور گمرکی", shortTitle: "امور گمرکی", category: "tejarat", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۰/۰۸/۲۲", articleCount: 165 },
  { id: "hosbi-affairs-law", title: "قانون امور حسبی", shortTitle: "امور حسبی", category: "madani", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۱۹/۰۴/۰۲", articleCount: 378 },
  { id: "military-service-law", title: "قانون خدمت وظیفه عمومی", shortTitle: "خدمت وظیفه عمومی", category: "edari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۶۳/۰۷/۲۹", articleCount: 88 },
  { id: "military-service-addendum-law", title: "قانون الحاق موادی به قانون خدمت وظیفه عمومی", shortTitle: "الحاق موادی به خدمت وظیفه عمومی", category: "edari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۶۵/۰۱/۲۶", articleCount: 6 },
  { id: "prison-sentence-reduction-law", title: "قانون کاهش مجازات حبس تعزیری", shortTitle: "کاهش مجازات حبس تعزیری", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۹۹/۰۲/۲۳", articleCount: 15 },
  { id: "aggravated-punishment-bribery-embezzlement-fraud-law", title: "قانون تشدید مجازات مرتکبین ارتشاء، اختلاس و کلاهبرداری", shortTitle: "ارتشاء، اختلاس و کلاهبرداری", category: "keyfari", hierarchy: "statute", documentType: "قانون", approvalDate: "۱۳۶۷/۰۹/۱۵", articleCount: 8 },
];

/** متن‌های واقعی مواد — کپی‌شده از فایل‌های public/data مخزن Lawbook */
export const ARTICLES: LawArticle[] = [
  {
    id: "civil-code-1",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۱",
    chapter: "مقدمه — در انتشار و آثار و اجرای قوانین به طور عموم",
    status: "لازم‌الاجرا",
    text: "مصوبات مجلس شورای اسلامی و نتیجه همه‌پرسی پس از طی مراحل قانونی به رئیس جمهور ابلاغ می‌شود. رئیس جمهور باید ظرف مدت پنج روز آن را امضا و به مجریان ابلاغ نماید و دستور انتشار آن را صادر کند و روزنامه رسمی موظف است ظرف مدت 72 ساعت پس از ابلاغ منتشر نماید.",
  },
  {
    id: "civil-code-2",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۲",
    chapter: "مقدمه — در انتشار و آثار و اجرای قوانین به طور عموم",
    status: "لازم‌الاجرا",
    text: "قوانین 15 روز پس از انتشار در سراسر کشور لازم‌الاجرا است مگر آن که در خود قانون، ترتیب خاصی برای موقع اجرا مقرر شده باشد.",
  },
  {
    id: "civil-code-6",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۶",
    chapter: "مقدمه — در انتشار و آثار و اجرای قوانین به طور عموم",
    status: "لازم‌الاجرا",
    text: "قوانین مربوط به احوال شخصیه از قبیل نکاح و طلاق و اهلیت اشخاص و ارث در مورد کلیه اتباع ایران ولو اینکه مقیم در خارجه باشند مجری خواهد بود.",
  },
  {
    id: "civil-code-768",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۷۶۸",
    chapter: "کتاب دوم — در اسباب تملک › باب سوم — در عقود معینه مختلفه › فصل هفدهم — در صلح",
    status: "لازم‌الاجرا",
    text: "در عقد صلح ممکن است احد طرفین در عوض مال‌الصلحی که می‌گیرد متعهد شود که نفقه معینی همه ساله یا همه‌ماهه تا مدت معین تأدیه کند؛ این تعهد ممکن است به نفع طرفین مصالحه یا به نفع شخص یا اشخاص ثالث واقع شود.",
  },
  {
    id: "civil-code-1035",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۱۰۳۵",
    chapter: "کتاب هفتم — در نکاح و طلاق › باب اول — در نکاح › فصل اول — در خواستگاری",
    status: "لازم‌الاجرا",
    text: "وعدهٔ ازدواج ایجاد علقهٔ زوجیت نمی‌کند، اگرچه تمام یا قسمتی از مهریه که بین طرفین برای موقع ازدواج مقرر گردیده پرداخت شده باشد؛ بنابراین هر یک از زن و مرد مادام که عقد نکاح جاری نشده می‌تواند از وصلت امتناع کند و طرف دیگر نمی‌تواند به هیچ وجه او را مجبور به ازدواج کرده یا از جهت صرف امتناع از وصلت مطالبهٔ خسارتی نماید.",
  },
  {
    id: "civil-code-1169",
    lawId: "civil-code",
    lawTitle: "قانون مدنی",
    number: "۱۱۶۹",
    chapter: "کتاب هشتم — در اولاد › باب دوم — در نگاهداری و تربیت اطفال",
    status: "لازم‌الاجرا",
    text: "برای حضانت و نگهداری طفلی که پدر و مادر او جدا از یکدیگر زندگی می‌کنند، مادر تا سن هفت سالگی اولویت دارد و پس از آن با پدر است. تبصره — بعد از هفت سالگی در صورت حدوث اختلاف، حضانت طفل با رعایت مصلحت کودک به تشخیص دادگاه می‌باشد.",
  },
  {
    id: "constitution-1",
    lawId: "constitution",
    lawTitle: "قانون اساسی جمهوری اسلامی ایران",
    number: "۱",
    chapter: "فصل اول — کلیات",
    status: "لازم‌الاجرا",
    text: "حکومت ایران جمهوری اسلامی است که ملت ایران، بر اساس اعتقاد دیرینه‌اش به حکومت حق و عدل قرآن، در پی انقلاب اسلامی پیروزمند خود به رهبری مرجع عالیقدر تقلید آیت‌الله العظمی امام خمینی، در همه‌پرسی دهم و یازدهم فروردین ماه یکهزار و سیصد و پنجاه و هشت هجری شمسی … با اکثریت ۲/۹۸٪ کلیه کسانی که حق رأی داشتند، به آن رأی مثبت داد.",
  },
  {
    id: "constitution-2",
    lawId: "constitution",
    lawTitle: "قانون اساسی جمهوری اسلامی ایران",
    number: "۲",
    chapter: "فصل اول — کلیات",
    status: "لازم‌الاجرا",
    text: "جمهوری اسلامی، نظامی است بر پایهٔ ایمان به: ۱- خدای یکتا (لااله الاالله) و اختصاص حاکمیت و تشریع به او و لزوم تسلیم در برابر امر او. ۲- وحی الهی و نقش بنیادی آن در بیان قوانین. ۳- معاد و نقش سازندهٔ آن در سیر تکاملی انسان به سوی خدا. ۴- عدل خدا در خلقت و تشریع. ۵- امامت و رهبری …",
  },
  {
    id: "islamic-penal-code-1",
    lawId: "islamic-penal-code",
    lawTitle: "قانون مجازات اسلامی",
    number: "۱",
    chapter: "کتاب اول — کلیات › فصل اول — تعاریف",
    status: "لازم‌الاجرا",
    text: "قانون مجازات اسلامی مشتمل بر جرائم و مجازات‌های حدود، قصاص، دیات و تعزیرات، اقدامات تأمینی و تربیتی، شرایط و موانع مسئولیت کیفری و قواعد حاکم بر آنها است.",
  },
  {
    id: "islamic-penal-code-367",
    lawId: "islamic-penal-code",
    lawTitle: "قانون مجازات اسلامی",
    number: "۳۶۷",
    chapter: "کتاب سوم — قصاص › فصل پنجم — صاحب حق قصاص",
    status: "لازم‌الاجرا",
    text: "در ماده (۳۶۶) این قانون، اگر اولیای هر دو مجنی‌علیه، خواهان قصاص باشند و دو مجنی‌علیه از نظر دیه، یکسان نباشند و دیهٔ مرتکبان بیش از دیهٔ مجنی‌علیهم باشد، مانند اینکه هر دو قاتل، مرد باشند و یکی از دو مقتول، زن باشد، خواهان قصاص از سوی زن باید نصف دیهٔ کامل را بپردازد …",
  },
  {
    id: "islamic-penal-code-563",
    lawId: "islamic-penal-code",
    lawTitle: "قانون مجازات اسلامی",
    number: "۵۶۳",
    chapter: "کتاب چهارم — دیات › فصل دوم — قواعد عمومی دیهٔ اعضاء",
    status: "لازم‌الاجرا",
    text: "از بین بردن هر یک از اعضای فرد و هر دو عضو از اعضای زوج، دیهٔ کامل و از بین بردن هریک از اعضای زوج، نصف دیهٔ کامل دارد. خواه عضو مزبور از اعضای داخلی بدن باشد خواه از اعضای ظاهری، مگر اینکه در قانون ترتیب دیگری مقرر شده باشد.",
  },
  {
    id: "labor-code-1",
    lawId: "labor-code",
    lawTitle: "قانون کار جمهوری اسلامی ایران",
    number: "۱",
    chapter: "فصل اول — تعاریف و اصول کلی",
    status: "لازم‌الاجرا",
    text: "کلیهٔ کارفرمایان، کارگران، کارگاه‌ها، مؤسسات تولیدی، صنعتی، خدماتی و کشاورزی مکلف به تبعیت از این قانون می‌باشند.",
  },
  {
    id: "labor-code-7",
    lawId: "labor-code",
    lawTitle: "قانون کار جمهوری اسلامی ایران",
    number: "۷",
    chapter: "فصل دوم — قرارداد کار › مبحث اول — تعریف قرارداد کار و شرایط اساسی انعقاد آن",
    status: "لازم‌الاجرا",
    text: "قرارداد کار عبارت است از قرارداد کتبی یا شفاهی که به موجب آن کارگر در قبال دریافت حق‌السعی کاری را برای مدت موقت یا مدت غیرموقت برای کارفرما انجام می‌دهد.",
  },
  {
    id: "check-issuance-law-1",
    lawId: "check-issuance-law",
    lawTitle: "قانون صدور چک",
    number: "۱",
    chapter: "فصل اول — کلیات",
    status: "اصلاحی",
    text: "انواع چک عبارت است از: ۱- چک عادی، چکی است که اشخاص عهدهٔ بانک‌ها به حساب جاری خود صادر می‌کنند و دارندهٔ آن تضمینی جز اعتبار صادرکنندهٔ آن ندارد. ۲- چک تأییدشده، چکی است که اشخاص عهدهٔ بانک‌ها به حساب جاری خود صادر و توسط بانک محال‌علیه پرداخت وجه آن تأیید می‌شود. ۳- چک تضمین‌شده …",
  },
  {
    id: "check-issuance-law-12",
    lawId: "check-issuance-law",
    lawTitle: "قانون صدور چک",
    number: "۱۲",
    chapter: "—",
    status: "اصلاحی",
    text: "هرگاه قبل از صدور حکم قطعی، شاکی گذشت نماید و یا اینکه متهم وجه چک و خسارت تأخیر تأدیه را نقداً به دارندهٔ آن پرداخت کند … مرجع رسیدگی قرار موقوفی صادر خواهد کرد. صدور قرار موقوفی تعقیب در دادگاه کیفری مانع از آن نیست که دادگاه نسبت به سایر خسارت مورد مطالبه رسیدگی و حکم صادر کند.",
  },
  {
    id: "landlord-tenant-law-1",
    lawId: "landlord-tenant-law",
    lawTitle: "قانون روابط موجر و مستأجر",
    number: "۱",
    chapter: "فصل اول — روابط موجر و مستأجر",
    status: "لازم‌الاجرا",
    text: "از تاریخ لازم‌الاجرا شدن این قانون، اجارهٔ کلیهٔ اماکن اعم از مسکونی، تجاری، محل کسب و پیشه، اماکن آموزشی، خوابگاه‌های دانشجویی و ساختمان‌های دولتی و نظایر آن که با قرارداد رسمی یا عادی منعقد می‌شود، تابع مقررات قانون مدنی و مقررات مندرج در این قانون و شرایط مقرر بین موجر و مستأجر خواهد بود.",
  },
  {
    id: "family-protection-law-1",
    lawId: "family-protection-law",
    lawTitle: "قانون حمایت خانواده",
    number: "۱",
    chapter: "فصل اول — دادگاه خانواده",
    status: "لازم‌الاجرا",
    text: "به منظور رسیدگی به امور و دعاوی خانوادگی، قوهٔ قضائیه موظف است ظرف سه سال از تاریخ تصویب این قانون در کلیهٔ حوزه‌های قضائی شهرستان به تعداد کافی شعبهٔ دادگاه خانواده تشکیل دهد.",
  },
  {
    id: "vat-law-1",
    lawId: "vat-law",
    lawTitle: "قانون مالیات بر ارزش افزوده",
    number: "۱",
    chapter: "فصل اول — تعاریف و کلیات",
    status: "لازم‌الاجرا",
    text: "مفاهیم و اصطلاحات زیر، در این قانون، دارای تعاریف مشروحهٔ ذیل می‌باشند: الف — عرضه: واگذاری کالا یا ارائهٔ خدمت به غیر، از طریق هر نوع معامله یا عقد قانونی؛ ب — واردات: ورود کالا یا خدمت از خارج از کشور به قلمرو گمرکی کشور یا مناطق آزاد تجاری، صنعتی یا مناطق ویژهٔ اقتصادی …",
  },
  {
    id: "social-security-law-1",
    lawId: "social-security-law",
    lawTitle: "قانون تأمین اجتماعی",
    number: "۱",
    chapter: "فصل اول — تعاریف، کلیات",
    status: "اصلاحی",
    text: "به‌منظور اجرا و تعمیم و گسترش انواع بیمه‌های اجتماعی و استقرار نظام هم‌آهنگ و متناسب با برنامه‌های تأمین اجتماعی، همچنین تمرکز وجوه و درآمدهای موضوع قانون تأمین اجتماعی و سرمایه‌گذاری و بهره‌برداری از محل وجوه و ذخائر، سازمان مستقلی به نام «سازمان تأمین اجتماعی» …",
  },
];

/** منتخب آراء قضایی — از مجموعهٔ «آراء قضایی» (۱۹۹۸ رأی در نسخهٔ کامل) */
export const CASES: CourtCase[] = [
  {
    id: "v-۹۵۰۹۹۷۰۹۰۵۶۰۱۰۳۵",
    title: "شخصیت مستقل پژوهشگاه‌های صنعت نفت",
    number: "۹۵۰۹۹۷۰۹۰۵۶۰۱۰۳۵",
    date: "۱۳۹۵/۰۸/۱۵",
    type: "اداری",
    text: "رأی شعبهٔ بدوی دیوان عدالت اداری. در خصوص شکایت شاکی علیه شرکت ملی نفت ایران … نظر به اینکه خواهان از پرسنل پژوهشگاه‌های صنعت نفت بوده که شخصیت حقوقی مستقل از شرکت ملی نفت ایران دارد … قرار رد شکایت وی صادر و اعلام می‌نماید.",
  },
  {
    id: "v-۹۵۰۹۹۸۰۲۲۵۳۰۰۰۱۷",
    title: "تأثیر تغییر عنوان اتهامی در صلاحیت دادگاه",
    number: "۹۵۰۹۹۸۰۲۲۵۳۰۰۰۱۷",
    date: "۱۳۹۵/۰۵/۲۷",
    type: "کیفری",
    text: "رأی خلاصهٔ جریان پرونده. شعبهٔ چهارم دادگاه کیفری یک تهران در مورد شکایت … دائر به تجاوز به عنف، به لحاظ اینکه عنوان صحیح بزه، کودک‌آزاری و رابطهٔ نامشروع است، قرار عدم صلاحیت به شایستگی دادگاه کیفری ۲ صادر کرده است … به لحاظ تحقق اختلاف در صلاحیت، پرونده به دیوان عالی کشور ارسال …",
  },
  {
    id: "v-۹۴۰۹۹۸۰۲۳۵۷۰۰۸۳۰",
    title: "مرجع صالح رسیدگی به تنظیم قرارداد پیش‌فروش ساختمان",
    number: "۹۴۰۹۹۸۰۲۳۵۷۰۰۸۳۰",
    date: "۱۳۹۵/۰۶/۱۳",
    type: "حقوقی",
    text: "رأی خلاصهٔ جریان پرونده. دادسرای عمومی و انقلاب ناحیهٔ ۱۴ تهران در خصوص شکایت … دائر به تنظیم قرارداد پیش‌فروش آپارتمان به صورت عادی … حسب مواد ۲۳ و ۲۴ قانون پیش‌فروش آپارتمان … قرار عدم صلاحیت به شایستگی هیأت‌های بدوی رسیدگی به تخلفات صنفی …",
  },
  {
    id: "v-۹۳۰۹۹۸۹۱۸۸۲۰۰۰۵۳",
    title: "مرجع صالح در رسیدگی به اتهام قاچاق سوخت",
    number: "۹۳۰۹۹۸۹۱۸۸۲۰۰۰۵۳",
    date: "۱۳۹۵/۰۷/۱۴",
    type: "کیفری",
    text: "آقای دادیار دادسرای عمومی و انقلاب شهرستان سراوان در مورد اتهام … دائر به قاچاق سوخت گازوئیل، مستنداً به مادهٔ ۴۴ قانون مبارزه با قاچاق کالا و ارز، قرار عدم صلاحیت به شایستگی تعزیرات حکومتی صادر … قرار عدم صلاحیت … مورد تأیید است. شعبهٔ یازدهم دیوان عالی کشور.",
  },
  {
    id: "v-۹۴۰۹۹۸۸۳۱۱۳۰۰۷۱۸",
    title: "حدود صلاحیت دادگاه اجرا‌کنندهٔ حکم در رسیدگی به اختلافات اجرایی",
    number: "۹۴۰۹۹۸۸۳۱۱۳۰۰۷۱۸",
    date: "۱۳۹۵/۰۶/۰۶",
    type: "حقوقی",
    text: "رأی شعبهٔ دیوان عالی کشور. … در دادخواستی به طرفیت … به عملیات اجرایی در پروندهٔ اجرای احکام دادگاه عمومی کرمانشاه اعتراض کرده‌اند … شعبهٔ ۱۳ دادگاه عمومی کرمانشاه … از خود نفی صلاحیت کرده است …",
  },
  {
    id: "v-۹۹۰۹۹۸۷۷۱۰۸۰۰۵۱۱",
    title: "مرجع صالح در دعوای ابطال (لغو) مناقصه",
    number: "۹۹۰۹۹۸۷۷۱۰۸۰۰۵۱۱",
    date: "۱۴۰۱/۰۳/۲۸",
    type: "حقوقی",
    text: "رأی دادگاه بدوی. با توجه به مراتب فوق، نظر به محتوای پروندهٔ امر و موضوع خواسته … استدلال دادگاه در صدور قرار عدم صلاحیت صحیح و منطبق با موازین قانونی بوده، توجهاً به مادهٔ ۲۸ قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی، ضمن تأیید استدلال مذکور، ادامهٔ رسیدگی به هیأت رسیدگی … محول می‌گردد.",
  },
];

/** کسرهای پرکاربرد دیه — از src/lib/calc/diyyeh.ts در مخزن Lawbook */
export const DIYAH_PRESETS: DiyyehPreset[] = [
  { id: "full", label: "دیه کامل", num: 1, den: 1, basis: "ماده ۵۴۶ قانون مجازات اسلامی" },
  { id: "half", label: "نصف دیه", num: 1, den: 2, basis: "مواد ۵۶۳ به بعد قانون مجازات اسلامی" },
  { id: "third", label: "یک‌سوم دیه", num: 1, den: 3, basis: "مواد ۵۶۳ به بعد قانون مجازات اسلامی" },
  { id: "quarter", label: "یک‌چهارم دیه", num: 1, den: 4, basis: "مواد ۵۶۳ به بعد قانون مجازات اسلامی" },
  { id: "tenth", label: "یک‌دهم دیه", num: 1, den: 10, basis: "هر انگشت دست یا پا یک‌دهم دیه کامل" },
  { id: "twentieth", label: "یک‌بیستم دیه", num: 1, den: 20, basis: "هر بند انگشت (ماده ۶۴۴ قانون مجازات اسلامی)" },
  { id: "fifth", label: "یک‌پنجم دیه", num: 1, den: 5, basis: "نمونه: شکستن برخی استخوان‌ها" },
];

export const OFFICIAL_SOURCES = [
  { title: "سامانه ملی قوانین و مقررات", url: "https://qavanin.ir", note: "متن رسمی قوانین، مقررات و اصلاحات بعدی — مرجع اصلی استعلام" },
  { title: "روزنامه رسمی جمهوری اسلامی ایران", url: "https://www.rrk.ir", note: "انتشار رسمی قوانین، آیین‌نامه‌ها و مصوبات" },
  { title: "مرکز پژوهش‌های مجلس شورای اسلامی", url: "https://rc.majlis.ir", note: "متن مصوبات و گزارش‌های نظارتی مجلس" },
];

export const INSTALL_PLATFORMS = [
  { id: "android", label: "اندروید", icon: "Smartphone", note: "نصب از Chrome — «افزودن به صفحهٔ اصلی»" },
  { id: "ios", label: "iOS", icon: "Apple", note: "نصب از Safari — «اشتراک‌گذاری» ← «افزودن به صفحهٔ اصلی»" },
  { id: "windows", label: "ویندوز", icon: "Monitor", note: "نصب از Edge یا Chrome — آیکون «نصب» در نوار نشانی" },
];

export const SEARCH_SUGGESTIONS = ["نفقه", "مهریه", "حضانت", "قرارداد کار", "دیه", "ماده ۲ قانون مدنی"];

export const LEGAL_CREDIT = "جمع‌آوری و تدوین: وکیل پایه یک دادگستری لیلا آبکه";
export const DEVELOPER_CREDIT = "توسعه نرم‌افزار: کارن سافت — karen-soft.ir";

export const DISCLAIMER =
  "این برنامه ابزار کمکی مطالعه، جست‌وجو و آموزش است و تنها مرجع رسمی، روزنامهٔ رسمی جمهوری اسلامی ایران و متن منتشرشده در سامانهٔ ملی قوانین و مقررات (qavanin.ir) است. استفاده از مطالب این برنامه به‌تنهایی برای استناد در مراجع قضایی و اداری کافی نیست.";

export const PRIVACY_NOTE =
  "یادداشت‌ها، نشان‌گذاری‌ها، تاریخچهٔ جست‌وجو و تنظیمات مطالعه فقط روی همین دستگاه ذخیره می‌شوند (Local-first) و هیچ اطلاعاتی به سرور ارسال نمی‌شود. متن قوانین نیز پس از بارگیری، برای استفادهٔ آفلاین روی دستگاه نگه‌داری می‌شود.";
