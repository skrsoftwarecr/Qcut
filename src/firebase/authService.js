import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from './config';

/**
 * Inicia sesión con email y contraseña
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    let message = 'Error al iniciar sesión';
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        message = 'Email o contraseña incorrectos';
        break;
      case 'auth/too-many-requests':
        message = 'Demasiados intentos. Intenta más tarde';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido';
        break;
      default:
        message = error.message;
    }
    
    return { success: false, error: message };
  }
};

/**
 * Cierra la sesión del usuario actual
 */
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Observa cambios en el estado de autenticación
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Obtiene el usuario actual
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
