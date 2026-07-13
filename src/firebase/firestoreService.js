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
  addDoc,
  runTransaction,
  onSnapshot
} from 'firebase/firestore';
import { db } from './config';

/**
 * Obtiene los datos del negocio
 */
export const getBusinessData = async (uid) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'No se encontraron datos del negocio' };
  } catch (error) {
    console.error('Error al obtener datos del negocio:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Actualiza los datos del negocio
 */
export const updateBusinessData = async (uid, data) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'config', 'barberdata');
    await setDoc(docRef, data, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar datos del negocio:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene citas con filtro de fecha
 */
export const getAppointments = async (uid, startDate, endDate) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const constraints = [
      where('date', '>=', Timestamp.fromDate(startDate)),
      orderBy('date', 'asc')
    ];

    if (endDate) {
      constraints.splice(1, 0, where('date', '<=', Timestamp.fromDate(endDate)));
    }

    const q = query(appointmentsRef, ...constraints);
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      appointments.push({
        id: docSnap.id,
        ...data,
        date: data.date?.toDate ? data.date.toDate() : data.date,
        startTime: data.startTime?.toDate ? data.startTime.toDate() : (data.date?.toDate ? data.date.toDate() : null),
        endTime: data.endTime?.toDate ? data.endTime.toDate() : null,
        originalStartTime: data.originalStartTime?.toDate ? data.originalStartTime.toDate() : null,
        originalEndTime: data.originalEndTime?.toDate ? data.originalEndTime.toDate() : null,
      });
    });
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Suscripción en tiempo real a citas (para que el Dashboard se actualice automáticamente)
 */
export const subscribeToAppointments = (uid, startDate, endDate, callback) => {
  const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
  const constraints = [
    where('date', '>=', Timestamp.fromDate(startDate)),
    orderBy('date', 'asc')
  ];

  if (endDate) {
    constraints.splice(1, 0, where('date', '<=', Timestamp.fromDate(endDate)));
  }

  const q = query(appointmentsRef, ...constraints);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const appointments = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      appointments.push({
        id: docSnap.id,
        ...data,
        date: data.date?.toDate ? data.date.toDate() : data.date,
        startTime: data.startTime?.toDate ? data.startTime.toDate() : (data.date?.toDate ? data.date.toDate() : null),
        endTime: data.endTime?.toDate ? data.endTime.toDate() : null,
        originalStartTime: data.originalStartTime?.toDate ? data.originalStartTime.toDate() : null,
        originalEndTime: data.originalEndTime?.toDate ? data.originalEndTime.toDate() : null,
      });
    });
    callback({ success: true, data: appointments });
  }, (error) => {
    console.error('Error en suscripción de citas:', error);
    callback({ success: false, error: error.message });
  });

  return unsubscribe;
};

/**
 * Crea una nueva cita usando una transacción de Firestore
 * para evitar condiciones de carrera (dos reservas simultáneas)
 */
export const createAppointmentWithTransaction = async (uid, appointmentData) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');

    // Verificamos solapamiento leyendo citas del mismo día dentro de la transacción
    const startOfDay = new Date(appointmentData.startTime);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentData.startTime);
    endOfDay.setHours(23, 59, 59, 999);

    const conflictQuery = query(
      appointmentsRef,
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay))
    );

    let newDocId = null;

    await runTransaction(db, async (transaction) => {
      const snapshot = await getDocs(conflictQuery);

      // Verificar solapamiento de rangos
      const newStart = appointmentData.startTime.getTime();
      const newEnd = appointmentData.endTime.getTime();

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const status = data.status;

        // Solo considerar citas activas
        if (status !== 'pending' && status !== 'confirmed' && status !== 'pending_client_confirmation') continue;

        // Filtrar por barbero
        const aptBarberId = data.barberId;
        if (aptBarberId && aptBarberId !== appointmentData.barberId) continue;

        const aptStart = data.startTime?.toDate ? data.startTime.toDate().getTime() : data.date?.toDate().getTime();
        const aptEnd = data.endTime?.toDate ? data.endTime.toDate().getTime() : aptStart + 30 * 60 * 1000;

        // Hay solapamiento si: nuevaInicio < existenteFin AND nuevaFin > existenteInicio
        if (newStart < aptEnd && newEnd > aptStart) {
          throw new Error('SLOT_CONFLICT: El horario seleccionado ya está ocupado.');
        }
      }

      // Sin conflicto — crear el documento
      const newDocRef = doc(appointmentsRef);
      newDocId = newDocRef.id;

      transaction.set(newDocRef, {
        ...appointmentData,
        date: Timestamp.fromDate(appointmentData.startTime),
        startTime: Timestamp.fromDate(appointmentData.startTime),
        endTime: Timestamp.fromDate(appointmentData.endTime),
        originalStartTime: Timestamp.fromDate(appointmentData.startTime),
        originalEndTime: Timestamp.fromDate(appointmentData.endTime),
        adminEdited: false,
        confirmationToken: null,
        cancellationReason: null,
        reminderSent24h: false,
        reminderSent2h: false,
        createdAt: Timestamp.now()
      });
    });

    return { success: true, id: newDocId };
  } catch (error) {
    if (error.message?.startsWith('SLOT_CONFLICT')) {
      return { success: false, error: 'El horario seleccionado ya está ocupado. Por favor elige otro.', conflict: true };
    }
    console.error('Error al crear cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Crea una nueva cita (versión legacy sin transacción — se mantiene por compatibilidad)
 */
export const createAppointment = async (uid, appointmentData) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const startTime = appointmentData.startTime || appointmentData.date;
    const endTime = appointmentData.endTime || new Date(startTime.getTime() + 30 * 60 * 1000);

    const docRef = await addDoc(appointmentsRef, {
      ...appointmentData,
      date: Timestamp.fromDate(startTime),
      startTime: Timestamp.fromDate(startTime),
      endTime: Timestamp.fromDate(endTime),
      originalStartTime: Timestamp.fromDate(startTime),
      originalEndTime: Timestamp.fromDate(endTime),
      adminEdited: false,
      confirmationToken: null,
      cancellationReason: null,
      reminderSent24h: false,
      reminderSent2h: false,
      createdAt: Timestamp.now()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al crear cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Actualiza el estado de una cita
 */
export const updateAppointmentStatus = async (uid, appointmentId, status) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    await updateDoc(docRef, { status, updatedAt: Timestamp.now() });
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Edita el horario de una cita por la administradora y la pone en espera de confirmación del cliente
 */
export const updateAppointmentReschedule = async (uid, appointmentId, newStartTime, newEndTime, confirmationToken) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    await updateDoc(docRef, {
      startTime: Timestamp.fromDate(newStartTime),
      endTime: Timestamp.fromDate(newEndTime),
      date: Timestamp.fromDate(newStartTime),
      adminEdited: true,
      status: 'pending_client_confirmation',
      confirmationToken,
      tokenExpiresAt: Timestamp.fromDate(new Date(Date.now() + 48 * 60 * 60 * 1000)), // 48h
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al reagendar cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Confirma o rechaza un cambio de horario por parte del cliente (usando token)
 */
export const confirmRescheduleByToken = async (uid, appointmentId, action) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    const newStatus = action === 'accept' ? 'confirmed' : 'cancelled_by_client';
    await updateDoc(docRef, {
      status: newStatus,
      confirmationToken: null,
      clientRespondedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al confirmar reagendamiento:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Cancela una cita con motivo — por parte de la administradora
 */
export const cancelAppointmentWithReason = async (uid, appointmentId, reason) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    await updateDoc(docRef, {
      status: 'cancelled',
      cancellationReason: reason,
      cancelledBy: 'admin',
      cancelledAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Elimina una cita
 */
export const deleteAppointment = async (uid, appointmentId) => {
  try {
    const docRef = doc(db, 'barbers', uid, 'appointments', appointmentId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene citas para una fecha específica (usado en página pública de reservas)
 * Devuelve startTime y endTime para validar solapamiento en el frontend
 */
export const getAppointmentsByDate = async (uid, date) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const q = query(
      appointmentsRef,
      where('date', '>=', Timestamp.fromDate(startOfDay)),
      where('date', '<=', Timestamp.fromDate(endOfDay))
    );
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      appointments.push({
        id: docSnap.id,
        ...data,
        date: data.date?.toDate ? data.date.toDate() : data.date,
        startTime: data.startTime?.toDate ? data.startTime.toDate() : (data.date?.toDate ? data.date.toDate() : null),
        endTime: data.endTime?.toDate ? data.endTime.toDate() : null,
      });
    });
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error al obtener citas por fecha:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene la configuración de horarios
 */
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
    console.error('Error al obtener configuración:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtiene una cita por su token de confirmación de reagendamiento
 */
export const getAppointmentByToken = async (uid, token) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const q = query(appointmentsRef, where('confirmationToken', '==', token));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { success: false, error: 'Token no encontrado o ya utilizado' };
    }

    const docSnap = snapshot.docs[0];
    const data = docSnap.data();
    return {
      success: true,
      id: docSnap.id,
      data: {
        ...data,
        date: data.date?.toDate ? data.date.toDate() : data.date,
        startTime: data.startTime?.toDate ? data.startTime.toDate() : null,
        endTime: data.endTime?.toDate ? data.endTime.toDate() : null,
        tokenExpiresAt: data.tokenExpiresAt?.toDate ? data.tokenExpiresAt.toDate() : null,
      }
    };
  } catch (error) {
    console.error('Error al buscar token:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Crea una solicitud de notificación por email (legacy — para Cloud Functions/Netlify Functions)
 */
export const createNotificationRequest = async (uid, payload) => {
  try {
    const notificationsRef = collection(db, 'barbers', uid, 'notifications');
    const docRef = await addDoc(notificationsRef, {
      ...payload,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error al crear notificación:', error);
    return { success: false, error: error.message };
  }
};
