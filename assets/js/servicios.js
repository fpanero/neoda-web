/* Página de servicios: menú móvil, foco de luz en tarjetas, red de nodos de la cabecera y entrada al hacer scroll. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú móvil
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  if (btn && menu) btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(open));
  });

  // Foco de luz que sigue al cursor
  document.querySelectorAll('.spot').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // Entrada al hacer scroll (el contenido es visible aunque no se ejecute)
  const items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  // Red de nodos 2D (misma que en la home), solo mientras está a la vista
  document.querySelectorAll('canvas.net').forEach(canvas => {
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let w, h, nodes = [], mouse = { x: -999, y: -999 }, visible = false, raf = 0;
    const density = +canvas.dataset.density || 24000;
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.round(w * h / density));
      nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2, d: Math.random() < .12 }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      if (!reduce) for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 150) { ctx.strokeStyle = `rgba(138,128,163,${(1 - dist / 150) * .3})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      for (const n of nodes) {
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (md < 180) { ctx.strokeStyle = `rgba(255,255,255,${(1 - md / 180) * .35})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
        if (n.d) { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(Math.PI / 4); ctx.strokeRect(-3, -3, 6, 6); ctx.restore(); }
        else { ctx.fillStyle = 'rgba(175,170,181,.55)'; ctx.fillRect(n.x - 1, n.y - 1, 2, 2); }
      }
    }
    function loop() { raf = 0; if (!visible) return; draw(); if (!reduce) raf = requestAnimationFrame(loop); }
    resize(); draw();
    addEventListener('resize', () => { resize(); draw(); });
    canvas.parentElement.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }).observe(canvas);
    }
  });
})();
