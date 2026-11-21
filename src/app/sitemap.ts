import { getAllProjects } from "@/lib/projects";
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chiranjeev.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedProjects = getAllProjects();

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...projectRoutes];
}
