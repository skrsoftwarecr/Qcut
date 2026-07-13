import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getBusinessData, updateBusinessData } from '../firebase/firestoreService';
import Header from '../components/Header';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Link, 
  Copy, 
  Check, 
  Clock, 
  Calendar as CalendarIcon,
  Save,
  Download,
  User,
  Phone,
  MapPin,
  Users,
  Plus,
  Trash2,
  Mail,
  ToggleLeft,
  ToggleRight,
  ArrowLeft
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Settings = () => {
  const navigate = useNavigate();
  const { uid, businessData, refreshBusinessData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [settings, setSettings] = useState({
    name: '',
    phone: '',
    address: '',
    openingTime: '09:00',
    closingTime: '18:00',
    appointmentDuration: 30,
    workingDays: [1, 2, 3, 4, 5, 6], // Lunes a Sábado por defecto
    barbers: [{ id: 'barber-1', name: 'Profesional 1', email: '', active: true, autoAccept: false }]
  });
  const [newBarberName, setNewBarberName] = useState('');
  const [newBarberEmail, setNewBarberEmail] = useState('');
  const [initialSettingsHash, setInitialSettingsHash] = useState('');

  const getSettingsHash = (value) => {
    const normalized = {
      ...value,
      barbers: (value.barbers || []).map((barber) => ({
        id: barber.id,
        name: barber.name?.trim() || '',
        email: barber.email?.trim() || '',
        active: barber.active !== false,
        autoAccept: !!barber.autoAccept
      }))
    };
    return JSON.stringify(normalized);
  };

  // Generar URL de reserva
  const bookingUrl = `${window.location.origin}/book/${uid}`;

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      if (businessData) {
        const defaultBarbers = [{ id: 'barber-1', name: 'Profesional 1', email: '', active: true, autoAccept: false }];
        setSettings({
          name: businessData.name || '',
          phone: businessData.phone || '',
          address: businessData.address || '',
          openingTime: businessData.openingTime || '09:00',
          closingTime: businessData.closingTime || '18:00',
          appointmentDuration: businessData.appointmentDuration || 30,
          workingDays: businessData.workingDays || [1, 2, 3, 4, 5, 6],
          barbers: businessData.barbers?.length ? businessData.barbers : defaultBarbers
        });
        setInitialSettingsHash(getSettingsHash({
          name: businessData.name || '',
          phone: businessData.phone || '',
          address: businessData.address || '',
          openingTime: businessData.openingTime || '09:00',
          closingTime: businessData.closingTime || '18:00',
          appointmentDuration: businessData.appointmentDuration || 30,
          workingDays: businessData.workingDays || [1, 2, 3, 4, 5, 6],
          barbers: businessData.barbers?.length ? businessData.barbers : defaultBarbers
        }));
      }
    };
    loadData();
  }, [businessData]);

  const hasUnsavedChanges = useMemo(() => {
    if (!initialSettingsHash) return false;
    return getSettingsHash(settings) !== initialSettingsHash;
  }, [settings, initialSettingsHash]);

  // Copiar URL
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(bookingUrl);
    setCopied(true);
    toast.success('URL copiada al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  // Descargar QR
  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qita-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success('Código QR descargado');
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const withTimeout = async (promise, ms, timeoutMessage) => {
    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = window.setTimeout(() => {
        reject(new Error(timeoutMessage || 'La operación tardó demasiado.'));
      }, ms);
    });

    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  // Guardar cambios
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    if (!uid) {
      toast.error('Usuario no autenticado. Vuelve a ingresar y reintenta.');
      setSaving(false);
      return;
    }

    try {
      const sanitizedBarbers = settings.barbers
        .map((barber) => ({
          ...barber,
          name: barber.name?.trim() || '',
          email: barber.email?.trim() || '',
          active: barber.active !== false,
          autoAccept: !!barber.autoAccept
        }))
        .filter((barber) => barber.name.length > 0);

      if (sanitizedBarbers.length === 0) {
        toast.error('Debes tener al menos un profesional');
        setSaving(false);
        return;
      }

      const activeBarbers = sanitizedBarbers.filter((barber) => barber.active);
      if (activeBarbers.length === 0) {
        toast.error('Debe existir al menos un profesional activo');
        setSaving(false);
        return;
      }

      const updatedSettings = {
        ...settings,
        barbers: sanitizedBarbers
      };
      
      const result = await withTimeout(
        updateBusinessData(uid, updatedSettings),
        15000,
        'La solicitud de guardado tardó demasiado. Verifica tu conexión.'
      );
      
      if (result.success) {
        // Refrescar datos del contexto para sincronizar
        const refreshResult = await withTimeout(
          refreshBusinessData(),
          10000,
          'La sincronización de datos tardó demasiado. Revisa tu conexión.'
        );

        if (!refreshResult?.success) {
          toast.error(refreshResult?.error || 'Error al sincronizar datos después de guardar');
        }

        toast.success('Configuración guardada exitosamente');
        setSettings(updatedSettings);
        setInitialSettingsHash(getSettingsHash(updatedSettings));
      } else {
        toast.error(result.error || 'Error al guardar configuración');
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      toast.error(error?.message || 'Error al guardar configuración');
    } finally {
      setSaving(false);
    }
  };

  // Toggle día laboral
  const toggleWorkingDay = (day) => {
    setSettings(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day].sort()
    }));
  };

  const createBarberId = () => {
    return `barber-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  };

  const handleAddBarber = () => {
    const name = newBarberName.trim();
    if (!name) {
      toast.error('Ingresa el nombre del profesional');
      return;
    }

    setSettings(prev => ({
      ...prev,
      barbers: [
        ...prev.barbers,
        { id: createBarberId(), name, email: newBarberEmail.trim(), active: true, autoAccept: false }
      ]
    }));
    setNewBarberName('');
    setNewBarberEmail('');
  };

  const handleUpdateBarberName = (id, name) => {
    setSettings(prev => ({
      ...prev,
      barbers: prev.barbers.map(barber =>
        barber.id === id ? { ...barber, name } : barber
      )
    }));
  };

  const handleUpdateBarberEmail = (id, email) => {
    setSettings(prev => ({
      ...prev,
      barbers: prev.barbers.map(barber =>
        barber.id === id ? { ...barber, email } : barber
      )
    }));
  };

  const handleToggleBarberActive = (id) => {
    setSettings(prev => ({
      ...prev,
      barbers: prev.barbers.map(barber =>
        barber.id === id ? { ...barber, active: !barber.active } : barber
      )
    }));
  };

  const handleToggleAutoAccept = (id) => {
    setSettings(prev => ({
      ...prev,
      barbers: prev.barbers.map(barber =>
        barber.id === id ? { ...barber, autoAccept: !barber.autoAccept } : barber
      )
    }));
  };

  const handleRemoveBarber = (id) => {
    if (settings.barbers.length <= 1) {
      toast.error('Debe existir al menos un profesional');
      return;
    }
    setSettings(prev => ({
      ...prev,
      barbers: prev.barbers.filter(barber => barber.id !== id)
    }));
  };

  const daysOfWeek = [
    { value: 0, label: 'Dom' },
    { value: 1, label: 'Lun' },
    { value: 2, label: 'Mar' },
    { value: 3, label: 'Mié' },
    { value: 4, label: 'Jue' },
    { value: 5, label: 'Vie' },
    { value: 6, label: 'Sáb' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">Configuración</h2>
            <p className="text-text-secondary">Personaliza tu perfil y horarios de atención</p>
          </div>
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                toast.error('Guarda los cambios antes de regresar');
                return;
              }
              navigate('/dashboard');
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </button>
        </div>

        <div className="space-y-6">
          {/* URL de Reserva y QR */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
              <Link className="w-5 h-5" />
              URL de Reservas
            </h3>
            
            <p className="text-text-secondary mb-4 text-sm">
              Comparte esta URL con tus clientes para que puedan agendar citas online
            </p>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={bookingUrl}
                readOnly
                className="input flex-1 bg-background"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="btn-gold flex items-center gap-2 whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>

            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-primary mb-4">Código QR</h4>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-white p-4 rounded-elegant border border-border">
                  <QRCodeSVG
                    id="qr-code"
                    value={bookingUrl}
                    size={180}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-text-secondary text-sm mb-4">
                    Descarga este código QR para imprimirlo en tu local. Tus clientes pueden escanearlo para reservar citas.
                  </p>
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Descargar QR
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Perfil del Negocio */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Perfil del Negocio
            </h3>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="label">
                  Nombre del Negocio
                </label>
                <input
                  type="text"
                  id="name"
                  value={settings.name}
                  onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                  className="input"
                  placeholder="Mi Negocio"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">
                  Teléfono de Contacto
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                    className="input pl-11"
                    placeholder="+34 123 456 789"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="label">
                  Dirección
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                  <input
                    type="text"
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                    className="input pl-11"
                    placeholder="Calle Principal 123"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Barberos */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Profesionales
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newBarberName}
                  onChange={(e) => setNewBarberName(e.target.value)}
                  className="input"
                  placeholder="Nombre del profesional"
                  aria-label="Nombre del profesional"
                />
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                  <input
                    type="email"
                    value={newBarberEmail}
                    onChange={(e) => setNewBarberEmail(e.target.value)}
                    className="input pl-11"
                    placeholder="Email del profesional"
                    aria-label="Email del profesional"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddBarber}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Agregar
                </button>
              </div>

              <div className="space-y-3">
                {settings.barbers.map((barber, index) => (
                  <div
                    key={barber.id}
                    className="flex flex-col gap-3 p-3 bg-background rounded-elegant"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="label">
                          Profesional {index + 1}
                        </label>
                        <input
                          type="text"
                          value={barber.name}
                          onChange={(e) => handleUpdateBarberName(barber.id, e.target.value)}
                          className="input"
                          placeholder="Nombre del profesional"
                          required
                        />
                      </div>
                      <div>
                        <label className="label">
                          Email del profesional
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                          <input
                            type="email"
                            value={barber.email || ''}
                            onChange={(e) => handleUpdateBarberEmail(barber.id, e.target.value)}
                            className="input pl-11"
                            placeholder="profesional@email.com"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="label">Estado</label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleBarberActive(barber.id)}
                            className="flex items-center gap-2 text-sm"
                          >
                            {barber.active ? (
                              <>
                                <ToggleRight className="w-5 h-5 text-success" />
                                Activo
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-5 h-5 text-text-secondary" />
                                Inactivo
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveBarber(barber.id)}
                            disabled={settings.barbers.length <= 1}
                            className="btn-secondary flex items-center gap-2 text-danger border-danger hover:bg-danger hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleAutoAccept(barber.id)}
                        className="flex items-center gap-2 text-sm"
                      >
                        {barber.autoAccept ? (
                          <>
                            <ToggleRight className="w-5 h-5 text-success" />
                            Auto-aceptar citas
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-5 h-5 text-text-secondary" />
                            Auto-aceptar desactivado
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

                <p className="text-sm text-text-secondary">
                Debe existir al menos un profesional activo. Los clientes podrán elegir su profesional al reservar.
                El auto-aceptar confirma automáticamente las citas que respeten disponibilidad.
              </p>
            </div>
          </div>

          {/* Configuración de Horarios */}
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horarios de Atención
            </h3>

            <div className="space-y-6">
              {/* Horario de apertura y cierre */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="openingTime" className="label">
                    Hora de Apertura
                  </label>
                  <input
                    type="time"
                    id="openingTime"
                    value={settings.openingTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, openingTime: e.target.value }))}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="closingTime" className="label">
                    Hora de Cierre
                  </label>
                  <input
                    type="time"
                    id="closingTime"
                    value={settings.closingTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, closingTime: e.target.value }))}
                    className="input"
                    required
                  />
                </div>
              </div>

              {/* Duración de citas */}
              <div>
                <label htmlFor="appointmentDuration" className="label">
                  Duración de cada Cita (minutos)
                </label>
                <select
                  id="appointmentDuration"
                  value={settings.appointmentDuration}
                  onChange={(e) => setSettings(prev => ({ ...prev, appointmentDuration: parseInt(e.target.value) }))}
                  className="input"
                  required
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos</option>
                </select>
              </div>

              {/* Días laborables */}
              <div>
                <label className="label mb-3">
                  Días Laborables
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleWorkingDay(day.value)}
                      className={`px-4 py-2 rounded-elegant font-medium transition-all ${
                        settings.workingDays.includes(day.value)
                          ? 'bg-primary text-white'
                          : 'bg-background text-text-secondary hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-text-secondary mt-2">
                  Selecciona los días en los que tu negocio está abierto
                </p>
              </div>
            </div>
          </div>

          {/* Botón guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold px-8 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <LoadingSpinner size="small" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
        </div>
      </main>
    </div>
  );
};

export default Settings;
