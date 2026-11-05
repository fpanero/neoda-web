/* Logo de Neoda en 3D, de fondo en la cabecera de servicios (canvas 2D, sin librerías).
   Es un cubo de alambre visto desde una diagonal, como el logotipo. Gira despacio sobre su eje vertical
   y se balancea un poco. Las aristas del lado que mira al usuario brillan más. */
(function () {
  const c = document.querySelector('canvas.logo-bg');
  if (!c || !c.getContext) return;
  const ctx = c.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Vértices del cubo (±1) y sus 12 aristas (pares que solo cambian una coordenada)
  const V = [];
  for (let i = 0; i < 8; i++) V.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1]);
  const E = [];
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) {
    const x = i ^ j; if (x === 1 || x === 2 || x === 4) E.push([i, j]);
  }
  const rY = (p, a) => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
  const rX = (p, a) => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
  const BASE_X = Math.atan(1 / Math.SQRT2); // 35,26°: deja el cubo visto desde una diagonal, como el logo
  const F = 6;                               // distancia de cámara (perspectiva suave)

  let W = 0, dpr = 1;
  function fit() {
    const r = c.getBoundingClientRect();
    W = r.width; dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(W * dpr); c.height = Math.round(W * dpr);
  }

  function draw(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, W);
    const spin = t * 0.1;                    // una vuelta cada ~60 s
    const wobble = Math.sin(t * 0.07) * 0.12;
    const P = V.map(v => {
      let p = rY(v, Math.PI / 4);
      p = rX(p, BASE_X + wobble);
      return rY(p, spin);
    });
    const s = W * 0.26;
    const Q = P.map(p => {
      const k = F / (F + p[2]);
      return { x: W / 2 + p[0] * s * k, y: W / 2 - p[1] * s * k, z: p[2] };
    });
    ctx.lineCap = 'round';
    for (const [i, j] of E) {
      const a = Q[i], b = Q[j];
      const d = ((a.z + b.z) / 2 + Math.SQRT2 * 1.2) / (Math.SQRT2 * 2.4); // 0 detrás, 1 delante
      const front = Math.min(1, Math.max(0, d));
      // Pasada de halo: brillo suave alrededor de la arista
      ctx.strokeStyle = `rgba(185,175,211,${0.10 + front * 0.22})`;
      ctx.shadowColor = 'rgba(185,175,211,.9)';
      ctx.shadowBlur = (6 + front * 10) * dpr;
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      // Pasada nítida: el contorno de delante más claro
      ctx.shadowBlur = 0;
      ctx.strokeStyle = `rgba(236,233,241,${0.18 + front * 0.62})`;
      ctx.lineWidth = 0.9 + front * 0.5;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
  }

  fit();
  draw(0);
  if (reduce) return;
  window.addEventListener('resize', () => { fit(); draw(performance.now() / 1000); });
  let visible = true, raf = 0;
  const loop = () => { raf = 0; if (!visible || document.hidden) return; draw(performance.now() / 1000); raf = requestAnimationFrame(loop); };
  const start = () => { if (!raf) raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(c);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  start();
})();
