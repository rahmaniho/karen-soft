import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CHAP } from "@/lib/print/site";
import { PRINT_SERVICES } from "@/lib/print/data/services";

export function ChapFooter() {
  return (
    <footer className="mt-24 bg-ink-950 text-white">
      <div className="cmyk-strip" aria-hidden>
        <span style={{ background: "var(--color-cmyk-c)" }} />
        <span style={{ background: "var(--color-cmyk-m)" }} />
        <span style={{ background: "var(--color-cmyk-y)" }} />
        <span style={{ background: "var(--color-cmyk-k)" }} />
      </div>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link href={CHAP.path} className="flex items-center gap-3" aria-label={`${CHAP.name} — خانه`}>
            <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-white/5 p-1">
              <Image src={CHAP.logo} alt="" width={64} height={64} className="size-9 object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <strong className="font-titr text-[17px]">{CHAP.name}</strong>
              <small className="mt-1 text-6xs tracking-[0.28em] text-white/45" dir="ltr">
                {CHAP.motto}
              </small>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-2xs leading-loose text-white/60">
            استودیوی چاپ دیجیتال و افست، ساخت مهر و صحافی حرفه‌ای در قزوین؛ با بیش از ۱۲ سال تجربه و هزاران سفارش موفق.
            زیرمجموعۀ {CHAP.name}، خدمات نرم‌افزاری کارن سافت را هم کنار چاپ دارد.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-2xs font-bold text-white/85">خدمات</h3>
          <ul className="space-y-1.5">
            {PRINT_SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/print/services/${service.slug}`}
                  className="block py-0.5 text-3xs text-white/55 transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xs font-bold text-white/85">دسترسی سریع</h3>
          <ul className="space-y-1.5">
            {[
              { label: "ثبت سفارش آنلاین", href: "/print/order" },
              { label: "نمونه‌کارها", href: "/print/portfolio" },
              { label: "درباره ما", href: "/print/about" },
              { label: "سوالات متداول", href: "/print/faq" },
              { label: "تماس با ما", href: "/print/contact" },
              { label: "کارن سافت", href: "/" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-0.5 text-3xs text-white/55 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-2xs font-bold text-white/85">تماس و آدرس</h3>
          <ul className="space-y-3 text-3xs text-white/70">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-3.5 shrink-0 text-white/40" aria-hidden />
              <a href={`tel:${CHAP.tel}`} dir="ltr" className="persian-num hover:text-white">
                {CHAP.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-3.5 shrink-0 text-white/40" aria-hidden />
              <a href={`mailto:${CHAP.email}`} className="hover:text-white" dir="ltr">
                {CHAP.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-3.5 shrink-0 text-white/40" aria-hidden />
              <span>{CHAP.address}</span>
            </li>
          </ul>
          <p className="mt-4 text-6xs leading-loose text-white/40">{CHAP.hours}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-6xs text-white/45">
          <span>
            © {new Date().getFullYear()} — تمامی حقوق برای {CHAP.name} محفوظ است.
          </span>
          <span className="flex items-center gap-2">
            <span>زیرمجموعۀ کارن سافت</span>
            <span aria-hidden>·</span>
            <Link href="/" className="text-white/70 hover:text-white">
              Karen-soft.ir
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
