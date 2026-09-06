import type { Metadata } from "next"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHero } from "@/components/sections"
export const metadata: Metadata = { title: "Impressum", robots: { index: false } }
export default function ImpressumPage(){return <><PageHero eyebrow="Rechtliches" title="Impressum" copy="Anbieterkennzeichnung"/><section className="px-4 py-16 md:px-8"><div className="mx-auto max-w-3xl"><Alert variant="destructive"><AlertTriangle/><AlertTitle>Vor Veröffentlichung ergänzen</AlertTitle><AlertDescription>Diese Seite ist ein deutlich markierter Platzhalter. Unternehmensname, vertretungsberechtigte Person, Kontakt- und Registerangaben müssen rechtlich geprüft und ergänzt werden.</AlertDescription></Alert></div></section></>}
