import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], minimumCacheTTL: 86400 },
  allowedDevOrigins: ["*.e2b.app"],
  async headers() {
    return [{source: "/:path*", headers: [
      {key: "X-Content-Type-Options", value: "nosniff"},
      {key: "Referrer-Policy", value: "strict-origin-when-cross-origin"},
      {key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()"},
    ]}];
  },
  async redirects() {
    return [
      {source: "/:path*", has: [{type: "host" as const, value: "www.karen-soft.ir"}], destination: "https://karen-soft.ir/:path*", permanent: true},
      ...legacyRedirects.map(([source, destination]) => ({source, destination, permanent: true})),
    ];
  },
};
export default nextConfig;
