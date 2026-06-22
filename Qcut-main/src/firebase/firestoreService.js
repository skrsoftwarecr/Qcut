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
  limit,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { db } from './config';

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
  } catch (error) {
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
  } catch (error) {
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
    const barberDataRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const barberDataSnap = await getDoc(barberDataRef);

    let autoAccept = false;
    if (barberDataSnap.exists()) {
      const barberData = barberDataSnap.data() || {};

      if (appointmentData.barberId && Array.isArray(barberData.barbers)) {
        const selectedBarber = barberData.barbers.find((barber) => barber.id === appointmentData.barberId);
        if (typeof selectedBarber?.autoAccept === 'boolean') {
          autoAccept = selectedBarber.autoAccept;
        } else if (typeof barberData.autoAccept === 'boolean') {
          autoAccept = barberData.autoAccept;
        }
      } else if (typeof barberData.autoAccept === 'boolean') {
        autoAccept = barberData.autoAccept;
      }
    }

    const resolvedStatus = autoAccept ? 'confirmed' : 'pending';
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const docRef = await addDoc(appointmentsRef, {
      ...appointmentData,
      status: resolvedStatus,
      date: Timestamp.fromDate(appointmentData.date),
      createdAt: Timestamp.now(),
      reminderSent: false // CAMBIO 4: para recordatorio WhatsApp
    });
    return { success: true, id: docRef.id, status: resolvedStatus, autoAccept };
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
    const rawPhone = (phone || '').trim();
    if (!rawPhone) {
      return { success: true, data: [] };
    }

    const digitsOnly = rawPhone.replace(/\D/g, '');
    const candidates = Array.from(new Set([
      rawPhone,
      rawPhone.replace(/\s+/g, ''),
      rawPhone.replace(/[\s\-()]/g, ''),
      digitsOnly,
      digitsOnly ? `+${digitsOnly}` : ''
    ].filter(Boolean)));

    const ref = collection(db, 'barbers', uid, 'appointments');
    const snapshots = await Promise.all(
      candidates.map((candidate) => getDocs(query(ref, where('clientPhone', '==', candidate), orderBy('date', 'asc'))))
    );

    const now = new Date();
    const appointmentsMap = new Map();

    snapshots.forEach((snapshot) => {
      snapshot.forEach((d) => {
        if (appointmentsMap.has(d.id)) return;
        const data = d.data();
        const aptDate = data.date?.toDate ? data.date.toDate() : new Date(data.date);
        const apt = { id: d.id, ...data, date: aptDate };
        if ((apt.status === 'pending' || apt.status === 'confirmed') && apt.date > now) {
          appointmentsMap.set(d.id, apt);
        }
      });
    });

    const appointments = Array.from(appointmentsMap.values()).sort((a, b) => a.date - b.date);

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

/** Obtiene configuración de horario específica de un barbero */
export const getBarberScheduleConfig = async (businessId, barberId) => {
  try {
    const configRef = doc(db, 'barbers', businessId, 'barberConfigs', barberId);
    const configSnap = await getDoc(configRef);

    if (configSnap.exists()) {
      return { success: true, data: configSnap.data() };
    }

    return { success: false, error: 'No se encontró configuración del barbero' };
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
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
      } catch (error) {
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
    const oldBlocksToDelete = [];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    snapshot.forEach(d => {
      const data = d.data();
      const fecha = data.fecha?.toDate ? data.fecha.toDate() : (data.fecha ? new Date(data.fecha) : new Date());
      if (fecha < oneWeekAgo) {
        oldBlocksToDelete.push(d.ref);
        return;
      }
      blocks.push({ 
        id: d.id, 
        ...data, 
        fecha
      });
    });

    if (oldBlocksToDelete.length) {
      await Promise.all(oldBlocksToDelete.map((docRef) => deleteDoc(docRef)));
    }
    
    // Filtra por barberId si es necesario (fallback para índice)
    if (barberId) {
      return { 
        success: true, 
        data: blocks.filter(b => b.barberId === barberId).sort((a, b) => a.fecha - b.fecha)
      };
    }
    
    return { success: true, data: blocks };
  } catch (error) {
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
      fecha: Timestamp.fromDate(new Date(blockData.fecha)),
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
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
