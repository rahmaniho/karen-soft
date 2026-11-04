import React from "react";
import { ExternalLink } from "lucide-react";
import { SurfaceCard } from "@/components/ui/card";
import {
  HESABYAR_APK_SHA256_URL,
  HESABYAR_RELEASE_CHANGES,
  HESABYAR_RELEASE_URL,
  HESABYAR_SOURCE_COMMIT,
} from "@/lib/hesabyar";
import { formatNumber } from "@/lib/utils";

/** Server-rendered release notes shared by the product page and its regression tests. */
export function HesabyarReleaseNotes() {
  return (
    <>
      <ol className="grid list-none gap-5 md:grid-cols-2 lg:grid-cols-3">
        {HESABYAR_RELEASE_CHANGES.map((change, index) => (
          <li key={change.title}>
            <SurfaceCard as="article" className="h-full p-6">
              <span className="sec-index" aria-hidden>{formatNumber(index + 1, { minimumIntegerDigits: 2, useGrouping: false })}</span>
              <h3 className="mt-4 mb-2">{change.title}</h3>
              <p className="text-xs leading-loose text-muted">{change.text}</p>
            </SurfaceCard>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-brand-600 dark:text-brand-300">
        <a href={HESABYAR_RELEASE_URL} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
          یادداشت انتشار رسمی در GitHub <ExternalLink className="size-4" aria-hidden />
        </a>
        <a href={HESABYAR_APK_SHA256_URL} className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4">
          دریافت فایل SHA-256 <ExternalLink className="size-4" aria-hidden />
        </a>
        <a
          href={`https://github.com/rahmaniho/KarenYar/blob/${HESABYAR_SOURCE_COMMIT}/docs/releases/v1.4.2.md`}
          className="inline-flex min-h-11 items-center gap-2 underline underline-offset-4"
        >
          منبع تغییرات همین ساخت <ExternalLink className="size-4" aria-hidden />
        </a>
      </div>
    </>
  );
}
