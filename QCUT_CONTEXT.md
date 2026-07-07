# QCUT — Contexto del Sistema
> Analisis completo del sistema. Rama activa: `feature/user-account-management`
> Generado: 2026-07-07 | NO se incluye en commits

---

## Descripcion General

**Qcut** es un sistema SaaS de gestion y reserva de citas online, orientado a negocios de servicios (barberias, manicuristas, tatuadores, esteticas, etc.). Permite que los clientes finales agenden citas desde una pagina publica, y que los proveedores del servicio gestionen su agenda desde un panel privado (dashboard).

---

## Stack Tecnologico

| Capa | Tecnologia |
|------|-----------|
| Frontend | React 18 + Vite |
| Estilos | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| Base de datos | Firebase Firestore |
| Autenticacion | Firebase Auth |
| Email | Google Apps Script (VITE_GOOGLE_SCRIPT_URL via env) |
| QR | qrcode.react |
| Iconos | lucide-react |
| Fechas | date-fns con locale es |
| Deploy | Netlify (netlify.toml) |

---

## Arquitectura de Carpetas

Qcut-main/
src/
  App.jsx                   Rutas principales
  main.jsx                  Entry point
  index.css                 CSS global (variables Tailwind)
  pages/
    Login.jsx               Login admin/profesional
    Dashboard.jsx           Panel de gestion de citas (admin/profesional)
    Settings.jsx            Configuracion del negocio y equipo
    BookingPage.jsx         Pagina publica de reservas del cliente
    ConfirmAppointment.jsx  Confirmacion/cancelacion via token (email)
  components/
    Header.jsx              Header del panel privado
    ProtectedRoute.jsx      HOC para rutas protegidas
    LoadingSpinner.jsx      Spinner de carga
  contexts/
    AuthContext.jsx         Auth + roles (admin/barber) + barberData
  firebase/
    config.js               Inicializacion Firebase
    authService.js          Login, logout, createBarberAuthAccount
    firestoreService.js     CRUD citas, datos del negocio, bloqueos, perfiles
    appointmentConfirmation.js  Tokens, reenvios, reprogramacion
functions/                  Firebase Cloud Functions (backend)
netlify/                    Netlify Functions (proxy)
firestore.rules             Reglas de seguridad Firestore

---

## Rutas de la Aplicacion

| Ruta | Componente | Visibilidad |
|------|-----------|-------------|
| /book/:businessId | BookingPage | PUBLICA — la ven los clientes |
| /confirm-appointment | ConfirmAppointment | PUBLICA — via link de email |
| /confirm-appointment/:token | ConfirmAppointment | PUBLICA — via link de email |
| /login | Login | PUBLICA |
| /dashboard | Dashboard | PRIVADA (admin/profesional) |
| /settings | Settings | PRIVADA (solo admin) |

---

## Roles de Usuario

### Admin
- Es el dueno del negocio.
- Tiene acceso completo al dashboard y a settings.
- Gestiona a los profesionales (proveedores de servicio).
- Su UID en Firebase = businessId del negocio.
- Al crearse por primera vez, se genera un documento inicial en Firestore con createInitialBarberData.

### Barbero/Profesional (Barber en el codigo)
- Es un proveedor de servicio asignado por el admin.
- Tiene cuenta Firebase Auth propia.
- Puede ver su dashboard de citas pero no puede editar la configuracion global.
- Puede gestionar sus propios bloqueos de horario.
- Al crearse: se genera en Firebase Auth con contrasena temporal + perfil en /users/{uid}.
- Tiene flag mustChangePassword: true hasta que cambie su contrasena al primer login.

---

## Modelo de Datos (Firestore)

### /barbers/{businessId}
name, phone, address, openingTime, closingTime, appointmentDuration, workingDays
barbers: [{ id, uid, name, email, active, autoAccept, temporaryPassword, temporaryPasswordActive }]

### /barbers/{businessId}/appointments/{id}
clientName, clientPhone, clientEmail, notes, date (Timestamp)
barberId, barberName, barberEmail
status: pending | confirmed | completed | cancelled
confirmationStatus: pending | confirmed
confirmationToken, emailSent, emailError, cancelledBy, cancelledAt, confirmedAt

### /barbers/{businessId}/bloqueos/{id}
barberId, barberUid, tipo (dia_completo|horas_especificas), fecha, horaInicio, horaFin, motivo

### /users/{uid}
role: admin | barber
businessId, barberId, email, mustChangePassword, passwordChangedAt, createdAt

### /barbers/{businessId}/barberConfigs/{barberId}
openingTime, closingTime, appointmentDuration, workingDays
lunchBreakEnabled, lunchStart, lunchEnd, barberUid

### /barbers/{businessId}/notifications/{id}
Tipos: appointment_cancelled_by_client, appointment_confirmed_by_client, whatsapp_reminder_pending

---

## Flujo de Reserva (Cliente)

1. Cliente entra a /book/:businessId
2. Selecciona profesional -> Fecha -> Horario -> Llena sus datos -> Envia
3. Se crea la cita en Firestore con status "pending" (o "confirmed" si autoAccept: true)
4. Email al profesional notificando nueva solicitud
5. Email al cliente con link de cancelacion
6. El profesional desde Dashboard: Confirmar, Completar o Cancelar
7. Al confirmar: email de confirmacion al cliente
8. El cliente puede confirmar/cancelar via link de email -> /confirm-appointment/:token

---

## Sistema de Emails (Google Apps Script)

Endpoint: VITE_GOOGLE_SCRIPT_URL

Tipos de payload:
- appointment_pending_approval: nuevo pedido (al profesional)
- appointment_auto_confirmed: cita auto-confirmada (al profesional)
- appointment_client_created: confirmacion + link cancelacion (al cliente)
- appointment_confirmed: profesional aprobo la cita (al cliente)
- appointment_rejected: cita rechazada (al cliente)
- appointment_rescheduled: cita reprogramada (al cliente)
- appointment_cancelled_by_admin: cancelacion por admin (al cliente)

---

## Funcionalidades Clave

### BookingPage (Publico)
- Seleccion de profesional (dropdown con profesionales activos)
- Calendario mensual con dias disponibles (bloqueos + dias laborables)
- Slots de horario (excluye ocupados, bloqueados, almuerzo, horas pasadas)
- Formulario del cliente (nombre, telefono, email, notas)
- Seccion de cancelacion de citas por telefono

### Dashboard (Privado)
- Vista en tiempo real de citas (Firestore subscriptions)
- Filtros: Hoy, Esta Semana, Quincena, Proximas
- Busqueda por cliente, telefono o email
- Agrupacion por estado: Pendientes / Confirmadas / Completadas
- Panel "Respuesta del Cliente" (confirmo/cancelo via email)
- Panel "Confirmaciones pendientes" (enviar solicitud al cliente)
- Reprogramacion de citas (con email al cliente)
- Cancelacion de citas (con motivo y email al cliente)
- Modal cambio de contrasena (primer login de profesional)

### Settings (Admin)
- URL de reserva + QR descargable
- Perfil del negocio (nombre, telefono, direccion)
- Equipo del negocio: agregar, editar, activar/desactivar, eliminar profesionales
- Creacion automatica de cuenta Firebase Auth con contrasena temporal
- Horario global, bloqueos de horario

### Settings (Profesional)
- URL de reserva del negocio
- Mi Horario de Atencion (independiente del horario global)
- Mis Bloqueos

---

## Variables de Entorno (.env)

VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_GOOGLE_SCRIPT_URL

---

## Generalizacion de Terminologia en el Frontend (2026-07-07)

IMPORTANTE: Se reemplazaron todos los textos visibles que hacian referencia a "barbero/barberia"
por terminos genericos, sin modificar nada del backend ni la logica interna.

### Reemplazos realizados:

| Texto original | Texto nuevo |
|---------------|------------|
| "Gestion de citas para barberias" | "Gestion de citas para tu negocio" |
| "Gestion profesional de citas para barberias" | "Gestion profesional de citas online" |
| "Selecciona un Barbero" | "Selecciona un Profesional" |
| "Barbero" (option placeholder) | "Profesional" |
| "Barbero 1" (fallback) | "Profesional 1" |
| "Barberos de la Barberia" (Settings) | "Equipo del Negocio" |
| "Perfil de la Barberia" (Settings) | "Perfil del Negocio" |
| "Barbero:" (label en confirmaciones) | "Profesional:" |
| "El barbero la confirmara pronto" | "El equipo la confirmara pronto" |
| "El barbero ha recibido la notificacion" | "El equipo ha recibido la notificacion" |
| "Barberia no encontrada" | "Negocio no encontrado" |
| "Pendientes de Aprobacion (Barbero)" | "Pendientes de Aprobacion" |
| "Nombre del barbero" (placeholder) | "Nombre del profesional" |
| "Email del barbero" (label) | "Email del profesional" |
| "al menos un barbero" (validaciones) | "al menos un profesional" |
| "al menos un barbero activo" | "al menos un profesional activo" |
| "Barbero creado con acceso temporal: ..." | "Profesional creado con acceso temporal: ..." |
| "Selecciona barbero" (bloqueos) | "Selecciona profesional" |
| "Barbero" (fallback en bloqueos activos) | "Profesional" |
| "Barbero: ..." (dashboard confirmaciones) | "Profesional: ..." |
| notificacion: "...con el barbero..." | "...con el profesional..." |

### NO modificado (backend/logica):
- Variables JS: barberData, barberName, barberId, barberEmail, selectedBarberId
- Funciones Firebase: getBarberData(), updateBarberData(), etc.
- Colecciones Firestore: /barbers/, /bloqueos/
- Campos en BD: barberName, barberId, barbers
- Context hooks: barberData, linkedBarberId

---

## Archivos de Despliegue

- netlify.toml: Configuracion Netlify (redirects SPA, headers)
- firebase.json: Configuracion Firebase (Firestore, functions, hosting)
- firestore.rules: Reglas de seguridad Firestore
- DEPLOYMENT_CHECKLIST.md: Checklist de despliegue
- GOOGLE_APPS_SCRIPT_FINAL_UPDATED.gs: Script de Google Apps para emails

---

Ultima actualizacion: 2026-07-07 — Rama: feature/user-account-management
