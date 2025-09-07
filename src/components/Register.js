import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../assets/js/utils';

const Register = ({ onRegister, error, setError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('usuario');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');
    setEmailError('');
    
    // Validar email
    if (!validateEmail(email)) {
      setEmailError('Por favor, introduce un email válido');
      return;
    }
    
    // Validar contraseña
    if (!validatePassword(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula y un número');
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    
    // Enviar datos al componente padre
    onRegister(name, email, password, activeTab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src="/images/logo.svg" alt="BañoYa Logo" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Crear una cuenta</h2>
          <p className="mt-2 text-sm text-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
              Inicia sesión
            </Link>
          </p>
        </div>
        
        {/* Pestañas de tipo de usuario */}
        <div className="flex border-b border-gray-700 mt-6">
          <button
            type="button"
            className={`py-2 px-4 font-medium text-sm focus:outline-none w-1/2 ${activeTab === 'usuario' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('usuario')}
          >
            <i className="fas fa-user mr-2"></i>
            Usuario
          </button>
          <button
            type="button"
            className={`py-2 px-4 font-medium text-sm focus:outline-none w-1/2 ${activeTab === 'vendedor' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('vendedor')}
          >
            <i className="fas fa-store mr-2"></i>
            Vendedor
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 text-red-200 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="text-white text-sm font-medium mb-2 block">Nombre completo</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                placeholder={activeTab === 'usuario' ? "Nombre completo" : "Nombre del negocio"}
              />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="text-white text-sm font-medium mb-2 block">Correo electrónico</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                placeholder="Correo electrónico"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-400">{emailError}</p>
              )}
            </div>
            
            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="text-white text-sm font-medium mb-2 block">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                placeholder="Contraseña"
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-400">{passwordError}</p>
              )}
            </div>
            
            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="text-white text-sm font-medium mb-2 block">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                placeholder="Confirmar contraseña"
              />
            </div>
            
            {/* Campos adicionales para vendedores */}
            {activeTab === 'vendedor' && (
              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="text-white text-sm font-medium mb-4">Información del negocio</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="text-white text-sm font-medium mb-2 block">Dirección</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                      placeholder="Dirección del negocio"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="text-white text-sm font-medium mb-2 block">Teléfono</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-600 placeholder-gray-400 text-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700/50"
                      placeholder="Teléfono de contacto"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Crear cuenta
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;