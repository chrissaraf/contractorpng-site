// Greek all-caps never carry accents: strip tonos from any text rendered uppercase,
// and from words typed fully in capitals.
const strip = (s: string) => s.normalize('NFD').replace(/́/g, '').normalize('NFC');

function fix() {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = w.nextNode())) {
    const el = n.parentElement;
    if (!el || el.closest('script,style')) continue;
    const t = n.nodeValue ?? '';
    const isUpper = getComputedStyle(el).textTransform === 'uppercase';
    const v = isUpper ? strip(t) : t.replace(/[Ά-Ϋ]{2,}/g, (wd) => (/[ά-ώ]/.test(wd) ? wd : strip(wd)));
    if (v !== t) n.nodeValue = v;
  }
}

fix();
