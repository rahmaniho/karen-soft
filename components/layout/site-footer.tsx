import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { CHAP_LINKS, FOOTER_LEGAL, FOOTER_RESOURCES, SERVICES, SITE } from "@/lib/constants";
import { SOLUTIONS } from "@/lib/solutions";
import { PRODUCTS } from "@/lib/products";
import { NewsletterForm } from "@/components/sections/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-ink-950 text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Link href="/" className="flex items-center gap-2.5" aria-label="صفحه اصلی کارن سافت">
            <Image src="/images/logo.png" alt="لوگوی کارن سافت" width={44} height={44} className="size-11 object-contain" />
            <span className="flex flex-col leading-tight">
              <strong className="text-md">{SITE.name}</strong>
              <small className="text-6xs font-extrabold tracking-[3px] text-brand-300">KAREN SOFT</small>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-xs leading-loose text-white/60">
            شریک فنی رشد کسب‌وکار شما در قزوین؛ طراحی وب، نرم‌افزار اختصاصی، اتوماسیون و امنیت سایبری.
          </p>
          <ul className="mt-6 space-y-2.5 text-xs text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="size-3.5 text-brand-300" aria-hidden />
              <a href={`tel:${SITE.phone}`} className="hover:text-white">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-3.5 text-brand-300" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-3.5 text-brand-300" aria-hidden />
              {SITE.address}
            </li>
          </ul>
          <div className="mt-6 flex gap-2">
            <a
              href={SITE.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام کارن سافت"
              className="grid size-10 place-items-center rounded-[var(--radius-sm)] border border-white/15 transition-colors hover:border-brand-400 hover:text-brand-300"
            >
              <Send className="size-4" aria-hidden />
            </a>
            <a
              href={SITE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="اینستاگرام کارن سافت"
              className="grid size-10 place-items-center rounded-[var(--radius-sm)] border border-white/15 transition-colors hover:border-brand-400 hover:text-brand-300"
            >
              <Instagram className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <FooterColumn title="خدمات و راهکارها">
          {SERVICES.map((service) => (
            <FooterLink key={service.slug} href={`/services#${service.slug}`}>{service.title}</FooterLink>
          ))}
          {SOLUTIONS.map((solution) => (
            <FooterLink key={solution.slug} href={`/solutions/${solution.slug}`}>{solution.name}</FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="محصولات">
          {PRODUCTS.map((product) => (
            <FooterLink key={product.slug} href={`/products/${product.slug}`}>{product.name}</FooterLink>
          ))}
          <FooterLink href="/demo" accent>دموی زنده ⭐</FooterLink>
          <FooterLink href="/demo/industries" accent>گالری صنایع</FooterLink>
        </FooterColumn>

        <FooterColumn title="کارن چاپ">
          {CHAP_LINKS.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
          <li className="pt-2 text-[11px] leading-relaxed text-white/40">
            چاپ، مهر و صحافی در قزوین — زیرمجموعۀ کارن سافت.
          </li>
        </FooterColumn>

        <div>
          <FooterColumn title="منابع">
            {FOOTER_RESOURCES.map((item) => (
              <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>
            ))}
            {FOOTER_LEGAL.map((item) => (
              <FooterLink key={item.href} href={item.href}>{item.label}</FooterLink>
            ))}
          </FooterColumn>
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-extrabold text-white/85">خبرنامه ماهانه</h3>
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-5 text-3xs text-white/45">
          <span>© {SITE.name} — تمامی حقوق محفوظ است.</span>
          <span>
            ساعات کاری: شنبه تا چهارشنبه {SITE.workingHours.satWed} · پنجشنبه {SITE.workingHours.thu}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-extrabold text-white/85">{title}</h3>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, accent }: { href: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <li>
      <Link
        href={href}
        className={`block py-0.5 text-3xs transition-colors hover:text-white ${accent ? "font-extrabold text-brand-300" : "text-white/55"}`}
      >
        {children}
      </Link>
    </li>
  );
}
