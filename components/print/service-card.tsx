import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { PrintService } from "@/lib/print/types";
import { ChapIcon } from "@/components/print/chap-icon";

export function ServiceCard({ service, index }: { service: PrintService; index: number }) {
  return (
    <Link
      href={`/print/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <span className="relative block aspect-[16/9] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/5 to-transparent" aria-hidden />
        <span className="absolute bottom-3 start-3 grid size-11 place-items-center rounded-[var(--radius-md)] bg-white/90 text-ink-900">
          <ChapIcon name={service.icon} className="size-5" />
        </span>
        <span className="sec-index absolute end-3 top-3 rounded-full bg-white/85 px-2 py-0.5 text-ink-900">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <span className="flex flex-1 flex-col p-5">
        <span className="block font-titr text-lg leading-snug text-[color:var(--text-primary)]">{service.title}</span>
        <span className="mt-2 block text-2xs leading-loose text-muted">{service.short}</span>
        <span className="mt-4 flex items-center gap-1.5 text-3xs font-bold text-brand-600 transition-transform duration-[200ms] group-hover:-translate-x-1 dark:text-brand-300">
          مشاهده خدمات و محصولات
          <ArrowLeft className="size-3.5" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
