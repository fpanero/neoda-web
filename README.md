# Neoda Solutions · Web corporativa (V1)

Página de inicio y páginas legales de **Neoda Solutions**, consultoría boutique en **datos, inteligencia artificial y ciberseguridad** para comités de dirección.

**Ver la web:** https://fpanero.github.io/neoda-web/

> Versión de trabajo (V1). Algunos datos están pendientes de confirmar y las cifras de los casos de éxito son ilustrativas. No publicar en producción hasta completar la lista de pendientes.

## Contenido

| Archivo | Descripción |
|---|---|
| `index.html` | Página de inicio: hero 3D, partners, problema, pilares con escenas isométricas, casos, metodología animada, whitepaper y cierre. |
| `aviso-legal.html` | Aviso legal (LSSI-CE): titular, condiciones de uso, propiedad intelectual, enlaces y jurisdicción. |
| `privacidad.html` | Política de privacidad (RGPD y LOPDGDD): finalidades, bases jurídicas, encargados, derechos y reclamación ante la AEPD. |
| `cookies.html` | Política de cookies: estado actual (sin cookies; solo dos claves técnicas del navegador) y categorías previstas si se añade analítica. |
| `diagnostico.html` | Diagnóstico de visibilidad (autoevaluación de 12 preguntas). Hoy el informe se genera en el navegador; no se envía ningún dato. |
| `nosotros.html` | Página Nosotros. |
| `robots.txt`, `security.txt`, `.well-known/security.txt` | Rastreo y contacto de seguridad (ver «Seguridad»). |
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

## Mantenimiento técnico

Solo hace falta Node.js para regenerar el CSS o actualizar las dependencias. El sitio final no necesita Node.

```bash
npm install            # instala Tailwind, Three.js y las fuentes fijadas en package.json
npm run vendor:fetch   # copia Three.js r128 y las fuentes a assets/
npm run build:css      # recompila assets/css/site.css tras cambiar clases o colores
```

- Tras añadir clases nuevas en el HTML o en `assets/js/`, ejecuta `npm run build:css`. Tailwind solo genera las clases que encuentra en esos ficheros.
- Los colores y tipografías están en `tailwind.config.js`.
- Versiones fijadas: Tailwind 3.4.17, Three.js 0.128.0 (r128) y @fontsource 5.1.0. Cambiar de versión puede romper shaders o clases: revisa la web antes de subirla.

## Seguridad

- **Content-Security-Policy**: cada página lleva una `<meta http-equiv="Content-Security-Policy">` estricta (`script-src 'self'`, sin CDN, sin scripts inline). En **Hostinger**, el `.htaccess` envía además las cabeceras reales (HSTS, `X-Frame-Options`, `Permissions-Policy`, COOP/CORP, CSP y redirección a HTTPS). GitHub Pages no permite cabeceras propias, por eso la meta es la protección vigente allí.
- **`frame-ancestors`** no funciona en una meta: solo se aplica por cabecera HTTP (`.htaccess` en Hostinger).
- **Formularios**: las validaciones son solo de interfaz. Cuando se conecte Brevo o un CRM, la validación, el límite de envíos y el registro del consentimiento deben hacerse en servidor, por HTTPS. Los formularios tienen un campo oculto anti-bot (honeypot).
- **Datos del usuario**: el nombre de empresa del análisis viaja en `sessionStorage`, no en la URL. Todo texto procedente del usuario se inserta con `textContent` o con la función `esc()`.
- **Whitepaper**: el PDF es público en `whitepaper.pdf`. La puerta del formulario es solo de interfaz y se puede saltar. Si el documento debe ser de acceso restringido, habrá que servirlo tras autenticación en servidor.
- **Diagnóstico**: la «puerta» del informe también es solo de interfaz. Hoy no envía nada.
- **Seguridad de contacto**: `security.txt` (en `/.well-known/` y en la raíz). Antes de publicar, rellena la línea `Policy` o quítala, y renueva la fecha `Expires` al menos una vez al año.

### Noindex temporal

Mientras haya datos `[PENDIENTE]` o cifras de ejemplo, todas las páginas llevan `<meta name="robots" content="noindex,nofollow">` y `robots.txt` permite el rastreo para que los buscadores lean esa meta.

**Para quitarlo al publicar:**

1. Borra la línea `<meta name="robots" content="noindex,nofollow">` de cada `.html` (busca `noindex`).
2. Añade `Sitemap: https://neodasolutions.com/sitemap.xml` a `robots.txt` si creas el mapa del sitio.
3. Confirma que no quedan marcadores `[PENDIENTE` en las páginas (`grep -r "PENDIENTE" *.html`).

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
- [ ] Casos de éxito: sustituir las cifras de ejemplo por datos verificados o marcarlos como ilustrativos.
- [ ] Logotipos oficiales de partners (AWS, Snowflake, Azure, CrowdStrike), respetando sus guías de marca.
- [ ] Sección de equipo con nombres, cargos y fotos.
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
