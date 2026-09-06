import "server-only"
import { fallbackSocialPosts, type SocialPost } from "@/data/social"

type InstagramMediaType = "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO" | "REELS"

type InstagramMedia = {
  id: string
  caption?: string
  media_type: InstagramMediaType
  media_url?: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
}

const GRAPH_API_VERSION = "v23.0"
const POST_LIMIT = 6

function shortCaption(caption?: string) {
  if (!caption) return undefined
  const firstLine = caption.split("\n")[0]?.trim()
  if (!firstLine) return undefined
  return firstLine.length > 140 ? `${firstLine.slice(0, 137)}…` : firstLine
}

function mapMedia(post: InstagramMedia): SocialPost | null {
  if (!post.permalink) return null
  const isMovingImage = post.media_type === "VIDEO" || post.media_type === "REELS"
  const image = isMovingImage ? post.thumbnail_url : post.media_url
  // Skip posts without a usable still image so the grid never renders a broken card.
  if (!image) return null
  return {
    id: post.id,
    image,
    videoUrl: isMovingImage ? post.media_url : undefined,
    permalink: post.permalink,
    alt: shortCaption(post.caption) ?? "Aktueller Instagram-Beitrag von Haze & Chill Café",
    caption: shortCaption(post.caption),
    mediaType: post.media_type === "CAROUSEL_ALBUM" ? "carousel" : isMovingImage ? "video" : "image",
  }
}

/**
 * Fetches the latest Instagram posts on the server. Credentials never leave the
 * server, and any failure or missing configuration falls back to the branded
 * placeholder cards so the homepage always renders.
 */
export async function getSocialPosts(): Promise<SocialPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
  const accountId = process.env.INSTAGRAM_USER_ID ?? process.env.INSTAGRAM_ACCOUNT_ID

  if (!accessToken || !accountId) return fallbackSocialPosts

  const endpoint = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(accountId)}/media`)
  endpoint.searchParams.set("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp")
  endpoint.searchParams.set("limit", String(POST_LIMIT))
  endpoint.searchParams.set("access_token", accessToken)

  try {
    const response = await fetch(endpoint, { next: { revalidate: 3600 } })
    if (!response.ok) return fallbackSocialPosts

    const payload = (await response.json()) as { data?: InstagramMedia[] }
    const posts = (payload.data ?? []).map(mapMedia).filter((post): post is SocialPost => post !== null).slice(0, POST_LIMIT)

    return posts.length ? posts : fallbackSocialPosts
  } catch {
    return fallbackSocialPosts
  }
}
