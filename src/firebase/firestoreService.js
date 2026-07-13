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
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate() // Convertir Timestamp a Date
      });
    });
    
    return { success: true, data: appointments };
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Crea una nueva cita
 */
export const createAppointment = async (uid, appointmentData) => {
  try {
    const appointmentsRef = collection(db, 'barbers', uid, 'appointments');
    const docRef = await addDoc(appointmentsRef, {
      ...appointmentData,
      date: Timestamp.fromDate(appointmentData.date),
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
 * Obtiene citas para una fecha específica (usado en página pública)
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
    
    querySnapshot.forEach((doc) => {
      appointments.push({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
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
          workingDays: data.workingDays || [1, 2, 3, 4, 5, 6], // 0 = domingo, 6 = sábado
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
 * Crea una solicitud de notificación por email (para Cloud Functions/Netlify Functions)
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
