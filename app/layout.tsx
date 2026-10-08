import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { READER_BOOT_SCRIPT } from "@/lib/reader";
import { ReaderControls } from "@/components/typography/reader-controls";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/json-ld";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { CrispChat } from "@/components/layout/crisp-chat";

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
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
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
    { media: "(prefers-color-scheme: light)", color: "#050505" },
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
        <link rel="preload" href="/fonts/vazirmatn-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* تنظیمات نوشتار کاربر، پیش از نقاشی اول اعمال می‌شود تا متن پرش نکند */}
        <script dangerouslySetInnerHTML={{ __html: READER_BOOT_SCRIPT }} />
        <ThemeProvider>{children}</ThemeProvider>
        <ReaderControls />
        <CrispChat />
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
      </body>
    </html>
  );
}
