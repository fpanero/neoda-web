/* Cabecera de servicios: un aro grande, de fondo, iluminado desde arriba (Three.js r128, local).
   Gira muy despacio y un brillo recorre el metal. Al bajar, el texto se desvanece y el aro se acerca.
   Sin WebGL queda el aro dibujado con CSS; con movimiento reducido se pinta una sola vez y sin efecto de scroll. */
(function () {
  const canvas = document.querySelector('canvas.ring');
  const hero = document.querySelector('.hero');
  if (!canvas || !hero) return;
  const stage = canvas.parentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Progreso del scroll dentro de la cabecera (0 arriba, 1 cuando la escena va a soltarse)
  let progress = 0;
  function readScroll() {
    const r = hero.getBoundingClientRect();
    const run = hero.offsetHeight - stage.offsetHeight;
    progress = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
    hero.style.setProperty('--p', progress.toFixed(3));
    hero.classList.toggle('faded', progress > 0.6); // el texto ya no se ve: que no se pueda pulsar
  }
  if (!reduce) { readScroll(); window.addEventListener('scroll', readScroll, { passive: true }); }

  if (!window.THREE) return;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) { return; }
  if (!renderer.getContext()) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Estudio: una gran luz cenital (de arriba) sobre fondo negro, y un reflejo lavanda muy tenue detrás
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x000000);
  const panel = (w, h, pos, rot, color) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.position.set(pos[0], pos[1], pos[2]); m.rotation.set(rot[0], rot[1], rot[2]); studio.add(m);
  };
  panel(18, 7, [0, 7, 1], [Math.PI / 2, 0, 0], 0xffffff);      // cenital
  panel(10, 1.2, [0, 3, -7], [0, 0, 0], 0x8e84b0);             // fondo, lavanda
  panel(14, 0.4, [0, -2, 8], [0, Math.PI, 0], 0x3a3548);        // rebote frontal, muy suave
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.04).texture;

  const top = new THREE.DirectionalLight(0xffffff, 2.4); top.position.set(0, 10, 2); scene.add(top);
  const glint = new THREE.PointLight(0xffffff, 2.2, 0, 2); scene.add(glint); // recorre el aro
  const lav = new THREE.PointLight(0xb9afd3, 1.2, 0, 2); lav.position.set(-4, -3, 4); scene.add(lav);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.052, 96, 480),
    new THREE.MeshPhysicalMaterial({ color: 0xe9e7ef, metalness: 1, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 2.2 })
  );
  ring.rotation.x = 1.17; // tumbado: elipse abierta, como un aro visto desde un poco más arriba
  const spin = new THREE.Group(); spin.add(ring);
  const holder = new THREE.Group(); holder.add(spin);
  holder.rotation.z = -0.1;
  scene.add(holder);

  const base = { x: 0, y: 0, s: 1 };
  function layout() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (w >= 1024) Object.assign(base, { x: 0.95, y: -0.25, s: 1.68 });
    else if (w >= 640) Object.assign(base, { x: 0.3, y: 0.9, s: 1.35 });
    else Object.assign(base, { x: 0.1, y: 1.75, s: 0.74 });
  }

  const t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;
    spin.rotation.y = t * 0.035 + Math.sin(t * 0.05) * 0.1;        // una vuelta cada ~3 min, sin ponerse de canto
    ring.rotation.x = 1.17 - Math.sin(t * 0.06) * 0.06;
    const a = t * 0.12;                                             // el brillo da la vuelta en ~50 s
    glint.position.set(Math.cos(a) * 6, 3.5, Math.sin(a) * 6);
    const p = reduce ? 0 : progress;
    holder.position.set(base.x - p * 0.4, base.y + p * 0.5, 0);
    holder.scale.setScalar(base.s * (1 + p * 0.35));
    renderer.render(scene, camera);
  }

  let visible = true, raf = 0;
  const loop = now => { raf = 0; if (!visible || document.hidden) return; frame(now); raf = requestAnimationFrame(loop); };
  const start = () => { if (!reduce && !raf) raf = requestAnimationFrame(loop); };

  layout();
  frame(t0 + 20000);
  stage.classList.add('has-ring');
  window.addEventListener('resize', () => { layout(); if (reduce) frame(t0 + 20000); });
  if (reduce) return;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  start();
})();
