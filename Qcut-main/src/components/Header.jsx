import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../firebase/authService';
import toast from 'react-hot-toast';
import { LogOut, Settings, User, Scissors } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { user, barberData } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success('Sesión cerrada');
      navigate('/login');
    } else {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Qcut</h1>
            {barberData?.name && (
              <span className="hidden sm:block text-gray-500 text-sm border-l border-gray-300 pl-3">
                {barberData.name}
              </span>
            )}
          </div>

          {/* User menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              aria-label="Configuración"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                {user?.email?.split('@')[0]}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 text-sm flex items-center gap-2 rounded-lg font-semibold transition-all shadow-sm text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
