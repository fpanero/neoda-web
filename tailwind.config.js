/* Configuración de Tailwind CSS (v3.4.17) del sitio Neoda Solutions.
   Los tokens de diseño son los mismos que antes se cargaban por Play CDN.
   Tras cambiar clases o tokens: npm run build:css */
module.exports = {
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        eggplant: { 900: '#1A1524', 850: '#1E1829', 800: '#221C2E' }, // fondo institucional
        ink:      { DEFAULT: '#0C0B10', 900: '#0C0B10', 800: '#131118' }, // negro de contraste (uso puntual)
        paper:    { DEFAULT: '#F3F2F5', line: '#DCD9E0' },               // blanco de contraste (una sola banda)
        lavender: { DEFAULT: '#5F5675', hover: '#6E6487', line: '#8A80A3', glow: '#B9AFD3' },
        steel:    { 500: '#524C59', 600: '#443E4C', 700: '#35303E' },
        silver:   '#AFAAB5',
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
