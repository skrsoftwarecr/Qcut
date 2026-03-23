import {
  doc,
  getDoc,
  updateDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from './config';

// ── SISTEMA DE CONFIRMACION DE CITAS ────────────────────────────────────────

/** Genera un token unico para confirmacion de cita */
const generateConfirmationToken = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

/** Calcula fecha de expiracion (14 dias desde ahora) */
const getConfirmationTokenExpiry = () => {
  const date = new Date();
  date.setDate(date.getDate() + 14);
  return date;
};

/** Obtiene URL base segun el ambiente */
const getConfirmationBaseUrl = () => {
  const configured = import.meta.env.VITE_PUBLIC_APP_URL || import.meta.env.VITE_APP_URL || '';

  if (typeof window === 'undefined') {
    return configured || 'https://qcutcr.netlify.app';
  }

  const host = window.location.hostname;
  const isLocalHost = host === 'localhost' || host === '127.0.0.1';

  // En desarrollo local, prioriza el origen actual para facilitar pruebas.
  if (isLocalHost) {
    return window.location.origin;
  }

  // En producción, usa URL configurada si existe; si no, usa el origen actual.
  return configured || window.location.origin;
};

const getGasWebhookUrl = () => {
  return import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby3zwVNyOWyvvq4VNkscvNzqCvcvRpAjJAFdqmb4bi43r2ACJR5VPtSS9dJFz1VZeCq/exec';
};

const resolveAppointmentRef = async (uid, appointmentId) => {
  const directRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
  const directSnap = await getDoc(directRef);

  if (directSnap.exists()) {
    return {
      ref: directRef,
      data: directSnap.data(),
      businessId: uid,
      source: 'direct'
    };
  }

  const cgSnap = await getDocs(collectionGroup(db, 'appointments'));
  const matchedDoc = cgSnap.docs.find((d) => d.id === appointmentId);

  if (!matchedDoc) return null;

  return {
    ref: matchedDoc.ref,
    data: matchedDoc.data(),
    businessId: matchedDoc.ref.parent?.parent?.id,
    source: 'collectionGroup'
  };
};

/** Actualiza/agrega token de confirmacion para una cita existente */
export const updateAppointmentConfirmationToken = async (uid, appointmentId) => {
  try {
    const token = generateConfirmationToken();
    const expiry = getConfirmationTokenExpiry();

    await updateDoc(doc(db, 'barbers', uid, 'appointments', appointmentId), {
      confirmationToken: token,
      confirmationTokenExpiry: Timestamp.fromDate(expiry),
      confirmationStatus: 'pending',
      emailSent: false,
      emailError: null,
      emailSentAt: null,
      emailRetries: 0,
      updatedAt: Timestamp.now()
    });

    return {
      success: true,
      token,
      confirmationUrl: `${getConfirmationBaseUrl()}/confirm-appointment/${token}`
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Registra cuando se envio exitosamente el email de confirmacion */
export const recordEmailSent = async (uid, appointmentId) => {
  try {
    const resolved = await resolveAppointmentRef(uid, appointmentId);
    if (!resolved) {
      return { success: false, error: 'Cita no encontrada' };
    }

    await updateDoc(resolved.ref, {
      emailSent: true,
      emailError: null,
      emailSentAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Registra error al enviar email */
export const recordEmailError = async (uid, appointmentId, errorMessage) => {
  try {
    const resolved = await resolveAppointmentRef(uid, appointmentId);
    if (!resolved) {
      return { success: false, error: 'Cita no encontrada' };
    }

    const retries = (resolved.data?.emailRetries || 0) + 1;

    await updateDoc(resolved.ref, {
      emailError: errorMessage,
      emailRetries: retries,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Obtiene cita por token de confirmacion para validar */
export const getAppointmentByConfirmationToken = async (token) => {
  try {
    const snapshot = await getDocs(
      query(
        collectionGroup(db, 'appointments'),
        where('confirmationToken', '==', token.trim())
      )
    );

    if (snapshot.empty) {
      return { success: false, error: 'Token no encontrado o invalido' };
    }

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();
    const businessId = docSnap.ref.parent?.parent?.id;

    // Validar expiracion del token
    if (data.confirmationTokenExpiry) {
      const expiry = data.confirmationTokenExpiry.toDate();
      if (new Date() > expiry) {
        return { success: false, error: 'El enlace de confirmacion ha expirado. Por favor, solicita uno nuevo.' };
      }
    }

    // Si ya fue confirmada o cancelada
    if (data.confirmationStatus === 'confirmed') {
      return { success: false, error: 'Esta cita ya ha sido confirmada.' };
    }
    if (data.confirmationStatus === 'cancelled' || data.status === 'cancelled') {
      return { success: false, error: 'Esta cita ya fue cancelada.' };
    }

    return {
      success: true,
      data: {
        ...data,
        id: docSnap.id,
        businessId,
        date: data.date?.toDate ? data.date.toDate() : new Date(data.date)
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Confirma una cita usando el token */
export const confirmAppointmentByToken = async (token) => {
  try {
    const appointmentResult = await getAppointmentByConfirmationToken(token);
    if (!appointmentResult.success) {
      return appointmentResult;
    }

    const { id, businessId, clientName, clientPhone, barberName, barberId, date } = appointmentResult.data;

    await updateDoc(doc(db, 'barbers', businessId, 'appointments', id), {
      confirmationStatus: 'confirmed',
      confirmedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    await addDoc(collection(db, 'barbers', businessId, 'notifications'), {
      type: 'appointment_confirmed_by_client',
      appointmentId: id,
      clientName: clientName || 'Cliente',
      clientPhone: clientPhone || '',
      barberName: barberName || '',
      barberId: barberId || '',
      appointmentDate: date instanceof Date ? Timestamp.fromDate(date) : date,
      read: false,
      createdAt: Timestamp.now()
    });

    return { success: true, appointmentId: id, businessId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Cancela una cita desde el enlace del cliente usando el token */
export const cancelAppointmentByToken = async (token) => {
  try {
    const appointmentResult = await getAppointmentByConfirmationToken(token);
    if (!appointmentResult.success) {
      return appointmentResult;
    }

    const { id, businessId, clientName, clientPhone, barberName, barberId, date } = appointmentResult.data;

    await updateDoc(doc(db, 'barbers', businessId, 'appointments', id), {
      status: 'cancelled',
      confirmationStatus: 'cancelled',
      cancelledAt: Timestamp.now(),
      cancelledBy: 'client',
      updatedAt: Timestamp.now()
    });

    await addDoc(collection(db, 'barbers', businessId, 'notifications'), {
      type: 'appointment_cancelled_by_client',
      appointmentId: id,
      clientName: clientName || 'Cliente',
      clientPhone: clientPhone || '',
      barberName: barberName || '',
      barberId: barberId || '',
      appointmentDate: date instanceof Date ? Timestamp.fromDate(date) : date,
      read: false,
      createdAt: Timestamp.now()
    });

    return { success: true, appointmentId: id, businessId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Reprograma una cita (cambia fecha/hora y genera nuevo token de confirmacion) */
export const rescheduleAppointment = async (uid, appointmentId, newDate, newTime, newBarberId = null) => {
  try {
    const appointmentRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    const appointmentSnap = await getDoc(appointmentRef);

    if (!appointmentSnap.exists()) {
      return { success: false, error: 'Cita no encontrada' };
    }

    const oldData = appointmentSnap.data();

    // Crear nueva fecha/hora
    const [year, month, day] = newDate.split('-').map(Number);
    const [hours, minutes] = newTime.split(':').map(Number);
    const newDateObj = new Date(year, month - 1, day, hours, minutes);

    // Generar nuevo token de confirmacion
    const newToken = generateConfirmationToken();
    const expiry = getConfirmationTokenExpiry();

    const updateData = {
      date: Timestamp.fromDate(newDateObj),
      time: newTime,
      confirmationStatus: 'pending',
      confirmationToken: newToken,
      confirmationTokenExpiry: Timestamp.fromDate(expiry),
      emailSent: false,
      emailError: null,
      emailRetries: 0,
      rescheduledAt: Timestamp.now(),
      rescheduledFrom: {
        date: oldData.date,
        time: oldData.time,
        barberId: oldData.barberId
      },
      updatedAt: Timestamp.now()
    };

    // Si se cambio el barbero
    if (newBarberId && newBarberId !== oldData.barberId) {
      updateData.barberId = newBarberId;
    }

    await updateDoc(appointmentRef, updateData);

    return {
      success: true,
      newConfirmationToken: newToken,
      newConfirmationUrl: `${getConfirmationBaseUrl()}/confirm-appointment/${newToken}`,
      appointment: { id: appointmentId, ...updateData }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Obtiene estado de confirmacion de una cita especifica */
export const getAppointmentConfirmationStatus = async (uid, appointmentId) => {
  try {
    const snapshot = await getDoc(doc(db, 'barbers', uid, 'appointments', appointmentId));
    if (!snapshot.exists()) {
      return { success: false, error: 'Cita no encontrada' };
    }

    const data = snapshot.data();
    return {
      success: true,
      data: {
        confirmationStatus: data.confirmationStatus || 'pending',
        emailSent: !!data.emailSent,
        emailError: data.emailError || null,
        emailRetries: data.emailRetries || 0,
        confirmedAt: data.confirmedAt?.toDate(),
        tokenExpiry: data.confirmationTokenExpiry?.toDate()
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Reenvía email de confirmacion para una cita */
export const resendConfirmationEmail = async (uid, appointmentId) => {
  let resolved = null;
  try {
    resolved = await resolveAppointmentRef(uid, appointmentId);
    if (!resolved) {
      return { success: false, error: 'Cita no encontrada' };
    }

    const appointmentRef = resolved.ref;
    const data = resolved.data;

    if (resolved.source !== 'direct') {
      console.warn('[resendConfirmationEmail] UID recibido no coincide con ruta real. uid:', uid, 'resolvedBusinessId:', resolved.businessId, 'apptId:', appointmentId);
    }

    if (data.confirmationStatus === 'confirmed') {
      return { success: false, error: 'La cita ya fue confirmada' };
    }

    let token = data.confirmationToken;
    let expiry = data.confirmationTokenExpiry?.toDate();

    if (!expiry || new Date() > expiry) {
      token = generateConfirmationToken();
      expiry = getConfirmationTokenExpiry();
    }

    // Siempre dejamos la cita en pending al enviar/reenviar enlace, incluso
    // cuando el token vigente no haya expirado (cubre citas heredadas sin estado).
    console.log('[resendConfirmationEmail] uid:', uid, 'businessId:', resolved.businessId, 'apptId:', appointmentId, 'barberId:', data.barberId);
    await updateDoc(appointmentRef, {
      confirmationToken: token,
      confirmationTokenExpiry: Timestamp.fromDate(expiry),
      confirmationStatus: 'pending',
      confirmedAt: null,
      updatedAt: Timestamp.now()
    });

    return {
      success: true,
      token,
      confirmationUrl: `${getConfirmationBaseUrl()}/confirm-appointment/${token}`,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone
    };
  } catch (error) {
    console.error(
      '[resendConfirmationEmail] Error:',
      error.code,
      error.message,
      '| uid:',
      uid,
      '| apptId:',
      appointmentId,
      '| resolvedBusinessId:',
      resolved?.businessId,
      '| source:',
      resolved?.source
    );
    return { success: false, error: error.message };
  }
};

/** Envía email de confirmacion a traves de Google Apps Script */
export const sendConfirmationEmailViaGAS = async (appointmentData, confirmationUrl) => {
  try {
    const gasUrl = getGasWebhookUrl();
    if (!gasUrl) {
      console.error('GAS_WEBHOOK_URL no configurado');
      return { success: false, error: 'Configuracion faltante' };
    }

    const response = await fetch(gasUrl, {
      method: 'POST',
      body: JSON.stringify({
        type: 'appointment_confirmation_needed',
        clientEmail: appointmentData.clientEmail,
        clientName: appointmentData.clientName,
        barberName: appointmentData.barberName,
        appointmentDate: appointmentData.date,
        confirmationUrl,
        clientPhone: appointmentData.clientPhone
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Envía notificacion de cancelacion a traves de Google Apps Script */
export const sendCancellationEmailViaGAS = async (appointmentData) => {
  try {
    const gasUrl = getGasWebhookUrl();
    if (!gasUrl) {
      return { success: false, error: 'Configuracion faltante' };
    }

    const response = await fetch(gasUrl, {
      method: 'POST',
      body: JSON.stringify({
        type: 'appointment_cancelled_by_admin',
        clientEmail: appointmentData.clientEmail,
        clientName: appointmentData.clientName,
        barberName: appointmentData.barberName,
        appointmentDate: appointmentData.date,
        clientPhone: appointmentData.clientPhone
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Envía notificacion de reprogramacion a traves de Google Apps Script */
export const sendRescheduleEmailViaGAS = async (appointmentData, newConfirmationUrl) => {
  try {
    const gasUrl = getGasWebhookUrl();
    if (!gasUrl) {
      return { success: false, error: 'Configuracion faltante' };
    }

    const response = await fetch(gasUrl, {
      method: 'POST',
      body: JSON.stringify({
        type: 'appointment_rescheduled',
        clientEmail: appointmentData.clientEmail,
        clientName: appointmentData.clientName,
        barberName: appointmentData.barberName,
        oldAppointmentDate: appointmentData.oldDate,
        newAppointmentDate: appointmentData.newDate,
        newConfirmationUrl,
        clientPhone: appointmentData.clientPhone
      })
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
