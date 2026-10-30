# Contractor PNG · εταιρικό site

Το δημόσιο site της Contractor PNG (συντήρηση, επισκευή και αναβάθμιση κτιρίων), στο **contractorpng.gr**.
Στατικό HTML/CSS/JS χωρίς build. Είναι τελείως χωριστό από την εφαρμογή (`app.contractorpng.gr`, repo `chrissaraf/contractorpng`).

## Αρχεία
- `index.html`: όλη η σελίδα.
- `404.html`: σελίδα «δεν βρέθηκε».
- `assets/`: λογότυπα (`logo-original.png`, `logo-white.png` για σκούρο φόντο, `mark-*.png` μόνο το σπίτι για την κεφαλίδα), `favicon.png`, `icon-180.png`.
- `CNAME`: το domain για το GitHub Pages.
- `robots.txt`, `sitemap.xml`.

## Κανόνες
1. Όνομα πάντα «Contractor PNG», χωρίς «Ο.Ε.».
2. Ελληνικά κεφαλαία **χωρίς τόνους**. Το `lang="el"` και το μικρό script στο τέλος του `index.html` μένουν.
3. Δεν επινοούμε αριθμούς, έργα, πιστοποιήσεις ή κριτικές. Ό,τι λείπει γράφεται σε `[αγκύλες]` ή μένει κρυφό.
4. Ημερομηνίες 27/10/2026, ώρες 17:30.
5. Κινητό: πεδία 16px, κουμπιά τουλάχιστον 44px, καμία οριζόντια κύλιση.
6. Κείμενα από το ChatGPT ανά ενότητα: [HERO], [SERVICES], [PROJECTS], [PROCESS], [COMPANY], [FAQ], [CONTACT], [SEO], [ΠΡΟΤΑΣΗ].

## Ροή αλλαγών
Ένα PR ανά θέμα, προεπισκόπηση πριν από το merge, ο Χρήστος κάνει merge, το GitHub Pages δημοσιεύει τον κλάδο `main`.

## Πριν από την κανονική δημοσίευση (τώρα: ΔΕΙΓΜΑ)
- Να φύγουν η μπάρα `.demo-bar` και το `<meta name="robots" content="noindex, nofollow">`.
- `robots.txt`: `Allow: /` και `Sitemap: https://contractorpng.gr/sitemap.xml`.
- Να μπουν τα πραγματικά στοιχεία στις `[αγκύλες]` και στο schema.org (διεύθυνση, τηλέφωνο).
- Η φόρμα να στέλνει email (π.χ. Formspree).
