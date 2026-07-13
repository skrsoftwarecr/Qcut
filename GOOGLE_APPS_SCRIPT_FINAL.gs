// ============================================
// GOOGLE APPS SCRIPT — EMAIL NOTIFICATIONS
// Qita - Sistema de Gestión de Citas
//
// ⚠️ DESPUÉS DE PEGAR ESTE CÓDIGO:
//   1. Clic en "Implementar" (Deploy)
//   2. "Nueva implementación" (New deployment)
//   3. Tipo: Aplicación web (Web app)
//   4. Ejecutar como: Yo (Me)
//   5. Acceso: Cualquier persona (Anyone)
//   6. Copiar la URL nueva y actualizar VITE_GOOGLE_SCRIPT_URL
// ============================================

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const type = payload.type || '';
    const clientEmail      = payload.clientEmail      || '';
    const barberEmail      = payload.barberEmail      || '';
    const clientName       = payload.clientName       || '';
    const barberName       = payload.barberName       || '';
    const appointmentDate  = payload.appointmentDate  || '';
    const appointmentEndDate = payload.appointmentEndDate || '';
    const clientPhone      = payload.clientPhone      || '';
    const cancellationReason = payload.cancellationReason || '';
    const confirmUrl       = payload.confirmUrl       || '';
    const originalDate     = payload.originalDate     || '';
    const originalEndDate  = payload.originalEndDate  || '';

    Logger.log('=== RECEIVED PAYLOAD ===');
    Logger.log('Type: ' + type);
    Logger.log('Client Email: ' + clientEmail);
    Logger.log('Barber Email: ' + barberEmail);

    // ─── Parsear fechas ───────────────────────────────────────────────────────
    const { dateStr, timeStr, endTimeStr } = formatDates(appointmentDate, appointmentEndDate);
    const { dateStr: origDateStr, timeStr: origTimeStr, endTimeStr: origEndTimeStr } = formatDates(originalDate, originalEndDate);

    let subject = '';
    let htmlBody = '';
    let recipientEmail = '';

    // ─── Enrutamiento por tipo ────────────────────────────────────────────────

    if (type === 'appointment_confirmed') {
      // Cliente: tu cita fue confirmada por el profesional
      subject = 'Cita Confirmada — ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientConfirmationEmail(clientName, barberName, dateStr, timeStr, endTimeStr);

    } else if (type === 'appointment_auto_confirmed') {
      // Profesional: nueva cita confirmada automáticamente
      subject = 'Nueva Cita Confirmada — ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberAutoConfirmedEmail(barberName, clientName, clientPhone, dateStr, timeStr, endTimeStr);

    } else if (type === 'appointment_pending_approval') {
      // Profesional: nueva cita pendiente de aprobación
      subject = 'Nueva Cita Pendiente de Confirmación — ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberPendingApprovalEmail(barberName, clientName, clientPhone, dateStr, timeStr, endTimeStr);

    } else if (type === 'appointment_rescheduled') {
      // Cliente: el profesional propuso un nuevo horario
      subject = 'Cambio de Horario en tu Cita — Acción Requerida';
      recipientEmail = clientEmail;
      htmlBody = getClientRescheduledEmail(clientName, barberName, origDateStr, origTimeStr, origEndTimeStr, dateStr, timeStr, endTimeStr, confirmUrl);

    } else if (type === 'appointment_cancelled') {
      // Cliente: la administradora canceló la cita con motivo
      subject = 'Cita Cancelada — ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientCancelledEmail(clientName, barberName, dateStr, timeStr, endTimeStr, cancellationReason);

    } else if (type === 'appointment_client_confirmed') {
      // Profesional: el cliente aceptó el nuevo horario
      subject = '✅ El cliente aceptó el nuevo horario — ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberClientConfirmedEmail(barberName, clientName, dateStr, timeStr, endTimeStr);

    } else if (type === 'appointment_client_rejected') {
      // Profesional: el cliente rechazó el nuevo horario
      subject = '❌ El cliente rechazó el nuevo horario — ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberClientRejectedEmail(barberName, clientName, clientPhone, dateStr, timeStr, endTimeStr);

    } else if (type === 'appointment_reminder_24h') {
      // Cliente: recordatorio 1 día antes
      subject = 'Recordatorio: Tienes una cita mañana — ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientReminderEmail(clientName, barberName, dateStr, timeStr, endTimeStr, '1 día');

    } else if (type === 'appointment_reminder_2h') {
      // Cliente: recordatorio 2 horas antes
      subject = 'Recordatorio: Tu cita es en 2 horas — ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientReminderEmail(clientName, barberName, dateStr, timeStr, endTimeStr, '2 horas');

    } else {
      Logger.log('ERROR: Tipo desconocido — ' + type);
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Unknown type: ' + type }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ─── Validaciones ─────────────────────────────────────────────────────────
    if (!recipientEmail || recipientEmail.trim() === '') {
      Logger.log('ERROR: Recipient email is empty!');
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No recipient email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!htmlBody) {
      Logger.log('ERROR: HTML body is empty!');
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'No email body' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ─── Enviar email ─────────────────────────────────────────────────────────
    try {
      GmailApp.sendEmail(recipientEmail, subject, '', {
        htmlBody: htmlBody,
        name: barberName || 'Qita'
      });
      Logger.log('SUCCESS: Email sent to ' + recipientEmail);
    } catch (emailError) {
      Logger.log('ERROR sending email: ' + emailError);
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Email send failed: ' + emailError }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, email: recipientEmail }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// HELPER: Parsear y formatear fechas (UTC-6 Costa Rica)
// ============================================
function formatDates(startIso, endIso) {
  if (!startIso) return { dateStr: '—', timeStr: '—', endTimeStr: '' };

  const dateObj = new Date(startIso);
  if (isNaN(dateObj.getTime())) return { dateStr: '—', timeStr: '—', endTimeStr: '' };

  const offsetMs = 6 * 60 * 60 * 1000; // UTC-6
  const crDate = new Date(dateObj.getTime() + offsetMs);

  const day     = crDate.getUTCDate();
  const month   = crDate.getUTCMonth() + 1;
  const year    = crDate.getUTCFullYear();
  const hour    = crDate.getUTCHours();
  const mins    = ('0' + crDate.getUTCMinutes()).slice(-2);
  const dayNum  = crDate.getUTCDay();

  const months  = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const days    = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];

  const dayName   = days[dayNum] || 'día';
  const monthName = months[month - 1] || 'mes';
  const dateStr   = dayName.charAt(0).toUpperCase() + dayName.slice(1) + ', ' + day + ' de ' + monthName + ' de ' + year;
  const timeStr   = ('0' + hour).slice(-2) + ':' + mins;

  let endTimeStr = '';
  if (endIso) {
    const endObj = new Date(endIso);
    if (!isNaN(endObj.getTime())) {
      const crEnd   = new Date(endObj.getTime() + offsetMs);
      endTimeStr    = ('0' + crEnd.getUTCHours()).slice(-2) + ':' + ('0' + crEnd.getUTCMinutes()).slice(-2);
    }
  }

  return { dateStr, timeStr, endTimeStr };
}

// ============================================
// HELPER: Estilos base del email
// ============================================
function emailWrapper(content, accentColor) {
  accentColor = accentColor || '#c41e3a';
  return '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: ' + accentColor + '; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qita</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Negocios</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + content
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automático. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
}

function infoTable(rows) {
  var html = '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #c41e3a; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">';
  rows.forEach(function(row) {
    html += '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">' + row[0] + ':</td>'
      + '<td style="padding: 5px 0; color: #333; text-align: right;">' + row[1] + '</td></tr>';
  });
  html += '</table></div>';
  return html;
}

function timeRange(timeStr, endTimeStr) {
  return endTimeStr ? timeStr + ' — ' + endTimeStr + ' hrs' : timeStr + ' hrs';
}

// ============================================
// TEMPLATES
// ============================================

// 1. Cliente: cita confirmada directamente por el profesional
function getClientConfirmationEmail(clientName, barberName, date, time, endTime) {
  var rows = [
    ['Profesional', barberName],
    ['Fecha', date],
    ['Horario', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Confirmada ✅</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + clientName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tu cita con <strong>' + barberName + '</strong> ha sido confirmada. ¡Te esperamos!'
    + '</p>'
    + infoTable(rows);
  return emailWrapper(content, '#c41e3a');
}

// 2. Profesional: cita confirmada automáticamente
function getBarberAutoConfirmedEmail(barberName, clientName, clientPhone, date, time, endTime) {
  var rows = [
    ['Cliente', clientName],
    ['Teléfono', clientPhone],
    ['Fecha', date],
    ['Horario', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Nueva Cita Confirmada Automáticamente</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + barberName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tienes una nueva cita confirmada automáticamente por el sistema.'
    + '</p>'
    + infoTable(rows)
    + '<p style="color: #555; font-size: 13px;">La cita ya aparece en tu panel. El cliente ha sido notificado.</p>';
  return emailWrapper(content, '#34c759');
}

// 3. Profesional: cita pendiente de aprobación
function getBarberPendingApprovalEmail(barberName, clientName, clientPhone, date, time, endTime) {
  var rows = [
    ['Cliente', clientName],
    ['Teléfono', clientPhone],
    ['Fecha Solicitada', date],
    ['Horario Solicitado', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Nueva Cita Esperando Confirmación ⏳</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + barberName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Has recibido una nueva solicitud de cita que requiere tu confirmación. Ingresa al panel para confirmar, editar el horario o rechazar.'
    + '</p>'
    + infoTable(rows);
  return emailWrapper(content, '#ff9500');
}

// 4. Cliente: el profesional propuso un nuevo horario (requiere respuesta)
function getClientRescheduledEmail(clientName, barberName, origDate, origTime, origEndTime, newDate, newTime, newEndTime, confirmUrl) {
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">El Profesional Propuso un Nuevo Horario 🔄</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + clientName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + '<strong>' + barberName + '</strong> ha propuesto un cambio en el horario de tu cita. Por favor revisa y responde.'
    + '</p>'
    // Horario original
    + '<div style="background: #fff3e0; padding: 12px 15px; border-radius: 4px; border-left: 4px solid #ff9500; margin: 0 0 12px 0; font-size: 13px;">'
    + '<strong style="color: #e65c00;">Horario original solicitado:</strong><br/>'
    + '<span style="color: #333;">' + (origDate || '—') + ' &bull; ' + timeRange(origTime || '—', origEndTime) + '</span>'
    + '</div>'
    // Nuevo horario
    + '<div style="background: #e8f5e9; padding: 12px 15px; border-radius: 4px; border-left: 4px solid #34c759; margin: 0 0 20px 0; font-size: 13px;">'
    + '<strong style="color: #1b7e3a;">Nuevo horario propuesto:</strong><br/>'
    + '<span style="color: #333;">' + newDate + ' &bull; ' + timeRange(newTime, newEndTime) + '</span>'
    + '</div>'
    // Botones
    + '<p style="color: #555; font-size: 14px; text-align: center; margin: 0 0 20px 0;">'
    + '¿Aceptas el nuevo horario?'
    + '</p>'
    + '<div style="text-align: center; margin: 0 0 20px 0;">'
    + '<a href="' + confirmUrl + '&action=accept" style="display: inline-block; background: #34c759; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; margin-right: 12px;">'
    + '✅ Acepto el nuevo horario'
    + '</a>'
    + '<a href="' + confirmUrl + '&action=reject" style="display: inline-block; background: #ff3b30; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px;">'
    + '❌ No acepto'
    + '</a>'
    + '</div>'
    + '<p style="color: #999; font-size: 12px; text-align: center;">Este enlace expira en 48 horas.</p>';
  return emailWrapper(content, '#2563eb');
}

// 5. Cliente: cita cancelada con motivo por la administradora
function getClientCancelledEmail(clientName, barberName, date, time, endTime, reason) {
  var rows = [
    ['Profesional', barberName],
    ['Fecha', date],
    ['Horario', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Cancelada</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + clientName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Lamentamos informarte que tu cita ha sido cancelada.'
    + '</p>'
    + infoTable(rows)
    + '<div style="background: #fff3f3; padding: 15px; border-radius: 4px; border-left: 4px solid #ff3b30; margin: 16px 0;">'
    + '<p style="color: #c41e3a; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Motivo de cancelación:</p>'
    + '<p style="color: #333; font-size: 14px; margin: 0;">' + (reason || 'No especificado') + '</p>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px;">Te invitamos a reservar una nueva cita en otro horario disponible.</p>';
  return emailWrapper(content, '#ff3b30');
}

// 6. Profesional: el cliente aceptó el nuevo horario
function getBarberClientConfirmedEmail(barberName, clientName, date, time, endTime) {
  var rows = [
    ['Cliente', clientName],
    ['Fecha', date],
    ['Horario confirmado', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">El cliente aceptó el nuevo horario ✅</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + barberName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + '<strong>' + clientName + '</strong> ha aceptado el horario que le propusiste. La cita queda confirmada.'
    + '</p>'
    + infoTable(rows);
  return emailWrapper(content, '#34c759');
}

// 7. Profesional: el cliente rechazó el nuevo horario
function getBarberClientRejectedEmail(barberName, clientName, clientPhone, date, time, endTime) {
  var rows = [
    ['Cliente', clientName],
    ['Teléfono', clientPhone],
    ['Horario propuesto (rechazado)', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">El cliente rechazó el nuevo horario ❌</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + barberName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + '<strong>' + clientName + '</strong> no aceptó el horario propuesto. La cita ha sido cancelada automáticamente. '
    + 'Puedes contactar al cliente para coordinar una nueva fecha.'
    + '</p>'
    + infoTable(rows);
  return emailWrapper(content, '#ff3b30');
}

// 8. Cliente: recordatorio (1 día antes o 2 horas antes)
function getClientReminderEmail(clientName, barberName, date, time, endTime, timeLabel) {
  var rows = [
    ['Profesional', barberName],
    ['Fecha', date],
    ['Horario', timeRange(time, endTime)]
  ];
  var content = '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Recordatorio: Tu cita es en ' + timeLabel + ' ⏰</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">Hola <strong>' + clientName + '</strong>,</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Te recordamos que tienes una cita programada en <strong>' + timeLabel + '</strong>. ¡No lo olvides!'
    + '</p>'
    + infoTable(rows);
  return emailWrapper(content, '#5856d6');
}
