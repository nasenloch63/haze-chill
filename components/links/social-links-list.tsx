import type { LucideIcon } from "lucide-react"
import { Camera, ExternalLink, Globe2, MapPin, Music2, Users, Utensils } from "lucide-react"

export type SocialLink = { label: string; href: string | null; icon: LucideIcon }

export const socialLinkIcons = { Instagram: Camera, Facebook: Users, TikTok: Music2, Website: Globe2, "Google Eintrag": MapPin, Speisekarte: Utensils }

function LinkButton({ link }: { link: SocialLink }) {
  const Icon = link.icon
  const classes = "group flex min-h-14 w-full items-center gap-4 rounded-xl border border-border bg-card px-5 py-3.5 text-left font-semibold text-card-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"

  if (!link.href) {
    return <span aria-disabled="true" title="Link folgt" className={`${classes} cursor-not-allowed opacity-45`}><Icon aria-hidden="true" className="size-5 text-primary" /><span className="flex-1">{link.label}</span><span className="font-mono text-xs text-muted-foreground">BALD</span></span>
  }

  return <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}><Icon aria-hidden="true" className="size-5 text-primary" /><span className="flex-1">{link.label}</span><ExternalLink aria-hidden="true" className="size-4 text-muted-foreground transition-colors group-hover:text-primary" /><span className="sr-only"> (öffnet in neuem Tab)</span></a>
}

export function SocialLinksList({ links }: { links: SocialLink[] }) {
  return <nav aria-label="Haze & Chill Links" className="flex w-full flex-col gap-3">{links.map((link) => <LinkButton key={link.label} link={link} />)}</nav>
}
