/**
 * AVO TRANSPORTATION — LEAD CAPTURE BACKEND
 * ----------------------------------------------------------------
 * This script runs inside a Google Sheet you own and accepts form
 * submissions from the AVO website. Every lead appears as a new
 * row in the sheet AND triggers an email notification.
 *
 * ONE-TIME SETUP
 * --------------
 *  1.  Open a new Google Sheet ( https://sheets.new ) and rename
 *      it something like "AVO Leads".
 *
 *  2.  Extensions  →  Apps Script. A new tab opens.
 *
 *  3.  Delete the placeholder code, paste THIS file's contents in.
 *
 *  4.  Click  💾 Save  (top toolbar).
 *
 *  5.  Click  Deploy  →  New deployment.
 *        - Click the gear ⚙ next to "Select type", choose  Web app.
 *        - Description:  AVO lead capture
 *        - Execute as:  Me  (your Google account)
 *        - Who has access:  Anyone        ← important
 *      Click  Deploy.
 *
 *  6.  Google will ask for permission the first time. Click
 *      "Authorize access", pick your Google account, click
 *      "Advanced" → "Go to (unsafe)" → Allow. (This warning is
 *      normal for personal Apps Script projects.)
 *
 *  7.  You'll see a  Web app URL  ending in  /exec  — copy it.
 *
 *  8.  In every  .html  file of the website, find this line:
 *           const AVO_FORM_ENDPOINT = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
 *      Replace the placeholder with the Web app URL.
 *      Commit and push.
 *
 *  9.  Send one test submission through the website and confirm
 *      a new row appears in the sheet (and you get an email).
 *
 * UPDATING THE SCRIPT LATER
 * -------------------------
 *  If you edit this script, you must  Deploy  →  Manage deployments
 *  →  pencil icon  →  Version: New version  →  Deploy.
 *  The Web app URL stays the same.
 * ----------------------------------------------------------------
 */

const SHEET_TAB_NAME = "Leads";

// Email that receives a notification whenever a new lead arrives.
// (Set this to your business inbox.)
const NOTIFY_EMAIL = "avotransportationllc@gmail.com";

// Column headers — order matters; they line up with appendRow() below.
const HEADERS = [
  "Timestamp",
  "Source",
  "Name",
  "Email",
  "Phone",
  "Service",
  "Preferred Date",
  "ZIP",
  "Details",
  "Status",       // for you to fill in: Contacted / Quoted / Booked / Lost
  "Notes"         // for you to fill in
];

function doPost(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};

    // Spam honeypot — if the hidden _gotcha field is filled, silently drop.
    if (params._gotcha) {
      return jsonResponse({ ok: true, dropped: "honeypot" });
    }

    // Basic validation — drop obviously-empty/junk submissions.
    var hasName  = (params.name  || "").trim().length > 0;
    var hasEmail = (params.email || "").trim().length > 0;
    if (!hasName && !hasEmail) {
      return jsonResponse({ ok: true, dropped: "empty" });
    }

    const sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(),
      params._subject || "AVO quote request",
      params.name    || "",
      params.email   || "",
      params.phone   || "",
      params.service || "",
      params.date    || "",
      params.zip     || "",
      params.details || "",
      "New",         // default status
      ""             // notes blank
    ]);

    notifyOwner_(params);

    return jsonResponse({ ok: true });
  } catch (err) {
    // Last-ditch attempt to email the lead so it's never lost.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "AVO LEAD — script error (raw payload attached)",
        body: "The script errored: " + err + "\n\nRaw payload:\n" + JSON.stringify(e || {}, null, 2)
      });
    } catch (_) {}
    return jsonResponse({ ok: false, error: String(err) });
  }
}

// Optional: a GET request lets you visit the Web app URL in a browser
// to confirm the script is alive without sending real lead data.
function doGet() {
  return jsonResponse({
    ok: true,
    service: "AVO lead capture",
    note: "POST your form data to this URL."
  });
}

// ---------- helpers ----------

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_TAB_NAME);
  }
  // Add headers if the sheet is empty.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
         .setFontWeight("bold")
         .setBackground("#000000")
         .setFontColor("#ff6b35");
    sheet.setFrozenRows(1);
    // Reasonable column widths
    [160, 220, 160, 220, 140, 180, 130, 90, 320, 110, 240]
      .forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  }
  return sheet;
}

function notifyOwner_(p) {
  const lines = [
    "A new quote request just came in.",
    "",
    "Name:           " + (p.name    || "(blank)"),
    "Email:          " + (p.email   || "(blank)"),
    "Phone:          " + (p.phone   || "(blank)"),
    "Service:        " + (p.service || "(blank)"),
    "Preferred date: " + (p.date    || "(blank)"),
    "Service ZIP:    " + (p.zip     || "(blank)"),
    "",
    "Details:",
    (p.details || "(none provided)"),
    "",
    "----",
    "Source: " + (p._subject || "AVO website"),
    "View all leads: " + SpreadsheetApp.getActive().getUrl()
  ];
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New AVO lead — " + (p.service || "quote request") + " — " + (p.name || "unknown"),
    body: lines.join("\n"),
    replyTo: p.email || NOTIFY_EMAIL
  });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
