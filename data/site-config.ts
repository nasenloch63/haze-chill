export const siteConfig = {
  name: "Haze & Chill Café",
  shortName: "Haze & Chill",
  description: "Drinks, Gaming und Terrasse in Kassel.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://haze-chill.com",
  address: {
    street: "Kölnische Straße 12",
    zip: "34117",
    city: "Kassel",
  },
  instagramUrl: "https://www.instagram.com/haze_and_chill_cafe/",
  tiktokUrl: "https://www.tiktok.com/@haze_and_chill_cafe?_r=1&_t=ZG-98sk1KC8i92",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=K%C3%B6lnische+Stra%C3%9Fe+12+34117+Kassel",
  reservationNotice: "Reservierungen über Instagram-DM",
  ageNotice: "Zutritt ab 18 Jahren",
  walkthroughVideoPath: "/videos/haze-walkthrough.mp4",
  naserSolutionsUrl: "https://www.naser-solutions.de",
  nav: [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menü" },
    { href: "/lounge", label: "Lounge" },
    { href: "/standort", label: "Standort" },
    { href: "/faq", label: "FAQ" },
  ],
  openingHours: [
    { days: "Sonntag–Donnerstag", hours: "17:00–02:00 Uhr" },
    { days: "Freitag–Samstag", hours: "17:00–03:00 Uhr" },
  ],
  menuImages: [
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-ED7B1510-t5sO2n1on3srW5mF0zbe2jQgW9XxLK.jpeg", alt: "Originale Haze & Chill Speisekarte, Seite 1 von 2" },
    { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-2FAE0A2A-i95MfFVa8NcUgJg2FWm67aI4IXhJbm.jpeg", alt: "Originale Haze & Chill Speisekarte, Seite 2 von 2" },
  ],
} as const

export const formattedAddress = `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`

export const faqItems = [
  ["Muss ich reservieren?", "Für normale Besuche ist keine Reservierung nötig. Bei größeren Gruppen empfehlen wir, vorab über Instagram anzufragen."],
  ["Gibt es alkoholfreie Optionen?", "Ja. Auf unserer Karte findest du Softdrinks, hausgemachten Eistee, Säfte, Kaffee, Shakes und alkoholfreie Cocktails."],
  ["Kann ich bei euch Fußball schauen?", "Wir zeigen ausgewählte Sportevents. Aktuelle Hinweise veröffentlichen wir auf Instagram."],
  ["Gibt es eine Terrasse?", "Ja, bei passendem Wetter kannst du deinen Besuch auch auf unserer Terrasse genießen."],
  ["Ab welchem Alter ist der Zutritt?", "Der Zutritt ist ab 18 Jahren. Bitte bring einen gültigen Lichtbildausweis mit."],
] as const
