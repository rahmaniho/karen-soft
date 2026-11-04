import React from "react";
import { ArrowLeft, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SurfaceCard } from "@/components/ui/card";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: readonly BreadcrumbItem[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-b border-[var(--hairline)] bg-[var(--surface-sunken)] py-16 sm:py-24${className ? ` ${className}` : ""}`}>
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-page relative">
        <Breadcrumbs items={breadcrumbs ?? [{ name: "خانه", path: "/" }, { name: title }]} />
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display-1 mt-5 max-w-4xl">{title}</h1>
        <p className="lead mt-6">{description}</p>
        {children ? <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function ContentSection({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return <section id={id} className="container-page py-12 sm:py-16"><h2 className="display-3 mb-8">{title}</h2>{children}</section>;
}

export function Points({ items }: { items: readonly string[] }) {
  return <ul className="space-y-4">{items.map(item => <li key={item} className="flex gap-3 leading-loose"><Check aria-hidden className="mt-1 size-5 shrink-0 text-brand-500" /><span>{item}</span></li>)}</ul>;
}

export function InfoGrid({ items }: { items: readonly { title: string; desc: string }[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <SurfaceCard as="article" key={item.title} className="p-7">
          <span className="sec-index">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-4 mb-3">{item.title}</h3>
          <p className="leading-loose text-muted">{item.desc}</p>
        </SurfaceCard>
      ))}
    </div>
  );
}

export function ContactCTA() {
  return (
    <section className="container-page py-16">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[var(--radius-2xl)] bg-ink-900 p-8 text-white sm:p-14">
        <div>
          <span className="eyebrow !text-brand-300">LET’S BUILD TOGETHER</span>
          <h2 className="display-3 mt-4">قدم بعدی، یک گفت‌وگوی ساده است.</h2>
          <p className="mt-3 text-white/70">نیازتان را بگویید؛ مسیر اجرا را با هم مشخص می‌کنیم.</p>
        </div>
        <ButtonLink href="/contact">درخواست مشاوره <ArrowLeft className="size-4" aria-hidden /></ButtonLink>
      </div>
    </section>
  );
}
