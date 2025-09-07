# Baños Ya - Aplicación React

## Descripción
Baños Ya es una aplicación web que permite a los usuarios encontrar baños públicos cercanos a su ubicación, ver detalles sobre ellos y realizar pagos para su uso.

## Características
- Autenticación de usuarios (registro e inicio de sesión)
- Visualización de baños en un mapa interactivo
- Listado de baños cercanos
- Detalles de cada baño (precio, calificación, descripción)
- Perfil de usuario editable
- Historial de uso de baños

## Tecnologías utilizadas
- React.js
- React Router
- Tailwind CSS
- Google Maps API

## Instalación

1. Clona este repositorio
2. Navega al directorio del proyecto
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura tu API Key de Google Maps en el archivo `index.html`
5. Inicia la aplicación:
   ```
   npm start
   ```

## Estructura del proyecto

- `/components` - Componentes React reutilizables
  - `Login.js` - Componente de inicio de sesión
  - `Register.js` - Componente de registro
  - `Map.js` - Componente del mapa y listado de baños
  - `Profile.js` - Componente de perfil de usuario
  - `History.js` - Componente de historial de uso
- `App.js` - Componente principal con enrutamiento
- `index.js` - Punto de entrada de la aplicación
- `index.css` - Estilos globales

## Notas importantes

- Reemplaza `YOUR_API_KEY` en el archivo `index.html` con tu propia API Key de Google Maps
- Esta aplicación utiliza almacenamiento local para simular la autenticación. En un entorno de producción, se recomienda implementar un backend real con autenticación segura.