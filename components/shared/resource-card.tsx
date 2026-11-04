import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SurfaceCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  href: string;
  title: string;
  category: string;
  description?: string;
  image?: string;
  logo?: string;
  action?: string;
  className?: string;
  icon?: ReactNode;
}

/**
 * A resource has one named link and one tab stop. The stretched pseudo-element
 * makes the whole card clickable without nesting buttons/links in an anchor.
 */
export function ResourceCard({
  href,
  title,
  category,
  description,
  image,
  logo,
  action = "مطالعه بیشتر",
  className,
  icon,
}: ResourceCardProps) {
  return (
    <SurfaceCard as="article" interactive className={cn("group relative flex h-full flex-col overflow-hidden", className)}>
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-sunken)]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {icon ? <span aria-hidden className="mb-4 text-3xl">{icon}</span> : null}
        <div className="flex items-center gap-2.5">
          {logo ? (
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[var(--hairline)] bg-white p-1">
              <Image src={logo} alt="" width={32} height={32} className="size-full object-contain" />
            </span>
          ) : null}
          <span className="eyebrow">{category}</span>
        </div>
        <h3 className="mt-3">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        {description ? <p className="mt-3 text-sm leading-loose text-muted">{description}</p> : null}
        <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-brand-600 dark:text-brand-300">
          {action}
          <ArrowLeft className="size-4" />
        </span>
      </div>
    </SurfaceCard>
  );
}
