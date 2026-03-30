import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange } from '../firebase/authService';
import {
  getBarberData,
  getUserProfile,
  createInitialBarberData,
  setUserProfile,
  findBarberAssignmentByEmail
} from '../firebase/firestoreService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfileState] = useState(null);
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

  const refreshUserProfile = async (overrideUid) => {
    const targetUid = overrideUid || user?.uid;
    if (!targetUid) return { success: false, error: 'UID no disponible' };

    const result = await getUserProfile(targetUid);
    if (result.success) {
      setUserProfileState(result.data || null);
    }
    return result;
  };

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          // Verificar perfil de usuario para determinar rol
          const profileResult = await getUserProfile(firebaseUser.uid);
          let role = 'admin';
          let barberId = null;
          let bId = null;
          let hasChangedPassword = false;

          if (profileResult.success && profileResult.data) {
            const assignmentResult = await findBarberAssignmentByEmail(firebaseUser.email || '');

            // Recuperación automática: si por error quedó como admin pero el email pertenece a un barbero, corregimos perfil.
            if (
              assignmentResult.success &&
              assignmentResult.data &&
              profileResult.data.role === 'admin' &&
              assignmentResult.data.businessId !== firebaseUser.uid
            ) {
              const fixedProfile = {
                role: 'barber',
                barberId: assignmentResult.data.barberId,
                businessId: assignmentResult.data.businessId,
                email: firebaseUser.email || '',
                mustChangePassword: assignmentResult.data.mustChangePassword
              };

              await setUserProfile(firebaseUser.uid, fixedProfile);
              setUserProfileState(fixedProfile);
              role = 'barber';
              barberId = fixedProfile.barberId;
              bId = fixedProfile.businessId;
              hasChangedPassword = false;
            } else {
              const profile = profileResult.data;
              setUserProfileState(profile);
              role = profile.role || 'admin';
              barberId = profile.barberId || null;
              bId = profile.businessId || null;
              hasChangedPassword = !!profile.passwordChangedAt;
            }
          } else {
            // Si no existe perfil, intentamos asociar por email a un barbero existente.
            const assignmentResult = await findBarberAssignmentByEmail(firebaseUser.email || '');

            if (assignmentResult.success && assignmentResult.data) {
              role = 'barber';
              barberId = assignmentResult.data.barberId;
              bId = assignmentResult.data.businessId;

              const inferredProfile = {
                role: 'barber',
                barberId,
                businessId: bId,
                email: firebaseUser.email || '',
                mustChangePassword: assignmentResult.data.mustChangePassword,
                createdAt: new Date()
              };

              await setUserProfile(firebaseUser.uid, inferredProfile);
              setUserProfileState(inferredProfile);
              hasChangedPassword = !!inferredProfile.passwordChangedAt;
            } else {
              // Si no está vinculado como barbero, se considera admin del negocio.
              bId = firebaseUser.uid;
              await setUserProfile(firebaseUser.uid, {
                role: 'admin',
                businessId: firebaseUser.uid,
                email: firebaseUser.email || '',
                createdAt: new Date(),
                mustChangePassword: false
              });
              setUserProfileState({
                role: 'admin',
                businessId: firebaseUser.uid,
                email: firebaseUser.email || '',
                mustChangePassword: false
              });
              hasChangedPassword = false;
            }
          }

          if (role === 'admin' && !bId) {
            bId = firebaseUser.uid;
            await setUserProfile(firebaseUser.uid, {
              role: 'admin',
              businessId: firebaseUser.uid,
              email: firebaseUser.email || ''
            });
          }

          // Reforzar bandera mustChangePassword consultando barberdata actual
          if (role === 'barber' && bId && barberId && !hasChangedPassword) {
            const businessResult = await getBarberData(bId);
            if (businessResult.success) {
              const linkedBarber = (businessResult.data.barbers || []).find((b) => b.id === barberId);
              const shouldForce = !!linkedBarber?.temporaryPasswordActive;

              if (shouldForce) {
                await setUserProfile(firebaseUser.uid, { mustChangePassword: true });
                setUserProfileState((prev) => ({ ...(prev || {}), mustChangePassword: true }));
              }
            }
          }

          setUserRole(role);
          setLinkedBarberId(barberId);
          setBusinessId(bId);

          if (role === 'admin') {
            await createInitialBarberData(firebaseUser.uid, firebaseUser.email);
          }

          // Si es barbero, cargar datos del negocio del dueño; si es admin, los suyos
          const targetUid = role === 'barber' && bId ? bId : firebaseUser.uid;
          const result = await getBarberData(targetUid);
          if (result.success) setBarberData(result.data);
        } else {
          setUser(null);
          setUserProfileState(null);
          setBarberData(null);
          setUserRole('admin');
          setLinkedBarberId(null);
          setBusinessId(null);
        }
      } catch (_err) {
        console.error("Auth initialization error:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // UID efectivo para consultas de datos (negocio del dueño para barberos, propio para admin)
  const effectiveUid = userRole === 'barber' && businessId ? businessId : user?.uid;

  const value = {
    user,
    barberData,
    refreshBarberData,
    refreshUserProfile,
    loading,
    isAuthenticated: !!user,
    uid: user?.uid,
    effectiveUid,
    userRole,
    linkedBarberId,
    businessId,
    userProfile,
    mustChangePassword: !!userProfile?.mustChangePassword,
    isAdmin: userRole === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
