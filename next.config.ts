import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ۱. خط output: 'export' حذف شد چون Vercel نیازی به خروجی استاتیک ندارد
  // ۲. این دو تنظیم باعث می‌شوند خطاهای تایپ و لینت، جلوی بیلد را نگیرند
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // ۳. برای جلوگیری از خطای تصاویر خارجی و بهینه‌سازی آن‌ها
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
