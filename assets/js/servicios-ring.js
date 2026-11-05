/* Cabecera de servicios: un aro metálico que gira muy despacio (Three.js r128, local).
   Si no hay WebGL se queda el aro dibujado con CSS; con movimiento reducido se pinta una sola vez. */
(function () {
  const canvas = document.querySelector('canvas.ring');
  if (!canvas || !window.THREE) return;
  const hero = canvas.parentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (e) { return; }
  if (!renderer.getContext()) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Estudio de luz: fondo negro y tiras finas que dan reflejos marcados al metal (blanco arriba y a la izquierda, lavanda tenue a la derecha)
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x000000);
  const strip = (w, h, pos, rot, color) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    m.position.set(pos[0], pos[1], pos[2]); m.rotation.set(rot[0], rot[1], rot[2]); studio.add(m);
  };
  strip(12, 0.9, [0, 6, 0], [Math.PI / 2, 0, 0.35], 0xffffff);
  strip(0.6, 12, [-6, 0, 2], [0, Math.PI / 2, 0], 0xffffff);
  strip(0.8, 12, [6, 0, -2], [0, -Math.PI / 2, 0], 0x6d6290);
  strip(8, 0.35, [0, -1, 6], [0, Math.PI, 0], 0xd8d2ea);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio, 0.015).texture;
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0xb9afd3, 1.6, 30); rim.position.set(4, -2, 3); scene.add(rim);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.09, 96, 420),
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 1, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 2 })
  );
  ring.rotation.x = 0.82; // inclinado: se ve como una elipse abierta
  const spin = new THREE.Group(); spin.add(ring);
  const holder = new THREE.Group(); holder.add(spin);
  holder.rotation.z = -0.28;
  scene.add(holder);

  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (w >= 1024) { holder.position.set(2.4, 0.05, 0); holder.scale.setScalar(0.84); }
    else if (w >= 640) { holder.position.set(0.4, 1.5, 0); holder.scale.setScalar(0.62); }
    else { holder.position.set(0.1, 2.05, 0); holder.scale.setScalar(0.4); }
  }

  const t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;
    spin.rotation.y = t * 0.09;                 // una vuelta cada ~70 s
    ring.rotation.z = Math.sin(t * 0.17) * 0.05; // leve balanceo
    renderer.render(scene, camera);
  }

  let visible = true, raf = 0;
  const loop = now => { raf = 0; if (!visible || document.hidden) return; frame(now); raf = requestAnimationFrame(loop); };
  const start = () => { if (!reduce && !raf) raf = requestAnimationFrame(loop); };

  layout();
  frame(t0 + 9000);
  hero.classList.add('has-ring');
  window.addEventListener('resize', () => { layout(); if (reduce) frame(t0 + 9000); });
  if (reduce) return;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }).observe(canvas);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) start(); });
  start();
})();
