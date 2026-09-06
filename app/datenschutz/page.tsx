import type { Metadata } from "next"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PageHero } from "@/components/sections"
export const metadata: Metadata = { title: "Datenschutz", robots: { index: false } }
export default function DatenschutzPage(){return <><PageHero eyebrow="Rechtliches" title="Datenschutz" copy="Informationen zur Datenverarbeitung"/><section className="px-4 py-16 md:px-8"><div className="mx-auto max-w-3xl"><Alert variant="destructive"><AlertTriangle/><AlertTitle>Rechtliche Prüfung erforderlich</AlertTitle><AlertDescription>Die vollständige Datenschutzerklärung muss vor dem Launch passend zu Hosting, Analytics, eingebetteten Diensten und Kontaktwegen ergänzt und juristisch geprüft werden.</AlertDescription></Alert></div></section></>}
