(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Textos según el idioma activo (documentElement.lang lo cambia el selector ES/EN de la cabecera).
  const L = (es, en) => document.documentElement.lang === 'en' ? en : es;
  const C = 502.65, MAX = 85;
  const RED = '#FF6B6B', AMBER = '#F5B94E', GREEN = '#5FD4A8';
  // Tres ejemplos ilustrativos. Cada uno es una empresa distinta con su propia puntuación.
  const EXAMPLES = [
    { score: 23, areas: [18, 30, 14, 30], money: '3.100 – 7.600 €', moneyEn: '€3,100 – €7,600', count: 4 },
    { score: 42, areas: [40, 50, 30, 48], money: '1.200 – 2.900 €', moneyEn: '€1,200 – €2,900', count: 4 },
    { score: 68, areas: [72, 66, 62, 72], money: '400 – 1.000 €', moneyEn: '€400 – €1,000', count: 1 }
  ];
  const bars = [...document.querySelectorAll('#anBars .an-fill')];
  const ring = document.getElementById('anRing'), score = document.getElementById('anScore');
  const money = document.getElementById('anMoney'), areas = document.getElementById('anAreas');
  const status = document.getElementById('anStatus'), pill = document.getElementById('anPill');
  const timers = []; let running = false, idx = 0;
  const bandColor = s => s < 35 ? RED : s < 65 ? AMBER : GREEN;
  const bandText = s => s < 35 ? L('Visibilidad baja', 'Low visibility') : s < 65 ? L('Visibilidad en desarrollo', 'Visibility in progress') : L('Visibilidad avanzada', 'Advanced visibility');
  const clear = () => { timers.forEach(clearTimeout); timers.length = 0; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  function countTo(el, to, ms, fmt) {
    const t0 = performance.now();
    (function step(now) {
      const k = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(to * e));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  function paintBand(s) {
    const c = bandColor(s);
    ring.setAttribute('stroke', c);
    pill.textContent = bandText(s);
    pill.style.color = c; pill.style.borderColor = c + '99'; pill.style.background = c + '1A';
  }
  function showFinal(ex) {
    paintBand(ex.score);
    ring.style.strokeDashoffset = C - C * (ex.score / MAX);
    score.textContent = String(ex.score);
    bars.forEach((b, i) => b.style.width = Math.round(ex.areas[i] / MAX * 100) + '%');
    money.textContent = L(ex.money, ex.moneyEn); areas.textContent = String(ex.count); status.textContent = L('Diagnóstico listo', 'Diagnosis ready');
  }
  function play(i) {
    const ex = EXAMPLES[i];
    paintBand(ex.score);
    ring.style.strokeDashoffset = C; score.textContent = '0'; money.textContent = L('0 – 0 €', '€0 – €0'); areas.textContent = '0';
    bars.forEach(b => b.style.width = '0%');
    status.textContent = L('Diagnosticando…', 'Diagnosing…');
    later(() => {
      ring.style.strokeDashoffset = C - C * (ex.score / MAX);
      countTo(score, ex.score, 1600, v => String(v));
      bars.forEach((b, k) => b.style.width = Math.round(ex.areas[k] / MAX * 100) + '%');
      countTo(areas, ex.count, 900, v => String(v));
    }, 300);
    later(() => { money.textContent = L(ex.money, ex.moneyEn); status.textContent = L('Diagnóstico listo', 'Diagnosis ready'); }, 2200);
    later(() => { idx = (idx + 1) % EXAMPLES.length; play(idx); }, 4500);
  }
  if (reduce) {
    showFinal(EXAMPLES[1]);
  } else {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; play(idx); }
      else if (!e.isIntersecting && running) { running = false; clear(); }
    }, { threshold: 0.3 });
    io.observe(document.querySelector('.an-mock'));
  }
  document.getElementById('anForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('anInput').value.trim();
    const err = document.getElementById('anErr');
    if (!name) { err.textContent = L('Escribe el nombre de tu empresa para empezar.', 'Enter your company name to start.'); document.getElementById('anInput').focus(); return; }
    err.textContent = '';
    // El nombre viaja en sessionStorage (no en la URL) y el diagnóstico lo recoge y lo borra.
    try { sessionStorage.setItem('neoda-empresa', name.slice(0, 80)); } catch (e) {}
    location.href = '/diagnostico/';
  });
})();

/* Buscador de la sección de diagnóstico: escribe y borra nombres de empresas inventadas, uno tras otro. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const field = document.querySelector('.an-field'), input = document.getElementById('anInput'), ghost = document.getElementById('anGhost');
  if (!field || !input || !ghost) return;
  const NAMES = ['Brizna Analytics', 'Órbita Quantum Labs', 'Kaelu Cloud Systems'];
  const sync = () => {
    const show = !input.value && document.activeElement !== input;
    field.classList.toggle('ghost-on', show);
  };
  input.addEventListener('focus', sync);
  input.addEventListener('blur', sync);
  input.addEventListener('input', sync);
  sync();
  if (reduce) { ghost.textContent = NAMES[0]; return; }
  const wait = ms => new Promise(r => setTimeout(r, ms));
  (async function loop() {
    let i = 0;
    for (;;) {
      const name = NAMES[i % NAMES.length];
      for (let n = 1; n <= name.length; n++) { ghost.textContent = name.slice(0, n); await wait(70); }
      await wait(1600);
      for (let n = name.length; n >= 0; n--) { ghost.textContent = name.slice(0, n); await wait(35); }
      await wait(400);
      i++;
    }
  })();
})();
