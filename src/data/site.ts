export const SITE = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "Summit Tuition",
  shortName: process.env.NEXT_PUBLIC_APP_SHORT_NAME ?? "Summit",
  tagline:
    "Premium 11+ mocks and progress reports that show students exactly what to improve next",
  description:
    "Premium online 11+ mock exams, English and maths practice, diagnostic assessments, tuition and progress reports for selective entrance preparation.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.summittuition.co.uk",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "pranav.bgri@gmail.com",
  // E.164 without the leading "+", ready to drop into a wa.me link. Temporary manual-payment
  // channel while Stripe live mode is still gated on domain purchase + bank activation.
  whatsappNumber: "447726951811",
  address: "London & online, serving families across the UK",
  copyrightYear: "2026",
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
};
