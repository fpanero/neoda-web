# Neoda Solutions · Web corporativa (V1)

Página de inicio y páginas legales de **Neoda Solutions**, consultoría boutique en **datos, inteligencia artificial y ciberseguridad** para comités de dirección.

**Ver la web:** https://fpanero.github.io/neoda-web/

> Versión de trabajo (V1). Algunos datos están pendientes de confirmar y las cifras de los casos de éxito son ilustrativas. No publicar en producción hasta completar la lista de pendientes.

## Contenido

| Archivo | Descripción |
|---|---|
| `index.html` (URL `/`) | Página de inicio: hero 3D, tecnologías, diagnóstico rápido, problema, las cuatro líneas de servicio con escenas isométricas, casos de uso ilustrativos, metodología animada, whitepaper y cierre. |
| `servicios/index.html` (URL `/servicios/`) | Página de servicios: cuatro líneas (datos, IA, software a medida, ciberseguridad) más formación, 17 servicios (incluido el CRM a medida, al que lleva el diagnóstico) con entregable y plazo orientativo, formas de contratar, proceso y preguntas frecuentes. |
| `aviso-legal/index.html` (URL `/aviso-legal/`) | Aviso legal (LSSI-CE): titular, condiciones de uso, propiedad intelectual, enlaces y jurisdicción. |
| `privacidad/index.html` (URL `/privacidad/`) | Política de privacidad (RGPD y LOPDGDD): finalidades, bases jurídicas, encargados, derechos y reclamación ante la AEPD. |
| `cookies/index.html` (URL `/cookies/`) | Política de cookies: estado actual (sin cookies; solo dos claves técnicas del navegador) y categorías previstas si se añade analítica. |
| `diagnostico/index.html` (URL `/diagnostico/`) | Diagnóstico de visibilidad (autoevaluación de 12 preguntas). Hoy el informe se genera en el navegador; no se envía ningún dato. |
| `nosotros/index.html` (URL `/nosotros/`) | Página Nosotros. |
| `robots.txt`, `sitemap.xml`, `security.txt`, `.well-known/security.txt`, `favicon.ico` | Rastreo, mapa del sitio y contacto de seguridad (ver «Seguridad» y «SEO»). |
| `img/og/neoda-og.jpg` | Imagen de 1200×630 que se muestra al compartir enlaces en redes y mensajería. |
| `.htaccess` | Reglas para Hostinger (Apache): HTTPS, HSTS, cabeceras, CSP y bloqueo de ficheros de desarrollo. |
| `assets/` | CSS compilado, fuentes, Three.js r128 y scripts propios (`assets/js/`). |

## Tecnología

- HTML5 semántico y **Tailwind CSS 3.4.17** compilado en local (`assets/css/site.css`). Ya no se usa el CDN de Tailwind.
- **Three.js r128** servido desde el propio sitio (`assets/js/vendor/`), solo en la home.
- Animaciones en **Canvas 2D** para las redes de nodos de fondo.
- Tipografías **Inter, Inter Tight y JetBrains Mono** servidas desde el propio sitio (`assets/fonts/`). Ya no se cargan de Google Fonts.
- Todo el JavaScript está en ficheros externos (`assets/js/`): la web no usa scripts inline, lo que permite una Content-Security-Policy estricta.
- Sin backend ni base de datos. Es una web estática: se puede servir desde cualquier hosting.
- Respeta `prefers-reduced-motion`: sin él, las animaciones se detienen y el contenido se muestra completo.

## URLs y rutas

- Cada página secundaria vive en su carpeta con un `index.html` dentro, para que la URL sea `/nosotros/` y no `/nosotros.html`.
- Todos los enlaces y recursos usan rutas absolutas (`/assets/...`, `/nosotros/`). Así funcionan desde cualquier carpeta, pero el sitio debe publicarse en la raíz del dominio (`neodasolutions.com`), no en una subcarpeta.
- En **Hostinger**, el `.htaccess` redirige con 301 las URLs antiguas (`/nosotros.html`, `/index.html`).
- En **GitHub Pages** no hay redirecciones propias: las URLs antiguas con `.html` dan 404. Como el sitio aún no está lanzado, no hay enlaces públicos que las rompan.
- GitHub Pages redirige `/nosotros` a `/nosotros/` automáticamente.

## Mantenimiento técnico

Solo hace falta Node.js para regenerar el CSS o actualizar las dependencias. El sitio final no necesita Node.

```bash
npm install            # instala Tailwind, Three.js y las fuentes fijadas en package.json
npm run vendor:fetch   # copia Three.js r128 y las fuentes a assets/
npm run build:css      # recompila assets/css/site.css tras cambiar clases o colores
```

- Tras añadir clases nuevas en el HTML o en `assets/js/`, ejecuta `npm run build:css`. Tailwind solo genera las clases que encuentra en esos ficheros.
- Los colores y tipografías están en `tailwind.config.js`.
- **Idioma ES/EN**: el selector de cabecera (`.lang`) está en todas las páginas. La lógica y el diccionario de inglés están en `assets/js/i18n.js`; las claves son los textos en español tal cual aparecen en el HTML. Para añadir o cambiar un texto, edita el HTML en español y añade su traducción en ese diccionario. "Neoda Solutions" nunca se traduce. Los textos generados por `assets/js/diagnostico.js` usan `tr()` y se traducen con las mismas claves.
- **SEO**: `npm run seo` regenera en todas las páginas el título, la descripción, el canonical, las etiquetas Open Graph y los datos estructurados (JSON-LD). El JSON-LD de `/servicios/` se construye leyendo los servicios y las preguntas frecuentes del propio HTML: **ejecútalo después de cambiar esos textos**. Los títulos y descripciones están al principio de `scripts/seo.py`; su traducción al inglés va en el mapa `HEAD` de `assets/js/i18n.js`.
- Versiones fijadas: Tailwind 3.4.17, Three.js 0.128.0 (r128) y @fontsource 5.1.0. Cambiar de versión puede romper shaders o clases: revisa la web antes de subirla.

## SEO

- **Palabras clave por página:** la home apunta a «consultoría de datos», «consultoría de inteligencia artificial» y «consultora de datos e IA para pymes». `/servicios/` tiene un H2 por línea y un H3 por servicio con su búsqueda principal (analítica de datos y cuadros de mando, automatización de procesos con IA, desarrollo de software a medida, adecuación al RGPD, pentesting…). No se ha usado una herramienta de volumen de búsqueda: conviene validarlas con Google Search Console tras el lanzamiento.
- **Un solo H1 por página**, con la palabra clave principal. Los demás títulos son H2/H3 en orden.
- **Datos estructurados:** `Organization` y `WebSite` (home), `Service`, `ItemList`, `BreadcrumbList` y `FAQPage` (servicios), `AboutPage` (nosotros). Son bloques `<script type="application/ld+json">`: no se ejecutan, así que no afectan a la CSP. `npm run check` los valida como JSON y no los cuenta como scripts inline.
- **Idioma:** la versión en inglés se genera en el navegador sobre la misma URL, así que Google indexa la versión en español. Si más adelante queréis posicionar en inglés, hace falta una URL propia por idioma (por ejemplo `/en/`) con etiquetas `hreflang`.
- **Casos de uso:** son escenarios ilustrativos y lo dicen en la página. Cuando haya clientes, sustituirlos por casos reales con su permiso: es la señal de confianza que más pesa.

## Seguridad

Lo que hay ahora, y sus límites:

- **Content-Security-Policy:** cada página lleva una `<meta http-equiv="Content-Security-Policy">` colocada antes de cualquier recurso. Impide scripts de terceros y scripts inline (`script-src 'self'`). **No es una CSP estricta:** `style-src` incluye `'unsafe-inline'` porque las páginas usan bloques `<style>` y estilos en atributos generados por JS. Quitarlo exige mover esos estilos a ficheros CSS, y no está hecho.
- **Lo que solo existe en Hostinger:** el `.htaccess` envía las cabeceras reales (HSTS, `X-Frame-Options`, `Permissions-Policy`, COOP/CORP, CSP con `frame-ancestors 'none'` y redirección a HTTPS). **En GitHub Pages no hay cabeceras propias**: no hay protección contra clickjacking ni HSTS real, y `frame-ancestors` se ignora en la meta. Mientras el sitio esté en Pages, la postura es más débil de lo que sugieren las cabeceras.
- **HSTS:** `max-age=31536000` sin `includeSubDomains` ni `preload`, para no afectar a subdominios (correo, etc.). El `preload` se valorará solo cuando el HTTPS sea estable: es difícil de revertir.
- **CSP duplicada:** `.htaccess` y la meta usan la misma política. La única diferencia es `frame-ancestors`, que la meta no admite. `npm run check` comprueba que coinciden.
- **Sin JavaScript:** los formularios se ocultan y se muestra un aviso `<noscript>`. Así no se envía ningún dato por la URL ni se recarga la página con datos.
- **Formularios:** las validaciones, el honeypot (campo oculto anti-bot) y el consentimiento marcado son **solo de interfaz**. Un honeypot sin backend no protege nada, y un consentimiento solo en el navegador no permite demostrar que se dio. Hasta que haya Brevo o un CRM con registro en servidor, son un aviso para el usuario, no un control.
- **Datos del usuario:** el nombre de empresa del análisis viaja en `sessionStorage`, no en la URL. Todo texto que procede del usuario se inserta con `textContent` o con `esc()`.
- **Dependencias de terceros:** Three.js r128 y las fuentes van en `assets/`. El script `npm run vendor:fetch` comprueba el SHA-256 del fichero antes de copiarlo y se detiene si no coincide. Ni el despliegue ni el build lo ejecutan.
- **Caché:** las fuentes y `three.r128.min.js` tienen caché larga e `immutable` en el `.htaccess`. Si cambian, hay que renombrarlos (por ejemplo, `three.r129.min.js`), no sobrescribirlos.
- **Whitepaper:** el PDF es público en `whitepaper.pdf`. La puerta del formulario se puede saltar. Si el documento debe ser de acceso restringido, habrá que servirlo tras autenticación en servidor.
- **Diagnóstico:** la puerta del informe también es solo de interfaz. Hoy no envía nada a ningún sitio.
- **Contacto de seguridad:** `security.txt` está en `/.well-known/` y en la raíz. La línea `Policy` está comentada hasta que exista una URL. Renueva `Expires` al menos una vez al año.

### Comprobación automática

```bash
npm run check
```

Falla si hay scripts inline, recursos de terceros, enlaces `target="_blank"` sin `noopener`, una CSP que llega después de un recurso o que no coincide con el `.htaccess`. Muestra también las páginas que siguen con `noindex`.

### Antes del lanzamiento (en este orden)

1. **Quitar `noindex`:** borra `<meta name="robots" content="noindex,nofollow">` de cada `.html` (busca `noindex`). Si no, Google no indexará nada. `robots.txt` debe seguir con `Allow: /`, no con `Disallow`, para que los buscadores lean la meta antes de quitarla.
2. **Activar HTTPS:** en GitHub Pages, marca **Enforce HTTPS** y confirma que la privacidad lo afirma. Si el sitio ya está en Hostinger, la redirección 301 lo hace el `.htaccess`.
3. **Subir el `.htaccess` a Hostinger** (es un fichero oculto) y verificar las cabeceras con `curl -I https://neodasolutions.com` o securityheaders.com.
4. **Ejecutar `npm run check`** y que no haya errores.
5. **Dar de alta el sitio en Google Search Console y en Bing Webmaster Tools**, enviar `https://neodasolutions.com/sitemap.xml` y revisar los resultados enriquecidos con la prueba de Google.
6. **Buscar marcadores pendientes:** `grep -r "PENDIENTE" *.html`. Cada uno debe estar resuelto o validado por asesoría jurídica.
7. **Verificar en el navegador:** consola sin `Refused to…`, pestaña Red sin peticiones externas, y el flujo completo del diagnóstico.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| Fondo institucional | `#1A1524` / `#221C2E` | Secciones principales |
| Negro de contraste | `#0C0B10` | Hero, partners, pie y cierre |
| Lavanda (acento) | `#5F5675` | Botones y CTA |
| Lavanda claro | `#B9AFD3` | Etiquetas y detalles |
| Acero / plomo | `#35303E` – `#524C59` | Tarjetas y bordes |
| Gris plata | `#AFAAB5` | Texto de cuerpo |
| Blanco | `#FFFFFF` / `#F3F2F5` | Titulares y una banda clara |

## Pendientes antes de publicar

- [ ] Activar **Enforce HTTPS** en GitHub Pages y confirmarlo (la privacidad lo afirma).
- [ ] Valorar la inclusión en la lista de precarga de HSTS (`preload`) solo cuando el HTTPS sea estable; es difícil de revertir.
- [ ] Revisión jurídica del consentimiento del whitepaper y del diagnóstico, de la base de las claves `neoda-lang` y `neoda-empresa`, y de las transferencias por proveedor.
- [ ] Razón social, NIF, domicilio y registro mercantil (marcados como `[PENDIENTE]` en las páginas legales y en el pie).
- [ ] Teléfono y dirección en el pie de página.
- [ ] Fechas de última actualización de las páginas legales.
- [ ] Casos de uso: hoy son escenarios ilustrativos sin cifras. Sustituir por casos reales, con permiso del cliente, cuando los haya.
- [ ] Confirmar las tecnologías de la banda (Python, Power BI, Azure, AWS, PostgreSQL, n8n) y, si se usan logotipos, respetar sus guías de marca.
- [ ] Revisar los plazos orientativos de cada servicio en `/servicios/` y confirmar el partner de pentesting.
- [ ] Confirmar el dominio del correo (`contacto@neoda.com` frente a `neodasolutions.com`).
- [ ] Sección de equipo: nombres, fotos y enlaces de LinkedIn de las tres personas (los cargos ya están).
- [ ] Conectar el formulario del whitepaper y el informe del diagnóstico a Brevo o a un CRM, con validación en servidor (ahora no envían nada).
- [ ] Revisión de los textos legales por asesoría jurídica.
- [ ] Verificar la marca «Neoda» frente a homónimos (existe otra empresa con un nombre muy parecido).

## Cómo actualizar

1. Edita el archivo correspondiente.
2. Si cambias clases de Tailwind, ejecuta `npm run build:css`.
3. Sube los cambios a la rama `main`.
4. GitHub Pages publica la nueva versión en uno o dos minutos. Si no se ve, recarga con Ctrl + F5.

## Despliegue futuro

Cuando la web esté lista, los mismos archivos se suben a la carpeta `public_html` de Hostinger, junto con el dominio propio. Sube también el `.htaccess` (es un fichero oculto; en el administrador de ficheros hay que mostrar los ocultos). No subas `node_modules`, `scripts`, `package*.json`, `tailwind.config.js` ni `.git`.

## Licencia y uso

© 2026 Neoda Solutions. Todos los derechos reservados. Código y contenidos de uso interno mientras la web está en desarrollo.
