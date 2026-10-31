# Contractor PNG · εταιρικό site

Το δημόσιο site της Contractor PNG (συντήρηση, επισκευή και αναβάθμιση κτιρίων), στο **contractorpng.gr**.
Χτίζεται με [Astro](https://astro.build) σε στατικές σελίδες και δημοσιεύεται στο GitHub Pages. Είναι τελείως χωριστό από την εφαρμογή (`app.contractorpng.gr`, repo `chrissaraf/contractorpng`).

## Σελίδες
| Διεύθυνση | Αρχείο |
|---|---|
| `/` | `src/pages/index.astro` |
| `/ypiresies/` | `src/pages/ypiresies/index.astro` |
| `/ypiresies/<υπηρεσία>/` (6 σελίδες) | `src/pages/ypiresies/[slug].astro` |
| `/erga/` | `src/pages/erga.astro` |
| `/etaireia/` | `src/pages/etaireia.astro` |
| `/epikoinonia/` | `src/pages/epikoinonia.astro` |

## Πού αλλάζουν τα κείμενα
- `src/data/site.ts`: στοιχεία εταιρείας, μενού, αριθμοί, περιοχές, διαδικασία, συχνές ερωτήσεις, και ο διακόπτης `demo`.
- `src/data/services.ts`: οι 6 υπηρεσίες με όλα τα κείμενα της σελίδας τους.
- `src/data/projects.ts`: τα έργα. Κάθε έργο δείχνει σε ποιες υπηρεσίες ανήκει και εμφανίζεται και στη σελίδα τους.
- Εμφάνιση: `src/styles/global.css`. Λογότυπα και εικονίδια: `public/assets/`.

## Τοπικά
```
npm install
npm run dev      # http://localhost:4321
npm run build    # βγάζει το site στο dist/
```

## Δημοσίευση
Κάθε merge στο `main` τρέχει το `.github/workflows/deploy.yml`, που χτίζει και δημοσιεύει. Στις ρυθμίσεις του repo: Settings → Pages → Source = **GitHub Actions**. Το domain βρίσκεται στο `public/CNAME`.

## Κανόνες
1. Όνομα πάντα «Contractor PNG», χωρίς «Ο.Ε.».
2. Ελληνικά κεφαλαία **χωρίς τόνους**. Το `lang="el"` και το `src/scripts/caps.ts` μένουν.
3. Δεν επινοούμε αριθμούς, έργα, πιστοποιήσεις ή κριτικές. Ό,τι λείπει γράφεται σε `[αγκύλες]` ή μένει κρυφό.
4. Στα έργα μόνο περιοχή και χρονιά: ποτέ ονόματα πελατών, διευθύνσεις, ποσά ή φωτογραφίες σπιτιών πελατών.
5. Ημερομηνίες 27/10/2026, ώρες 17:30.
6. Κινητό: πεδία 16px, κουμπιά τουλάχιστον 44px, καμία οριζόντια κύλιση.
7. Κείμενα από το ChatGPT ανά ενότητα: [HERO], [SERVICES], [PROJECTS], [PROCESS], [COMPANY], [FAQ], [CONTACT], [SEO], [ΠΡΟΤΑΣΗ].

## Πριν από την κανονική δημοσίευση (τώρα: ΔΕΙΓΜΑ)
- Στο `src/data/site.ts`: `demo: false` (φεύγουν η μπάρα ΔΕΙΓΜΑ και το noindex) και τα πραγματικά στοιχεία στο `contact`.
- `public/robots.txt`: `Allow: /` και `Sitemap: https://contractorpng.gr/sitemap-index.xml`.
- Η φόρμα να στέλνει email (π.χ. Formspree) στο `src/pages/epikoinonia.astro`.
