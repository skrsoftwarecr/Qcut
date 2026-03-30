import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updatePassword,
  signOut, 
  onAuthStateChanged,
  getAuth
} from 'firebase/auth';
import { deleteApp, initializeApp } from 'firebase/app';
import { auth, firebaseConfig } from './config';

/**
 * Inicia sesión con email y contraseña
 */
export const loginWithEmail = async (email, password) => {
  try {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();
    const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, normalizedPassword);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    let message;
    
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
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
 * Crea una cuenta de Firebase Auth para barbero sin cerrar sesión del admin.
 * Usa una app secundaria temporal para evitar cambiar auth.currentUser.
 */
export const createBarberAuthAccount = async ({ email, temporaryPassword }) => {
  let secondaryApp = null;

  try {
    const appName = `barber-creator-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    secondaryApp = initializeApp(firebaseConfig, appName);
    const secondaryAuth = getAuth(secondaryApp);
    const credential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      temporaryPassword
    );

    return { success: true, uid: credential.user.uid };
  } catch (error) {
    let message = error.message || 'No se pudo crear la cuenta del barbero';

    if (error.code === 'auth/email-already-in-use') {
      message = 'El email ya está registrado en Firebase Auth';
    } else if (error.code === 'auth/invalid-email') {
      message = 'El email del barbero no es válido';
    } else if (error.code === 'auth/weak-password') {
      message = 'La contraseña temporal generada es inválida';
    }

    return { success: false, error: message };
  } finally {
    if (secondaryApp) {
      await deleteApp(secondaryApp).catch(() => {});
    }
  }
};

/** Cambia contraseña del usuario autenticado actualmente */
export const changeCurrentUserPassword = async (newPassword) => {
  try {
    if (!auth.currentUser) {
      return { success: false, error: 'No hay un usuario autenticado' };
    }

    await updatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (error) {
    let message = error.message || 'No se pudo cambiar la contraseña';

    if (error.code === 'auth/weak-password') {
      message = 'La nueva contraseña debe tener al menos 6 caracteres';
    } else if (error.code === 'auth/requires-recent-login') {
      message = 'Tu sesión expiró. Vuelve a iniciar sesión para cambiar tu contraseña';
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
