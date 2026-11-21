// Έλεγχος του έτοιμου site (dist/) μετά το build, στο CI:
// 1. κάθε εσωτερικός σύνδεσμος (href/src) δείχνει σε αρχείο που υπάρχει, και κάθε #άγκυρα σε id της σελίδας,
// 2. κανένα κείμενο-κενό σε [αγκύλες] δεν φαίνεται στους επισκέπτες (όσο το demo είναι false).
// Χωρίς εξαρτήσεις: διαβάζει το HTML με απλές κανονικές εκφράσεις, αρκετό για το δικό μας, στατικό HTML.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE_HOST = 'contractorpng.gr';
// Φωτογραφίες «πριν και μετά»: κατεβαίνουν από την εφαρμογή στο build και μπορεί να λείπουν τοπικά (NO_GALLERY=1).
const OPTIONAL_PREFIXES = ['/erga-foto/'];

const htmlFiles = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  if (statSync(p).isDirectory()) return htmlFiles(p);
  return p.endsWith('.html') ? [p] : [];
});

const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

function resolveTarget(pathname) {
  const p = join(DIST, decodeURIComponent(pathname));
  if (existsSync(p) && statSync(p).isFile()) return p;
  const idx = join(p, 'index.html');
  return existsSync(idx) ? idx : null;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

const problems = [];
const files = htmlFiles(DIST);
const pages = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]));

for (const [file, html] of pages) {
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    let url;
    try { url = new URL(raw, `https://${SITE_HOST}${page}`); } catch { problems.push(`${page}: άκυρος σύνδεσμος ${raw}`); continue; }
    if (url.hostname !== SITE_HOST) continue;
    if (OPTIONAL_PREFIXES.some((p) => url.pathname.startsWith(p))) continue;
    const target = resolveTarget(url.pathname);
    if (!target) { problems.push(`${page}: σπασμένος σύνδεσμος ${raw}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!idsOf(pages.get(target) ?? readFileSync(target, 'utf8')).has(id)) problems.push(`${page}: η άγκυρα ${raw} δεν υπάρχει`);
    }
  }
  const brackets = visibleText(html).match(/\[[^\]\n]{3,}\]/g);
  if (brackets) problems.push(`${page}: κείμενο-κενό σε αγκύλες: ${brackets.join(' | ')}`);
}

if (problems.length) {
  console.error(`Έλεγχος dist: ${problems.length} πρόβλημα(τα)`);
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}
console.log(`Έλεγχος dist: ${files.length} σελίδες, σύνδεσμοι και κείμενα εντάξει.`);
