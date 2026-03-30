import { 
  collection, 
  collectionGroup,
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from './config';
import { callHttps } from './functionsClient';
import { normalizeDateToLocalNoon, parseDateStringToLocal } from '../utils/blockDateUtils';

/** Obtiene el perfil de usuario (rol, barberId, businessId) */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { success: true, data: docSnap.data() };
    return { success: true, data: null };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Crea o actualiza el perfil de usuario */
export const setUserProfile = async (uid, data) => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
    return { success: true };
  } catch (_err) {
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
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

export const createInitialBarberData = async (uid, email) => {
  const buildPayload = () => {
    const adminBarberId = `barber-${uid.slice(0, 8)}`;
    return {
      uid,
      email,
      name: '',
      phone: '',
      address: '',
      openingTime: '09:00',
      closingTime: '18:00',
      appointmentDuration: 30,
      workingDays: [1, 2, 3, 4, 5, 6],
      barbers: [
        {
          id: adminBarberId,
          uid,
          name: (email || '').split('@')[0] || 'Administrador',
          email: email || '',
          active: true,
          autoAccept: false
        }
      ],
      configurado: false,
      createdAt: Timestamp.now()
    };
  };

  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, buildPayload());
    }
  } catch (_err) {
    console.error('Error creating initial barber data:', error);
    try {
      await setUserProfile(uid, {
        role: 'admin',
        businessId: uid,
        email: email || '',
        mustChangePassword: false,
        recoveredAt: new Date()
      });

      const retryRef = doc(db, 'barbers', uid, 'config', 'barberdata');
      const retrySnap = await getDoc(retryRef);
      if (!retrySnap.exists()) {
        await setDoc(retryRef, buildPayload());
      }
    } catch (retryError) {
      console.error('Error retrying initial barber data creation:', retryError);
    }
  }
};

/** Busca si un email pertenece a un barbero de alguna barbería */
export const findBarberAssignmentByEmail = async (email) => {
  try {
    const normalizedEmail = (email || '').trim().toLowerCase();
    if (!normalizedEmail) return { success: true, data: null };

    // collectionGroup retorna todos los docs en subcollections 'config';
    // filtramos por ID 'barberdata' en el loop ya que where(documentId()) no
    // funciona correctamente en collection group queries (compara ruta completa).
    const configsSnap = await getDocs(collectionGroup(db, 'config'));

    for (const configDoc of configsSnap.docs) {
      if (configDoc.id !== 'barberdata') continue;

      const businessId = configDoc.ref.parent?.parent?.id;
      if (!businessId) continue;

      const barbers = configDoc.data().barbers || [];
      const matched = barbers.find((barber) => (barber.email || '').trim().toLowerCase() === normalizedEmail);

      if (matched) {
        return {
          success: true,
          data: {
            businessId,
            barberId: matched.id,
            mustChangePassword: !!matched.temporaryPasswordActive,
          }
        };
      }
    }

    return { success: true, data: null };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Actualiza los datos de la barbería */
export const updateBarberData = async (uid, data) => {
  try {
    await setDoc(doc(db, 'barbers', uid, 'config', 'barberdata'), data, { merge: true });
    return { success: true };
  } catch (_err) {
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
  } catch (_err) {
    console.error('Error al obtener citas:', error);
    return { success: false, error: error.message };
  }
};

/** Suscripción en tiempo real de citas para el dashboard */
export const subscribeToAppointmentsRealtime = (uid, startDate, endDate, barberId, onData, onError) => {
  const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
  const constraints = [
    where('date', '>=', Timestamp.fromDate(startDate)),
    orderBy('date', 'asc')
  ];

  if (endDate) {
    constraints.splice(1, 0, where('date', '<=', Timestamp.fromDate(endDate)));
  }

  const q = query(appointmentsRef, ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      let appointments = [];
      snapshot.forEach((d) => {
        const data = d.data();
        appointments.push({ id: d.id, ...data, date: data.date?.toDate ? data.date.toDate() : data.date });
      });

      if (barberId) {
        appointments = appointments.filter((apt) => apt.barberId === barberId);
      }

      onData(appointments);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
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
  } catch (_err) {
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
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Elimina una cita */
export const deleteAppointment = async (uid, appointmentId) => {
  try {
    await deleteDoc(doc(db, 'barbers', uid, 'appointments', appointmentId));
    return { success: true };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/**
 * CAMBIO 5: Cancela una cita por el cliente y genera notificación para el barbero
 */
export const cancelAppointmentByClient = async (uid, appointmentId, appointmentData) => {
  try {
    await callHttps('publicCancelAppointment', {
      businessId: uid,
      appointmentId,
      phone: (appointmentData.clientPhone || '').trim()
    });
    return { success: true };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/**
 * CAMBIO 5: Busca citas activas de un cliente por teléfono
 */
export const getClientAppointmentsByPhone = async (uid, phone) => {
  try {
    const { appointments: raw } = await callHttps('publicGetAppointmentsByPhone', {
      businessId: uid,
      phone: phone.trim()
    });
    const appointments = (raw || []).map((apt) => ({
      ...apt,
      date: typeof apt.date === 'string' ? new Date(apt.date) : apt.date
    }));
    return { success: true, data: appointments };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Obtiene citas para una fecha específica (página pública) */
export const getAppointmentsByDate = async (uid, date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const { appointments: raw } = await callHttps('publicGetAppointmentsForDay', {
      businessId: uid,
      startMs: startOfDay.getTime(),
      endMs: endOfDay.getTime()
    });
    const appointments = (raw || []).map((d) => ({
      ...d,
      date: typeof d.date === 'string' ? new Date(d.date) : d.date
    }));
    return { success: true, data: appointments };
  } catch (_err) {
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
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Obtiene configuración de horario específica de un barbero */
export const getBarberScheduleConfig = async (businessId, barberId) => {
  try {
    const configRef = doc(db, 'barbers', businessId, 'barberConfigs', barberId);
    const configSnap = await getDoc(configRef);

    if (configSnap.exists()) {
      return { success: true, data: configSnap.data() };
    }

    return { success: false, error: 'No se encontró configuración del barbero' };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Obtiene un mapa de configuraciones por barbero */
export const getAllBarberScheduleConfigs = async (businessId) => {
  try {
    const snapshot = await getDocs(collection(db, 'barbers', businessId, 'barberConfigs'));
    const configs = {};
    snapshot.forEach((d) => {
      configs[d.id] = d.data();
    });
    return { success: true, data: configs };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Crea o actualiza la configuración de horario de un barbero */
export const upsertBarberScheduleConfig = async (businessId, barberId, configData) => {
  try {
    await setDoc(
      doc(db, 'barbers', businessId, 'barberConfigs', barberId),
      {
        ...configData,
        barberId,
        updatedAt: Timestamp.now()
      },
      { merge: true }
    );
    return { success: true };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Marca que la contraseña temporal ya fue reemplazada */
export const deactivateBarberTemporaryPassword = async (businessId, barberId) => {
  try {
    const barberDataRef = doc(db, 'barbers', businessId, 'config', 'barberdata');
    const barberDataSnap = await getDoc(barberDataRef);
    if (!barberDataSnap.exists()) {
      return { success: false, error: 'No se encontró barberdata' };
    }

    const current = barberDataSnap.data();
    const barbers = (current.barbers || []).map((barber) => {
      if (barber.id !== barberId) return barber;
      return {
        ...barber,
        temporaryPassword: '',
        temporaryPasswordActive: false
      };
    });

    await updateDoc(barberDataRef, { barbers, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

// ── CAMBIO 2 & 3: Sistema de Bloqueos por Barbero ──────────────────────────

/** Obtiene todos los bloqueos (días completos y rangos de horas) */
export const getBarberBlocks = async (uid, barberId = null) => {
  try {
    const blocksRef = collection(db, 'barbers', uid, 'bloqueos');
    let snapshot;
    
    // Intenta con query compuesto si hay barberId
    if (barberId) {
      try {
        const q = query(blocksRef, where('barberId', '==', barberId), orderBy('fecha', 'asc'));
        snapshot = await getDocs(q);
      } catch (_err) {
        // Si falla por índice compuesto, obtiene todos y filtra en cliente
        if (error.code === 'failed-precondition' || error.message?.includes('index')) {
          console.warn('Índice compuesto no disponible, filtrando en cliente:', error.message);
          const q = query(blocksRef, orderBy('fecha', 'asc'));
          snapshot = await getDocs(q);
        } else {
          throw error;
        }
      }
    } else {
      const q = query(blocksRef, orderBy('fecha', 'asc'));
      snapshot = await getDocs(q);
    }

    const blocks = [];
    snapshot.forEach(d => {
      const data = d.data();
      const normalizedFecha = normalizeDateToLocalNoon(data.fecha);
      blocks.push({ 
        id: d.id, 
        ...data, 
        fecha: normalizedFecha
      });
    });
    
    // Filtra por barberId si es necesario (fallback para índice)
    if (barberId) {
      return { 
        success: true, 
        data: blocks.filter(b => b.barberId === barberId).sort((a, b) => a.fecha - b.fecha)
      };
    }
    
    return { success: true, data: blocks };
  } catch (_err) {
    console.error('Error al obtener bloqueos:', error);
    // Retorna error pero con datos vacíos para no romper la app
    return { success: false, error: error.message, data: [] };
  }
};

/** Crea un nuevo bloqueo (día completo o específico) */
export const addBarberBlock = async (uid, blockData) => {
  try {
    if (!uid) {
      return { success: false, error: 'UID del negocio no disponible' };
    }
    if (!blockData?.barberId || typeof blockData.barberId !== 'string') {
      return { success: false, error: 'barberId inválido para crear bloqueo' };
    }

    const blocksRef = collection(db, 'barbers', uid, 'bloqueos');
    const docRef = await addDoc(blocksRef, {
      ...blockData,
      fecha: Timestamp.fromDate(parseDateStringToLocal(blockData.fecha)),
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (_err) {
    console.error('Error al agregar bloqueo:', error);
    const detailed = error?.code ? `${error.code}: ${error.message}` : error.message;
    return { success: false, error: detailed };
  }
};

/** Elimina un bloqueo */
export const deleteBarberBlock = async (uid, blockId) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'bloqueos', blockId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (_err) {
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
  } catch (_err) {
    return { success: false, error: error.message };
  }
};

/** Suscripción en tiempo real de notificaciones no leídas */
export const subscribeToUnreadNotifications = (uid, onData, onError) => {
  const q = query(
    collection(db, 'barbers', uid, 'notifications'),
    where('read', '==', false)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notifications = [];
      snapshot.forEach((d) => notifications.push({ id: d.id, ...d.data() }));
      onData(notifications);
    },
    (error) => {
      if (onError) onError(error);
    }
  );
};

/** Marca una notificación como leída */
export const markNotificationRead = async (uid, notifId) => {
  try {
    await updateDoc(doc(db, 'barbers', uid, 'notifications', notifId), { read: true });
    return { success: true };
  } catch (_err) {
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
  } catch (_err) {
    return { success: false, error: error.message };
  }
};
