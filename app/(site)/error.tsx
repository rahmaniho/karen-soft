"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function SiteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Site render error", error); }, [error]);
  return <section className="ks-error" role="alert"><span>خطای موقت / 500</span><h1>چیزی طبق برنامه پیش نرفت.</h1><p>متأسفیم؛ این بخش اکنون در دسترس نیست. می‌توانید دوباره تلاش کنید یا به صفحه اصلی برگردید.</p><div><button type="button" onClick={reset} className="ks-button ks-button-primary"><RotateCcw size={17} /> تلاش دوباره</button><Link href="/" className="ks-button ks-button-outline">بازگشت به خانه</Link></div></section>;
}
