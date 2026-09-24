export type SocialMediaType = "image" | "video" | "carousel"

export type SocialPost = {
  id: string
  image: string
  videoUrl?: string
  permalink: string
  alt: string
  caption?: string
  mediaType: SocialMediaType
}

export const fallbackSocialPosts: SocialPost[] = Array.from({ length: 6 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0")
  return {
    id: `fallback-${number}`,
    image: `/images/social/post-${number}.jpg`,
    permalink: "https://www.instagram.com/haze_and_chill_cafe/",
    alt: `Einblick aus dem Haze & Chill Café – Beitrag ${index + 1}`,
    mediaType: "image" as const,
  }
})
