/* Configuración de Tailwind CSS (v3.4.17) del sitio Neoda Solutions.
   Los tokens de diseño son los mismos que antes se cargaban por Play CDN.
   Tras cambiar clases o tokens: npm run build:css */
module.exports = {
  content: [
    './index.html',
    './nosotros/index.html',
    './insights/index.html',
    './servicios/**/*.html',
    './sectores/index.html',
    './diagnostico/index.html',
    './privacidad/index.html',
    './aviso-legal/index.html',
    './cookies/index.html',
    './assets/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        eggplant: { 900: '#142B22', 850: '#19382B', 800: '#214333' },
        ink:      { DEFAULT: '#0D1F18', 900: '#0D1F18', 800: '#142A21' },
        paper:    { DEFAULT: '#F3F0E6', line: '#D9D4C3' },
        lavender: { DEFAULT: '#C9A45C', hover: '#DCBC78', line: '#8FAF7B', glow: '#C5DAA5' },
        steel:    { 500: '#72887B', 600: '#3F594A', 700: '#2B4436' },
        silver:   '#B7C4BA',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.035em' },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
