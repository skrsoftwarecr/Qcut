const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

const appoint = require('./appointmentPublic');

initializeApp();

const REGION = process.env.FUNCTIONS_REGION || 'us-central1';
const db = () => getFirestore();

/**
 * REGISTRAR BARBERO (Admin only)
 * Crea una cuenta en Firebase Auth y vincula el perfil al negocio.
 */
exports.registrarBarbero = onCall({ region: REGION }, async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes estar autenticado.');
  }

  const { email, password, name, barberId } = request.data;
  const ownerUid = request.auth.uid;
  const firestore = db();

  try {
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name
    });

    await firestore.collection('users').doc(userRecord.uid).set({
      role: 'barber',
      name: name,
      businessId: ownerUid,
      barberId: barberId,
      email: email,
      createdAt: Timestamp.now()
    });

    return { success: true, uid: userRecord.uid };
  } catch (error) {
    console.error('Error al registrar barbero:', error);
    throw new HttpsError('internal', error.message);
  }
});

/** Público: citas del día (reservas web sin auth) */
exports.publicGetAppointmentsForDay = onCall({ region: REGION }, async (request) => {
  const appointments = await appoint.publicGetAppointmentsForDay(db(), request.data || {});
  return { appointments };
});

/** Público: citas futuras por teléfono (cancelación desde booking) */
exports.publicGetAppointmentsByPhone = onCall({ region: REGION }, async (request) => {
  const appointments = await appoint.publicGetAppointmentsByPhone(db(), request.data || {});
  return { appointments };
});

/** Público: cancelar cita verificando teléfono */
exports.publicCancelAppointment = onCall({ region: REGION }, async (request) => {
  return appoint.publicCancelAppointment(db(), request.data || {});
});

/** Público: datos de cita para página de confirmación por token */
exports.appointmentGetByToken = onCall({ region: REGION }, async (request) => {
  return appoint.appointmentGetByToken(db(), request.data || {});
});

/** Público: confirmar cita por token */
exports.appointmentConfirmByToken = onCall({ region: REGION }, async (request) => {
  return appoint.appointmentConfirmByToken(db(), request.data || {});
});

/** Público: cancelar cita por token (enlace de correo) */
exports.appointmentCancelByToken = onCall({ region: REGION }, async (request) => {
  return appoint.appointmentCancelByToken(db(), request.data || {});
});
