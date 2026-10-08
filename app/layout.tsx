import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { READER_BOOT_SCRIPT } from "@/lib/reader";
import { ReaderControls } from "@/components/typography/reader-controls";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ThemeProvider } from "@/components/layout/theme-provider";

const homeTitle = `${SITE.name} | طراحی وب‌سایت و نرم‌افزار مدیریتی در قزوین`;
const socialImage = "/images/logo-karensoft.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: homeTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder }],
  creator: SITE.name,
  publisher: SITE.name,
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE.name,
    url: SITE.url,
    title: homeTitle,
    description: SITE.description,
    images: [{ url: socialImage, alt: `${SITE.name} — طراحی وب و نرم‌افزار` }],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: SITE.description,
    images: [socialImage],
  },
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <body>
        {/* بارگذاری زودِ دو فونت اصلی: ایران‌سنس (متن) و تیتر (تیترها) */}
        <link rel="preload" href="/fonts/iransans/IRANSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/iransans/IRANSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/titr/Titr.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* تنظیمات نوشتار کاربر، پیش از نقاشی اول اعمال می‌شود تا متن پرش نکند */}
        <script dangerouslySetInnerHTML={{ __html: READER_BOOT_SCRIPT }} />
        <ThemeProvider>{children}</ThemeProvider>
        <ReaderControls />
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
