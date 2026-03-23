# ✅ Checklist: Antes de Subir a Netlify

Este checklist te ayudará a asegurarte de que todo esté configurado correctamente antes del deployment.

## 📋 Pre-deployment

### 1. Código y Archivos

- [ ] Existe `.gitignore` con `node_modules/`, `dist/` y `.env*`
- [ ] No hay credenciales privadas ni tokens en el repositorio
- [ ] `.env.example` actualizado para el nuevo Firebase

### 2. Build del Proyecto

```bash
# Asegúrate de que el proyecto compila sin errores
npm run build
```

- [ ] Build ejecutado exitosamente sin errores
- [ ] Archivos generados en la carpeta `dist/`
- [ ] Archivos estáticos copiados correctamente

### 3. Variables de Entorno

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_FIREBASE_MEASUREMENT_ID`
- [ ] `VITE_GOOGLE_SCRIPT_URL` (Apps Script de la nueva cuenta)
- [ ] Si usas Netlify Functions: `EMAIL_API_KEY` y `EMAIL_SERVICE`

### 4. Migración Firebase

- [ ] Firebase Auth > Email/Password habilitado
- [ ] Firestore Database creado en modo producción
- [ ] Reglas de Firestore aplicadas para `barbers/{uid}`
- [ ] Documento inicial creado en `barbers/{uid}/config/barberdata`
- [ ] Verificado acceso público a `/book/{uid}`

## 🚀 Deployment en Netlify

### Opción 1: Deploy Manual (Drag & Drop)

1. Ejecuta el build:
```bash
npm run build
```

2. Ve a https://app.netlify.com/drop
3. Arrastra la carpeta `dist/` completa
4. **IMPORTANTE:** Configura la variable de entorno (ver arriba)
5. Espera a que el sitio se despliegue

### Opción 2: Deploy desde Git

1. Conecta tu repositorio a Netlify
2. Configuración de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. **IMPORTANTE:** Configura la variable de entorno (ver arriba)
4. Deploy!

### Opción 3: Deploy desde CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## ✅ Post-deployment

### 1. Verificar que el sitio carga correctamente

- [ ] El sitio está accesible en la URL de Netlify
- [ ] La página de login carga (`/login`)
- [ ] El dashboard requiere autenticación (`/dashboard`)
- [ ] La página de reservas funciona (`/book/{uid}`)

### 2. Verificar Netlify Functions

1. Ve a tu sitio en Netlify
2. Ve a **Functions**
3. Deberías ver:
   - `send-email` (para emails)

Verifica los logs de las funciones para ver si se están ejecutando correctamente.

## 🔍 Testing Checklist

### Frontend
- [ ] Login funciona
- [ ] Dashboard muestra citas
- [ ] Se pueden crear/editar/eliminar citas
- [ ] Configuración se guarda correctamente
- [ ] QR Code se genera
- [ ] Página pública de reservas funciona

### Backend (Netlify Functions)
- [ ] Email se envía cuando se crea una cita
- [ ] No hay errores en los logs de Netlify Functions

## 🚨 Troubleshooting

### Build falla en Netlify
- Revisa los logs de build en Netlify
- Asegúrate de que `package.json` tenga todas las dependencias
- Verifica que la versión de Node.js sea compatible

## 📞 ¿Todo listo?

Si marcaste todas las casillas, ¡estás listo para subir a producción! 🎉

**URL final de tu sitio:**
```
https://[tu-sitio].netlify.app/book/[uid-del-barbero]
```

---

**Nota:** Las notificaciones push solo funcionan en:
- Chrome (desktop y Android)
- Firefox (desktop y Android)
- Edge (desktop)
- Safari (desktop desde macOS Ventura)

No funcionan en:
- Navegadores en modo incógnito
- Safari iOS (limitación de Apple)
