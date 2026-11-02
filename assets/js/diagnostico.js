/* Diagnóstico de visibilidad · Neoda Solutions
   Puntuación calculada en el navegador a partir de las respuestas del usuario.
   Pendiente: conectar el registro con Brevo (doble opt-in). Hasta entonces no sale ningún dato de la página. */
(function () {
  const AREAS = {
    presencia: {
      name: 'Presencia y reputación',
      why: 'Es lo primero que compara quien todavía no te conoce: cómo te ven en Google, qué dicen tus clientes y en qué medios o directorios apareces.',
      bands: [
        'Casi no existes en las búsquedas locales ni sectoriales, y las reseñas no se gestionan. Quien te busca encuentra a otros antes de llegar a ti.',
        'Estás, pero sin control. La ficha está incompleta o desactualizada y las opiniones se responden a ratos, si se responden.',
        'Tienes una base sólida. Lo que falta es constancia: responder siempre y mantener la información viva.',
        'Tu reputación se trabaja de forma sistemática. El siguiente paso es convertirla en contactos medibles.'
      ]
    },
    mensaje: {
      name: 'Mensaje y web',
      why: 'Si la web no explica en diez segundos qué resuelves y para quién, el visitante se va a un competidor que sí lo hace.',
      bands: [
        'La web no comunica una propuesta clara y no facilita el contacto. Cada visita que llega se pierde por falta de claridad.',
        'La web describe lo que haces, pero no el resultado que consigue el cliente. Cuesta decidir y es fácil abandonar.',
        'El mensaje es claro y hay caminos para contactar. Falta medir qué pasa desde que llega una visita hasta que hay una conversación.',
        'Propuesta clara, rutas de contacto bien diseñadas y un mensaje que se entiende sin explicación. Ahora toca optimizarlo con datos.'
      ]
    },
    autoridad: {
      name: 'Autoridad y contenido',
      why: 'En una decisión de compra o de inversión, el cliente pide pruebas. Los casos verificables y el contenido útil son esa prueba.',
      bands: [
        'No hay pruebas públicas de lo que has resuelto. Quien decide tiene que fiarse de tu palabra, y eso cuesta más.',
        'Hay alguna referencia, pero sin problema, solución y resultado. Es difícil saber qué ganará el cliente al trabajar contigo.',
        'Tienes casos y contenido útil con cierta regularidad. Falta que respondan a las preguntas reales de tus clientes.',
        'Autoridad construida con casos y contenido que se buscan y se citan. El reto es mantener el ritmo y medir su efecto.'
      ]
    },
    medicion: {
      name: 'Medición y captación',
      why: 'Sin saber de dónde llega cada contacto y qué ocurre después, no puedes decidir dónde invertir ni cuánto cuesta un cliente.',
      bands: [
        'No se registra de dónde llega cada contacto ni cuánto tarda la primera respuesta. Las decisiones se toman a ciegas.',
        'Hay datos, pero repartidos entre herramientas y personas. Cuesta responder con rapidez y saber qué canal funciona.',
        'Se mide lo principal y se hace seguimiento comercial. Falta unificar los datos y revisarlos con una periodicidad fija.',
        'Medición consolidada y revisada. Lo siguiente es usarla para predecir resultados y priorizar inversiones.'
      ]
    }
  };

  // Cada pregunta: área, texto y acción concreta si la respuesta no es suficiente.
  const QUESTIONS = [
    { id: 'q1', area: 'presencia', text: 'Tu ficha de Google está reclamada y completa: categorías, horarios, servicios, descripción y fotos recientes.',
      action: 'Reclama y completa tu ficha de Google Business: categoría principal y secundarias, horarios, servicios, descripción y fotos reales actualizadas cada mes.' },
    { id: 'q2', area: 'presencia', text: 'Pides opiniones a tus clientes de forma habitual y respondes todas en menos de 48 horas.',
      action: 'Define un proceso de reseñas: pedir opinión tras cada cierre, responder todas en menos de 48 horas y escalar las negativas a un responsable.' },
    { id: 'q3', area: 'presencia', text: 'Apareces en medios, directorios o rankings de tu sector, con datos correctos y coherentes entre sí.',
      action: 'Identifica 5 medios, directorios o rankings de tu sector y revisa que tu información sea correcta y coincida en todos ellos.' },
    { id: 'q4', area: 'mensaje', text: 'La primera pantalla de tu web dice qué resuelves, para quién y con qué resultado medible.',
      action: 'Reescribe la primera pantalla de tu web en una frase: qué resuelves, para quién y el resultado medible. Pruébalo con tres personas ajenas a la empresa.' },
    { id: 'q5', area: 'mensaje', text: 'En móvil, un visitante puede contactarte o reservar en dos toques, con un formulario de pocos campos.',
      action: 'Pon un contacto o reserva visible desde la cabecera y en móvil, con un formulario de pocos campos. Mide cuántos visitantes lo llegan a enviar.' },
    { id: 'q6', area: 'mensaje', text: 'Tu web carga rápido en móvil, es segura y Google la rastrea sin errores graves.',
      action: 'Revisa lo básico: velocidad en móvil, HTTPS, indexación en Google Search Console y errores de rastreo. Corrige primero lo que bloquea la visibilidad.' },
    { id: 'q7', area: 'autoridad', text: 'Publicas casos con problema, solución y resultado, con cifras que se pueden comprobar.',
      action: 'Publica al menos 2 casos con problema, solución y resultado con cifras, con permiso del cliente o anonimizados. Una cifra verificable vale más que cinco afirmaciones.' },
    { id: 'q8', area: 'autoridad', text: 'Tienes contenido que responde a las preguntas que hace tu cliente antes de contactarte, y te encuentran por ellas.',
      action: 'Elige 10 preguntas que hace tu cliente antes de contactarte y responde cada una en una página o artículo. Así te encuentran cuando buscan el problema.' },
    { id: 'q9', area: 'autoridad', text: 'Los directivos y expertos tienen perfiles públicos actualizados y enlazados desde la web.',
      action: 'Completa los perfiles públicos del equipo directivo y de los expertos (web y LinkedIn) con su especialidad, y enlázalos desde la web.' },
    { id: 'q10', area: 'medicion', text: 'Sabes de qué canal llega cada contacto y cada cliente nuevo.',
      action: 'Añade parámetros de seguimiento (UTM) a tus enlaces y un campo obligatorio "¿cómo nos conociste?" en el formulario y en el CRM. Revisa el reparto cada mes.' },
    { id: 'q11', area: 'medicion', text: 'Cada contacto entrante tiene un responsable y mides el tiempo de primera respuesta.',
      action: 'Asigna un responsable a cada contacto entrante y mide el tiempo de primera respuesta. En contactos B2B, un objetivo de 24 horas suele marcar la diferencia.' },
    { id: 'q12', area: 'medicion', text: 'Revisas cada mes un cuadro de mando con visibilidad, contactos, conversión y coste por cliente.',
      action: 'Reúne entre 5 y 8 indicadores (visibilidad, contactos, tiempo de respuesta, conversión y coste por cliente) en un único cuadro de mando y revísalo cada mes.' }
  ];

  // Escala con techo de 85: nadie llega a 100, porque la excelencia se demuestra con medición continua.
  const VALUE = { no: 0, parcial: 35, consistente: 70, medido: 85 };
  const LABEL = { no: 'No', parcial: 'En parte', consistente: 'Sí, de forma habitual', medido: 'Sí, y lo medimos' };
  const MAX = 85;
  const NEXT = 'Mide el resultado de esta práctica cada trimestre para pasar de hacerlo a demostrar que funciona.';

  const answers = {};
  const $ = id => document.getElementById(id);
  // Escapado único para cualquier valor que se inserte como HTML. Los datos del usuario se insertan siempre con textContent.
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  // Honeypot: si un bot rellena el campo oculto, se ignora el envío sin avisar.
  const isBot = id => { const el = $(id); return !!(el && el.value); };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const val = id => VALUE[answers[id]] || 0;

  function renderQuestions() {
    const wrap = $('preguntas');
    wrap.textContent = '';
    const titulo = document.createElement('p');
    titulo.className = 'dx-label';
    titulo.textContent = 'Autodiagnóstico · ' + QUESTIONS.length + ' preguntas';
    wrap.appendChild(titulo);
    QUESTIONS.forEach((q, i) => {
      const row = document.createElement('div');
      row.className = 'dx-q';
      row.innerHTML =
        '<p class="text-[15px] leading-relaxed"><span class="font-mono text-[12px] text-[#7A7585]">' + esc(String(i + 1).padStart(2, '0')) + '</span>&nbsp; ' + esc(q.text) + '</p>' +
        '<div class="dx-seg flex-wrap" role="group" aria-label="' + esc(q.text) + '">' +
        Object.keys(VALUE).map(k => '<button type="button" data-q="' + esc(q.id) + '" data-v="' + esc(k) + '" aria-pressed="false">' + esc(LABEL[k]) + '</button>').join('') +
        '</div>';
      wrap.appendChild(row);
    });
    wrap.addEventListener('click', e => {
      const b = e.target.closest('button[data-q]'); if (!b) return;
      answers[b.dataset.q] = b.dataset.v;
      b.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      $('dxErrDatos').textContent = '';
    });
  }

  function scores() {
    const out = { areas: {} };
    Object.keys(AREAS).forEach(a => {
      const qs = QUESTIONS.filter(q => q.area === a);
      out.areas[a] = Math.round(qs.reduce((s, q) => s + val(q.id), 0) / qs.length);
    });
    const all = Object.keys(AREAS).map(a => out.areas[a]);
    out.total = Math.round(all.reduce((s, v) => s + v, 0) / all.length);
    return out;
  }

  const label = t => t < 35 ? 'Visibilidad baja' : t < 65 ? 'Visibilidad en desarrollo' : 'Visibilidad avanzada';
  const band = s => s < 30 ? 0 : s < 50 ? 1 : s < 70 ? 2 : 3;
  const areasByScore = s => Object.keys(AREAS).sort((a, b) => s.areas[a] - s.areas[b]);

  // Impacto económico orientativo. Supuestos de partida (hipótesis, no datos medidos):
  // entre un 15 % y un 35 % de la brecha de visibilidad (100 − puntuación) se traduce en contactos perdidos.
  const IMPACT_LOW = 0.15, IMPACT_HIGH = 0.35;
  const eur = n => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(n / 10) * 10);
  function impacto(total) {
    const contactos = Number($('dxContactos').value), ticket = Number($('dxTicket').value);
    const brecha = (100 - total) / 100;
    const low = contactos * brecha * IMPACT_LOW * ticket, high = contactos * brecha * IMPACT_HIGH * ticket;
    return { low, high, text: eur(low) + ' – ' + eur(high) };
  }

  function areaBars(s) {
    return Object.keys(AREAS).map(a =>
      '<div><div class="flex items-baseline justify-between gap-4"><p class="text-[15px] font-medium">' + esc(AREAS[a].name) + '</p><p class="font-mono text-[13px] text-[#AFAAB5]">' + esc(s.areas[a]) + '/' + esc(MAX) + '</p></div>' +
      '<div class="dx-bar mt-2"><span data-w="' + Math.round(s.areas[a] / MAX * 100) + '"></span></div></div>').join('');
  }
  function animateBars(root) {
    requestAnimationFrame(() => requestAnimationFrame(() =>
      root.querySelectorAll('[data-w]').forEach(el => el.style.width = el.dataset.w + '%')));
  }
  function setRing(t) {
    const C = 540.35, off = C - C * (t / MAX);
    $('ringFg').style.strokeDashoffset = reduce ? off : C;
    if (!reduce) requestAnimationFrame(() => requestAnimationFrame(() => $('ringFg').style.strokeDashoffset = off));
  }
  function countUp(el, to) {
    if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1100;
    (function step(now) {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  function show(id, on) { $(id).classList.toggle('dx-hidden', !on); }

  function buildPreview(s) {
    $('resEmpresa').textContent = $('dxNombre').value.trim();
    $('resEtiqueta').textContent = label(s.total) + ' · ' + s.total + ' de ' + MAX + ' posibles';
    $('resMoney').textContent = impacto(s.total).text;
    $('previewAreas').innerHTML = areaBars(s);
    animateBars($('previewAreas'));
    setRing(s.total);
    countUp($('resScore'), s.total);
  }

  // Acciones pendientes: respuestas por debajo de "sí, de forma habitual", de peor a mejor
  function pendientes(s) {
    return QUESTIONS
      .filter(q => val(q.id) < 70)
      .sort((a, b) => val(a.id) - val(b.id) || s.areas[a.area] - s.areas[b.area]);
  }

  function buildReport(s) {
    const empresa = $('dxNombre').value.trim();
    const sector = $('dxSector').value;
    const ciudad = $('dxCiudad').value.trim();
    $('infoTitulo').textContent = 'Informe de visibilidad: ' + empresa;
    $('infoFecha').textContent = [sector, ciudad, new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })].filter(Boolean).join(' · ');
    const orden = areasByScore(s);
    const peor = AREAS[orden[0]].name.toLowerCase(), mejor = AREAS[orden[orden.length - 1]].name.toLowerCase();
    $('infoResumen').textContent = 'Puntuación global de ' + s.total + ' sobre ' + MAX + ' (' + label(s.total).toLowerCase() + '). Tu área más fuerte es ' + mejor + ' y la más débil es ' + peor + '. Corregir la más débil suele dar el resultado más rápido, porque es donde se pierde un cliente que ya estaba interesado.';

    // Diagnóstico por áreas, con la respuesta dada a cada pregunta
    $('infoAreas').innerHTML = Object.keys(AREAS).map(a => {
      const items = QUESTIONS.filter(q => q.area === a).map(q => {
        const tono = val(q.id) >= 70 ? 'text-[#B9AFD3]' : 'text-[#E6A5A5]';
        return '<li class="flex items-start gap-3"><span class="mt-[2px] whitespace-nowrap font-mono text-[11px] ' + tono + '">' + esc(LABEL[answers[q.id]]) + '</span><span class="text-[14px] leading-relaxed text-[#AFAAB5]">' + esc(q.text) + '</span></li>';
      }).join('');
      return '<div>' +
        '<div class="flex items-baseline justify-between gap-4"><p class="text-[17px] font-semibold">' + esc(AREAS[a].name) + '</p><p class="font-mono text-[13px] text-[#AFAAB5]">' + esc(s.areas[a]) + '/' + esc(MAX) + '</p></div>' +
        '<div class="dx-bar mt-3"><span data-w="' + Math.round(s.areas[a] / MAX * 100) + '"></span></div>' +
        '<p class="mt-4 text-[15px] leading-relaxed text-white">' + esc(AREAS[a].bands[band(s.areas[a])]) + '</p>' +
        '<p class="mt-2 text-[14px] leading-relaxed text-[#7A7585]">Por qué importa: ' + esc(AREAS[a].why) + '</p>' +
        '<ul class="mt-4 space-y-2.5 border-t border-white/[0.07] pt-4">' + items + '</ul>' +
        '</div>';
    }).join('');

    // Impacto económico
    const imp = impacto(s.total);
    $('infoMoney').textContent = imp.text;
    $('infoMetodo').textContent = 'Método: contactos al mes × (100 − puntuación) / ' + MAX + ' × entre un 15 % y un 35 % (hipótesis de partida) × valor medio por cliente. Cifras redondeadas a 10 €. Es una estimación para priorizar, no una previsión de ventas.';

    // Plan 30 · 60 · 90 con las acciones pendientes, de más urgente a menos
    const pend = pendientes(s);
    const fases = [
      { t: '30 días · lo urgente', items: pend.slice(0, 2) },
      { t: '60 días · consolidar', items: pend.slice(2, 4) },
      { t: '90 días · medir y repetir', items: pend.slice(4, 6) }
    ];
    $('infoPlan').innerHTML = fases.map(f => {
      const lista = f.items.length
        ? f.items.map(q => '<li class="ml-4 list-disc">' + esc(q.action) + '</li>').join('')
        : '<li class="ml-4 list-disc">' + esc(NEXT) + '</li>';
      return '<li class="list-none"><p class="font-semibold text-white">' + f.t + '</p><ul class="mt-2 space-y-2">' + lista + '</ul></li>';
    }).join('');
  }

  // Paso 1 → análisis → resultado
  $('formDatos').addEventListener('submit', e => {
    e.preventDefault();
    if (isBot('dxWeb2')) return;
    const missing = QUESTIONS.filter(q => !answers[q.id]);
    if (!$('dxNombre').value.trim()) { $('dxErrDatos').textContent = 'Indica el nombre de la empresa.'; $('dxNombre').focus(); return; }
    if (!(Number($('dxContactos').value) > 0) || !(Number($('dxTicket').value) > 0)) {
      $('dxErrDatos').textContent = 'Indica los contactos al mes y el valor medio por cliente para estimar el impacto.';
      (Number($('dxContactos').value) > 0 ? $('dxTicket') : $('dxContactos')).focus(); return;
    }
    if (missing.length) {
      $('dxErrDatos').textContent = 'Responde las ' + QUESTIONS.length + ' preguntas para ver tu puntuación (faltan ' + missing.length + ').';
      document.querySelector('[data-q="' + missing[0].id + '"]').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const s = scores();
    show('paso-datos', false); show('paso-analisis', true);
    setTimeout(() => {
      show('paso-analisis', false); show('paso-resultado', true);
      buildPreview(s);
      $('paso-resultado').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }, reduce ? 0 : 1400);
    window.__dxScores = s;
  });

  // Puerta de registro → informe completo
  $('formGate').addEventListener('submit', e => {
    e.preventDefault();
    if (isBot('gWeb2')) return;
    const nombre = $('gNombre').value.trim(), email = $('gEmail').value.trim();
    if (!nombre) { $('gErr').textContent = 'Indica tu nombre.'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $('gErr').textContent = 'Revisa el email.'; return; }
    if (!$('gConsent').checked) { $('gErr').textContent = 'Necesitamos tu consentimiento para enviarte el informe.'; return; }
    $('gErr').textContent = '';
    // IMPORTANTE: esta puerta es solo de interfaz. Hoy no se envía ningún dato a ningún sitio: el informe se genera en el navegador.
    // Pendiente: enviar {nombre, email, empresa, respuestas} a Brevo (doble opt-in) cuando esté configurado.
    // Cuando exista un backend o un CRM, la validación, el consentimiento registrado y el límite de envíos deben hacerse en servidor, por HTTPS.
    buildReport(window.__dxScores);
    show('paso-resultado', false); show('paso-informe', true);
    $('paso-informe').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => animateBars($('infoAreas')), 50);
  });

  $('btnPdf').addEventListener('click', () => window.print());

  // Nombre de empresa llegado desde la home: se lee de sessionStorage (no de la URL) y se borra al usarlo.
  try {
    const pre = sessionStorage.getItem('neoda-empresa');
    if (pre) { $('dxNombre').value = pre.slice(0, 80); sessionStorage.removeItem('neoda-empresa'); }
  } catch (e) {}
  // Si la página se abrió con un parámetro en la URL (enlaces antiguos), se elimina sin usarlo.
  if (location.search) { try { history.replaceState(null, '', location.pathname); } catch (e) {} }
  renderQuestions();
})();
