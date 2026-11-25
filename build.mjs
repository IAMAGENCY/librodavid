// Genera dist/ para Vercel a partir de bruna/index.html (el mismo archivo que se publica como Artifact).
// Le agrega <!doctype>, <html lang="es">, <head> y <body>, y copia las imágenes que usa la página.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'bruna';
const OUT = 'dist';
const IMAGES = ['portada-david.jpg', 'mama-cuento.jpg'];

const page = readFileSync(join(SRC, 'index.html'), 'utf8');
const styleAt = page.indexOf('<style>');
if (styleAt < 0) throw new Error('No se encontró <style> en bruna/index.html');
const headPart = page.slice(0, styleAt).replace(/<meta name="claude:[^>]*>\s*/g, '');
const bodyStart = page.indexOf('</style>') + '</style>'.length;
const style = page.slice(styleAt, bodyStart);
const body = page.slice(bodyStart);

const favicon = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M6 10c6-3 11-2 14 1v24c-3-3-8-4-14-1Z" fill="#46BDF5" stroke="#2A2340" stroke-width="2.5" stroke-linejoin="round"/><path d="M34 10c-6-3-11-2-14 1v24c3-3 8-4 14-1Z" fill="#FFD23F" stroke="#2A2340" stroke-width="2.5" stroke-linejoin="round"/></svg>'
);

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${headPart.trim()}
<meta property="og:type" content="website">
<meta property="og:title" content="Bruna Magic Lab · Tu peque, protagonista de su propio cuento">
<meta property="og:description" content="Libros infantiles personalizados: 30 páginas ilustradas, pasta dura, entrega en 15 días.">
<meta property="og:url" content="https://bruna-magic-lab.vercel.app/">
<meta property="og:image" content="https://bruna-magic-lab.vercel.app/img/portada-david.jpg">
<meta name="theme-color" content="#E9F5FC">
<meta name="color-scheme" content="only light">
<link rel="icon" href="${favicon}">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${style}
</head>
<body>
${body.trim()}
</body>
</html>
`;

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'img'), { recursive: true });
writeFileSync(join(OUT, 'index.html'), html);
for (const f of IMAGES) copyFileSync(join(SRC, 'img', f), join(OUT, 'img', f));
console.log(`dist/ listo: index.html + ${IMAGES.length} imágenes`);
