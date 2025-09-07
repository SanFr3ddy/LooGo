// Funciones de utilidad para la aplicación BañoYa

// Validación de formularios
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // Al menos 8 caracteres, una letra mayúscula, una minúscula y un número
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(password);
};

// Funciones para manejo de localStorage
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

// Función para formatear precios
export const formatPrice = (price) => {
  if (typeof price === 'string' && price.startsWith('$')) {
    return price;
  }
  return `$${parseFloat(price).toFixed(2)}`;
};

// Función para calcular distancia entre dos puntos geográficos
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Función para detectar dispositivo móvil
export const isMobile = () => {
  return window.innerWidth <= 768;
};