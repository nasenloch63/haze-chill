"use client"

import Link from "next/link"
import { Camera, Menu, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { siteConfig } from "@/data/site-config"

export function SiteHeader() {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
    <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-8">
      <Link href="/" className="font-mono text-sm font-black uppercase tracking-[0.18em] text-foreground">Haze <span className="text-primary">&</span> Chill</Link>
      <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 md:flex">
        {siteConfig.nav.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{item.label}</Link>)}
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="ghost" size="icon" nativeButton={false} render={<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram öffnen" />}><Camera /></Button>
        <Button nativeButton={false} render={<a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" />}><MapPin data-icon="inline-start" />Route</Button>
      </div>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" size="icon" className="md:hidden" aria-label="Menü öffnen" />}><Menu /></SheetTrigger>
        <SheetContent side="right" className="bg-background">
          <SheetHeader><SheetTitle>Haze & Chill</SheetTitle><SheetDescription>Navigation</SheetDescription></SheetHeader>
          <nav className="flex flex-col gap-2 px-4" aria-label="Mobile Navigation">
            {siteConfig.nav.map((item) => <SheetClose key={item.href} render={<Link href={item.href} className="border-b border-border py-4 text-2xl font-bold" />}>{item.label}</SheetClose>)}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  </header>
}
