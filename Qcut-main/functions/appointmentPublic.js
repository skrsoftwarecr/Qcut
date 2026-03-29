const { HttpsError } = require('firebase-functions/v2/https');
const { Timestamp } = require('firebase-admin/firestore');

function docToPlain(doc) {
  const data = doc.data();
  const plain = { id: doc.id };
  for (const [k, v] of Object.entries(data)) {
    if (v != null && typeof v.toDate === 'function') {
      plain[k] = v.toDate().toISOString();
    } else {
      plain[k] = v;
    }
  }
  return plain;
}

async function findAppointmentByConfirmationToken(db, token) {
  const trimmed = (token || '').trim();
  if (!trimmed) return null;
  const snap = await db
    .collectionGroup('appointments')
    .where('confirmationToken', '==', trimmed)
    .limit(1)
    .get();
  if (snap.empty) return null;
  const d = snap.docs[0];
  const businessId = d.ref.parent.parent.id;
  return { ref: d.ref, data: d.data(), id: d.id, businessId };
}

function assertBusinessId(businessId) {
  if (!businessId || typeof businessId !== 'string' || businessId.length < 1 || businessId.length > 128) {
    throw new HttpsError('invalid-argument', 'businessId inválido');
  }
}

async function publicGetAppointmentsForDay(db, { businessId, startMs, endMs }) {
  assertBusinessId(businessId);
  const start = Number(startMs);
  const end = Number(endMs);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start || end - start > 86400000 * 2) {
    throw new HttpsError('invalid-argument', 'Rango de fechas inválido');
  }
  const snap = await db
    .collection('barbers')
    .doc(businessId)
    .collection('appointments')
    .where('date', '>=', Timestamp.fromMillis(start))
    .where('date', '<=', Timestamp.fromMillis(end))
    .get();
  return snap.docs.map((d) => docToPlain(d));
}

async function publicGetAppointmentsByPhone(db, { businessId, phone }) {
  assertBusinessId(businessId);
  const p = (phone || '').trim();
  if (!p || p.length < 6 || p.length > 32) {
    throw new HttpsError('invalid-argument', 'Teléfono inválido');
  }
  const snap = await db
    .collection('barbers')
    .doc(businessId)
    .collection('appointments')
    .where('clientPhone', '==', p)
    .orderBy('date', 'asc')
    .get();
  const now = new Date();
  const out = [];
  snap.forEach((d) => {
    const plain = docToPlain(d);
    const dateVal = new Date(plain.date);
    if ((plain.status === 'pending' || plain.status === 'confirmed') && dateVal > now) {
      out.push(plain);
    }
  });
  return out;
}

async function publicCancelAppointment(db, { businessId, appointmentId, phone }) {
  assertBusinessId(businessId);
  const p = (phone || '').trim();
  if (!appointmentId || !p) {
    throw new HttpsError('invalid-argument', 'Datos incompletos');
  }
  const ref = db.collection('barbers').doc(businessId).collection('appointments').doc(appointmentId);
  const docSnap = await ref.get();
  if (!docSnap.exists) {
    throw new HttpsError('not-found', 'Cita no encontrada');
  }
  const data = docSnap.data();
  if ((data.clientPhone || '').trim() !== p) {
    throw new HttpsError('permission-denied', 'El teléfono no coincide con la cita');
  }
  await ref.update({
    status: 'cancelled',
    cancelledBy: 'client',
    cancelledAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  await db.collection('barbers').doc(businessId).collection('notifications').add({
    type: 'appointment_cancelled_by_client',
    appointmentId,
    clientName: data.clientName || 'Cliente',
    clientPhone: data.clientPhone || '',
    barberName: data.barberName || '',
    barberId: data.barberId || '',
    appointmentDate: data.date,
    read: false,
    createdAt: Timestamp.now()
  });
  return { success: true };
}

async function appointmentGetByToken(db, { token }) {
  const found = await findAppointmentByConfirmationToken(db, token);
  if (!found) {
    return { success: false, error: 'Token no encontrado o invalido' };
  }
  const { data, id, businessId } = found;
  if (data.confirmationTokenExpiry) {
    const exp = data.confirmationTokenExpiry.toDate
      ? data.confirmationTokenExpiry.toDate()
      : new Date(data.confirmationTokenExpiry);
    if (new Date() > exp) {
      return { success: false, error: 'El enlace de confirmacion ha expirado. Por favor, solicita uno nuevo.' };
    }
  }
  if (data.confirmationStatus === 'confirmed') {
    return { success: false, error: 'Esta cita ya ha sido confirmada.' };
  }
  if (data.confirmationStatus === 'cancelled' || data.status === 'cancelled') {
    return { success: false, error: 'Esta cita ya fue cancelada.' };
  }
  const dateVal = data.date?.toDate ? data.date.toDate() : new Date(data.date);
  const payload = {
    clientName: data.clientName,
    clientPhone: data.clientPhone,
    clientEmail: data.clientEmail,
    barberName: data.barberName,
    barberId: data.barberId,
    status: data.status,
    notes: data.notes,
    confirmationStatus: data.confirmationStatus,
    id,
    businessId,
    date: dateVal.toISOString(),
    time: data.time
  };
  return {
    success: true,
    data: payload
  };
}

async function appointmentConfirmByToken(db, { token }) {
  const found = await findAppointmentByConfirmationToken(db, token);
  if (!found) {
    return { success: false, error: 'Token no encontrado o invalido' };
  }
  const { ref, data, id, businessId } = found;
  if (data.confirmationTokenExpiry) {
    const exp = data.confirmationTokenExpiry.toDate();
    if (new Date() > exp) {
      return { success: false, error: 'El enlace de confirmacion ha expirado. Por favor, solicita uno nuevo.' };
    }
  }
  if (data.confirmationStatus === 'confirmed') {
    return { success: false, error: 'Esta cita ya ha sido confirmada.' };
  }
  if (data.confirmationStatus === 'cancelled' || data.status === 'cancelled') {
    return { success: false, error: 'Esta cita ya fue cancelada.' };
  }
  const dateVal = data.date?.toDate ? data.date.toDate() : data.date;
  await ref.update({
    confirmationStatus: 'confirmed',
    confirmedAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  await db.collection('barbers').doc(businessId).collection('notifications').add({
    type: 'appointment_confirmed_by_client',
    appointmentId: id,
    clientName: data.clientName || 'Cliente',
    clientPhone: data.clientPhone || '',
    barberName: data.barberName || '',
    barberId: data.barberId || '',
    appointmentDate: dateVal instanceof Date ? Timestamp.fromDate(dateVal) : dateVal,
    read: false,
    createdAt: Timestamp.now()
  });
  return { success: true, appointmentId: id, businessId };
}

async function appointmentCancelByToken(db, { token }) {
  const found = await findAppointmentByConfirmationToken(db, token);
  if (!found) {
    return { success: false, error: 'Token no encontrado o invalido' };
  }
  const { ref, data, id, businessId } = found;
  if (data.confirmationTokenExpiry) {
    const exp = data.confirmationTokenExpiry.toDate();
    if (new Date() > exp) {
      return { success: false, error: 'El enlace de confirmacion ha expirado. Por favor, solicita uno nuevo.' };
    }
  }
  if (data.confirmationStatus === 'confirmed') {
    return { success: false, error: 'Esta cita ya ha sido confirmada.' };
  }
  if (data.confirmationStatus === 'cancelled' || data.status === 'cancelled') {
    return { success: false, error: 'Esta cita ya fue cancelada.' };
  }
  const dateVal = data.date?.toDate ? data.date.toDate() : data.date;
  await ref.update({
    status: 'cancelled',
    confirmationStatus: 'cancelled',
    cancelledAt: Timestamp.now(),
    cancelledBy: 'client',
    updatedAt: Timestamp.now()
  });
  await db.collection('barbers').doc(businessId).collection('notifications').add({
    type: 'appointment_cancelled_by_client',
    appointmentId: id,
    clientName: data.clientName || 'Cliente',
    clientPhone: data.clientPhone || '',
    barberName: data.barberName || '',
    barberId: data.barberId || '',
    appointmentDate: dateVal instanceof Date ? Timestamp.fromDate(dateVal) : dateVal,
    read: false,
    createdAt: Timestamp.now()
  });
  return { success: true, appointmentId: id, businessId };
}

module.exports = {
  publicGetAppointmentsForDay,
  publicGetAppointmentsByPhone,
  publicCancelAppointment,
  appointmentGetByToken,
  appointmentConfirmByToken,
  appointmentCancelByToken
};
