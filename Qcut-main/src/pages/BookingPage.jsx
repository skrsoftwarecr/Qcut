import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getBarberData, getScheduleConfig, getAppointmentsByDate, createAppointment, getBarberBlocks, getClientAppointmentsByPhone, cancelAppointmentByClient } from '../firebase/firestoreService';
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
  X,
  AlertCircle
} from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingPage = () => {
  const { businessId } = useParams();
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby3zwVNyOWyvvq4VNkscvNzqCvcvRpAjJAFdqmb4bi43r2ACJR5VPtSS9dJFz1VZeCq/exec';
  const [barberData, setBarberData] = useState(null);
  const [scheduleConfig, setScheduleConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAutoAccepted, setIsAutoAccepted] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedBarberId, setSelectedBarberId] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [existingAppointments, setExistingAppointments] = useState([]);
  const [allBlocks, setAllBlocks] = useState([]); // CAMBIO 2 & 3: Nueva colección bloqueos
  
  // CAMBIO 5: Estado para cancelación de citas del cliente
  const [showCancelSection, setShowCancelSection] = useState(false);
  const [cancelPhone, setCancelPhone] = useState('');
  const [clientAppointments, setClientAppointments] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});

  // Cargar datos de la barbería
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      const [barberResult, configResult] = await Promise.all([
        getBarberData(businessId),
        getScheduleConfig(businessId)
      ]);
      
      if (barberResult.success) {
        setBarberData(barberResult.data);
      } else {
        toast.error('Barbería no encontrada');
      }
      
      if (configResult.success) {
        setScheduleConfig(configResult.data);
      }

      // CAMBIO 2 & 3: Cargar TODOS los bloqueos del negocio
      const blocksResult = await getBarberBlocks(businessId);
      if (blocksResult.success) setAllBlocks(blocksResult.data);
      
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
          // Solo considerar citas confirmadas y pendientes
          const activeAppointments = result.data.filter(
            apt => apt.status === 'pending' || apt.status === 'confirmed'
          );
          setExistingAppointments(activeAppointments);
        }
      }
    };

    loadAppointments();
  }, [selectedDate, businessId]);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedBarberId]);

  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // Generar días del mes
  const daysInMonth = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Verificar si un día es laborable
  const isWorkingDay = (date) => {
    if (!scheduleConfig) return false;
    
    // Verificar si el barbero seleccionado tiene este día bloqueado completamente
    const isDayBlocked = allBlocks.some(block => 
      block.barberId === selectedBarberId && 
      block.tipo === 'dia_completo' && 
      isSameDay(new Date(block.fecha), date)
    );

    if (isDayBlocked) return false;

    const dayOfWeek = date.getDay();
    return scheduleConfig.workingDays.includes(dayOfWeek);
  };

  // Verificar si un día está disponible (no pasado y es laborable)
  const isDayAvailable = (date) => {
    const today = startOfDay(new Date());
    return !isBefore(date, today) && isWorkingDay(date);
  };

  // Generar slots de tiempo disponibles
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !scheduleConfig || !selectedBarberId) return [];

    const slots = [];
    const [openHour, openMinute] = scheduleConfig.openingTime.split(':').map(Number);
    const [closeHour, closeMinute] = scheduleConfig.closingTime.split(':').map(Number);
    
    const openingMinutes = openHour * 60 + openMinute;
    const closingMinutes = closeHour * 60 + closeMinute;
    const duration = scheduleConfig.appointmentDuration;

    // Generar todos los slots posibles
    for (let minutes = openingMinutes; minutes < closingMinutes; minutes += duration) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      // Verificar si este slot está ocupado
      const slotDate = new Date(selectedDate);
      slotDate.setHours(hour, minute, 0, 0);
      
      const isOccupied = existingAppointments.some(apt => {
        const fallbackBarberId = barberData?.barbers?.[0]?.id || 'barber-1';
        const appointmentBarberId = apt.barberId || fallbackBarberId;
        if (appointmentBarberId !== selectedBarberId) return false;
        const aptTime = format(apt.date, 'HH:mm');
        return aptTime === timeString;
      });

    // CAMBIO 3: Verificar si el slot está bloqueado
      const DAY_MAP = { 0:'domingo',1:'lunes',2:'martes',3:'miercoles',4:'jueves',5:'viernes',6:'sabado' };
      const dayName = DAY_MAP[selectedDate.getDay()];
      const isBlocked = allBlocks.some(block => {
        if (block.dia !== dayName) return false;
        if (block.barberoId !== 'todos' && block.barberoId !== selectedBarberId) return false;
        return timeString >= block.horaInicio && timeString < block.horaFin;
      });

      slots.push({
        time: timeString,
        available: !isOccupied && !isBlocked,
        blocked: isBlocked
      });
    }

    return slots;
  }, [selectedDate, scheduleConfig, existingAppointments, selectedBarberId, barberData]);

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
      newErrors.barber = 'Selecciona un barbero';
    }

    if (!selectedTime) {
      newErrors.time = 'Selecciona un horario';
    } else {
      const timeIsAvailable = availableTimeSlots.some(
        (slot) => slot.time === selectedTime && slot.available
      );
      if (!timeIsAvailable) {
        newErrors.time = 'El horario seleccionado no está disponible';
      }
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

    // Crear objeto Date con fecha y hora seleccionadas
    const [hour, minute] = selectedTime.split(':').map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hour, minute, 0, 0);

    const selectedBarber = barberData?.barbers?.find(b => b.id === selectedBarberId);
    const appointmentData = {
      clientName: formData.clientName.trim(),
      clientPhone: formData.clientPhone.trim(),
      clientEmail: formData.clientEmail.trim(),
      notes: formData.notes.trim(),
      date: appointmentDate,
      status: selectedBarber?.autoAccept ? 'confirmed' : 'pending',
      barberId: selectedBarberId,
      barberName: selectedBarber?.name || 'Barbero',
      // Usar email del barbero individual, si no existe usar del negocio
      barberEmail: selectedBarber?.email || barberData?.email || ''
    };

    const result = await createAppointment(businessId, appointmentData);

    if (result.success) {
      // Preparar datos de notificación
      const notificationData = {
        barberName: appointmentData.barberName,
        barberEmail: appointmentData.barberEmail,
        clientName: appointmentData.clientName,
        clientPhone: appointmentData.clientPhone,
        appointmentDate: appointmentDate.toISOString(),
        autoAccepted: selectedBarber?.autoAccept || false
      };

      // Enviar emails via Google Apps Script
      const isAutoAccepted = selectedBarber?.autoAccept || false;

      // Validar que tenemos emails válidos (no vacíos ni undefined)
      const hasValidBarberEmail = appointmentData.barberEmail && appointmentData.barberEmail.trim() !== '';
      const hasValidClientEmail = formData.clientEmail && formData.clientEmail.trim() !== '';
      
      console.log('🔍 VALIDACIÓN DE EMAILS:');
      console.log('  - Barber Email:', appointmentData.barberEmail);
      console.log('  - Barber Email válido?:', hasValidBarberEmail);
      console.log('  - Client Email:', formData.clientEmail);
      console.log('  - Client Email válido?:', hasValidClientEmail);
      console.log('  - Selected Barber:', selectedBarber);
      console.log('  - Barber Data email fallback:', barberData?.email);
      
      if (!GOOGLE_SCRIPT_URL) {
        console.warn('⚠️ VITE_GOOGLE_SCRIPT_URL no está configurada. Se omite envío de emails.');
      } else if (hasValidBarberEmail && hasValidClientEmail) {
        console.log('📧 ENVIANDO EMAILS');
        console.log('autoAccept:', isAutoAccepted);
        
        if (isAutoAccepted) {
          // Caso 1: Confirmación automática
          console.log('✅ Confirmación AUTOMÁTICA - Enviando confirmación al cliente');
          
          // Email al barbero (informativo)
          const barberPayload = {
            type: 'appointment_auto_confirmed',
            barberEmail: appointmentData.barberEmail,
            barberName: appointmentData.barberName,
            clientName: appointmentData.clientName,
            clientPhone: appointmentData.clientPhone,
            appointmentDate: appointmentDate.toISOString()
          };
          
          // Email al cliente (confirmación de cita)
          const clientPayload = {
            type: 'appointment_confirmed',
            clientEmail: formData.clientEmail,
            clientName: appointmentData.clientName,
            barberName: appointmentData.barberName,
            appointmentDate: appointmentDate.toISOString()
          };
          
          // Enviar ambos emails
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(barberPayload)
          }).catch(error => console.error('Error notificando barbero:', error));
          
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(clientPayload)
          }).catch(error => console.error('Error notificando cliente:', error));
          
          console.log('✅ Emails enviados (confirmación automática)');
        } else {
          // Caso 2: Requiere aprobación del barbero
          console.log('⏳ Confirmación MANUAL - Esperando aprobación del barbero');
          
          const barberPayload = {
            type: 'appointment_pending_approval',
            barberEmail: appointmentData.barberEmail,
            barberName: appointmentData.barberName,
            clientName: appointmentData.clientName,
            clientPhone: appointmentData.clientPhone,
            appointmentDate: appointmentDate.toISOString()
          };
          
          fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(barberPayload)
          }).catch(error => console.error('Error solicitando aprobación:', error));
          
          console.log('✅ Email enviado (esperando aprobación del barbero)');
        }
      } else {
        console.warn('❌ NO SE ENVIARON EMAILS');
        console.warn('  - Email barbero vacío?', !appointmentData.barberEmail || appointmentData.barberEmail.trim() === '');
        console.warn('  - Email cliente vacío?', !formData.clientEmail || formData.clientEmail.trim() === '');
        console.warn('  - Barbero Email:', appointmentData.barberEmail);
        console.warn('  - Cliente Email:', formData.clientEmail);
      }

      setIsAutoAccepted(selectedBarber?.autoAccept || false);
      setSuccess(true);
      const statusMessage = selectedBarber?.autoAccept 
        ? '¡Cita confirmada automáticamente!'
        : '¡Cita agendada! Espera la confirmación del barbero.';
      toast.success(statusMessage);
      
      // Reset form
      setFormData({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        notes: ''
      });
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      toast.error('Error al agendar la cita');
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
          <h2 className="text-2xl font-bold text-primary mb-2">Barbería no encontrada</h2>
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
            <Check className={`w-8 h-8 ${
              isAutoAccepted ? 'text-success' : 'text-warning'
            }`} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {isAutoAccepted ? '¡Cita Confirmada!' : '¡Cita Agendada!'}
          </h2>
          <p className="text-text-secondary mb-6">
            {isAutoAccepted 
              ? 'Tu cita ha sido confirmada automáticamente. ¡Te esperamos!' 
              : 'Tu cita ha sido registrada exitosamente. El barbero la confirmará pronto.'}
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setIsAutoAccepted(false);
            }}
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
          <h1 className="text-4xl font-bold text-primary mb-2">Qcut</h1>
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
          {/* Selección de barbero */}
          <div className="card">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Selecciona un Barbero
            </h3>

            {barberData?.barbers?.length && barberData.barbers.filter((barber) => barber.active !== false).length === 0 ? (
              <p className="text-sm text-danger">
                No hay barberos activos disponibles. Intenta más tarde.
              </p>
            ) : (
            <select
              value={selectedBarberId}
              onChange={(e) => setSelectedBarberId(e.target.value)}
              className="input"
              aria-label="Selecciona un barbero"
              required
            >
              <option value="" disabled>Selecciona un barbero</option>
              {(barberData?.barbers?.length ? barberData.barbers.filter((barber) => barber.active !== false) : [{ id: 'barber-1', name: 'Barbero 1' }]).map((barber) => (
                <option key={barber.id} value={barber.id}>{barber.name}</option>
              ))}
            </select>
            )}

            {errors.barber && (
              <p className="mt-2 text-sm text-danger">{errors.barber}</p>
            )}
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

            {errors.date && (
              <p className="mt-2 text-sm text-danger">{errors.date}</p>
            )}
          </div>

          {/* Selección de hora */}
          {selectedDate && (
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Selecciona un Horario
              </h3>
              
              <p className="text-sm text-text-secondary mb-4">
                {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {availableTimeSlots.map(slot => (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`
                      px-4 py-2 rounded-elegant text-sm font-medium transition-all
                      ${selectedTime === slot.time ? 'bg-secondary text-primary' : ''}
                      ${slot.available && selectedTime !== slot.time ? 'bg-background hover:bg-gray-200' : ''}
                      ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through' : ''}
                    `}
                  >
          {slot.blocked ? '🚫' : slot.time}
                  </button>
                ))}
              </div>

              {availableTimeSlots.every(slot => !slot.available) && (
                <p className="text-center text-text-secondary text-sm mt-4">
                  No hay horarios disponibles para esta fecha
                </p>
              )}

              {errors.time && (
                <p className="mt-2 text-sm text-danger">{errors.time}</p>
              )}
            </div>
          )}

          {/* Datos del cliente */}
          {selectedDate && selectedTime && (
            <div className="card">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Tus Datos
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="clientName" className="label">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    className={`input ${errors.clientName ? 'input-error' : ''}`}
                    placeholder="Juan Pérez"
                  />
                  {errors.clientName && (
                    <p className="mt-1 text-sm text-danger">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="clientPhone" className="label">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                    <input
                      type="tel"
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                      className={`input pl-11 ${errors.clientPhone ? 'input-error' : ''}`}
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  {errors.clientPhone && (
                    <p className="mt-1 text-sm text-danger">{errors.clientPhone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="clientEmail" className="label">
                    Email (opcional)
                  </label>
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
                  {errors.clientEmail && (
                    <p className="mt-1 text-sm text-danger">{errors.clientEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="notes" className="label">
                    Notas (opcional)
                  </label>
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

          {/* Botón de envío */}
          {selectedDate && selectedTime && (
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
          )}
        </form>

        {/* CAMBIO 5: Sección de Cancelación de Citas */}
        <div className="card mt-6">
          <button
            type="button"
            onClick={() => setShowCancelSection(p => !p)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="font-semibold text-primary flex items-center gap-2">
              <X className="w-5 h-5 text-danger" />
              ¿Necesitas cancelar tu cita?
            </span>
            <span className="text-text-secondary text-sm">{showCancelSection ? 'Cerrar ▲' : 'Ver ▼'}</span>
          </button>

          {showCancelSection && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-text-secondary text-sm mb-4">
                Ingresa tu número de teléfono para buscar tus citas activas y cancelarlas.
              </p>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                  <input
                    type="tel"
                    value={cancelPhone}
                    onChange={e => setCancelPhone(e.target.value)}
                    className="input pl-11"
                    placeholder="+1 555 000 0000"
                  />
                </div>
                <button
                  type="button"
                  disabled={cancelLoading || !cancelPhone.trim()}
                  onClick={async () => {
                    setCancelLoading(true);
                    const result = await getClientAppointmentsByPhone(businessId, cancelPhone);
                    setCancelLoading(false);
                    if (result.success) {
                      setClientAppointments(result.data);
                      if (result.data.length === 0) toast.error('No se encontraron citas activas para ese teléfono');
                    } else {
                      toast.error('Error al buscar citas');
                    }
                  }}
                  className="btn-secondary whitespace-nowrap"
                >
                  {cancelLoading ? 'Buscando...' : 'Buscar citas'}
                </button>
              </div>

              {clientAppointments.length > 0 && (
                <div className="space-y-3">
                  {clientAppointments.map(apt => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-elegant">
                      <div>
                        <p className="font-semibold text-primary text-sm">{apt.barberName}</p>
                        <p className="text-text-secondary text-xs">
                          {apt.date.toLocaleDateString('es', { weekday:'long', day:'numeric', month:'long' })} · {apt.date.toLocaleTimeString('es', { hour:'2-digit', minute:'2-digit' })}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>{apt.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}</span>
                      </div>
                      <button
                        type="button"
                        disabled={cancellingId === apt.id}
                        onClick={async () => {
                          setCancellingId(apt.id);
                          const result = await cancelAppointmentByClient(businessId, apt.id, apt);
                          if (result.success) {
                            toast.success('Cita cancelada exitosamente');
                            setClientAppointments(prev => prev.filter(a => a.id !== apt.id));
                          } else {
                            toast.error('Error al cancelar la cita');
                          }
                          setCancellingId(null);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-all disabled:opacity-50"
                      >
                        <X className="w-3.5 h-3.5" />
                        {cancellingId === apt.id ? 'Cancelando...' : 'Cancelar'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
