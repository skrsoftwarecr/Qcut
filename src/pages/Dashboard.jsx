import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  subscribeToAppointments,
  updateAppointmentStatus,
  updateAppointmentReschedule,
  cancelAppointmentWithReason
} from '../firebase/firestoreService';
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
  AlertCircle,
  Edit2,
  MessageSquare
} from 'lucide-react';
import { format, startOfDay, endOfDay, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/** Genera un token único para el link de confirmación del cliente */
const generateToken = () => {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
};

/** Convierte "HH:mm" a minutos */
const timeToMinutes = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

// ─────────────────────────────────────────────
// Modal: Cancelar con motivo
// ─────────────────────────────────────────────
const CancelModal = ({ appointment, onConfirm, onClose }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) {
      toast.error('Debes ingresar un motivo de cancelación');
      return;
    }
    setLoading(true);
    await onConfirm(reason.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <X className="w-5 h-5 text-red-500" />
          Cancelar Cita
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Cliente: <strong>{appointment.clientName}</strong> ·{' '}
          {format(appointment.date, "d 'de' MMMM", { locale: es })} · {appointment.startTime ? format(appointment.startTime, 'HH:mm') : format(appointment.date, 'HH:mm')} hrs
        </p>

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Motivo de cancelación <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-5">
          <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            placeholder="Ej: El profesional tuvo una emergencia, cambio de horario de trabajo..."
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm disabled:opacity-50"
          >
            Volver
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading || !reason.trim()}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="small" /> : <X className="w-3.5 h-3.5" />}
            Cancelar Cita
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Modal: Editar horario
// ─────────────────────────────────────────────
const RescheduleModal = ({ appointment, onConfirm, onClose }) => {
  const originalStart = appointment.startTime
    ? format(appointment.startTime, 'HH:mm')
    : format(appointment.date, 'HH:mm');
  const originalEnd = appointment.endTime
    ? format(appointment.endTime, 'HH:mm')
    : '';

  const [newStart, setNewStart] = useState(originalStart);
  const [newEnd, setNewEnd] = useState(originalEnd);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!newStart || !newEnd) {
      toast.error('Debes ingresar hora de inicio y fin');
      return;
    }
    if (timeToMinutes(newEnd) <= timeToMinutes(newStart)) {
      toast.error('La hora de fin debe ser después de la hora de inicio');
      return;
    }
    setLoading(true);
    await onConfirm(newStart, newEnd);
    setLoading(false);
  };

  const aptDate = format(appointment.date, "EEEE d 'de' MMMM yyyy", { locale: es });

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <Edit2 className="w-5 h-5 text-blue-500" />
          Editar Horario
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Cliente: <strong>{appointment.clientName}</strong> · {aptDate}
        </p>

        {/* Horario original solicitado */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4 text-sm">
          <p className="text-orange-700 font-semibold mb-1">Horario solicitado por el cliente:</p>
          <p className="text-orange-800">
            {appointment.originalStartTime
              ? format(appointment.originalStartTime, 'HH:mm')
              : originalStart} — {appointment.originalEndTime
              ? format(appointment.originalEndTime, 'HH:mm')
              : (originalEnd || '—')} hrs
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nueva hora de inicio *
            </label>
            <input
              type="time"
              value={newStart}
              onChange={(e) => setNewStart(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nueva hora de fin *
            </label>
            <input
              type="time"
              value={newEnd}
              onChange={(e) => setNewEnd(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all text-sm disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <LoadingSpinner size="small" /> : <Edit2 className="w-3.5 h-3.5" />}
            Proponer Nuevo Horario
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Modal genérico de confirmación
// ─────────────────────────────────────────────
const ConfirmModal = ({ modal, onConfirm, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar Acción</h3>
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
        <p className="text-gray-700 text-sm">
          ¿{modal.action || 'Actualizar'} para <strong className="text-blue-900">{modal.appointmentName || 'Cliente'}</strong>?
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Tarjeta de cita
// ─────────────────────────────────────────────
const AppointmentCard = ({ appointment, onUpdateStatus, onReschedule, onCancel, isUpdating }) => {
  const statusConfig = {
    pending: { label: 'Pendiente', class: 'bg-orange-50 border-l-4 border-orange-500', badge: 'bg-orange-500' },
    confirmed: { label: 'Confirmada', class: 'bg-green-50 border-l-4 border-green-500', badge: 'bg-green-500' },
    completed: { label: 'Completada', class: 'bg-purple-50 border-l-4 border-purple-500', badge: 'bg-purple-500' },
    cancelled: { label: 'Cancelada', class: 'bg-red-50 border-l-4 border-red-500', badge: 'bg-red-500' },
    pending_client_confirmation: { label: 'Esperando cliente', class: 'bg-blue-50 border-l-4 border-blue-400', badge: 'bg-blue-400' },
    cancelled_by_client: { label: 'Rechazada por cliente', class: 'bg-red-50 border-l-4 border-red-400', badge: 'bg-red-400' },
  };

  const config = statusConfig[appointment.status] || statusConfig.pending;

  // Calcular hora de inicio y fin para mostrar
  const startDisplay = appointment.startTime
    ? format(appointment.startTime, 'HH:mm')
    : format(appointment.date, 'HH:mm');
  const endDisplay = appointment.endTime ? format(appointment.endTime, 'HH:mm') : null;

  return (
    <div className={`card ${config.class} shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">{appointment.clientName}</h4>
          <span className={`${config.badge} text-white text-xs px-2.5 py-1 rounded-full font-semibold`}>
            {config.label}
          </span>
        </div>
        {appointment.adminEdited && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <Edit2 className="w-3 h-3" />
            Horario editado
          </span>
        )}
      </div>

      <div className="space-y-1.5 mb-4 bg-white/50 p-2.5 rounded text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{format(appointment.date, "EEEE, d 'de' MMMM", { locale: es })}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-red-600" />
          <span>
            {startDisplay}{endDisplay ? ` — ${endDisplay}` : ''} hrs
          </span>
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

      {/* Motivo de cancelación */}
      {appointment.cancellationReason && (
        <div className="mb-3 p-2 bg-red-50 rounded border-l-2 border-red-400 text-xs text-red-700">
          <strong>Motivo cancelación:</strong> {appointment.cancellationReason}
        </div>
      )}

      {/* Horario original si fue editado */}
      {appointment.adminEdited && appointment.originalStartTime && (
        <div className="mb-3 p-2 bg-orange-50 rounded border-l-2 border-orange-300 text-xs text-orange-700">
          <strong>Horario solicitado originalmente:</strong>{' '}
          {format(appointment.originalStartTime, 'HH:mm')}
          {appointment.originalEndTime ? ` — ${format(appointment.originalEndTime, 'HH:mm')}` : ''} hrs
        </div>
      )}

      {/* Botones de acción */}
      {!['completed', 'cancelled', 'cancelled_by_client'].includes(appointment.status) && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
          {appointment.status === 'pending' && (
            <>
              <button
                onClick={() => onUpdateStatus(appointment.id, 'confirmed')}
                disabled={isUpdating}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all disabled:opacity-50"
              >
                <Check className="w-3.5 h-3.5" />
                Confirmar
              </button>
              <button
                onClick={() => onReschedule(appointment)}
                disabled={isUpdating}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 text-xs font-semibold rounded flex items-center justify-center gap-1 transition-all disabled:opacity-50"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Editar hora
              </button>
            </>
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

          {appointment.status === 'pending_client_confirmation' && (
            <p className="flex-1 text-center text-xs text-blue-600 font-medium py-1.5">
              ⏳ Esperando respuesta del cliente
            </p>
          )}

          {/* Cancelar siempre disponible (excepto completada/cancelada) */}
          <button
            onClick={() => onCancel(appointment)}
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

// ─────────────────────────────────────────────
// Dashboard principal
// ─────────────────────────────────────────────
const Dashboard = () => {
  const { uid } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // Modales
  const [confirmModal, setConfirmModal] = useState({ open: false, appointmentId: null, newStatus: null, appointmentName: '', action: '' });
  const [cancelModal, setCancelModal] = useState({ open: false, appointment: null });
  const [rescheduleModal, setRescheduleModal] = useState({ open: false, appointment: null });

  // Rango de fechas según filtro
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

  // Suscripción en tiempo real — se actualiza automáticamente cuando el cliente responde
  useEffect(() => {
    if (!uid) return;

    setLoading(true);
    const unsubscribe = subscribeToAppointments(uid, dateRange.start, dateRange.end, (result) => {
      if (result.success) {
        setAppointments(result.data);
      } else {
        toast.error('Error al cargar citas');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid, dateRange]);

  // Filtrar por búsqueda
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

  // Agrupar por estado
  const groupedAppointments = useMemo(() => ({
    pending: filteredAppointments.filter(a => a.status === 'pending'),
    pending_client: filteredAppointments.filter(a => a.status === 'pending_client_confirmation'),
    confirmed: filteredAppointments.filter(a => a.status === 'confirmed'),
    completed: filteredAppointments.filter(a => a.status === 'completed'),
    cancelled: filteredAppointments.filter(a => ['cancelled', 'cancelled_by_client'].includes(a.status)),
  }), [filteredAppointments]);

  const stats = useMemo(() => ({
    total: filteredAppointments.length,
    pending: groupedAppointments.pending.length + groupedAppointments.pending_client.length,
    confirmed: groupedAppointments.confirmed.length,
    completed: groupedAppointments.completed.length,
  }), [filteredAppointments, groupedAppointments]);

  // ── Confirmar/Completar (sin cancelar) ──
  const handleUpdateStatus = (appointmentId, newStatus) => {
    const appointment = filteredAppointments.find(a => a.id === appointmentId);
    let action = '';
    if (newStatus === 'confirmed') action = 'Confirmar cita';
    else if (newStatus === 'completed') action = 'Marcar como completada';

    setConfirmModal({
      open: true,
      appointmentId,
      newStatus,
      appointmentName: appointment?.clientName || 'Cliente',
      action
    });
  };

  const handleConfirmAction = async () => {
    const { appointmentId, newStatus } = confirmModal;
    setConfirmModal({ open: false, appointmentId: null, newStatus: null, appointmentName: '', action: '' });
    
    setUpdatingId(appointmentId);
    const result = await updateAppointmentStatus(uid, appointmentId, newStatus);

    if (result.success) {
      if (newStatus === 'confirmed') {
        const appointment = filteredAppointments.find(a => a.id === appointmentId);
        if (appointment?.clientEmail && appointment.status === 'pending' && GOOGLE_SCRIPT_URL) {
          const startDisplay = appointment.startTime ? appointment.startTime.toISOString() : appointment.date.toISOString();
          const endDisplay = appointment.endTime ? appointment.endTime.toISOString() : null;

          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
              type: 'appointment_confirmed',
              clientEmail: appointment.clientEmail,
              clientName: appointment.clientName,
              barberName: appointment.barberName,
              appointmentDate: startDisplay,
              appointmentEndDate: endDisplay
            })
          }).catch(err => console.error('Error enviando confirmación:', err));
        }
      }
      toast.success('Cita actualizada');
    } else {
      toast.error('Error al actualizar cita');
    }

    setUpdatingId(null);
  };

  // ── Cancelar con motivo ──
  const handleCancelOpen = (appointment) => {
    setCancelModal({ open: true, appointment });
  };

  const handleCancelConfirm = async (reason) => {
    const { appointment } = cancelModal;
    setCancelModal({ open: false, appointment: null });

    setUpdatingId(appointment.id);
    const result = await cancelAppointmentWithReason(uid, appointment.id, reason);

    if (result.success) {
      // Notificar al cliente por email
      if (appointment.clientEmail && GOOGLE_SCRIPT_URL) {
        const startDisplay = appointment.startTime ? appointment.startTime.toISOString() : appointment.date.toISOString();
        const endDisplay = appointment.endTime ? appointment.endTime.toISOString() : null;

        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({
            type: 'appointment_cancelled',
            clientEmail: appointment.clientEmail,
            clientName: appointment.clientName,
            barberName: appointment.barberName,
            appointmentDate: startDisplay,
            appointmentEndDate: endDisplay,
            cancellationReason: reason
          })
        }).catch(err => console.error('Error enviando cancelación:', err));
      }
      toast.success('Cita cancelada y cliente notificado');
    } else {
      toast.error('Error al cancelar la cita');
    }

    setUpdatingId(null);
  };

  // ── Editar horario ──
  const handleRescheduleOpen = (appointment) => {
    setRescheduleModal({ open: true, appointment });
  };

  const handleRescheduleConfirm = async (newStartStr, newEndStr) => {
    const { appointment } = rescheduleModal;
    setRescheduleModal({ open: false, appointment: null });

    setUpdatingId(appointment.id);

    // Construir nuevas fechas
    const [sh, sm] = newStartStr.split(':').map(Number);
    const [eh, em] = newEndStr.split(':').map(Number);
    const baseDate = appointment.date;
    const newStart = new Date(baseDate);
    newStart.setHours(sh, sm, 0, 0);
    const newEnd = new Date(baseDate);
    newEnd.setHours(eh, em, 0, 0);

    const token = generateToken();

    const result = await updateAppointmentReschedule(uid, appointment.id, newStart, newEnd, token);

    if (result.success) {
      // Enviar correo al cliente con el nuevo horario y el link de confirmación
      if (appointment.clientEmail && GOOGLE_SCRIPT_URL) {
        const confirmUrl = `${window.location.origin}/confirmar-cita?token=${token}&uid=${uid}&id=${appointment.id}`;

        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({
            type: 'appointment_rescheduled',
            clientEmail: appointment.clientEmail,
            clientName: appointment.clientName,
            barberName: appointment.barberName,
            appointmentDate: newStart.toISOString(),
            appointmentEndDate: newEnd.toISOString(),
            originalDate: appointment.originalStartTime?.toISOString() || appointment.date.toISOString(),
            originalEndDate: appointment.originalEndTime?.toISOString() || null,
            confirmUrl
          })
        }).catch(err => console.error('Error enviando reagendamiento:', err));
      }
      toast.success('Nuevo horario propuesto. El cliente recibirá un correo para confirmar.');
    } else {
      toast.error('Error al editar el horario');
    }

    setUpdatingId(null);
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

        {/* Filtros y búsqueda */}
        <div className="card mb-6 bg-white shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-600 font-bold" />
              {[
                { key: 'today', label: 'Hoy' },
                { key: 'week', label: 'Esta Semana' },
                { key: 'biweekly', label: 'Quincena' },
                { key: 'upcoming', label: 'Próximas' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    filter === key
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

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

        {/* Lista de citas */}
        {loading ? (
          <div className="card py-12 bg-white">
            <LoadingSpinner size="large" text="Cargando citas..." />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="card text-center py-12 bg-white">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay citas</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'No se encontraron resultados para tu búsqueda'
                : 'No hay citas programadas para este período'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Pendientes */}
            {groupedAppointments.pending.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-orange-500">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Pendientes de Confirmar
                  <span className="ml-2 px-2.5 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
                    {groupedAppointments.pending.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupedAppointments.pending.map(apt => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onUpdateStatus={handleUpdateStatus}
                      onReschedule={handleRescheduleOpen}
                      onCancel={handleCancelOpen}
                      isUpdating={updatingId === apt.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Esperando confirmación del cliente */}
            {groupedAppointments.pending_client.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-blue-400">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Esperando confirmación del cliente
                  <span className="ml-2 px-2.5 py-1 bg-blue-400 text-white text-xs rounded-full font-semibold">
                    {groupedAppointments.pending_client.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupedAppointments.pending_client.map(apt => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onUpdateStatus={handleUpdateStatus}
                      onReschedule={handleRescheduleOpen}
                      onCancel={handleCancelOpen}
                      isUpdating={updatingId === apt.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Confirmadas */}
            {groupedAppointments.confirmed.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-green-500">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Confirmadas
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupedAppointments.confirmed.map(apt => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onUpdateStatus={handleUpdateStatus}
                      onReschedule={handleRescheduleOpen}
                      onCancel={handleCancelOpen}
                      isUpdating={updatingId === apt.id}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completadas */}
            {groupedAppointments.completed.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 pb-3 border-b-2 border-purple-500">
                  <Check className="w-5 h-5 text-purple-600" />
                  Completadas
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {groupedAppointments.completed.map(apt => (
                    <AppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onUpdateStatus={handleUpdateStatus}
                      onReschedule={handleRescheduleOpen}
                      onCancel={handleCancelOpen}
                      isUpdating={updatingId === apt.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modales */}
      {confirmModal.open && (
        <ConfirmModal
          modal={confirmModal}
          onConfirm={handleConfirmAction}
          onClose={() => setConfirmModal({ open: false, appointmentId: null, newStatus: null, appointmentName: '', action: '' })}
        />
      )}

      {cancelModal.open && cancelModal.appointment && (
        <CancelModal
          appointment={cancelModal.appointment}
          onConfirm={handleCancelConfirm}
          onClose={() => setCancelModal({ open: false, appointment: null })}
        />
      )}

      {rescheduleModal.open && rescheduleModal.appointment && (
        <RescheduleModal
          appointment={rescheduleModal.appointment}
          onConfirm={handleRescheduleConfirm}
          onClose={() => setRescheduleModal({ open: false, appointment: null })}
        />
      )}
    </div>
  );
};

export default Dashboard;
