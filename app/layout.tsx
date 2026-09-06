import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google"
import { SiteShell } from "@/components/site-shell"
import { siteConfig } from "@/data/site-config"
import "./globals.css"

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-ibm-plex-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Haze & Chill Café | Kassel", template: "%s | Haze & Chill" },
  description: siteConfig.description,
  openGraph: { title: siteConfig.name, description: siteConfig.description, type: "website", locale: "de_DE", images: ["/images/haze-chill-logo.jpg"] },
}
export const viewport: Viewport = { themeColor: "#070807", colorScheme: "dark", width: "device-width", initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "CafeOrCoffeeShop", name: siteConfig.name, description: siteConfig.description, address: { "@type": "PostalAddress", streetAddress: siteConfig.address.street, postalCode: siteConfig.address.zip, addressLocality: siteConfig.address.city, addressCountry: "DE" }, url: siteConfig.url }
  return <html lang="de" className="bg-background"><body className={`${space.variable} ${mono.variable}`}><SiteShell>{children}</SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{process.env.NODE_ENV === "production" && <Analytics />}</body></html>
}
