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
- Εμφάνιση: `src/styles/global.css`.
- Λογότυπο: `public/assets/mark.svg` (το σπίτι σε διάνυσμα, στην κεφαλίδα και στην εικόνα κοινοποίησης). Από αυτό βγαίνουν `favicon.svg/png`, `icon-180.png`, `icon-512.png`, `logo-512.png` και `og-image.png` (πηγή: `design/og-image.html`). Το `logo-original.png` είναι το αρχικό σε μικρή ανάλυση.

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

## Φόρμα επικοινωνίας
Η φόρμα στέλνει μέσω του δωρεάν FormSubmit στο email της εταιρείας (`src/data/site.ts`). Την πρώτη φορά το FormSubmit στέλνει email ενεργοποίησης: πατάμε «Activate» και από εκεί και πέρα τα αιτήματα έρχονται κανονικά. Μετά την αποστολή ο επισκέπτης βλέπει τη σελίδα `/epikoinonia/stalthike/`.

## Εμφάνιση
Μόνο φωτεινό θέμα, ακόμα κι αν η συσκευή είναι σε σκούρα λειτουργία.
