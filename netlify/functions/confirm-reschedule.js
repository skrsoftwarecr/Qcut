import { getAppointmentByToken, confirmRescheduleByToken } from '../../src/firebase/firestoreService';

const GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || '';

export async function handler(event) {
  // Solo permitir solicitudes POST o GET
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let token = '';
    let action = '';
    let uid = '';

    if (event.httpMethod === 'GET') {
      token = event.queryStringParameters.token || '';
      action = event.queryStringParameters.action || '';
      uid = event.queryStringParameters.uid || '';
    } else {
      const body = JSON.parse(event.body || '{}');
      token = body.token || '';
      action = body.action || '';
      uid = body.uid || '';
    }

    if (!token || !action || !uid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters: token, action, uid' })
      };
    }

    if (action !== 'accept' && action !== 'reject') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid action. Must be accept or reject' })
      };
    }

    // 1. Obtener la cita por token
    const apptResult = await getAppointmentByToken(uid, token);
    if (!apptResult.success) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: apptResult.error || 'Appointment token not found' })
      };
    }

    const appointment = apptResult.data;
    appointment.id = apptResult.id;

    // Verificar expiración del token (48h)
    if (appointment.tokenExpiresAt && new Date() > appointment.tokenExpiresAt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token has expired' })
      };
    }

    if (appointment.status !== 'pending_client_confirmation') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Appointment has already been processed' })
      };
    }

    // 2. Confirmar o rechazar el cambio en Firestore
    const updateResult = await confirmRescheduleByToken(uid, appointment.id, action);
    if (!updateResult.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update appointment' })
      };
    }

    // 3. Notificar a la administradora via Google Apps Script
    if (GOOGLE_SCRIPT_URL && appointment.barberEmail) {
      const type = action === 'accept' ? 'appointment_client_confirmed' : 'appointment_client_rejected';
      
      // Llamada asíncrona fire-and-forget
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          barberEmail: appointment.barberEmail,
          barberName: appointment.barberName,
          clientName: appointment.clientName,
          clientPhone: appointment.clientPhone,
          appointmentDate: appointment.startTime ? appointment.startTime.toISOString() : appointment.date?.toISOString(),
          appointmentEndDate: appointment.endTime ? appointment.endTime.toISOString() : null
        })
      }).catch(err => console.error('Error calling Google Apps Script:', err));
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: `Appointment successfully ${action === 'accept' ? 'accepted' : 'rejected'}`
      })
    };

  } catch (error) {
    console.error('Error confirming reschedule:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
