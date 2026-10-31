// Project images: technical line drawings in the theme's colors. No client photos are published.
const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

function draw(c: HTMLCanvasElement) {
  const r = c.getBoundingClientRect();
  if (!r.width) return;
  const d = Math.min(window.devicePixelRatio || 1, 2);
  c.width = r.width * d;
  c.height = r.height * d;
  const x = c.getContext('2d');
  if (!x) return;
  x.scale(d, d);
  const W = r.width, H = r.height, seed = +(c.dataset.seed ?? 1), k = c.dataset.kind;
  const ink = css('--ink'), sub = css('--grey'), grid = css('--grid'), bg = css('--card');
  let s = seed * 9301;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  x.strokeStyle = grid; x.lineWidth = 1;
  for (let gx = 0; gx < W; gx += 24) { x.beginPath(); x.moveTo(gx + .5, 0); x.lineTo(gx + .5, H); x.stroke(); }
  for (let gy = 0; gy < H; gy += 24) { x.beginPath(); x.moveTo(0, gy + .5); x.lineTo(W, gy + .5); x.stroke(); }
  const g = H * .84;
  x.strokeStyle = ink; x.lineWidth = 1.5;
  x.beginPath(); x.moveTo(0, g); x.lineTo(W, g); x.stroke();
  x.lineWidth = 1.3;
  if (k === 'tower') {
    const bw = W * .34, bx = W * .5 - bw / 2, fl = 5 + Math.floor(rnd() * 4), fh = (g - H * .12) / fl;
    x.strokeRect(bx, g - fh * fl, bw, fh * fl);
    for (let i = 1; i < fl; i++) { x.beginPath(); x.moveTo(bx, g - fh * i); x.lineTo(bx + bw, g - fh * i); x.stroke(); }
    x.strokeStyle = sub;
    for (let i = 0; i < fl; i++) for (let j = 0; j < 4; j++) x.strokeRect(bx + 8 + j * (bw - 16) / 4 + 3, g - fh * (i + 1) + fh * .25, (bw - 16) / 4 - 6, fh * .5);
    x.setLineDash([3, 4]); x.strokeRect(bx - 10, g - fh * fl - 8, bw + 20, fh * fl + 8); x.setLineDash([]);
  } else if (k === 'house') {
    const bw = W * .5, bx = W * .25, h = H * .42;
    x.beginPath(); x.moveTo(bx, g); x.lineTo(bx, g - h); x.lineTo(bx + bw * .5, g - h - H * .16); x.lineTo(bx + bw, g - h); x.lineTo(bx + bw, g); x.stroke();
    x.beginPath(); x.moveTo(bx, g - h / 2); x.lineTo(bx + bw, g - h / 2); x.stroke();
    x.strokeStyle = sub;
    x.strokeRect(bx + bw * .12, g - h * .85, bw * .25, h * .25); x.strokeRect(bx + bw * .63, g - h * .85, bw * .25, h * .25);
    x.strokeRect(bx + bw * .42, g - h * .42, bw * .16, h * .42);
  } else if (k === 'stone') {
    const n = 3, gap = W * .04, bw = (W * .78 - gap * (n - 1)) / n, h = H * .3;
    for (let i = 0; i < n; i++) {
      const bx = W * .11 + i * (bw + gap), bh = h * (.85 + rnd() * .3);
      x.strokeStyle = ink; x.beginPath(); x.moveTo(bx, g); x.lineTo(bx, g - bh + 6); x.quadraticCurveTo(bx, g - bh, bx + 6, g - bh); x.lineTo(bx + bw - 6, g - bh); x.quadraticCurveTo(bx + bw, g - bh, bx + bw, g - bh + 6); x.lineTo(bx + bw, g); x.stroke();
      x.strokeStyle = sub; x.strokeRect(bx + bw * .38, g - bh * .6, bw * .24, bh * .6); x.strokeRect(bx + bw * .1, g - bh * .75, bw * .16, bh * .2);
      for (let j = 0; j < 4; j++) { const yy = g - bh * (.15 + j * .2); x.beginPath(); x.moveTo(bx + bw * .68, yy); x.lineTo(bx + bw * .9, yy); x.stroke(); }
    }
  } else if (k === 'green') {
    const bw = W * .66, bx = W * .17, h = H * .4, ribs = 7;
    x.beginPath(); x.moveTo(bx, g); x.lineTo(bx, g - h * .55); x.quadraticCurveTo(bx + bw / 2, g - h * 1.25, bx + bw, g - h * .55); x.lineTo(bx + bw, g); x.stroke();
    x.strokeStyle = sub;
    for (let i = 1; i < ribs; i++) { const px = bx + bw * i / ribs, t = i / ribs, top = g - h * .55 - (h * .7) * 4 * t * (1 - t) * .98; x.beginPath(); x.moveTo(px, g); x.lineTo(px, top); x.stroke(); }
    x.beginPath(); x.moveTo(bx, g - h * .55); x.lineTo(bx + bw, g - h * .55); x.stroke();
  } else {
    x.strokeStyle = ink; x.lineWidth = 3;
    const px = W * .18, py = H * .14, pw = W * .64, ph = H * .66;
    x.strokeRect(px, py, pw, ph);
    x.lineWidth = 1.5;
    x.beginPath(); x.moveTo(px + pw * .55, py); x.lineTo(px + pw * .55, py + ph * .62); x.moveTo(px, py + ph * .62); x.lineTo(px + pw, py + ph * .62); x.stroke();
    x.strokeStyle = sub;
    x.beginPath(); x.arc(px + pw * .55, py + ph * .62, ph * .18, Math.PI, Math.PI * 1.5); x.stroke();
  }
  x.fillStyle = sub; x.fillRect(W * .06, g - 4, W * .88, 2);
}

const canvases = [...document.querySelectorAll<HTMLCanvasElement>('.ph canvas')];
const all = () => canvases.forEach(draw);
all();
window.addEventListener('resize', all);
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', all);

// Project filter (only on pages that have one)
const btns = [...document.querySelectorAll<HTMLButtonElement>('.filters button')];
const items = [...document.querySelectorAll<HTMLElement>('.proj')];
btns.forEach((b) => b.addEventListener('click', () => {
  btns.forEach((o) => o.setAttribute('aria-pressed', o === b ? 'true' : 'false'));
  const f = b.dataset.f;
  items.forEach((it) => { it.hidden = !(f === 'all' || it.dataset.c === f); });
  requestAnimationFrame(all);
}));
