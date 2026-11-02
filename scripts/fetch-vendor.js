// Copia a la carpeta del sitio las dependencias de terceros (Three.js y fuentes),
// para que el sitio no dependa de CDN ni de Google Fonts.
// Uso: npm install && npm run vendor:fetch
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Hashes SHA-256 fijados de los ficheros vendor. Si cambian, la descarga se detiene:
// no se sirve nada que no sea exactamente la versión revisada.
const PINNED = {
  'three.r128.min.js': '9274bbcec8d96168626c732b5d31c775aa8cfb7eaa0599bec0c175908a2c1ce2',
};
function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}
const root = path.join(__dirname, '..');
const nm = (...p) => path.join(root, 'node_modules', ...p);
const out = (...p) => path.join(root, 'assets', ...p);

fs.mkdirSync(out('js', 'vendor'), { recursive: true });
fs.mkdirSync(out('fonts'), { recursive: true });

// 1) Three.js r128 (misma versión que se usaba desde cdnjs)
const threeDest = out('js', 'vendor', 'three.r128.min.js');
fs.copyFileSync(nm('three', 'build', 'three.min.js'), threeDest);
const h = sha256(threeDest);
if (PINNED['three.r128.min.js'] !== h) {
  console.error('SHA-256 de three.r128.min.js inesperado: ' + h + '. Revisa antes de usarlo.');
  process.exit(1);
}

// 2) Fuentes: solo los pesos que usa el sitio, en los subconjuntos latin y latin-ext.
const families = [
  { pkg: 'inter-tight', weights: [500, 600, 700] },
  { pkg: 'inter', weights: [400, 500, 600] },
  { pkg: 'jetbrains-mono', weights: [400, 500] },
];
let css = '/* Fuentes autoalojadas (SIL Open Font License). Generado por scripts/fetch-vendor.js */\n';
for (const { pkg, weights } of families) {
  for (const w of weights) {
    // Cada peso tiene su CSS en el paquete (p. ej. 500.css), con un @font-face por subconjunto.
    const weightCss = fs.readFileSync(nm('@fontsource', pkg, `${w}.css`), 'utf8');
    const blocks = weightCss.split('@font-face').slice(1).map(b => '@font-face' + b.split('}')[0] + '}');
    for (const block of blocks) {
      if (/font-style:\s*italic/.test(block)) continue;
      const file = (block.match(/url\(\.\/files\/([^)]+\.woff2)\)/) || [])[1];
      // Solo subconjuntos latin y latin-ext (cubren el español); se descartan cyrillic, greek, vietnamese.
      if (!file || !/-(latin|latin-ext)-\d+-normal\.woff2$/.test(file)) continue;
      fs.copyFileSync(nm('@fontsource', pkg, 'files', file), out('fonts', file));
      css += block.replace(/url\(\.\/files\/([^)]+)\)[^;]*;/, `url(../fonts/$1) format('woff2');`) + '\n';
    }
  }
}
fs.writeFileSync(out('css', 'fonts.css'), css);
console.log('Vendor listo: three r128 + fuentes en assets/');
