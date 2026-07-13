import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import BookingPage from './pages/BookingPage';
import ConfirmReschedulePage from './pages/ConfirmReschedulePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública de reservas - completamente aislada */}
          <Route path="/book/:businessId" element={<BookingPage />} />
          
          {/* Ruta pública: el cliente responde al cambio de horario */}
          <Route path="/confirmar-cita" element={<ConfirmReschedulePage />} />
          
          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas (admin) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          
          {/* Redirección por defecto */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 - Redirigir a dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1a1a1a',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#34c759',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff3b30',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
