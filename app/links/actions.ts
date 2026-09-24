"use server"

import nodemailer from "nodemailer"
import { z } from "zod"

const FIXED_RECIPIENT = "info@naser-solutions.de"
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 3
const attempts = new Map<string, number[]>()

const applicationSchema = z.object({
  instagram: z.string().trim().min(2, "Bitte gib deinen Instagram-Namen ein.").max(60, "Der Instagram-Name ist zu lang.").regex(/^@?[a-zA-Z0-9._]+$/, "Bitte gib einen gültigen Instagram-Namen ein."),
  introduction: z.string().trim().min(20, "Deine Vorstellung muss mindestens 20 Zeichen lang sein.").max(500, "Deine Vorstellung darf maximal 500 Zeichen lang sein."),
  consent: z.literal("on", { error: "Bitte bestätige die Einwilligung." }),
  website: z.string().max(0),
})

export type ApplicationResult = {
  success: boolean
  message: string
  fieldErrors?: Record<string, string[] | undefined>
}

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= MAX_ATTEMPTS) return true
  attempts.set(key, [...recent, now])
  return false
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]!)
}

export async function submitSocialApplication(formData: FormData): Promise<ApplicationResult> {
  const parsed = applicationSchema.safeParse({
    instagram: formData.get("instagram"),
    introduction: formData.get("introduction"),
    consent: formData.get("consent"),
    website: formData.get("website") ?? "",
  })

  if (!parsed.success) {
    return { success: false, message: "Bitte prüfe deine Angaben.", fieldErrors: parsed.error.flatten().fieldErrors }
  }

  const { instagram, introduction } = parsed.data
  const key = instagram.toLowerCase()
  if (isRateLimited(key)) return { success: false, message: "Zu viele Versuche. Bitte probiere es später erneut." }

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE === "true"
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const recipient = process.env.APPLICATION_RECIPIENT_EMAIL

  if (host !== "smtp.strato.de" || port !== 465 || !secure || user !== FIXED_RECIPIENT || !pass || recipient !== FIXED_RECIPIENT) {
    return { success: false, message: "Der Versand ist aktuell nicht verfügbar. Bitte versuche es später erneut." }
  }

  try {
    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } })
    const timestamp = new Intl.DateTimeFormat("de-DE", { dateStyle: "full", timeStyle: "long", timeZone: "Europe/Berlin" }).format(new Date())
    await transporter.sendMail({
      from: `Haze & Chill Café <${user}>`,
      to: FIXED_RECIPIENT,
      replyTo: user,
      subject: "Neue Haze & Chill Social-Media-Bewerbung",
      text: `Instagram-Username: ${instagram}\n\nVorstellung:\n${introduction}\n\nZeitpunkt: ${timestamp}\n\nKontaktaufnahme soll über Instagram erfolgen.`,
      html: `<h1>Neue Social-Media-Bewerbung</h1><p><strong>Instagram-Username:</strong> ${escapeHtml(instagram)}</p><p><strong>Vorstellung:</strong></p><p>${escapeHtml(introduction).replace(/\n/g, "<br>")}</p><p><strong>Zeitpunkt:</strong> ${escapeHtml(timestamp)}</p><p>Die Kontaktaufnahme soll über Instagram erfolgen.</p>`,
    })
    return { success: true, message: "Danke! Wir schauen uns deine Bewerbung an und melden uns bei dir auf Instagram." }
  } catch {
    return { success: false, message: "Die Bewerbung konnte nicht gesendet werden. Bitte versuche es später erneut." }
  }
}
