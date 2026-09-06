import type { MetadataRoute } from "next"
import { siteConfig } from "@/data/site-config"
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/menu", "/lounge", "/standort", "/faq"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : .8 })) }
