import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/api", "/dev", "/mocks/*/start", "/mocks/*/review"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
