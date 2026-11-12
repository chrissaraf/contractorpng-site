// «Πριν και μετά» από την εφαρμογή (12/11/2026): πριν από κάθε build παίρνει τα ζευγάρια που ενέκρινε ο Χρήστος ένα-ένα
// μέσα στην εφαρμογή (Έργο → Έγγραφα → «Πριν και μετά για το site»). Η εφαρμογή δίνει μόνο λεζάντα, χρονιά και φωτογραφίες
// χωρίς EXIF· ποτέ όνομα πελάτη ή διεύθυνση. Οι φωτογραφίες κατεβαίνουν στο public/erga-foto/, ώστε το site να μην εξαρτάται από την εφαρμογή.
// Αν η εφαρμογή δεν απαντά, το build συνεχίζει με όσα υπήρχαν (ή χωρίς ενότητα «Πριν και μετά»). Δεν μπαίνει τίποτα στο git.
import fs from 'node:fs';
import path from 'node:path';

const APP = (process.env.APP_URL || 'https://app.contractorpng.gr').replace(/\/$/, '');
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(root, 'public', 'erga-foto'), DATA = path.join(root, 'src', 'data', 'gallery.json');
const ID = /^[a-f0-9]{16}$/;

async function get(url, ms = 15000) {
  const ac = new AbortController(), t = setTimeout(() => ac.abort(), ms);
  try { const r = await fetch(url, { signal: ac.signal }); if (!r.ok) throw new Error('HTTP ' + r.status); return r; } finally { clearTimeout(t); }
}
const keep = () => { if (!fs.existsSync(DATA)) fs.writeFileSync(DATA, '[]\n'); };

try {
  if (process.env.NO_GALLERY === '1') { keep(); console.log('Πριν/μετά: παραλείπεται (NO_GALLERY=1)'); process.exit(0); }
  const j = await (await get(APP + '/site/erga.json')).json();
  const items = (Array.isArray(j.items) ? j.items : []).filter(x => x && x.b && x.a && ID.test(x.b.id) && ID.test(x.a.id) && typeof x.cap === 'string').slice(0, 60);
  fs.mkdirSync(OUT, { recursive: true });
  const out = [];
  for (const x of items) {
    const ph = {};
    for (const k of ['b', 'a']) {
      const f = path.join(OUT, x[k].id + '.jpg');
      if (!fs.existsSync(f)) {
        const buf = Buffer.from(await (await get(APP + '/site/ph/' + x[k].id + '.jpg')).arrayBuffer());
        if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('δεν είναι JPEG: ' + x[k].id);
        fs.writeFileSync(f, buf);
      }
      ph[k] = { src: '/erga-foto/' + x[k].id + '.jpg', w: +x[k].w || 1600, h: +x[k].h || 1200 };
    }
    out.push({ id: String(x.id).slice(0, 40), cap: x.cap.slice(0, 160), year: Number.isInteger(x.year) ? x.year : null, ...ph });
  }
  // όσα αφαιρέθηκαν από την εφαρμογή φεύγουν και από εδώ
  const want = new Set(out.flatMap(x => [x.b.src, x.a.src].map(s => path.basename(s))));
  for (const f of fs.readdirSync(OUT)) if (!want.has(f)) fs.rmSync(path.join(OUT, f));
  fs.writeFileSync(DATA, JSON.stringify(out, null, 2) + '\n');
  console.log('Πριν/μετά: ' + out.length + ' ζευγάρια από ' + APP);
} catch (e) {
  keep();
  console.warn('Πριν/μετά: η εφαρμογή δεν απάντησε (' + e.message + '). Συνεχίζω χωρίς νέα.');
}
