import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/authService';
import { getBarberData, getUserProfile } from '../firebase/firestoreService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [barberData, setBarberData] = useState(null);
  const [userRole, setUserRole] = useState('admin');      // 'admin' | 'barber'
  const [linkedBarberId, setLinkedBarberId] = useState(null); // para rol 'barber'
  const [businessId, setBusinessId] = useState(null);         // uid del dueño, para rol 'barber'
  const [loading, setLoading] = useState(true);

  const refreshBarberData = async (overrideUid) => {
    const targetUid = overrideUid || (userRole === 'barber' && businessId ? businessId : user?.uid);
    if (targetUid) {
      const result = await getBarberData(targetUid);
      if (result.success) setBarberData(result.data);
      return result;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        // Verificar perfil de usuario para determinar rol
        const profileResult = await getUserProfile(firebaseUser.uid);
        let role = 'admin';
        let barberId = null;
        let bId = null;

        if (profileResult.success && profileResult.data) {
          role = profileResult.data.role || 'admin';
          barberId = profileResult.data.barberId || null;
          bId = profileResult.data.businessId || null;
        }

        setUserRole(role);
        setLinkedBarberId(barberId);
        setBusinessId(bId);

        // Si es barbero, cargar datos del negocio del dueño; si es admin, los suyos
        const targetUid = role === 'barber' && bId ? bId : firebaseUser.uid;
        const result = await getBarberData(targetUid);
        if (result.success) setBarberData(result.data);
      } else {
        setUser(null);
        setBarberData(null);
        setUserRole('admin');
        setLinkedBarberId(null);
        setBusinessId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // UID efectivo para consultas de datos (negocio del dueño para barberos, propio para admin)
  const effectiveUid = userRole === 'barber' && businessId ? businessId : user?.uid;

  const value = {
    user,
    barberData,
    refreshBarberData,
    loading,
    isAuthenticated: !!user,
    uid: user?.uid,
    effectiveUid,
    userRole,
    linkedBarberId,
    businessId,
    isAdmin: userRole === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
