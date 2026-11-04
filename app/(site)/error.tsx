"use client";

import React, { useEffect } from "react";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { StatePanel } from "@/components/ui/state-panel";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Site render error", error); }, [error]);
  return (
    <div className="container-page">
      <StatePanel
        role="alert"
        icon={<AlertTriangle className="size-6" />}
        eyebrow="خطای موقت"
        title="چیزی طبق برنامه پیش نرفت."
        description="متأسفیم؛ این بخش اکنون در دسترس نیست. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید."
      >
        <Button type="button" onClick={reset} icon={<RotateCcw className="size-4" aria-hidden />}>تلاش دوباره</Button>
        <ButtonLink href="/" variant="outline"><Home className="size-4" aria-hidden />بازگشت به خانه</ButtonLink>
      </StatePanel>
    </div>
  );
}
