"use client"

import { FormEvent, useRef, useState } from "react"
import { AlertCircle, Sparkles } from "lucide-react"
import { submitSocialApplication, type ApplicationResult } from "@/app/links/actions"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const initialResult: ApplicationResult = { success: false, message: "" }
const introductionMin = 20
const introductionMax = 500

type FieldName = "instagram" | "introduction" | "consent"
type TouchedState = Record<FieldName, boolean>
type FieldErrors = Partial<Record<FieldName, string>>
const untouched: TouchedState = { instagram: false, introduction: false, consent: false }

function validateFields(instagram: string, introduction: string, consent: boolean): FieldErrors {
  const errors: FieldErrors = {}
  const trimmedInstagram = instagram.trim()
  const trimmedIntroduction = introduction.trim()
  if (trimmedInstagram.length < 2) errors.instagram = "Bitte gib deinen Instagram-Namen ein."
  else if (trimmedInstagram.length > 60) errors.instagram = "Der Instagram-Name ist zu lang."
  else if (!/^@?[a-zA-Z0-9._]+$/.test(trimmedInstagram)) errors.instagram = "Bitte gib einen gültigen Instagram-Namen ein."
  if (trimmedIntroduction.length < introductionMin) errors.introduction = "Deine Vorstellung muss mindestens 20 Zeichen lang sein."
  else if (trimmedIntroduction.length > introductionMax) errors.introduction = "Deine Vorstellung darf maximal 500 Zeichen lang sein."
  if (!consent) errors.consent = "Bitte bestätige die Einwilligung."
  return errors
}

export function SocialApplicationDialog() {
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const [instagram, setInstagram] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [consent, setConsent] = useState(false)
  const [touched, setTouched] = useState<TouchedState>(untouched)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(initialResult)
  const [successMessage, setSuccessMessage] = useState("")
  const instagramRef = useRef<HTMLInputElement>(null)
  const introductionRef = useRef<HTMLTextAreaElement>(null)
  const fieldErrors = validateFields(instagram, introduction, consent)
  const visibleErrors: FieldErrors = {
    instagram: (touched.instagram || submitted) ? fieldErrors.instagram : undefined,
    introduction: (touched.introduction || submitted) ? fieldErrors.introduction : undefined,
    consent: (touched.consent || submitted) ? fieldErrors.consent : undefined,
  }
  const serverMessage = result.message && !result.fieldErrors ? result.message : ""

  function clearServerState() {
    if (result.message || result.fieldErrors) setResult(initialResult)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setSubmitted(true)
    setResult(initialResult)
    const errors = validateFields(instagram, introduction, consent)
    if (errors.instagram || errors.introduction || errors.consent) {
      if (errors.instagram) instagramRef.current?.focus()
      else if (errors.introduction) introductionRef.current?.focus()
      else document.getElementById("consent")?.focus()
      return
    }
    setPending(true)
    const form = event.currentTarget
    const response = await submitSocialApplication(new FormData(form))
    setPending(false)
    if (response.success) {
      setSuccessMessage(response.message)
      setOpen(false)
      setInstagram("")
      setIntroduction("")
      setConsent(false)
      setTouched(untouched)
      setSubmitted(false)
      form.reset()
      return
    }
    setResult(response)
    if (response.fieldErrors) {
      setTouched({ instagram: true, introduction: true, consent: true })
      if (response.fieldErrors.instagram) instagramRef.current?.focus()
      else if (response.fieldErrors.introduction) introductionRef.current?.focus()
      else if (response.fieldErrors.consent) document.getElementById("consent")?.focus()
    }
  }

  return <section aria-labelledby="application-heading" className="flex w-full flex-col gap-3">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="min-h-16 w-full rounded-xl text-base font-bold shadow-[0_0_28px_color-mix(in_oklab,var(--primary)_20%,transparent)]" />}>
        <Sparkles data-icon="inline-start" />Werde Teil unseres nächsten Reels
      </DialogTrigger>
      <p id="application-heading" className="text-center text-sm text-muted-foreground">Bewirb dich für einen Social-Media-Post.</p>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto border-primary/25 bg-popover p-5 sm:max-w-lg sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-balance text-xl font-bold">Werde Teil unseres nächsten Posts</DialogTitle>
          <DialogDescription className="text-pretty leading-6">Du hast Lust, in einem kommenden Reel, TikTok oder Post von Haze & Chill dabei zu sein? Stell dich kurz vor – wir melden uns bei dir über Instagram.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <FieldGroup>
            <Field data-invalid={Boolean(visibleErrors.instagram)} className="data-[invalid=true]:text-foreground">
              <FieldLabel htmlFor="instagram">Dein Instagram-Name</FieldLabel>
              <Input ref={instagramRef} id="instagram" name="instagram" placeholder="@deinname" autoComplete="off" value={instagram} onChange={(event) => { setInstagram(event.target.value); clearServerState() }} onBlur={() => setTouched((current) => ({ ...current, instagram: true }))} required maxLength={60} disabled={pending} aria-invalid={Boolean(visibleErrors.instagram)} aria-describedby={visibleErrors.instagram ? "instagram-error" : undefined} />
              <FieldError id="instagram-error" className="text-xs text-destructive/80">{visibleErrors.instagram}</FieldError>
            </Field>
            <Field data-invalid={Boolean(visibleErrors.introduction)} className="data-[invalid=true]:text-foreground">
              <div className="flex items-center justify-between gap-4"><FieldLabel htmlFor="introduction">Erzähl uns kurz etwas über dich</FieldLabel><span className={cn("font-mono text-xs text-muted-foreground transition-colors", introduction.length >= 450 && introduction.length <= introductionMax && "text-primary", visibleErrors.introduction && "text-destructive/80")} aria-live="polite">{introduction.length}/{introductionMax}</span></div>
              <Textarea ref={introductionRef} id="introduction" name="introduction" placeholder="Warum möchtest du bei unserem nächsten Content dabei sein?" value={introduction} onChange={(event) => { setIntroduction(event.target.value); clearServerState() }} onBlur={() => setTouched((current) => ({ ...current, introduction: true }))} minLength={introductionMin} required disabled={pending} aria-invalid={Boolean(visibleErrors.introduction)} aria-describedby={visibleErrors.introduction ? "introduction-error" : "introduction-help"} className="min-h-32 resize-y aria-invalid:border-destructive/45 aria-invalid:ring-1 aria-invalid:ring-destructive/10 dark:aria-invalid:border-destructive/45 dark:aria-invalid:ring-destructive/10" />
              {!visibleErrors.introduction && <p id="introduction-help" className="text-xs leading-5 text-muted-foreground">Mindestens 20, maximal 500 Zeichen.</p>}
              <FieldError id="introduction-error" className="text-xs text-destructive/80">{visibleErrors.introduction}</FieldError>
            </Field>
            <Field orientation="horizontal" data-invalid={Boolean(visibleErrors.consent)} className="data-[invalid=true]:text-foreground">
              <Checkbox id="consent" checked={consent} onCheckedChange={(checked) => { setConsent(checked === true); setTouched((current) => ({ ...current, consent: true })); clearServerState() }} disabled={pending} aria-invalid={Boolean(visibleErrors.consent)} aria-describedby={visibleErrors.consent ? "consent-error" : undefined} />
              <input type="hidden" name="consent" value={consent ? "on" : ""} />
              <FieldContent><FieldLabel htmlFor="consent" className="cursor-pointer text-sm font-normal leading-5">Ich bin damit einverstanden, dass Haze & Chill meine Angaben nutzt, um mich bezüglich dieser Bewerbung über Instagram zu kontaktieren.</FieldLabel><FieldError id="consent-error" className="text-xs text-destructive/80">{visibleErrors.consent}</FieldError></FieldContent>
            </Field>
          </FieldGroup>
          <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
          {serverMessage && <Alert variant="destructive" className="border-destructive/25 bg-destructive/5 px-3 py-3"><AlertCircle /><AlertDescription>{serverMessage}</AlertDescription></Alert>}
          <Button type="submit" className="min-h-12 w-full" disabled={pending}>{pending && <Spinner data-icon="inline-start" />} {pending ? "Wird gesendet …" : "Bewerbung senden"}</Button>
        </form>
      </DialogContent>
    </Dialog>
    {successMessage && <p role="status" className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center text-sm leading-6 text-foreground">{successMessage}</p>}
  </section>
}
