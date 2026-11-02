// Comprobaciones de seguridad del sitio estático. Uso: npm run check
// Falla (código 1) si hay scripts inline, recursos de terceros, enlaces target=_blank sin noopener,
// una CSP en <meta> que no va antes de los recursos, o una CSP distinta entre .htaccess y las metas.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const pages = ['index.html', ...fs.readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('.') && d.name !== 'node_modules' && d.name !== 'scripts' && d.name !== 'assets')
  .map(d => d.name + '/index.html')
  .filter(f => fs.existsSync(path.join(root, f)))];
const errors = [];
const info = [];

const directives = s => new Set(s.split(';').map(d => d.trim()).filter(Boolean));
const htaccess = fs.readFileSync(path.join(root, '.htaccess'), 'utf8');
const htCsp = (htaccess.match(/Header always set Content-Security-Policy "([^"]+)"/) || [])[1];
if (!htCsp) errors.push('.htaccess: falta la cabecera Content-Security-Policy');

for (const page of pages) {
  const s = fs.readFileSync(path.join(root, page), 'utf8');
  const withoutComments = s.replace(/<!--[\s\S]*?-->/g, '');
  if (/<script(?![^>]*\ssrc=)[^>]*>/i.test(withoutComments)) errors.push(`${page}: script inline`);
  if (/<(script|link)\b[^>]*\b(src|href)\s*=\s*["']https?:\/\//i.test(withoutComments)) errors.push(`${page}: recurso externo en script/link`);
  for (const a of withoutComments.match(/<a\b[^>]*target="_blank"[^>]*>/gi) || []) {
    if (!/rel="[^"]*noopener[^"]*"/.test(a)) errors.push(`${page}: enlace target=_blank sin rel="noopener noreferrer"`);
  }
  const meta = (withoutComments.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1];
  if (!meta) {
    errors.push(`${page}: falta la CSP en <meta>`);
  } else {
    const firstResource = withoutComments.search(/<(link|script)\b/i);
    const metaPos = withoutComments.indexOf('Content-Security-Policy');
    if (firstResource !== -1 && metaPos > firstResource) errors.push(`${page}: la CSP llega después de un recurso`);
    if (htCsp) {
      const a = directives(meta), b = directives(htCsp);
      b.delete("frame-ancestors 'none'"); // los navegadores ignoran frame-ancestors en <meta>
      const diff = [...a].filter(x => !b.has(x)).concat([...b].filter(x => !a.has(x)));
      if (diff.length) errors.push(`${page}: la CSP de <meta> no coincide con .htaccess: ${diff.join(' | ')}`);
    }
  }
  if (/name="robots"\s+content="noindex/i.test(s)) info.push(`${page}: noindex activo (quitar antes del lanzamiento)`);
}
const hsts = (htaccess.match(/Strict-Transport-Security "([^"]+)"/) || [])[1] || '';
if (/includeSubDomains|preload/.test(hsts)) {
  info.push('.htaccess: HSTS con includeSubDomains/preload. Revisar antes de activar');
}
console.log(info.map(i => '  i ' + i).join('\n'));
if (errors.length) { console.error(errors.map(e => '  ✗ ' + e).join('\n')); process.exit(1); }
console.log(`OK: ${pages.length} páginas revisadas sin errores de seguridad.`);
