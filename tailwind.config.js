/* Configuración de Tailwind CSS (v3.4.17) del sitio Neoda Solutions.
   Los tokens de diseño son los mismos que antes se cargaban por Play CDN.
   Tras cambiar clases o tokens: npm run build:css */
module.exports = {
  content: [
    './index.html',
    './nosotros/index.html',
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
        eggplant: { 900: '#16171A', 850: '#1A1B1E', 800: '#1E1F22' }, // fondo institucional
        ink:      { DEFAULT: '#0C0B10', 900: '#0C0B10', 800: '#111215' }, // negro de contraste (uso puntual)
        paper:    { DEFAULT: '#F3F2F5', line: '#DCD9E0' },               // blanco de contraste (una sola banda)
        lavender: { DEFAULT: '#5F5675', hover: '#6E6487', line: '#8A80A3', glow: '#B9AFD3' },
        steel:    { 500: '#4D4E51', 600: '#3F4043', 700: '#313235' },
        silver:   '#ABACAF',
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
