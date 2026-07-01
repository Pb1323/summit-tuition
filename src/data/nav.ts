import type { NavLink, FooterColumn } from "@/types/nav";

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Diagnostic", href: "/diagnostic-assessment" },
  { label: "Mocks", href: "/weekly-mock-club" },
  { label: "Practice Papers", href: "/practice-paper-simulator" },
  { label: "Tuition", href: "/tuition" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Login", href: "/login" },
];

export const HEADER_CTA: NavLink = { label: "Book a Call", href: "/book-a-call" };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Diagnostic Assessment", href: "/diagnostic-assessment" },
      { label: "Weekly Mock Club", href: "/weekly-mock-club" },
      { label: "Practice Paper Simulator", href: "/practice-paper-simulator" },
      { label: "Private Tuition", href: "/tuition/private" },
      { label: "Group Tuition", href: "/tuition/group" },
      { label: "Complete 11+ Programme", href: "/complete-programme" },
      { label: "Holiday Booster Courses", href: "/holiday-booster" },
      { label: "Practice Packs", href: "/practice-packs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Book a Free Parent Call", href: "/book-a-call" },
      { label: "Student Login", href: "/login" },
      { label: "Register", href: "/register" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Safeguarding", href: "/safeguarding" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms and Conditions", href: "/terms" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Call", href: "/book-a-call" },
    ],
  },
];
