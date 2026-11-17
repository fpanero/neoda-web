/* Cabecera común de todas las páginas: menú móvil por debajo de 900 px.
   Un único script para toda la web; no añadir otro que dependa del botón #menuBtn. */
(function () {
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  const setOpen = open => {
    menu.classList.toggle('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
})();
