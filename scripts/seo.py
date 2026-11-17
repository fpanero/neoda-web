# -*- coding: utf-8 -*-
"""SEO de todas las páginas: título, descripción, canonical, Open Graph y JSON-LD (Uso: npm run seo).
El catálogo de /servicios/ se genera desde SERVICE_META y las preguntas frecuentes del propio HTML.
También mantiene la navegación común, Sectores y las columnas del pie."""
import json, re, html
import os
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + os.sep
SITE = 'https://neodasolutions.com'
OG_IMG = SITE + '/img/og/neoda-og.jpg'
ORG_ID = SITE + '/#organization'

ORG = {
  "@type": "Organization", "@id": ORG_ID, "name": "Neoda Solutions", "url": SITE + "/",
  "logo": {"@type": "ImageObject", "url": SITE + "/assets/icons/icon-512.png", "width": 512, "height": 512},
  "email": "contacto@neoda.com",
  "description": "Consultora boutique de datos, inteligencia artificial, software a medida y ciberseguridad para empresas agroalimentarias.",
  "areaServed": {"@type": "Country", "name": "España"},
  "knowsAbout": ["Analítica de datos", "Cuadros de mando", "Ingeniería de datos", "Gobierno del dato", "Ciencia de datos",
                 "Inteligencia artificial", "Automatización de procesos", "Agentes de IA", "Desarrollo de software a medida", "CRM a medida",
                 "Integración de sistemas", "Ciberseguridad", "RGPD", "NIS2", "Reglamento Europeo de IA", "Agricultura de precisión",
                 "Trazabilidad alimentaria", "Planificación de producción", "Control de mermas", "Industria agroalimentaria"],
  "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Servicios de Neoda Solutions", "url": SITE + "/servicios/",
    "itemListElement": [
      {"@type": "OfferCatalog", "name": "Datos y operaciones", "url": SITE + "/servicios/datos-y-operaciones/"},
      {"@type": "OfferCatalog", "name": "Visión artificial", "url": SITE + "/servicios/vision-artificial/"},
      {"@type": "OfferCatalog", "name": "Agua y energía", "url": SITE + "/servicios/agua-y-energia/"},
      {"@type": "OfferCatalog", "name": "Ciberseguridad IT/OT", "url": SITE + "/servicios/ciberseguridad-agroindustrial/"},
      {"@type": "OfferCatalog", "name": "Planificación predictiva", "url": SITE + "/servicios/planificacion-predictiva/"},
      {"@type": "OfferCatalog", "name": "Trazabilidad y calidad", "url": SITE + "/servicios/trazabilidad-y-calidad/"}]}
}
WEBSITE = {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Neoda Solutions", "inLanguage": "es-ES", "publisher": {"@id": ORG_ID}}

def crumbs(items):
    return {"@type": "BreadcrumbList", "@id": items[-1][1] + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}

def text(fragment):
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', fragment))).strip()

PAGES = {
  'index.html': dict(path='/', title='Soluciones de datos, IA y ciberseguridad agroalimentaria | Neoda Solutions',
       desc='Datos, visión artificial, agua y energía, planificación, trazabilidad y ciberseguridad IT/OT para empresas agroalimentarias del sur de España.',
       ogtitle='Tecnología para decidir mejor en el agro', kind='home'),
  'servicios/index.html': dict(path='/servicios/', title='Servicios de datos, IA y ciberseguridad agroalimentaria | Neoda Solutions',
       desc='Soluciones de datos, visión artificial, agua y energía, ciberseguridad IT/OT, planificación y trazabilidad para empresas agroalimentarias del sur de España.',
       ogtitle='Soluciones digitales para la operación agroalimentaria', kind='servicios', crumb='Servicios'),
  'sectores/index.html': dict(path='/sectores/', title='Soluciones para hortofruticultura, olivar y agroindustria | Neoda Solutions',
       desc='Tecnología para hortofruticultura, olivar, cooperativas y agroindustria en Andalucía y el sur de España: datos, IA, agua, trazabilidad y ciberseguridad.',
       ogtitle='Especialización agroalimentaria para el sur de España', kind='page', crumb='Sectores'),
  'insights/index.html': dict(path='/insights/', title='Insights de datos e IA agroalimentaria | Neoda Solutions',
       desc='Marco práctico para decidir sobre datos, inteligencia artificial y ciberseguridad en empresas agroalimentarias.',
       ogtitle='Insights agroalimentarios · Neoda Solutions', kind='page', crumb='Insights'),
  'nosotros/index.html': dict(path='/nosotros/', title='Consultora tecnológica agroalimentaria | Neoda Solutions',
       desc='Del tercer puesto de NEODA en NASA Space Apps Granada 2026 a una consultora de datos, IA y ciberseguridad para el sector agroalimentario.',
       ogtitle='Nosotros · Neoda Solutions', kind='about', crumb='Nosotros'),
  'diagnostico/index.html': dict(path='/diagnostico/', title='Diagnóstico gratuito de visibilidad digital | Neoda Solutions',
       desc='Diagnóstico gratuito de visibilidad digital: puntuación, áreas a mejorar y plan de acción en pocos minutos.',
       ogtitle='Diagnóstico gratuito de visibilidad digital', kind='page', crumb='Diagnóstico de visibilidad'),
  'privacidad/index.html': dict(path='/privacidad/', title=None,
       desc='Cómo trata Neoda Solutions los datos personales que nos facilitas y cómo ejercer tus derechos.', ogtitle='Política de privacidad · Neoda Solutions', kind='legal'),
  'aviso-legal/index.html': dict(path='/aviso-legal/', title=None,
       desc='Aviso legal y condiciones de uso del sitio web de Neoda Solutions.', ogtitle='Aviso legal · Neoda Solutions', kind='legal'),
  'cookies/index.html': dict(path='/cookies/', title=None,
       desc='Qué cookies utiliza el sitio web de Neoda Solutions y cómo gestionarlas.', ogtitle='Política de cookies · Neoda Solutions', kind='legal'),
}

SERVICE_META = [
  ('datos-y-operaciones', 'Datos y operaciones agroalimentarias', 'Una torre de control para conectar campo, planta, calidad, almacén y ventas sin sustituir los sistemas que ya funcionan.'),
  ('vision-artificial', 'Visión artificial para calidad', 'Inspección visual en planta y campo para detectar defectos, clasificar producto y medir mermas con revisión humana.'),
  ('agua-y-energia', 'Agua y energía inteligentes', 'Monitorización, detección de anomalías y apoyo al riego y bombeo para usar mejor los recursos disponibles.'),
  ('ciberseguridad-agroindustrial', 'Ciberseguridad agroindustrial IT/OT', 'Protección de oficina, planta, frío, riego y accesos remotos con prioridad en la continuidad operativa.'),
  ('planificacion-predictiva', 'Planificación y modelos predictivos', 'Previsión de cosecha y demanda, planificación de recursos y optimización de lotes, turnos y rutas.'),
  ('trazabilidad-y-calidad', 'Trazabilidad, calidad y cadena de frío', 'Conexión de origen, controles, temperatura y expedición para responder antes a clientes, calidad y auditorías.'),
]
for slug, name, desc in SERVICE_META:
    PAGES[f'servicios/{slug}/index.html'] = dict(path=f'/servicios/{slug}/', title=f'{name} | Neoda Solutions',
        desc=desc, ogtitle=f'{name} · Neoda Solutions', kind='service_detail', crumb=name)

FOOT_BRAND = 'Datos, IA y ciberseguridad para mejorar la rentabilidad y continuidad de empresas agroalimentarias.'
FOOT_SERV = ('<nav class="nf-col" aria-label="Servicios"><h3 data-en="Services">Servicios</h3><ul>'
             '<li><a href="/servicios/datos-y-operaciones/" data-en="Data and operations">Datos y operaciones</a></li>'
             '<li><a href="/servicios/vision-artificial/" data-en="Computer vision">Visión artificial</a></li>'
             '<li><a href="/servicios/agua-y-energia/" data-en="Water and energy">Agua y energía</a></li>'
             '<li><a href="/servicios/ciberseguridad-agroindustrial/" data-en="IT/OT cybersecurity">Ciberseguridad IT/OT</a></li>'
             '<li><a href="/servicios/planificacion-predictiva/" data-en="Predictive planning">Planificación predictiva</a></li>'
             '<li><a href="/servicios/trazabilidad-y-calidad/" data-en="Traceability and quality">Trazabilidad y calidad</a></li></ul></nav>')
FOOT_NAV = ('<nav class="nf-col" aria-label="Navegación"><h3 data-en="Navigation">Navegación</h3><ul>'
            '<li><a href="/servicios/" data-en="Services">Servicios</a></li><li><a href="/sectores/" data-en="Sectors">Sectores</a></li>'
            '<li><a href="/#casos" data-en="Use cases">Casos de uso</a></li><li><a href="/insights/">Insights</a></li>'
            '<li><a href="/nosotros/" data-en="About">Nosotros</a></li></ul></nav>')

def servicios_graph(s, url):
    services = [{"@type": "Service", "name": name, "description": desc, "serviceType": name,
                 "url": SITE + f"/servicios/{slug}/", "provider": {"@id": ORG_ID},
                 "areaServed": {"@type": "Country", "name": "España"}} for slug, name, desc in SERVICE_META]
    faqs = [{"@type": "Question", "name": text(q), "acceptedAnswer": {"@type": "Answer", "text": text(a)}}
            for q, a in re.findall(r'<details><summary[^>]*>(.*?)</summary><p[^>]*>(.*?)</p></details>', s, re.S)]
    assert len(services) == 6, len(services)
    assert len(faqs) == 5, len(faqs)
    return [
      {"@type": "WebPage", "@id": url, "url": url, "name": PAGES['servicios/index.html']['title'], "inLanguage": "es-ES",
       "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": ORG_ID}, "breadcrumb": {"@id": url + "#breadcrumb"}},
      crumbs([("Inicio", SITE + "/"), ("Servicios", url)]),
      {"@type": "ItemList", "name": "Servicios de Neoda Solutions", "numberOfItems": len(services),
       "itemListElement": [{"@type": "ListItem", "position": i + 1, "item": sv} for i, sv in enumerate(services)]},
      {"@type": "FAQPage", "@id": url + "#preguntas", "mainEntity": faqs},
      ORG]

for page, cfg in PAGES.items():
    p = ROOT + page
    s = open(p, encoding='utf-8').read()
    url = SITE + cfg['path']

    # 1) enlaces "Servicios" -> nueva página
    s = s.replace('href="/#servicios"', 'href="/servicios/"').replace('<li><a href="#servicios">Servicios</a></li>', '<li><a href="/servicios/">Servicios</a></li>')
    # 2) pie: descripción y columnas comunes
    s = re.sub(r'(<div class="nf-brand">\s*<a href="/" class="nf-logo">Neoda<span> Solutions</span></a>\s*<p[^>]*>)[^<]*(</p>)', r'\g<1>' + FOOT_BRAND + r'\g<2>', s)
    s = re.sub(r'(<div class="nf-brand">\s*<a class="nf-logo" href="/">Neoda<span> Solutions</span></a>\s*<p[^>]*>)[^<]*(</p>)', r'\g<1>' + FOOT_BRAND + r'\g<2>', s)
    s = re.sub(r'<nav class="nf-col" aria-label="Navegación">.*?</nav>', FOOT_NAV, s, flags=re.S)
    s = re.sub(r'<nav class="nf-col" aria-label="Servicios">.*?</nav>', FOOT_SERV, s, flags=re.S)
    header_end = s.find('</header>')
    if '<li><a href="/sectores/"' not in s[:header_end]:
        s = s.replace('<li><a href="/#casos" class="whitespace-nowrap', '<li><a href="/sectores/" class="whitespace-nowrap text-silver transition hover:text-white" data-en="Sectors">Sectores</a></li><li><a href="/#casos" class="whitespace-nowrap')
        s = s.replace('<li><a href="/#casos" class="block py-1', '<li><a href="/sectores/" class="block py-1 text-silver hover:text-white" data-en="Sectors">Sectores</a></li><li><a href="/#casos" class="block py-1')
    # 3) título y descripción
    if cfg['title']:
        s = re.sub(r'(<title[^>]*>)[^<]*(</title>)', r'\g<1>' + cfg['title'] + r'\g<2>', s, count=1)
    title = re.search(r'<title[^>]*>([^<]*)</title>', s).group(1)
    if re.search(r'<meta name="description" content="[^"]*"', s):
        s = re.sub(r'(<meta name="description" content=")[^"]*(")', r'\g<1>' + cfg['desc'] + r'\g<2>', s, count=1)
    else:
        s = s.replace('</title>\n', '</title>\n<meta name="description" content="' + cfg['desc'] + '">\n', 1)
    # 4) bloque SEO (se regenera completo cada vez)
    s = re.sub(r'\n?<!--SEO-->.*?<!--/SEO-->\n?', '\n<!--SEO-->\n', s, flags=re.S)
    if '<!--SEO-->' not in s:
        s = re.sub(r'(<meta name="description" content="[^"]*">\n)', r'\1<!--SEO-->\n', s, count=1)
    tags = [f'<link rel="canonical" href="{url}">',
            '<meta property="og:type" content="website">',
            '<meta property="og:site_name" content="Neoda Solutions">',
            '<meta property="og:locale" content="es_ES">',
            f'<meta property="og:title" content="{cfg["ogtitle"]}">',
            f'<meta property="og:description" content="{cfg["desc"]}">',
            f'<meta property="og:url" content="{url}">',
            f'<meta property="og:image" content="{OG_IMG}">',
            '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">',
            '<meta property="og:image:alt" content="Neoda Solutions · Datos, IA y software para el sector agroalimentario">',
            '<meta name="twitter:card" content="summary_large_image">']
    graph = None
    if cfg['kind'] == 'home':
        graph = [WEBSITE, ORG, {"@type": "WebPage", "@id": url, "url": url, "name": title, "inLanguage": "es-ES",
                                 "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": ORG_ID}}]
    elif cfg['kind'] == 'servicios':
        graph = servicios_graph(s, url)
    elif cfg['kind'] == 'service_detail':
        graph = [
          {"@type": "WebPage", "@id": url, "url": url, "name": title, "inLanguage": "es-ES",
           "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": ORG_ID}, "breadcrumb": {"@id": url + "#breadcrumb"}},
          crumbs([("Inicio", SITE + "/"), ("Servicios", SITE + "/servicios/"), (cfg['crumb'], url)]),
          {"@type": "Service", "name": cfg['crumb'], "description": cfg['desc'], "serviceType": cfg['crumb'],
           "url": url, "provider": {"@id": ORG_ID}, "areaServed": {"@type": "Country", "name": "España"}}, ORG]
    elif cfg['kind'] in ('about', 'page'):
        graph = [{"@type": "AboutPage" if cfg['kind'] == 'about' else "WebPage", "@id": url, "url": url, "name": title, "inLanguage": "es-ES",
                  "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": ORG_ID}, "breadcrumb": {"@id": url + "#breadcrumb"}},
                 crumbs([("Inicio", SITE + "/"), (cfg['crumb'], url)]), ORG]
    block = '\n'.join(tags)
    if graph:
        block += '\n<script type="application/ld+json">' + json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(',', ':')) + '</script>'
    s = s.replace('<!--SEO-->\n', '<!--SEO-->\n' + block + '\n<!--/SEO-->\n', 1)
    open(p, 'w', encoding='utf-8').write(s)
    print(page, '|', title, '|', len(cfg['desc']), 'car. descripción')
