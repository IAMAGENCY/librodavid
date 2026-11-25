# Bruna Magic Lab · Landing

Landing de libros infantiles personalizados, con el equipo de David (Ainhoa, Speed y Panda) animado.

- `bruna/index.html`: la página. Es el único archivo que se edita.
- `build.mjs`: genera `dist/` (documento completo + imágenes) a partir de `bruna/index.html`.
- `vercel.json`: Vercel ejecuta `node build.mjs` y publica `dist/`.

Probar el build en local:

```
node build.mjs
```

Cada push a `main` se despliega en https://bruna-magic-lab.vercel.app
