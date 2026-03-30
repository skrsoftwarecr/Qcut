import { config } from 'dotenv';
import path from 'path';

/**
 * [OBLIGATORIO] Configuración de Dotenv para Tests de Backend
 * 
 * Se importa 'dotenv' y se configura la ruta hacia el archivo .env raíz
 * para asegurar que variables críticas como VITE_FIREBASE_API_KEY estén 
 * disponibles en process.env. 
 * 
 * Esto previene bloqueos por "auth/invalid-api-key" durante la ejecución
 * de los tests locales, los hooks pre-push y los pipelines de CI/CD.
 */
config({ path: path.resolve(process.cwd(), '../.env') });
