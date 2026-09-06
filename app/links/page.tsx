import Image from "next/image"
import Link from "next/link"
import { SocialApplicationDialog } from "@/components/links/social-application-dialog"
import { SocialLinksList, socialLinkIcons, type SocialLink } from "@/components/links/social-links-list"
import { linkUrls } from "@/data/links"

export default function LinksPage() {
  const links: SocialLink[] = [
    { label: "Instagram", href: linkUrls.instagram, icon: socialLinkIcons.Instagram },
    { label: "Facebook", href: linkUrls.facebook, icon: socialLinkIcons.Facebook },
    { label: "TikTok", href: linkUrls.tiktok, icon: socialLinkIcons.TikTok },
    { label: "Website", href: linkUrls.website, icon: socialLinkIcons.Website },
    { label: "Google Eintrag", href: linkUrls.google, icon: socialLinkIcons["Google Eintrag"] },
    { label: "Speisekarte", href: linkUrls.menu, icon: socialLinkIcons.Speisekarte },
  ]

  return <div className="min-h-dvh bg-background px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-foreground sm:px-6">
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-7">
      <header className="flex flex-col items-center gap-4 text-center">
        <div className="overflow-hidden rounded-full border border-primary/30 bg-card p-1 shadow-[0_0_42px_color-mix(in_oklab,var(--primary)_16%,transparent)]">
          <Image src="/images/haze-chill-logo.jpg" alt="Haze & Chill Café Logo" width={104} height={104} priority className="size-24 rounded-full object-cover" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-mono text-2xl font-semibold uppercase tracking-[0.12em] text-balance">Haze <span className="text-primary">&</span> Chill Café</h1>
          <p className="text-sm font-medium text-muted-foreground">Kassel · Café · Lounge · Good Vibes</p>
        </div>
      </header>

      <SocialLinksList links={links} />
      <SocialApplicationDialog />

      <footer className="flex flex-col items-center gap-3 pt-2 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Haze & Chill Café Kassel</p>
        <nav aria-label="Rechtliches" className="flex items-center gap-5"><Link href="/impressum" className="underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Impressum</Link><Link href="/datenschutz" className="underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Datenschutz</Link></nav>
      </footer>
    </div>
  </div>
}
