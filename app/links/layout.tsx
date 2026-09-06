import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Links",
  description: "Alle wichtigen Links von Haze & Chill Café Kassel auf einen Blick.",
  robots: { index: true, follow: true },
}

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return children
}
