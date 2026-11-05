/* Configuración de Tailwind CSS (v3.4.17) del sitio Neoda Solutions.
   Los tokens de diseño son los mismos que antes se cargaban por Play CDN.
   Tras cambiar clases o tokens: npm run build:css */
module.exports = {
  content: [
    './index.html',
    './nosotros/index.html',
    './insights/index.html',
    './servicios/index.html',
    './diagnostico/index.html',
    './privacidad/index.html',
    './aviso-legal/index.html',
    './cookies/index.html',
    './assets/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        eggplant: { 900: '#191621', 850: '#1D1926', 800: '#211D2A' }, // fondo institucional
        ink:      { DEFAULT: '#0C0B10', 900: '#0C0B10', 800: '#121117' }, // negro de contraste (uso puntual)
        paper:    { DEFAULT: '#F3F2F5', line: '#DCD9E0' },               // blanco de contraste (una sola banda)
        lavender: { DEFAULT: '#5F5675', hover: '#6E6487', line: '#8A80A3', glow: '#B9AFD3' },
        steel:    { 500: '#504D57', 600: '#423F49', 700: '#34313B' },
        silver:   '#AEABB3',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: { tightest: '-0.035em' },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
