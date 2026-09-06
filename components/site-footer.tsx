import Link from "next/link"
import { Camera, Clock3, MapPin, Music2 } from "lucide-react"
import { siteConfig } from "@/data/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-lg font-black uppercase tracking-[0.16em]">Haze <span className="text-primary">&</span> Chill</p>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">Good drinks. Good vibes. Good people. Dein Treffpunkt für lange Abende mitten in Kassel.</p>
          <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-primary">haze-chill.com</a>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <p className="flex items-center gap-2 font-semibold text-primary"><MapPin className="size-4" />Standort</p>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1 text-muted-foreground transition-colors hover:text-foreground"><span>{siteConfig.address.street}</span><span>{siteConfig.address.zip} {siteConfig.address.city}</span></a>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <p className="flex items-center gap-2 font-semibold text-primary"><Clock3 className="size-4" />Öffnungszeiten</p>
          <div className="flex flex-col gap-3">{siteConfig.openingHours.map(({ days, hours }) => <p key={days} className="flex flex-col gap-1 text-muted-foreground"><span className="text-foreground">{days}</span><span>{hours}</span></p>)}</div>
          <div className="flex flex-col gap-1 text-muted-foreground"><p>{siteConfig.reservationNotice}</p><p>{siteConfig.ageNotice}</p></div>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <p className="font-semibold text-primary">Socials</p>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"><Camera className="size-4" />Instagram</a>
          <a href={siteConfig.tiktokUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"><Music2 className="size-4" />TikTok</a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/impressum" className="hover:text-foreground">Impressum</Link><Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link></div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5"><p>© {new Date().getFullYear()} Haze & Chill Café</p><a href={siteConfig.naserSolutionsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">Website by Naser Solutions</a></div>
        </div>
      </div>
    </footer>
  )
}
