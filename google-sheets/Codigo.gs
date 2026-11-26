/**
 * Bruna Magic Lab · Recibe los contactos de la landing y los guarda en la hoja "Leads".
 * Se pega en Extensiones > Apps Script de la hoja de cálculo (ver LEEME.md).
 */
const SHEET_NAME = 'Leads';
const HEADERS = [
  'fecha', 'origen', 'nombre', 'whatsapp', 'correo', 'autoriza_whatsapp', 'autoriza_correo',
  'protagonista', 'edad', 'historia', 'estilo', 'aventura', 'libro', 'personajes', 'pagina', 'regalo'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow(HEADERS.map(function (h) { return clean(data[h]); }));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* Evita que un texto que empieza con = + - @ se ejecute como fórmula en la hoja */
function clean(value) {
  const text = value === undefined || value === null ? '' : String(value).slice(0, 500);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
