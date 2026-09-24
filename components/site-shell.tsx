"use client"

import { usePathname } from "next/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLinksPage = pathname === "/links"

  if (isLinksPage) return <main>{children}</main>

  return <><SiteHeader /><main>{children}</main><SiteFooter /></>
}
