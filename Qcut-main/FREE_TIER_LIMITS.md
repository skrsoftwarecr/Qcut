# Qcut: límites de capa gratuita y despliegue

Documentación operativa para mantener el proyecto en **costo cero** y alinear **Firestore + Cloud Functions + Netlify + GAS**.

## Firebase

| Recurso | Notas |
|--------|--------|
| **Firestore** | Cuotas gratuitas de almacenamiento y lecturas/escrituras; vigilar consultas `collectionGroup` en cliente (ahora restringidas; flujo público vía Functions). |
| **Authentication** | Límite de usuarios activos mensuales en plan gratuito (ver consola Firebase). |
| **Cloud Functions (2nd gen)** | Invocaciones y tiempo de CPU incluidos en cuota Spark; cold starts frecuentes en tráfico bajo. **Despliegue obligatorio** tras cambios en `functions/`: `firebase deploy --only functions`. |
| **Cloud Scheduler / `onSchedule`** | Suele requerir proyecto en **Blaze** (tarjeta), aunque el uso quede dentro de cuota. Este repo no usa schedulers activos; evitar añadirlos si se exige “solo Spark sin facturación”. |

**Orden recomendado tras cambios de seguridad:** desplegar **reglas** y **functions** juntas:

`firebase deploy --only firestore:rules,functions`

## Netlify

| Recurso | Notas |
|--------|--------|
| **Builds / ancho de banda** | Límites del plan Starter gratuito; ramas y deploy previews consumen minutos de build. |
| **Base directory** | Si el repo tiene la app en la subcarpeta `Qcut-main`, en el panel de Netlify configura **Base directory** = `Qcut-main` (y el mismo criterio que el workflow de GitHub Actions). |
| **Functions** (`netlify/functions`) | Cuota mensual de invocaciones; la función `send-email` no es el camino de correo de la app (GAS); devuelve **503/501** si no hay API configurada. |

## Google Apps Script + Gmail

| Recurso | Notas |
|--------|--------|
| **Cuotas de ejecución** | Límites diarios de tiempo de ejecución y de envío (dependen del tipo de cuenta Google). |
| **Webhook público** | La URL del despliegue es un secreto operativo; rotar si se filtra. Valorar token compartido en el script para reducir abuso. |

## GitHub Actions

| Recurso | Notas |
|--------|--------|
| **Repositorio público** | Minutos de Actions generosos para CI estándar. |
| **Repositorio privado** | Minutos mensuales limitados; Playwright + Chromium consume minutos por job. El workflow cachea dependencias npm; el cache de Playwright browsers puede añadirse si hace falta. |

## Rama de producción Netlify (`feature/user-account-management`)

Netlify puede estar configurado para desplegar desde esta rama (no `main`). Implicaciones:

1. En **GitHub → Settings → Branches → Branch protection rules**, proteger **`feature/user-account-management`** (y `main` si aplica):  
   - Require a pull request before merging  
   - Require status checks to pass (**CI** del workflow)  
   - Require branches to be up to date before merging  
   - Do not allow bypassing the above settings  
   - Block force pushes  

2. **No push directo** a la rama de producción; solo merge vía PR revisado.

3. Activar **Deploy Previews** en Netlify para PRs hacia esa rama y revisar preview antes de merge.

## Variables de entorno útiles

| Variable | Uso |
|----------|-----|
| `VITE_FIREBASE_FUNCTIONS_REGION` | Región de las callables (debe coincidir con el despliegue, p. ej. `us-central1`). |
| `VITE_USE_FUNCTIONS_EMULATOR` | `true` en local con emulador en `127.0.0.1:5001`. |
