import 'dotenv/config';
import '@testing-library/jest-dom/vitest';

/**
 * [OBLIGATORIO] Configuración de Dotenv para Tests
 * 
 * La importación de 'dotenv/config' asegura que las variables de entorno definidas
 * en el archivo .env (como VITE_FIREBASE_API_KEY y demás credenciales) sean 
 * cargadas en 'process.env' antes de ejecutar cualquier test.
 * 
 * Además, mapeamos process.env en import.meta.env para simular el comportamiento
 * de Vite. Esto es indispensable para evitar que los tests locales, los hooks 
 * pre-push de Husky y el pipeline CI/CD de GitHub Actions fallen con errores de
 * "auth/invalid-api-key" al instanciar Firebase Auth y Firestore.
 */
