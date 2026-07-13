// ============================================
// GOOGLE APPS SCRIPT — RECORDATORIOS AUTOMÁTICOS
// Qita - Sistema de Gestión de Citas
//
// INSTRUCCIONES DE CONFIGURACIÓN:
//   1. Crea un nuevo archivo en tu proyecto de Apps Script
//      (puedes llamarlo "Reminders")
//   2. Pega ESTE código en ese archivo nuevo
//   3. Configura las constantes de abajo
//   4. Crea el trigger automático:
//      → Menú: Triggers (ícono de reloj)
//      → "+ Add Trigger"
//      → Function: checkAndSendReminders
//      → Event source: Time-driven
//      → Type: Hour timer
//      → Every: 1 hour
//      → Guardar
// ============================================

// ─── CONFIGURACIÓN ───────────────────────────────────────────────────────────

var FIREBASE_PROJECT_ID = 'qita-332fd';  // Tu proyecto de Firebase
var FIREBASE_API_KEY    = '';            // 🔑 Ponlo aquí (se obtiene en Firebase Console → Project settings → Web API Key)
var GOOGLE_SCRIPT_EMAIL_URL = '';        // URL de tu doPost para enviar los emails (la URL pública de tu Web App)

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Función principal — debe ejecutarse cada hora via Time-based trigger
 * Busca citas en las ventanas de 24h y 2h y envía los recordatorios correspondientes
 */
function checkAndSendReminders() {
  Logger.log('=== CHECKING REMINDERS: ' + new Date().toISOString() + ' ===');

  // Obtener todos los UIDs de administradoras (buscamos en la colección "barbers")
  var barbersUrl = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT_ID + '/databases/(default)/documents/barbers?key=' + FIREBASE_API_KEY;
  
  var barbersResponse = UrlFetchApp.fetch(barbersUrl, { muteHttpExceptions: true });
  if (barbersResponse.getResponseCode() !== 200) {
    Logger.log('ERROR fetching barbers: ' + barbersResponse.getContentText());
    return;
  }

  var barbersData = JSON.parse(barbersResponse.getContentText());
  var barbers = barbersData.documents || [];

  barbers.forEach(function(barberDoc) {
    var uid = barberDoc.name.split('/').pop();
    Logger.log('Processing reminders for barber: ' + uid);
    processRemindersForBarber(uid);
  });

  Logger.log('=== REMINDERS CHECK COMPLETE ===');
}

/**
 * Procesa recordatorios para un barbero/negocio específico
 */
function processRemindersForBarber(uid) {
  // Ventanas de tiempo (en UTC, el servidor GAS corre en UTC)
  var now = new Date();

  // Ventana 24h: citas entre 23h y 25h desde ahora
  var window24hStart = new Date(now.getTime() + 23 * 60 * 60 * 1000);
  var window24hEnd   = new Date(now.getTime() + 25 * 60 * 60 * 1000);

  // Ventana 2h: citas entre 1h45m y 2h15m desde ahora
  var window2hStart  = new Date(now.getTime() + 1 * 60 * 60 * 1000 + 45 * 60 * 1000);
  var window2hEnd    = new Date(now.getTime() + 2 * 60 * 60 * 1000 + 15 * 60 * 1000);

  // Consultar citas de este barbero
  var appointmentsUrl = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT_ID
    + '/databases/(default)/documents/barbers/' + uid + '/appointments?key=' + FIREBASE_API_KEY;

  var response = UrlFetchApp.fetch(appointmentsUrl, { muteHttpExceptions: true });
  if (response.getResponseCode() !== 200) {
    Logger.log('ERROR fetching appointments for ' + uid + ': ' + response.getContentText());
    return;
  }

  var data = JSON.parse(response.getContentText());
  var appointments = data.documents || [];

  appointments.forEach(function(aptDoc) {
    var fields = aptDoc.fields || {};
    var status = (fields.status && fields.status.stringValue) || '';

    // Solo citas confirmadas
    if (status !== 'confirmed') return;

    var clientEmail    = (fields.clientEmail    && fields.clientEmail.stringValue)    || '';
    var clientName     = (fields.clientName     && fields.clientName.stringValue)     || '';
    var barberName     = (fields.barberName     && fields.barberName.stringValue)     || '';
    var clientPhone    = (fields.clientPhone    && fields.clientPhone.stringValue)    || '';
    var sent24h        = (fields.reminderSent24h && fields.reminderSent24h.booleanValue) || false;
    var sent2h         = (fields.reminderSent2h  && fields.reminderSent2h.booleanValue)  || false;

    // Obtener fecha de inicio
    var startTimeValue = fields.startTime || fields.date;
    if (!startTimeValue || !startTimeValue.timestampValue) return;

    var appointmentStart = new Date(startTimeValue.timestampValue);
    var appointmentEndValue = fields.endTime;
    var appointmentEnd = appointmentEndValue && appointmentEndValue.timestampValue
      ? new Date(appointmentEndValue.timestampValue)
      : null;

    if (!clientEmail) return;

    var aptDocId = aptDoc.name.split('/').pop();

    // ── Recordatorio 24h ──────────────────────────────────────────────────────
    if (!sent24h && appointmentStart >= window24hStart && appointmentStart <= window24hEnd) {
      Logger.log('Sending 24h reminder for appointment ' + aptDocId);
      sendReminderEmail('appointment_reminder_24h', clientEmail, clientName, barberName, clientPhone,
        startTimeValue.timestampValue, appointmentEnd ? appointmentEnd.toISOString() : null);
      markReminderSent(uid, aptDocId, 'reminderSent24h');
    }

    // ── Recordatorio 2h ───────────────────────────────────────────────────────
    if (!sent2h && appointmentStart >= window2hStart && appointmentStart <= window2hEnd) {
      Logger.log('Sending 2h reminder for appointment ' + aptDocId);
      sendReminderEmail('appointment_reminder_2h', clientEmail, clientName, barberName, clientPhone,
        startTimeValue.timestampValue, appointmentEnd ? appointmentEnd.toISOString() : null);
      markReminderSent(uid, aptDocId, 'reminderSent2h');
    }
  });
}

/**
 * Envía el email de recordatorio llamando al endpoint del doPost principal
 */
function sendReminderEmail(type, clientEmail, clientName, barberName, clientPhone, appointmentDate, appointmentEndDate) {
  if (!GOOGLE_SCRIPT_EMAIL_URL) {
    Logger.log('WARNING: GOOGLE_SCRIPT_EMAIL_URL no configurado. No se envía email.');
    return;
  }

  var payload = {
    type: type,
    clientEmail: clientEmail,
    clientName: clientName,
    barberName: barberName,
    clientPhone: clientPhone,
    appointmentDate: appointmentDate,
    appointmentEndDate: appointmentEndDate || ''
  };

  try {
    UrlFetchApp.fetch(GOOGLE_SCRIPT_EMAIL_URL, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    Logger.log('Reminder sent: ' + type + ' to ' + clientEmail);
  } catch (err) {
    Logger.log('ERROR sending reminder: ' + err.toString());
  }
}

/**
 * Marca el flag de recordatorio enviado en Firestore para evitar duplicados
 */
function markReminderSent(uid, appointmentId, field) {
  if (!FIREBASE_API_KEY) {
    Logger.log('WARNING: FIREBASE_API_KEY no configurado. No se puede marcar recordatorio.');
    return;
  }

  var patchUrl = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_PROJECT_ID
    + '/databases/(default)/documents/barbers/' + uid + '/appointments/' + appointmentId
    + '?updateMask.fieldPaths=' + field + '&key=' + FIREBASE_API_KEY;

  var body = {
    fields: {}
  };
  body.fields[field] = { booleanValue: true };

  try {
    UrlFetchApp.fetch(patchUrl, {
      method: 'PATCH',
      contentType: 'application/json',
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });
    Logger.log('Marked ' + field + ' = true for appointment ' + appointmentId);
  } catch (err) {
    Logger.log('ERROR marking reminder: ' + err.toString());
  }
}
