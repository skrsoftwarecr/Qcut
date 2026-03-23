import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAppointments, updateAppointmentStatus, getUnreadNotifications, markNotificationRead } from '../firebase/firestoreService';
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
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { effectiveUid, linkedBarberId, isAdmin } = useAuth();
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby3zwVNyOWyvvq4VNkscvNzqCvcvRpAjJAFdqmb4bi43r2ACJR5VPtSS9dJFz1VZeCq/exec';
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('today'); // today, week, biweekly, upcoming
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    appointmentId: null,
    newStatus: null,
    appointmentName: '',
    action: ''
  });

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

  // Cargar citas — CAMBIO 2: filtra por barberId si el usuario es un barbero
  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const filterBarberId = isAdmin ? null : linkedBarberId;
    const result = await getAppointments(effectiveUid, dateRange.start, dateRange.end, filterBarberId);
    
    if (result.success) {
      setAppointments(result.data);
    } else {
      toast.error('Error al cargar citas');
    }
    
    setLoading(false);
  }, [effectiveUid, dateRange, isAdmin, linkedBarberId]);

  // CAMBIO 5: Verificar notificaciones de cancelaciones del cliente
  const checkNotifications = useCallback(async () => {
    if (!effectiveUid) return;
    const result = await getUnreadNotifications(effectiveUid);
    if (result.success && result.data.length > 0) {
      for (const notif of result.data) {
        if (notif.type === 'appointment_cancelled_by_client') {
          toast.error(
            `❌ ${notif.clientName} canceló su cita con ${notif.barberName || 'el barbero'}`,
            { duration: 6000, id: notif.id }
          );
          await markNotificationRead(effectiveUid, notif.id);
        } else if (notif.type === 'whatsapp_reminder_pending') {
          toast(
            `📱 Recordatorio pendiente: ${notif.clientName} — ${notif.clientPhone}`,
            { duration: 8000, id: notif.id, icon: '💬' }
          );
          await markNotificationRead(effectiveUid, notif.id);
        }
      }
    }
  }, [effectiveUid]);

  useEffect(() => {
    if (effectiveUid) {
      loadAppointments();
    }
  }, [loadAppointments, effectiveUid]);

  // Polling de notificaciones cada 30 segundos
  useEffect(() => {
    if (!effectiveUid) return;
    checkNotifications();
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, [checkNotifications]);

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

  // Estadísticas
  const stats = useMemo(() => {
    return {
      total: filteredAppointments.length,
      pending: groupedAppointments.pending.length,
      confirmed: groupedAppointments.confirmed.length,
      completed: groupedAppointments.completed.length
    };
  }, [filteredAppointments, groupedAppointments]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h2>
          <p className="text-gray-600 text-sm">Gestión de citas y reservas</p>
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

        {/* Filters and search */}
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
                  Pendientes de Confirmar
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
      </main>

      {/* Modal de Confirmación */}
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
