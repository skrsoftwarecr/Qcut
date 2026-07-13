import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange, getCurrentUser } from '../firebase/authService';
import { getBusinessData } from '../firebase/firestoreService';

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
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para refrescar datos del negocio
  const refreshBusinessData = async () => {
    if (user?.uid) {
      const result = await getBusinessData(user.uid);
      if (result.success) {
        setBusinessData(result.data);
      }
      return result;
    }

    return { success: false, error: 'Usuario no autenticado' };
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // Cargar datos del negocio
        const result = await getBusinessData(firebaseUser.uid);
        if (result.success) {
          setBusinessData(result.data);
        }

      } else {
        setUser(null);
        setBusinessData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    businessData,
    refreshBusinessData,
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
