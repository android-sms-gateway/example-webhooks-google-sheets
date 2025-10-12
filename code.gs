/**
 * Google Apps Script to receive incoming SMS messages from sms-gate.app webhooks
 * and append them to a Google Sheet.
 */
function doPost(e) {
  try {
    // Get the active sheet by name
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Messages');
    if (!sheet) throw new Error("Sheet 'Messages' not found");

    // Parse incoming JSON body
    const body = JSON.parse(e.postData.contents);

    // Extract fields from the webhook payload according to sms-gate.app docs
    const {
      deviceId,
      payload,
    } = body;

    if (!payload) {
      throw new Error("Missing required field: payload");
    }

    const {
      messageId,
      message,
      phoneNumber,
      receivedAt,
    } = payload;

    if (!message || !phoneNumber) {
      throw new Error("Missing required fields: message or phoneNumber");
    }

    // Append to sheet
    sheet.appendRow([
      new Date(receivedAt || Date.now()),
      phoneNumber || '',
      message || '',
      deviceId || '',
      messageId || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Handle errors gracefully
    Logger.log("Webhook error: " + err.message);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
