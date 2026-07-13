# Migración QITA a nuevo Firebase y nueva cuenta de Apps Script

## Estado actual en código

- Firebase web config ya migrado al proyecto `qita-332fd`.
- URL de Apps Script ahora es configurable por `VITE_GOOGLE_SCRIPT_URL`.
- Se agregó `.gitignore` para preparar publicación en GitHub.
- Se actualizó `.env.example` con todas las variables requeridas.

## Qué debes hacer manualmente en Firebase

1. Crear Firestore Database en producción.
2. Habilitar Authentication > Email/Password.
3. Crear usuarios administradores (profesionales) en Firebase Auth.
4. Crear documento base por cada admin en:
   - `barbers/{uid}/config/barberdata`
5. Pegar reglas de Firestore de producción.

## Reglas Firestore recomendadas

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

    match /barbers/{uid}/config/barberdata {
      allow read: if true;
      allow write: if isOwner(uid);
    }

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

## Qué necesito de tu nueva cuenta de Apps Script

Para terminar la migración al 100%, debes confirmar:

1. URL final Web App desplegada:
  - `https://script.google.com/macros/s/AKfycby3zwVNyOWyvvq4VNkscvNzqCvcvRpAjJAFdqmb4bi43r2ACJR5VPtSS9dJFz1VZeCq/exec`
2. Confirmar permisos del deployment:
   - Ejecutar como: tu cuenta propietaria
   - Quién tiene acceso: Cualquiera (Anyone)
3. Confirmar que copiaste el script correcto de QITA:
   - `GOOGLE_APPS_SCRIPT_FINAL.gs` (o indicar si usarás `GOOGLE_APPS_SCRIPT_CLEAN.gs`)
4. Opcional pero recomendado:
   - Email remitente final que usarás en plantillas

La URL ya quedó aplicada en código y en `.env.example`.

## Variables para .env.local

VITE_FIREBASE_API_KEY=AIzaSyBa65V3TvUV7YReL3PWsh2sRu60LUfm1kQ
VITE_FIREBASE_AUTH_DOMAIN=qita-332fd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=qita-332fd
VITE_FIREBASE_STORAGE_BUCKET=qita-332fd.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1067788018955
VITE_FIREBASE_APP_ID=1:1067788018955:web:3c1839b40e1924c5256e0e
VITE_FIREBASE_MEASUREMENT_ID=G-90F0HERMHD
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycby3zwVNyOWyvvq4VNkscvNzqCvcvRpAjJAFdqmb4bi43r2ACJR5VPtSS9dJFz1VZeCq/exec

## Verificación final antes de GitHub

1. `npm run build` sin errores.
2. `dist/` no se versiona.
3. `node_modules/` no se versiona.
4. `.env.local` no se versiona.
5. README y checklist actualizados.
6. Primer commit limpio de migración.
