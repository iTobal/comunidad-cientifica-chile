# Comunidad Científica de Chile

Proyecto web base para la Comunidad Científica de Chile. Esta versión mantiene el frontend existente en HTML/CSS/JavaScript y el backend en Node.js/Express conectado a PostgreSQL.

## Requisitos en Windows

- Node.js instalado
- PostgreSQL instalado
- pgAdmin4

## 1. Crear la base de datos en pgAdmin4

1. Abre pgAdmin4 y conéctate a tu servidor local.
2. Abre `crear_bd_pgadmin.sql` en el Query Tool.
3. Ejecuta el script.
4. La base debe llamarse `comunidad_cientifica_db`.

## 2. Configurar la conexión

1. Copia `.env.example` y renómbralo como `.env`.
2. Abre `.env`.
3. Escribe la contraseña de tu usuario `postgres` en `DB_PASSWORD`.
4. No subas `.env` a GitHub.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=TU_CLAVE
DB_NAME=comunidad_cientifica_db
JWT_SECRET=una-clave-larga-y-segura
```

## Publicación en la nube: GitHub + Netlify + Render + Neon

Este mismo repositorio se puede conectar a dos servicios: Netlify publica los archivos HTML/CSS/JavaScript y Render ejecuta `server.js`. La base PostgreSQL se crea en Neon. No es necesario mantener el computador encendido.

### Neon

Crea un proyecto PostgreSQL en Neon y copia la cadena completa de conexión.

### Render

Conecta el repositorio de GitHub como Web Service. Usa:

- Build command: `npm install`
- Start command: `npm start`
- Plan: Free

En Environment Variables agrega `DATABASE_URL` con la cadena completa de Neon, incluyendo `?sslmode=require`. Render también puede generar `JWT_SECRET` automáticamente.

### Netlify

Conecta el mismo repositorio como sitio. Publish directory: `.`. Antes del deploy, edita `api-config.js` y reemplaza el valor vacío por la URL pública de Render:

```js
window.API_BASE_URL = 'https://TU-SERVICIO.onrender.com';
```

Después de guardar y subir el cambio a GitHub, Netlify volverá a publicar el frontend automáticamente.

## Conexión local opcional con Neon

Para publicar sin depender de tu computador, no subas `.env` a GitHub. En Render crea una variable privada llamada `DATABASE_URL` y pega allí la cadena completa que entrega Neon, incluyendo `?sslmode=require`. Si `DATABASE_URL` existe, el servidor la usará automáticamente con SSL. Si no existe, usará las variables locales de la sección anterior.



Para publicar sin depender de tu computador, no subas `.env` a GitHub. En Render crea una variable privada llamada `DATABASE_URL` y pega allí la cadena completa que entrega Neon, incluyendo `?sslmode=require`. Si `DATABASE_URL` existe, el servidor la usará automáticamente con SSL. Si no existe, usará las variables locales de la sección anterior.

## 3. Instalar y ejecutar

Abre PowerShell dentro de esta carpeta y ejecuta:

```powershell
npm install
npm start
```

Luego abre:

```text
http://localhost:3000
```

El servidor crea automáticamente las tablas `solicitudes` y `usuarios` al iniciar.

## Usuario administrador inicial

- Correo: `admin@correo.com`
- Clave temporal inicial: `0206`

Cámbiala antes de publicar el sistema.

## Instagram

Perfil oficial: https://www.instagram.com/comunidadcientificachile/

## Importante

Este ZIP es una base funcional para conectarte a pgAdmin4. La pauta EPE2 solicita posteriormente Angular y Django; no debes presentar esta versión como cumplimiento completo de esos dos requisitos sin hacer esa migración.
