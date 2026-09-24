import { siteConfig } from "@/data/site-config"

const normalizeUrl = (value: string | undefined, fallback?: string) => value?.trim() || fallback || null

export const linkUrls = {
  instagram: normalizeUrl(process.env.INSTAGRAM_URL, siteConfig.instagramUrl),
  facebook: normalizeUrl(process.env.FACEBOOK_URL),
  tiktok: normalizeUrl(process.env.TIKTOK_URL, siteConfig.tiktokUrl),
  website: normalizeUrl(process.env.WEBSITE_URL, siteConfig.url),
  google: normalizeUrl(process.env.GOOGLE_URL, siteConfig.mapsUrl),
  menu: normalizeUrl(process.env.MENU_URL, `${siteConfig.url}/menu`),
} as const
