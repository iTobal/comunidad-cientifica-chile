# Comunidad Científica de Chile

Página web desarrollada para la Comunidad Científica de Chile como parte del proyecto de Desarrollo Full Stack.

La página permite mostrar información de la comunidad, registrar usuarios y administrar solicitudes desde un panel de administración.

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Node.js
- Express
- PostgreSQL

## Funcionalidades

- Página principal de la Comunidad Científica de Chile.
- Formulario para solicitar registro.
- Inicio de sesión de usuarios.
- Panel de administración.
- Aprobación y eliminación de solicitudes.
- Administración de usuarios.
- Cambio de contraseña.
- Enlace al Instagram oficial.
- Persistencia de datos en PostgreSQL.

## Ejecutar el proyecto

Para ejecutar el proyecto en un computador se necesita tener instalado Node.js, PostgreSQL y npm.

Luego, dentro de la carpeta del proyecto, ejecutar:

npm install
npm start

La página quedará disponible en:

http://localhost:3000

## Configuración de la base de datos

El proyecto utiliza PostgreSQL. Para una conexión local se debe crear un archivo llamado .env con la siguiente configuración:

PORT=3000

DB_HOST=localhost

DB_PORT=5432

DB_USER=postgres

DB_PASSWORD=TU_CONTRASEÑA

DB_NAME=comunidad_cientifica_db

JWT_SECRET=UNA_CLAVE_SEGURA

El archivo .env no debe subirse a GitHub porque contiene información privada.

## Publicación del proyecto

El código está almacenado en GitHub.

El frontend está publicado en Netlify:

https://roaring-horse-1b3c2b.netlify.app

El backend está publicado en Render:

https://comunidad-cientifica-chile.onrender.com

La base de datos PostgreSQL utilizada para la versión publicada está alojada en Neon.

## Instagram

Perfil oficial:

https://www.instagram.com/comunidadcientificachile/

## Estructura principal

- index.html: página principal.
- login.html: inicio de sesión.
- admin.html: panel de administración.
- perfil.html: perfil de usuario.
- cambiar-password.html: cambio de contraseña.
- server.js: servidor y conexión con PostgreSQL.
- styles.css: estilos de la página.
- api-config.js: URL del backend publicado.

- ## Estructura del Proyecto

```text
comunidad-cientifica-chile/
├── admin.html             # Vista del panel de administración
├── api-config.js          # Configuración de URLs para consumo de la API backend
├── app.js                 # Lógica interactiva e integración con el backend (Frontend)
├── cambiar-password.html  # Vista para la actualización de contraseña
├── index.html             # Página principal y formulario de solicitud de registro
├── login.html             # Vista de inicio de sesión de usuarios
├── netlify.toml           # Configuración de despliegue para Netlify (Frontend)
├── package-lock.json      # Bloqueo de versiones exactas de dependencias
├── package.json           # Configuración de scripts y dependencias de Node.js
├── perfil.html            # Vista del perfil de usuario autenticado
├── README.md              # Documentación principal del repositorio
├── render.yaml            # Configuración de despliegue para Render (Backend)
├── server.js              # Servidor Node.js / Express y conexión a PostgreSQL
└── styles.css             # Estilos globales de la aplicación

## Integrantes y contribuciones

- [iTobal / Cristóbal Jaramillo]: coordinación general, configuración del proyecto y publicación en GitHub, Netlify y Render.
- [iD00M / Jordan Padilla]: desarrollo de la sección Ciencia Accesible.
- [ThatOneDusde / Ignacio Contreras]: mejoras visuales y estilos.
- [Javierbr35 / Javier Bertiola]: correcciones y pruebas.
- [cristiangzc-afk/ Cristian Zuñiga]: documentación del proyecto.
##

## Pruebas realizadas

**Funcionalidad base y Despliegue**
- Se comprobó que la página principal cargue correctamente.
- Se verificó la publicación del frontend en Netlify y backend en Render.
- Se comprobó la conexión estable con la base de datos PostgreSQL en Neon.
- Se revisó la correcta redirección al Instagram oficial.

**Autenticación y Seguridad**
- Se probó el formulario de registro y la validación de campos obligatorios.
- Se probó el inicio de sesión y el manejo de credenciales incorrectas.
- Se verificó la protección de rutas (redirección de usuarios no autenticados intentando acceder a perfil o admin).
- Se probó exitosamente el flujo de cambio de contraseña.
- Se comprobó la comunicación CORS entre Netlify y Render.

**Panel de Administración**
- Se revisó el acceso exclusivo para administradores al panel.
- Se validó el flujo de aprobación y rechazo de solicitudes de ingreso.
- Se probó la funcionalidad de visualización y eliminación de usuarios existentes.

**Interfaz y Experiencia de Usuario (UI/UX)**
- Se verificó la adaptabilidad de la página en dispositivos móviles (Diseño Responsivo).
- Se comprobó que se muestren mensajes de alerta y confirmación ante las acciones del usuario.
