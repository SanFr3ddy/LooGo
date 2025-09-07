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

1. Clona este repositorio:
   ```
   git clone https://github.com/SanFr3ddy/LooGo.git
   ```
2. Navega al directorio del proyecto:
   ```
   cd LooGo/Popi_Static
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura tu API Key de Google Maps en el archivo `public/index.html`
5. Inicia la aplicación:
   ```
   npm start
   ```
   
   O si quieres especificar un puerto diferente (por ejemplo, puerto 3001):
   ```
   # En Windows (PowerShell)
   $env:PORT=3001; npm start
   
   # En Windows (CMD)
   set PORT=3001 && npm start
   
   # En Linux/Mac
   PORT=3001 npm start
   ```

## Estructura del proyecto

- `/src` - Código fuente principal
  - `/components` - Componentes React reutilizables
    - `Login.js` - Componente de inicio de sesión
    - `Register.js` - Componente de registro
    - `Map.js` - Componente del mapa y listado de baños
    - `UserProfile.js` - Componente de perfil de usuario
  - `/assets` - Recursos estáticos
    - `/css` - Archivos CSS
      - `styles.css` - Estilos principales
      - `responsive.css` - Estilos responsivos
    - `/js` - Archivos JavaScript utilitarios
      - `utils.js` - Funciones de utilidad (validación, formateo, etc.)
    - `/images` - Imágenes del proyecto
  - `App.js` - Componente principal con enrutamiento
  - `index.js` - Punto de entrada de la aplicación
  - `index.css` - Estilos globales
- `/public` - Archivos estáticos públicos
  - `/images` - Imágenes públicas
  - `index.html` - Archivo HTML principal

## Notas importantes

- Reemplaza `YOUR_API_KEY` en el archivo `public/index.html` con tu propia API Key de Google Maps
- Esta aplicación utiliza almacenamiento local para simular la autenticación. En un entorno de producción, se recomienda implementar un backend real con autenticación segura.
- La aplicación cuenta con diseño responsivo que se adapta a dispositivos móviles y tablets.
- La interfaz de usuario está separada para usuarios regulares y vendedores.
- El mapa solo se muestra cuando se selecciona un baño para optimizar el rendimiento en dispositivos móviles.