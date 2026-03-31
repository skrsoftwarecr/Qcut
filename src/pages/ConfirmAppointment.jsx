import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { confirmAppointmentByToken, cancelAppointmentByToken, getAppointmentByConfirmationToken } from '../firebase/appointmentConfirmation';
import { getBarberData } from '../firebase/firestoreService';
import { Check, X, Clock, User, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const ConfirmAppointment = () => {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const token = routeToken || searchParams.get('token') || searchParams.get('t');
  const businessId = searchParams.get('b') || searchParams.get('businessId') || '';

  const [appointment, setAppointment] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointment = async () => {
      if (!token) {
        setError('Token no válido');
        setLoading(false);
        return;
      }

      try {
        const result = await getAppointmentByConfirmationToken(token, businessId);
        if (result.success) {
          setAppointment(result.data);
          setError(null);
          
          // Cargar datos de la barbería
          if (businessId) {
            const businessResult = await getBarberData(businessId);
            if (businessResult.success) {
              setBusinessData(businessResult.data);
            }
          }
        } else {
          setError(result.error || 'No se pudo cargar la cita');
          setAppointment(null);
        }
      } catch (_err) {
        setError('Error al cargar la información: ' + _err.message);
        setAppointment(null);
      } finally {
        setLoading(false);
      }
    };

    loadAppointment();
  }, [token, businessId]);

  const handleConfirm = async () => {
    if (!token) return;

    setConfirming(true);
    try {
      const result = await confirmAppointmentByToken(token, businessId);
      if (result.success) {
        setConfirmed(true);
        toast.success('¡Cita confirmada exitosamente!');
      } else {
        setError(result.error || 'No se pudo confirmar la cita');
        toast.error('Error al confirmar');
      }
    } catch (_err) {
      setError('Error: ' + _err.message);
      toast.error('Error en la confirmación');
    } finally {
      setConfirming(false);
    }
  };

  const handleCancel = async () => {
    if (!token) return;

    setCancelling(true);
    try {
      const result = await cancelAppointmentByToken(token, businessId);
      if (result.success) {
        setCancelled(true);
        toast.success('Cita cancelada.');
      } else {
        setError(result.error || 'No se pudo cancelar la cita');
        toast.error('Error al cancelar');
      }
    } catch (_err) {
      setError('Error: ' + _err.message);
      toast.error('Error al cancelar');
    } finally {
      setCancelling(false);
      setShowCancelConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="text-white mt-4">Cargando información de tu cita...</p>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-success/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-elegant shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          {businessData && (
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-text-secondary mb-1">Cita en</p>
              <h1 className="text-2xl font-bold text-primary">{businessData.name}</h1>
            </div>
          )}
          
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-success" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-primary mb-2">¡Confirmado!</h2>
          <p className="text-text-secondary mb-6">
            Tu cita ha sido confirmada correctamente. El barbero ha recibido la notificación.
          </p>

          {appointment && (
            <div className="bg-gray-50 rounded-elegant p-4 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Barbero:</span>
                  <span className="font-semibold text-primary">{appointment.barberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Fecha:</span>
                  <span className="font-semibold text-primary">
                    {format(new Date(appointment.date), "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Hora:</span>
                  <span className="font-semibold text-primary">{appointment.time}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-danger/10 to-danger/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-elegant shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          {businessData && (
            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-sm text-text-secondary mb-1">Cita en</p>
              <h2 className="text-2xl font-bold text-primary">{businessData.name}</h2>
            </div>
          )}
          
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center">
              <X className="w-10 h-10 text-danger" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-danger mb-2">Cita Cancelada</h1>
          <p className="text-text-secondary mb-6">
            Tu cita ha sido cancelada. El barbero ha sido notificado.
          </p>

          {appointment && (
            <div className="bg-gray-50 rounded-elegant p-4 text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Barbero:</span>
                  <span className="font-semibold text-primary">{appointment.barberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Fecha:</span>
                  <span className="font-semibold text-primary">
                    {format(new Date(appointment.date), "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Hora:</span>
                  <span className="font-semibold text-primary">{appointment.time}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-danger/10 to-danger/5 flex items-center justify-center p-4">
        <div className="bg-white rounded-elegant shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center">
              <X className="w-10 h-10 text-danger" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-danger mb-2">Error</h1>
          <p className="text-text-secondary mb-6">{error}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-elegant p-4 mb-6 text-left">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-1">¿Qué puedo hacer?</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Verifica que el enlace sea correcto</li>
                  <li>Los enlaces expiran después de 14 días</li>
                  <li>Contacta al barbero para solicitar un nuevo enlace</li>
                </ul>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
        <div className="bg-white rounded-elegant shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
          <p className="text-text-secondary">No se pudo cargar la información de la cita.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="bg-white rounded-elegant shadow-2xl p-8 sm:p-12 max-w-md w-full">
        {businessData && (
          <div className="text-center mb-8 pb-6 border-b border-border">
            <h1 className="text-3xl font-bold text-primary mb-1">{businessData.name}</h1>
            <p className="text-sm text-text-secondary">Confirmación de Cita</p>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Revisar Cita</h2>
          <p className="text-text-secondary">Revisa los detalles y elige confirmar o cancelar</p>
        </div>

        <div className="bg-gray-50 rounded-elegant p-6 mb-8 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <User className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-text-secondary">Barbero</p>
              <p className="font-semibold text-primary">{appointment.barberName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Clock className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-text-secondary">Fecha y Hora</p>
              <p className="font-semibold text-primary">
                {format(new Date(appointment.date), "d 'de' MMMM, yyyy", { locale: es })} a las {appointment.time}
              </p>
            </div>
          </div>

          {appointment.clientName && (
            <div>
              <p className="text-xs text-text-secondary mb-1">Cliente</p>
              <p className="font-semibold text-primary">{appointment.clientName}</p>
            </div>
          )}
        </div>

        {!showCancelConfirm ? (
          <>
            <p className="text-sm text-center text-text-secondary mb-3">
              Este enlace abre una decision: puedes confirmar o rechazar tu cita.
            </p>
            <button
              onClick={handleConfirm}
              disabled={confirming || appointment?.canConfirm === false}
              className="btn-primary w-full mb-3 flex items-center justify-center gap-2"
            >
              {confirming ? (
                <>
                  <LoadingSpinner size="small" />
                  Confirmando...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Confirmar Cita
                </>
              )}
            </button>

            {appointment?.canConfirm === false && (
              <p className="text-xs text-amber-700 text-center mb-3">
                Aún no puedes confirmar esta cita. Primero debe ser aprobada por el barbero.
              </p>
            )}

            <button
              onClick={() => setShowCancelConfirm(true)}
              disabled={confirming}
              className="w-full py-2 px-4 text-sm text-danger border border-danger/30 rounded-elegant hover:bg-danger/5 transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              No puedo asistir, cancelar cita
            </button>
          </>
        ) : (
          <div className="bg-danger/5 border border-danger/20 rounded-elegant p-4">
            <p className="text-sm font-semibold text-danger mb-1">¿Confirmas que deseas cancelar?</p>
            <p className="text-xs text-text-secondary mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                disabled={cancelling}
                className="flex-1 py-2 px-3 text-sm border border-border rounded-elegant hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 py-2 px-3 text-sm bg-danger text-white rounded-elegant hover:bg-danger/90 transition-colors flex items-center justify-center gap-1"
              >
                {cancelling ? (
                  <><LoadingSpinner size="small" /> Cancelando...</>
                ) : (
                  'Sí, cancelar'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmAppointment;
