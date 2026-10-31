// Mobile menu: one button opens and closes the nav list.
const nav = document.querySelector<HTMLElement>('.nav');
const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
if (nav && btn) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}
