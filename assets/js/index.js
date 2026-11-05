    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    /* ---------- Idioma ES / EN ---------- */
    const isEN = () => document.documentElement.lang === 'en';
    const T = (es, en) => (isEN() ? en : es);

    /* ---------- Menú móvil ---------- */
    const menuBtn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => { const open = menu.classList.toggle('hidden') === false; menuBtn.setAttribute('aria-expanded', open); });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.add('hidden'); menuBtn.setAttribute('aria-expanded', false); }));

    /* ---------- Formulario (validación de email corporativo) ---------- */
    const form = document.getElementById('leadForm'), msg = document.getElementById('formMsg');
    const personal = ['gmail.com','hotmail.com','hotmail.es','outlook.com','outlook.es','yahoo.com','yahoo.es','icloud.com','live.com','protonmail.com'];
    // Validación de interfaz (solo UX). No es una barrera de seguridad: cualquiera puede descargar whitepaper.pdf directamente.
    // Cuando el email se envíe a Brevo/CRM, la validación, el límite de envíos y el registro del consentimiento deben hacerse en servidor, por HTTPS.
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.website && form.website.value) return; // honeypot: bot detectado, se ignora sin avisar
      const v = form.email.value.trim().toLowerCase(), domain = v.split('@')[1] || '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.length > 254) { msg.textContent = T('Introduce una dirección de email válida.', 'Please enter a valid email address.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
      if (personal.includes(domain)) { msg.textContent = T('Usa tu email corporativo para recibir el documento.', 'Please use your work email to receive the document.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
      if (!document.getElementById('wConsent').checked) { msg.textContent = T('Necesitamos tu consentimiento para enviarte el documento.', 'We need your consent to send you the document.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
      msg.textContent = T('Descarga iniciada. Gracias, ' + v + '.', 'Download started. Thank you, ' + v + '.');
      const a = document.createElement('a'); a.href = '/whitepaper.pdf'; a.download = 'Neoda-Marco-Exposicion-Tecnologica-2027.pdf'; document.body.appendChild(a); a.click(); a.remove();
      msg.className = 'mt-3 text-xs font-medium text-ink';
      form.reset();
    });

    /* ---------- Carrusel de casos ---------- */
    (function () {
      const rail = document.getElementById('railCasos'); if (!rail) return;
      const cards = [...rail.querySelectorAll('.flip')], dots = document.getElementById('dotsCasos');
      const step = () => cards[0].offsetWidth + 20;
      const maxLeft = () => rail.scrollWidth - rail.clientWidth;
      const pages = () => Math.max(1, Math.round(maxLeft() / step()) + 1);
      const go = i => rail.scrollTo({ left: Math.min(i * step(), maxLeft()), behavior: 'smooth' });
      const build = () => {
        dots.replaceChildren();
        for (let i = 0; i < pages(); i++) {
          const d = document.createElement('button'); d.type = 'button'; d.className = 'dot'; d.setAttribute('aria-label', 'Página ' + (i + 1));
          d.addEventListener('click', () => go(i)); dots.appendChild(d);
        }
        upd();
      };
      const upd = () => {
        const i = Math.min(pages() - 1, Math.round(rail.scrollLeft / step()));
        [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i));
      };
      cards.forEach(c => {
        c.addEventListener('click', () => { if (!matchMedia('(hover:hover)').matches) c.classList.toggle('is-on'); });
        c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('is-on'); } });
      });
      const cur = () => Math.round(rail.scrollLeft / step());
      document.getElementById('prevC').addEventListener('click', () => go(Math.max(0, cur() - 1)));
      document.getElementById('nextC').addEventListener('click', () => go(Math.min(pages() - 1, cur() + 1)));
      rail.addEventListener('scroll', upd, { passive: true });
      addEventListener('resize', build);
      build();
      const wrap = rail.parentElement; let timer = null;
      const next = () => { const atEnd = rail.scrollLeft >= maxLeft() - 4; go(atEnd ? 0 : Math.round(rail.scrollLeft / step()) + 1); };
      const play = () => { if (timer || matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer = setInterval(next, 4000); };
      const pause = () => { clearInterval(timer); timer = null; };
      wrap.addEventListener('mouseenter', pause); wrap.addEventListener('mouseleave', play);
      wrap.addEventListener('focusin', pause); wrap.addEventListener('focusout', play);
      wrap.addEventListener('touchstart', pause, { passive: true });
      play();
    })();

    /* ---------- Foco de luz en tarjetas ---------- */
    document.querySelectorAll('.spot').forEach(el => el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }));

    /* ---------- Portada del whitepaper con inclinación 3D ---------- */
    const cover = document.getElementById('cover');
    if (!reduce) {
      cover.parentElement.addEventListener('pointermove', e => {
        const r = cover.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        cover.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
      });
      cover.parentElement.addEventListener('pointerleave', () => cover.style.transform = '');
    }

    /* ---------- Entradas al hacer scroll + contadores ---------- */
    const fmt = (n, dec, sign) => (n < 0 ? '−' : (sign || '')) + Math.abs(n).toFixed(dec).replace('.', ',');
    function countUp(el) {
      const end = parseFloat(el.dataset.count), dec = +el.dataset.dec || 0, sign = el.dataset.sign, t0 = performance.now();
      const step = now => { const k = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(end * e, dec, sign); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window && !reduce) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(en.target);
      }), { threshold: .15 });
      document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
    } else {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in'));
    }


    /* ---------- Metodología: ciclo continuo y texto que se escribe ---------- */
    (() => {
      const sec = document.querySelector('.mt-sec'); if (!sec) return;
      const track = sec.querySelector('.mt-track'), list = sec.querySelector('.mt-list');
      const items = [...sec.querySelectorAll('.mt-item')], segs = [...sec.querySelectorAll('.mt-seg')], rot = sec.querySelector('.mt-rot');
      let cur = -1, timer = null, counter = 0;
      items.forEach(it => it.querySelectorAll('.mt-tag,.mt-p').forEach(el => el.dataset.orig = el.textContent));
      const txt = el => (document.documentElement.lang === 'en' && el.dataset.en) ? el.dataset.en : el.dataset.orig;
      const showFull = () => items.forEach(it => it.querySelectorAll('.mt-tag,.mt-p').forEach(el => el.textContent = txt(el)));
      function type(el, cb) {
        const id = (el._id = (el._id || 0) + 1), text = txt(el); let n = 0; el.textContent = '';
        (function step() {
          if (el._id !== id) return;
          el.textContent = text.slice(0, ++n);
          if (n < text.length) setTimeout(step, 12); else cb && cb();
        })();
      }
      function center(i) {
        const it = items[i];
        list.style.transform = `translateY(${track.clientHeight / 2 - (it.offsetTop + it.offsetHeight / 2)}px)`;
      }
      function go(i) {
        cur = i; const token = ++counter;
        items.forEach((it, k) => { it.classList.toggle('on', k === i); it.classList.remove('typing'); });
        segs.forEach((sg, k) => sg.classList.toggle('on', k === i));
        rot.style.transform = `rotate(${i * 90}deg)`;
        center(i);
        const it = items[i], h = it.querySelector('.mt-tag'), p = it.querySelector('.mt-p');
        h.textContent = ''; p.textContent = ''; it.classList.add('typing');
        type(h, () => { if (token !== counter) return; type(p, () => { if (token === counter) it.classList.remove('typing'); }); });
      }
      window.mtRefresh = () => { showFull(); if (cur >= 0) go(cur); };
      const restart = () => { clearInterval(timer); timer = setInterval(() => go((cur + 1) % items.length), 3200); };
      showFull();
      if (reduce) { items[0].classList.add('on'); segs[0].classList.add('on'); return; }
      go(0); restart();
      window.addEventListener('resize', () => { if (cur >= 0) center(cur); });
      items.forEach(it => it.addEventListener('click', () => { go(+it.dataset.i); restart(); }));
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { if (!timer) { go(cur < 0 ? 0 : cur); restart(); } }
        else { clearInterval(timer); timer = null; }
      }, { threshold: 0.15 });
      io.observe(sec);
    })();

    /* ---------- Utilidad: animar solo mientras es visible ---------- */
    function runWhenVisible(el, frame) {
      let raf = null, visible = false;
      const loop = () => { frame(); raf = visible && !reduce ? requestAnimationFrame(loop) : null; };
      frame();
      if (reduce || !('IntersectionObserver' in window)) return;
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }).observe(el);
    }
    function makeRenderer(canvas) {
      if (!window.THREE || !canvas) return null;
      try { const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); if (!r.getContext()) return null; r.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); return r; } catch (e) { return null; }
    }

    /* ---------- Escena de partículas (hero: poliedro · cierre: anillo) ---------- */
    const VERT = `
      uniform float uTime; uniform float uMorph; uniform float uPixel; uniform vec3 uMouse;
      attribute vec3 aAlt; attribute float aRand;
      varying float vMix; varying float vAlpha;
      void main() {
        vec3 p = mix(position, aAlt, uMorph);
        float w = sin(uTime * 1.1 + aRand * 6.2831 + p.y * 2.4);
        p += normalize(p + 0.0001) * w * 0.04;
        vec4 world = modelMatrix * vec4(p, 1.0);
        vec3 d = world.xyz - uMouse; float l = length(d);
        float f = smoothstep(1.5, 0.0, l);
        world.xyz += normalize(d + 0.0001) * f * 0.6;
        vec4 mv = viewMatrix * world;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uPixel * (1.1 + aRand * 1.9) * (7.0 / -mv.z);
        vMix = clamp(f * 1.6 + step(0.94, aRand), 0.0, 1.0);
        vAlpha = 0.3 + 0.55 * aRand;
      }`;
    const FRAG = `
      uniform vec3 uColA; uniform vec3 uColB; varying float vMix; varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
        gl_FragColor = vec4(mix(uColA, uColB, vMix), smoothstep(0.5, 0.0, d) * vAlpha);
      }`;

    function particleScene(canvas, o) {
      const renderer = makeRenderer(canvas); if (!renderer) return false;
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 9;
      const N = innerWidth < 768 ? Math.round(o.count * 0.5) : o.count;
      const pos = new Float32Array(N * 3), alt = new Float32Array(N * 3), rnd = new Float32Array(N);
      const v = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
      let src = null;
      if (o.shape === 'poly') src = new THREE.IcosahedronGeometry(1.9, 0).toNonIndexed().attributes.position.array;
      for (let i = 0; i < N; i++) {
        if (o.shape === 'poly') {
          const f = Math.floor(Math.random() * (src.length / 9)) * 9;
          a.fromArray(src, f); b.fromArray(src, f + 3); c.fromArray(src, f + 6);
          let r1 = Math.random(), r2 = Math.random() < 0.38 ? 0 : Math.random();
          if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
          v.copy(a).addScaledVector(b.sub(a), r1).addScaledVector(c.sub(a), r2);
          if (Math.random() < 0.12) v.multiplyScalar(0.55 + Math.random() * 0.4);
          pos.set([v.x, v.y, v.z], i * 3);
          v.normalize().multiplyScalar(2.4 + Math.random() * 2.6);
          alt.set([v.x, v.y, v.z], i * 3);
        } else {
          const u = Math.random() * Math.PI * 2, w = Math.random() * Math.PI * 2, R = 2.3, r = 0.75 + (Math.random() - .5) * 0.25;
          v.set((R + r * Math.cos(w)) * Math.cos(u), (R + r * Math.cos(w)) * Math.sin(u), r * Math.sin(w));
          pos.set([v.x, v.y, v.z], i * 3);
          alt.set([v.x * 1.25, v.y * 1.25, v.z * 1.6], i * 3);
        }
        rnd[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('aAlt', new THREE.BufferAttribute(alt, 3));
      g.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
      const uniforms = {
        uTime: { value: 0 }, uMorph: { value: 0 }, uPixel: { value: renderer.getPixelRatio() },
        uMouse: { value: new THREE.Vector3(99, 99, 99) },
        uColA: { value: new THREE.Color(0x9a8fc0) }, uColB: { value: new THREE.Color(0xffffff) },
      };
      const pts = new THREE.Points(g, new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      const group = new THREE.Group(); group.add(pts); scene.add(group);
      if (o.shape === 'poly') {
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.9, 0)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 }));
        pts.add(edges);
        const shell = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(3.1, 1)), new THREE.LineBasicMaterial({ color: 0x8a80a3, transparent: true, opacity: 0.08 }));
        group.add(shell); o.shell = shell;
      } else { group.rotation.x = 1.05; }

      const ndc = new THREE.Vector2(9, 9), ray = new THREE.Vector3(), hud = document.getElementById('hud');
      addEventListener('pointermove', e => {
        const r = canvas.getBoundingClientRect();
        if (e.clientY < r.top || e.clientY > r.bottom) { ndc.set(9, 9); return; }
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        if (o.hud && hud) hud.textContent = `x ${ndc.x.toFixed(2)} · y ${ndc.y.toFixed(2)}`;
      }, { passive: true });

      function resize() {
        const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1, wide = w >= 1024;
        renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
        group.position.x = wide ? o.x : 0; group.position.y = wide ? 0 : o.yMobile || 0;
        group.scale.setScalar(wide ? o.scale : o.scale * 0.72);
      }
      resize(); addEventListener('resize', resize);

      let t = 0, morph = 0, rx = 0, ry = 0;
      runWhenVisible(canvas, () => {
        t += 0.012; uniforms.uTime.value = t;
        if (o.scrollMorph) { const target = Math.min(1, Math.max(0, scrollY / (canvas.clientHeight * 0.85))); morph += (target - morph) * 0.06; uniforms.uMorph.value = morph; }
        if (ndc.x < 5) {
          ray.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
          const dist = -camera.position.z / ray.z; uniforms.uMouse.value.copy(camera.position).addScaledVector(ray, dist);
          rx += (ndc.y * 0.25 - rx) * 0.04; ry += (ndc.x * 0.4 - ry) * 0.04;
        } else uniforms.uMouse.value.set(99, 99, 99);
        if (o.shape === 'poly') { pts.rotation.y = t * 0.12 + ry; pts.rotation.x = 0.35 + Math.sin(t * 0.3) * 0.15 - rx; o.shell.rotation.y = -t * 0.04; o.shell.rotation.z = t * 0.02; }
        else { pts.rotation.z = t * 0.08; group.rotation.y = ry * 0.5; }
        renderer.render(scene, camera);
      });
      return true;
    }

    /* ---------- Escenas isométricas de los pilares ---------- */
    function isoScene(canvas, kind) {
      const renderer = makeRenderer(canvas); if (!renderer) return;
      const ACC = { data: 0x7CC4FF, ai: 0xF2B66D, soft: 0xB9AFD3, sec: 0x6FD6B0 }[kind] || 0x9a8fc0;
      const scene = new THREE.Scene(), s = 3.7;
      const cam = new THREE.OrthographicCamera(-s, s, s, -s, 0.1, 100);
      cam.position.set(8, 7.2, 8); cam.lookAt(0, 0.85, 0);
      scene.add(new THREE.AmbientLight(0x484454, 1.0));
      const key = new THREE.DirectionalLight(0xffffff, 1.05); key.position.set(5, 9, 3); scene.add(key);
      const fillL = new THREE.PointLight(ACC, 2.4, 14); fillL.position.set(-3, 1.2, 3); scene.add(fillL);
      const steel = new THREE.MeshStandardMaterial({ color: 0x4c4953, metalness: 0.8, roughness: 0.36 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x141219, metalness: 0.55, roughness: 0.55 });
      const glow = new THREE.MeshBasicMaterial({ color: ACC });
      const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const hi = new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.4, roughness: 0.3, emissive: ACC, emissiveIntensity: 0.5 });

      const root = new THREE.Group(); scene.add(root);
      // Pedestal
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.9, 0.32, 72), dark); base.position.y = 0.16; root.add(base);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.05, 72), new THREE.MeshStandardMaterial({ color: 0x1e1b25, metalness: 0.6, roughness: 0.45 })); top.position.y = 0.345; root.add(top);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.62, 0.014, 8, 128), glow); ring.rotation.x = Math.PI / 2; ring.position.y = 0.33; root.add(ring);
      const ticks = new THREE.Group(); root.add(ticks);
      for (let i = 0; i < 36; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.02, i % 9 === 0 ? 0.22 : 0.1), i % 9 === 0 ? white : steel); const a = i / 36 * Math.PI * 2; m.position.set(Math.cos(a) * 2.32, 0.38, Math.sin(a) * 2.32); m.rotation.y = -a; ticks.add(m); }
      const Y0 = 0.37;
      let update = () => {};

      if (kind === 'data') {
        const boxes = [], geo = new THREE.BoxGeometry(0.5, 1, 0.5);
        for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
          const m = new THREE.Mesh(geo, steel); m.position.set((i - 1.5) * 0.66, 0, (j - 1.5) * 0.66); root.add(m); boxes.push({ m, i, j });
          const cap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.02, 0.5), new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.35 })); m.add(cap); cap.position.y = 0.5;
        }
        let lit = 0, last = 0;
        update = t => {
          boxes.forEach(({ m, i, j }) => { const h = 0.35 + 1.1 * (0.5 + 0.5 * Math.sin(t * 1.4 - i * 0.7 - j * 0.45)); m.scale.y = h; m.position.y = Y0 + h / 2; });
          if (t - last > 0.55) { boxes[lit].m.material = steel; lit = (lit + 5) % 16; boxes[lit].m.material = hi; last = t; }
        };
      }

      if (kind === 'ai') {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 1.2, 6), steel); col.position.y = Y0 + 0.6; root.add(col);
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.62, 0), new THREE.MeshStandardMaterial({ color: 0x5a5763, metalness: 0.85, roughness: 0.28, emissive: 0x2d2c34, flatShading: true }));
        core.position.y = 2.1; root.add(core);
        const coreEdges = new THREE.LineSegments(new THREE.EdgesGeometry(core.geometry), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })); core.add(coreEdges);
        const rings = [1.15, 1.55].map((r, k) => { const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 6, 120), k ? glow : white); m.position.y = 2.1; m.rotation.x = Math.PI / 2 + (k ? 0.5 : -0.35); root.add(m); return m; });
        const nodes = [], lineGeo = new THREE.BufferGeometry(), linePos = new Float32Array(8 * 6);
        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        root.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: ACC, transparent: true, opacity: 0.55 })));
        for (let k = 0; k < 8; k++) { const n = new THREE.Mesh(new THREE.SphereGeometry(k % 3 ? 0.07 : 0.1, 12, 12), k % 3 ? glow : white); root.add(n); nodes.push(n); }
        update = t => {
          core.rotation.y = t * 0.8; core.position.y = 2.1 + Math.sin(t * 1.5) * 0.06;
          rings[0].rotation.z = t * 0.5; rings[1].rotation.z = -t * 0.35;
          nodes.forEach((n, k) => {
            const r = k % 2 ? 1.55 : 1.15, a = t * (k % 2 ? 0.6 : 0.9) + k * 0.8, tilt = k % 2 ? 0.5 : -0.35;
            n.position.set(Math.cos(a) * r, 2.1 + Math.sin(a) * r * Math.sin(tilt), Math.sin(a) * r * Math.cos(tilt));
            linePos.set([0, core.position.y, 0, n.position.x, n.position.y, n.position.z], k * 6);
          });
          lineGeo.attributes.position.needsUpdate = true;
        };
      }

      if (kind === 'soft') {
        // Software a medida: capas de una aplicación que se apilan y se ajustan entre sí.
        const panels = [];
        for (let k = 0; k < 4; k++) {
          const p = new THREE.Group();
          p.add(new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 1.5), k === 3 ? hi : steel));
          const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(2.3, 0.08, 1.5)), new THREE.LineBasicMaterial({ color: k === 3 ? 0xffffff : ACC, transparent: true, opacity: k === 3 ? 0.8 : 0.35 }));
          p.add(edge);
          for (let l = 0; l < 3; l++) {
            const w = 0.45 + ((k + l) % 3) * 0.35;
            const bar = new THREE.Mesh(new THREE.BoxGeometry(w, 0.02, 0.09), k === 3 ? white : glow);
            bar.position.set(-0.95 + w / 2, 0.055, -0.45 + l * 0.42); p.add(bar);
          }
          p.position.y = Y0 + 0.45 + k * 0.52; root.add(p); panels.push(p);
        }
        update = t => panels.forEach((p, k) => {
          p.position.x = Math.sin(t * 1.1 + k * 0.9) * 0.16;
          p.position.y = Y0 + 0.45 + k * 0.52 + Math.sin(t * 1.6 + k) * 0.04;
          p.rotation.y = Math.sin(t * 0.6 + k * 0.5) * 0.14;
        });
      }

      if (kind === 'sec') {
        const hexes = [], R = 0.4;
        for (let q = -2; q <= 2; q++) for (let r = -2; r <= 2; r++) {
          const s3 = -q - r; if (Math.abs(s3) > 2) continue;
          const d = Math.max(Math.abs(q), Math.abs(r), Math.abs(s3)), h = 1.15 - d * 0.32;
          const m = new THREE.Mesh(new THREE.CylinderGeometry(R * 0.93, R * 0.93, 1, 6), d === 0 ? hi : steel);
          m.position.set(R * 1.5 * q, 0, R * Math.sqrt(3) * (r + q / 2)); m.scale.y = h; m.position.y = Y0 + h / 2; m.userData = { d, h };
          root.add(m); hexes.push(m);
        }
        const dome = new THREE.Mesh(new THREE.SphereGeometry(2.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: ACC, wireframe: true, transparent: true, opacity: 0.16 }));
        dome.position.y = Y0; root.add(dome);
        const scan = new THREE.Mesh(new THREE.TorusGeometry(1, 0.008, 6, 128), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 }));
        scan.rotation.x = Math.PI / 2; root.add(scan);
        update = t => {
          dome.rotation.y = t * 0.12;
          const k = (Math.sin(t * 0.9) * 0.5 + 0.5), y = 0.05 + k * 2.05, r = Math.sqrt(Math.max(0.0001, 2.2 * 2.2 - y * y));
          scan.position.y = Y0 + y; scan.scale.set(r, r, 1);
          hexes.forEach(m => { const p = 1 + 0.08 * Math.sin(t * 2 - m.userData.d * 1.2); m.scale.y = m.userData.h * p; m.position.y = Y0 + m.scale.y / 2; });
        };
      }

      function resize() { const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1; renderer.setSize(w, h, false); const asp = w / h; cam.left = -s * asp; cam.right = s * asp; cam.updateProjectionMatrix(); }
      resize(); addEventListener('resize', resize);
      let t = 0, hover = 0, hoverT = 0;
      const card = canvas.closest('article');
      card.addEventListener('pointerenter', () => hoverT = 1); card.addEventListener('pointerleave', () => hoverT = 0);
      runWhenVisible(canvas, () => {
        hover += (hoverT - hover) * 0.06; t += 0.012 * (1 + hover * 1.2);
        root.rotation.y = t * 0.18; ticks.rotation.y = -t * 0.25;
        fillL.intensity = 2.2 + hover * 1.6;
        update(t); renderer.render(scene, cam);
      });
    }

    /* ---------- Red de nodos 2D ---------- */
    function nodeField(canvas) {
      const ctx = canvas.getContext('2d'); if (!ctx) return;
      let w, h, nodes = [], mouse = { x: -999, y: -999 };
      const density = +canvas.dataset.density || 24000;
      function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight;
        canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.min(90, Math.round(w * h / density));
        nodes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2, d: Math.random() < .12 }));
      }
      resize(); addEventListener('resize', resize);
      canvas.parentElement.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
      canvas.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
      runWhenVisible(canvas, () => {
        ctx.clearRect(0, 0, w, h);
        for (const n of nodes) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; }
        for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j], dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 150) { ctx.strokeStyle = `rgba(142,135,160,${(1 - dist / 150) * .3})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        for (const n of nodes) {
          const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (md < 180) { ctx.strokeStyle = `rgba(255,255,255,${(1 - md / 180) * .35})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
          if (n.d) { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(Math.PI / 4); ctx.strokeRect(-3, -3, 6, 6); ctx.restore(); }
          else { ctx.fillStyle = 'rgba(174,171,179,.55)'; ctx.fillRect(n.x - 1, n.y - 1, 2, 2); }
        }
      });
    }

    particleScene(document.getElementById('heroScene'), { shape: 'poly', count: 14000, x: 3.0, yMobile: 1.2, scale: 1, scrollMorph: true, hud: false });
    particleScene(document.getElementById('closeScene'), { shape: 'torus', count: 9000, x: 0, scale: 1.25 });
    document.querySelectorAll('canvas.iso').forEach(c => isoScene(c, c.dataset.kind));
    document.querySelectorAll('canvas.net').forEach(nodeField);
  
