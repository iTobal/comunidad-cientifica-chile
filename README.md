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
