import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAppointmentByToken, confirmRescheduleByToken } from '../firebase/firestoreService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Check, X, Clock, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

const ConfirmReschedulePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const uid = searchParams.get('uid');
  const appointmentId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null); // 'accepted' | 'rejected'

  useEffect(() => {
    const loadAppointment = async () => {
      if (!token || !uid) {
        setError('Enlace inválido o incompleto.');
        setLoading(false);
        return;
      }

      const res = await getAppointmentByToken(uid, token);

      if (!res.success) {
        setError('Este enlace no es válido o ya fue utilizado.');
        setLoading(false);
        return;
      }

      // Verificar expiración del token (48h)
      if (res.data.tokenExpiresAt && new Date() > res.data.tokenExpiresAt) {
        setError('Este enlace ha expirado. Contacta al negocio directamente.');
        setLoading(false);
        return;
      }

      // Verificar que la cita aún esté pendiente de confirmación del cliente
      if (res.data.status !== 'pending_client_confirmation') {
        setError('Esta cita ya fue procesada anteriormente.');
        setLoading(false);
        return;
      }

      setAppointment({ id: res.id, ...res.data });
      setLoading(false);
    };

    loadAppointment();
  }, [token, uid]);

  const handleAction = async (action) => {
    if (!appointment || processing) return;
    setProcessing(true);

    const res = await confirmRescheduleByToken(uid, appointment.id, action);

    if (res.success) {
      // Notificar a la administradora
      if (GOOGLE_SCRIPT_URL && appointment.barberEmail) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify({
            type: action === 'accept' ? 'appointment_client_confirmed' : 'appointment_client_rejected',
            barberEmail: appointment.barberEmail,
            barberName: appointment.barberName,
            clientName: appointment.clientName,
            clientPhone: appointment.clientPhone,
            appointmentDate: appointment.startTime?.toISOString() || appointment.date?.toISOString(),
            appointmentEndDate: appointment.endTime?.toISOString() || null
          })
        }).catch(err => console.error('Error notificando admin:', err));
      }

      setResult(action === 'accept' ? 'accepted' : 'rejected');
    } else {
      setError('Hubo un error al procesar tu respuesta. Intenta de nuevo o contacta al negocio.');
    }

    setProcessing(false);
  };

  // ── Pantalla de carga ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" text="Cargando tu cita..." />
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="card max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Enlace no válido</h2>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Resultado final ──
  if (result) {
    const isAccepted = result === 'accepted';
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="card max-w-md w-full text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isAccepted ? 'bg-green-100' : 'bg-red-100'}`}>
            {isAccepted
              ? <Check className="w-8 h-8 text-green-600" />
              : <X className="w-8 h-8 text-red-500" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isAccepted ? '¡Cita Confirmada!' : 'Cita Rechazada'}
          </h2>
          <p className="text-gray-500">
            {isAccepted
              ? 'Has aceptado el nuevo horario. ¡Te esperamos!'
              : 'Has rechazado el nuevo horario. El negocio fue notificado.'}
          </p>
        </div>
      </div>
    );
  }

  // ── Vista principal: propuesta de nuevo horario ──
  const startDisplay = appointment.startTime
    ? format(appointment.startTime, "EEEE d 'de' MMMM yyyy 'a las' HH:mm", { locale: es })
    : '—';
  const endDisplay = appointment.endTime ? format(appointment.endTime, 'HH:mm') : null;

  const originalStartDisplay = appointment.originalStartTime
    ? format(appointment.originalStartTime, "HH:mm", { locale: es })
    : '—';
  const originalEndDisplay = appointment.originalEndTime
    ? format(appointment.originalEndTime, 'HH:mm')
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="card max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Cambio de Horario</h1>
          <p className="text-gray-500 text-sm mt-1">
            El profesional ha propuesto un nuevo horario para tu cita
          </p>
        </div>

        {/* Horario original */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Horario original solicitado</p>
          <p className="text-orange-800 font-medium">
            {originalStartDisplay}{originalEndDisplay ? ` — ${originalEndDisplay}` : ''} hrs
          </p>
        </div>

        {/* Nuevo horario propuesto */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">Nuevo horario propuesto</p>
          <p className="text-green-800 font-medium">
            {startDisplay}{endDisplay ? ` — ${endDisplay} hrs` : ' hrs'}
          </p>
        </div>

        {/* Info del cliente */}
        <div className="bg-gray-50 rounded-lg p-3 mb-6 text-sm text-gray-600">
          <p><strong>Cliente:</strong> {appointment.clientName}</p>
          <p><strong>Profesional:</strong> {appointment.barberName}</p>
        </div>

        {/* Botones */}
        <p className="text-sm text-gray-500 text-center mb-4">
          ¿Aceptas el nuevo horario propuesto?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleAction('reject')}
            disabled={processing}
            className="flex-1 py-3 border-2 border-red-400 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            No acepto
          </button>
          <button
            onClick={() => handleAction('accept')}
            disabled={processing}
            className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing ? <LoadingSpinner size="small" /> : <Check className="w-4 h-4" />}
            Acepto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReschedulePage;
