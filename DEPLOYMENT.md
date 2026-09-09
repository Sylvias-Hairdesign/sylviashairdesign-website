# Handleiding: Gratis Hosting & Domeinkoppeling

Met deze statische architectuur kan de website **volledig gratis** gehost worden op een modern statisch hostingplatform met:
- Automatisch gratis SSL-certificaat (groen slotje / HTTPS)
- Wereldwijde CDN (laadtijd onder de 0,5 seconde)
- Automatische updates zodra je een wijziging naar GitHub pusht

Hieronder staan de 2 beste en eenvoudigste methoden.

---

## Optie 1: Cloudflare Pages (Sterk aanbevolen - 100% gratis en onbeperkte bandbreedte)

1. **Maak een gratis account** aan op [cloudflare.com](https://www.cloudflare.com/).
2. Ga in het dashboard naar **Workers & Pages** > **Create application** > tabblad **Pages**.
3. Kies **Connect to Git** en selecteer jouw GitHub-repository voor Sylvia's Hairdesign.
4. **Build settings:**
   - Framework preset: `None`
   - Build command: *(leeg laten)*
   - Build output directory: `.` *(of leeg laten, aangezien index.html in de hoofdmap staat)*
5. Klik op **Save and Deploy**. Binnen 20 seconden is je site live op een gratis `.pages.dev` subdomein!
6. **Eigen domein koppelen (sylviashairdesign.nl):**
   - Ga in Cloudflare Pages naar **Custom domains** > **Set up a custom domain**.
   - Vul in: `www.sylviashairdesign.nl` en `sylviashairdesign.nl`.
   - Cloudflare geeft je de exacte DNS CNAME-records die je bij je domeinprovider (bijvoorbeeld TransIP, Hostnet of Mijndomein) invult.
   - Het SSL-certificaat wordt automatisch binnen enkele minuten geactiveerd.

---

## Optie 2: Netlify (Drag & Drop of via GitHub)

1. Ga naar [netlify.com](https://www.netlify.com/) en log in met je GitHub account.
2. Klik op **Add new site** > **Import an existing project** > **GitHub**.
3. Selecteer deze repository en klik op **Deploy**.
4. **Eigen domein koppelen:**
   - Klik op **Domain settings** > **Add custom domain** en vul `sylviashairdesign.nl` in.
   - Pas de DNS-records aan bij je registrar zoals Netlify aangeeft.

---

## Optie 3: Vercel

1. Ga naar [vercel.com](https://vercel.com/) en log in met GitHub.
2. Klik op **Add New...** > **Project** en importeer de repository.
3. Klik direct op **Deploy**.
4. Koppel `sylviashairdesign.nl` via **Settings** > **Domains**.

---

## Tip: Oude Weebly / Frame doorverwijzing opheffen
De huidige `sylviashairdesign.nl` laadt nu een verborgen HTML-frame die doorlinkt naar een Weebly-subdomein. Zodra je de DNS CNAME koppelt aan Cloudflare Pages of Netlify, vervalt dit trage frame en laadt de nieuwe moderne site direct, snel en veilig!
