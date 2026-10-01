import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, priority: 1 },
    ...projects.map((project) => ({
      url: `${profile.siteUrl}/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
