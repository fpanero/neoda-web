// Navegación por secciones sin "#" en la barra de direcciones.
// Clic en #seccion o /#seccion: se desplaza a la sección y la URL queda en "/" (o en la carpeta actual).
// Al llegar desde otra página con /#seccion, también se desplaza y se limpia el hash.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function sectionFor(hash) {
    if (!hash || hash.length < 2) return null;
    try { return document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { return null; }
  }
  function cleanUrl() {
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
  }
  function scrollTo(el) {
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }

  // Llegada con hash desde otra página
  window.addEventListener('load', function () {
    var el = sectionFor(location.hash);
    if (el) { scrollTo(el); cleanUrl(); }
  });

  // Clic en enlaces a secciones de esta misma página
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    var hash = null;
    if (href.charAt(0) === '#') hash = href;
    else if (href.indexOf('/#') === 0 && location.pathname === '/') hash = href.slice(1);
    if (!hash) return;
    var el = sectionFor(hash);
    if (!el) return;
    e.preventDefault();
    scrollTo(el);
    cleanUrl();
  });
})();
