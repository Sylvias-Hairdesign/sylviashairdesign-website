# Sylvia's Hairdesign - Website Beheer & Handleiding

Welkom bij de nieuwe, moderne en **zero-maintenance** website voor kapsalon **Sylvia's Hairdesign** in Wezep!

Deze website is bewust gebouwd als statische webapplicatie zonder databases, zware plugins of WordPress-installaties. Hierdoor kan de website **nooit verouderen**, zijn er **geen beveiligingsupdates nodig**, laadt de pagina razendsnel op elk apparaat en zijn de hostingkosten **€ 0 per maand**.

---

## ✂️ Hoe pas ik een prijs aan? (In 1 minuut)

Alle prijzen staan overzichtelijk in het bestand `index.html`. Je kunt dit bestand openen met een willekeurige teksteditor (zoals Kladblok, VS Code of rechtstreeks in de GitHub web-editor door op het potlood-icoontje te klikken).

1. Open `index.html`.
2. Druk op `Ctrl + F` (zoeken) en zoek naar `[ONDERHOUD / PRIJZEN WIJZIGEN]` of typ de naam van de behandeling (bijvoorbeeld `Dames Knippen`).
3. Je ziet direct de regel met de prijs:
   ```html
   <span class="font-bold text-brand-700 text-base sm:text-lg whitespace-nowrap">€ 28,50</span>
   ```
4. Verander `€ 28,50` naar het nieuwe bedrag (bijv. `€ 29,50`).
5. Sla het bestand op (of commit de wijziging in GitHub). Binnen 30 seconden staat de nieuwe prijs live op de website!

---

## 🕒 Openingstijden of teksten wijzigen

- **Openingstijden tekst:** Zoek in `index.html` naar `id="openingstijden"` en pas de tijden aan in de tabel.
- **Real-time 'Nu Open' indicator:** De openingstijden voor de automatische live checker staan in `assets/js/main.js` bovenaan in het blok `salonSchedule`. Pas daar indien nodig de begin- of eindtijd in minuten aan.
- **Telefoonnummer:** Het telefoonnummer is ingesteld op `06 - 20 47 59 48` (`tel:0620475948`). Wil je dit ooit wijzigen? Zoek dan in `index.html` naar `0620475948` en vervang het overal.

---

## 📁 Bestandsstructuur

```
Sylvia's Hairdesign/
├── index.html              # De complete pagina (Hero, Over ons, Prijzen, Galerij, Contact, SEO)
├── assets/
│   ├── css/
│   │   └── styles.css      # Kleurenschema, animaties en styling
│   ├── js/
│   │   └── main.js         # Openingstijden checker, mobiel menu, lightbox galerij
│   └── images/
│       └── salon/          # Echte salonfoto's, Sylvia, Nelanda, styling & bruidskapsels
├── robots.txt              # Instructies voor zoekmachines
├── sitemap.xml             # Sitemap voor Google
├── DEPLOYMENT.md           # Handleiding voor gratis hosting & domeinkoppeling
└── README.md               # Deze handleiding
```

---

## 🚀 Live previewen op je computer

Je hebt geen speciale server nodig. Dubbelklik simpelweg op `index.html` in de Windows Verkenner om de website direct in Chrome, Edge of Firefox te openen!
