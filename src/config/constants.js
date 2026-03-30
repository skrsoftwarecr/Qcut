// Qcut Config v1.0.8 - Production Ready
/**
 * Configuración central de la aplicación Qcut.
 * Aquí se gestionan las variables de entorno y constantes globales.
 */

export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export const APP_CONFIG = {
  isProduction: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || '',
  version: '1.0.0'
};

if (!GOOGLE_SCRIPT_URL) {
  console.warn('⚠️ Advertencia: VITE_GOOGLE_SCRIPT_URL no está definida en el archivo .env');
}
