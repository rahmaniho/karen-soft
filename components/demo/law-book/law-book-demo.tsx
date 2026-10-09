"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Apple,
  Bookmark,
  BookOpen,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Globe,
  Landmark,
  Monitor,
  Search,
  ShieldCheck,
  Smartphone,
  StickyNote,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import {
  APP_STATS,
  ARTICLES,
  CASES,
  DEVELOPER_CREDIT,
  DIYAH_PRESETS,
  DISCLAIMER,
  INSTALL_PLATFORMS,
  LAW_CATEGORIES,
  LAW_HIERARCHY,
  LAWS,
  LEGAL_CREDIT,
  OFFICIAL_SOURCES,
  PRIVACY_NOTE,
  SEARCH_SUGGESTIONS,
} from "@/lib/demos/law-book.data";
import { DemoShell, type DemoModule } from "@/components/demo/shared/demo-shell";
import { DataTable, DemoPanel, KpiGrid } from "@/components/demo/shared/widgets";
import { contrastText } from "@/lib/colors";
import { cn, formatToman, toPersianDigits } from "@/lib/utils";

const ACCENT = "#0f766e";
const ON_ACCENT = contrastText(ACCENT);

const PLATFORM_ICONS: Record<string, LucideIcon> = { Smartphone, Apple, Monitor };

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** نرمال‌سازی فارسی: یکسان‌سازی ی و ك، حذف نیم‌فاصله و اعراب عربی، و تبدیل ارقام فارسی به لاتین. */
function normalizeFa(value: string): string {
  return value
    .replace(/[\u064B-\u0652\u0670]/g, "")
    .replace(/\u0640/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

interface SearchHit {
  kind: "ماده" | "قانون" | "رأی";
  title: string;
  snippet: string;
  meta: string;
  articleId?: string;
  lawId?: string;
  caseId?: string;
}

function highlight(text: string, tokens: string[]): ReactNode {
  const pattern = tokens.filter(Boolean).map(escapeRegExp).join("|");
  if (!pattern) return text;
  const parts = text.split(new RegExp(`(${pattern})`, "g"));
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded-sm px-0.5" style={{ background: `${ACCENT}33`, color: "inherit" }}>
        {part}
      </mark>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function snippetOf(text: string, tokens: string[], width = 170): string {
  const hit = tokens.map((t) => text.indexOf(t)).find((i) => i >= 0);
  if (hit === undefined || hit < 0) return text.slice(0, width);
  const start = Math.max(0, hit - 45);
  const end = Math.min(text.length, hit + width);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

const FONT_SCALES = { sm: "text-xs", md: "text-sm", lg: "text-base" } as const;

export function LawBookDemo() {
  const [articleId, setArticleId] = useState(ARTICLES[0]!.id);
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [fontScale, setFontScale] = useState<keyof typeof FONT_SCALES>("md");
  const [query, setQuery] = useState("");

  const [diyyeh, setDiyyeh] = useState({
    full: 900_000_000,
    preset: "full",
    sex: "male" as "male" | "female",
    belowThird: false,
  });

  const [inheritance, setInheritance] = useState({
    estate: 1_000_000_000,
    deceased: "male" as "male" | "female",
    spouse: true,
    wives: 1,
    sons: 1,
    daughters: 1,
    father: false,
    mother: true,
  });

  const initialState = useMemo(
    () => ({
      articleId: ARTICLES[0]!.id,
      bookmarked: [] as string[],
      note: "",
      fontScale: "md" as const,
      query: "",
      diyyeh: { full: 900_000_000, preset: "full", sex: "male" as const, belowThird: false },
      inheritance: {
        estate: 1_000_000_000,
        deceased: "male" as const,
        spouse: true,
        wives: 1,
        sons: 1,
        daughters: 1,
        father: false,
        mother: true,
      },
    }),
    [],
  );

  function reset() {
    setArticleId(initialState.articleId);
    setBookmarked(initialState.bookmarked);
    setNote(initialState.note);
    setFontScale(initialState.fontScale);
    setQuery(initialState.query);
    setDiyyeh(initialState.diyyeh);
    setInheritance(initialState.inheritance);
  }

/* ── مطالعهٔ ماده ── */
  const current = ARTICLES.find((a) => a.id === articleId) ?? ARTICLES[0]!;
  const siblings = ARTICLES.filter((a) => a.lawId === current.lawId);
  const position = Math.max(0, siblings.findIndex((a) => a.id === current.id));
  const lawsWithArticles = LAWS.filter((law) => ARTICLES.some((a) => a.lawId === law.id));
  const isBookmarked = bookmarked.includes(current.id);

  function toggleBookmark(id: string) {
    setBookmarked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

/* ── جست‌وجو ── */
  const rawTokens = useMemo(() => query.split(/\s+/).filter(Boolean), [query]);
  const normalizedTokens = useMemo(() => rawTokens.map(normalizeFa).filter(Boolean), [rawTokens]);

  const hits = useMemo<SearchHit[]>(() => {
    if (normalizedTokens.length === 0) return [];
    const results: SearchHit[] = [];
    for (const article of ARTICLES) {
      const haystack = normalizeFa(`${article.lawTitle} ${article.chapter} ${article.text}`);
      if (normalizedTokens.every((token) => haystack.includes(token))) {
        results.push({
          kind: "ماده",
          title: `مادهٔ ${article.number} ${article.lawTitle}`,
          snippet: snippetOf(article.text, rawTokens),
          meta: article.chapter || article.status,
          articleId: article.id,
        });
      }
    }
    for (const law of LAWS) {
      const haystack = normalizeFa(`${law.title} ${law.shortTitle} ${law.documentType}`);
      if (normalizedTokens.every((token) => haystack.includes(token))) {
        results.push({
          kind: "قانون",
          title: law.title,
          snippet: snippetOf(`${law.documentType} — ${toPersianDigits(law.articleCount)} ماده — مصوب ${law.approvalDate}`, rawTokens),
          meta: LAW_CATEGORIES.find((c) => c.id === law.category)?.title ?? law.category,
          lawId: law.id,
        });
      }
    }
    for (const item of CASES) {
      const haystack = normalizeFa(`${item.title} ${item.text} ${item.type}`);
      if (normalizedTokens.every((token) => haystack.includes(token))) {
        results.push({
          kind: "رأی",
          title: item.title,
          snippet: snippetOf(item.text, rawTokens),
          meta: `${item.type} — شماره ${item.number} — ${item.date}`,
          caseId: item.id,
        });
      }
    }
    return results.slice(0, 14);
  }, [normalizedTokens, rawTokens]);

  const quickPath = useMemo(() => {
    const match = query.match(/ماده\s*([۰-۹0-9]+)/);
    if (!match) return null;
    const number = toPersianDigits(String(Number(match[1].replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d))))));
    const lawHint = normalizeFa(query.replace(/ماده\s*[۰-۹0-9]+/, ""));
    const candidates = ARTICLES.filter((a) => a.number === number);
    if (candidates.length === 0) return null;
    const preferred =
      candidates.find((a) => normalizeFa(a.lawTitle).includes(lawHint)) ??
      candidates.find((a) => normalizeFa(a.lawTitle).includes(normalizeFa(LAWS[0]!.shortTitle))) ??
      candidates[0]!;
    return preferred;
  }, [query]);

/* ── محاسبه‌گر دیه ── */
  const preset = DIYAH_PRESETS.find((p) => p.id === diyyeh.preset) ?? DIYAH_PRESETS[0]!;
  const diyyehBase = (Math.max(0, diyyeh.full) * preset.num) / preset.den;
  let diyyehAmount = diyyehBase;
  const diyyehNotes: string[] = [];
  const isFullHomicide = preset.num === 1 && preset.den === 1;
  if (diyyeh.sex === "female") {
    if (isFullHomicide || !diyyeh.belowThird) {
      diyyehAmount = diyyehBase / 2;
      diyyehNotes.push("دیهٔ زن در جنایات معادل یا بیشتر از ثلث دیهٔ کامل، نصف دیهٔ مرد است (مواد ۵۴۴ و ۵۴۵ قانون مجازات اسلامی).");
    } else {
      diyyehNotes.push("در جنایات کمتر از ثلث دیهٔ کامل، دیهٔ زن و مرد یکسان است (مادهٔ ۵۴۵ قانون مجازات اسلامی).");
    }
  }
  diyyehNotes.push("مبلغ محاسبه‌شده «دیه» است و شامل ارش، هزینهٔ درمان و خسارات دیگر نمی‌شود.");
  diyyehNotes.push("نرخ دیهٔ کامل هر سال توسط قوهٔ قضائیه اعلام می‌شود؛ مبلغ را متناسب با سال موردنظر وارد کنید.");

/* ── محاسبه‌گر ارث (طبقهٔ اول: همسر، اولاد و والدین) ── */
  const inh = inheritance;
  const hasChildren = inh.sons + inh.daughters > 0;
  const shares: { heir: string; fraction: string; amount: number; basis: string }[] = [];
  const inhWarnings: string[] = [];
  let remaining = Math.max(0, inh.estate);
  if (inh.estate <= 0) inhWarnings.push("مبلغ ترکه را وارد کنید.");
  if (!inh.spouse && !hasChildren && !inh.father && !inh.mother) {
    inhWarnings.push("حداقل یک وارث را انتخاب کنید.");
  }
  const take = (heir: string, numerator: number, denominator: number, basis: string) => {
    const amount = (Math.max(0, inh.estate) * numerator) / denominator;
    shares.push({ heir, fraction: `۱/${toPersianDigits(denominator)}`, amount, basis });
    remaining -= amount;
  };
  if (inh.spouse) {
    if (inh.deceased === "male") {
      const wives = Math.max(1, Math.min(4, inh.wives || 1));
      if (hasChildren) {
        take(wives > 1 ? `زوجه (${toPersianDigits(wives)} همسر)` : "زوجه (همسر)", 1, 8 * wives, "مادهٔ ۹۲۷ قانون مدنی — زوجه با وجود اولاد یک‌هشتم");
      } else {
        take(wives > 1 ? `زوجه (${toPersianDigits(wives)} همسر)` : "زوجه (همسر)", 1, 4 * wives, "مادهٔ ۹۲۷ قانون مدنی — زوجه بدون اولاد یک‌چهارم");
      }
    } else if (hasChildren) {
      take("زوج (همسر)", 1, 4, "مادهٔ ۹۲۷ قانون مدنی — زوج با وجود اولاد یک‌چهارم");
    } else {
      take("زوج (همسر)", 1, 2, "مادهٔ ۹۲۷ قانون مدنی — زوج بدون اولاد یک‌دوم");
    }
  }
  if (hasChildren) {
    if (inh.father) take("پدر", 1, 6, "مادهٔ ۹۰۸ قانون مدنی — والدین با وجود اولاد یک‌ششم");
    if (inh.mother) take("مادر", 1, 6, "مادهٔ ۹۰۸ قانون مدنی — والدین با وجود اولاد یک‌ششم");
    const units = inh.sons * 2 + inh.daughters;
    if (units > 0 && remaining > 0) {
      if (inh.sons > 0) {
        shares.push({
          heir: `پسر (${toPersianDigits(inh.sons)} نفر)`,
          fraction: `${toPersianDigits(((inh.sons * 2) / units).toFixed(2))} سهم از باقی‌مانده`,
          amount: (remaining * inh.sons * 2) / units,
          basis: "مادهٔ ۹۰۷ قانون مدنی — پسر دو برابر دختر",
        });
      }
      if (inh.daughters > 0) {
        shares.push({
          heir: `دختر (${toPersianDigits(inh.daughters)} نفر)`,
          fraction: `${toPersianDigits((inh.daughters / units).toFixed(2))} سهم از باقی‌مانده`,
          amount: (remaining * inh.daughters) / units,
          basis: "مادهٔ ۹۰۷ قانون مدنی — دختر نصف سهم پسر",
        });
      }
      remaining = 0;
    }
  } else if (inh.father || inh.mother) {
    if (inh.father && inh.mother) {
      take("مادر", 1, 3, "مادهٔ ۹۰۶ قانون مدنی — مادر یک‌سوم");
      shares.push({ heir: "پدر", fraction: "باقی‌مانده", amount: Math.max(0, remaining), basis: "مادهٔ ۹۰۶ قانون مدنی — پدر باقی ترکه را می‌برد" });
      remaining = 0;
    } else if (inh.mother) {
      take("مادر", 1, 3, "مادهٔ ۹۰۶ قانون مدنی — مادر یک‌سوم");
      inhWarnings.push("در نبود پدر و اولاد، باقی‌ماندهٔ ترکه مشمول قاعدهٔ ردّ می‌شود.");
    } else {
      shares.push({ heir: "پدر", fraction: "باقی‌مانده", amount: Math.max(0, remaining), basis: "مادهٔ ۹۰۶ قانون مدنی — پدر باقی ترکه را می‌برد" });
      remaining = 0;
    }
  }
  const inhTotal = shares.reduce((sum, s) => sum + s.amount, 0);

  const categoryCount = (id: string) => LAWS.filter((l) => l.category === id).length;
  const caseTypes: { id: string; label: string }[] = [
    { id: "حقوقی", label: "حقوقی" },
    { id: "کیفری", label: "کیفری" },
    { id: "اداری", label: "اداری" },
  ];

  const inputClass =
    "h-10 w-full rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] px-3 text-2xs outline-none focus:border-brand-500";
  const numberInputClass = `${inputClass} persian-num`;
  const chipButton = (active: boolean, onClick: () => void, children: ReactNode, key?: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-3xs font-bold transition-colors",
        active ? "text-white border-transparent" : "border-[var(--border-subtle)] text-muted hover:border-brand-300",
      )}
      style={active ? { background: ACCENT, color: ON_ACCENT } : undefined}
    >
      {children}
    </button>
  );

  const modules: DemoModule[] = [
    {
      id: "home",
      label: "خانه",
      hint: "نمای کلی کتابخانه، دسته‌های موضوعی و راهنمای نصب روی دستگاه.",
      content: (
        <div className="space-y-5">
          <KpiGrid
            accent={ACCENT}
            items={[
              { label: "سند حقوقی", value: toPersianDigits(APP_STATS.documents) },
              { label: "مادهٔ قانونی", value: toPersianDigits(APP_STATS.articles) },
              { label: "رأی قضایی", value: toPersianDigits(APP_STATS.cases) },
              { label: "دستهٔ موضوعی", value: toPersianDigits(APP_STATS.categories) },
            ]}
          />
          <DemoPanel title="دسته‌های موضوعی">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LAW_CATEGORIES.map((category) => (
                <li key={category.id} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-2xs font-extrabold">
                      <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: category.color }} />
                      {category.title}
                    </span>
                    <span className="rounded-full bg-[var(--surface-raised)] px-2 py-0.5 text-4xs font-bold text-muted persian-num">
                      {toPersianDigits(categoryCount(category.id))} سند
                    </span>
                  </div>
                  <p className="mt-2 text-4xs leading-loose text-muted">{category.description}</p>
                </li>
              ))}
            </ul>
          </DemoPanel>
          <DemoPanel title="نصب روی دستگاه شما — اندروید، iOS و ویندوز">
            <div className="grid gap-3 sm:grid-cols-3">
              {INSTALL_PLATFORMS.map((platform) => {
                const PlatformIcon = PLATFORM_ICONS[platform.icon] ?? Smartphone;
                return (
                  <div key={platform.id} className="surface-card flex items-center gap-3 p-4">
                    <span
                      className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-md)] text-white"
                      style={{ background: ACCENT, color: ON_ACCENT }}
                    >
                      <PlatformIcon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-2xs font-extrabold">{platform.label}</p>
                      <p className="text-4xs leading-loose text-muted">{platform.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 flex items-center gap-2 text-3xs text-muted">
              <WifiOff className="size-3.5" aria-hidden />
              پس از نصب، متن قوانین روی دستگاه ذخیره می‌شود و مرور و جست‌وجو بدون اینترنت کار می‌کند.
            </p>
          </DemoPanel>
          <DemoPanel title="معرفی و اعتبار حقوقی">
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs leading-loose">
                <ShieldCheck className="mb-2 size-4" style={{ color: ACCENT }} aria-hidden />
                {LEGAL_CREDIT}
              </li>
              <li className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs leading-loose">
                <Landmark className="mb-2 size-4" style={{ color: ACCENT }} aria-hidden />
                {DEVELOPER_CREDIT}
              </li>
            </ul>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "library",
      label: "کتابخانهٔ قوانین",
      hint: "۴۶ سند حقوقی را بر اساس دستهٔ موضوعی فیلتر کنید و تعداد مواد هر سند را ببینید.",
      content: (
        <DemoPanel title={`فهرست اسناد — ${toPersianDigits(LAWS.length)} سند، ${toPersianDigits(APP_STATS.articles)} ماده`}>
          <DataTable
            rows={LAWS}
            searchKeys={(row) => `${row.title} ${row.shortTitle} ${row.documentType}`}
            filters={LAW_CATEGORIES.map((category) => ({
              id: category.id,
              label: category.title,
              predicate: (row: (typeof LAWS)[number]) => row.category === category.id,
            }))}
            columns={[
              {
                key: "title",
                header: "عنوان سند",
                render: (row) => (
                  <div>
                    <p className="font-bold">{row.shortTitle}</p>
                    <p className="text-4xs text-muted">{row.title}</p>
                  </div>
                ),
              },
              {
                key: "category",
                header: "دسته",
                render: (row) => {
                  const category = LAW_CATEGORIES.find((c) => c.id === row.category);
                  return (
                    <span className="inline-flex items-center gap-1.5 text-3xs">
                      <span aria-hidden className="size-2 rounded-full" style={{ background: category?.color ?? ACCENT }} />
                      {category?.title ?? row.category}
                    </span>
                  );
                },
              },
              { key: "documentType", header: "نوع سند", render: (row) => <span className="text-muted">{row.documentType}</span> },
              {
                key: "articleCount",
                header: "تعداد ماده",
                render: (row) => <span className="font-bold persian-num">{toPersianDigits(row.articleCount)}</span>,
              },
              { key: "approvalDate", header: "مصوب", render: (row) => <span className="text-muted persian-num">{row.approvalDate}</span> },
            ]}
          />
        </DemoPanel>
      ),
    },
    {
      id: "reader",
      label: "مطالعهٔ ماده",
      hint: "متن ماده‌به‌ماده با فصل‌بندی؛ نشان‌گذاری کنید و اندازهٔ فونت را تغییر دهید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="انتخاب سند و ماده">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-3xs font-bold text-muted">سند حقوقی</span>
                <select
                  value={current.lawId}
                  onChange={(e) => {
                    const first = ARTICLES.find((a) => a.lawId === e.target.value);
                    if (first) setArticleId(first.id);
                  }}
                  className={inputClass}
                  aria-label="انتخاب سند حقوقی"
                >
                  {lawsWithArticles.map((law) => (
                    <option key={law.id} value={law.id}>
                      {law.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-3xs font-bold text-muted">ماده</span>
                <select value={current.id} onChange={(e) => setArticleId(e.target.value)} className={inputClass} aria-label="انتخاب ماده">
                  {siblings.map((article) => (
                    <option key={article.id} value={article.id}>
                      مادهٔ {article.number}
                      {article.chapter ? ` — ${article.chapter.split("›")[0]!.trim()}` : ""}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-3xs font-bold text-muted">اندازهٔ فونت:</span>
              {(["sm", "md", "lg"] as const).map((scale) =>
                chipButton(fontScale === scale, () => setFontScale(scale), scale === "sm" ? "کوچک" : scale === "md" ? "متوسط" : "بزرگ", scale),
              )}
            </div>
          </DemoPanel>

          <article className="surface-card p-6 sm:p-8">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div>
                <p className="text-3xs font-bold text-muted">{current.lawTitle}</p>
                <h3 className="mt-1 text-lg font-extrabold">
                  مادهٔ <span className="persian-num" style={{ color: ACCENT }}>{current.number}</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-1 text-4xs font-bold"
                  style={{ background: `${ACCENT}1f`, color: ACCENT }}
                >
                  {current.status}
                </span>
                <button
                  type="button"
                  onClick={() => toggleBookmark(current.id)}
                  aria-pressed={isBookmarked}
                  aria-label={isBookmarked ? "برداشتن نشان" : "نشان‌گذاری ماده"}
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 text-3xs font-bold transition-colors",
                    isBookmarked
                      ? "border-transparent text-white"
                      : "border-[var(--border-subtle)] text-muted hover:border-brand-400",
                  )}
                  style={isBookmarked ? { background: ACCENT, color: ON_ACCENT } : undefined}
                >
                  <Bookmark className="size-3.5" aria-hidden />
                  {isBookmarked ? "نشان شد" : "نشان‌گذاری"}
                </button>
              </div>
            </header>
            {current.chapter ? (
              <p className="mb-4 flex items-center gap-2 text-4xs text-muted">
                <FileText className="size-3.5" aria-hidden />
                {current.chapter}
              </p>
            ) : null}
            <p className={cn("leading-loose text-justify", FONT_SCALES[fontScale])}>{current.text}</p>
            <footer className="mt-6 flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-4">
              <button
                type="button"
                onClick={() => position > 0 && setArticleId(siblings[position - 1]!.id)}
                disabled={position === 0}
                className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold disabled:opacity-40"
              >
                <ChevronRight className="size-3.5" aria-hidden />
                مادهٔ قبلی
              </button>
              <span className="text-4xs text-muted persian-num">
                {toPersianDigits(position + 1)} از {toPersianDigits(siblings.length)} مادهٔ این سند (دمو)
              </span>
              <button
                type="button"
                onClick={() => position < siblings.length - 1 && setArticleId(siblings[position + 1]!.id)}
                disabled={position >= siblings.length - 1}
                className="inline-flex h-9 items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold disabled:opacity-40"
              >
                مادهٔ بعدی
                <ChevronLeft className="size-3.5" aria-hidden />
              </button>
            </footer>
          </article>
        </div>
      ),
    },
    {
      id: "search",
      label: "جست‌وجو",
      hint: "جست‌وجوی فارسی در متن مواد، قوانین و آراء؛ «ماده ۲ قانون مدنی» را امتحان کنید.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="جست‌وجوی هوشمند">
            <label className="relative block">
              <span className="sr-only">عبارت جست‌وجو</span>
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="مثلاً: نفقه، حضانت، دیه، ماده ۲ قانون مدنی…"
                className="h-12 w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] ps-10 pe-3 text-sm outline-none focus:border-brand-500"
              />
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {SEARCH_SUGGESTIONS.map((suggestion) =>
                chipButton(query === suggestion, () => setQuery(suggestion), suggestion, suggestion),
              )}
            </div>
            {query.trim() ? (
              <p className="mt-4 text-3xs text-muted persian-num" aria-live="polite">
                {toPersianDigits(hits.length)} نتیجه — جست‌وجوی شبیه‌سازی‌شده با نرمال‌سازی ی/ك، نیم‌فاصله و ارقام فارسی
              </p>
            ) : (
              <p className="mt-4 text-3xs text-muted">عبارتی را جست‌وجو کنید… یا یکی از پیشنهادها را انتخاب کنید.</p>
            )}
          </DemoPanel>

          {quickPath ? (
            <DemoPanel title="مسیر سریع">
              <button
                type="button"
                onClick={() => setArticleId(quickPath.id)}
                className="flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-start transition-colors hover:bg-[var(--surface-raised)]"
              >
                <span>
                  <span className="block text-2xs font-extrabold">
                    مادهٔ {quickPath.number} {quickPath.lawTitle}
                  </span>
                  <span className="mt-1 block text-4xs text-muted">باز کردن در ماژول «مطالعهٔ ماده»</span>
                </span>
                <ChevronLeft className="size-4 shrink-0" style={{ color: ACCENT }} aria-hidden />
              </button>
            </DemoPanel>
          ) : null}

          {hits.length > 0 ? (
            <ul className="space-y-3">
              {hits.map((hit) => (
                <li key={`${hit.kind}-${hit.articleId ?? hit.lawId ?? hit.caseId}`} className="surface-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-2xs font-extrabold">{hit.title}</h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-5xs font-bold"
                      style={{ background: `${ACCENT}1f`, color: ACCENT }}
                    >
                      {hit.kind}
                    </span>
                  </div>
                  <p className="mt-2 text-3xs leading-loose text-muted">{highlight(hit.snippet, rawTokens)}</p>
                  <p className="mt-2 text-4xs text-muted persian-num">{hit.meta}</p>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="flex items-center gap-2 text-4xs text-muted">
            <Globe className="size-3.5" aria-hidden />
            در نسخهٔ واقعی، جست‌وجو با MiniSearch در Web Worker انجام می‌شود و نتیجه در کمتر از ۳۰۰ میلی‌ثانیه نمایش داده می‌شود.
          </p>
        </div>
      ),
    },
    {
      id: "cases",
      label: "آراء قضایی",
      hint: "گزیده‌ای از آراء حقوقی، کیفری و اداری؛ در نسخهٔ کامل ۱٬۹۹۸ رأی با جست‌وجوی اختصاصی.",
      content: (
        <div className="space-y-5">
          <DemoPanel
            title="مجموعهٔ آراء قضایی"
            action={
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-sunken)] px-3 py-1.5 text-4xs font-bold text-muted">
                <Download className="size-3.5" aria-hidden />
                دانلود اختیاری — حدود ۱۲٫۸ مگابایت
              </span>
            }
          >
            <DataTable
              rows={CASES}
              searchKeys={(row) => `${row.title} ${row.number} ${row.text}`}
              filters={caseTypes.map((type) => ({
                id: type.id,
                label: type.label,
                predicate: (row: (typeof CASES)[number]) => row.type === type.id,
              }))}
              columns={[
                { key: "number", header: "شمارهٔ رأی", render: (row) => <span className="font-bold persian-num">{row.number}</span> },
                { key: "title", header: "عنوان", render: (row) => <span className="font-bold">{row.title}</span> },
                {
                  key: "type",
                  header: "نوع",
                  render: (row) => (
                    <span
                      className="rounded-full px-2 py-0.5 text-5xs font-bold"
                      style={{ background: `${ACCENT}1f`, color: ACCENT }}
                    >
                      {row.type}
                    </span>
                  ),
                },
                { key: "date", header: "تاریخ", render: (row) => <span className="text-muted persian-num">{row.date}</span> },
              ]}
            />
            <p className="mt-4 text-4xs text-muted persian-num">
              {toPersianDigits(CASES.length)} رأی منتخب از {toPersianDigits(APP_STATS.cases)} رأی — در نسخهٔ کامل، مجموعهٔ کامل با جست‌وجوی اختصاصی و دریافت اختیاری در دسترس است.
            </p>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "calculators",
      label: "محاسبه‌گرها",
      hint: "محاسبه‌گر دیه (مجازات اسلامی) و ارث (قانون مدنی) — بر اساس همان قواعد نسخهٔ واقعی.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel title="محاسبه‌گر دیه">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-3xs font-bold text-muted">دیهٔ کامل (تومان)</span>
                <input
                  type="number"
                  min={0}
                  step={1_000_000}
                  value={diyyeh.full}
                  onChange={(e) => setDiyyeh((prev) => ({ ...prev, full: Number(e.target.value) }))}
                  className={numberInputClass}
                  aria-label="دیه کامل به تومان"
                />
              </label>
              <div>
                <span className="mb-1.5 block text-3xs font-bold text-muted">کسر دیه</span>
                <div className="flex flex-wrap gap-2">
                  {DIYAH_PRESETS.map((item) =>
                    chipButton(diyyeh.preset === item.id, () => setDiyyeh((prev) => ({ ...prev, preset: item.id })), item.label, item.id),
                  )}
                </div>
                <p className="mt-2 text-4xs text-muted">{preset.basis}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className="mb-1.5 block text-3xs font-bold text-muted">جنس مجنی‌علیه</span>
                  <div className="flex gap-2">
                    {(["male", "female"] as const).map((sex) =>
                      chipButton(diyyeh.sex === sex, () => setDiyyeh((prev) => ({ ...prev, sex })), sex === "male" ? "مرد" : "زن", sex),
                    )}
                  </div>
                </div>
                <label className="flex items-end gap-2 pb-1">
                  <input
                    type="checkbox"
                    checked={diyyeh.belowThird}
                    onChange={(e) => setDiyyeh((prev) => ({ ...prev, belowThird: e.target.checked }))}
                    className="size-4 accent-brand-500"
                    style={{ accentColor: ACCENT }}
                  />
                  <span className="text-3xs font-bold">جنایت کمتر از ثلث دیهٔ کامل</span>
                </label>
              </div>
              <div className="rounded-[var(--radius-md)] p-4" style={{ background: `${ACCENT}14` }}>
                <p className="text-3xs text-muted">مبلغ دیه</p>
                <p className="mt-1 text-2xl font-extrabold persian-num" style={{ color: ACCENT }}>
                  {formatToman(Math.round(diyyehAmount))}
                </p>
                <p className="mt-1 text-4xs text-muted persian-num">
                  پایه: {formatToman(Math.round(diyyehBase))} ({preset.label})
                </p>
              </div>
              <ul className="list-disc space-y-1.5 ps-4 text-4xs leading-loose text-muted">
                {diyyehNotes.map((noteText) => (
                  <li key={noteText}>{noteText}</li>
                ))}
              </ul>
            </div>
          </DemoPanel>

          <DemoPanel title="محاسبه‌گر ارث — طبقهٔ اول">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-3xs font-bold text-muted">مبلغ ترکه (تومان)</span>
                <input
                  type="number"
                  min={0}
                  step={1_000_000}
                  value={inh.estate}
                  onChange={(e) => setInheritance((prev) => ({ ...prev, estate: Number(e.target.value) }))}
                  className={numberInputClass}
                  aria-label="مبلغ ترکه به تومان"
                />
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="mb-1.5 block text-4xs font-bold text-muted">پسر</span>
                  <input
                    type="number"
                    min={0}
                    value={inh.sons}
                    onChange={(e) => setInheritance((prev) => ({ ...prev, sons: Math.max(0, Number(e.target.value)) }))}
                    className={numberInputClass}
                    aria-label="تعداد پسر"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-4xs font-bold text-muted">دختر</span>
                  <input
                    type="number"
                    min={0}
                    value={inh.daughters}
                    onChange={(e) => setInheritance((prev) => ({ ...prev, daughters: Math.max(0, Number(e.target.value)) }))}
                    className={numberInputClass}
                    aria-label="تعداد دختر"
                  />
                </label>
                <div>
                  <span className="mb-1.5 block text-4xs font-bold text-muted">جنس متوفی</span>
                  <div className="flex gap-1.5">
                    {(["male", "female"] as const).map((sex) =>
                      chipButton(inh.deceased === sex, () => setInheritance((prev) => ({ ...prev, deceased: sex })), sex === "male" ? "مرد" : "زن", `inh-${sex}`),
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {([
                  { key: "spouse", label: "همسر (زوج/زوجه)" },
                  { key: "father", label: "پدر" },
                  { key: "mother", label: "مادر" },
                ] as const).map((item) => (
                  <label key={item.key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inh[item.key]}
                      onChange={(e) => setInheritance((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                      className="size-4"
                      style={{ accentColor: ACCENT }}
                    />
                    <span className="text-3xs font-bold">{item.label}</span>
                  </label>
                ))}
              </div>
              {inh.spouse && inh.deceased === "male" ? (
                <label className="block">
                  <span className="mb-1.5 block text-3xs font-bold text-muted">تعداد همسر (زوجه)</span>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={inh.wives}
                    onChange={(e) => setInheritance((prev) => ({ ...prev, wives: Math.max(1, Math.min(4, Number(e.target.value))) }))}
                    className={numberInputClass}
                    aria-label="تعداد همسر"
                  />
                </label>
              ) : null}
              {shares.length > 0 ? (
                <ul className="space-y-2">
                  {shares.map((share) => (
                    <li key={share.heir} className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-2xs font-extrabold">{share.heir}</span>
                        <span className="text-2xs font-extrabold persian-num" style={{ color: ACCENT }}>
                          {formatToman(Math.round(share.amount))}
                        </span>
                      </div>
                      <p className="mt-1 text-4xs text-muted persian-num">
                        {share.fraction} — {share.basis}
                      </p>
                    </li>
                  ))}
                  <li className="flex items-center justify-between rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] p-3 text-3xs">
                    <span className="font-bold text-muted">مجموع سهم‌الارث</span>
                    <span className="font-extrabold persian-num">{formatToman(Math.round(inhTotal))}</span>
                  </li>
                </ul>
              ) : null}
              {inhWarnings.length > 0 ? (
                <ul className="list-disc space-y-1.5 ps-4 text-4xs leading-loose text-amber-600 dark:text-amber-300">
                  {inhWarnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              ) : null}
              <p className="text-4xs leading-loose text-muted">
                محدودهٔ پشتیبانی: طبقهٔ اول (همسر، اولاد و والدین). موارد پیچیده — اخوه، اجداد، وصیت و دین — نیازمند بررسی کارشناسی است.
              </p>
            </div>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "bookmarks",
      label: "نشان‌ها و یادداشت‌ها",
      hint: "ماده‌های نشان‌گذاری‌شده و یادداشت شخصی — همه‌چیز فقط روی همین دستگاه می‌ماند.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <DemoPanel
            title={`نشان‌ها (${toPersianDigits(bookmarked.length)})`}
            action={
              bookmarked.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setBookmarked([])}
                  className="h-9 rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-3 text-3xs font-bold text-muted hover:text-rose-500"
                >
                  پاک کردن همه
                </button>
              ) : undefined
            }
          >
            {bookmarked.length === 0 ? (
              <p className="rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] p-6 text-center text-2xs text-muted">
                هنوز ماده‌ای نشان‌گذاری نشده است؛ در ماژول «مطالعهٔ ماده» روی دکمهٔ «نشان‌گذاری» بزنید.
              </p>
            ) : (
              <ul className="space-y-2">
                {bookmarked.map((id) => {
                  const article = ARTICLES.find((a) => a.id === id);
                  if (!article) return null;
                  return (
                    <li key={id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                      <button type="button" onClick={() => setArticleId(id)} className="min-w-0 flex-1 text-start">
                        <span className="block truncate text-2xs font-extrabold">
                          مادهٔ {article.number} {article.lawTitle}
                        </span>
                        <span className="mt-0.5 block truncate text-4xs text-muted">{article.chapter || article.status}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(id)}
                        aria-label="برداشتن نشان"
                        className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] text-muted hover:text-rose-500"
                      >
                        <Bookmark className="size-3.5" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </DemoPanel>

          <DemoPanel title="یادداشت شخصی">
            <label className="block">
              <span className="sr-only">یادداشت شخصی</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={8}
                placeholder="یادداشت خود را دربارهٔ مواد اینجا بنویسید…"
                className="w-full rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] p-3 text-2xs leading-loose outline-none focus:border-brand-500"
              />
            </label>
            <p className="mt-2 text-4xs text-muted persian-num">{toPersianDigits(note.length)} نویسه</p>
            <p className="mt-3 flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3 text-4xs leading-loose text-muted">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0" style={{ color: ACCENT }} aria-hidden />
              {PRIVACY_NOTE}
            </p>
          </DemoPanel>
        </div>
      ),
    },
    {
      id: "about",
      label: "درباره و منابع",
      hint: "اعتبارسنجی حقوقی، مراجع رسمی، سلسله‌مراتب منابع و سلب مسئولیت.",
      content: (
        <div className="space-y-5">
          <DemoPanel title="کتابچهٔ قانون ایران — نسخهٔ ۱.۰.۰">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                <p className="text-3xs text-muted">جمع‌آوری و تدوین</p>
                <p className="mt-1 text-2xs font-extrabold">{LEGAL_CREDIT}</p>
              </div>
              <div className="rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4">
                <p className="text-3xs text-muted">توسعهٔ نرم‌افزار</p>
                <p className="mt-1 text-2xs font-extrabold">{DEVELOPER_CREDIT}</p>
              </div>
            </div>
            <p className="mt-4 text-2xs leading-loose text-muted">
              نسخهٔ ۱.۰.۰ — تاریخ انتشار ۱۴۰۵/۰۷/۱۱. وب‌اپلیکیشن پیش‌رونده (PWA) با قابلیت نصب روی اندروید، iOS و ویندوز و
              کاربری ۱۰۰٪ آفلاین پس از نصب.
            </p>
          </DemoPanel>

          <DemoPanel title="سلسله‌مراتب منابع حقوقی">
            <ol className="grid gap-2 sm:grid-cols-2">
              {LAW_HIERARCHY.map((level, index) => (
                <li key={level.id} className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-3">
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-full text-4xs font-extrabold text-white persian-num"
                    style={{ background: ACCENT, color: ON_ACCENT }}
                  >
                    {toPersianDigits(index + 1)}
                  </span>
                  <div>
                    <p className="text-2xs font-extrabold">{level.title}</p>
                    <p className="text-4xs text-muted">{level.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-4xs leading-loose text-muted">
              در جست‌وجو، سطح هر سند نمایش داده می‌شود تا وزن استنادی هر متن روشن باشد.
            </p>
          </DemoPanel>

          <DemoPanel title="مراجع رسمی">
            <ul className="space-y-2">
              {OFFICIAL_SOURCES.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 transition-colors hover:bg-[var(--surface-raised)]"
                  >
                    <span>
                      <span className="block text-2xs font-extrabold">{source.title}</span>
                      <span className="mt-0.5 block text-4xs text-muted">{source.note}</span>
                    </span>
                    <Globe className="size-4 shrink-0" style={{ color: ACCENT }} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </DemoPanel>

          <DemoPanel title="حریم خصوصی و سلب مسئولیت">
            <div className="space-y-3">
              <p className="flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--surface-sunken)] p-4 text-2xs leading-loose text-muted">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" style={{ color: ACCENT }} aria-hidden />
                {PRIVACY_NOTE}
              </p>
              <p className="rounded-[var(--radius-md)] border border-amber-500/30 bg-amber-500/10 p-4 text-2xs leading-loose text-amber-700 dark:text-amber-200">
                {DISCLAIMER}
              </p>
            </div>
          </DemoPanel>
        </div>
      ),
    },
  ];

  return (
    <DemoShell
      productSlug="law-book"
      productName="کتابچه قانون"
      emoji="📖"
      accent={ACCENT}
      modules={modules}
      onReset={reset}
    />
  );
}
