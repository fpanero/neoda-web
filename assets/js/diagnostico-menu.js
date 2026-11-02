    (function () {
      const btn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
      if (btn && menu) btn.addEventListener('click', () => { const open = menu.classList.toggle('hidden') === false; btn.setAttribute('aria-expanded', String(open)); });
    })();
  
