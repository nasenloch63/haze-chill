import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="flex max-w-3xl flex-col gap-3"><p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</p><h2 className="text-balance text-4xl font-black tracking-tight md:text-6xl">{title}</h2>{copy && <p className="text-pretty text-base leading-7 text-muted-foreground md:text-lg">{copy}</p>}</div>
}

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="border-b border-border px-4 pb-16 pt-36 md:px-8 md:pb-24"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow={eyebrow} title={title} copy={copy} /></div></section>
}

export function RouteCta() {
  return <Button size="lg" nativeButton={false} render={<Link href="/standort" />}><ArrowUpRight data-icon="inline-end" />Route planen</Button>
}
