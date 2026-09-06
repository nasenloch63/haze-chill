import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageHero } from "@/components/sections"
import { faqItems } from "@/data/site-config"
export const metadata: Metadata = { title: "FAQ", description: "Häufige Fragen rund um deinen Besuch bei Haze & Chill." }
export default function FaqPage(){return <><PageHero eyebrow="Good to know" title="Fragen? Antworten." copy="Alles Wichtige für einen entspannten Besuch."/><section className="px-4 py-20 md:px-8"><div className="mx-auto max-w-4xl"><Accordion defaultValue={["faq-0"]} className="border-t border-border">{faqItems.map(([question,answer],index)=><AccordionItem key={question} value={`faq-${index}`} className="border-b border-border"><AccordionTrigger className="py-6 text-left text-lg font-bold">{question}</AccordionTrigger><AccordionContent className="pb-6 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section></>}
