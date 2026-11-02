// Menú móvil (hamburguesa) de las páginas legales.
  const burger = document.querySelector('.nh-burger'), menu = document.getElementById('nhMenu');
  burger.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; burger.setAttribute('aria-expanded', String(open)); });
