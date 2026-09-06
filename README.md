# Haze & Chill Café

## Instagram-Feed aktivieren

1. Das Instagram-Konto muss als Professional Account eingerichtet sein.
2. Richte den Zugriff über Meta und die Instagram Graph API ein.
3. Hinterlege `INSTAGRAM_ACCESS_TOKEN` in den Vercel Environment Variables.
4. Hinterlege `INSTAGRAM_ACCOUNT_ID` in den Vercel Environment Variables.
5. Setze anschließend `enableInstagramApi` in `data/site-config.ts` auf `true`.
6. Ohne API-Zugang bleibt automatisch das sichere lokale Fallback-Grid aktiv.

Lokale Fallback-Bilder können unter `public/images/social/post-01.jpg` bis `post-06.jpg` ergänzt werden. Fehlen diese Dateien, zeigt die Website absichtlich gebrandete Neon-Platzhalter statt defekter Bilder.

## Walkthrough aktivieren

Lege das fertige Video unter `public/videos/haze-walkthrough.mp4` ab. Die Walkthrough-Komponente erkennt die Datei automatisch; ohne Video bleibt der Coming-soon-Zustand aktiv.
