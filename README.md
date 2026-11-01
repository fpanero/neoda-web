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
| `cookies.html` | Política de cookies: estado actual (sin cookies no técnicas) y categorías previstas si se añade analítica. |

## Tecnología

- HTML5 semántico y **Tailwind CSS** (CDN) en la home.
- **Three.js** (r128, CDN de cdnjs) para el hero, el anillo de la metodología y las escenas isométricas.
- Animaciones en **Canvas 2D** para las redes de nodos de fondo.
- Tipografías de **Google Fonts**: Inter, Inter Tight y JetBrains Mono.
- Sin backend ni base de datos. Es una web estática: se puede servir desde cualquier hosting.
- Respeta `prefers-reduced-motion`: sin él, las animaciones se detienen y el contenido se muestra completo.

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

- [ ] Razón social, NIF, domicilio y registro mercantil (marcados como `[PENDIENTE]` en las páginas legales y en el pie).
- [ ] Teléfono y dirección en el pie de página.
- [ ] Fechas de última actualización de las páginas legales.
- [ ] Casos de éxito: sustituir las cifras de ejemplo por datos verificados o marcarlos como ilustrativos.
- [ ] Logotipos oficiales de partners (AWS, Snowflake, Azure, CrowdStrike), respetando sus guías de marca.
- [ ] Sección de equipo con nombres, cargos y fotos.
- [ ] Conectar el formulario del whitepaper a un CRM o a un correo (ahora no envía nada).
- [ ] Revisión de los textos legales por asesoría jurídica.
- [ ] Verificar la marca «Neoda» frente a homónimos (existe otra empresa con un nombre muy parecido).

## Cómo actualizar

1. Edita el archivo correspondiente.
2. Sube los cambios a la rama `main`.
3. GitHub Pages publica la nueva versión en uno o dos minutos. Si no se ve, recarga con Ctrl + F5.

## Despliegue futuro

Cuando la web esté lista, los mismos archivos se suben a la carpeta `public_html` de Hostinger, junto con el dominio propio.

## Licencia y uso

© 2026 Neoda Solutions. Todos los derechos reservados. Código y contenidos de uso interno mientras la web está en desarrollo.
