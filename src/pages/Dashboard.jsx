import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { GOOGLE_SCRIPT_URL } from '../config/constants';
import {
  getAppointments,
  subscribeToAppointmentsRealtime,
  updateAppointmentStatus,
  subscribeToUnreadNotifications,
  markNotificationRead,
  setUserProfile,
  deactivateBarberTemporaryPassword
} from '../firebase/firestoreService';
import {
  resendConfirmationEmail,
  recordEmailSent,
  recordEmailError,
  sendConfirmationEmailViaGAS,
  rescheduleAppointment,
  sendRescheduleEmailViaGAS,
  sendCancellationEmailViaGAS
} from '../firebase/appointmentConfirmation';
import { changeCurrentUserPassword } from '../firebase/authService';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Check, 
  X, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { format, startOfDay, endOfDay, addDays, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { uid, effectiveUid, linkedBarberId, businessId, isAdmin, mustChangePassword, refreshUserProfile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('today'); // today, week, biweekly, upcoming
  const [viewMode, setViewMode] = useState('appointments'); // appointments | confirmations
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmationDateFilter, setConfirmationDateFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    appointmentId: null,
    newStatus: null,
    appointmentName: '',
    action: ''
  });
  const [rescheduleModal, setRescheduleModal] = useState({
    open: false,
    appointmentId: null,
    newDate: '',
    newTime: '',
    newBarberId: '',
    loading: false
  });
  const [cancelModal, setCancelModal] = useState({
    open: false,
    appointmentId: null,
    reason: '',
    loading: false
  });
  const [passwordModal, setPasswordModal] = useState({
    newPassword: '',
    confirmPassword: '',
    saving: false,
    error: ''
  });
  const [activityFeed, setActivityFeed] = useState([]);
  const processedNotificationIds = useRef(new Set());

  // Calcular rango de fechas según filtro
  const dateRange = useMemo(() => {
    const now = new Date();
    let start, end;

    switch (filter) {
      case 'today':
        start = startOfDay(now);
        end = endOfDay(now);
        break;
      case 'week':
        start = startOfDay(now);
        end = endOfDay(addDays(now, 7));
        break;
      case 'biweekly':
        start = startOfDay(now);
        end = endOfDay(addDays(now, 15));
        break;
      case 'upcoming':
        start = startOfDay(now);
        end = null;
        break;
      default:
        start = startOfDay(now);
        end = endOfDay(now);
    }

    return { start, end };
  }, [filter]);

  const activeDateRange = useMemo(() => {
    if (viewMode === 'confirmations' && confirmationDateFilter) {
      const selectedDate = new Date(`${confirmationDateFilter}T00:00:00`);
      return {
        start: startOfDay(selectedDate),
        end: endOfDay(selectedDate)
      };
    }

    return dateRange;
  }, [viewMode, confirmationDateFilter, dateRange]);

  // Cargar citas — CAMBIO 2: filtra por barberId si el usuario es un barbero
  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const filterBarberId = isAdmin ? null : linkedBarberId;
    const result = await getAppointments(effectiveUid, activeDateRange.start, activeDateRange.end, filterBarberId);
    
    if (result.success) {
      setAppointments(result.data);
    } else {
      toast.error('Error al cargar citas');
    }
    
    setLoading(false);
  }, [effectiveUid, activeDateRange, isAdmin, linkedBarberId]);

  useEffect(() => {
    if (!effectiveUid) return;

    setLoading(true);
    const filterBarberId = isAdmin ? null : linkedBarberId;

    const unsubscribe = subscribeToAppointmentsRealtime(
      effectiveUid,
      activeDateRange.start,
      activeDateRange.end,
      filterBarberId,
      (data) => {
        setAppointments(data);
        setLoading(false);
      },
      () => {
        toast.error('Error al sincronizar citas en tiempo real');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [effectiveUid, isAdmin, linkedBarberId, activeDateRange]);

  useEffect(() => {
    if (viewMode === 'confirmations' && !confirmationDateFilter) {
      setConfirmationDateFilter(format(new Date(), 'yyyy-MM-dd'));
    }
  }, [viewMode, confirmationDateFilter]);

  const handleRealtimeNotification = useCallback((notif) => {
    const createdAt = notif.createdAt?.toDate ? notif.createdAt.toDate() : new Date();

    if (notif.type === 'appointment_cancelled_by_client') {
      const message = `${notif.clientName} canceló su cita con ${notif.barberName || 'el barbero'}`;
      toast.error(`❌ ${message}`, { duration: 7000, id: notif.id });
      setActivityFeed((prev) => [{ id: notif.id, type: notif.type, message, createdAt }, ...prev].slice(0, 8));
      return;
    }

    if (notif.type === 'appointment_confirmed_by_client') {
      const message = `${notif.clientName} confirmó su cita con ${notif.barberName || 'el barbero'}`;
      toast.success(`✅ ${message}`, { duration: 7000, id: notif.id });
      setActivityFeed((prev) => [{ id: notif.id, type: notif.type, message, createdAt }, ...prev].slice(0, 8));
      return;
    }

    if (notif.type === 'whatsapp_reminder_pending') {
      toast(
        `📱 Recordatorio pendiente: ${notif.clientName} — ${notif.clientPhone}`,
        { duration: 8000, id: notif.id, icon: '💬' }
      );
    }
  }, []);

  useEffect(() => {
    if (!effectiveUid) return;

    const unsubscribe = subscribeToUnreadNotifications(
      effectiveUid,
      (notifications) => {
        const sortedNotifications = [...notifications].sort((a, b) => {
          const aDate = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
          const bDate = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
          return bDate - aDate;
        });

        sortedNotifications.forEach((notif) => {
          if (processedNotificationIds.current.has(notif.id)) return;
          processedNotificationIds.current.add(notif.id);
          handleRealtimeNotification(notif);
          markNotificationRead(effectiveUid, notif.id).catch(() => {});
        });
      },
      (error) => {
        console.warn('Realtime notifications sync warning:', error?.message || error);
      }
    );

    return () => unsubscribe();
  }, [effectiveUid, handleRealtimeNotification]);

  // Filtrar citas por búsqueda
  const filteredAppointments = useMemo(() => {
    if (!searchTerm) return appointments;
    
    const term = searchTerm.toLowerCase();
    return appointments.filter(apt => 
      apt.clientName?.toLowerCase().includes(term) ||
      apt.clientPhone?.includes(term) ||
      apt.clientEmail?.toLowerCase().includes(term) ||
      apt.barberName?.toLowerCase().includes(term)
    );
  }, [appointments, searchTerm]);

  // Agrupar citas por estado
  const groupedAppointments = useMemo(() => {
    return {
      pending: filteredAppointments.filter(apt => apt.status === 'pending'),
      confirmed: filteredAppointments.filter(apt => apt.status === 'confirmed'),
      completed: filteredAppointments.filter(apt => apt.status === 'completed'),
      cancelled: filteredAppointments.filter(apt => apt.status === 'cancelled')
    };
  }, [filteredAppointments]);

  const pendingConfirmationAppointments = useMemo(() => {
    return filteredAppointments.filter(
      apt => apt.confirmationStatus === 'pending' && apt.status !== 'cancelled'
    );
  }, [filteredAppointments]);

  const clientConfirmationAppointments = useMemo(() => {
    return filteredAppointments.filter(apt => apt.status !== 'cancelled');
  }, [filteredAppointments]);

  const filteredClientConfirmationAppointments = useMemo(() => {
    if (!confirmationDateFilter) return clientConfirmationAppointments;
    const selectedDate = new Date(`${confirmationDateFilter}T00:00:00`);
    return clientConfirmationAppointments.filter(apt => isSameDay(apt.date, selectedDate));
  }, [clientConfirmationAppointments, confirmationDateFilter]);

  const clientConfirmationStats = useMemo(() => {
    const pending = filteredClientConfirmationAppointments.filter(
      apt => (apt.confirmationStatus || 'pending') === 'pending'
    ).length;
    const confirmed = filteredClientConfirmationAppointments.filter(
      apt => apt.confirmationStatus === 'confirmed'
    ).length;
    const withEmailError = filteredClientConfirmationAppointments.filter(
      apt => !!apt.emailError
    ).length;

    return { pending, confirmed, withEmailError };
  }, [filteredClientConfirmationAppointments]);

  const clientDecisionSummary = useMemo(() => {
    const toDate = (value, fallback) => {
      if (!value) return fallback;
      if (value instanceof Date) return value;
      if (value?.toDate) return value.toDate();
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? fallback : parsed;
    };

    const confirmedByClient = filteredAppointments
      .filter((apt) => apt.confirmationStatus === 'confirmed' && apt.status !== 'cancelled')
      .map((apt) => ({ ...apt, decisionDate: toDate(apt.confirmedAt, apt.date) }))
      .sort((a, b) => b.decisionDate - a.decisionDate);

    const cancelledByClient = filteredAppointments
      .filter((apt) => apt.status === 'cancelled' && apt.cancelledBy === 'client')
      .map((apt) => ({ ...apt, decisionDate: toDate(apt.cancelledAt, apt.date) }))
      .sort((a, b) => b.decisionDate - a.decisionDate);

    return { confirmedByClient, cancelledByClient };
  }, [filteredAppointments]);

  const handleSendClientConfirmationRequest = async (appointment) => {
    if (!appointment?.clientEmail) {
      toast.error('La cita no tiene email del cliente');
      return;
    }

    try {
      const tokenResult = await resendConfirmationEmail(effectiveUid, appointment.id);
      if (!tokenResult.success) {
        toast.error('Error al preparar confirmación: ' + tokenResult.error);
        return;
      }

      const emailResult = await sendConfirmationEmailViaGAS(appointment, tokenResult.confirmationUrl);
      if (!emailResult.success) {
        await recordEmailError(effectiveUid, appointment.id, emailResult.error || 'Error enviando correo');
        toast.error('No se pudo enviar el correo');
        return;
      }

      await recordEmailSent(effectiveUid, appointment.id);
      toast.success('Solicitud de confirmación enviada al cliente');
      loadAppointments();
    } catch (_err) {
      await recordEmailError(effectiveUid, appointment.id, error.message || 'Error inesperado');
      toast.error('Error enviando solicitud de confirmación');
    }
  };

  // Actualizar estado de cita
  const handleUpdateStatus = async (appointmentId, newStatus) => {
    const appointment = filteredAppointments.find(apt => apt.id === appointmentId);
    
    let action = '';
    if (newStatus === 'confirmed') action = 'Confirmar cita';
    else if (newStatus === 'completed') action = 'Marcar como completada';
    else if (newStatus === 'cancelled') action = 'Cancelar cita';
    
    // Mostrar modal de confirmación
    setConfirmModal({
      open: true,
      appointmentId,
      newStatus,
      appointmentName: appointment?.clientName || 'Cliente',
      action
    });
  };

  // Confirmar acción (después de que el usuario confirma en el modal)
  const handleConfirmAction = async () => {
    const { appointmentId, newStatus } = confirmModal;
    setConfirmModal({ open: false, appointmentId: null, newStatus: null, appointmentName: '', action: '' });
    
    setUpdatingId(appointmentId);
    const result = await updateAppointmentStatus(effectiveUid, appointmentId, newStatus);
    
    if (result.success) {
      // Si fue confirmado, notificar al cliente SOLO si estaba pendiente (no si es auto-confirmada)
      if (newStatus === 'confirmed') {
        const appointment = filteredAppointments.find(apt => apt.id === appointmentId);
        // Solo enviar confirmación si estaba en estado 'pending' (es decir, barbero la aprobó)
        // No enviar si es auto-confirmada
        if (appointment && appointment.clientEmail && appointment.status === 'pending' && GOOGLE_SCRIPT_URL) {
          
          const confirmPayload = {
            type: 'appointment_confirmed',
            clientEmail: appointment.clientEmail,
            clientName: appointment.clientName,
            barberName: appointment.barberName,
            appointmentDate: appointment.date.toISOString()
          };
          
          console.log('📧 ENVIANDO CONFIRMACIÓN (Barbero aprobó)');
          console.log('Payload confirmación:', confirmPayload);
          
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(confirmPayload)
          })
          .then(response => {
            console.log('✅ Email confirmación enviado');
            return response.json();
          })
          .catch(err => {
            console.error('❌ Error notificando cliente:', err);
          });
        } else if (appointment && appointment.status === 'confirmed') {
          console.log('ℹ️ Cita ya estaba confirmada (auto-confirmada), no se envía email');
        } else if (!GOOGLE_SCRIPT_URL) {
          console.warn('⚠️ VITE_GOOGLE_SCRIPT_URL no está configurada. Se omite envío de email de confirmación.');
        } else {
          console.warn('❌ NO SE ENVIÓ CONFIRMACIÓN - Email cliente vacío o cita no encontrada');
        }
      }
      
      // Si fue rechazada, notificar al cliente
      if (newStatus === 'cancelled') {
        const appointment = filteredAppointments.find(apt => apt.id === appointmentId);
        if (appointment && appointment.clientEmail && GOOGLE_SCRIPT_URL) {
          
          const rejectPayload = {
            type: 'appointment_rejected',
            clientEmail: appointment.clientEmail,
            clientName: appointment.clientName,
            barberName: appointment.barberName,
            appointmentDate: appointment.date.toISOString()
          };
          
          console.log('📧 ENVIANDO RECHAZO');
          console.log('Payload rechazo:', rejectPayload);
          
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(rejectPayload)
          })
          .then(response => {
            console.log('✅ Email de rechazo enviado');
            return response.json();
          })
          .catch(err => {
            console.error('❌ Error notificando rechazo:', err);
          });
        } else if (!GOOGLE_SCRIPT_URL) {
          console.warn('⚠️ VITE_GOOGLE_SCRIPT_URL no está configurada. Se omite envío de email de rechazo.');
        }
      }
      
      toast.success('Cita actualizada');
      loadAppointments();
    } else {
      toast.error('Error al actualizar cita');
    }
    
    setUpdatingId(null);
  };

  // Reprogramar cita
  const handleRescheduleAppointment = async (appointmentId, newDate, newTime, newBarberId) => {
    try {
      setRescheduleModal(prev => ({ ...prev, loading: true }));
      
      const result = await rescheduleAppointment(effectiveUid, appointmentId, newDate, newTime, newBarberId);
      
      if (result.success) {
        const appointment = filteredAppointments.find(apt => apt.id === appointmentId);
        
        // Enviar email con nuevo token al cliente
        if (appointment && appointment.clientEmail && GOOGLE_SCRIPT_URL) {
          const reschedulePayload = {
            type: 'appointment_rescheduled',
            clientEmail: appointment.clientEmail,
            clientName: appointment.clientName,
            barberName: appointment.barberName,
            oldDate: appointment.date.toISOString(),
            newDate: new Date(`${newDate}T${newTime}`).toISOString(),
            confirmationLink: result.newConfirmationUrl
          };
          
          await sendRescheduleEmailViaGAS(reschedulePayload);
        }
        
        toast.success('Cita reprogramada y correo enviado');
        setRescheduleModal({ open: false, appointmentId: null, newDate: '', newTime: '', newBarberId: '', loading: false });
        loadAppointments();
      } else {
        toast.error('Error al reprogramar: ' + result.error);
      }
    } catch (err) {
      console.error('Error reprogramando:', err);
      toast.error('Error al reprogramar cita');
    } finally {
      setRescheduleModal(prev => ({ ...prev, loading: false }));
    }
  };

  // Cancelar cita
  const handleCancelAppointment = async (appointmentId, reason) => {
    try {
      setCancelModal(prev => ({ ...prev, loading: true }));
      
      const appointment = filteredAppointments.find(apt => apt.id === appointmentId);
      
      // Enviar email de cancelación al cliente
      if (appointment && appointment.clientEmail && GOOGLE_SCRIPT_URL) {
        const cancelPayload = {
          type: 'appointment_cancelled_by_admin',
          clientEmail: appointment.clientEmail,
          clientName: appointment.clientName,
          barberName: appointment.barberName,
          appointmentDate: appointment.date.toISOString(),
          cancelReason: reason || 'Sin especificar'
        };
        
        await sendCancellationEmailViaGAS(cancelPayload);
      }
      
      // Actualizar estado en BD (usando la función existente)
      const result = await updateAppointmentStatus(effectiveUid, appointmentId, 'cancelled');
      
      if (result.success) {
        toast.success('Cita cancelada y cliente notificado');
        setCancelModal({ open: false, appointmentId: null, reason: '', loading: false });
        loadAppointments();
      } else {
        toast.error('Error al cancelar: ' + result.error);
      }
    } catch (err) {
      console.error('Error cancelando:', err);
      toast.error('Error al cancelar cita');
    } finally {
      setCancelModal(prev => ({ ...prev, loading: false }));
    }
  };

  // Estadísticas
  const stats = useMemo(() => {
    return {
      total: filteredAppointments.length,
      pending: groupedAppointments.pending.length,
      confirmed: groupedAppointments.confirmed.length,
      completed: groupedAppointments.completed.length
    };
  }, [filteredAppointments, groupedAppointments]);

  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    if (!passwordModal.newPassword || passwordModal.newPassword.length < 6) {
      setPasswordModal(prev => ({
        ...prev,
        error: 'La nueva contraseña debe tener al menos 6 caracteres'
      }));
      return;
    }

    if (passwordModal.newPassword !== passwordModal.confirmPassword) {
      setPasswordModal(prev => ({
        ...prev,
        error: 'Las contraseñas no coinciden'
      }));
      return;
    }

    setPasswordModal(prev => ({ ...prev, saving: true, error: '' }));

    const result = await changeCurrentUserPassword(passwordModal.newPassword);
    if (!result.success) {
      setPasswordModal(prev => ({ ...prev, saving: false, error: result.error }));
      return;
    }

    const profileUpdateResult = await setUserProfile(uid, {
      mustChangePassword: false,
      passwordChangedAt: new Date()
    });

    if (!profileUpdateResult.success) {
      setPasswordModal(prev => ({
        ...prev,
        saving: false,
        error: profileUpdateResult.error || 'No se pudo actualizar el perfil'
      }));
      return;
    }

    await refreshUserProfile(uid);
    setPasswordModal({ newPassword: '', confirmPassword: '', saving: false, error: '' });
    toast.success('Contraseña actualizada correctamente');

    // Limpiar la contraseña temporal en el array de barberos del admin
    if (businessId && linkedBarberId) {
      await deactivateBarberTemporaryPassword(businessId, linkedBarberId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h2>
          <p className="text-gray-600 text-sm">Gestión de citas y reservas</p>
        </div>

        <div className="card mb-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-4 gap-3">
            <h3 className="text-base font-semibold text-gray-900">Respuesta del cliente</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                Confirmadas: {clientDecisionSummary.confirmedByClient.length}
              </span>
              <span className="px-2 py-1 rounded bg-red-100 text-red-700">
                Rechazadas: {clientDecisionSummary.cancelledByClient.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h4 className="font-semibold text-green-900 mb-3">Confirmadas por cliente</h4>
              {clientDecisionSummary.confirmedByClient.length === 0 ? (
                <p className="text-sm text-green-900/70">Aún no hay confirmaciones de cliente.</p>
              ) : (
                <div className="space-y-2">
                  {clientDecisionSummary.confirmedByClient.slice(0, 6).map((apt) => (
                    <div key={`confirmed-${apt.id}`} className="bg-white border border-green-200 rounded p-2">
                      <p className="text-sm font-medium text-gray-900">{apt.clientName || 'Cliente'}</p>
                      <p className="text-xs text-gray-600">
                        {apt.barberName || 'Barbero'} · {format(apt.date, "d 'de' MMM, HH:mm", { locale: es })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h4 className="font-semibold text-red-900 mb-3">Rechazadas por cliente</h4>
              {clientDecisionSummary.cancelledByClient.length === 0 ? (
                <p className="text-sm text-red-900/70">Aún no hay cancelaciones de cliente.</p>
              ) : (
                <div className="space-y-2">
                  {clientDecisionSummary.cancelledByClient.slice(0, 6).map((apt) => (
                    <div key={`cancelled-${apt.id}`} className="bg-white border border-red-200 rounded p-2">
                      <p className="text-sm font-medium text-gray-900">{apt.clientName || 'Cliente'}</p>
                      <p className="text-xs text-gray-600">
                        {apt.barberName || 'Barbero'} · {format(apt.date, "d 'de' MMM, HH:mm", { locale: es })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {activityFeed.length > 0 && (
          <div className="card mb-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-3 gap-3">
              <h3 className="text-base font-semibold text-gray-900">Actividad en tiempo real</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-green-100 text-green-700">
                  Confirmadas: {activityFeed.filter(item => item.type === 'appointment_confirmed_by_client').length}
                </span>
                <span className="px-2 py-1 rounded bg-red-100 text-red-700">
                  Canceladas: {activityFeed.filter(item => item.type === 'appointment_cancelled_by_client').length}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-2 text-sm">
                  {item.type === 'appointment_confirmed_by_client' ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                  )}

                  <div className="flex-1">
                    <p className="text-gray-800">{item.message}</p>
                    <p className="text-xs text-gray-500">
                      {format(item.createdAt, "d 'de' MMM, HH:mm", { locale: es })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode('appointments')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'appointments'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Citas
          </button>
          <button
            onClick={() => setViewMode('confirmations')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'confirmations'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Confirmaciones
            {pendingConfirmationAppointments.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/30 text-xs rounded-full font-bold">
                {pendingConfirmationAppointments.length}
              </span>
            )}
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Total Citas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-100" />
            </div>
          </div>

          <div className="card bg-white border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Pendientes</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                  {stats.pending > 0 && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-bold">!</span>
                  )}
                </div>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-100" />
            </div>
          </div>

          <div className="card bg-white border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Confirmadas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-100" />
            </div>
          </div>

          <div className="card bg-white border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-1">Completadas</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <Check className="w-10 h-10 text-purple-100" />
            </div>
          </div>
        </div>

        {/* Panel de Confirmaciones Pendientes */}
        {viewMode === 'appointments' && pendingConfirmationAppointments.length > 0 && (
          <div className="card mb-6 bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Citas Esperando Confirmación
              </h3>
              <button
                onClick={() => setViewMode('confirmations')}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition"
              >
                Ver todas
              </button>
            </div>
            <div className="space-y-3">
              {pendingConfirmationAppointments
                .slice(0, 3)
                .map(apt => (
                  <div key={apt.id} className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{apt.clientName}</p>
                        <p className="text-sm text-gray-600">
                          {format(apt.date, 'dd MMM, HH:mm', { locale: es })}
                        </p>
                        {apt.emailError && (
                          <p className="text-xs text-red-600 mt-1">
                            ❌ {apt.emailError}
                          </p>
                        )}
                        {apt.emailSent && !apt.emailError && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ Email enviado
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded bg-amber-100 text-amber-800">
                          Pendiente
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-3">
                      {apt.emailError && apt.clientPhone && (
                        <a
                          href={`https://wa.me/${apt.clientPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition flex items-center gap-1"
                          title="Contactar por WhatsApp"
                        >
                          WhatsApp
                        </a>
                      )}
                      {apt.emailError && (
                        <button
                          onClick={async () => {
                            try {
                              const result = await resendConfirmationEmail(effectiveUid, apt.id);
                              if (result.success) {
                                toast.success('Email reenviado');
                                loadAppointments();
                              } else {
                                toast.error('Error: ' + result.error);
                              }
                            } catch (_err) {
                              toast.error('Error reenviando email');
                            }
                          }}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                          title="Reenviar email de confirmación"
                        >
                          Reenviar
                        </button>
                      )}
                      <button
                        onClick={() => setRescheduleModal({
                          open: true,
                          appointmentId: apt.id,
                          newDate: format(apt.date, 'yyyy-MM-dd'),
                          newTime: format(apt.date, 'HH:mm'),
                          newBarberId: apt.barberId || '',
                          loading: false
                        })}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                        title="Cambiar fecha/hora/barbero"
                      >
                        Reprogramar
                      </button>
                      <button
                        onClick={() => setCancelModal({
                          open: true,
                          appointmentId: apt.id,
                          reason: '',
                          loading: false
                        })}
                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        title="Cancelar esta cita"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Filters and search */}
        {viewMode === 'appointments' && (
          <div className="card mb-6 bg-white shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filtros de fecha */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-600 font-bold" />
                <button
                  onClick={() => setFilter('today')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === 'today'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hoy
                </button>
                <button
                  onClick={() => setFilter('week')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === 'week'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Esta Semana
                </button>
                <button
                  onClick={() => setFilter('biweekly')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === 'biweekly'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Quincena
                </button>
                <button
                  onClick={() => setFilter('upcoming')}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === 'upcoming'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Próximas
                </button>
              </div>

              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, teléfono o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-11 w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        )}

        {viewMode === 'appointments' && (
          <>
            {/* Appointments list */}
            {loading ? (
              <div className="card py-12 bg-white">
                <LoadingSpinner size="large" text="Cargando citas..." />
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="card text-center py-12 bg-white">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hay citas
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? 'No se encontraron resultados para tu búsqueda'
                    : 'No hay citas programadas para este período'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Citas pendientes */}
                {groupedAppointments.pending.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-orange-500">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Pendientes de Aprobación (Barbero)
                      <span className="ml-2 px-2.5 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">{groupedAppointments.pending.length}</span>
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {groupedAppointments.pending.map(appointment => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onUpdateStatus={handleUpdateStatus}
                          isUpdating={updatingId === appointment.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Citas confirmadas */}
                {groupedAppointments.confirmed.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-green-500">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Confirmadas
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {groupedAppointments.confirmed.map(appointment => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onUpdateStatus={handleUpdateStatus}
                          isUpdating={updatingId === appointment.id}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Citas completadas */}
                {groupedAppointments.completed.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-purple-500">
                      <Check className="w-5 h-5 text-purple-600" />
                      Completadas
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {groupedAppointments.completed.map(appointment => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onUpdateStatus={handleUpdateStatus}
                          isUpdating={updatingId === appointment.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {viewMode === 'confirmations' && (
          <div className="space-y-4">
            <div className="card bg-amber-50 border border-amber-200">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Confirmación del Cliente
                </h3>
                <span className="px-2.5 py-1 bg-amber-500 text-white text-xs rounded-full font-semibold">
                  Pendientes: {clientConfirmationStats.pending}
                </span>
                <span className="px-2.5 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
                  Confirmadas: {clientConfirmationStats.confirmed}
                </span>
                {clientConfirmationStats.withEmailError > 0 && (
                  <span className="px-2.5 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                    Con error de email: {clientConfirmationStats.withEmailError}
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <label className="text-xs font-semibold text-amber-900">Filtrar por día:</label>
                <input
                  type="date"
                  value={confirmationDateFilter}
                  onChange={(e) => setConfirmationDateFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-amber-300 rounded-lg bg-white"
                />
                {confirmationDateFilter && (
                  <button
                    onClick={() => setConfirmationDateFilter('')}
                    className="px-3 py-2 text-xs font-semibold bg-white text-amber-900 border border-amber-300 rounded-lg hover:bg-amber-100 transition"
                  >
                    Limpiar filtro
                  </button>
                )}
                {confirmationDateFilter && (
                  <span className="text-xs text-amber-800">
                    Al elegir un día específico, este filtro tiene prioridad sobre Hoy, Semana, Quincena o Próximas.
                  </span>
                )}
              </div>
            </div>

            {loading ? (
              <div className="card py-12 bg-white">
                <LoadingSpinner size="large" text="Cargando confirmaciones..." />
              </div>
            ) : filteredClientConfirmationAppointments.length === 0 ? (
              <div className="card text-center py-12 bg-white">
                <CheckCircle className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hay citas para confirmar
                </h3>
                <p className="text-gray-500">
                  Selecciona otro día para consultar sus citas.
                </p>
              </div>
            ) : (
              <>
                {filteredClientConfirmationAppointments.map(apt => (
                  <div key={apt.id} className="card bg-white border border-amber-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-base font-semibold text-gray-900">{apt.clientName}</p>
                        <p className="text-sm text-gray-600">{format(apt.date, "EEEE d 'de' MMMM, HH:mm", { locale: es })}</p>
                        {apt.barberName && (
                          <p className="text-sm text-gray-600">Barbero: {apt.barberName}</p>
                        )}
                        <div className="pt-1">
                          {(apt.confirmationStatus || 'pending') === 'confirmed' ? (
                            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Cliente confirmó
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                              Pendiente de cliente
                            </span>
                          )}
                        </div>
                        {apt.emailError ? (
                          <p className="text-xs text-red-600">❌ Error de email: {apt.emailError}</p>
                        ) : apt.emailSent ? (
                          <p className="text-xs text-green-600">✓ Email enviado correctamente</p>
                        ) : (
                          <p className="text-xs text-amber-700">⏳ Email pendiente de envío</p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {apt.emailError && apt.clientPhone && (
                          <a
                            href={`https://wa.me/${apt.clientPhone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-xs font-semibold bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                          >
                            WhatsApp
                          </a>
                        )}

                        {(apt.confirmationStatus || 'pending') !== 'confirmed' && (
                          <button
                            onClick={() => handleSendClientConfirmationRequest(apt)}
                            className="px-3 py-2 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                          >
                            Solicitar confirmación
                          </button>
                        )}

                        {(apt.confirmationStatus || 'pending') !== 'confirmed' && (
                          <button
                            onClick={() => setRescheduleModal({
                              open: true,
                              appointmentId: apt.id,
                              newDate: format(apt.date, 'yyyy-MM-dd'),
                              newTime: format(apt.date, 'HH:mm'),
                              newBarberId: apt.barberId || '',
                              loading: false
                            })}
                            className="px-3 py-2 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                          >
                            Reprogramar
                          </button>
                        )}

                        {(apt.confirmationStatus || 'pending') !== 'confirmed' && (
                          <button
                            onClick={() => setCancelModal({
                              open: true,
                              appointmentId: apt.id,
                              reason: '',
                              loading: false
                            })}
                            className="px-3 py-2 text-xs font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </main>

      {/* Modal de Confirmación */}
      {mustChangePassword ? (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Cambio de contraseña requerido</h3>
            <p className="text-sm text-gray-600 mb-5">
              Este es tu primer ingreso. Debes reemplazar la contraseña temporal antes de usar el sistema.
            </p>

            <form onSubmit={handleSetNewPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                <input
                  type="password"
                  value={passwordModal.newPassword}
                  onChange={(e) => setPasswordModal(prev => ({ ...prev, newPassword: e.target.value, error: '' }))}
                  className="input"
                  placeholder="Mínimo 6 caracteres"
                  disabled={passwordModal.saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                <input
                  type="password"
                  value={passwordModal.confirmPassword}
                  onChange={(e) => setPasswordModal(prev => ({ ...prev, confirmPassword: e.target.value, error: '' }))}
                  className="input"
                  placeholder="Repite la contraseña"
                  disabled={passwordModal.saving}
                />
              </div>

              {passwordModal.error ? (
                <p className="text-sm text-red-600">{passwordModal.error}</p>
              ) : null}

              <button
                type="submit"
                disabled={passwordModal.saving}
                className="w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-60"
              >
                {passwordModal.saving ? 'Guardando...' : 'Guardar nueva contraseña'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {confirmModal?.open ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar Acción</h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
              <p className="text-gray-700 text-sm">
                ¿{confirmModal?.action || 'Actualizar'} para <strong className="text-blue-900">{confirmModal?.appointmentName || 'Cliente'}</strong>?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, appointmentId: null, newStatus: null, appointmentName: '', action: '' })}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAction}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal de Reprogramación */}
      {rescheduleModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Reprogramar Cita</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Fecha</label>
                <input
                  type="date"
                  value={rescheduleModal.newDate}
                  onChange={(e) => setRescheduleModal(prev => ({ ...prev, newDate: e.target.value }))}
                  className="input w-full"
                  disabled={rescheduleModal.loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Hora</label>
                <input
                  type="time"
                  value={rescheduleModal.newTime}
                  onChange={(e) => setRescheduleModal(prev => ({ ...prev, newTime: e.target.value }))}
                  className="input w-full"
                  disabled={rescheduleModal.loading}
                />
              </div>

              <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded border border-blue-200">
                ℹ️ Se enviará un nuevo email de confirmación al cliente con el nuevo horario.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setRescheduleModal({ open: false, appointmentId: null, newDate: '', newTime: '', newBarberId: '', loading: false })}
                disabled={rescheduleModal.loading}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (rescheduleModal.newDate && rescheduleModal.newTime) {
                    handleRescheduleAppointment(
                      rescheduleModal.appointmentId,
                      rescheduleModal.newDate,
                      rescheduleModal.newTime,
                      rescheduleModal.newBarberId
                    );
                  } else {
                    toast.error('Completa fecha y hora');
                  }
                }}
                disabled={rescheduleModal.loading}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-60"
              >
                {rescheduleModal.loading ? 'Guardando...' : 'Reprogramar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelación */}
      {cancelModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Cancelar Cita
            </h3>
            
            <p className="text-gray-600 mb-4">
              Se enviará un email de cancelación al cliente. ¿Deseas continuar?
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motivo (opcional)</label>
              <textarea
                value={cancelModal.reason}
                onChange={(e) => setCancelModal(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Ej: Cliente no respondió, problema de disponibilidad..."
                className="input w-full h-20 resize-none"
                disabled={cancelModal.loading}
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCancelModal({ open: false, appointmentId: null, reason: '', loading: false })}
                disabled={cancelModal.loading}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleCancelAppointment(cancelModal.appointmentId, cancelModal.reason)}
                disabled={cancelModal.loading}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold disabled:opacity-60"
              >
                {cancelModal.loading ? 'Cancelando...' : 'Sí, Cancelar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de tarjeta de cita
const AppointmentCard = ({ appointment, onUpdateStatus, isUpdating }) => {
  const statusConfig = {
    pending: { label: 'Pendiente', class: 'bg-orange-50 border-l-4 border-orange-500', badge: 'bg-orange-500' },
    confirmed: { label: 'Confirmada', class: 'bg-green-50 border-l-4 border-green-500', badge: 'bg-green-500' },
    completed: { label: 'Completada', class: 'bg-purple-50 border-l-4 border-purple-500', badge: 'bg-purple-500' },
    cancelled: { label: 'Cancelada', class: 'bg-red-50 border-l-4 border-red-500', badge: 'bg-red-500' }
  };

  const config = statusConfig[appointment.status];

  return (
    <div className={`card ${config.class} shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            {appointment.clientName}
          </h4>
          <span className={`${config.badge} text-white text-xs px-2.5 py-1 rounded-full font-semibold`}>
            {config.label}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-4 bg-white/50 p-2.5 rounded text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{format(appointment.date, "EEEE, d 'de' MMMM", { locale: es })}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-red-600" />
          <span>{format(appointment.date, 'HH:mm')} hrs</span>
        </div>
        {appointment.barberName && (
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-purple-600" />
            <span>{appointment.barberName}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-700">
          <Phone className="w-4 h-4 text-green-600" />
          <span>{appointment.clientPhone}</span>
        </div>
        {appointment.clientEmail && (
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span className="truncate text-xs">{appointment.clientEmail}</span>
          </div>
        )}
      </div>

      {appointment.notes && (
        <div className="mb-3 p-2 bg-white rounded border-l-2 border-blue-400 text-xs text-gray-600 italic">
          {appointment.notes}
        </div>
      )}

      {/* Action buttons */}
      {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          {appointment.status === 'pending' && (
            <button
              onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
              disabled={isUpdating}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              Confirmar
            </button>
          )}
          
          {appointment.status === 'confirmed' && (
            <button
              onClick={() => onUpdateStatus(appointment.id, 'completed')}
              disabled={isUpdating}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Completar
            </button>
          )}

          <button
            onClick={() => onUpdateStatus(appointment.id, 'cancelled')}
            disabled={isUpdating}
            className="py-1.5 px-3 text-xs font-semibold rounded flex items-center justify-center gap-1 text-red-600 bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
