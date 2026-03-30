// ============================================
// GOOGLE APPS SCRIPT - EMAIL NOTIFICATIONS (ACTUALIZADO)
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
    const appointmentDate = payload.appointmentDate || '';
    const clientPhone = payload.clientPhone || '';
    const confirmationUrl = payload.confirmationUrl || '';
    const newConfirmationUrl = payload.newConfirmationUrl || '';
    const oldAppointmentDate = payload.oldAppointmentDate || '';
    const newAppointmentDate = payload.newAppointmentDate || '';
    
    Logger.log('=== RECEIVED PAYLOAD ===');
    Logger.log('Type: ' + type);
    Logger.log('Client Email: ' + clientEmail);
    
    let subject = '';
    let htmlBody = '';
    let recipientEmail = '';
    
    // Parsear fecha si existe
    const dateStr = appointmentDate ? formatDateToString(appointmentDate) : '';
    const timeStr = appointmentDate ? formatTimeToString(appointmentDate) : '';
    const oldDateStr = oldAppointmentDate ? formatDateToString(oldAppointmentDate) : '';
    const newDateStr = newAppointmentDate ? formatDateToString(newAppointmentDate) : '';
    const newTimeStr = newAppointmentDate ? formatTimeToString(newAppointmentDate) : '';
    
    if (type === 'appointment_confirmation_needed') {
      // Email AL CLIENTE pidiendo que confirme la cita
      subject = '¡Confirma tu cita con ' + barberName + '!';
      recipientEmail = clientEmail;
      htmlBody = getClientConfirmationNeededEmail(clientName, barberName, dateStr, timeStr, confirmationUrl);
      Logger.log('Sending appointment_confirmation_needed to client: ' + recipientEmail);
      
    } else if (type === 'appointment_confirmed') {
      subject = 'Cita Confirmada - ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientConfirmedEmail(clientName, barberName, dateStr, timeStr);
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
      
    } else if (type === 'appointment_cancelled_by_admin') {
      // Email AL CLIENTE notificando que su cita fue cancelada
      subject = 'Tu Cita Ha Sido Cancelada - ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientCancelledEmail(clientName, barberName, dateStr, timeStr);
      Logger.log('Sending appointment_cancelled_by_admin to client: ' + recipientEmail);
      
    } else if (type === 'appointment_rescheduled') {
      // Email AL CLIENTE notificando reprogramación y pidiendo nueva confirmación
      subject = 'Tu Cita Ha Sido Reprogramada - ' + barberName;
      recipientEmail = clientEmail;
      htmlBody = getClientRescheduleEmail(clientName, barberName, oldDateStr, newDateStr, newTimeStr, newConfirmationUrl);
      Logger.log('Sending appointment_rescheduled to client: ' + recipientEmail);
      
    } else if (type === 'appointment_client_created') {
      // Email AL CLIENTE notificando que su cita fue registrada exitosamente (Bug 3)
      const businessName = payload.businessName || '';
      const cancelUrl = payload.cancelUrl || '';
      subject = 'Confirmación de Cita - ' + businessName;
      recipientEmail = clientEmail;
      htmlBody = getClientCreatedEmail(clientName, barberName, dateStr, timeStr, businessName, cancelUrl);
      Logger.log('Sending appointment_client_created to client: ' + recipientEmail);
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
      const senderName = barberName || 'Qcut';
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
// HELPERS
// ============================================

function formatDateToString(appointmentDate) {
  const dateObj = new Date(appointmentDate);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const offsetMs = 6 * 60 * 60 * 1000;
  const crDate = new Date(dateObj.getTime() + offsetMs);
  
  const day = crDate.getUTCDate();
  const month = crDate.getUTCMonth() + 1;
  const year = crDate.getUTCFullYear();
  const dayNum = crDate.getUTCDay();
  
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  
  const dayName = (dayNum >= 0 && dayNum < 7) ? days[dayNum] : 'dia';
  const monthName = (month >= 1 && month <= 12) ? months[month - 1] : 'mes';
  
  return dayName.charAt(0).toUpperCase() + dayName.slice(1) + ', ' + day + ' de ' + monthName + ' de ' + year;
}

function formatTimeToString(appointmentDate) {
  const dateObj = new Date(appointmentDate);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const offsetMs = 6 * 60 * 60 * 1000;
  const crDate = new Date(dateObj.getTime() + offsetMs);
  
  const hour = crDate.getUTCHours();
  const mins = ('0' + crDate.getUTCMinutes()).slice(-2);
  
  const timeString = ('0' + hour).slice(-2) + ':' + mins;
  
  // Convertir a formato 12h con AM/PM
  const [hours, minutes] = timeString.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${minutes} ${ampm}`
}

// ============================================
// EMAIL TEMPLATES
// ============================================

function getClientConfirmationNeededEmail(clientName, barberName, date, time, confirmationUrl) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">¡Por favor, confirma tu cita!</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tu cita con ' + barberName + ' ha sido reservada. En el siguiente enlace podrás elegir si deseas confirmar o cancelar la cita.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #c41e3a; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbero:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + barberName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<div style="text-align: center; margin: 30px 0;">'
    + '<a href="' + confirmationUrl + '" style="background: #34c759; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-size: 14px;">'
    + 'Revisar Cita (Confirmar o Cancelar)'
    + '</a>'
    + '</div>'
    + '<p style="color: #999; font-size: 12px; line-height: 1.5; margin: 20px 0 0 0;">'
    + 'Este enlace es válido por 14 días. Si no confirmaste antes de esa fecha, por favor solicita uno nuevo.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 15px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getClientConfirmedEmail(clientName, barberName, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #34c759; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">¡Cita Confirmada!</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tu cita con ' + barberName + ' ha sido confirmada exitosamente. ¡Te esperamos!'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #34c759; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbero:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + barberName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'Por favor, sé puntual. Si necesitas cancelar, contacta al barbero lo antes posible.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getClientCancelledEmail(clientName, barberName, date, time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #ff3b30; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Cancelada</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Lamentamos informarte que tu cita con ' + barberName + ' ha sido cancelada.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #ff3b30; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbero:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + barberName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + ' hrs</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'Si deseas agendar otra cita, por favor contacta directamente con el barbero o reserva a través de nuestro sistema.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getClientRescheduleEmail(clientName, barberName, oldDate, newDate, newTime, newConfirmationUrl) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #ff9500; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">Tu Cita Ha Sido Reprogramada</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tu cita con ' + barberName + ' ha sido movida a una nueva fecha y hora. Por favor, confirma que deseas asistir a la nueva cita.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0;">'
    + '<p style="color: #666; margin: 0 0 10px 0;"><strong>Fecha Anterior:</strong> ' + oldDate + '</p>'
    + '<div style="border-left: 4px solid #ff3b30; padding-left: 10px; margin: 10px 0;"></div>'
    + '<p style="color: #666; margin: 0;"><strong>Nueva Fecha:</strong> ' + newDate + ' a las ' + newTime + ' hrs</p>'
    + '</div>'
    + '<div style="text-align: center; margin: 30px 0;">'
    + '<a href="' + newConfirmationUrl + '" style="background: #34c759; color: white; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-size: 14px;">'
    + 'Confirmar Nueva Cita'
    + '</a>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'Necesitas confirmar la nueva cita para que sea válida. El enlace es válido por 14 días.'
    + '</p>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}

function getBarberAutoConfirmedEmail(barberName, clientName, clientPhone, date,time) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #c41e3a; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
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
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
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
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
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
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbero:</td>'
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

function getClientCreatedEmail(clientName, barberName, date, time, businessName, cancelUrl) {
  const html = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff;">'
    + '<div style="background: #34c759; color: white; padding: 30px 20px; text-align: center;">'
    + '<h1 style="margin: 0; font-size: 28px; font-weight: bold;">Qcut</h1>'
    + '<p style="margin: 5px 0 0 0; font-size: 13px;">Sistema de Citas para Barberias</p>'
    + '</div>'
    + '<div style="background: white; padding: 30px 20px; border: 1px solid #e5e5e5;">'
    + '<h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">¡Tu Cita ha sido Registrada!</h2>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">'
    + 'Hola ' + clientName + ','
    + '</p>'
    + '<p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">'
    + 'Tu cita en <strong>' + businessName + '</strong> con ' + barberName + ' ha sido procesada exitosamente.'
    + '</p>'
    + '<div style="background: #f5f5f5; padding: 15px; border-radius: 4px; border-left: 4px solid #34c759; margin: 20px 0;">'
    + '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbería:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + businessName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Barbero:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + barberName + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Fecha:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + date + '</td></tr>'
    + '<tr><td style="padding: 5px 0; color: #666; font-weight: bold;">Hora:</td>'
    + '<td style="padding: 5px 0; color: #333; text-align: right;">' + time + '</td></tr>'
    + '</table>'
    + '</div>'
    + '<p style="color: #555; font-size: 13px; line-height: 1.6; margin: 15px 0;">'
    + 'Si necesitas cancelar, puedes hacerlo en cualquier momento desde el siguiente enlace:'
    + '</p>'
    + '<div style="text-align: center; margin: 30px 0;">'
    + '<a href="' + cancelUrl + '" style="background: #e5e5e5; color: #333; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; font-size: 14px;">'
    + 'Gestionar mi Cita'
    + '</a>'
    + '</div>'
    + '<p style="color: #999; font-size: 12px; text-align: center; margin: 20px 0 0 0;">'
    + 'Este es un correo automatico. No respondas a este mensaje.'
    + '</p>'
    + '</div>'
    + '</div>';
  return html;
}
