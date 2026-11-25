import { getAllProjects } from "@/lib/projects";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");

  const publishedProjects = getAllProjects();

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return [...staticRoutes, ...projectRoutes];
}
