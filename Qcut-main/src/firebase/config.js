import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBa65V3TvUV7YReL3PWsh2sRu60LUfm1kQ',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'qcut-332fd.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'qcut-332fd',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'qcut-332fd.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1067788018955',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1067788018955:web:3c1839b40e1924c5256e0e',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-90F0HERMHD'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  useFetchStreams: false
});
export let analytics = null;

// Analytics es opcional; si falla no debe romper el render de la app.
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export default app;
