import type { Metadata } from "next"
import { MenuGallery } from "@/components/menu-gallery"
import { PageHero } from "@/components/sections"

export const metadata: Metadata = { title: "Speisekarte", description: "Unsere aktuelle Karte – direkt aus dem Haze & Chill Café." }

export default function MenuPage() {
  return <>
    <PageHero eyebrow="Speisekarte" title="Speisekarte" copy="Unsere aktuelle Karte – direkt aus dem Haze & Chill Café." />
    <section className="px-4 py-16 md:px-8"><div className="mx-auto max-w-7xl"><MenuGallery /></div></section>
  </>
}
