import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 86400 },
  allowedDevOrigins: ["*.e2b.app"],
  // نسخه‌های نمایشی در public/demos پوشهٔ ایستا هستند و پیوندهایشان به شکل «پوشه/» است.
  // تغییر مسیر خودکار «/» پایانی خاموش می‌شود و برای بقیهٔ سایت با redirect صریح جایگزین شده است.
  skipTrailingSlashRedirect: true,
  async headers() {
    return [{source: "/:path*", headers: [
      {key: "X-Content-Type-Options", value: "nosniff"},
      {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
    ]},
    // نسخه‌های نمایشی برای فهرست‌شدن در موتور جست‌وجو نیستند.
    {source: "/demos/:path*", headers: [
      {key: "X-Robots-Tag", value: "noindex, nofollow"},
    ]}];
  },
  async rewrites() {
    return {
      afterFiles: [
        {source: "/demos/:path*/", destination: "/demos/:path*/index.html"},
        {source: "/demos/:path*", destination: "/demos/:path*/index.html"},
      ],
    };
  },
  async redirects() {
    return [
      // نشانی‌های سایت بدون «/» پایانی‌اند؛ همان رفتار قبلی Next برای بقیهٔ مسیرها.
      {source: "/:path((?!demos/).+)/", destination: "/:path", permanent: true},
      {source: "/:path*", has: [{type: "host" as const, value: "www.karen-soft.ir"}], destination: "https://karen-soft.ir/:path*", permanent: true},
      ...legacyRedirects.map(([source, destination]) => ({source, destination, permanent: true})),
    ];
  },
};
export default nextConfig;
