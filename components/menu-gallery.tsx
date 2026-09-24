"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { siteConfig } from "@/data/site-config"

type MenuImage = (typeof siteConfig.menuImages)[number]

export function MenuGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)
  const isOpen = activeIndex !== null

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setActiveIndex((current) => current === null ? 0 : (current + siteConfig.menuImages.length - 1) % siteConfig.menuImages.length)
      if (event.key === "ArrowRight") setActiveIndex((current) => current === null ? 0 : (current + 1) % siteConfig.menuImages.length)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  function openImage(index: number) {
    setActiveIndex(index)
    setZoom(1)
  }

  function close() {
    setActiveIndex(null)
    setZoom(1)
  }

  const activeImage = activeIndex === null ? null : siteConfig.menuImages[activeIndex]

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {siteConfig.menuImages.map((image, index) => (
          <button key={image.src} type="button" onClick={() => openImage(index)} className="group overflow-hidden rounded-2xl border border-border bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label={`Speisekarte Seite ${index + 1} von 2 vergrößern`}>
            <div className="bg-background p-2 sm:p-4">
              <img src={image.src} alt={image.alt} className="block h-auto max-h-[75vh] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]" />
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground"><span>Seite {index + 1} von 2</span><Maximize2 className="size-4 text-primary" aria-hidden="true" /></div>
          </button>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
        <DialogContent showCloseButton={false} className="h-dvh w-screen max-w-none rounded-none border-0 bg-black/95 p-0 text-foreground shadow-none">
          <DialogTitle className="sr-only">Speisekarte Seite {activeIndex === null ? "" : activeIndex + 1} von 2</DialogTitle>
          <DialogDescription className="sr-only">Originalbild der aktuellen Haze & Chill Speisekarte. Mit den Pfeilen zwischen den Seiten wechseln.</DialogDescription>
          {activeImage && activeIndex !== null && <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4 pb-24 pt-20 sm:p-8 sm:pb-24">
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-full max-w-full object-contain transition-transform duration-200" style={{ transform: `scale(${zoom})` }} />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6"><span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-sm text-white">{activeIndex + 1} / 2</span><Button variant="outline" size="icon" onClick={close} className="border-white/30 bg-black/60 text-white hover:bg-white/15 hover:text-white" aria-label="Lightbox schließen"><X /></Button></div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-4 sm:p-6"><Button variant="outline" size="icon" onClick={() => setActiveIndex((activeIndex + 1) % 2)} className="border-white/30 bg-black/60 text-white hover:bg-white/15 hover:text-white" aria-label="Vorherige Menüseite"><ChevronLeft /></Button><Button variant="outline" size="icon" onClick={() => setZoom((current) => Math.max(1, current - 0.25))} className="border-white/30 bg-black/60 text-white hover:bg-white/15 hover:text-white" aria-label="Verkleinern"><Minus /></Button><Button variant="outline" size="icon" onClick={() => setZoom((current) => Math.min(3, current + 0.25))} className="border-white/30 bg-black/60 text-white hover:bg-white/15 hover:text-white" aria-label="Vergrößern"><Plus /></Button><Button variant="outline" size="icon" onClick={() => setActiveIndex((activeIndex + 1) % 2)} className="border-white/30 bg-black/60 text-white hover:bg-white/15 hover:text-white" aria-label="Nächste Menüseite"><ChevronRight /></Button></div>
          </div>}
        </DialogContent>
      </Dialog>
    </>
  )
}
