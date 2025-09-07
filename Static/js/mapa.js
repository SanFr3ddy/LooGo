let map;
let markers = [];

// Inicializar el mapa
function initMap() {
    // Coordenadas iniciales (puedes ajustarlas según tu ubicación)
    const initialPosition = { lat: 19.4326, lng: -99.1332 };

    map = new google.maps.Map(document.getElementById('map'), {
        center: initialPosition,
        zoom: 13
    });

    // Solicitar la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                // Agregar marcador de la ubicación actual
                new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Tu ubicación',
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                });
            },
            () => {
                console.log('Error: El servicio de geolocalización falló.');
            }
        );
    }
}

// Ejemplo de datos de baños (en una aplicación real, estos vendrían de una base de datos)
const bathrooms = [
    {
        id: 1,
        position: { lat: 19.4326, lng: -99.1342 },
        name: 'Baño Plaza Central',
        rating: 4.5,
        price: 10,
        hasShower: true,
        isHandicapAccessible: true,
        hasBabyStation: true
    },
    // Agregar más baños aquí
];

// Función para mostrar los baños en el mapa
function displayBathrooms(filteredBathrooms = bathrooms) {
    // Limpiar marcadores existentes
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    filteredBathrooms.forEach(bathroom => {
        const marker = new google.maps.Marker({
            position: bathroom.position,
            map: map,
            title: bathroom.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div>
                    <h5>${bathroom.name}</h5>
                    <p>Calificación: ${bathroom.rating} ⭐</p>
                    <p>Precio: $${bathroom.price}</p>
                    <p>Servicios:</p>
                    <ul>
                        ${bathroom.hasShower ? '<li>Ducha</li>' : ''}
                        ${bathroom.isHandicapAccessible ? '<li>Acceso discapacitados</li>' : ''}
                        ${bathroom.hasBabyStation ? '<li>Cambiador de bebés</li>' : ''}
                    </ul>
                    <button onclick="reserveBathroom(${bathroom.id})" class="btn btn-primary btn-sm">Reservar</button>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);
    });
}

// Función para aplicar filtros
function applyFilters() {
    const maxPrice = parseInt(document.getElementById('maxPrice').value);
    const minRating = parseInt(document.getElementById('minRating').value);
    const hasShower = document.getElementById('hasShower').checked;
    const isHandicapAccessible = document.getElementById('isHandicapAccessible').checked;
    const hasBabyStation = document.getElementById('hasBabyStation').checked;

    const filteredBathrooms = bathrooms.filter(bathroom => {
        return bathroom.price <= maxPrice &&
               bathroom.rating >= minRating &&
               (!hasShower || bathroom.hasShower) &&
               (!isHandicapAccessible || bathroom.isHandicapAccessible) &&
               (!hasBabyStation || bathroom.hasBabyStation);
    });

    displayBathrooms(filteredBathrooms);
}

// Función para reservar un baño
function reserveBathroom(id) {
    // Aquí iría la lógica de reserva
    console.log(`Reservando baño con ID: ${id}`);
}

// Event listeners
document.getElementById('maxPrice').addEventListener('input', function() {
    document.getElementById('priceValue').textContent = `$${this.value}`;
});

document.getElementById('applyFilters').addEventListener('click', applyFilters);

// Inicializar el mapa cuando se carga la página
window.onload = initMap;