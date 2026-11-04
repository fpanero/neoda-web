# -*- coding: utf-8 -*-
"""SEO de todas las páginas: título, descripción, canonical, Open Graph y JSON-LD (Uso: npm run seo).
El JSON-LD de /servicios/ se genera leyendo los servicios y las preguntas frecuentes del propio HTML:
volver a ejecutarlo tras cambiar textos. También mantiene los enlaces a /servicios/ y la columna Servicios del pie."""
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
  "description": "Consultora boutique de datos, inteligencia artificial, software a medida y ciberseguridad para pymes y empresas medianas.",
  "areaServed": {"@type": "Country", "name": "España"},
  "knowsAbout": ["Analítica de datos", "Cuadros de mando", "Ingeniería de datos", "Gobierno del dato", "Ciencia de datos",
                 "Inteligencia artificial", "Automatización de procesos", "Agentes de IA", "Desarrollo de software a medida",
                 "Integración de sistemas", "Ciberseguridad", "RGPD", "NIS2", "Reglamento Europeo de IA"],
  "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Servicios de Neoda Solutions", "url": SITE + "/servicios/",
    "itemListElement": [
      {"@type": "OfferCatalog", "name": "Datos y analítica", "url": SITE + "/servicios/#datos"},
      {"@type": "OfferCatalog", "name": "Inteligencia artificial y automatización", "url": SITE + "/servicios/#ia"},
      {"@type": "OfferCatalog", "name": "Software a medida", "url": SITE + "/servicios/#software"},
      {"@type": "OfferCatalog", "name": "Ciberseguridad y cumplimiento", "url": SITE + "/servicios/#ciberseguridad"},
      {"@type": "OfferCatalog", "name": "Formación en datos e IA", "url": SITE + "/servicios/#formacion"}]}
}
WEBSITE = {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Neoda Solutions", "inLanguage": "es-ES", "publisher": {"@id": ORG_ID}}

def crumbs(items):
    return {"@type": "BreadcrumbList", "@id": items[-1][1] + "#breadcrumb", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": u} for i, (n, u) in enumerate(items)]}

def text(fragment):
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', fragment))).strip()

PAGES = {
  'index.html': dict(path='/', title='Consultoría de datos, IA y ciberseguridad | Neoda Solutions',
       desc='Consultora de datos e inteligencia artificial para pymes y empresas medianas: analítica, automatización con IA, software a medida y ciberseguridad.',
       ogtitle='Consultoría de datos, IA y ciberseguridad para pymes', kind='home'),
  'servicios/index.html': dict(path='/servicios/', title='Servicios de datos, IA y software a medida | Neoda Solutions',
       desc='Analítica de datos, inteligencia artificial, automatización, software a medida y ciberseguridad para pymes y empresas medianas, con alcance y precio cerrados.',
       ogtitle='Servicios de datos, IA, software a medida y ciberseguridad', kind='servicios', crumb='Servicios'),
  'nosotros/index.html': dict(path='/nosotros/', title='Nosotros: consultora boutique de datos e IA | Neoda Solutions',
       desc='Conoce a Neoda Solutions: una consultora boutique de datos, inteligencia artificial, software a medida y ciberseguridad para pymes y empresas medianas.',
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

FOOT_BRAND = 'Consultora boutique de datos, inteligencia artificial, software a medida y ciberseguridad para pymes y empresas medianas.'
FOOT_SERV = ('<nav class="nf-col" aria-label="Servicios"><h3>Servicios</h3><ul>'
             '<li><a href="/servicios/#datos">Datos y analítica</a></li><li><a href="/servicios/#ia">Inteligencia artificial</a></li>'
             '<li><a href="/servicios/#software">Software a medida</a></li><li><a href="/servicios/#ciberseguridad">Ciberseguridad</a></li></ul></nav>')

def servicios_graph(s, url):
    services = []
    for sec_id, block in re.findall(r'<section id="(datos|ia|software|ciberseguridad|formacion)" class="sv-line".*?>(.*?)</section>', s, re.S):
        line = text(re.search(r'<h2[^>]*>(.*?)</h2>', block, re.S).group(1))
        for h3, p in re.findall(r'<article class="sv-item[^"]*"[^>]*>\s*<h3>(.*?)</h3>\s*<p>(.*?)</p>', block, re.S):
            services.append({"@type": "Service", "name": text(h3), "description": text(p), "serviceType": line,
                             "url": url + "#" + sec_id, "provider": {"@id": ORG_ID}, "areaServed": {"@type": "Country", "name": "España"}})
    faqs = [{"@type": "Question", "name": text(q), "acceptedAnswer": {"@type": "Answer", "text": text(a)}}
            for q, a in re.findall(r'<details><summary>(.*?)</summary><p>(.*?)</p></details>', s, re.S)]
    assert len(services) == 16, len(services)
    assert len(faqs) == 8, len(faqs)
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
    # 2) pie: descripción y columna de servicios
    s = re.sub(r'(<div class="nf-brand">\s*<a href="/" class="nf-logo">Neoda<span> Solutions</span></a>\s*<p>)[^<]*(</p>)', r'\g<1>' + FOOT_BRAND + r'\g<2>', s)
    s = re.sub(r'<nav class="nf-col" aria-label="Capacidades">.*?</nav>', FOOT_SERV, s, flags=re.S)
    # 3) título y descripción
    if cfg['title']:
        s = re.sub(r'<title>[^<]*</title>', '<title>' + cfg['title'] + '</title>', s, count=1)
    title = re.search(r'<title>([^<]*)</title>', s).group(1)
    if re.search(r'<meta name="description" content="[^"]*">', s):
        s = re.sub(r'<meta name="description" content="[^"]*">', '<meta name="description" content="' + cfg['desc'] + '">', s, count=1)
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
            '<meta property="og:image:alt" content="Neoda Solutions · Datos, IA, software a medida y ciberseguridad">',
            '<meta name="twitter:card" content="summary_large_image">']
    graph = None
    if cfg['kind'] == 'home':
        graph = [WEBSITE, ORG, {"@type": "WebPage", "@id": url, "url": url, "name": title, "inLanguage": "es-ES",
                                 "isPartOf": {"@id": SITE + "/#website"}, "about": {"@id": ORG_ID}}]
    elif cfg['kind'] == 'servicios':
        graph = servicios_graph(s, url)
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
