// ============================================
// GOOGLE APPS SCRIPT - EMAIL NOTIFICATIONS
// Copia-pega COMPLETAMENTE este codigo en tu Google Apps Script
// Reemplaza TODO lo que está ahí
// ============================================

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const type = payload.type || '';
    const clientEmail = payload.clientEmail || '';
    const barberEmail = payload.barberEmail || '';
    const clientName = payload.clientName || '';
    const barberName = payload.barberName || '';
    // Nombre neutral para plantillas
    const professionalName = barberName || '';
    const appointmentDate = payload.appointmentDate || '';
    const clientPhone = payload.clientPhone || '';
    
    Logger.log('=== RECEIVED PAYLOAD ===');
    Logger.log('Type: ' + type);
    Logger.log('Client Email: ' + clientEmail);
    Logger.log('Barber Email: ' + barberEmail);
    Logger.log('Appointment Date: ' + appointmentDate);
    
    // Parsear fecha - convertir a zona horaria CR (UTC-6)
    const dateObj = new Date(appointmentDate);
    
    // Validar fecha
    if (isNaN(dateObj.getTime())) {
      Logger.log('ERROR: Invalid date format - ' + appointmentDate);
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Invalid date'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ajustar 6 horas para Costa Rica (UTC-6)
    const offsetMs = 6 * 60 * 60 * 1000;
    const crDate = new Date(dateObj.getTime() + offsetMs);
    
    const day = crDate.getUTCDate();
    const month = crDate.getUTCMonth() + 1;
    const year = crDate.getUTCFullYear();
    const hour = crDate.getUTCHours();
    const mins = ('0' + crDate.getUTCMinutes()).slice(-2);
    const dayNum = crDate.getUTCDay();
    
    // Arrays de nombres
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    
    // Validar indices
    const dayName = (dayNum >= 0 && dayNum < 7) ? days[dayNum] : 'dia';
    const monthName = (month >= 1 && month <= 12) ? months[month - 1] : 'mes';
    
    if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hour)) {
      Logger.log('ERROR: Invalid date values parsed');
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Date parsing error'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Formatear fecha
    const dateStr = dayName.charAt(0).toUpperCase() + dayName.slice(1) + ', ' + day + ' de ' + monthName + ' de ' + year;
    const timeStr = ('0' + hour).slice(-2) + ':' + mins;
    
    Logger.log('Formatted Date: ' + dateStr + ' at ' + timeStr);
    
    let subject = '';
    let htmlBody = '';
    let recipientEmail = '';
    
    if (type === 'appointment_confirmed') {
      subject = 'Cita Confirmada - ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientConfirmationEmail(clientName, barberName, dateStr, timeStr);
      Logger.log('Sending appointment_confirmed to client: ' + recipientEmail);
    } else if (type === 'appointment_auto_confirmed') {
      subject = 'Nueva Cita Confirmada - ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberAutoConfirmedEmail(barberName, clientName, clientPhone, dateStr, timeStr);
      Logger.log('Sending appointment_auto_confirmed to barber: ' + recipientEmail);
    } else if (type === 'appointment_pending_approval') {
      subject = 'Nueva Cita Pendiente de Confirmacion - ' + clientName;
      recipientEmail = barberEmail;
      htmlBody = getBarberPendingApprovalEmail(barberName, clientName, clientPhone, dateStr, timeStr);
      Logger.log('Sending appointment_pending_approval to barber: ' + recipientEmail);
    } else if (type === 'appointment_rejected') {
      subject = 'Cita Rechazada - ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientRejectedEmail(clientName, barberName, dateStr, timeStr);
      Logger.log('Sending appointment_rejected to client: ' + recipientEmail);
    }
    
    // Validar que tenemos recipient y body
    if (!recipientEmail || recipientEmail.trim() === '') {
      Logger.log('ERROR: Recipient email is empty!');
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'No recipient email'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!htmlBody) {
      Logger.log('ERROR: HTML body is empty!');
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'No email body'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Enviar email
    try {
      const senderName = barberName || 'Qita';
      GmailApp.sendEmail(
        recipientEmail,
        subject,
        '',
        {
          htmlBody: htmlBody,
          name: senderName
        }
      );
      Logger.log('SUCCESS: Email sent to ' + recipientEmail);
    } catch (emailError) {
      Logger.log('ERROR sending email: ' + emailError);
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Email send failed: ' + emailError})).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true, email: recipientEmail})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({success: false, error: String(error)})).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

function getClientConfirmationEmail(clientName, barberName, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qita</h1>'
      + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Negocios</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Confirmada</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
      + 'Tu cita con ' + professionalName + ' ha sido confirmada. Te esperamos en la fecha y hora indicadas.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #c41e3a; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Profesional:</td>'
      + '<td style="padding: 5px 0; color: #333; text-align: right;">' + professionalName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getBarberAutoConfirmedEmail(barberName, clientName, clientPhone, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qita</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Negocios</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Nueva Cita Confirmada Automaticamente</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + barberName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tienes una nueva cita que ha sido confirmada automaticamente por el sistema.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #34c759; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Cliente:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + clientName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Telefono:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + clientPhone + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'La cita ya aparece en tu calendario. El cliente ha sido notificado de la confirmacion.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getBarberPendingApprovalEmail(barberName, clientName, clientPhone, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qita</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Negocios</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Nueva Cita Esperando Confirmacion</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + barberName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Has recibido una nueva solicitud de cita que requiere tu confirmacion. Ingresa al panel para confirmar o rechazar.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #ff9500; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Cliente:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + clientName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Telefono:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + clientPhone + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha Solicitada:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora Solicitada:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getClientRejectedEmail(clientName, barberName, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qita</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Negocios</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Rechazada</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Lamentablemente, tu solicitud de cita ha sido rechazada. Es posible que no haya disponibilidad en ese horario.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #ff3b30; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Profesional:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + barberName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha Solicitada:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora Solicitada:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'Te invitamos a intentar reservar en otra fecha u hora.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}
