/**
 * Valida si un email tiene formato correcto
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un teléfono tiene formato correcto
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-()]{8,}$/;
  return phoneRegex.test(phone);
};

/**
 * Formatea una fecha a string legible
 */
export const formatDate = (date, formatString = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return formatString
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year);
};

/**
 * Formatea un tiempo en formato HH:mm
 */
export const formatTime = (time) => {
  if (!time) return '';
  
  if (typeof time === 'string') {
    return time;
  }
  
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * Debounce function para búsquedas
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Capitaliza la primera letra de un string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Trunca un string a una longitud específica
 */
export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Genera un ID único simple
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
