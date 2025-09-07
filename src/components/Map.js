import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from '../assets/js/utils';

const Map = ({ user, userType, onLogout }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [bathrooms, setBathrooms] = useState([]);
  const [filteredBathrooms, setFilteredBathrooms] = useState([]);
  const [selectedBathroom, setSelectedBathroom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false); // Controla si se muestra el mapa
  const [isResponsive, setIsResponsive] = useState(isMobile()); // Detecta si es vista móvil
  const [isNavOpen, setIsNavOpen] = useState(false); // Controla el menú hamburguesa
  const [filters, setFilters] = useState({
    maxPrice: 20,
    minRating: 0,
    accessibility: false,
    showFilters: false
  });
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const searchInputRef = useRef(null);
  const markersRef = useRef([]);

  // Datos de ejemplo para baños
  const mockBathrooms = [
    {
      id: 1,
      name: 'Cafetería El Buen Aroma',
      address: 'Calle Falsa 123, Ciudad de México',
      price: '$5.00',
      rating: 4.5,
      description: 'Baño limpio y amplio. Incluye jabón y papel. Acceso para sillas de ruedas.',
      lat: 19.432608,
      lng: -99.133209,
    },
    {
      id: 2,
      name: 'Restaurante Sabor Casero',
      address: 'Avenida Principal 456, Monterrey',
      price: '$10.00',
      rating: 4.8,
      description: 'Un baño de lujo, muy bien mantenido. Se cobra una pequeña tarifa por su limpieza.',
      lat: 25.686614,
      lng: -100.316116,
    },
    {
      id: 3,
      name: 'Tienda La Esquina',
      address: 'Plaza del Sol 789, Guadalajara',
      price: '$3.00',
      rating: 3.9,
      description: 'Un baño funcional y económico. Ideal para una parada rápida.',
      lat: 20.659698,
      lng: -103.349604,
    },
  ];

  // Aplicar filtros a los baños
  useEffect(() => {
    const filtered = bathrooms.filter(bathroom => {
      const price = parseFloat(bathroom.price.replace('$', ''));
      return (
        price <= filters.maxPrice &&
        bathroom.rating >= filters.minRating &&
        (!filters.accessibility || bathroom.description.toLowerCase().includes('silla'))
      );
    });
    setFilteredBathrooms(filtered);
    
    // Si el mapa está inicializado, actualizar los marcadores
    if (googleMapRef.current) {
      addBathroomMarkers(googleMapRef.current);
    }
  }, [bathrooms, filters]);

  // Detectar cambios en el tamaño de la ventana para responsividad
  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(isMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inicializar el mapa cuando el componente se monta
  useEffect(() => {
    // Cargar los datos de baños (en una app real, esto vendría de una API)
    setBathrooms(mockBathrooms);

    // Verificar si la API de Google Maps está cargada
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        // Google Maps API está cargada, obtener ubicación del usuario
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
              // Solo inicializar el mapa si se ha seleccionado un baño
              if (selectedBathroom) {
                initializeMap({ lat: latitude, lng: longitude });
              }
              setLoading(false);
            },
            () => {
              console.error('Error getting user location. Using default map view.');
              // Ubicación predeterminada: Ciudad de México
              setUserLocation({ lat: 19.432608, lng: -99.133209 });
              // Solo inicializar el mapa si se ha seleccionado un baño
              if (selectedBathroom) {
                initializeMap({ lat: 19.432608, lng: -99.133209 });
              }
              setLoading(false);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          setUserLocation({ lat: 19.432608, lng: -99.133209 });
          // Solo inicializar el mapa si se ha seleccionado un baño
          if (selectedBathroom) {
            initializeMap({ lat: 19.432608, lng: -99.133209 });
          }
          setLoading(false);
        }
      } else {
        // Google Maps API aún no está cargada, esperar 100ms y verificar de nuevo
        console.log('Google Maps API not loaded yet, waiting...');
        setTimeout(checkGoogleMapsLoaded, 100);
      }
    };

    // Iniciar la verificación
    checkGoogleMapsLoaded();

    // Limpiar al desmontar
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, [selectedBathroom]);

  // Inicializar el mapa de Google
  const initializeMap = (center) => {
    if (!window.google || !mapRef.current) return;

    const mapOptions = {
      center: center,
      zoom: 14,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        // Más estilos para un tema oscuro...
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    googleMapRef.current = map;

    // Inicializar el autocompletado para la búsqueda
    if (searchInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          console.error("No se encontró detalles para el lugar seleccionado");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
      });
    }

    // Añadir marcador para la ubicación del usuario
    new window.google.maps.Marker({
      position: center,
      map: map,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "white",
        strokeWeight: 2,
      },
      title: "Tu ubicación"
    });

    // Añadir marcadores para los baños filtrados
    addBathroomMarkers(map);
  };

  // Función para seleccionar un baño y mostrar el mapa
  const handleSelectBathroom = (bathroom) => {
    setSelectedBathroom(bathroom);
    setShowMap(true);
    
    // Inicializar el mapa si el usuario ya tiene ubicación
    if (userLocation && window.google && window.google.maps) {
      initializeMap(userLocation);
    }
  };
  
  // Añadir marcadores para los baños en el mapa
  const addBathroomMarkers = (map) => {
    if (!map) return;

    // Limpiar marcadores anteriores
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
    }
    markersRef.current = [];

    // Añadir nuevos marcadores para los baños filtrados
    filteredBathrooms.forEach(bathroom => {
      // Solo añadir marcador si hay un baño seleccionado
      if (!selectedBathroom) return;
      const marker = new window.google.maps.Marker({
        position: { lat: bathroom.lat, lng: bathroom.lng },
        map: map,
        title: bathroom.name,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        }
      });

      marker.addListener('click', () => {
        setSelectedBathroom(bathroom);
        setIsModalOpen(true);
      });

      markersRef.current.push(marker);
    });
  };

  // Manejar el pago (simulado)
  const handlePay = () => {
    // En una app real, esto sería una llamada a Stripe/PayPal
    setIsModalOpen(false);
    setSelectedBathroom(null);
    alert(`Pago de ${selectedBathroom.price} realizado con éxito para ${selectedBathroom.name}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-xl font-bold text-white">Cargando...</div>
      </div>
    );
  }

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
            <div className="relative">
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Buscar ubicación..." 
                className="bg-gray-700/50 text-white rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
            <button 
              onClick={() => setFilters({...filters, showFilters: !filters.showFilters})}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filtros
            </button>
            <Link to="/perfil" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700">Mi Perfil</Link>
            <button onClick={onLogout} className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-700">Cerrar Sesión</button>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {filters.showFilters && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-4 mb-4">
            <h3 className="text-xl font-bold text-white mb-4">Filtros de búsqueda</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Precio máximo: ${filters.maxPrice}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="1"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Calificación mínima: {filters.minRating}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => setFilters({...filters, minRating: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="accessibility"
                  checked={filters.accessibility}
                  onChange={(e) => setFilters({...filters, accessibility: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700/50"
                />
                <label htmlFor="accessibility" className="ml-2 block text-sm text-gray-300">
                  Accesible para sillas de ruedas
                </label>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mapa */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 rounded-lg p-4 h-[600px]">
                <div ref={mapRef} className="w-full h-full rounded-lg"></div>
              </div>
            </div>

            {/* Lista de baños */}
            <div className="space-y-4 overflow-y-auto max-h-[600px]">
              <h2 className="text-2xl font-bold text-white mb-4">Baños Cercanos ({filteredBathrooms.length})</h2>
              {filteredBathrooms.length === 0 ? (
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-300">No se encontraron baños con los filtros seleccionados</p>
                </div>
              ) : (
                filteredBathrooms.map((bathroom) => (
                <div
                  key={bathroom.id}
                  className="flex items-center p-4 mb-4 bg-gray-700/50 rounded-lg shadow-md transition transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    setSelectedBathroom(bathroom);
                    setIsModalOpen(true);
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    🚽
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-white">{bathroom.name}</h3>
                    <p className="text-gray-300">{bathroom.address}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm font-medium text-gray-300">{bathroom.rating}</span>
                      <span className="ml-auto text-lg font-bold text-green-400">{bathroom.price}</span>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalles del baño */}
      {isModalOpen && selectedBathroom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl transform scale-95 transition-transform duration-300">
            <h2 className="text-xl font-bold text-white">{selectedBathroom.name}</h2>
            <p className="text-gray-300 mt-2">{selectedBathroom.description}</p>
            <div className="flex items-center justify-between mt-4 border-t border-gray-700 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-400">{selectedBathroom.price}</span>
                <span className="text-sm text-gray-400">Precio por uso</span>
              </div>
              <button
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
                onClick={handlePay}
              >
                Pagar
              </button>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => { setIsModalOpen(false); setSelectedBathroom(null); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;