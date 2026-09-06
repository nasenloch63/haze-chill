"use client"

import type React from "react"
import { useRef, useState } from "react"
import MuxPlayer from "@mux/mux-player-react"
import { Play } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const playbackId = process.env.NEXT_PUBLIC_WALKTHROUGH_PLAYBACK_ID

export function ScrollWalkthrough() {
  const [open, setOpen] = useState(false)
  const playerRef = useRef<React.ElementRef<typeof MuxPlayer>>(null)

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      playerRef.current?.pause()
      if (playerRef.current) playerRef.current.currentTime = 0
    }
    setOpen(nextOpen)
  }

  return (
    <section className="px-4 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger className="noise group flex aspect-[4/5] w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl border border-primary/30 bg-black p-8 text-center text-foreground transition-shadow hover:shadow-[0_0_45px_color-mix(in_srgb,var(--primary)_18%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:aspect-video">
            <span className="flex size-16 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground transition-transform group-hover:scale-105"><Play className="ml-1 size-6 fill-current" /></span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-primary">Haze & Chill Walkthrough</span>
            <span className="text-balance text-4xl font-black tracking-tight md:text-6xl">Komm rein. Schau dich um.</span>
            <span className="max-w-xl text-pretty leading-7 text-muted-foreground">Erlebe Haze & Chill in einem Rundgang aus deiner Perspektive.</span>
            <span className="rounded-full border border-primary/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">Walkthrough ansehen</span>
          </DialogTrigger>
          <DialogContent showCloseButton className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md items-center justify-center overflow-hidden border-primary/20 bg-black/95 p-2 shadow-2xl backdrop-blur-xl sm:p-3">
            <DialogTitle className="sr-only">Haze & Chill Walkthrough</DialogTitle>
            <DialogDescription className="sr-only">Virtueller Rundgang durch das Haze & Chill Café.</DialogDescription>
            {open && playbackId ? (
              <MuxPlayer
                ref={playerRef}
                playbackId={playbackId}
                autoPlay
                playsInline
                accentColor="var(--primary)"
                className="aspect-[9/16] max-h-[calc(100dvh-4rem)] w-auto max-w-full overflow-hidden rounded-xl bg-black"
                metadata={{ video_title: "Haze & Chill Walkthrough" }}
              />
            ) : (
              <div className="noise flex aspect-[9/16] max-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center gap-4 rounded-xl border border-border px-6 text-center">
                <Play className="size-12 text-primary" />
                <p className="text-balance text-2xl font-black tracking-tight">Walkthrough nicht verfügbar.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
