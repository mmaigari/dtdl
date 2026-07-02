import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/projects";

const BASE_URL = "https://www.dantatatown.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/projects",
    "/gallery",
    "/infrastructure",
    "/investors",
    "/careers",
    "/contact",
  ];

  const projectSlugs = getAllProjectSlugs();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
