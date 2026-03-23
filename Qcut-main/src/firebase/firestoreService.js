import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { db, app } from './config';

const functions = getFunctions(app);

/** Obtiene el perfil de usuario (rol, barberId, businessId) */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { success: true, data: docSnap.data() };
    return { success: true, data: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Crea o actualiza el perfil de usuario */
export const setUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Obtiene los datos de la barbería */
export const getBarberData = async (uid) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { success: true, data: docSnap.data() };
    return { success: false, error: 'No se encontraron datos de la barbería' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createInitialBarberData = async (uid, email) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid,
        email,
        nombre: '',
        telefono: '',
        direccion: '',
        configurado: false,
        createdAt: new Date()
      });
    }
  } catch (error) {
    console.error('Error creating initial barber data:', error);
  }
};

/** Registrar cuenta autenticada para un barbero (Solución Temporal sin Cloud Functions) */
export const registerBarberInAuth = async (barberData) => {
  try {
    const { barberId, name, email, password } = barberData;
    await setDoc(doc(db, 'barbers', barberId), {
      name,
      email,
      password, // Almacenar temporalmente (solo por la instruccion de evitar auth)
      role: 'barber',
      createdAt: new Date()
    });
    return { success: true, data: { uid: barberId } };
  } catch (error) {
    console.error('Error al crear documento temporal de barbero:', error);
    return { success: false, error: error.message };
  }
};

/** Actualiza los datos de la barbería */
export const updateBarberData = async (uid, data) => {
  try {
    await setDoc(doc(db, 'barbers', uid, 'config', 'barberdata'), data, { merge: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene citas con filtro de fecha y barbero opcional (filtro client-side para evitar índices compuestos)
 */
export const getAppointments = async (uid, startDate, endDate, barberId = null) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const constraints = [
      where('date', '>=', Timestamp.fromDate(startDate)),
      orderBy('date', 'asc')
    ];
    if (endDate) constraints.splice(1, 0, where('date', '<=', Timestamp.fromDate(endDate)));

    const querySnapshot = await getDocs(query(appointmentsRef, ...constraints));
    let appointments = [];
    querySnapshot.forEach((d) => {
      appointments.push({ id: d.id, ...d.data(), date: d.data().date.toDate() });
    });

    // CAMBIO 1: filtro por barberId para privacidad entre barberos
    if (barberId) {
      appointments = appointments.filter(apt => apt.barberId === barberId);
    }

    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return { success: false, error: error.message };
  }
};

/** Crea una nueva cita */
export const createAppointment = async (uid, appointmentData) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const docRef = await addDoc(appointmentsRef, {
      ...appointmentData,
      date: Timestamp.fromDate(appointmentData.date),
      createdAt: Timestamp.now(),
      reminderSent: false // CAMBIO 4: para recordatorio WhatsApp
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Actualiza el estado de una cita */
export const updateAppointmentStatus = async (uid, appointmentId, status) => {
  try {
    await updateDoc(doc(db, 'barbers', uid, 'appointments', appointmentId), {
      status,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Elimina una cita */
export const deleteAppointment = async (uid, appointmentId) => {
  try {
    await deleteDoc(doc(db, 'barbers', uid, 'appointments', appointmentId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * CAMBIO 5: Cancela una cita por el cliente y genera notificación para el barbero
 */
export const cancelAppointmentByClient = async (uid, appointmentId, appointmentData) => {
  try {
    await updateDoc(doc(db, 'barbers', uid, 'appointments', appointmentId), {
      status: 'cancelled',
      cancelledBy: 'client',
      cancelledAt: Timestamp.now()
    });

    // Notificación push en Firestore para el barbero
    await addDoc(collection(db, 'barbers', uid, 'notifications'), {
      type: 'appointment_cancelled_by_client',
      appointmentId,
      clientName: appointmentData.clientName || 'Cliente',
      clientPhone: appointmentData.clientPhone || '',
      barberName: appointmentData.barberName || '',
      barberId: appointmentData.barberId || '',
      appointmentDate: appointmentData.date instanceof Date
        ? Timestamp.fromDate(appointmentData.date)
        : appointmentData.date,
      read: false,
      createdAt: Timestamp.now()
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * CAMBIO 5: Busca citas activas de un cliente por teléfono
 */
export const getClientAppointmentsByPhone = async (uid, phone) => {
  try {
    const ref = collection(db, 'barbers', uid, 'appointments');
    const q = query(ref, where('clientPhone', '==', phone.trim()), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    const now = new Date();
    const appointments = [];
    snapshot.forEach(d => {
      const data = d.data();
      const apt = { id: d.id, ...data, date: data.date.toDate() };
      if ((apt.status === 'pending' || apt.status === 'confirmed') && apt.date > now) {
        appointments.push(apt);
      }
    });
    return { success: true, data: appointments };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Obtiene citas para una fecha específica (página pública) */
export const getAppointmentsByDate = async (uid, date) => {
  try {
    const startOfDay = new Date(date); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date); endOfDay.setHours(23, 59, 59, 999);
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const q = query(
      appointmentsRef,
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay))
    );
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((d) => {
      appointments.push({ id: d.id, ...d.data(), date: d.data().date.toDate() });
    });
    return { success: true, data: appointments };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Obtiene la configuración de horarios */
export const getScheduleConfig = async (uid) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        success: true,
        data: {
          openingTime: data.openingTime || '09:00',
          closingTime: data.closingTime || '18:00',
          appointmentDuration: data.appointmentDuration || 30,
          workingDays: data.workingDays || [1, 2, 3, 4, 5, 6],
          blockedTimes: data.blockedTimes || []
        }
      };
    }
    return { success: false, error: 'No se encontró configuración' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ── CAMBIO 2 & 3: Sistema de Bloqueos por Barbero ──────────────────────────

/** Obtiene todos los bloqueos (días completos y rangos de horas) */
export const getBarberBlocks = async (uid, barberId = null) => {
  try {
    const blocksRef = collection(db, 'barbers', uid, 'bloqueos');
    let q = query(blocksRef, orderBy('fecha', 'asc'));
    
    if (barberId) {
      q = query(blocksRef, where('barberId', '==', barberId), orderBy('fecha', 'asc'));
    }

    const snapshot = await getDocs(q);
    const blocks = [];
    snapshot.forEach(d => {
      const data = d.data();
      blocks.push({ 
        id: d.id, 
        ...data, 
        fecha: data.fecha.toDate() 
      });
    });
    return { success: true, data: blocks };
  } catch (error) {
    console.error('Error al obtener bloqueos:', error);
    return { success: false, error: error.message };
  }
};

/** Crea un nuevo bloqueo (día completo o específico) */
export const addBarberBlock = async (uid, blockData) => {
  try {
    const blocksRef = collection(db, 'barbers', uid, 'bloqueos');
    const docRef = await addDoc(blocksRef, {
      ...blockData,
      fecha: Timestamp.fromDate(new Date(blockData.fecha)),
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al agregar bloqueo:', error);
    return { success: false, error: error.message };
  }
};

/** Elimina un bloqueo */
export const deleteBarberBlock = async (uid, blockId) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'bloqueos', blockId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar bloqueo:', error);
    return { success: false, error: error.message };
  }
};

// ── CAMBIO 5: Notificaciones ───────────────────────────────────────────────

/** Obtiene notificaciones no leídas */
export const getUnreadNotifications = async (uid) => {
  try {
    const q = query(
      collection(db, 'barbers', uid, 'notifications'),
      where('read', '==', false),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const notifications = [];
    snapshot.forEach(d => notifications.push({ id: d.id, ...d.data() }));
    return { success: true, data: notifications };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Marca una notificación como leída */
export const markNotificationRead = async (uid, notifId) => {
  try {
    await updateDoc(doc(db, 'barbers', uid, 'notifications', notifId), { read: true });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/** Crea una solicitud de notificación por email */
export const createNotificationRequest = async (uid, payload) => {
  try {
    const docRef = await addDoc(collection(db, 'barbers', uid, 'notifications'), {
      ...payload,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
