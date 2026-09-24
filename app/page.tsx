import Image from "next/image"
import Link from "next/link"
import { Camera, Gamepad2, MapPin, Martini, Sun, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InstagramFeed } from "@/components/instagram-feed"
import { MenuGallery } from "@/components/menu-gallery"
import { ScrollWalkthrough } from "@/components/scroll-walkthrough"
import { SectionHeading } from "@/components/sections"
import { siteConfig } from "@/data/site-config"

const features = [
  { icon: Martini, title: "Drinks", copy: "Hausgemachter Eistee, Shakes, Kaffee, Cocktails und mehr." },
  { icon: Gamepad2, title: "Gaming", copy: "Entspannte Runden, gute Matches und Live-Sport an ausgewählten Abenden." },
  { icon: Sun, title: "Terrasse", copy: "Draußen chillen, wenn das Wetter in Kassel mitspielt." },
]

export default function HomePage() {
  return <>
    <section className="noise relative flex min-h-[94vh] items-end overflow-hidden border-b border-border px-4 pb-14 pt-32 md:px-8 md:pb-20">
      <Image src="/images/haze-chill-logo.jpg" alt="" width={1232} height={1268} priority className="absolute right-[-12%] top-[9%] w-[75vw] max-w-[760px] rounded-full opacity-20 mix-blend-screen md:opacity-30" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest text-primary"><span className="rounded-full border border-primary/40 px-3 py-2">Kassel</span><span className="rounded-full border border-border px-3 py-2 text-muted-foreground">KASSEL · DRINKS · GAMING · LOUNGE</span></div>
        <h1 className="max-w-5xl text-balance text-6xl font-black leading-[.9] tracking-[-.06em] md:text-8xl lg:text-[9rem]">Good drinks.<br/><span className="text-primary">Good vibes.</span><br/>Good people.</h1>
        <p className="max-w-xl text-pretty text-lg leading-7 text-muted-foreground">Dein Spot für entspannte Abende, starke Drinks und gemeinsame Momente mitten in Kassel.</p>
        <div className="flex flex-wrap gap-3"><Button size="lg" nativeButton={false} render={<Link href="/menu" />}>Menü entdecken</Button><Button size="lg" variant="outline" nativeButton={false} render={<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" />}><Camera data-icon="inline-start" />Aktuelles</Button></div>
      </div>
    </section>

    <ScrollWalkthrough />

    <section className="border-y border-border bg-card px-4 py-24 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-12"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHeading eyebrow="Speisekarte" title="Speisekarte" copy="Unsere aktuelle Karte – direkt aus dem Haze & Chill Café."/><Button variant="outline" nativeButton={false} render={<Link href="/menu" />}>Gesamtes Menü</Button></div><MenuGallery /></div></section>

    <InstagramFeed />

    <section className="px-4 py-24 md:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-12"><SectionHeading eyebrow="Das Erlebnis" title="Ankommen. Abschalten. Bleiben." copy="Kein steifes Konzept, sondern ein Ort für echte Abende: gute Gespräche, kleine Runden und genau die richtige Energie."/><div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">{features.map(({ icon: Icon, title, copy }) => <article key={title} className="flex min-h-64 flex-col justify-between gap-8 bg-card p-7"><Icon className="size-8 text-primary"/><div><h3 className="text-2xl font-bold">{title}</h3><p className="mt-3 leading-6 text-muted-foreground">{copy}</p></div></article>)}</div></div></section>

    <section className="px-4 py-24 md:px-8"><div className="mx-auto max-w-7xl"><div className="lime-shadow flex min-h-96 flex-col justify-end rounded-3xl border border-primary/30 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_50%)] p-8 md:p-12"><Users className="size-10 text-primary"/><h2 className="mt-24 text-5xl font-black tracking-tight md:text-7xl">Dein Abend.<br/>Dein Spot.</h2><p className="mt-4 max-w-lg text-muted-foreground">Von der ersten Runde bis zum letzten Song: Haze & Chill ist gemacht für gemeinsame Zeit.</p></div></div></section>

    <section className="px-4 py-24 md:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr]"><div><SectionHeading eyebrow="Standort" title="Mitten in Kassel." copy={`${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`}/><Button className="mt-8" nativeButton={false} render={<a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" />}><MapPin data-icon="inline-start" />Route öffnen</Button></div><div className="flex flex-col justify-between gap-12 rounded-3xl border border-border bg-card p-8"><div><p className="font-mono text-xs uppercase tracking-widest text-primary">Öffnungszeiten</p><div className="mt-6 flex flex-col gap-4">{siteConfig.openingHours.map(({ days, hours }) => <div key={days} className="flex justify-between gap-4 border-b border-border pb-4 text-sm"><span>{days}</span><span className="font-mono text-muted-foreground">{hours}</span></div>)}</div></div><div className="flex flex-col gap-2 text-sm text-muted-foreground"><p>{siteConfig.reservationNotice}</p><p>{siteConfig.ageNotice}</p></div></div></div></section>
  </>
}
