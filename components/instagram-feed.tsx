import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/sections"
import { SocialCard } from "@/components/social-card"
import { getSocialPosts } from "@/lib/instagram"
import { siteConfig } from "@/data/site-config"

export async function InstagramFeed() {
  const posts = (await getSocialPosts()).slice(0, 6)

  return (
    <section className="border-y border-border bg-card px-4 py-24 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <SectionHeading eyebrow="Socials" title="Aktuell bei Haze & Chill." copy="Events, neue Drinks, Einblicke aus der Lounge und alles, was bei uns gerade passiert." />
            <p className="font-mono text-sm text-primary">@haze_and_chill_cafe</p>
          </div>
          <Button variant="outline" nativeButton={false} render={<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" />}><Camera data-icon="inline-start" />Auf Instagram folgen</Button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3">{posts.map((post, index) => <SocialCard key={post.id} post={post} index={index} />)}</div>
      </div>
    </section>
  )
}
