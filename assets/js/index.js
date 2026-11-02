    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    /* ---------- Idioma ES / EN ---------- */
    const EN = {"Tecnologías que utilizamos": "Technologies we use", "[PENDIENTE: métrica del caso]": "[PENDING: case metric]", "[PENDIENTE: descripción del caso]": "[PENDING: case description]", "Energía · Datos": "Energy · Data", "Salud · IA": "Health · AI", "Energía": "Energy", "Salud": "Health", "Comercio minorista": "Retail", "Una única fuente de datos para toda la red comercial.": "One data source for the entire retail network.", "Banca": "Banking", "Detección y respuesta gestionadas, con tiempos comprometidos.": "Managed detection and response with committed times.", "Industria": "Industry", "Modelo de precios con validación humana sobre datos existentes.": "Pricing model with human validation on existing data.", "Seguros": "Insurance", "Seguros · IA": "Insurance · AI", "Asistente de tramitación con trazabilidad y supervisión humana.": "Claims assistant with traceability and human oversight.", "Tiempo de tramitación de siniestros": "Claims processing time", "Clasificación y extracción de documentos con revisión humana en cada decisión. Todo queda registrado para auditoría.": "Document classification and extraction with human review at every decision. Everything is logged for audit.", "Ver resultado →": "See result →", "Solicitar caso bajo NDA →": "Request case under NDA →", "Neoda": "Neoda", "Solutions": "Solutions", "V1": "V1", "Servicios": "Services", "Casos de Uso": "Use cases", "Insights": "Insights", "Nosotros": "About", "Agendar Consultoría": "Book a consultation", "Monitorización activa · 24/7 · UE": "Active monitoring · 24/7 · EU", "Cada dato sin gobierno es un riesgo abierto y una ventaja que no se cobra.": "Every ungoverned data asset is an open risk and an advantage left unclaimed.", "Diseñamos arquitecturas de datos, IA y ciberseguridad que devuelven el control a la dirección: exposición medida, decisiones basadas en información fiable e infraestructura preparada para escalar.": "We design data, AI and cybersecurity architectures that return control to the board: measured exposure, decisions based on reliable information and infrastructure ready to scale.", "Agendar consultoría": "Book a consultation", "Ver casos de uso": "View use cases", "Sesión de 45 min con un arquitecto senior / sin coste / sin compromiso": "45-minute session with a senior architect / no cost / no commitment", "scroll": "scroll", "Tecnologías que utilizamos": "Certified partners", "El punto ciego": "The blind spot", "Lo que no aparece en el cuadro de mando también cuesta dinero.": "What does not appear on the dashboard also costs money.", "La mayoría de los incidentes graves y de las inversiones tecnológicas fallidas comparten un origen: decisiones tomadas sin visibilidad real sobre los propios activos.": "Most serious incidents and failed technology investments share one origin: decisions made without real visibility of the organisation's own assets.", "Exposición que nadie está midiendo": "Exposure nobody is measuring", "riesgo": "risk", "Accesos heredados, proveedores conectados a sistemas críticos y configuraciones cloud sin revisar. El riesgo existe aunque no figure en ningún informe.": "Legacy access, suppliers connected to critical systems and unreviewed cloud configurations. The risk exists even if it appears in no report.", "Datos que cuestan y no rinden": "Data that costs and doesn't pay back", "coste": "cost", "Almacenados, duplicados y sin modelo de gobierno. La empresa paga por ellos cada mes, pero no los convierte en margen ni en decisiones.": "Stored, duplicated and without a governance model. The company pays for them every month, but they do not turn into margin or decisions.", "IA sin perímetro": "AI without boundaries", "cumplimiento": "compliance", "Pilotos aislados, herramientas no autorizadas e información sensible fuera de control. Sin trazabilidad no hay retorno defendible ni cumplimiento normativo.": "Isolated pilots, unauthorised tools and sensitive information outside control. Without traceability there is no defensible return or regulatory compliance.", "Capacidades": "Capabilities", "Tres disciplinas. Una sola responsabilidad: el resultado.": "Three disciplines. One responsibility: the result.", "No vendemos licencias ni horas. Entregamos capacidades operativas con un propietario claro y métricas que su comité puede auditar.": "We don't sell licences or hours. We deliver operational capabilities with a clear owner and metrics your committee can audit.", "Arquitectura de Datos": "Data Architecture", "Una única fuente de verdad para decidir.": "A single source of truth for decisions.", "Gobierno y linaje del dato auditables de extremo a extremo.": "Governance and data lineage auditable end to end.", "Plataformas cloud dimensionadas al uso real, no a la previsión del proveedor.": "Cloud platforms sized for real usage, not for the vendor's forecast.", "Indicadores de negocio disponibles en horas, no en semanas.": "Business indicators available in hours, not weeks.", "Explorar Datos →": "Explore Data →", "Inteligencia Artificial": "Artificial Intelligence", "Automatización con retorno medible y riesgo acotado.": "Automation with measurable return and contained risk.", "Casos de uso priorizados por impacto en la cuenta de resultados.": "Use cases prioritised by impact on the P&L.", "Modelos con trazabilidad, supervisión humana y datos que no salen de su perímetro.": "Models with traceability, human oversight and data that never leaves your perimeter.", "Cumplimiento del Reglamento Europeo de IA desde el diseño.": "EU AI Act compliance by design.", "Explorar IA →": "Explore AI →", "Ciberseguridad": "Cybersecurity", "Exposición conocida, medida y bajo control.": "Known, measured and controlled exposure.", "Evaluación continua de la superficie de ataque, incluida la cadena de suministro.": "Continuous assessment of the attack surface, including the supply chain.", "Detección y respuesta gestionada 24/7 con tiempos de contención comprometidos.": "24/7 managed detection and response with committed containment times.", "Preparación documentada para NIS2 y DORA ante regulador y auditoría.": "Documented NIS2 and DORA readiness for regulators and audits.", "Explorar Ciberseguridad →": "Explore Cybersecurity →", "Casos de uso": "Use cases", "Resultados que se presentan en comité.": "Results ready for the board.", "Solicitar casos completos bajo NDA →": "Request full cases under NDA →", "Retail · Datos": "Retail · Data", "Coste anual de plataforma de datos": "Annual data platform cost", "Consolidación de cuatro entornos en uno y modelo de gobierno único. Reporting comercial diario en lugar de semanal.": "Four environments consolidated into one, with a single governance model. Commercial reporting daily instead of weekly.", "Banca · Ciberseguridad": "Banking · Cybersecurity", "Tiempo medio de contención de incidentes": "Average incident containment time", "Centralización de la detección, playbooks de respuesta automatizados y simulacros trimestrales con el comité de riesgos.": "Centralised detection, automated response playbooks and quarterly drills with the risk committee.", "Industria · IA": "Industry · AI", "Margen bruto en la línea de producto principal": "Gross margin on the main product line", "Modelo de pricing dinámico con validación humana, desplegado en catorce semanas sobre datos ya existentes.": "Dynamic pricing model with human validation, deployed in fourteen weeks on existing data.", "Metodología": "Methodology", "Cuatro fases. Un ciclo que se repite.": "Four phases. One cycle that repeats.", "Cada fase termina con un entregable concreto y un punto de decisión para la dirección. Al cerrar la monitorización, el ciclo vuelve a empezar con una auditoría actualizada.": "Each phase ends with a concrete deliverable and a decision point for the board. When monitoring closes, the cycle starts again with an updated audit.", "Neoda · Whitepaper": "Neoda · Whitepaper", "Marco de Exposición Tecnológica 2027": "Technology Exposure Framework 2027", "Insights · Whitepaper técnico": "Insights · Technical whitepaper", "Datos, IA y ciberriesgo: el marco que su comité de dirección necesita en 2027.": "Data, AI and cyber risk: the framework your board needs in 2027.", "28 páginas con un modelo para cuantificar la exposición tecnológica en términos financieros, una matriz de priorización de inversiones y una checklist de cumplimiento NIS2, DORA y Reglamento Europeo de IA.": "28 pages with a model to quantify technology exposure in financial terms, an investment prioritisation matrix and a compliance checklist for NIS2, DORA and the EU AI Act.", "Email corporativo": "Work email", "Descargar whitepaper": "Download whitepaper", "Solo direcciones corporativas. No compartimos sus datos con terceros y puede darse de baja en un clic.": "Corporate addresses only. We do not share your data with third parties, and you can unsubscribe in one click.", "Siguiente paso": "Next step", "El riesgo no espera a la próxima reunión del comité.": "Risk does not wait for the next board meeting.", "En 45 minutos identificamos sus tres exposiciones prioritarias y el retorno que su información puede generar. Usted decide después.": "In 45 minutes we identify your three priority exposures and the return your information can generate. You decide afterwards.", "Revisar capacidades": "Review capabilities", "contacto@neoda.com · respuesta en <24 h laborables · NDA desde la primera reunión": "contacto@neoda.com · reply within 24 business hours · NDA from the first meeting", "Consultoría boutique en datos, inteligencia artificial y ciberseguridad para comités de dirección.": "Boutique consultancy in data, artificial intelligence and cybersecurity for boards.", "Agendar consultoría →": "Book a consultation →", "Navegación": "Navigation", "Arquitectura de datos": "Data architecture", "Inteligencia artificial": "Artificial intelligence", "Contacto": "Contact", "Aviso legal": "Legal notice", "Privacidad": "Privacy", "Cookies": "Cookies", "[PENDIENTE: teléfono]": "[PENDING: phone]", "[PENDIENTE: dirección]": "[PENDING: address]"};
    const normalize = t => t.replace(/\s+/g, ' ').trim();
    const isEN = () => document.documentElement.lang === 'en';
    const T = (es, en) => (isEN() ? en : es);
    function applyLang(l) {
      const en = l === 'en';
      document.documentElement.lang = en ? 'en' : 'es';
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nodes = [];
      while (w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach(n => {
        const par = n.parentElement;
        if (!par || par.closest('.mt-list') || par.closest('script,style')) return;
        if (n._es === undefined) n._es = n.nodeValue;
        const core = normalize(n._es);
        if (en && EN[core]) {
          const lead = n._es.match(/^\s*/)[0], trail = n._es.match(/\s*$/)[0];
          n.nodeValue = lead + EN[core] + trail;
        } else n.nodeValue = n._es;
      });
      document.title = en ? 'Neoda Solutions · Data, AI and Cybersecurity' : 'Neoda Solutions — Datos, IA y Ciberseguridad';
      const md = document.querySelector('meta[name="description"]');
      if (md) md.content = en ? 'Boutique consultancy in data architecture, artificial intelligence and cybersecurity for boards.' : 'Consultoría boutique en arquitectura de datos, inteligencia artificial y ciberseguridad para comités de dirección.';
      document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === (en ? 'en' : 'es'))));
      document.querySelectorAll('.lang').forEach(l => l.dataset.on = en ? 'en' : 'es');
      const bn = document.getElementById('menuBtn'); if (bn) bn.setAttribute('aria-label', en ? 'Open menu' : 'Abrir menú');
      if (window.mtRefresh) window.mtRefresh();
      try { localStorage.setItem('neoda-lang', en ? 'en' : 'es'); } catch (e) {}
    }
    document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
    try { if (localStorage.getItem('neoda-lang') === 'en') applyLang('en'); } catch (e) {}

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
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.length > 254) { msg.textContent = T('Introduzca una dirección de email válida.', 'Please enter a valid email address.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
      if (personal.includes(domain)) { msg.textContent = T('Utilice su email corporativo para recibir el documento.', 'Please use your work email to receive the document.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
      if (!document.getElementById('wConsent').checked) { msg.textContent = T('Necesitamos su consentimiento para enviarle el documento.', 'We need your consent to send you the document.'); msg.className = 'mt-3 text-xs text-[#A33A3A]'; return; }
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
      document.getElementById('prevC').addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
      document.getElementById('nextC').addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
      rail.addEventListener('scroll', upd, { passive: true });
      addEventListener('resize', build);
      build();
      const wrap = rail.parentElement; let timer = null;
      const next = () => { const atEnd = rail.scrollLeft >= maxLeft() - 4; rail.scrollTo({ left: atEnd ? 0 : Math.min(rail.scrollLeft + step(), maxLeft()), behavior: 'smooth' }); };
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
      const ACC = { data: 0x7CC4FF, ai: 0xF2B66D, sec: 0x6FD6B0 }[kind] || 0x9a8fc0;
      const scene = new THREE.Scene(), s = 3.7;
      const cam = new THREE.OrthographicCamera(-s, s, s, -s, 0.1, 100);
      cam.position.set(8, 7.2, 8); cam.lookAt(0, 0.85, 0);
      scene.add(new THREE.AmbientLight(0x4a4358, 1.0));
      const key = new THREE.DirectionalLight(0xffffff, 1.05); key.position.set(5, 9, 3); scene.add(key);
      const fillL = new THREE.PointLight(ACC, 2.4, 14); fillL.position.set(-3, 1.2, 3); scene.add(fillL);
      const steel = new THREE.MeshStandardMaterial({ color: 0x4d4856, metalness: 0.8, roughness: 0.36 });
      const dark = new THREE.MeshStandardMaterial({ color: 0x15121a, metalness: 0.55, roughness: 0.55 });
      const glow = new THREE.MeshBasicMaterial({ color: ACC });
      const white = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const hi = new THREE.MeshStandardMaterial({ color: ACC, metalness: 0.4, roughness: 0.3, emissive: ACC, emissiveIntensity: 0.5 });

      const root = new THREE.Group(); scene.add(root);
      // Pedestal
      const base = new THREE.Mesh(new THREE.CylinderGeometry(2.75, 2.9, 0.32, 72), dark); base.position.y = 0.16; root.add(base);
      const top = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 0.05, 72), new THREE.MeshStandardMaterial({ color: 0x1f1a27, metalness: 0.6, roughness: 0.45 })); top.position.y = 0.345; root.add(top);
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
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.62, 0), new THREE.MeshStandardMaterial({ color: 0x5c5666, metalness: 0.85, roughness: 0.28, emissive: 0x2e2c36, flatShading: true }));
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
          if (dist < 150) { ctx.strokeStyle = `rgba(138,128,163,${(1 - dist / 150) * .3})`; ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        for (const n of nodes) {
          const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (md < 180) { ctx.strokeStyle = `rgba(255,255,255,${(1 - md / 180) * .35})`; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); }
          if (n.d) { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.save(); ctx.translate(n.x, n.y); ctx.rotate(Math.PI / 4); ctx.strokeRect(-3, -3, 6, 6); ctx.restore(); }
          else { ctx.fillStyle = 'rgba(175,170,181,.55)'; ctx.fillRect(n.x - 1, n.y - 1, 2, 2); }
        }
      });
    }

    particleScene(document.getElementById('heroScene'), { shape: 'poly', count: 14000, x: 3.0, yMobile: 1.2, scale: 1, scrollMorph: true, hud: false });
    particleScene(document.getElementById('closeScene'), { shape: 'torus', count: 9000, x: 0, scale: 1.25 });
    document.querySelectorAll('canvas.iso').forEach(c => isoScene(c, c.dataset.kind));
    document.querySelectorAll('canvas.net').forEach(nodeField);
  
