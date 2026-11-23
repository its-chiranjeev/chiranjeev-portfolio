import { getAbsoluteUrl } from "@/lib/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = getAbsoluteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(sitemapUrl ? { sitemap: sitemapUrl } : {}),
  };
}
