import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/data/site";
import { PlatformProvider } from "@/context/platform-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | 11+ Tuition, Mock Exams & Diagnostic Assessments`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "11+ tuition",
    "11+ mock exams",
    "11+ diagnostic assessment",
    "11+ tutor",
    "11+ practice papers",
    "11+ preparation",
    "grammar school entrance exam preparation",
    "GL 11+ preparation",
    "CEM-style 11+ preparation",
  ],
  openGraph: {
    title: `${SITE.name} | 11+ Tuition, Mock Exams & Diagnostic Assessments`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <PlatformProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlatformProvider>
      </body>
    </html>
  );
}
