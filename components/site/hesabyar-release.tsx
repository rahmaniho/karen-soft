import React from "react";
import { SurfaceCard } from "@/components/ui/card";
import { HESABYAR_RELEASE_CHANGES } from "@/lib/hesabyar";
import { formatNumber } from "@/lib/utils";

/** Customer-facing release cards; technical source links stay in the release documentation. */
export function HesabyarReleaseNotes() {
  return (
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
  );
}
