# Conectar la landing con Google Sheets

La landing envía a una hoja de cálculo cada contacto que deja su WhatsApp:

- en la tarjeta "Guarda tu cuento",
- en el pop-up de salida (guardar o Edición Mágica),
- y cuando alguien que ya dejó sus datos abre WhatsApp con su pedido.

## Pasos (unos 5 minutos)

1. En Google Drive crea una hoja de cálculo nueva, por ejemplo **"Leads Bruna Magic Lab"**.
2. Abre **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de `Codigo.gs`. Guarda.
4. Arriba a la derecha: **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquier usuario**.
5. Pulsa **Implementar** y autoriza el acceso con tu cuenta de Google.
6. Copia la **URL de la aplicación web** (termina en `/exec`).
7. Pégala en `bruna/index.html`, en la línea `var LEADS_URL = '';` (o envíasela a quien mantiene la página).
8. Publica el cambio (`git push`); Vercel lo despliega solo.

La primera vez que llegue un contacto se crea la pestaña **Leads** con estas columnas:

`fecha · origen · nombre · whatsapp · correo · autoriza_whatsapp · autoriza_correo · protagonista · edad · historia · estilo · aventura · libro · personajes · pagina`

### Qué significa "origen"

| origen | Dónde dejó sus datos |
|---|---|
| `guardar` | Tarjeta "Guarda tu cuento" en medio del recorrido |
| `salida-guardar` | Pop-up al intentar salir, cuando ya había empezado su cuento |
| `edicion-magica` | Pop-up al intentar salir, sin haber empezado (lista de la Edición Mágica) |
| `abrio-whatsapp` | Ya había dejado sus datos y luego abrió WhatsApp con su pedido |

## Notas

- Las **fotos nunca** llegan a la hoja; siguen yendo solo por WhatsApp.
- Usa en WhatsApp o correo solo a quienes tengan `sí` en la columna de autorización.
- Más adelante esta hoja se puede reemplazar por Kapso (WhatsApp) y Resend (correo) cambiando solo `LEADS_URL`.
