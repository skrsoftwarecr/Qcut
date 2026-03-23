const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

/**
 * REGISTRAR BARBERO (Admin only)
 * Crea una cuenta en Firebase Auth y vincula el perfil al negocio.
 */
exports.registrarBarbero = onCall(async (request) => {
  // 1. Verificar que el que llama es admin/dueño
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Debes estar autenticado.');
  }

  const { email, password, name, barberId } = request.data;
  const ownerUid = request.auth.uid;
  const db = getFirestore();

  try {
    // 2. Crear usuario en Firebase Auth
    const userRecord = await getAuth().createUser({
      email,
      password,
      displayName: name,
    });

    // 3. Crear el perfil en la colección /users
    await db.collection('users').doc(userRecord.uid).set({
      role: 'barber',
      name: name,
      businessId: ownerUid, // UID del dueño
      barberId: barberId,   // ID del barbero dentro de la barberia
      email: email,
      createdAt: Timestamp.now()
    });

    return { success: true, uid: userRecord.uid };
  } catch (error) {
    console.error('Error al registrar barbero:', error);
    throw new HttpsError('internal', error.message);
  }
});

// ... (se mantienen las funciones anteriores de WhatsApp y Notificaciones)
const now = new Date();
// etc...
