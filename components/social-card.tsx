"use client"

import { useCallback, useRef, useState } from "react"
import { Camera, Copy, Play } from "lucide-react"
import type { SocialPost } from "@/data/social"

export function SocialCard({ post, index }: { post: SocialPost; index: number }) {
  const [imageFailed, setImageFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasVideo = post.mediaType === "video" && Boolean(post.videoUrl) && !imageFailed

  const startVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [])

  const stopVideo = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
    setIsPlaying(false)
  }, [])

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram-Beitrag ${index + 1} von Haze & Chill ansehen`}
      className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onMouseEnter={hasVideo ? startVideo : undefined}
      onMouseLeave={hasVideo ? stopVideo : undefined}
      onFocus={hasVideo ? startVideo : undefined}
      onBlur={hasVideo ? stopVideo : undefined}
    >
      {!imageFailed ? (
        <>
          {/* Native img keeps remote Graph API hosts out of the Next.js image allowlist. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.alt}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
          />
          {hasVideo ? (
            <video
              ref={videoRef}
              src={post.videoUrl}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
            />
          ) : null}
        </>
      ) : (
        <span className="noise flex size-full flex-col items-center justify-center gap-4 bg-black p-6 text-center">
          <Camera className="size-8 text-primary" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Haze & Chill</span>
          <span className="text-sm text-muted-foreground">Neuer Einblick folgt</span>
        </span>
      )}

      {post.mediaType === "video" && !imageFailed ? (
        <span className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
          <Play className="size-4 fill-current" />
          <span className="sr-only">Video</span>
        </span>
      ) : null}

      {post.mediaType === "carousel" && !imageFailed ? (
        <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur">
          <Copy className="size-4" />
          <span className="sr-only">Mehrere Bilder</span>
        </span>
      ) : null}

      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-transparent to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <Camera className="size-4" />
          Auf Instagram ansehen
        </span>
      </span>
    </a>
  )
}
