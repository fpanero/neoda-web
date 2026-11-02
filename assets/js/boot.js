// Marca la página como "con JavaScript". Sin este fichero, los formularios quedan ocultos
// (ver tailwind.src.css) y se muestra el aviso <noscript>. Así no se envía nada por la URL.
document.documentElement.classList.add('js');
