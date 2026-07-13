import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getBusinessData, getScheduleConfig, getAppointmentsByDate, createAppointmentWithTransaction } from '../firebase/firestoreService';
import toast from 'react-hot-toast';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Convierte "HH:mm" a minutos totales desde medianoche
 */
const timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Convierte minutos totales a string "HH:mm"
 */
const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

/**
 * Determina si un rango [newStart, newEnd) solapa con alguna cita existente
 */
const rangeConflicts = (newStartMinutes, newEndMinutes, existingAppointments, selectedBarberId, selectedDate, barberData) => {
  return existingAppointments.some(apt => {
    // Solo citas activas
    if (!['pending', 'confirmed', 'pending_client_confirmation'].includes(apt.status)) return false;

    // Filtrar por barbero
    const fallbackBarberId = barberData?.barbers?.[0]?.id || 'barber-1';
    const aptBarberId = apt.barberId || fallbackBarberId;
    if (aptBarberId !== selectedBarberId) return false;

    // Calcular rango de la cita existente en minutos
    let aptStartMinutes, aptEndMinutes;

    if (apt.startTime) {
      aptStartMinutes = apt.startTime.getHours() * 60 + apt.startTime.getMinutes();
    } else {
      aptStartMinutes = apt.date.getHours() * 60 + apt.date.getMinutes();
    }

    if (apt.endTime) {
      aptEndMinutes = apt.endTime.getHours() * 60 + apt.endTime.getMinutes();
    } else {
      aptEndMinutes = aptStartMinutes + 30; // fallback
    }

    // Hay solapamiento si: newStart < aptEnd AND newEnd > aptStart
    return newStartMinutes < aptEndMinutes && newEndMinutes > aptStartMinutes;
  });
};

const BookingPage = () => {
  const { businessId } = useParams();
  const [barberData, setBarberData] = useState(null);
  const [scheduleConfig, setScheduleConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAutoAccepted, setIsAutoAccepted] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [existingAppointments, setExistingAppointments] = useState([]);
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});

  // Cargar datos del negocio
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const [barberResult, configResult] = await Promise.all([
        getBusinessData(businessId),
        getScheduleConfig(businessId)
      ]);
      
      if (barberResult.success) {
        setBarberData(barberResult.data);
      } else {
        toast.error('Negocio no encontrado');
      }
      
      if (configResult.success) {
        setScheduleConfig(configResult.data);
      } else if (barberResult.success) {
        setScheduleConfig({
          openingTime: barberResult.data.openingTime || '09:00',
          closingTime: barberResult.data.closingTime || '18:00',
          appointmentDuration: barberResult.data.appointmentDuration || 30,
          workingDays: barberResult.data.workingDays || [1, 2, 3, 4, 5, 6],
          blockedTimes: barberResult.data.blockedTimes || []
        });
      } else {
        toast.error('Error al cargar la configuración de horarios');
      }
      
      setLoading(false);
    };

    if (businessId) {
      loadData();
    }
  }, [businessId]);

  // Inicializar barbero seleccionado
  useEffect(() => {
    if (barberData?.barbers?.length) {
      const activeBarbers = barberData.barbers.filter((barber) => barber.active !== false);
      const defaultId = activeBarbers[0]?.id || barberData.barbers[0].id;
      setSelectedBarberId((prev) => prev || defaultId);
    } else if (barberData && !barberData.barbers?.length) {
      setSelectedBarberId('barber-1');
    }
  }, [barberData]);

  // Cargar citas existentes cuando se selecciona una fecha
  useEffect(() => {
    const loadAppointments = async () => {
      if (selectedDate && businessId) {
        const result = await getAppointmentsByDate(businessId, selectedDate);
        if (result.success) {
          const activeAppointments = result.data.filter(
            apt => ['pending', 'confirmed', 'pending_client_confirmation'].includes(apt.status)
          );
          setExistingAppointments(activeAppointments);
        }
      }
    };

    loadAppointments();
  }, [selectedDate, businessId]);

  useEffect(() => {
    setSelectedStartTime('');
    setSelectedEndTime('');
  }, [selectedBarberId]);

  useEffect(() => {
    setSelectedStartTime('');
    setSelectedEndTime('');
  }, [selectedDate]);

  // Auto-calcular hora fin cuando se elige hora inicio
  useEffect(() => {
    if (selectedStartTime && scheduleConfig) {
      const startMin = timeToMinutes(selectedStartTime);
      const endMin = startMin + scheduleConfig.appointmentDuration;
      const closingMin = timeToMinutes(scheduleConfig.closingTime);
      if (endMin <= closingMin) {
        setSelectedEndTime(minutesToTime(endMin));
      } else {
        setSelectedEndTime('');
      }
    }
  }, [selectedStartTime, scheduleConfig]);

  // Generar días del mes
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Verificar si un día es laborable
  const isWorkingDay = (date) => {
    if (!scheduleConfig) return false;
    const dayOfWeek = date.getDay();
    return scheduleConfig.workingDays.includes(dayOfWeek);
  };

  // Verificar si un día está disponible (no pasado y es laborable)
  const isDayAvailable = (date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today) && isWorkingDay(date);
  };

  // Generar slots de hora de inicio disponibles
  const availableStartSlots = useMemo(() => {
    if (!selectedDate || !scheduleConfig || !selectedBarberId) return [];

    const slots = [];
    const openMin = timeToMinutes(scheduleConfig.openingTime);
    const closeMin = timeToMinutes(scheduleConfig.closingTime);
    const duration = scheduleConfig.appointmentDuration;

    for (let startMin = openMin; startMin < closeMin - duration + 1; startMin += duration) {
      const endMin = startMin + duration;
      const timeString = minutesToTime(startMin);

      // Verificar si este slot de inicio ya tiene conflicto
      const hasConflict = rangeConflicts(
        startMin, endMin,
        existingAppointments,
        selectedBarberId,
        selectedDate,
        barberData
      );

      slots.push({
        time: timeString,
        available: !hasConflict
      });
    }

    return slots;
  }, [selectedDate, scheduleConfig, existingAppointments, selectedBarberId, barberData]);

  // Cuando se elige hora de inicio, calcular qué horas de fin son válidas
  const availableEndSlots = useMemo(() => {
    if (!selectedStartTime || !scheduleConfig) return [];

    const startMin = timeToMinutes(selectedStartTime);
    const closeMin = timeToMinutes(scheduleConfig.closingTime);
    const duration = scheduleConfig.appointmentDuration;
    const slots = [];

    for (let endMin = startMin + duration; endMin <= closeMin; endMin += duration) {
      const timeString = minutesToTime(endMin);

      // Verificar conflicto para el rango completo [selectedStart, endMin)
      const hasConflict = rangeConflicts(
        startMin, endMin,
        existingAppointments,
        selectedBarberId,
        selectedDate,
        barberData
      );

      slots.push({
        time: timeString,
        available: !hasConflict
      });
    }

    return slots;
  }, [selectedStartTime, scheduleConfig, existingAppointments, selectedBarberId, selectedDate, barberData]);

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre es requerido';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'El teléfono es requerido';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.clientPhone)) {
      newErrors.clientPhone = 'Teléfono inválido';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = 'Email inválido';
    }

    if (!selectedDate) {
      newErrors.date = 'Selecciona una fecha';
    }

    if (!selectedBarberId) {
      newErrors.barber = 'Selecciona un profesional';
    }

    if (!selectedStartTime) {
      newErrors.startTime = 'Selecciona una hora de inicio';
    }

    if (!selectedEndTime) {
      newErrors.endTime = 'Selecciona una hora de fin';
    } else if (selectedStartTime && timeToMinutes(selectedEndTime) <= timeToMinutes(selectedStartTime)) {
      newErrors.endTime = 'La hora de fin debe ser después de la hora de inicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setSubmitting(true);

    // Construir fechas completas con la fecha seleccionada
    const [startHour, startMinute] = selectedStartTime.split(':').map(Number);
    const [endHour, endMinute] = selectedEndTime.split(':').map(Number);

    const startDate = new Date(selectedDate);
    startDate.setHours(startHour, startMinute, 0, 0);

    const endDate = new Date(selectedDate);
    endDate.setHours(endHour, endMinute, 0, 0);

    const selectedBarber = barberData?.barbers?.find(b => b.id === selectedBarberId);
    const appointmentData = {
      clientName: formData.clientName.trim(),
      clientPhone: formData.clientPhone.trim(),
      clientEmail: formData.clientEmail.trim(),
      notes: formData.notes.trim(),
      startTime: startDate,
      endTime: endDate,
      date: startDate,
      status: selectedBarber?.autoAccept ? 'confirmed' : 'pending',
      barberId: selectedBarberId,
      barberName: selectedBarber?.name || 'Profesional',
      barberEmail: selectedBarber?.email || barberData?.email || ''
    };

    const result = await createAppointmentWithTransaction(businessId, appointmentData);

    if (result.success) {
      const isAutoAcceptedNow = selectedBarber?.autoAccept || false;

      // Enviar notificaciones por email (Google Apps Script)
      const hasValidBarberEmail = appointmentData.barberEmail?.trim() !== '';
      const hasValidClientEmail = formData.clientEmail?.trim() !== '';

      if (GOOGLE_SCRIPT_URL && hasValidBarberEmail && hasValidClientEmail) {
        if (isAutoAcceptedNow) {
          // Email al barbero informando la confirmación automática
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
              type: 'appointment_auto_confirmed',
              barberEmail: appointmentData.barberEmail,
              barberName: appointmentData.barberName,
              clientName: appointmentData.clientName,
              clientPhone: appointmentData.clientPhone,
              appointmentDate: startDate.toISOString(),
              appointmentEndDate: endDate.toISOString()
            })
          }).catch(err => console.error('Error notificando profesional:', err));

          // Email al cliente con confirmación
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
              type: 'appointment_confirmed',
              clientEmail: formData.clientEmail,
              clientName: appointmentData.clientName,
              barberName: appointmentData.barberName,
              appointmentDate: startDate.toISOString(),
              appointmentEndDate: endDate.toISOString()
            })
          }).catch(err => console.error('Error notificando cliente:', err));
        } else {
          // Email al barbero pidiendo aprobación
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({
              type: 'appointment_pending_approval',
              barberEmail: appointmentData.barberEmail,
              barberName: appointmentData.barberName,
              clientName: appointmentData.clientName,
              clientPhone: appointmentData.clientPhone,
              appointmentDate: startDate.toISOString(),
              appointmentEndDate: endDate.toISOString()
            })
          }).catch(err => console.error('Error solicitando aprobación:', err));
        }
      }

      setIsAutoAccepted(isAutoAcceptedNow);
      setSuccess(true);
      const statusMessage = isAutoAcceptedNow
        ? '¡Cita confirmada automáticamente!'
        : '¡Cita agendada! Espera la confirmación del profesional.';
      toast.success(statusMessage);

      // Reset form
      setFormData({ clientName: '', clientPhone: '', clientEmail: '', notes: '' });
      setSelectedDate(null);
      setSelectedStartTime('');
      setSelectedEndTime('');
    } else if (result.conflict) {
      toast.error('Ese horario ya fue reservado por alguien más. Por favor elige otro.');
    } else {
      toast.error('Error al agendar la cita. Intenta de nuevo.');
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="large" text="Cargando..." />
      </div>
    );
  }

  if (!barberData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-2">Negocio no encontrado</h2>
          <p className="text-text-secondary">Verifica el enlace e intenta nuevamente</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="card max-w-md w-full text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isAutoAccepted ? 'bg-success/10' : 'bg-warning/10'
          }`}>
            <Check className={`w-8 h-8 ${isAutoAccepted ? 'text-success' : 'text-warning'}`} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {isAutoAccepted ? '¡Cita Confirmada!' : '¡Cita Agendada!'}
          </h2>
          <p className="text-text-secondary mb-6">
            {isAutoAccepted
              ? 'Tu cita ha sido confirmada automáticamente. ¡Te esperamos!'
              : 'Tu cita ha sido registrada. El profesional la confirmará pronto y recibirás un correo.'}
          </p>
          <button
            onClick={() => { setSuccess(false); setIsAutoAccepted(false); }}
            className="btn-primary w-full"
          >
            Agendar Otra Cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Qita</h1>
          <h2 className="text-2xl font-semibold text-primary mb-1">{barberData.name}</h2>
          <p className="text-text-secondary">Agenda tu cita online</p>
          {barberData.phone && (
            <p className="text-sm text-text-secondary mt-2 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              {barberData.phone}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selección de profesional */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Selecciona un Profesional
            </h3>

            {barberData?.barbers?.filter(b => b.active !== false).length === 0 ? (
              <p className="text-sm text-danger">
                No hay profesionales activos disponibles. Intenta más tarde.
              </p>
            ) : (
              <select
                value={selectedBarberId}
                onChange={(e) => setSelectedBarberId(e.target.value)}
                className="input"
                aria-label="Selecciona un profesional"
                required
              >
                <option value="" disabled>Selecciona un profesional</option>
                {(barberData?.barbers?.length
                  ? barberData.barbers.filter(b => b.active !== false)
                  : [{ id: 'barber-1', name: 'Profesional 1' }]
                ).map(barber => (
                  <option key={barber.id} value={barber.id}>{barber.name}</option>
                ))}
              </select>
            )}

            {errors.barber && <p className="mt-2 text-sm text-danger">{errors.barber}</p>}
          </div>

          {/* Selección de fecha */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Selecciona una Fecha
            </h3>

            {/* Navegación de mes */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setCurrentMonth(prev => addDays(startOfMonth(prev), -1))}
                className="p-2 hover:bg-background rounded-elegant transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h4 className="font-medium text-primary">
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </h4>
              <button
                type="button"
                onClick={() => setCurrentMonth(prev => addDays(endOfMonth(prev), 1))}
                className="p-2 hover:bg-background rounded-elegant transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Grid de días */}
            <div className="grid grid-cols-7 gap-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-text-secondary py-2">
                  {day}
                </div>
              ))}
              
              {daysInMonth.map(day => {
                const available = isDayAvailable(day);
                const selected = selectedDate && isSameDay(day, selectedDate);
                
                return (
                  <button
                    key={day.toString()}
                    type="button"
                    onClick={() => available && setSelectedDate(day)}
                    disabled={!available}
                    className={`
                      aspect-square p-2 rounded-elegant text-sm font-medium transition-all
                      ${selected ? 'bg-primary text-white' : ''}
                      ${available && !selected ? 'hover:bg-background cursor-pointer' : ''}
                      ${!available ? 'text-gray-300 cursor-not-allowed' : 'text-primary'}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {errors.date && <p className="mt-2 text-sm text-danger">{errors.date}</p>}
          </div>

          {/* Selección de hora de INICIO */}
          {selectedDate && (
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Hora de Inicio
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {availableStartSlots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => slot.available && setSelectedStartTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                      px-4 py-2 rounded-elegant text-sm font-medium transition-all
                      ${selectedStartTime === slot.time ? 'bg-secondary text-primary ring-2 ring-primary' : ''}
                      ${slot.available && selectedStartTime !== slot.time ? 'bg-background hover:bg-gray-200' : ''}
                      ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {availableStartSlots.every(s => !s.available) && (
                <p className="text-center text-text-secondary text-sm mt-4">
                  No hay horarios disponibles para esta fecha
                </p>
              )}

              {errors.startTime && <p className="mt-2 text-sm text-danger">{errors.startTime}</p>}
            </div>
          )}

          {/* Selección de hora de FIN */}
          {selectedDate && selectedStartTime && (
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Hora de Fin
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Inicio seleccionado: <strong>{selectedStartTime}</strong>
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {availableEndSlots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => slot.available && setSelectedEndTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                      px-4 py-2 rounded-elegant text-sm font-medium transition-all
                      ${selectedEndTime === slot.time ? 'bg-secondary text-primary ring-2 ring-primary' : ''}
                      ${slot.available && selectedEndTime !== slot.time ? 'bg-background hover:bg-gray-200' : ''}
                      ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {availableEndSlots.every(s => !s.available) && (
                <p className="text-center text-text-secondary text-sm mt-4">
                  No hay horarios de fin disponibles para este inicio
                </p>
              )}

              {selectedStartTime && selectedEndTime && (
                <div className="mt-4 p-3 bg-primary/5 rounded-elegant flex items-center gap-2 text-sm text-primary font-medium">
                  <Check className="w-4 h-4 text-success" />
                  Cita de <strong>{selectedStartTime}</strong> a <strong>{selectedEndTime}</strong>
                  &nbsp;({(() => {
                    const diff = timeToMinutes(selectedEndTime) - timeToMinutes(selectedStartTime);
                    const hrs = Math.floor(diff / 60);
                    const mins = diff % 60;
                    return hrs > 0 ? `${hrs}h${mins > 0 ? ` ${mins}min` : ''}` : `${mins}min`;
                  })()})
                </div>
              )}

              {errors.endTime && <p className="mt-2 text-sm text-danger">{errors.endTime}</p>}
            </div>
          )}

          {/* Datos del cliente */}
          {selectedDate && selectedStartTime && selectedEndTime && (
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Tus Datos
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="clientName" className="label">Nombre Completo *</label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    className={`input ${errors.clientName ? 'input-error' : ''}`}
                    placeholder="Juan Pérez"
                  />
                  {errors.clientName && <p className="mt-1 text-sm text-danger">{errors.clientName}</p>}
                </div>

                <div>
                  <label htmlFor="clientPhone" className="label">Teléfono *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                    <input
                      type="tel"
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className={`input pl-11 ${errors.clientPhone ? 'input-error' : ''}`}
                      placeholder="+506 8888-8888"
                    />
                  </div>
                  {errors.clientPhone && <p className="mt-1 text-sm text-danger">{errors.clientPhone}</p>}
                </div>

                <div>
                  <label htmlFor="clientEmail" className="label">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                    <input
                      type="email"
                      id="clientEmail"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className={`input pl-11 ${errors.clientEmail ? 'input-error' : ''}`}
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.clientEmail && <p className="mt-1 text-sm text-danger">{errors.clientEmail}</p>}
                </div>

                <div>
                  <label htmlFor="notes" className="label">Notas (opcional)</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-text-secondary w-5 h-5" />
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                      className="input pl-11 min-h-[100px] resize-none"
                      placeholder="¿Algún detalle especial?"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumen + botón */}
          {selectedDate && selectedStartTime && selectedEndTime && (
            <>
              <div className="card bg-primary/5 border border-primary/20">
                <h3 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Resumen de tu cita
                </h3>
                <div className="text-sm text-text-secondary space-y-1">
                  <p><strong>Fecha:</strong> {format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es })}</p>
                  <p><strong>Horario:</strong> {selectedStartTime} — {selectedEndTime}</p>
                  <p><strong>Profesional:</strong> {barberData?.barbers?.find(b => b.id === selectedBarberId)?.name || 'Profesional'}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full py-4 text-lg flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="small" />
                    Agendando...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirmar Cita
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
