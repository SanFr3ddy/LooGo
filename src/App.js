import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Map from './components/Map';
import UserProfile from './components/UserProfile';

// Importar estilos
import './assets/css/styles.css';
import './assets/css/responsive.css';

// Main App component
const App = () => {
  // Estado de autenticación
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('usuario');
  const [loading, setLoading] = useState(true);

  // Efecto para verificar si el usuario está autenticado
  useEffect(() => {
    // Simulación de verificación de autenticación
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      const storedUserType = localStorage.getItem('userType');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        if (storedUserType) {
          setUserType(storedUserType);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (email, password, type) => {
    return new Promise((resolve, reject) => {
      // Simulación de autenticación
      setTimeout(() => {
        // En una aplicación real, esto sería una llamada a una API
        if (email && password) {
          const userData = {
            id: '123456',
            email: email,
            nombre: 'Usuario de Prueba',
            telefono: '555-123-4567'
          };
          setUser(userData);
          setUserType(type || 'usuario');
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('userType', type || 'usuario');
          resolve(userData);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  };

  // Función para manejar el registro
  const handleRegister = (nombre, email, password) => {
    return new Promise((resolve, reject) => {
      // Simulación de registro
      setTimeout(() => {
        // En una aplicación real, esto sería una llamada a una API
        if (nombre && email && password) {
          const userData = {
            id: '123456',
            email: email,
            nombre: nombre,
            telefono: ''
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Datos de registro inválidos'));
        }
      }, 1000);
    });
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  // Función para actualizar el perfil
  const handleUpdateProfile = (profileData) => {
    return new Promise((resolve, reject) => {
      // Simulación de actualización de perfil
      setTimeout(() => {
        // En una aplicación real, esto sería una llamada a una API
        const updatedUser = { ...user, ...profileData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        resolve(updatedUser);
      }, 1000);
    });
  };

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-xl font-bold text-white">Cargando...</div>
      </div>
    );
  }

  // Componente para manejar la autenticación
  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return isLogin ? (
      <Login 
        onLogin={handleLogin} 
        switchToRegister={() => setIsLogin(false)} 
      />
    ) : (
      <Register 
        onRegister={handleRegister} 
        switchToLogin={() => setIsLogin(true)} 
      />
    );
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/mapa" /> : <AuthPage />} 
        />
        <Route 
          path="/mapa" 
          element={user ? <Map user={user} userType={userType} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/perfil" 
          element={user ? <UserProfile user={user} userType={userType} onLogout={handleLogout} onUpdateProfile={handleUpdateProfile} /> : <Navigate to="/" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
