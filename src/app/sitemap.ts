import { env, getAbsoluteUrl } from "@/lib/env";
import { getAllProjects } from "@/lib/projects";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!env.siteUrl) {
    // Avoid publishing an unconfirmed or placeholder domain in production sitemaps.
    return [];
  }

  const publishedProjects = getAllProjects();

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((project) => ({
    url: getAbsoluteUrl(`/projects/${project.slug}`)!,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteUrl("/")!,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: getAbsoluteUrl("/portfolio")!,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl("/projects")!,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return [...staticRoutes, ...projectRoutes];
}
