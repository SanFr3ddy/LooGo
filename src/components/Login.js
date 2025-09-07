import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../assets/js/utils';

const Login = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('usuario');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('usuario'); // Para controlar qué pestaña está activa

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validación de datos
    if (!validateEmail(email)) {
      setError('Por favor, introduce un correo electrónico válido');
      return;
    }
    
    if (!password) {
      setError('Por favor, introduce tu contraseña');
      return;
    }
    
    // Aquí iría la lógica de autenticación
    onLogin(email, password, activeTab).catch(err => setError(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="background-container"></div>
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo.svg" alt="BañoYa Logo" className="mx-auto h-20 mb-4" />
          <h1 className="text-3xl font-bold text-white">Iniciar Sesión</h1>
          <p className="text-gray-300 mt-2">Bienvenido a BañoYa</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Pestañas para seleccionar tipo de usuario */}
        <div className="flex mb-6 border-b border-gray-600">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'usuario' ? 'text-blue-400 border-b-2 border-blue-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('usuario')}
          >
            Usuario
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-center ${activeTab === 'vendedor' ? 'text-blue-400 border-b-2 border-blue-400 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('vendedor')}
          >
            Vendedor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={switchToRegister}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;