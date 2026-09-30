import type { NextConfig } from "next";

const legacyRedirects: { source: string; destination: string; permanent: boolean }[] = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/products.html", destination: "/products", permanent: true },
  { source: "/portfolio.html", destination: "/portfolio", permanent: true },
  { source: "/contact.html", destination: "/contact", permanent: true },
  { source: "/blog.html", destination: "/blog", permanent: true },
  { source: "/print.html", destination: "/solutions/printing", permanent: true },
  { source: "/taxi.html", destination: "/products/taxi-management", permanent: true },
  { source: "/law-office.html", destination: "/products/law-office", permanent: true },
  { source: "/download-law-software.html", destination: "/products/law-office/download", permanent: true },
  { source: "/najafisahar.html", destination: "/portfolio/najafisahar", permanent: true },
  { source: "/saharnajafi.html", destination: "/portfolio/sahar-najafi-nails", permanent: true },
  { source: "/404.html", destination: "/not-found", permanent: true },
  { source: "/products/print-management", destination: "/solutions/printing", permanent: true },
  // Blog articles
  { source: "/blog/index.html", destination: "/blog", permanent: true },
  { source: "/blog/archive.html", destination: "/blog/archive", permanent: true },
  { source: "/blog/automation.html", destination: "/blog/office-automation", permanent: true },
  { source: "/blog/direct_to_cell.html", destination: "/blog/direct-to-cell", permanent: true },
  { source: "/blog/growth-strategies.html", destination: "/blog/growth-strategies", permanent: true },
  { source: "/blog/law-management.html", destination: "/blog/legal-case-management", permanent: true },
  { source: "/blog/online-store.html", destination: "/blog/online-store", permanent: true },
  { source: "/blog/remote-teams.html", destination: "/blog/remote-teams", permanent: true },
  { source: "/blog/security.html", destination: "/blog/security", permanent: true },
  { source: "/blog/smart-case-management.html", destination: "/blog/smart-case-management", permanent: true },
  { source: "/blog/taxi.html", destination: "/blog/taxi-management", permanent: true },
  { source: "/blog/why-lawyer-needs-website.html", destination: "/blog/why-lawyer-needs-website", permanent: true },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
