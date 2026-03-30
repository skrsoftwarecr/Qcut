import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';
import { app } from './config';

const region = import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || 'us-central1';

export const functions = getFunctions(app, region);

if (import.meta.env.DEV && import.meta.env.VITE_USE_FUNCTIONS_EMULATOR === 'true') {
  connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

/**
 * Invoca una Callable Function (2nd gen) por nombre.
 * @param {string} name
 * @param {Record<string, unknown>} data
 */
export async function callHttps(name, data) {
  const fn = httpsCallable(functions, name);
  const result = await fn(data);
  return result.data;
}
