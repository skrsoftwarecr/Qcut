import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { QRCodeSVG } from 'qrcode.react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  updateBarberData,
  getUserProfile,
  setUserProfile,
  getBarberBlocks,
  addBarberBlock,
  deleteBarberBlock,
  getBarberScheduleConfig,
  upsertBarberScheduleConfig
} from '../firebase/firestoreService';
import { createBarberAuthAccount } from '../firebase/authService';
import Header from '../components/Header';
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
  ArrowLeft,
  Ban
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Settings = () => {
  const navigate = useNavigate();
  const { uid, effectiveUid, barberData, refreshBarberData, refreshUserProfile, isAdmin, linkedBarberId } = useAuth();
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
    barbers: [{ id: 'barber-1', name: 'Barbero 1', email: '', active: true, autoAccept: false, temporaryPassword: '', temporaryPasswordActive: false }]
  });
  const [newBarberName, setNewBarberName] = useState('');
  const [newBarberEmail, setNewBarberEmail] = useState('');
  const [isRegisteringAccount, setIsRegisteringAccount] = useState(false);
  const [initialSettingsHash, setInitialSettingsHash] = useState('');
  const [barberSchedule, setBarberSchedule] = useState({
    openingTime: '09:00',
    closingTime: '18:00',
    appointmentDuration: 30,
    workingDays: [1, 2, 3, 4, 5, 6],
    lunchBreakEnabled: false,
    lunchStart: '13:00',
    lunchEnd: '14:00'
  });
  const [savingBarberSchedule, setSavingBarberSchedule] = useState(false);
  const [barberPasswordStatus, setBarberPasswordStatus] = useState({});

  // CAMBIO 4: Estado para 'Mis Bloqueos'
  const [myBlocks, setMyBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState({
    tipo: 'dia_completo',
    fecha: format(new Date(), 'yyyy-MM-dd'),
    horaInicio: '09:00',
    horaFin: '10:00',
    motivo: '',
    barberoId: ''
  });
  const [savingBlock, setSavingBlock] = useState(false);

  useEffect(() => {
    // Inicializar barberoId si es barbero
    if (!isAdmin && linkedBarberId) {
      setNewBlock(prev => ({ ...prev, barberoId: linkedBarberId }));
    }
  }, [isAdmin, linkedBarberId]);

  const getSettingsHash = (value) => {
    const normalized = {
      ...value,
      barbers: (value.barbers || []).map((barber) => ({
        id: barber.id,
        name: barber.name?.trim() || '',
        email: barber.email?.trim() || '',
        active: barber.active !== false,
        autoAccept: !!barber.autoAccept,
        temporaryPassword: barber.temporaryPassword || '',
        temporaryPasswordActive: !!barber.temporaryPasswordActive
      }))
    };
    return JSON.stringify(normalized);
  };

  // Generar URL de reserva
  const bookingUrl = `${window.location.origin}/book/${effectiveUid || uid}`;

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      if (barberData) {
        const defaultBarbers = [{ id: 'barber-1', name: 'Barbero 1', email: '', active: true, autoAccept: false, temporaryPassword: '', temporaryPasswordActive: false }];
        setSettings({
          name: barberData.name || '',
          phone: barberData.phone || '',
          address: barberData.address || '',
          openingTime: barberData.openingTime || '09:00',
          closingTime: barberData.closingTime || '18:00',
          appointmentDuration: barberData.appointmentDuration || 30,
          workingDays: barberData.workingDays || [1, 2, 3, 4, 5, 6],
          barbers: barberData.barbers?.length ? barberData.barbers : defaultBarbers
        });
        setInitialSettingsHash(getSettingsHash({
          name: barberData.name || '',
          phone: barberData.phone || '',
          address: barberData.address || '',
          openingTime: barberData.openingTime || '09:00',
          closingTime: barberData.closingTime || '18:00',
          appointmentDuration: barberData.appointmentDuration || 30,
          workingDays: barberData.workingDays || [1, 2, 3, 4, 5, 6],
          barbers: barberData.barbers?.length ? barberData.barbers : defaultBarbers
        }));
      }
    };
    loadData();
  }, [barberData]);

  // CAMBIO 4: Cargar bloqueos
  const loadBlocks = async () => {
    if (!effectiveUid) return;
    const filterId = isAdmin ? null : linkedBarberId;
    const res = await getBarberBlocks(effectiveUid, filterId);
    if (res.success) setMyBlocks(res.data);
  };

  useEffect(() => {
    loadBlocks();
  }, [effectiveUid, isAdmin, linkedBarberId]);

  useEffect(() => {
    const loadBarberSchedule = async () => {
      if (isAdmin || !effectiveUid || !linkedBarberId) return;

      const result = await getBarberScheduleConfig(effectiveUid, linkedBarberId);
      if (result.success) {
        setBarberSchedule({
          openingTime: result.data.openingTime || '09:00',
          closingTime: result.data.closingTime || '18:00',
          appointmentDuration: result.data.appointmentDuration || 30,
          workingDays: result.data.workingDays || [1, 2, 3, 4, 5, 6],
          lunchBreakEnabled: !!result.data.lunchBreakEnabled,
          lunchStart: result.data.lunchStart || '13:00',
          lunchEnd: result.data.lunchEnd || '14:00'
        });
      } else if (barberData) {
        setBarberSchedule({
          openingTime: barberData.openingTime || '09:00',
          closingTime: barberData.closingTime || '18:00',
          appointmentDuration: barberData.appointmentDuration || 30,
          workingDays: barberData.workingDays || [1, 2, 3, 4, 5, 6],
          lunchBreakEnabled: false,
          lunchStart: '13:00',
          lunchEnd: '14:00'
        });
      }
    };

    loadBarberSchedule();
  }, [isAdmin, effectiveUid, linkedBarberId, barberData]);

  useEffect(() => {
    const loadBarberPasswordStatus = async () => {
      if (!isAdmin || !settings.barbers?.length) {
        setBarberPasswordStatus({});
        return;
      }

      const entries = await Promise.all(
        settings.barbers.map(async (barber) => {
          if (!barber.uid) return [barber.id, false];
          const profileResult = await getUserProfile(barber.uid);
          if (!profileResult.success || !profileResult.data) return [barber.id, false];

          const hasChangedPassword =
            !!profileResult.data.passwordChangedAt ||
            profileResult.data.mustChangePassword === false;

          return [barber.id, hasChangedPassword];
        })
      );

      setBarberPasswordStatus(Object.fromEntries(entries));
    };

    loadBarberPasswordStatus();
  }, [isAdmin, settings.barbers]);

  // CAMBIO 4: Agregar un bloqueo
  const handleAddBlock = async () => {
    if (!effectiveUid) {
      toast.error('No se pudo determinar la barbería para guardar el bloqueo');
      return;
    }
    if (newBlock.tipo === 'horas_especificas' && newBlock.horaInicio >= newBlock.horaFin) {
      toast.error('La hora de inicio debe ser anterior a la de fin');
      return;
    }
    if (!newBlock.barberoId && isAdmin) {
      toast.error('Selecciona un barbero para el bloqueo');
      return;
    }
    if (!isAdmin && !linkedBarberId) {
      toast.error('Tu perfil de barbero no está vinculado correctamente. Cierra sesión e inicia nuevamente.');
      return;
    }

    setSavingBlock(true);

    // Auto-repara el perfil del barbero para cumplir reglas de seguridad en /bloqueos.
    if (!isAdmin) {
      const profileRepair = await setUserProfile(uid, {
        role: 'barber',
        businessId: effectiveUid,
        barberId: linkedBarberId
      });
      if (!profileRepair.success) {
        toast.error(profileRepair.error || 'No se pudo validar tu perfil para crear bloqueos');
        setSavingBlock(false);
        return;
      }
      await refreshUserProfile(uid);
    }

    const result = await addBarberBlock(effectiveUid, {
      tipo: newBlock.tipo,
      fecha: newBlock.fecha,
      horaInicio: newBlock.horaInicio,
      horaFin: newBlock.horaFin,
      motivo: newBlock.motivo,
      barberId: isAdmin ? newBlock.barberoId : linkedBarberId,
      barberUid: isAdmin
        ? (settings.barbers.find((b) => b.id === newBlock.barberoId)?.uid || null)
        : uid
    });

    if (result.success) {
      toast.success('Bloqueo agregado correctamente');
      loadBlocks();
      setNewBlock(prev => ({
        ...prev,
        motivo: '',
        tipo: 'dia_completo'
      }));
    } else {
      toast.error(result.error || 'Error al agregar bloqueo');
    }
    setSavingBlock(false);
  };

  // CAMBIO 4: Eliminar bloqueo
  const handleDeleteBlock = async (id) => {
    const res = await deleteBarberBlock(effectiveUid, id);
    if (res.success) {
      toast.success('Bloqueo eliminado');
      setMyBlocks(prev => prev.filter(b => b.id !== id));
    } else {
      toast.error('Error al eliminar bloqueo');
    }
  };

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

  const handleCopyTemporaryPassword = async (password) => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      toast.success('Contraseña temporal copiada');
    } catch {
      toast.error('No se pudo copiar la contraseña');
    }
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
      downloadLink.download = 'qcut-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success('Código QR descargado');
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  // Guardar cambios
  const handleSave = async () => {
    if (!isAdmin) return false;
    setSaving(true);

    const sanitizedBarbers = settings.barbers
      .map((barber) => ({
        ...barber,
        name: barber.name?.trim() || '',
        email: barber.email?.trim() || '',
        active: barber.active !== false,
        autoAccept: !!barber.autoAccept,
        temporaryPassword: barber.temporaryPassword || '',
        temporaryPasswordActive: !!barber.temporaryPasswordActive
      }))
      .filter((barber) => barber.name.length > 0);

    if (sanitizedBarbers.length === 0) {
      toast.error('Debes tener al menos un barbero');
      setSaving(false);
      return false;
    }

    const activeBarbers = sanitizedBarbers.filter((barber) => barber.active);
    if (activeBarbers.length === 0) {
      toast.error('Debe existir al menos un barbero activo');
      setSaving(false);
      return false;
    }

    const updatedSettings = {
      ...settings,
      barbers: sanitizedBarbers
    };
    
    const result = await updateBarberData(effectiveUid, updatedSettings);
    
    if (result.success) {
      // Refrescar datos del contexto para sincronizar
      await refreshBarberData(effectiveUid);
      
      toast.success('Configuración guardada exitosamente');
      setSettings(updatedSettings);
      setInitialSettingsHash(getSettingsHash(updatedSettings));
      setSaving(false);
      return true;
    } else {
      toast.error('Error al guardar configuración');
      setSaving(false);
      return false;
    }
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    await handleSave();
  };

  const handleBackToDashboard = async () => {
    if (!hasUnsavedChanges) {
      navigate('/dashboard');
      return;
    }

    const shouldSave = window.confirm('Tienes cambios sin guardar. ¿Deseas guardarlos antes de volver al panel?');
    if (shouldSave) {
      const saved = await handleSave();
      if (saved) navigate('/dashboard');
      return;
    }

    navigate('/dashboard');
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

  const toggleBarberWorkingDay = (day) => {
    setBarberSchedule(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day].sort()
    }));
  };

  const handleSaveBarberSchedule = async () => {
    if (isAdmin || !effectiveUid || !linkedBarberId) return;
    if (barberSchedule.openingTime >= barberSchedule.closingTime) {
      toast.error('La hora de apertura debe ser menor a la de cierre');
      return;
    }
    if (!barberSchedule.workingDays.length) {
      toast.error('Debes seleccionar al menos un día laborable');
      return;
    }
    if (barberSchedule.lunchBreakEnabled) {
      if (barberSchedule.lunchStart >= barberSchedule.lunchEnd) {
        toast.error('La hora de almuerzo inicio debe ser menor a la de fin');
        return;
      }
      if (barberSchedule.lunchStart < barberSchedule.openingTime || barberSchedule.lunchEnd > barberSchedule.closingTime) {
        toast.error('La hora de almuerzo debe estar dentro del horario de atención');
        return;
      }
    }

    setSavingBarberSchedule(true);

    // Auto-repara el perfil del barbero para cumplir reglas de seguridad
    // en /barbers/{businessId}/barberConfigs/{barberId}.
    await setUserProfile(uid, {
      role: 'barber',
      businessId: effectiveUid,
      barberId: linkedBarberId
    });

    const result = await upsertBarberScheduleConfig(effectiveUid, linkedBarberId, {
      openingTime: barberSchedule.openingTime,
      closingTime: barberSchedule.closingTime,
      appointmentDuration: barberSchedule.appointmentDuration,
      workingDays: barberSchedule.workingDays,
      lunchBreakEnabled: barberSchedule.lunchBreakEnabled,
      lunchStart: barberSchedule.lunchBreakEnabled ? barberSchedule.lunchStart : null,
      lunchEnd: barberSchedule.lunchBreakEnabled ? barberSchedule.lunchEnd : null,
      barberUid: uid
    });

    if (result.success) {
      toast.success('Tu horario fue actualizado');
    } else {
      toast.error(result.error || 'No se pudo guardar tu horario');
    }
    setSavingBarberSchedule(false);
  };

  const createBarberId = () => {
    return `barber-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  };

  const generateTemporaryPassword = () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let value = '';
    for (let i = 0; i < 10; i += 1) {
      value += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return value;
  };

  // Agregar Barbero a la lista
  const handleAddBarber = async () => {
    if (!isAdmin) return;
    if (!newBarberName.trim()) { toast.error('El nombre es requerido'); return; }
    if (!newBarberEmail.trim()) { toast.error('El email es requerido'); return; }

    setIsRegisteringAccount(true);
    const newId = createBarberId();
    const temporaryPassword = generateTemporaryPassword();

    const authResult = await createBarberAuthAccount({
      email: newBarberEmail.trim(),
      temporaryPassword
    });

    if (!authResult.success) {
      toast.error(authResult.error || 'No se pudo crear el acceso del barbero');
      setIsRegisteringAccount(false);
      return;
    }
    
    // Crear registro local del barbero con contraseña temporal visible para admin.
    const newBarber = {
      id: newId,
      uid: authResult.uid,
      name: newBarberName.trim(),
      email: newBarberEmail.trim(),
      active: true,
      autoAccept: false,
      temporaryPassword,
      temporaryPasswordActive: true
    };
    
    const newBarbers = [...settings.barbers, newBarber];
    const saveResult = await updateBarberData(effectiveUid, { barbers: newBarbers });
    
    if (saveResult.success) {
      setSettings(prev => ({ ...prev, barbers: newBarbers }));
      await refreshBarberData(effectiveUid);

      // Crear perfil en /users/{barberUid} para que en el primer login quede
      // clasificado correctamente como barbero (role:'barber') y no admin.
      await setUserProfile(authResult.uid, {
        role: 'barber',
        barberId: newId,
        businessId: uid,
        email: newBarberEmail.trim().toLowerCase(),
        mustChangePassword: true,
        createdAt: new Date()
      });

      await upsertBarberScheduleConfig(effectiveUid, newId, {
        openingTime: settings.openingTime,
        closingTime: settings.closingTime,
        appointmentDuration: settings.appointmentDuration,
        workingDays: settings.workingDays,
        lunchBreakEnabled: false,
        lunchStart: null,
        lunchEnd: null,
        barberUid: authResult.uid
      });
      
      toast.success(`Barbero creado con acceso temporal: ${newBarberName}`);
      
      // Limpiar formulario
      setNewBarberName('');
      setNewBarberEmail('');
    } else {
      toast.error('Error al añadir barbero: ' + saveResult.error);
    }
    setIsRegisteringAccount(false);
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
      toast.error('Debe existir al menos un barbero');
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
            onClick={handleBackToDashboard}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Panel
          </button>
        </div>

        <div className="space-y-6">
          {/* URL de Reserva y QR */}
          {isAdmin && (
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
          )}

          {/* Perfil de la Barbería */}
          {isAdmin && (
          <form onSubmit={handleSaveSubmit} className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Perfil de la Barbería
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
                  placeholder="Mi Barbería"
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
          {isAdmin && (
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Barberos de la Barbería
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newBarberName}
                    onChange={(e) => setNewBarberName(e.target.value)}
                    placeholder="Nombre del barbero"
                    className="input"
                    disabled={isRegisteringAccount}
                  />
                  <input
                    type="email"
                    value={newBarberEmail}
                    onChange={(e) => setNewBarberEmail(e.target.value)}
                    placeholder="Email comercial"
                    className="input"
                    disabled={isRegisteringAccount}
                  />
                  <button
                    type="button"
                    onClick={handleAddBarber}
                    disabled={isRegisteringAccount}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    {isRegisteringAccount ? <LoadingSpinner size="small" /> : <><Plus className="w-4 h-4" /> Añadir Barbero</>}
                  </button>
                </div>
                <p className="text-[10px] text-text-secondary mt-1">
                  * Al agregar un barbero se crea su cuenta de acceso con contraseña temporal.
                </p>
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
                          Barbero {index + 1}
                        </label>
                        <input
                          type="text"
                          value={barber.name}
                          onChange={(e) => handleUpdateBarberName(barber.id, e.target.value)}
                          className="input"
                          placeholder="Nombre del barbero"
                          required
                        />
                      </div>
                      <div>
                        <label className="label">
                          Email del barbero
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                          <input
                            type="email"
                            value={barber.email || ''}
                            onChange={(e) => handleUpdateBarberEmail(barber.id, e.target.value)}
                            className="input pl-11"
                            placeholder="barbero@email.com"
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
                      {barber.temporaryPasswordActive && barber.temporaryPassword && !barberPasswordStatus[barber.id] ? (
                        <div className="w-full sm:w-auto bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                          <p className="text-xs font-semibold text-amber-800">Contraseña temporal</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm font-mono text-amber-900 break-all">{barber.temporaryPassword}</p>
                            <button
                              type="button"
                              onClick={() => handleCopyTemporaryPassword(barber.temporaryPassword)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded transition-colors"
                              title="Copiar contraseña temporal"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Copiar
                            </button>
                          </div>
                        </div>
                      ) : null}
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
                Debe existir al menos un barbero activo. Los clientes podrán elegir su barbero al reservar.
                El auto-aceptar confirma automáticamente las citas que respeten disponibilidad.
              </p>
            </div>
          )}
          </form>
          )}

          {/* Mis Bloqueos — visible para todos */}
          <>
            <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Ban className="w-5 h-5 text-danger" />
              Mis Bloqueos
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              Bloquea días o rangos de horas donde no atenderás citas.
            </p>

            {/* Formulario de nuevo bloqueo */}
            <div className="bg-background rounded-elegant p-5 mb-8 border border-border">
              <h4 className="font-semibold text-primary mb-4 flex items-center gap-2 text-base">
                <Plus className="w-4 h-4" /> Agregar nuevo bloqueo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="label">Tipo de bloqueo</label>
                  <select
                    value={newBlock.tipo}
                    onChange={e => setNewBlock(p => ({ ...p, tipo: e.target.value }))}
                    className="input"
                  >
                    <option value="dia_completo">Día completo</option>
                    <option value="horas_especificas">Rango de horas</option>
                  </select>
                </div>
                
                <div>
                  <label className="label">Fecha</label>
                  <input 
                    type="date" 
                    value={newBlock.fecha}
                    onChange={e => setNewBlock(p => ({ ...p, fecha: e.target.value }))}
                    className="input" 
                  />
                </div>

                {isAdmin && (
                  <div>
                    <label className="label">Barbero</label>
                    <select
                      value={newBlock.barberoId}
                      onChange={e => setNewBlock(p => ({ ...p, barberoId: e.target.value }))}
                      className="input"
                    >
                      <option value="">Selecciona barbero</option>
                      {settings.barbers.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {newBlock.tipo === 'horas_especificas' && (
                  <>
                    <div>
                      <label className="label">Hora inicio</label>
                      <input 
                        type="time" 
                        value={newBlock.horaInicio}
                        onChange={e => setNewBlock(p => ({ ...p, horaInicio: e.target.value }))}
                        className="input" 
                      />
                    </div>
                    <div>
                      <label className="label">Hora fin</label>
                      <input 
                        type="time" 
                        value={newBlock.horaFin}
                        onChange={e => setNewBlock(p => ({ ...p, horaFin: e.target.value }))}
                        className="input" 
                      />
                    </div>
                  </>
                )}

                <div className={newBlock.tipo === 'dia_completo' ? 'md:col-span-2 lg:col-span-1' : ''}>
                  <label className="label">Motivo (opcional)</label>
                  <input 
                    type="text" 
                    value={newBlock.motivo}
                    onChange={e => setNewBlock(p => ({ ...p, motivo: e.target.value }))}
                    className="input" 
                    placeholder="Ej. Trámite personal"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleAddBlock}
                disabled={savingBlock}
                className="btn-primary w-full sm:w-auto px-10 flex items-center justify-center gap-2"
              >
                {savingBlock ? <LoadingSpinner size="small" /> : <><Ban className="w-4 h-4" /> Bloquear Horario</>}
              </button>
            </div>

            {/* Lista de bloqueos activos */}
            <div className="space-y-3">
              <h4 className="font-semibold text-primary text-sm flex items-center gap-2 mb-3">
                <CalendarIcon className="w-4 h-4 text-primary" /> Bloqueos activos
              </h4>
              
              {myBlocks.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <p className="text-text-secondary text-sm">No tienes bloqueos configurados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {myBlocks.map(block => (
                    <div key={block.id} className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-elegant">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-lg">
                          {block.tipo === 'dia_completo' ? <CalendarIcon className="w-5 h-5 text-red-600" /> : <Clock className="w-5 h-5 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-bold text-primary text-sm">
                            {format(new Date(block.fecha), "d 'de' MMMM", { locale: es })}
                          </p>
                          <p className="text-xs text-text-secondary">
                            {block.tipo === 'dia_completo' ? 'Todo el día' : `${block.horaInicio} - ${block.horaFin}`}
                            {isAdmin && block.barberId && ` · ${settings.barbers?.find(b => b.id === block.barberId)?.name || 'Barbero'}`}
                          </p>
                          {block.motivo && <p className="text-xs italic text-gray-500 mt-1">"{block.motivo}"</p>}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlock(block.id)}
                        className="text-danger hover:bg-red-100 p-2 rounded-lg transition-all"
                        title="Eliminar bloqueo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Horario personal del barbero */}
          {!isAdmin && (
          <div className="card">
            <h3 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Mi Horario de Atención
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Hora de Apertura</label>
                  <input
                    type="time"
                    value={barberSchedule.openingTime}
                    onChange={(e) => setBarberSchedule(prev => ({ ...prev, openingTime: e.target.value }))}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Hora de Cierre</label>
                  <input
                    type="time"
                    value={barberSchedule.closingTime}
                    onChange={(e) => setBarberSchedule(prev => ({ ...prev, closingTime: e.target.value }))}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="label">Duración de cada Cita (minutos)</label>
                <select
                  value={barberSchedule.appointmentDuration}
                  onChange={(e) => setBarberSchedule(prev => ({ ...prev, appointmentDuration: parseInt(e.target.value) }))}
                  className="input"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>60 minutos</option>
                </select>
              </div>

              <div>
                <label className="label mb-3">Días Laborables</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => toggleBarberWorkingDay(day.value)}
                      className={`px-4 py-2 rounded-elegant font-medium transition-all ${
                        barberSchedule.workingDays.includes(day.value)
                          ? 'bg-primary text-white'
                          : 'bg-background text-text-secondary hover:bg-gray-200'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-background rounded-elegant p-4 border border-border">
                <label className="flex items-center gap-2 text-sm font-medium text-primary mb-3">
                  <input
                    type="checkbox"
                    checked={barberSchedule.lunchBreakEnabled}
                    onChange={(e) => setBarberSchedule(prev => ({ ...prev, lunchBreakEnabled: e.target.checked }))}
                  />
                  Configurar hora de almuerzo
                </label>

                {barberSchedule.lunchBreakEnabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Inicio almuerzo</label>
                      <input
                        type="time"
                        value={barberSchedule.lunchStart}
                        onChange={(e) => setBarberSchedule(prev => ({ ...prev, lunchStart: e.target.value }))}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Fin almuerzo</label>
                      <input
                        type="time"
                        value={barberSchedule.lunchEnd}
                        onChange={(e) => setBarberSchedule(prev => ({ ...prev, lunchEnd: e.target.value }))}
                        className="input"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveBarberSchedule}
                  disabled={savingBarberSchedule}
                  className="btn-gold px-8 flex items-center gap-2"
                >
                  {savingBarberSchedule ? <LoadingSpinner size="small" /> : <Save className="w-5 h-5" />}
                  Guardar Mi Horario
                </button>
              </div>
            </div>
          </div>
          )}
          </>

          {isAdmin && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
