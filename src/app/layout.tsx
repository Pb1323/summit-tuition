import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PremiumGridBackground } from "@/components/layout/premium-grid-background";
import { SITE } from "@/data/site";
import { PlatformProvider } from "@/context/platform-context";

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative flex min-h-full flex-col bg-cream font-sans text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <PremiumGridBackground />
        <PlatformProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          </div>
        </PlatformProvider>
      </body>
    </html>
  );
}
