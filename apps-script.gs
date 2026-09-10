/**
 * Incolla questo codice in Estensioni > Apps Script del tuo Google Sheet.
 * Gestisce commenti, voti e i dati della Timeline, salvandoli in fogli
 * separati ("Commenti", "Voti", "TimelineData") creati automaticamente
 * al primo utilizzo.
 *
 * Dopo aver incollato/aggiornato questo codice, ricorda di ripubblicarlo:
 * Distribuisci > Gestisci distribuzioni > icona matita > Versione: Nuova > Distribuisci.
 * Cosi' l'URL del Web App resta lo stesso (quello gia' in config.js).
 */

function doGet(e) {
  var action = e.parameter.action;

  if (action === "getTimeline") {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("TimelineData");
    var raw = sheet ? sheet.getRange("A1").getValue() : "";
    var json = raw && String(raw).trim() ? String(raw) : JSON.stringify({ projects: [], phases: [] });
    return ContentService
      .createTextOutput(json)
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "error", message: "unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet;

  if (data.tipo === "voto") {
    // "ordine" e' un array di titoli, dal piu' gradito al meno gradito
    // (viene dalla pagina voto.html con l'ordinamento a trascinamento).
    // Se cambi il numero di opzioni in opzioni-voto.js, aggiorna anche
    // l'intestazione qui sotto (aggiungi/togli "N° posto").
    sheet = ss.getSheetByName("Voti");
    if (!sheet) {
      sheet = ss.insertSheet("Voti");
      sheet.appendRow(["timestamp", "1° posto", "2° posto", "3° posto", "4° posto", "5° posto"]);
    }
    var ordine = data.ordine || [];
    sheet.appendRow([new Date()].concat(ordine));

  } else if (data.tipo === "timeline") {
    sheet = ss.getSheetByName("TimelineData");
    if (!sheet) {
      sheet = ss.insertSheet("TimelineData");
    }
    sheet.getRange("A1").setValue(JSON.stringify(data.payload || {}));
    sheet.getRange("B1").setValue(new Date());

  } else {
    sheet = ss.getSheetByName("Commenti");
    if (!sheet) {
      sheet = ss.insertSheet("Commenti");
      sheet.appendRow(["timestamp", "nome", "commento"]);
    }
    sheet.appendRow([new Date(), data.nome || "", data.commento || ""]);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
