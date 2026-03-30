# Qcut - Sistema de Gestión de Citas para Barberías

Sistema SaaS moderno para gestionar citas de barberías, con diseño elegante inspirado en Apple/iOS y funcionalidades en tiempo real usando Firebase.

## 🚀 Características

### Módulo de Administración (Admin)
- ✅ **Autenticación segura** con Firebase Auth
- ✅ **Dashboard interactivo** con estadísticas en tiempo real
- ✅ **Gestión de citas**: Confirmar, completar, cancelar
- ✅ **Filtros avanzados**: Hoy, Esta semana, Quincena
- ✅ **Búsqueda** por cliente, teléfono o email
- ✅ **Configuración de horarios** y días laborables
- ✅ **Notificaciones por email** cuando llegan nuevas citas

### Módulo de Configuración
- ✅ **Generador de URL** única para reservas
- ✅ **Código QR descargable** para impresión
- ✅ **Configuración de horarios**: Apertura, cierre, duración de citas
- ✅ **Perfil de la barbería**: Nombre, teléfono, dirección

### Página Pública de Reservas
- ✅ **Completamente aislada** del panel de administración
- ✅ **Validación en tiempo real** de disponibilidad
- ✅ **Calendario interactivo** con días laborables
- ✅ **Slots de tiempo** dinámicos según configuración
- ✅ **Formulario de reserva** con validaciones
- ✅ **Notificaciones automáticas** al barbero (email)

## 🎨 Diseño

Sistema de diseño elegante inspirado en Apple/iOS:

- **Colores**: Paleta minimalista (negro, dorado, blanco)
- **Tipografía**: Inter / SF Pro Display
- **Componentes**: Bordes redondeados, sombras suaves
- **Responsive**: Mobile-first approach
- **Animaciones**: Transiciones fluidas

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Estilos**: Tailwind CSS
- **Base de datos**: Firebase Firestore
- **Autenticación**: Firebase Auth
- **Funciones Backend**: Netlify Functions
- **Iconos**: Lucide React
- **Fechas**: date-fns
- **Notificaciones**: React Hot Toast
- **QR**: qrcode.react

## 📦 Instalación

1. **Clonar el repositorio**
```bash
cd qcut
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

1. Copia `.env.example` como `.env.local`
2. Ajusta los valores de Firebase y Apps Script en `.env.local`
3. Nunca subas `.env.local` al repositorio

El proyecto usa variables de entorno desde `import.meta.env` con fallback en `src/firebase/config.js`.

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
qcut/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/            # Context providers
│   │   └── AuthContext.jsx
│   ├── firebase/            # Configuración y servicios de Firebase
│   │   ├── config.js
│   │   ├── authService.js
│   │   └── firestoreService.js
│   ├── pages/               # Páginas principales
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Settings.jsx
│   │   └── BookingPage.jsx
│   ├── utils/               # Utilidades y helpers
│   │   └── helpers.js
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globales
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔥 Firebase - Estructura de Base de Datos

### Colecciones

Estructura estándar de Firestore para cada barbería:

```
barbers/
├── {uid}/
│   ├── config/
│   │   └── barberdata (documento)
│   │       ├── name: string
│   │       ├── phone: string
│   │       ├── address: string
│   │       ├── openingTime: string
│   │       ├── closingTime: string
│   │       ├── appointmentDuration: number
│   │       └── workingDays: array
│   │
│   └── appointments/ (subcolección)
│       └── {appointmentId}
│           ├── clientName: string
│           ├── clientPhone: string
│           ├── clientEmail: string
│           ├── notes: string
│           ├── date: timestamp
│           ├── status: string (pending|confirmed|completed|cancelled)
│           ├── createdAt: timestamp
│           └── updatedAt: timestamp
```

## 🔐 Autenticación

### Para Administradores
1. Los usuarios deben ser creados manualmente en Firebase Authentication
2. El UID del usuario se usa como ID de colección en Firestore
3. Login en `/login` con email y contraseña

### Para Clientes
- No requieren autenticación
- Acceso público a través de `/book/{businessId}`

## 📱 Rutas de la Aplicación

### Rutas Públicas
- `/book/:businessId` - Página de reservas (aislada)

### Rutas de Autenticación
- `/login` - Login de administrador

### Rutas Protegidas (Admin)
- `/dashboard` - Dashboard principal
- `/settings` - Configuración

## 🎯 Características de Optimización

### Performance
- ✅ Lazy loading de rutas
- ✅ Memoización de cálculos pesados (`useMemo`)
- ✅ Debounce en búsquedas
- ✅ Consultas optimizadas a Firestore

### UX
- ✅ Loading states en todas las operaciones async
- ✅ Toast notifications para feedback
- ✅ Skeleton loaders durante carga
- ✅ Validaciones en tiempo real

### Accesibilidad
- ✅ Labels en todos los inputs
- ✅ ARIA attributes
- ✅ Navegación por teclado
- ✅ Contraste WCAG AA

## 🚀 Despliegue

### Build para producción
```bash
npm run build
```

Los archivos optimizados se generarán en `/dist`

### Preview del build
```bash
npm run preview
```

### Opciones de hosting
- **Firebase Hosting** (recomendado)
- **Vercel**
- **Netlify**

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## 🔧 Configuración Adicional

### Firestore Rules (Producción recomendada)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(uid) {
      return request.auth != null && request.auth.uid == uid;
    }

    function hasOnlyKeys(allowedKeys) {
      return request.resource.data.keys().hasOnly(allowedKeys);
    }

    function isValidPublicAppointment() {
      return request.resource.data.clientName is string &&
        request.resource.data.clientEmail is string &&
        request.resource.data.clientPhone is string &&
        request.resource.data.date is timestamp &&
        request.resource.data.barberId is string &&
        request.resource.data.barberName is string &&
        (request.resource.data.status == 'pending' || request.resource.data.status == 'confirmed') &&
        hasOnlyKeys([
          'clientName',
          'clientPhone',
          'clientEmail',
          'notes',
          'date',
          'status',
          'barberId',
          'barberName',
          'barberEmail',
          'createdAt',
          'updatedAt'
        ]);
    }

    // Permitir lectura pública de datos de barbería
    match /barbers/{uid}/config/barberdata {
      allow read: if true;
      allow write: if isOwner(uid);
    }
    
    // Permitir crear citas públicamente con validación estricta
    match /barbers/{uid}/appointments/{appointment} {
      allow read: if isOwner(uid);
      allow create: if isValidPublicAppointment();
      allow update, delete: if isOwner(uid);
    }

    match /barbers/{uid}/config/{document=**} {
      allow read, write: if isOwner(uid);
    }

    match /barbers/{uid}/notifications/{document=**} {
      allow read, write: if isOwner(uid);
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Firebase Authentication
- Habilitar Email/Password en Firebase Console
- Crear usuarios manualmente para cada barbería
- Crear documento en `barbers/{uid}/config/barberdata` con los datos de la barbería

## 🐛 Troubleshooting

### Error: Firebase no está configurado
- Verifica que los datos en `/src/firebase/config.js` sean correctos
- Asegúrate de que Firebase esté habilitado en tu proyecto

### Error: No se pueden crear citas
- Verifica las reglas de Firestore
- Asegúrate de que la colección exista en Firestore

### Error: No se pueden ver citas en el dashboard
- Verifica que el usuario esté autenticado
- Asegúrate de que haya una colección con el UID del usuario

## 📄 Licencia

Este proyecto es privado y de uso exclusivo.

## 👨‍💻 Soporte

Para soporte o consultas, contacta al equipo de desarrollo.

---

**Qcut** - Sistema profesional de gestión de citas para barberías 💈
