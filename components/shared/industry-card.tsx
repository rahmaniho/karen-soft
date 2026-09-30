import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Industry } from "@/lib/industries";

/** Card with an animated mini-mockup preview of the industry showcase. */
export function IndustryCard({ industry }: { industry: Industry }) {
  const { palette } = industry;
  return (
    <article className="group surface-card relative flex h-full flex-col overflow-hidden transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
      <div className="relative h-52 overflow-hidden" style={{ background: palette.gradient }}>
        <div
          className="absolute inset-x-6 top-6 rounded-t-[var(--radius-md)] p-4 shadow-[0_18px_40px_rgba(0,0,0,.18)] transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3"
          style={{ background: palette.surface, color: palette.text }}
          aria-hidden
        >
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full" style={{ background: palette.primary }} />
            <span className="h-1.5 w-12 rounded-full" style={{ background: palette.border }} />
            <span className="ms-auto h-1.5 w-8 rounded-full" style={{ background: palette.border }} />
          </div>
          <div className="mt-4 h-2.5 w-3/4 rounded-full" style={{ background: palette.primary }} />
          <div className="mt-2 h-2 w-1/2 rounded-full" style={{ background: palette.border }} />
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-8 rounded" style={{ background: i === 1 ? `${palette.secondary}40` : palette.border }} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-brand-600 dark:text-brand-300">
          {industry.categoryLabel}
        </span>
        <h3 className="mt-2 text-lg font-extrabold">
          <Link href={`/demo/industries/${industry.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {industry.name}
          </Link>
        </h3>
        <p className="mt-2 text-[13px] leading-loose text-muted">{industry.description}</p>
        <p className="mt-3 text-[11px] font-bold text-muted">{industry.aesthetic}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-extrabold text-brand-600 dark:text-brand-300">
          مشاهده دموی کامل
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" aria-hidden />
        </span>
      </div>
    </article>
  );
}
