import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Componente de spinner de carga reutilizable
 */
const LoadingSpinner = ({ size = 'medium', text = '' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader className={`${sizes[size]} animate-spin text-primary`} />
      {text && <p className="text-text-secondary text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
