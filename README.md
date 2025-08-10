# PyPath Coach – Minimalistische PWA (React + Vite + TS + Tailwind)

Mobile-first Progressive Web App met een strakke UI voor een interactieve Python-leerervaring.
Dit is een **UI-first** prototype: de Run-knop simuleert output. In de volgende iteratie kunnen we **Pyodide** toevoegen om Python echt in de browser te draaien.

## Snel starten (lokaal)

```bash
npm install
npm run dev
```

Open vervolgens de dev-URL (meestal http://localhost:5173) op je telefoon of in je browser.

## Productie build

```bash
npm run build
npm run preview
```

## PWA
- `manifest.webmanifest` staat in `/public`
- `sw.js` is een heel simpele service worker voor een offline app shell
- Icons in `/public/icons`

## Deploy naar GitHub Pages

1. Push deze repo naar GitHub.
2. Zet in **Settings → Pages** de bron op **GitHub Actions** of **/docs** branch/dir.
3. Als je `/docs` wilt gebruiken, bouw lokaal en commit de output:
   ```bash
   npm run build
   mkdir -p docs
   cp -r dist/* docs/
   git add docs
   git commit -m "docs: deploy"
   git push
   ```
4. Wijs Pages naar de `docs/` map.

> Tip: Voor een schonere setup via Actions kun je later een CI-Workflow toevoegen.

## Volgende stappen (aanbevolen)
- Pyodide integratie voor echte Python-executie.
- Local storage van voortgang.
- Thema toggle en kleine haptics (bijv. vibratie op mobiele actie).
- Coach chat UI koppelen aan je AI-backend.
