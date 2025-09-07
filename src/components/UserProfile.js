import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = ({ user, userType, onLogout, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState('recientes');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  // Datos de ejemplo para baños recientes visitados (usuario) o administrados (vendedor)
  const recentBathrooms = [
    {
      id: 1,
      name: 'Cafetería El Buen Aroma',
      address: 'Calle Falsa 123, Ciudad de México',
      date: '2023-05-15',
      price: '$5.00',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Restaurante Sabor Casero',
      address: 'Avenida Principal 456, Monterrey',
      date: '2023-05-10',
      price: '$10.00',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Tienda La Esquina',
      address: 'Plaza del Sol 789, Guadalajara',
      date: '2023-05-05',
      price: '$3.00',
      rating: 3.9,
    },
  ];

  // Datos de ejemplo para estadísticas
  const stats = {
    usuario: {
      totalVisitas: 15,
      gastoTotal: '$120.00',
      calificacionPromedio: 4.2,
      banosVisitados: 8
    },
    vendedor: {
      totalVisitas: 156,
      ingresoTotal: '$780.00',
      calificacionPromedio: 4.5,
      banosRegistrados: 3
    }
  };

  // Datos de ejemplo para reseñas
  const reviews = [
    {
      id: 1,
      userName: 'Ana García',
      date: '2023-05-12',
      rating: 5,
      comment: 'Excelente servicio, muy limpio y bien mantenido.'
    },
    {
      id: 2,
      userName: 'Carlos Rodríguez',
      date: '2023-05-08',
      rating: 4,
      comment: 'Buen servicio, aunque podría mejorar la iluminación.'
    },
    {
      id: 3,
      userName: 'María López',
      date: '2023-05-03',
      rating: 3,
      comment: 'Servicio regular, faltaba papel higiénico.'
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // Validación básica
    if (!userData.nombre || !userData.email) {
      setMessage({ text: 'Por favor completa los campos obligatorios', type: 'error' });
      return;
    }

    // Simulación de actualización de perfil
    const updatedUser = {
      ...user,
      nombre: userData.nombre,
      email: userData.email,
      telefono: userData.telefono
    };

    onUpdateProfile(updatedUser);
    setMessage({ text: 'Perfil actualizado con éxito', type: 'success' });
    setEditMode(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // Validación de contraseña
    if (!userData.password) {
      setMessage({ text: 'Por favor ingresa tu contraseña actual', type: 'error' });
      return;
    }

    if (userData.newPassword !== userData.confirmPassword) {
      setMessage({ text: 'Las contraseñas nuevas no coinciden', type: 'error' });
      return;
    }

    // Simulación de cambio de contraseña
    setMessage({ text: 'Contraseña actualizada con éxito', type: 'success' });
    setUserData({ ...userData, password: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="background-container"></div>
      
      <nav className="bg-white/10 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 fixed w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/mapa" className="flex items-center space-x-3">
            <img src="/images/logo.svg" className="h-10" alt="BañoYa Logo" />
            <span className="self-center text-2xl font-semibold text-white">BañoYa</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/mapa" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700">Mapa</Link>
            <button onClick={onLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700">Cerrar Sesión</button>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Perfil del usuario */}
            <div className="md:w-1/3">
              <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                <div className="w-32 h-32 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {user?.nombre?.charAt(0) || 'U'}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{user?.nombre || 'Usuario'}</h2>
                <p className="text-gray-300 mb-4">{user?.email || 'usuario@ejemplo.com'}</p>
                <p className="text-gray-400 mb-6">{userType === 'vendedor' ? 'Vendedor' : 'Usuario'}</p>
                
                <button 
                  onClick={() => setEditMode(!editMode)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editMode ? 'Cancelar Edición' : 'Editar Perfil'}
                </button>
              </div>
            </div>

            {/* Contenido principal */}
            <div className="md:w-2/3">
              {editMode ? (
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Editar Perfil</h2>
                  
                  {message.text && (
                    <div className={`${message.type === 'error' ? 'bg-red-500/20 border-red-400 text-red-100' : 'bg-green-500/20 border-green-400 text-green-100'} border px-4 py-3 rounded relative mb-4`} role="alert">
                      <span className="block sm:inline">{message.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} className="mb-8">
                    <div className="mb-4">
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                      <input 
                        type="text" 
                        id="nombre" 
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Correo electrónico</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-2">Teléfono</label>
                      <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono"
                        value={userData.telefono}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Guardar Cambios
                    </button>
                  </form>

                  <h3 className="text-xl font-bold text-white mb-4">Cambiar Contraseña</h3>
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Contraseña actual</label>
                      <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">Nueva contraseña</label>
                      <input 
                        type="password" 
                        id="newPassword" 
                        name="newPassword"
                        value={userData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirmar nueva contraseña</label>
                      <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Actualizar Contraseña
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  {/* Tabs de navegación */}
                  <div className="flex border-b border-gray-700 mb-6">
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 'recientes' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
                      onClick={() => setActiveTab('recientes')}
                    >
                      {userType === 'vendedor' ? 'Mis Baños' : 'Recientes'}
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 'estadisticas' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
                      onClick={() => setActiveTab('estadisticas')}
                    >
                      Estadísticas
                    </button>
                    <button 
                      className={`px-4 py-2 font-medium ${activeTab === 'resenas' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
                      onClick={() => setActiveTab('resenas')}
                    >
                      {userType === 'vendedor' ? 'Reseñas Recibidas' : 'Mis Reseñas'}
                    </button>
                  </div>

                  {/* Contenido de las tabs */}
                  {activeTab === 'recientes' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {userType === 'vendedor' ? 'Mis Baños Registrados' : 'Baños Visitados Recientemente'}
                      </h2>
                      <div className="space-y-4">
                        {recentBathrooms.map(bathroom => (
                          <div key={bathroom.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                              🚽
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-semibold text-white">{bathroom.name}</h3>
                              <p className="text-gray-300 text-sm">{bathroom.address}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-gray-400">{bathroom.date}</span>
                                <div className="ml-auto flex items-center">
                                  <span className="text-yellow-400 mr-1">★</span>
                                  <span className="text-sm text-gray-300 mr-3">{bathroom.rating}</span>
                                  <span className="text-green-400 font-bold">{bathroom.price}</span>
                                </div>
                              </div>
                            </div>
                            {userType === 'vendedor' && (
                              <button className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Editar
                              </button>
                            )}
                          </div>
                        ))}
                        {userType === 'vendedor' && (
                          <button className="w-full py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            Registrar Nuevo Baño
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'estadisticas' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-6">Estadísticas</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">
                            {userType === 'vendedor' ? 'Visitas Totales' : 'Visitas Realizadas'}
                          </h3>
                          <p className="text-4xl font-bold text-blue-500">
                            {userType === 'vendedor' ? stats.vendedor.totalVisitas : stats.usuario.totalVisitas}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">
                            {userType === 'vendedor' ? 'Ingresos Totales' : 'Gasto Total'}
                          </h3>
                          <p className="text-4xl font-bold text-green-500">
                            {userType === 'vendedor' ? stats.vendedor.ingresoTotal : stats.usuario.gastoTotal}
                          </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Calificación Promedio</h3>
                          <div className="flex items-center">
                            <p className="text-4xl font-bold text-yellow-500 mr-2">
                              {userType === 'vendedor' ? stats.vendedor.calificacionPromedio : stats.usuario.calificacionPromedio}
                            </p>
                            <span className="text-2xl text-yellow-400">★</span>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">
                            {userType === 'vendedor' ? 'Baños Registrados' : 'Baños Visitados'}
                          </h3>
                          <p className="text-4xl font-bold text-purple-500">
                            {userType === 'vendedor' ? stats.vendedor.banosRegistrados : stats.usuario.banosVisitados}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'resenas' && (
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {userType === 'vendedor' ? 'Reseñas de tus Baños' : 'Tus Reseñas'}
                      </h2>
                      <div className="space-y-4">
                        {reviews.map(review => (
                          <div key={review.id} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-gray-600 rounded-full mr-3"></div>
                                <span className="font-medium text-white">{review.userName}</span>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 mb-2">{review.comment}</p>
                            <p className="text-xs text-gray-400">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;