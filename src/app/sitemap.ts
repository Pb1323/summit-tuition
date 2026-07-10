import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

const staticRoutes = [
  "",
  "/about",
  "/pricing",
  "/contact",
  "/book-a-call",
  "/faq",
  "/diagnostic",
  "/diagnostic-assessment",
  "/weekly-mock-club",
  "/practice-paper-simulator",
  "/practice-packs",
  "/complete-programme",
  "/holiday-booster",
  "/tuition",
  "/tuition/group",
  "/tuition/private",
  "/mocks",
  "/mocks/maths",
  "/mocks/science",
  "/topics/maths",
  "/topics/science",
  "/privacy-policy",
  "/terms",
  "/safeguarding",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/pricing" || path === "/diagnostic" ? 0.9 : 0.6,
  }));
}
