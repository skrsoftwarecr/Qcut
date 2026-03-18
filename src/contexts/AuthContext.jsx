import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getCurrentUser } from '../firebase/authService';
import { getBarberData } from '../firebase/firestoreService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [barberData, setBarberData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para refrescar datos de la barbería
  const refreshBarberData = async () => {
    if (user?.uid) {
      const result = await getBarberData(user.uid);
      if (result.success) {
        setBarberData(result.data);
      }
      return result;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Cargar datos de la barbería
        const result = await getBarberData(firebaseUser.uid);
        if (result.success) {
          setBarberData(result.data);
        }

      } else {
        setUser(null);
        setBarberData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    barberData,
    refreshBarberData,
    loading,
    isAuthenticated: !!user,
    uid: user?.uid
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
