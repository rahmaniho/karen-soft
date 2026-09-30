import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | طراحی و توسعه نرم‌افزار برای کسب‌وکارها`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder }],
  keywords: [
    "طراحی سایت قزوین",
    "نرم افزار اختصاصی",
    "نرم افزار دفتر وکالت",
    "مدیریت چاپخانه",
    "اتوماسیون اداری",
    "کارن سافت",
  ],
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} | شریک فنی رشد کسب‌وکار شما`,
    description: SITE.description,
    images: ["/images/logo-karensoft.png"],
  },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
