/**
 * Incolla questo codice in Estensioni > Apps Script del tuo Google Sheet.
 * Gestisce sia i commenti che i voti, salvandoli in due fogli separati:
 * "Commenti" e "Voti" (creati automaticamente al primo invio).
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet;

  if (data.tipo === "voto") {
    sheet = ss.getSheetByName("Voti");
    if (!sheet) {
      sheet = ss.insertSheet("Voti");
      sheet.appendRow(["timestamp", "opzione"]);
    }
    sheet.appendRow([new Date(), data.opzione || ""]);
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
